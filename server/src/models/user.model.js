const mongoose = require('mongoose')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

// JWT Secret
const jwtSecret = 'jsonwebtokensecret'

// Create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  sessions: [
    {
      token: {
        type: String,
        required: true
      },
      expiresAt: {
        type: Number,
        required: true
      }
    }
  ]
})

// *** Instance methods ***

/**
 * @purpose -  Return some user data, which will be send to the client.
 * toJSON it is automatically called by express when he stringify the object.
 * @returns - custom user data
 */
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  // return the document except the password and sessions (these shouldn't be made available)
  return _.omit(userObject, ['password', 'sessions'])
}

/**
 * @purpose - This method generate new access token with the user id
 * @returns JSON Web Token Token
 */
userSchema.methods.generateAccessAuthToken = function () {
  const user = this
  return new Promise((resolve, reject) => {
    // Create the JSON Web Token and return that
    jwt.sign(
      { _id: user._id.toHexString() },
      jwtSecret,
      { expiresIn: '10s' },
      (err, token) => {
        if (!err) {
          resolve(token)
        } else {
          // there is an error
          reject(err)
        }
      }
    )
  })
}

/**
 * @purpose Simply generates a 64byte hex string
 * - it doesn't save it to the database. saveSessionToDatabase() does that.
 *
 */
userSchema.methods.generateRefreshAuthToken = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (!err) {
        // no error
        const token = buf.toString('hex')

        return resolve(token)
      }
    })
  })
}

userSchema.methods.createSession = function () {
  const user = this

  return user
    .generateRefreshAuthToken()
    .then((refreshToken) => {
      return saveSessionToDatabase(user, refreshToken)
    })
    .then((refreshToken) => {
      // saved to database successfully
      // now return the refresh token
      return refreshToken
    })
    .catch((e) => {
      return Promise.reject(new Error('Failed to save session to database.\n'))
    })
}

/* MODEL METHODS (static methods) */

/**
 * @returns The JSON Web Token secret
 */
userSchema.statics.getJWTSecret = () => {
  return jwtSecret
}

/**
 * @purpose - Ensure that the user has this token
 * @param {Number} _id - The user id
 * @param {String} token - The token to be validated
 * @returns user object
 */
userSchema.statics.findByIdAndToken = function (_id, token) {
  // used in auth middleware (verifySession)

  const User = this

  return User.findOne({
    _id,
    'sessions.token': token
  })
}

/**
 *@purpose - Check if the user exist or not
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns user if found || Error otherwise
 */
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to find this email!')
  }
  // Check if the password matches or not
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('The username or password is incorrect!')
  }

  return user
}

/**
 * Check if the refreshToken expire ?
 * @param {Number} expiresAt
 * @returns true if the token expired || else otherwise
 */
userSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  const secondsSinceEpoch = Date.now() / 1000
  if (expiresAt > secondsSinceEpoch) {
    // hasn't expired
    return false
  } else {
    // has expired
    return true
  }
}

/* MIDDLEWARE */
/**
 * @purpose -  Hash the plain text password before saving
 */
userSchema.pre('save', async function (next) {
  // this => gives us access to individual user
  const user = this

  // Check first, if the password changed (became a plain text) or it's already hashed
  if (user.isModified('password')) {
    // The second argument is the number of rounds we wanna perform=> how many times the hashing algorithm is executed
    // 8 => is the value which recommended by the original creator of the bcrypt algorithm
    user.password = await bcrypt.hash(user.password, 8)
  }

  next() // To continue and not hanging on this function

  // Encryption ==> we can get the original value back
  // Hashing     ==> Are one way algorithm ==> we can't reverse the proc ess
})

/* HELPER METHODS */

/**
 * Save new session in the user's sessions array
 * @param {Object} user
 * @param {String} refreshToken
 * @returns the refreshToken if saved
 */
const saveSessionToDatabase = (user, refreshToken) => {
  // Save session to database
  return new Promise((resolve, reject) => {
    const expiresAt = generateRefreshTokenExpiryTime()

    user.sessions.push({ token: refreshToken, expiresAt })

    user
      .save()
      .then(() => {
        // saved session successfully
        return resolve(refreshToken)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
 * @returns refresh token expire time
 */
const generateRefreshTokenExpiryTime = () => {
  // const daysUntilExpire = '10'
  // const secondsUntilExpire = daysUntilExpire * 24 * 60 * 60
  const secondsUntilExpire = 11
  return Date.now() / 1000 + secondsUntilExpire
}

// Create the model
const User = mongoose.model('User', userSchema)

module.exports = User

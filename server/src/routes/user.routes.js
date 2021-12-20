const express = require('express')
const router = express.Router()
const verifySession = require('../middleware/verifySession.middleware')
// Load the List model
const User = require('../models/user.model')

/* Routes Handlers */
/**
 * @method POST
 * @name: /users/signup
 * @purpose : Signup new user
 * @body : User data
 * @return: The created user and refreshToken and accessToken in the response header
 */
router.post('/signup', async (req, res) => {
  try {
    const userData = req.body
    const user = new User(userData)

    // Save the user
    await user.save()

    // Create new session to get refreshToken
    const refreshToken = await user.createSession()

    if (refreshToken) {
      // Get new access token (expires after 15min)
      const accessToken = await user.generateAccessAuthToken()

      if (accessToken) {
        // Prepare the auth tokens
        const authTokens = { accessToken, refreshToken }

        // Send the user along with the auth tokens
        res
          .header('x-refresh-token', authTokens.refreshToken)
          .header('x-access-token', authTokens.accessToken)
          .send(user)
      }
    }
  } catch (error) {
    res.status(400).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method POST
 * @name: /users/login
 * @purpose : Login user
 * @body : User login data
 * @return:
 */
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findByCredentials(email, password)

    if (user) {
      // Create user session
      const refreshToken = await user.createSession()
      if (refreshToken) {
        // Get new access token (expires after 15min)
        const accessToken = await user.generateAccessAuthToken()

        if (accessToken) {
          // Prepare the auth tokens
          const authTokens = { accessToken, refreshToken }

          // Send the user along with the auth tokens
          res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(user)
        }
      }
    }
  } catch (error) {
    res.status(400).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method GET
 * @name: /users/me/access-token
 * @purpose : Generate new access token
 * @return:new access token
 */
router.get('/me/access-token', verifySession, (req, res) => {
  // we know that the user/caller is authenticated and we have the user_id and user object available to us
  req.userObject
    .generateAccessAuthToken()
    .then((accessToken) => {
      res.header('x-access-token', accessToken).send({ accessToken })
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})
module.exports = router

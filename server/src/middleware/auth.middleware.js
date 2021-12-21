const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
/**
 * @purpose - Authenticate each request, by enure that the user has valid JWT token
 * @param {*} req - The request object
 * @param {*} res  - The response object
 * @param {*} next - Used to call the next middleware
 */
module.exports = (req, res, next) => {
  const token = req.header('x-access-token')

  // Verify the token
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ status: 'failure', message: 'Please login first 🤗' })
    }

    // Set the user id in the req
    req.user_id = decoded._id
    next()
  })
}

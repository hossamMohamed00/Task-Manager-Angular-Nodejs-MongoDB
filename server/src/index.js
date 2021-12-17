const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')

const listRoutes = require('./routes/list.routes')
const tasksRoutes = require('./routes/task.routes')
const app = express()

// Parse the request body
app.use(bodyParser.json())

// CORS HEADER MIDDLEWARE
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Setup morgan
app.use(morgan('dev'))

// Init routes
app.use('/lists', listRoutes)
app.use('/lists', tasksRoutes)

// Home route
app.get('/', (req, res) => res.send('Hello World!'))

// Fire the server
app.listen(3000, () => console.log('Server is listening on port 3000 🔥👀'))

module.exports = app

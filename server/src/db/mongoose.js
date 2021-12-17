const mongoose = require('mongoose')

// Set mongoose to use the global js promises
mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/TaskManager')

const dbConnection = mongoose.connection
// check if the database connection is successful
dbConnection.once('open', () => {
  console.log('Database connected successfully ✅')
})

dbConnection.once('error', (err) => {
  console.log('Cannot connect to database ❌💔, error message: ')
})
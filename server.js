// Express framework
const express = require('express')

// MongoDB connector
const mongoose = require('mongoose')

// config file
const config = require('./config.json')

// Parse JSON
const bodyParser = require('body-parser');

// config
const port = process.env.PORT || config.port
const mongoURI = process.env.MONGO_URI || config.mongoURI

// Connecting to DB
mongoose.connect(mongoURI, { useMongoClient: true })
const db = mongoose.connection
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoURI)
})

// App server
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json({ type: 'application/json' }))
require('./models/store')
require('./routes')(app)

// Start
app.listen(port)
console.log('Listening on port ' +port)

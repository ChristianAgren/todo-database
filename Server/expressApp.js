// Parsing the .env file
require('dotenv').config()

// Server setup
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = process.env.PORT || 8080;
const path = require('path');

mongoose.connect(`mongodb://localhost/todo-database`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// Routers
const usersRouter = require('./routes/users')
const assignmentsRouter = require('./routes/assignments')
const subtasksRouter = require('./routes/subtasks')

// Express use setup, url we use for api endpoints
app.use(express.json());
app.use('/api/users', usersRouter)
app.use('/api/assignments', assignmentsRouter)
app.use('/api/subtasks', subtasksRouter)

app.get('/', (req, res) => {
      return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

app.listen(port, () => console.log('Server has started'))

// // If ERROR, return errormsg
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).json({ error: { message: "Ran into a server error, please reload page" } })
// })
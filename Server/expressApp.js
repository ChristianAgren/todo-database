// Parsing the .env file
require('dotenv').config()

// Server setup
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

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
const usersRouter = require('./Routes/usersRoute')
const assignmentsRouter = require('./Routes/assignmentsRoute')
const subtasksRouter = require('./Routes/subtasksRoute')

// Middleware
const getUser = require('./Handlers/getUser.js')

// Express use setup, url we use for api endpoints
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    secret: 'GuppB4Lyf3-1337',
    maxAge: 3000000, // 5min
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))
app.use('/api/users', usersRouter)
app.use('/api/assignments', assignmentsRouter)
app.use('/api/subtasks', subtasksRouter)

// If '/', send home
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// If post '/login', process login attempt
app.post('/login', getUser, async (req, res) => {
    if (!res.user) return res.status(401).json('Wrong username or password')
    res.user.comparePassword(req.body.password, async function (err, isMatch) {
        if (err) throw err;
        if (!isMatch) return res.status(401).json('Wrong username or password')

        // Create a session
        req.session.username = res.user.name
        req.session.id = res.user._id
        req.session.role = res.user.role
        // We can now check role with if (req.session.role === 'admin') in requests

        // Returns successful login
        res.json('Successful login!')
    })
})

app.listen(port, () => console.log('Server has started'))

// // If ERROR, return errormsg
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).json({ error: { message: "Ran into a server error, please reload page" } })
// })
const express = require("express");
const router = express.Router();

// Middlewares
const getUser = require('../Middlewares/getUser.js')
const checkloginSession = require('../Middlewares/checkLoginSession.js')

router.get('/', checkloginSession, (req, res) => {
    res.json(res.session)
})

// If post '/login', process login attempt
router.post('/login', getUser, async (req, res) => {
    if (!res.user) return res.status(401).json({ err: 'Wrong username or password' })
    res.user.comparePassword(req.body.password, async function (err, isMatch) {
        if (err) throw err;
        if (!isMatch) return res.status(401).json({ err: 'Wrong username or password' })

        // Create a session
        req.session.username = res.user.name
        req.session.id = res.user._id
        req.session.admin = res.user.admin
        // We can now check role with if (req.session.role === 'admin') in requests

        console.log('Created client session');
        

        // Returns successful login
        res.json({name: res.user.name, admin: res.user.admin})
    })
})

//If delete '/logout', process logout
router.delete('/logout', (req, res) => {
    req.session = null
    console.log('Destroyed client session');
    
    res.json('Logged out!')
})

module.exports = router;
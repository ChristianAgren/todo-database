const express = require('express')
const router = express.Router()
const User = require('../Models/userModel')
const getUser = require('../Handlers/getUser.js')

//Getting all 
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        // res.status.apply(400).json({ message: err.message })
        res.status(400).json({ message: err.message })
    }
})



// Change whole object 
router.put('/:name', getUser, async (req, res) => {
    res.user.comparePassword(req.body.password, async function (err, isMatch) {
        if (err) throw err;

        if (!isMatch) {
            res.user.password = req.body.password
        }

        res.user.name = req.body.name
        res.user.role = req.body.role

        try {
            const updatedUser = await res.user.save()
            res.json(updatedUser)
        } catch (err) {
            res.status(400)
        }
        
    })  
})

//Deleting One
router.delete('/:name', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router
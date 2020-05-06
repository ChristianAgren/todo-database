const express = require('express')
const router = express.Router()
const User = require('../Models/userModel')

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
        res.status.apply(400).json({ message: err.message })
    }
})



// Change whole object 
router.put('/:id', getUsers, async (req, res) => {
    let passComparison; 
    res.user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) throw err;
        passComparison = isMatch; 
    })
    console.log(passComparison);
    
    res.user.name = req.body.name
    res.user.password = req.body.password
    res.user.role = req.body.role
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400)
    }
})

//Deleting One
router.delete('/:id', getUsers, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Find specific user
async function getUsers(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router
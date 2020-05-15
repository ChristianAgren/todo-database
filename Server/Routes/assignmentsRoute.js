const express = require('express')
const router = express.Router()
const Assignment = require('../Models/assignmentModel')
const Subtask = require('../Models/subtaskModel')
const Users = require('../Models/userModel')

//Middleware
const checkLoginSession = require('../Middlewares/checkLoginSession')
const getAssignment = require('../Middlewares/getAssignment')
const validateAuthor = require('../Middlewares/validateAuthor')

//Getting all 
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find()
        res.json(assignments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:search', async (req, res) => {
    const values = JSON.parse(req.params.search)
    const key = values.key
    let value = values.value
    if (key.actual === "parentId") {
        await Users.findOne({name: value }, function(err, obj) {
            if (err) res.status(500).json({ message: err.message })
            value = obj._id;
        })
    }
    try {
        const assignments = await Assignment.find( { [key.actual]: value } )
        res.json(assignments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Creating one

router.post('/', checkLoginSession, async (req, res) => {
    const assignment = new Assignment({
        _id: [...Array(5)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
        parentId: req.session.id,
        title: req.body.title
    })
    try {
        const newAssignment = await assignment.save()
        res.status(201).json(newAssignment)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Change whole object 
router.put('/:id', checkLoginSession, getAssignment, validateAuthor, async (req, res) => {
    res.assignment.parentId = req.body.parentId
    res.assignment.title = req.body.title
    try {
        const updatedAssignment = await res.assignment.save()
        res.json(updatedAssignment)
    } catch (err) {
        res.status(400)
    }
})

//Deleting One
router.delete('/:id', checkLoginSession, getAssignment, validateAuthor, async (req, res) => {

    Subtask.deleteMany({parentId: req.params.id}, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else {
            try {
                await res.assignment.remove()
                res.json(res.assignment)
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        }
      })
    
    
})

module.exports = router

const express = require('express')
const router = express.Router()
const Assignment = require('../Models/assignmentModel')

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



// Skapa en getUsers för att hitta rätt user och för att få med det i respons så vi kan hitta den usern som är inloggad i res.body.id
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
    try {
        await res.assignment.remove()
        res.json({ message: 'Deleted Assignment' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router

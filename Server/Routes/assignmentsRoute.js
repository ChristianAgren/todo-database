const express = require('express')
const router = express.Router()
const Assignment = require('../Models/assignmentModel')

//Getting all 
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find()
        res.json(assignments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Creating one
router.post('/', async (req, res) => {
    const assignment = new Assignment ({
        parentId: req.body.parentId,
        title: req.body.title 
    })
    try {
        const newAssignment = await assignment.save()
        res.status(201).json(newAssignment)
    } catch (err) {
        res.status.apply(400).json( { message: err.message } )
    }
})

// Change whole object 
router.put('/:id', getAssignments, async (req, res) => {
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
router.delete('/:id', getAssignments, async (req, res) => {
    try {
        await res.assignment.remove()
        res.json({ message: 'Deleted Assignment'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Find specific assignment
async function getAssignments(req, res, next) {
    let assignment
    try {
        assignment = await Assignment.findById(req.params.id)
        if(assignment == null) {
            return res.status(404).json({ message: 'Cannot find assignment' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.assignment = assignment
    next()
}


module.exports = router
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

// Skapa en getUsers för att hitta rätt user och för att få med det i respons så vi kan hitta den usern som är inloggad i res.body.id
//Creating one

router.post('/', async (req, res) => {
    if (req.session.id) {
        const assignment = new Assignment ({
            _id: [...Array(5)].map(i => (~~(Math.random() * 36)).toString(36)).join(''),
            parentId: req.session.id,
            title: req.body.title 
        })
        try {
            const newAssignment = await assignment.save()
            res.status(201).json(newAssignment)
        } catch (err) {
            res.status(400).json( { message: err.message } )
        }
    } else {
        res.status(401).json('Unauthorized')
    }
})

// Change whole object 
router.put('/:id', getAssignment, async (req, res) => {
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
router.delete('/:id', getAssignment, async (req, res) => {
    try {
        await res.assignment.remove()
        res.json({ message: 'Deleted Assignment'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Find specific assignment
async function getAssignment(req, res, next) {
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

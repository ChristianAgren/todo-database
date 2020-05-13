const express = require('express')
const router = express.Router()
const Subtask = require('../Models/subtaskModel')

//Getting all 
router.get('/', async (req, res) => {
    try {
        const subtasks = await Subtask.find()
        res.json(subtasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//Creating one
router.post('/', async (req, res) => {
    if(req.session.id !== req.body.assignmentparentId && !req.session.admin) {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {
        const subtask = new Subtask ({
            parentId: req.body.parentId,
            desc: req.body.desc,
            status: req.body.status 
        })
        try {
            const newSubtask = await subtask.save()
            res.status(201).json(newSubtask)
        } catch (err) {
            res.status.apply(400).json( { message: err.message } )
        }
    }
})

// Change whole object 
router.put('/:id', getSubtask, async (req, res) => {
    if(req.session.id !== req.body.assignmentparentId && !req.session.admin) {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {
            res.subtask.desc = req.body.desc
            res.subtask.status = req.body.status
            if (req.body.parentId) {
                res.subtask.parentId = req.body.parentId
            }
        try {
            const updatedSubtask = await res.subtask.save()
            res.json(updatedSubtask)
        } catch (err) {
            res.status(400)
        }
    }
})

//Deleting One
router.delete('/:id', getSubtask, async (req, res) => {
    if(req.session.id !== req.body.assignmentParentId && !req.session.admin)  {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {
        try {
            await res.subtask.remove()
            res.json({ message: 'Deleted User'})
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
})

// Find specific subtask
async function getSubtask(req, res, next) {
    let subtask
    try {
        subtask = await Subtask.findById(req.params.id)
        if(subtask == null) {
            return res.status(404).json({ message: 'Cannot find subtask' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subtask = subtask
    next()
}


module.exports = router
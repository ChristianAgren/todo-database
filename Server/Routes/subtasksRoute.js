const express = require('express')
const router = express.Router()
const Subtask = require('../Models/subtaskModel')

//Middlewares
const checkLoginSession = require('../Middlewares/checkLoginSession')
const getSubtask = require('../Middlewares/getSubtask')
const validateAuthor = require('../Middlewares/validateAuthor')

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
router.post('/', checkLoginSession, validateAuthor, async (req, res) => {
    const subtask = new Subtask({
        parentId: req.body.parentId,
        desc: req.body.desc,
        status: req.body.status
    })
    try {
        const newSubtask = await subtask.save()
        res.status(201).json(newSubtask)
    } catch (err) {
        res.status.apply(400).json({ message: err.message })
    }
})

// Change whole object 
router.put('/:id', checkLoginSession, getSubtask, validateAuthor, async (req, res) => {
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
})

//Deleting One
router.delete('/:id', checkLoginSession, getSubtask, validateAuthor, async (req, res) => {
    try {
        await res.subtask.remove()
        res.json(res.subtask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
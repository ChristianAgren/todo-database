const Subtask = require('../Models/subtaskModel')

module.exports = async function (req, res, next) {
    let subtask
    try {
        subtask = await Subtask.findById(req.params.id)
        if (subtask == null) {
            return res.status(404).json({ message: 'Cannot find subtask' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subtask = subtask
    next()
}
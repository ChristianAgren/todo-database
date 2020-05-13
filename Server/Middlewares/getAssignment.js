const Assignment = require('../Models/assignmentModel')

module.exports = async function (req, res, next) {
    let assignment

    try {
        if (req.params.id) {
            assignment = await Assignment.findById(req.params.id)
        } else {
            assignment = await Assignment.findById(req.body.id)
        }
        if (assignment == null) {
            return res.status(404).json({ message: 'Cannot find assignment' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.assignment = assignment
    next()
}
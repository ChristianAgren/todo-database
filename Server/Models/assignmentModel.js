const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    assignmentDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Assignment', assignmentSchema)
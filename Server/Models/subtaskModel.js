const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Subtask', subtaskSchema)

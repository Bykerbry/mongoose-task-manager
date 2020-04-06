const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', function(next) {
    const task = this
    if(task.isModified('description')) {
        task.description = task.description.charAt(0).toUpperCase() + task.description.slice(1)
    }
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
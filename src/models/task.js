const mongoose = require('mongoose')
const User = require('./user')


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

taskSchema.pre('save', function(next) {
    if(this.isModified('description')) {
        this.description = this.description.charAt(0).toUpperCase() + this.description.slice(1)
    }
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
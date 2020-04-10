const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Jim',
    email: 'jim@mailers.com',
    password: 'Pass123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Sam',
    email: 'sam@mailers.com',
    password: 'anotherPass123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test Task",
    completed: false,
    author: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test Task #2",
    completed: true,
    author: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test Task #3",
    completed: true,
    author: userTwo._id
}


const setupDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDB
}

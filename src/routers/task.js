const express = require('express')
const Task = require('../models/task')
const router = new express.Router()





router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then(tasks => {
    //     res.send(tasks)
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

router.get('/tasks/:id', async (req,res) => {

    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task) 
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(req.params.id).then(task => {
    //     if(!task) {
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

router.patch('/tasks/:id', async (req, res) => {
    const _id            = req.params.id
    const updates        = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid        = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ "error": "Invalid Request"})
    }

    try {
        const task = await Task.findById(_id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router
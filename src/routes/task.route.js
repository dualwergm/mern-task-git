const express = require('express');
const router = express.Router();

const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    const taskSaved = await task.save();
    res.json(taskSaved);
});

router.put('/:id', async (req, res) => {
    const task = req.body;
    console.log(req.params.id, task);
    const taskUpdated = await Task.findOneAndUpdate(req.params.id, task);
    res.json(taskUpdated);
});

router.delete('/:id', async (req, res) => {
   const tDeleted = await Task.findOneAndRemove(req.params.id);
   res.json(tDeleted);
});

module.exports = router;
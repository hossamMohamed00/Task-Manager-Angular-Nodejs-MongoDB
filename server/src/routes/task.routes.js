const express = require('express')
const router = express.Router()
// Load the Task model
const Task = require('../models/task.model')

/* Routes Handlers */
/**
 * @method Get
 * @name: /lists/:listId/tasks
 * @purpose : Return all tasks available for specified list
 * @params : List Id to get its tasks
 * @return: Array of tasks of the given list
 */
router.get('/:listId/tasks', async (req, res, next) => {
  try {
    const listId = req.params.listId
    const tasks = await Task.find({ listId })
    res.send(tasks)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Post
 * @name: /lists/:listId/tasks
 * @params : List Id to get its tasks
 * @purpose : create new task in specified list
 * @return: The new task
 */
router.post('/:listId/tasks', async (req, res, next) => {
  try {
    // Extract the listId from the params
    const listId = req.params.listId
    // Extract the title from the body
    const title = req.body.title
    // create new list object
    const task = new Task({ title, listId })
    // Save the list
    await task.save()

    res.status(201).send(task)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Patch
 * @name: /lists/:listId/tasks/:taskId
 * @param : list id
 * @param : task id
 * @body : JSON object contains task new information
 * @purpose : Update task data
 * @return: Task with the updates
 */
router.patch('/:listId/tasks/:taskId', async (req, res, next) => {
  try {
    // Extract the listId and taskId from the params
    const listId = req.params.listId
    const taskId = req.params.taskId
    // Extract the title from the body
    // Update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, listId },
      {
        $set: req.body
      },
      { new: true }
    )

    res.send(updatedTask)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Delete
 * @name: /lists/:listId/tasks/:taskId
 * @param : list id
 * @param : task id
 * @purpose : Delete task of specified list
 * @return: Return the delete response
 */
router.delete('/:listId/tasks/:taskId', async (req, res, next) => {
  try {
    // Extract the id from the params
    const listId = req.params.listId
    const taskId = req.params.taskId
    // Delete the task
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, listId })

    if (!deletedTask) {
      return res.send({ status: 'failure', message: 'Task Not Found ❌' })
    }

    res.send(deletedTask)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
// Load the List model
const List = require('../models/list.model')
const Task = require('../models/task.model')
// Load the auth middleware
const authRequest = require('../middleware/auth.middleware')

/* Routes Handlers */
/**
 * @method Get
 * @name: /lists
 * @purpose : Return all lists available for the user
 * @return: Array of lists from db
 */
router.get('/', authRequest, async (req, res, next) => {
  try {
    let select = ''
    if (req.query.fieldName) {
      select = req.query.fieldName
    }
    const lists = await List.find({ _userId: req.user_id }, select)
    res.send(lists)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Post
 * @name: /lists
 * @body : JSON object contains list information
 * @purpose : create new list for this user
 * @return: The new list
 */
router.post('/', authRequest, async (req, res, next) => {
  try {
    // Extract the title from the body
    const title = req.body.title
    const _userId = req.user_id
    // create new list object
    const list = new List({ title, _userId })
    // Save the list
    await list.save()

    res.status(201).send(list)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Patch
 * @name: /lists/:listId
 * @param : list id
 * @body : JSON object contains list new information
 * @purpose : Update list data
 * @return: List with the updates
 */
router.patch('/:listId', authRequest, async (req, res, next) => {
  try {
    // Extract the title from the body
    const title = req.body.title
    const _userId = req.user_id
    // Extract the id from the params
    const _id = req.params.listId
    // Update the list
    const updatedList = await List.findOneAndUpdate(
      { _id, _userId },
      { title },
      { new: true }
    )

    res.send(updatedList)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/**
 * @method Delete
 * @name: /lists/:listId
 * @param : list id
 * @purpose : Delete list
 * @return: Return the delete response
 */
router.delete('/:listId', authRequest, async (req, res, next) => {
  try {
    // Extract the id from the params
    const _id = req.params.listId
    const _userId = req.user_id
    // Delete the list (Note the tasks will be deleted automatically)
    const deletedCount = await List.deleteOne({ _id, _userId })
    if (deletedCount.deletedCount <= 0) {
      return res
        .status(404)
        .send({ status: 'failure', message: 'List Not Found ❌' })
    }

    // Delete the list's tasks
    deleteTasks(_id)
    res.send({ status: 'success', message: 'List Deleted ✅' })
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

/* Helper functions */
const deleteTasks = (listId) => {
  Task.deleteMany({
    listId
  }).then(() => {
    console.log('Tasks from ' + listId + ' were deleted!')
  })
}
module.exports = router

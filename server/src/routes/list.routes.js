const express = require('express')
const router = express.Router()
// Load the List model
const List = require('../models/list.model')

/* Routes Handlers */
/**
 * @method Get
 * @name: /lists
 * @purpose : Return all lists available
 * @return: Array of lists from db
 */
router.get('/', async (req, res, next) => {
  try {
    const lists = await List.find({})
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
router.post('/', async (req, res, next) => {
  try {
    // Extract the title from the body
    const title = req.body.title
    // create new list object
    const list = new List({ title })
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
router.patch('/:listId', async (req, res, next) => {
  try {
    // Extract the title from the body
    const title = req.body.title
    // Extract the id from the params
    const _id = req.params.listId
    // Update the list
    const updatedList = await List.findByIdAndUpdate(
      _id,
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
router.delete('/:listId', async (req, res, next) => {
  try {
    // Extract the id from the params
    const _id = req.params.listId
    // Delete the list
    const deletedList = await List.findByIdAndDelete(_id)

    if (!deletedList)
      return res.send({ status: 'failure', message: 'List Not Found ❌' })

    res.send(deletedList)
  } catch (error) {
    res.status(500).send({ status: 'failure', message: error.message })
  }
})

module.exports = router

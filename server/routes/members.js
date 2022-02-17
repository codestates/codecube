const router = require('express').Router()
const controller = require('../controllers')

router.delete('/:userId-:projectId', controller.members.delete)
router.put('/join', controller.members.put.join)
router.put('/exclude', controller.members.put.exclude)
router.post('/', controller.members.post)
router.get('/:projectId', controller.members.get)

module.exports = router

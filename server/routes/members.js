const router = require('express').Router()
const controller = require('../controllers')

router.delete('/:userId', controller.members.delete)
router.put('/join', controller.members.put)
router.post('/', controller.members.post)
router.get('/:postId', controller.members.get)

module.exports = router

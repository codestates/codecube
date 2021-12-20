const router = require('express').Router()
const controller = require('../controllers')

router.post('/callback', controller.github.callback)
router.get('/userInfo', controller.github.userInfo)

module.exports = router

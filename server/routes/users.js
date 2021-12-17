const router = require('express').Router()
const controller = require('../controllers')

router.get('/users', controller.users.users.get)
router.delete('/uesrs', controller.users.users.delete)
router.put('/', controller.users.changeinfo.put)
router.get('/logout', controller.users.logout.get)
router.post('/signup', controller.users.signup.post)
router.post('/login', controller.users.login.post)

module.exports = router

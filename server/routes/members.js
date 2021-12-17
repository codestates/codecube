const router = require('express').Router();
const controller = require('../controllers')

router.get('/users',controller.users.users)
router.delete('/uesrs',controller.users.users)
router.put('/',controller.users.changeinfo)
router.get('/logout',controller.users.logout)
router.post('/signup',controller.users.signup)
router.post('/login',controller.users.login)
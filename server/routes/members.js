const router = require('express').Router();
const controller = require('../controllers')

router.delete('/:user-id',controller.members.delete)
router.put('/join',controller.members.put)
router.post('/',controller.members.post)
router.get('/:post-id',controller.members.get)
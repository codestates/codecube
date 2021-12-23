const router = require('express').Router()
const controller = require('../controllers')

router.get('/joblist', controller.openapi.joblist)

module.exports = router

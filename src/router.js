const router = require('express').Router()
const healthController = require('./health/healthController')

router.use('/healthz', healthController.get)

module.exports = router

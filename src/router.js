const router = require('express').Router()
const authMiddleware = require('./middlewares/authMiddleware')
const healthController = require('./health/healthController')
const folderController = require('./folders/folderController')
const Folder = require('./folders/Folder')

router.get('/healthz', healthController.get)

router.get(Folder.uri, authMiddleware, folderController.get)
router.get(`${Folder.uri}/:id`, authMiddleware, folderController.getById)
router.post(Folder.uri, authMiddleware, Folder.validation(), folderController.post)
router.put(`${Folder.uri}/:id`, Folder.validation(), authMiddleware, folderController.put)
router.delete(`${Folder.uri}/:id`, authMiddleware, folderController.del)

module.exports = router

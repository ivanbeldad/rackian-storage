const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const router = require('./router')

let myServer = null

const server = {
  start: () => {
    const port = process.env.PORT || 10001
    app.use(bodyParser.json())
    router.enroute(app)
    myServer = app.listen(port, () => logger.info(`Server listening on port ${port}`))
    return myServer
  },

  stop: async () => {
    logger.info('Stopping server...')
    if (!myServer) {
      logger.warn('Trying to stop server, but it had not been started')
      return
    }
    return new Promise(resolve => {
      myServer.close(() => {
        logger.info('Server stopped')
        resolve()
      })
    })
  }
}

module.exports = server

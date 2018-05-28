require('dotenv').config()
const logger = require('./utils/logger')
const db = require('./utils/db')
const server = require('./server')

db.init()
  .then(() => {
    server.start()
  })

process.on('SIGTERM', () => {
  logger.info('Closing gracefully...')
  Promise.all([
    server.stop(),
    db.close()
  ])
    .then(() => {
      logger.info('Application finished')
      process.exit(0)
    })
})

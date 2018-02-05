const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('./utils/logger')

const server = {
  start: () => {
    const port = process.env.PORT || 3000
    app.use(bodyParser.json())
    app.listen(port, () => logger.info(`Server listening on port ${port}`))
  },

  stop: () => {
    logger.info(`Server stopped`)
    process.exit(0)
  }
}

module.exports = server

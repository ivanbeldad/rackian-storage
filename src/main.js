require('dotenv').config()

require('./utils/db').init()
.then(() => {
  const server = require('./server')
  server.start()
})

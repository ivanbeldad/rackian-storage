require('./utils/config').init()
.then(() => {
  return require('./utils/db').init()
})
.then(() => startServer())

const startServer = () => {
  const server = require('./server')
  server.start()
}

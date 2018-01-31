const { MongoClient } = require('mongodb')
const logger = require('./logger')
const configLoader = require('./configLoader')

module.exports = (async () => {
  const config = await configLoader()
  const client = await MongoClient.connect(config.db.uri)
  const db = client.db(config.db.dbName)
  logger.log('info', `Database ${config.db.dbName} loaded`)
  return db
})()

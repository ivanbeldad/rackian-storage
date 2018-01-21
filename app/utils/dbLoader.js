const { MongoClient } = require('mongodb')

module.exports = async (config) => {
  const client = await MongoClient.connect(config.db.uri)
  return client.db(config.db.dbName)
}

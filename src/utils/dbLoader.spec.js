require('jest')

jest.mock('mongodb')
const { MongoClient } = require('mongodb')
const dbloader = require('./dbLoader')
const config = {
  db: {
    uri: 'uri',
    dbName: 'dbName'
  }
}
const dbMethod = jest.fn()
MongoClient.connect = jest.fn(async () => Promise.resolve({ db: dbMethod }))

describe('dbloader', () => {
  it('should call MongoClient.connect', async () => {
    await dbloader(config)
    expect(MongoClient.connect.mock.calls.length).toBe(1)
  })

  it('should call connect using uri from config', async () => {
    await dbloader(config)
    const currentCall = MongoClient.connect.mock.calls.length - 1
    expect(MongoClient.connect.mock.calls[currentCall][0]).toBe(config.db.uri)
  })

  it('should select dbName from config', async () => {
    await dbloader(config)
    expect(dbMethod.mock.calls[0][0]).toBe(config.db.dbName)
  })
})

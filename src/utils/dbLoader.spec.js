require('jest')

// MongoDB Mock
jest.mock('mongodb')
const { MongoClient } = require('mongodb')

// Config Mock
jest.mock('./configLoader', () => {
  return () => {
    return new Promise(resolve => {
      resolve({
        db: {
          uri: 'uri',
          dbName: 'dbName'
        }
      })
    })
  }
})

const dbLoader = require('./dbLoader')
const conf = {
  db: {
    uri: 'uri',
    dbName: 'dbName'
  }
}
const dbMethod = jest.fn()
MongoClient.connect = jest.fn(async () => Promise.resolve({ db: dbMethod }))

describe('dbLoader', () => {
  it('should call MongoClient.connect', async () => {
    await dbLoader
    expect(MongoClient.connect.mock.calls.length).toBe(1)
  })

  it('should call connect using uri from config', async () => {
    await dbLoader
    const currentCall = MongoClient.connect.mock.calls.length - 1
    expect(MongoClient.connect.mock.calls[currentCall][0]).toBe(conf.db.uri)
  })

  it('should select dbName from config', async () => {
    await dbLoader
    expect(dbMethod.mock.calls[0][0]).toBe(conf.db.dbName)
  })
})

require('jest')

// MongoDB Mock
jest.mock('mongodb')
const { MongoClient } = require('mongodb')
const collectionMethods = {
  insert: jest.fn(() => {}),
  insertOne: jest.fn(() => {}),
  find: jest.fn(() => mongoDb.collection()),
  findOne: jest.fn(() => {}),
  filter: jest.fn(() => mongoDb.collection()),
  project: jest.fn(() => mongoDb.collection()),
  limit: jest.fn(() => mongoDb.collection()),
  skip: jest.fn(() => mongoDb.collection()),
  toArray: jest.fn(() => {}),
  save: jest.fn(() => {}),
  updateOne: jest.fn(() => {}),
  deleteOne: jest.fn(() => {}),
  collection: jest.fn(() => {}),
  createIndex: jest.fn(() => {})
}
const mongoDb = {
  collection: jest.fn(() => {
    return collectionMethods
  }),
  close: jest.fn(() => {}),
  createCollection: jest.fn(() => {})
}
const client = {
  db: jest.fn(() => {
    return mongoDb
  }),
  close: jest.fn()
}
MongoClient.connect = jest.fn(async () => {
  return client
})

const db = require('./db')

describe('Db', () => {
  it('Any operation should throw an error if database is not loaded', async () => {
    let error = null
    try {
      await db.load('collection').save({ object: {} })
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
})

describe('Db', () => {
  beforeAll(async () => {
    await db.connect()
  })

  it('Db should exists after connect', async () => {
    expect(db.database()).not.toBeNull()
  })

  it('Disconnect should call client.close', async () => {
    await db.close()
    expect(client.close).toHaveBeenCalledTimes(1)
  })

  it('Database should return the database', () => {
    expect(db.database()).toBe(mongoDb)
  })

  it('Find should throw error if there is not either skip or limit', async done => {
    try {
      await db.load('collection').find({})
      done.fail()
    } catch (err) {
      done()
    }
  })

  it('Find should call find, filter, project, skip, limit and toArray', async () => {
    await db.load('collection').find({ limit: 1, skip: 1 })
    expect(mongoDb.collection().find).toBeCalled()
    expect(mongoDb.collection().filter).toBeCalled()
    expect(mongoDb.collection().project).toBeCalled()
    expect(mongoDb.collection().skip).toBeCalled()
    expect(mongoDb.collection().limit).toBeCalled()
    expect(mongoDb.collection().toArray).toBeCalled()
  })

  it('Find should rename id to _id', async () => {
    const filter = { id: 'myid' }
    await db.load('collection').find({ limit: 1, skip: 1, filter })
    expect(filter.id).toBeUndefined()
    expect(filter._id).toBe('myid')
  })

  it('FindOne should throw an error if there is no ID', async done => {
    try {
      await db.load('collection').findOne()
      done.fail()
    } catch (err) {
      done()
    }
  })

  it('FindOne should call findOne with a filter', async () => {
    await db.load('collection').findOne({ filter: { id: 'myid' } })
    expect(mongoDb.collection().findOne).toBeCalledWith({ _id: 'myid' })
  })

  it('Save should throw an error if there is no object', async done => {
    try {
      await db.load('collection').save()
      done.fail()
    } catch (err) {
      done()
    }
  })

  it('Save should call save with the object', async () => {
    const object = { property: 'value' }
    await db.load('collection').save({ object })
    expect(mongoDb.collection().save).toBeCalledWith(object)
  })

  it('Update should throw an error if there is no id or new object', async done => {
    try {
      await db.load('collection').update()
      done.fail()
    } catch (err) {
      done()
    }
  })

  it('Update should call updateOne with the _id and new object', async () => {
    let id = 'myid'
    const newObject = { property: 'value' }
    await db.load('collection').update({ id, newObject })
    expect(mongoDb.collection().updateOne).toBeCalledWith({ _id: id }, newObject)
  })

  it('Delete should throw an error if there is no object', async done => {
    try {
      await db.load('collection').delete()
      done.fail()
    } catch (err) {
      done()
    }
  })

  it('Delete should call save with the object', async () => {
    let id = 'myid'
    await db.load('collection').delete({ id })
    expect(mongoDb.collection().deleteOne).toBeCalledWith({ _id: id })
  })

  it('Collection should return the collection', () => {
    expect(db.load('collection').collection()).toBe(mongoDb.collection())
  })
})

// TODO
describe('Init', () => {
  beforeAll(async () => {
    await db.init()
  })

  it('Should create all collections', () => {
    expect(mongoDb.createCollection).toHaveBeenCalledTimes(Object.keys(db.collection).length)
  })

  it('Should create indexes', () => {
    expect(mongoDb.collection().createIndex).toHaveBeenCalledTimes(6)
  })
})

require('jest')

const data = [{ name: 'nameFolder' }]
const dbObject = {
  find: jest.fn(() => data)
}
jest.doMock('../utils/db', () => {
  return {
    load: () => dbObject
  }
})

const db = require('../utils/db').load()
const httpMocks = require('node-mocks-http')
const folderController = require('./folderController')
const Folder = require('./Folder')

let req = httpMocks.createRequest()
req.pagination = {
  limit: () => 10,
  skip: () => 0
}
req.user = {
  id: 'userid'
}
let res = httpMocks.createResponse()
let next = jest.fn()
res.status = jest.fn(() => res)
res.send = jest.fn(() => res)
res.end = jest.fn(() => res)

describe('Folder Controller', () => {
  beforeEach(() => {
    next = jest.fn()
  })

  it('Get should call db', async () => {
    await folderController.get(req, res, next)
    expect(db.find).toHaveBeenCalledTimes(1)
  })
  it('Get should call db filtering by user', async () => {
    await folderController.get(req, res, next)
    expect(db.find.mock.calls[0][0].filter).toHaveProperty('user', 'userid')
  })
  it('Data result should be an array of folders', async () => {
    await folderController.get(req, res, next)
    expect(res.data).toBeInstanceOf(Array)
    expect(res.data[0]).toBeInstanceOf(Folder)
  })
  it('Get should add the data result to the response object', async () => {
    await folderController.get(req, res, next)
    expect(res.data[0].name).toBe('nameFolder')
  })
  it('Get should call next when finished', async () => {
    await folderController.get(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})

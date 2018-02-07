require('jest')

require('dotenv').config()
const httpMocks = require('node-mocks-http')

const requestPaginationMiddleware = require('./requestPaginationMiddleware')

let req = httpMocks.createRequest()
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
let next = jest.fn(() => res.end())

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
  next = jest.fn(() => res.end())
})

describe('Request pagination middleware', () => {
  it('req.pagination.page should be 1 if it is not defined in the query', done => {
    res.on('end', () => {
      try {
        expect(req.pagination.page).toBe(1)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })

  it('req.pagination.page should be 5 if query page exists', done => {
    req.query.page = 5
    res.on('end', () => {
      try {
        expect(req.pagination.page).toBe(5)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })

  it('req.pagination.limit should be 20 if it is not defined in the query', done => {
    res.on('end', () => {
      try {
        expect(req.pagination.limit).toBe(20)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })

  it('req.pagination.limit should be 10 if it is defined in the query', done => {
    req.query.pageSize = 10
    res.on('end', () => {
      try {
        expect(req.pagination.limit).toBe(10)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })

  it('req.pagination.skip should be 0 if page is 1', done => {
    res.on('end', () => {
      try {
        expect(req.pagination.skip).toBe(0)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })

  it('req.pagination.skip should be 40 if page is 3', done => {
    req.query.page = 3
    res.on('end', () => {
      try {
        expect(req.pagination.skip).toBe(40)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    requestPaginationMiddleware(req, res, next)
  })
})

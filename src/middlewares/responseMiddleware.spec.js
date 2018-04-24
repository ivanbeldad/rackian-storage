require('jest')

require('dotenv').config()
const httpMocks = require('node-mocks-http')

const Pagination = require('./Pagination')
const responseMiddleware = require('./responseMiddleware')

let req = httpMocks.createRequest()
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
let next = jest.fn(() => res.end())

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
  next = jest.fn(() => res.end())
})

describe('Response middleware', () => {
  it('Should not add link headers if pagination is not required', done => {
    res.on('end', () => {
      try {
        expect(res.getHeader('Link')).toBeUndefined()
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    responseMiddleware(req, res, next)
  })
  it('Should add link headers if pagination is required', done => {
    req.pagination = new Pagination({
      page: 2,
      pageSize: 10
    })
    res.on('end', () => {
      try {
        expect(res.getHeader('Link')).toBeDefined()
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    responseMiddleware(req, res, next)
  })
  it('Should add link next rel', done => {
    req.pagination = new Pagination({
      page: 2,
      pageSize: 10
    })
    res.on('end', () => {
      try {
        expect(res.getHeader('Link')).toBeDefined()
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    responseMiddleware(req, res, next)
  })
})

require('jest')

require('dotenv').config()
const httpMocks = require('node-mocks-http')

const Pagination = require('./Pagination')
const paginationMiddleware = require('./paginationMiddleware')

let req = httpMocks.createRequest()
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
let next = jest.fn(() => res.end())

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
  next = jest.fn(() => res.end())
})

describe('Request pagination middleware start', () => {
  it('Should attach a new pagination object to req.pagination', done => {
    res.on('end', () => {
      try {
        expect(req.pagination).toBeInstanceOf(Pagination)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    paginationMiddleware.paginate(req, res, next)
  })

  it('Should add req.query.page to pagination.page', done => {
    const pagination = new Pagination({ page: 100, pageSize: 100 })
    req = httpMocks.createRequest({
      query: {
        page: 100,
        pageSize: 1000
      }
    })
    res.on('end', () => {
      try {
        expect(req.pagination.page).toBe(pagination.page)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    paginationMiddleware.paginate(req, res, next)
  })

  it('Should add req.query.pageSize to pagination.pageSize', done => {
    const pagination = new Pagination({ page: 100, pageSize: 100 })
    req = httpMocks.createRequest({
      query: {
        page: 100,
        pageSize: 100
      }
    })
    res.on('end', () => {
      try {
        expect(req.pagination.pageSize).toBe(pagination.pageSize)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    paginationMiddleware.paginate(req, res, next)
  })
})

describe('Request pagination middleware end', () => {
  it('Should not add link headers if pagination is not required', done => {
    res.on('end', () => {
      try {
        expect(res.getHeader('Link')).toBeUndefined()
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    paginationMiddleware.process(req, res, next)
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
    paginationMiddleware.process(req, res, next)
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
    paginationMiddleware.process(req, res, next)
  })
})

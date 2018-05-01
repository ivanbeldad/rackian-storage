require('jest')

require('dotenv').config()
const httpMocks = require('node-mocks-http')

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
  it('', done => {
    res.on('end', () => {
      try {
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    responseMiddleware(req, res, next)
  })
})

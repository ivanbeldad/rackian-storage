require('jest')

var httpMocks = require('node-mocks-http')

const username = 'username'
const password = 'password'
const base64UserAndPass = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='

const User = require('../auth/User')

jest.doMock('../auth/userService', () => {
  return {
    validate: jest.fn(async (u, p) => {
      if (u === username && p === password) {
        return new User({ username, password })
      }
    })
  }
})
const userService = require('../auth/userService')
const authMiddleware = require('./authMiddleware')

let req = httpMocks.createRequest()
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter })
let next = jest.fn(() => res.end())

describe('Authentication Middleware', () => {
  beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn(() => res.end())
  })

  it('Should throw a 401 error and add WWW-Authenticate Header', done => {
    res.on('end', () => {
      try {
        expect(res.statusCode).toBe(401)
        expect(res.getHeader('WWW-Authenticate')).toBe('Basic')
        expect(next).toBeCalledWith(new Error('Need authentication'))
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    authMiddleware(req, res, next)
  })

  it('Should call userService.validate with credentials decoded', done => {
    req.headers['authentication'] = base64UserAndPass
    res.on('end', () => {
      try {
        expect(userService.validate).toBeCalledWith(username, password)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    authMiddleware(req, res, next)
  })

  it('Should send a 403 error if there are invalid credentials', done => {
    req.headers['authentication'] = 'asdf324rt34'
    res.on('end', () => {
      try {
        expect(res.statusCode).toBe(403)
        expect(next).toBeCalledWith(new Error('Invalid credentials'))
      } catch (err) {
        done.fail(err)
      }
      done()
    })
    authMiddleware(req, res, next)
  })

  it('Should maintain status code 200 and not throw an error if credentials are ok', done => {
    req.headers['authentication'] = base64UserAndPass
    res.on('end', () => {
      try {
        expect(next).toBeCalledWith()
        expect(res.statusCode).toBe(200)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    authMiddleware(req, res, next)
  })

  it('Should attach the user to request if is valid', done => {
    req.headers['authentication'] = base64UserAndPass
    res.on('end', () => {
      try {
        expect(req.user).toBeInstanceOf(User)
        expect(req.user.username).toBe(username)
        done()
      } catch (err) {
        done.fail(err)
      }
    })
    authMiddleware(req, res, next)
  })
})

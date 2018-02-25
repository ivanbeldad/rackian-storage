require('jest')

const httpMocks = require('node-mocks-http')
const { validationResult } = require('express-validator/check')
const Folder = require('./Folder')

let req = httpMocks.createRequest()

beforeEach(() => {
  req.body = {
  }
})

describe('Folder', () => {
  it('Should throw error if name does not exists', () => {
    const validate = () => {
      expect(validationResult(req).isEmpty()).toBeFalsy()
    }
    Folder.validation()[0](req, null, validate)
  })
})

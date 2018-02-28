require('jest')

const httpMocks = require('node-mocks-http')
const healthController = require('./healthController')

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()
res.status = jest.fn(() => res)
res.send = jest.fn(() => res)
res.end = jest.fn(() => res)

describe('Health Controller', () => {
  it('Should return 200 status', () => {
    expect(res.statusCode).toBe(200)
  })
  it('Should call end', async () => {
    await healthController.get(req, res)
    expect(res.end).toHaveBeenCalledTimes(1)
  })
})

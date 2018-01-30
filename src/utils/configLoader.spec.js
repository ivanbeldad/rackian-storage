require('jest')
jest.mock('fs-extra')

const fs = require('fs-extra')
const jsYaml = require('js-yaml')
const configLoader = require('./configLoader')

fs.readFile = jest.fn(async () => {
  return jsYaml.dump({
    development: { hello: 'world' },
    production: {}
  })
})

beforeEach(() => {
  process.env.NODE_ENV = 'development'
})

describe('config loader', () => {
  it('should call fs.readFile with the location of config.yml', async () => {
    await configLoader()
    expect(fs.readFile.mock.calls.length).toBe(1)
    expect(fs.readFile.mock.calls[0][0]).toBe('./app/config.yml')
  })

  it('should return an object with the configuration', async () => {
    expect(await configLoader()).toMatchObject({ hello: 'world' })
  })
})

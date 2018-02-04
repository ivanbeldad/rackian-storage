require('jest')

jest.mock('fs-extra')
const fs = require('fs-extra')
fs.readFile = jest.fn(async () => {
  return jsYaml.dump({
    test: { hello: 'world' }
  })
})

const jsYaml = require('js-yaml')
const config = require('./config')

describe('config loader', () => {
  it('should throw an error if it is not loaded', async () => {
    expect(() => config.load()).toThrowError()
  })
})

describe('config loader', () => {
  beforeAll(async () => {
    await config.init()
  })

  it('should call fs.readFile with the location of config.yml', async () => {
    expect(fs.readFile.mock.calls.length).toBe(1)
    expect(fs.readFile.mock.calls[0][0]).toBe('./src/config.yml')
  })

  it('should return an object with the configuration', async () => {
    expect(config.load()).toMatchObject({ hello: 'world' })
  })
})

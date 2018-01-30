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

  it('shouldn\'t throw errors passing either production or development', async () => {
    process.env.NODE_ENV = 'production'
    await expect(configLoader()).resolves.toBeDefined()
    process.env.NODE_ENV = 'development'
    await expect(configLoader()).resolves.toBeDefined()
    process.env.NODE_ENV = 'another'
    await expect(configLoader()).rejects
      .toThrowError('NODE_ENV must be either development or production')
  })

  it('should return an object with the configuration', async () => {
    expect(await configLoader()).toMatchObject({ hello: 'world' })
  })
})

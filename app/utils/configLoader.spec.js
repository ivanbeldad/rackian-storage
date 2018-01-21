require('jest')
jest.mock('fs-extra')

const fs = require('fs-extra')
const jsYaml = require('js-yaml')
const configLoader = require('./configLoader')

fs.readFile = jest.fn(async () => {
  return jsYaml.dump({
    dev: { hello: 'world' },
    prod: {}
  })
})

describe('config loader', () => {
  it('should call fs.readFile with the location of config.yml', async () => {
    await configLoader()
    expect(fs.readFile.mock.calls.length).toBe(1)
    expect(fs.readFile.mock.calls[0][0]).toBe('./app/config.yml')
  })

  it('shouldn\'t throw errors passing either prod or dev', async () => {
    await expect(configLoader('prod')).resolves.toBeDefined()
    await expect(configLoader('dev')).resolves.toBeDefined()
  })
  it('should throw error if value is passed but prod or env', async () => {
    await expect(configLoader('another')).rejects.toThrowError('env must be either dev or prod')
  })

  it('should return an object with the configuration', async () => {
    expect(await configLoader()).toMatchObject({ hello: 'world' })
  })
})

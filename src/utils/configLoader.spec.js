require('jest')

jest.mock('fs-extra')
const fs = require('fs-extra')
fs.readFile = jest.fn(async () => {
  return jsYaml.dump({
    test: { hello: 'world' }
  })
})

const jsYaml = require('js-yaml')

const configLoader = require('./configLoader')

describe('config loader', () => {
  it('should call fs.readFile with the location of config.yml', async () => {
    await configLoader
    expect(fs.readFile.mock.calls.length).toBe(1)
    expect(fs.readFile.mock.calls[0][0]).toBe('./src/config.yml')
  })

  it('should return an object with the configuration', async () => {
    expect(await configLoader).toMatchObject({ hello: 'world' })
  })
})

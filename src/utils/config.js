const fs = require('fs-extra')
const jsYaml = require('js-yaml')

/**
 * @typedef {Object} ConfigAPI
 * @property {string} uri
 * @property {number} port
 * @property {number} pageSize
 */

/**
 * @typedef {Object} ConfigDB
 * @property {string} uri
 * @property {string} dbName
 */

/**
 * @typedef {Object} Config
 * @property {ConfigAPI} api
 * @property {ConfigDB} db
 */

/**
 * @type {Config}
 */
let config

const init = async () => {
  let enviroment = process.env.NODE_ENV || 'development'
  const configContent = await fs.readFile('./src/config.yml')
  const conf = jsYaml.load(configContent)[enviroment]
  config = conf
}

const load = () => {
  if (!config) throw new Error(`Configuration is not loaded`)
  return config
}

module.exports = { init, load }

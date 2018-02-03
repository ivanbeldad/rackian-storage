const fs = require('fs-extra')
const jsYaml = require('js-yaml')

/**
 * @typedef {Object} ConfigAPI
 * @property {string} uri
 * @property {number} port
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
 * @return {Promise<Config>}
 */
module.exports = (async () => {
  let enviroment = process.env.NODE_ENV || 'development'
  const configContent = await fs.readFile('./src/config.yml')
  const config = jsYaml.load(configContent)[enviroment]
  return config
})()

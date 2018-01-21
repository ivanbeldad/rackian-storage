const fs = require('fs-extra')
const jsYaml = require('js-yaml')

/**
 * @param {('prod'|'dev')} env
 */
module.exports = async (env = 'dev') => {
  if (env !== 'dev' && env !== 'prod') throw new Error('env must be either dev or prod')
  const configContent = await fs.readFile('./app/config.yml')
  return jsYaml.load(configContent)[env]
}

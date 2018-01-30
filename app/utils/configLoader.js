const fs = require('fs-extra')
const jsYaml = require('js-yaml')

module.exports = async () => {
  const env = process.env.NODE_ENV || 'development'
  if (env !== 'development' && env !== 'production') {
    throw new Error('NODE_ENV must be either development or production')
  }
  const configContent = await fs.readFile('./app/config.yml')
  return jsYaml.load(configContent)[env]
}

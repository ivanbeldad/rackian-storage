const fs = require('fs-extra')
const jsYaml = require('js-yaml')

module.exports = async () => {
  const configContent = await fs.readFile('./app/config.yml')
  return jsYaml.load(configContent)[process.env.NODE_ENV]
}

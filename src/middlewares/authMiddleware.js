const userService = require('../auth/userService')
const logger = require('../utils/logger')

const getCredentials = (encoded) => {
  const encodedValues = encoded.replace('Basic ', '')
  const decodedValues = Buffer.from(encodedValues, 'base64').toString('ascii')
  const username = decodedValues.substr(0, decodedValues.indexOf(':'))
  const password = decodedValues.substr(decodedValues.indexOf(':') + 1, decodedValues.length)
  return { username, password }
}

module.exports = (req, res, next) => {
  if (!req.get('Authentication')) {
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(401)
    logger.info('Request without authentication')
    return next(new Error('Need authentication'))
  }
  const credentials = getCredentials(req.get('Authentication'))
  userService.validate(credentials.username, credentials.password)
    .then(user => {
      if (!user) {
        res.status(403)
        logger.info('Invalid credentials')
        return next(new Error('Invalid credentials'))
      }
      req.user = user
      return next()
    })
    .catch(err => next(err))
}

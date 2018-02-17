const winston = require('winston')

const loggers = {

  production: new winston.Logger({
    level: 'info',
    timestamp: true,
    transports: [
      new winston.transports.Console({
        timestamp: true,
        prettyPrint: true,
        colorize: true
      })
    ]
  }),

  staging: new winston.Logger({
    level: 'verbose',
    timestamp: true,
    transports: [
      new winston.transports.Console({
        timestamp: true,
        prettyPrint: true,
        colorize: true
      })
    ]
  }),

  development: new winston.Logger({
    level: 'verbose',
    timestamp: true,
    transports: [
      new winston.transports.Console({
        timestamp: true,
        prettyPrint: true,
        colorize: true
      })
    ]
  }),

  test: new winston.Logger({
    level: 'none',
    timestamp: true,
    transports: [
      new winston.transports.Console({
        timestamp: true,
        prettyPrint: true,
        colorize: true
      })
    ]
  })

}

/**
 * @typedef {Object} Logger
 * @property {function(string, string)} log
 * @property {function(string)} error
 * @property {function(string)} warn
 * @property {function(string)} info
 * @property {function(string)} verbose
 * @property {function(string)} debug
 * @property {function(string)} silly
*/

/**
 * @type {Logger}
 */
let logger = loggers[process.env.NODE_ENV || 'development']

module.exports = logger

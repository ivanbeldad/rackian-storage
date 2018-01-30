const winston = require('winston')

const logger = {

  production: new winston.Logger({
    level: 'info',
    timestamp: true,
    transports: [ new winston.transports.Console() ]
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
  })

}

module.exports = logger[process.env.NODE_ENV]

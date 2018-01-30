require('jest')
const winston = require('winston')

describe('Logger', () => {
  it('Should be an instance of Logger', () => {
    process.env.NODE_ENV = 'development'
    const logger = require('./logger')
    expect(logger).toBeInstanceOf(winston.Logger)
  })
})

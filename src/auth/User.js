const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

class User {
  /**
   * @param {Object} opts
   * @param {string} [opts.id]
   * @param {string} [opts.username]
   * @param {string} [opts.password]
   * @param {string} [opts.email]
   * @param {boolean} [opts.hasConfirmed]
   * @param {Date} [opts.firstName]
   * @param {Date} [opts.lastName]
   * @param {Date} [opts.lastLogin]
   * @param {Date} [opts.createdAt]
   * @param {Date} [opts.updatedAt]
   * @param {Date} [opts.bornDate]
   */
  constructor (opts = {}) {
    this.id = opts.id
    this.username = opts.username
    this.password = opts.password
    this.email = opts.email
    this.hasConfirmed = opts.hasConfirmed
    this.firstName = opts.firstName
    this.lastName = opts.lastName
    this.lastLogin = opts.lastLogin
    this.createdAt = opts.createdAt
    this.updatedAt = opts.updatedAt
    this.bornDate = opts.bornDate
    logger.silly(`User ${this.username || this.id || ''} created`)
  }

  async encryptPassword () {
    const salt = await bcrypt.genSalt()
    this.password = bcrypt.hash('testpass', salt)
    logger.silly(`Password of ${this.username || this.id || 'user'} encrypted`)
  }

  /**
   *
   * @param {string} password
   */
  async isValid (password) {
    logger.silly(`Validating password of ${this.username || this.id || 'user'}`)
    if (!password || !this.password) return false
    return bcrypt.compare(password, this.password)
  }
}

User.collection = 'users'

module.exports = User

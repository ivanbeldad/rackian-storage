const dbLoader = require('../utils/dbLoader')
const User = require('./User')
const logger = require('../utils/logger')

const getUser = async (username) => {
  const db = await dbLoader
  try {
    const userObject = db.collection(User.collection).findOne({ username })
    if (!Object.keys(userObject).length) {
      logger.debug(`Not user found with username ${username}`)
      return null
    }
    logger.debug(`User getted: ${username}`)
    return new User(userObject)
  } catch (error) {
    logger.error(error)
    return null
  }
}

const userService = {
  /**
   * @param {string} username
   * @param {string} password
   * @return {Promise<User>}
   */
  validate: async (username, password) => {
    const user = await getUser(username)
    if (!user) return false
    logger.debug(`User getted: ${JSON.stringify(user)}`)
    const isValid = await user.isValid(password)
    logger.debug(`${username} password validation ${isValid ? 'valid' : 'invalid'}`)
    return isValid ? user : null
  }
}

module.exports = userService

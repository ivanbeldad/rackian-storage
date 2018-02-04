require('jest')

const user = 'username'
const pass = 'testpass'

const User = require('./User')
User.prototype.isValid = jest.fn(paramPass => pass === paramPass)

// DB MOCK
jest.doMock('../utils/db', () => {
  return {
    load: () => {
      return {
        findOne: (username) => {
          if (username) {
            return {
              username: 'username',
              password: 'testpass'
            }
          }
          return null
        }
      }
    }
  }
})
jest.mock('../utils/db.js')

const userService = require('./userService')

describe('User service', () => {
  it('Validate should return the User if is valid', async () => {
    const result = await userService.validate(user, pass)
    expect(result).toBeInstanceOf(User)
    expect(result.username).toBe(user)
  })

  it('Validate should return null is the user is invalid', async () => {
    const result = await userService.validate(user, 'another')
    expect(result).toBeNull()
  })
})

require('jest')

const pass = 'testpass'
const salt = 'salt'
const encrypted = 'encrypted'

// BCRYPT MOCK
jest.mock('bcrypt')
const bcrypt = require('bcrypt')
bcrypt.genSalt = jest.fn(() => salt)
bcrypt.hash = jest.fn(() => encrypted)
bcrypt.compare = jest.fn((password, encrypt) => password === pass && encrypt === encrypted)

const User = require('./User')

describe('User', () => {
  it('Should not throw error on empty constructor or with an object', () => {
    expect(() => new User()).not.toThrowError()
    expect(() => new User({})).not.toThrowError()
  })

  it('EncryptPassword should save hash in user.password', async () => {
    const user = new User({ password: pass })
    await user.encryptPassword()
    expect(user.password).toBe(encrypted)
  })

  it('IsValid should return true if password is correct', async () => {
    const user = new User({ password: pass })
    await user.encryptPassword()
    expect(await user.isValid(pass)).toBeTruthy()
  })

  it('IsValid should return false if password is incorrect', async () => {
    const user = new User({ password: pass })
    await user.encryptPassword()
    expect(await user.isValid(`${pass}-other`)).toBeFalsy()
  })

  it(`isValid should return false if either there is not password \
  as argument or as property`, async () => {
    const user = new User()
    expect(await user.isValid(pass)).toBeFalsy()
    user.password = pass
    user.encryptPassword()
    expect(await user.isValid()).toBeFalsy()
  })
})

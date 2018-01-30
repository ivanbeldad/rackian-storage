require('jest')
const helloWorld = require('./helloWorld')

describe('Temporal test', () => {
  it('Hello World should return Hello World', () => {
    expect(helloWorld).toBe('Hello World!')
  })
})

require('jest')

const Pagination = require('./Pagination')

describe('Pagination', () => {
  it('Should set page by default to 1', () => {
    const pagination = new Pagination()
    expect(pagination.getPage()).toBe(1)
  })

  it('Page should be 5 if 5 is passed', () => {
    const pagination = new Pagination({ page: 5 })
    expect(pagination.getPage()).toBe(5)
  })

  it('Should set pageSize by default to Pagination.pageSize', () => {
    const pagination = new Pagination()
    expect(pagination.getPageSize()).toBe(Pagination.pageSize)
  })

  it('Pagesize should be 10 if 10 is passed', () => {
    const pagination = new Pagination({ pageSize: 10 })
    expect(pagination.getPageSize()).toBe(10)
  })

  it('Pagesize should be 200 if 200 is passed', () => {
    const pagination = new Pagination({ pageSize: 200 })
    expect(pagination.getPageSize()).toBe(200)
  })

  it('Limit should be 10 if 10 is passed', () => {
    const pagination = new Pagination({ pageSize: 10 })
    expect(pagination.limit()).toBe(10)
  })

  it('Limit should be Pagination.maxPageSize if setted over Pagination.maxPageSize', () => {
    const pagination = new Pagination({ pageSize: 500 })
    expect(pagination.limit()).toBe(Pagination.maxPageSize)
  })

  it('Skip should return 20 if we are on second page with default size', () => {
    const pagination = new Pagination({ page: 2 })
    expect(pagination.skip()).toBe(20)
  })
})

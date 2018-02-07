class Pagination {
  /**
   *
   * @param {Object} opts
   * @param {number} [opts.page]
   * @param {number} [opts.pageSize]
   */
  constructor (opts = {}) {
    this.page = opts.page || Pagination.firstPage
    this.pageSize = opts.pageSize || Pagination.pageSize
  }

  getPage () {
    return this.page
  }

  getPageSize () {
    return this.pageSize
  }

  limit () {
    if (this.pageSize > Pagination.maxPageSize) return Pagination.maxPageSize
    return this.pageSize
  }

  skip () {
    return (this.page - 1) * this.pageSize
  }
}

Pagination.firstPage = 1
Pagination.pageSize = 20
Pagination.maxPageSize = 100

module.exports = Pagination

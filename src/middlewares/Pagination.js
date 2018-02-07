class Pagination {
  /**
   *
   * @param {Object} opts
   * @param {number} [opts.page]
   * @param {number} [opts.pageSize]
   */
  constructor (opts = {}) {
    this.page = opts.page || Pagination.firstPage
    this.pageSize = opts.pageSize || Pagination.pageSizeDefault
  }

  getPage () {
    return this.page
  }

  getPageSize () {
    return this.pageSize
  }

  limit () {
    if (this.pageSize > Pagination.pageSizeMax) return Pagination.pageSizeMax
    return this.pageSize
  }

  skip () {
    return (this.page - 1) * this.pageSize
  }
}

Pagination.firstPage = 1
Pagination.pageSizeDefault = process.env.PAGE_SIZE_DEFAULT || 20
Pagination.pageSizeMax = process.env.PAGE_SIZE_MAX || 100

module.exports = Pagination

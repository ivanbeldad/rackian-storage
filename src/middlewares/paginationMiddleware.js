const Pagination = require('./Pagination')

module.exports = (req, res, next) => {
  /** @type {Pagination} */
  req.pagination = new Pagination({
    page: req.query.page,
    pageSize: req.query.pageSize
  })
  next()
}

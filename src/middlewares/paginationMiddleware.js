const Pagination = require('./Pagination')

const paginate = (req, res, next) => {
  /** @type {Pagination} */
  req.pagination = new Pagination({
    page: req.query.page,
    pageSize: req.query.pageSize
  })
  next()
}

const process = (req, res, next) => {
  if (req.pagination === undefined) return next()
  res.setHeader('Link', 'rel')
  next()
}

module.exports = { paginate, process }

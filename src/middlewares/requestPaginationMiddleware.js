const config = require('../utils/config').load()

module.exports = (req, res, next) => {
  req.pagination = {}
  req.pagination.page = req.query.page || 1
  req.pagination.limit = req.query.pageSize || config.api.pageSize
  req.pagination.skip = (req.pagination.page - 1) * req.pagination.limit
  next()
}

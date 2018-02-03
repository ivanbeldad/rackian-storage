const configLoader = require('../utils/configLoader')

module.exports = async (req, res, next) => {
  req.pagination = {}
  req.pagination.page = req.query.page || 1
  const config = await configLoader
  req.pagination.limit = req.query.pageSize || config.api.pageSize
  req.pagination.skip = (req.pagination.page - 1) * req.pagination.limit
  next()
}

module.exports = (req, res, next) => {
  req.pagination = {}
  req.pagination.page = req.query.page || 1
  req.pagination.limit = req.query.pageSize || parseInt(process.env.PAGE_SIZE)
  req.pagination.skip = (req.pagination.page - 1) * req.pagination.limit
  next()
}

// TODO
// Create pagination headers if necessary
// Create object response

module.exports = (req, res, next) => {
  if (req.pagination === undefined) return next()
  res.setHeader('Link', 'rel')
  next()
}

const get = (req, res) => {
  res.status(200).send({ status: 'ok' }).end()
}

module.exports = { get }

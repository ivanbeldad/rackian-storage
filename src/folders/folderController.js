const db = require('../utils/db').load('folders')
// const Folder = require('./Folder')
// const { validationResult } = require('express-validator/check')

const get = async (req, res, next) => {
  const result = await db.find({
    limit: req.pagination.limit(),
    skip: req.pagination.skip(),
    filter: {
      'user': req.user.id
    }
  })
  res.data = result
  next()
}

const getById = (req, res, next) => {

}

const post = (req, res, next) => {

}

const put = (req, res, next) => {

}

const del = (req, res, next) => {

}

module.exports = { get, getById, post, put, del }

const { check } = require('express-validator/check')
const logger = require('../utils/logger')

class Folder {
  /**
   *
   * @param {Object} opts
   * @param {string} opts.url
   * @param {string} opts.id
   * @param {string} opts.name
   * @param {Folder} opts.parentFolder
   * @param {[]} opts.files
   * @param {[]} opts.links
   */
  constructor (opts = {}) {
    this.url = opts.url
    this.id = opts.id
    this.name = opts.name
    this.parentFolder = opts.parentFolder || null
    this.files = opts.files || []
    this.links = opts.links || []
    logger.silly(`Folder ${opts.name || opts.id} created`)
  }

  /**
   * @param {[]} objArray
   * @return {Folder[]}
   */
  static fromArray (objArray) {
    return objArray.map(obj => new Folder(obj))
  }

  static validation () {
    return [
      check('name').exists().not().isEmpty()
    ]
  }
}

Folder.collection = 'folders'
Folder.uri = '/folders'

module.exports = Folder

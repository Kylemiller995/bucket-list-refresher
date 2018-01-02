var express = require('express')
var router = express.Router()
var QueryHelper = require('../db/query_helper.js')

var removeIds = function (objects) {
  return objects.map(function (object) {
    delete object._id
    return object
  })
}

var countryQueryHelper = new QueryHelper('mongodb://localhost:27017/bucket_list', 'countries')

router.get('/', function (req, res) {
  countryQueryHelper.all(function (countries) {
    res.json(removeIds(countries))
  })
})

router.post('/', function (req, res) {
  countryQueryHelper.save(req.body, function (updatedCountries) {
    res.json(updatedCountries)
  })
})

module.exports = router

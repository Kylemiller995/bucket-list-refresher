var requestHelper = require('./helpers/request_helper.js')
var FormView = require('./views/form.js')
var ListView = require('./views/list.js')

var globalCountries = []
var listView = null

var setUpList = function () {
  listView = new ListView(document.querySelector('div.list-container'))
  requestHelper.get(
    'http://localhost:3000/api/countries',
    function(savedCountries){
      listView.populate(savedCountries, ['name', 'notes'])
    }
  )
}

var onFormSubmit = function (formData){
  var countryData = globalCountries[formData.country]
  console.log(countryData +" country")
  console.log(formData + " form")
  countryData.notes = formData.notes

  var url = 'http://localhost:3000/api/countries'
  requestHelper.post(url, countryData, function(updatedSavedCountries){
    listView.clear()
    listView.populate(updatedSavedCountries, ['name', 'notes'])
  })
}

var setUpForm = function(countryNames){
  var formView = new FormView(document.querySelector('div.form-container'))
  formView.addDropDown('country', countryNames)
  formView.addTextInput('notes')
  formView.addOnSubmit(onFormSubmit, 'add to bucket list')
}

window.addEventListener('DOMContentLoaded', function() {
  setUpList()
  var url = 'https://restcountries.eu/rest/v2/all'
  requestHelper.get(url, function (countries){
    globalCountries = countries
    var countryNames = countries.map(function (country){
      return country.name
    })
    setUpForm(countryNames)
  })
})

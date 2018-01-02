/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var capitalise = function (string) {
  var initial = string[0].toUpperCase()
  var rest = string.slice(1).toLowerCase()
  return initial + rest
}

module.exports = capitalise


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(2)
var FormView = __webpack_require__(3)
var ListView = __webpack_require__(4)

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var requestHelper = {}

requestHelper.get = function (url, onRequestComplete) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) {
      console.error('GET request status was not 200, it was:', xhr.status)
      return
    }
    onRequestComplete(JSON.parse(xhr.responseText))
  })
  xhr.send()
}

requestHelper.post = function (url, payload, onRequestComplete) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) {
      console.error('POST request status was not 200, it was:', xhr.status)
      return
    }
    onRequestComplete(JSON.parse(xhr.responseText))
  })
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(payload))
}

module.exports = requestHelper


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var capitalise = __webpack_require__(0)

var FormView = function (container) {
  this.form = document.createElement('form')
  this.inputTypes = []
  container.appendChild(this.form)
}

FormView.prototype.addDropDown = function (fieldName, choices) {
  var select = document.createElement('select')
  select.name = fieldName
  select.id = fieldName + '-select'

  choices.forEach(function (choice, index) {
    var option = document.createElement('option')
    option.value = index
    option.textContent = choice
    select.appendChild(option)
  })

  var label = document.createElement('label')
  label.for = select.id
  label.textContent = capitalise(fieldName)

  this.form.appendChild(label)
  this.form.appendChild(select)
  this.inputTypes.push('SELECT')
}

FormView.prototype.addTextInput = function (fieldName) {
  var input = document.createElement('input')
  input.type = 'text'
  input.name = fieldName
  input.id = fieldName + '-input'

  var label = document.createElement('label')
  label.for = input.id
  label.textContent = capitalise(fieldName)

  this.form.appendChild(label)
  this.form.appendChild(input)
  this.inputTypes.push('INPUT')
}

FormView.prototype.addOnSubmit = function (onSubmit, submitText) {
  var submitButton = document.createElement('input')
  submitButton.type = 'submit'
  if (submitText !== undefined) {
    submitButton.value = submitText
  }
  this.form.appendChild(submitButton)

  this.form.addEventListener('submit', function (event) {
    event.preventDefault()
    var form = event.target
    var childElements = form.children
    var inputs = this.filterInputs(childElements)

    var resultsObject = this.buildResultsObject(inputs)

    onSubmit(resultsObject)
  }.bind(this))
}

FormView.prototype.filterInputs = function (elements) {
  var elementsArray = Array.from(elements)
  return elementsArray.filter(function (element) {
    var inputExists = this.inputTypes.includes(element.tagName)
    var hasName = element.name !== ''
    var hasValue = element.value !== ''
    return (inputExists && hasName && hasValue)
  }.bind(this))
}

FormView.prototype.buildResultsObject = function (inputs) {
  var results = {}
  inputs.forEach(function (input) {
    results[input.name] = input.value
  })
  return results
}

module.exports = FormView


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var ListView = function(container){
  this.list = document.createElement('ul')
  container.appendChild(this.list)
}

ListView.prototype.addItem = function (object, includeKeys){
  var listItem = document.createElement('li')

  includeKeys.forEach(function(key){
    var paragraph = document.createElement('p')
    paragraph.textContent = object[key]
    listItem.appendChild(paragraph)
  })

  this.list.appendChild(listItem)
}

ListView.prototype.populate = function (objects, includeKeys){
  objects.forEach(function(object){
    this.addItem(object, includeKeys)
  }.bind(this))
}

ListView.prototype.clear = function () {
  while(this.list.hasChildNodes()){
    this.list.removeChild(this.list.lastChild)
  }
}

module.exports = ListView


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
var capitalise = require('../helpers/capitalise.js')

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

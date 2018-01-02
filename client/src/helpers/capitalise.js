var capitalise = function (string) {
  var initial = string[0].toUpperCase()
  var rest = string.slice(1).toLowerCase()
  return initial + rest
}

module.exports = capitalise

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

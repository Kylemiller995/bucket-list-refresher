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

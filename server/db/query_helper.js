var MongoClient = require('mongodb').MongoClient

var QueryHelper = function(url, collectionName) {
  this.url = url
  this.collectionName = collectionName
}

QueryHelper.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if (err) {
        console.error('Could not access DB - MongoClient threw an error:', err.message)
        onQueryfinish({error: 'Could not access database'})
      }
      var database = db.db('bucket_list')
      var collection = database.collection(this.collectionName)
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs)
      })
    }.bind(this))
  },

  save: function(data, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var database = db.db('bucket_list')
      var collection = database.collection(this.collectionName)
      collection.insert(data)
      collection.find().toArray(function(err, updatedDocs){
        onQueryFinished(updatedDocs)
      })
    }.bind(this))
  }

};

module.exports = QueryHelper

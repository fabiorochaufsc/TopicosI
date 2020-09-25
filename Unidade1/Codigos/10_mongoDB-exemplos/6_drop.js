var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("AULA");

  dbo.collection("Usuarios4").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("AULA");
  var mysort = { nome: 1 };
  dbo.collection("Usuarios").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
   var dbo = db.db("AULA");
  dbo.collection("Usuarios").find().limit(3).toArray(function(err, result) {
    if (err) throw err;
    for (let x=0; x< result.length;x++)
    		console.log(result[x].nome);
    db.close();
  });
});

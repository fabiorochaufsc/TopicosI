var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("AULA");

  dbo.collection("novo").drop(function(err, delOK) {
    if (err) 
    {
      console.log('erro apagando colecao que nao existe');
    }
    else  if (delOK) console.log("Collection deleted");
    db.close();
  });
});

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';
var dbo;


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err)
    {
      console.log('erro acessando BD');
    }
    dbo = db.db("AULA");


   dbo.createCollection("Usuarios", function(err2, res) {
     console.log('a')
    if (err2) {
      console.log('erro criando colecao')
    }
    else {
      console.log("Collection created!");
    }


  });



});

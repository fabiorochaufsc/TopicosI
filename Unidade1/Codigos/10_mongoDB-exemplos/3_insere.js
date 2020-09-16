var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'


var SHA256 = require("sha256");



  if (process.argv.length == 5)
  {
    MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
      if (err) throw err
      var dbo = db.db("AULA");
      let ID       = process.argv[2];
      let nome     = process.argv[3];
      let password = process.argv[4];
    password = (SHA256(password).toString());
    console.log(password)


      var myobj = { _id: ID, nome: nome, password: password }
      dbo.collection('Usuarios').insertOne(myobj, function (err, res) {
        if (err)
        {
          console.log("erro inserindo elemento")
        }
        else {
          console.log('1 document inserted')
        }
        db.close()
      })
    })
  }
  else
  {
    console.log("Forma de usar:   insere ID nome senha")
    console.log("Exemplo:         insere frr 'Fabio Rocha' teste123")
  }

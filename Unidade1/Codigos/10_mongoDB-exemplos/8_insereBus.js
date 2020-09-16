var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err, db) {  if (err) throw err
      var dbo = db.db("AULA");

  var myobj =  {
    "route" : "azul",
    "busID" : "1",
    "driverID" : "frr",
    "timestamp" : 0,
    "macaddress" : "00:00:00:00",
    "ODB" : {
        "valor" : "",
        "timestamp" : 0
    },
    "STATUS" : {
        "valor" : "",
        "timestamp" : 0
    }
}

  dbo.collection('bus').insertOne(myobj, function (err, res) {
    if (err) throw err
    console.log('1 document inserted')
    db.close()
  })
})

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("AULA");

  var newpass="gato";
  var myquery = {_id:'frr' };
  var newvalues = { $set: {password: newpass} };

  dbo.collection("Usuarios").updateOne(myquery, newvalues, function(err, res) {
    if (err) {
      console.log(err)
      throw err;
    }
    db.close();

  });
});

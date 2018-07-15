var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/onibus";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var old = "teste";
  var newpass="gato";
  var myquery = {password:old, id:'admin' };
  var newvalues = {id:'admin',password: newpass };
  db.collection("admin").updateOne(myquery, newvalues, function(err, res) {
    if (err) {
      console.log(err)
      throw err;
    }
    db.close();
   
  });
}); 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/onibus";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { id: "admin", password: "123" };
  db.collection("admin").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 

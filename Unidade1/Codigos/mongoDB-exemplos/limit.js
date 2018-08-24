var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("criancas");
  dbo.collection("Usuarios").find().limit(5).toArray(function(err, result) {
    if (err) throw err;
  //  console.log(result);
    for (let x=0; x< result.length;x++)
    		console.log(result[x].nome);
    db.close();
  });
}); 

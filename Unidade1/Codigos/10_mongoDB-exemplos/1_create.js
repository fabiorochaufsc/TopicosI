var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';
var dbo;


MongoClient.connect(url, {useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err, db) {
    if (err)
    {
      console.log('erro conectando como servidor de BD');
    }
    else console.log('sucesso');
    dbo = db.db("AULA");
});

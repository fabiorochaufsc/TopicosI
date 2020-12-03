
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	
    //var inputDB = new PouchDB('turtles',{adapter: 'cordova-sqlite'});
        var inputDB = new PouchDB('turtles');
    var remoteDB = new PouchDB('http://192.168.0.111:3000/turtles');
    remoteDB.replicate.to(inputDB).on('complete', function (info) {
  showTodos();
  });


/*
inputDB.put({
  _id: 'mydoc7',
  title: 'Heroes'
}).then(function (response) {
alert('sucesso');
}).catch(function (err) {
alert('erro');
}); */


function showTodos() {
  inputDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
  	var vet=[];
  	//for (var a =0;a<doc.rows;a++) vet.push(doc[a].title)
    alert(JSON.stringify(doc));
  });
}








}

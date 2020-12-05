var cordova=false;
var inputDB;

if (typeof(cordova) == "object") cordova = true;



function onDeviceReady() {

      if (cordova) inputDB = new PouchDB('turtles', {revs_limit: 1, auto_compaction: true, 
        adapter: 'cordova-sqlite'
    });
    else inputDB = new PouchDB('turtles');




inputDB.put({
  _id: 'mydoc9',
  title: 'Heroes'
}).then(function (response) {
console.log('sucesso');
}).catch(function (err) {
console.log('erro');
}); 

showTodos();

}

function showTodos() {
  inputDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
  	var vet=[];
  	//for (var a =0;a<doc.rows;a++) vet.push(doc[a].title)
    console.log(JSON.stringify(doc));
  });
}



if (cordova) document.addEventListener('deviceready', onDeviceReady, false);
else onDeviceReady();






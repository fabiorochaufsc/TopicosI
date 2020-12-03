var cordova = false;
var inputDB;
var vet = [];

if (typeof(cordova) == "object") cordova = true;

function insereImagemTela(err, blob) {
    var url = URL.createObjectURL(blob);
    var img = document.createElement('img');
    img.src = url;

    var elem = document.getElementById("imagem");
    elem.appendChild(img);
}

function showTodos() {
    /*inputDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
	vet=doc.rows;
  		//console.log(vet);
  		//console.log(vet[0].doc._attachments);
  		
  	//for (var a =0;a<doc.rows;a++) vet.push(doc[a].title)
    //alert(JSON.stringify(doc));
 });*/


    inputDB.get("mydoc7", {
        attachments: true
    }).then(function(doc) {
        var attachments = doc._attachments;
        for (photo in attachments) {
            console.log(photo);
            inputDB.getAttachment("mydoc7", photo, insereImagemTela)

        }
    }).catch(function(err) {
        console.log(err);
    });


}


function onDeviceReady() {
    if (cordova) inputDB = new PouchDB('turtles', {
        adapter: 'cordova-sqlite'
    });
    else inputDB = new PouchDB('turtles');

    var remoteDB = new PouchDB('http://192.168.0.111:3000/turtles');
    remoteDB.replicate.to(inputDB).on('complete', function(info) {
        showTodos();
    }).on('error', function(info) {
        showTodos();
    });;
}

if (cordova) document.addEventListener('deviceready', onDeviceReady, false);
else onDeviceReady();

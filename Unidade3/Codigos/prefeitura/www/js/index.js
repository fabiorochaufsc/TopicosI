var meuGPS;
var id = 0;
var fileURL;
var db = window.openDatabase("reclamaru", "1.0", "REclamaRu database", 2 * 1024 * 1024);
var mail = "gabriel_ghellere@hotmail.com"
var title;
var comment;
var response;

function O(id) {
    return document.getElementById(id);
}
function win(r) {

}

// gerencia o dom
function activePage() {
    $('.targetPage').click(function () {
        var target = $(this).attr('switchTo');
        if ($(this).attr('id') === 'fb') {
            $(target).addClass('page-active')
        }
        else {
            $('.page').removeClass('page-active');
            $(target).addClass('page-active')
        }
    })
}
activePage();

function activePageform() {
    console.log('encaminhando')
    $('.targetForm').click(function () {
        var target = $(this).attr('switchForm');
        $('.page').removeClass('page-active');
        $(target).addClass('page-active')
    })
}

//GPS PLUGIN
var onSuccess = function (position) {
    meuGPS = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    alert("Local adicionado " + meuGPS.latitude + ' \n' + meuGPS.longitude)
};

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

// CAMERA PLUGIN
function camerasucesso(DATA_URL) {
    var image = document.getElementById('minhaImagem');
    image.src = "data:image/jpeg;base64," + DATA_URL;
    fileURL = image.src;
    image.style.display = "block";

}
function camerafalha(message) {
    alert('Failed because: ' + message);
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// CRUD
// cria banco de dados
function createDB() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS CLAINS');
            tx.executeSql('CREATE TABLE IF NOT EXISTS CLAINS(id INTEGER PRIMARY KEY ASC, titulo varchar(255) , desc varchar(255), lat float, lon float)');
        });
    } catch (err) {
        alert('erro banco')
    }
    console.log('banco criado')
    console.log(db);
}

function successCB() {
    //
}

function insertClain(id, title, desc, lat, lon) {
    db.transaction(
        function (tx) {
            tx.executeSql(
                "INSERT INTO CLAINS VALUES (?, ?, ?, ?, ?)", [id, title, desc, lat, lon],
                function (tx, result) {
                    console.log("Query Success");
                },
                function (tx, error) {
                    console.log("Query Error: " + error.message);
                }
            );
        },
        function (error) {
            console.log("Erro ao inserir: " + error.message);
        },
        function () {
            console.log("Dados inseridos");
        }
    );
}

function search() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM CLAINS ', [], function (tx, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    response = results.rows.item(i);
                    console.log(results.rows.item(i));
                }
            });
        });
    } catch (err) {
        alert('erro na busca ' + err)
    }
    console.log('buscou')
}

function errorCB(tx, err) {
    alert("Erro: " + err);
}

function createlist() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM CLAINS ', [], function (tx, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    response = results.rows.item(i);
                    console.log(results.rows.item(i));
                    var node = document.createElement("P");
                    var textnode = document.createTextNode(i + ' titulo: ' + results.rows.item(i)['titulo']);
                    node.appendChild(textnode);
                    document.getElementById("items").appendChild(node);

                    var node = document.createElement("LI");
                    var textnode = document.createTextNode(i + ' desc: : ' + results.rows.item(i)['desc'])
                    node.appendChild(textnode);
                    document.getElementById("items").appendChild(node);
                }
            });
        });
    } catch (err) {
        alert('erro na busca ' + err)
    }
    console.log('buscou')
}


function sendMail() {
    cordova.plugins.email.open({
        to: mail, // email addresses for TO field
        subject: title,
        body: comment + '\nLocal da reclamação:' + meuGPS.latitude + ', ' + meuGPS.longitude, // email body (for HTML, set isHtml to true)
        attachments: [fileURL]
    });
}

//APP
var app = {
    initialize: function (isCordovaApp) {
        if (isCordovaApp) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else this.receivedEvent();
    },
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        createDB();
        createlist();
        O('gps').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }, false);

        O('camera').addEventListener('click', function () {
            navigator.camera.getPicture(camerasucesso, camerafalha, {
                quality: 25,
                destinationType: Camera.DestinationType.DATA_URL,
                saveToPhotoAlbum: true
            });
        }, false);

        O('procurar').addEventListener('click', function() {
            createlist();
        })

        O('clain').addEventListener('click', function () {
            id += 1;
            title = O('titulo').value;
            comment = O('descricao').value;
            if (validateForm(titulo, descricao)) {
                insertClain(id, title, comment, meuGPS.latitude, meuGPS.longitude);
                sendMail();
                alert('Sua reclamacao foi salva\nObrigado')
            }
            else {
                alert('Preencha corretamente o formulario')
            }
        }, false);
    }
};

function validateForm(titulo, descricao) {
    if (titulo == "" || descricao == "") {
        return false;
    }
    else return true
}

app.initialize();







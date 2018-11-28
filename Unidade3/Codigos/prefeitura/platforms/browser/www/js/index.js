var meuGPS;
var id = 0;
var fileURL;
var db = window.openDatabase("reclamaru", "1.0", "REclamaRu database", 2 * 1024 * 1024);
var mail = "gabriel_ghellere@hotmail.com"
var title;
var comment;

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
    alert("local adicionado " + meuGPS.latitude + ' \n'+ meuGPS.longitude)
};

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

// CAMERA PLUGIN
function camerasucesso(DATA_URL) {
    var image = document.getElementById('minhaImagem');
    image.src = "data:image/jpeg;base64," + DATA_URL;
    fileURL = image;
    image.style.display= "block";

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
                console.log(results.rows);
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


function sendMail(){
    cordova.plugins.email.open({
        to:         mail, // email addresses for TO field
        subject:    title,
        body:       comment + '\nLocal da reclamação:' + meuGPS.latitude + ', '+ meuGPS.longitude, // email body (for HTML, set isHtml to true)
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
        O('gps').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }, false);

        O('camera').addEventListener('click', function () {
            navigator.camera.getPicture(camerasucesso, camerafalha, {
                quality: 25,
                destinationType: Camera.DestinationType.DATA_URL,
                saveToPhotoAlbum:true
            });
        }, false);

        O('clain').addEventListener('click', function () {
            id += 1;
            title = O('titulo').value;
            comment = O('descricao').value;
            if (validateForm(titulo, descricao)) {
                insertClain(id, title, comment, meuGPS.latitude, meuGPS.longitude);
                sendMail();
                alert('Sua reclamacao foi salva\nObrigado')
                search();
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







function periodica() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =document.getElementById("demo").innerHTML+ xhttp.responseText;
        }
    };
    xhttp.open("GET", "http://frr-note.ignorelist.com:3000/hora", true);
    xhttp.send();

}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('botao').addEventListener('click', function() {
        alert('teste 1234');


    }, false);

});

setInterval(periodica, 2000);
console.log('iniciou o codigo js no browser');
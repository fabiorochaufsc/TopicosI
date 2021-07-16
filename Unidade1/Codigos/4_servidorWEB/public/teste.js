function periodica() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =document.getElementById("demo").innerHTML+"<BR>"+ xhttp.responseText;
        }
    };
    xhttp.open("GET", "http://localhost:4000/hora", true);
    xhttp.send();

}

document.addEventListener("DOMContentLoaded", function(event) {
  

});

setInterval(periodica, 2000);


console.log('iniciou o codigo js no browser');
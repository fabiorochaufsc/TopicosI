function carrega (url,dados)
{
  $("#conteudo").load(url, function(responseTxt, statusTxt, xhr){
    try {
      init(dados)
    }catch(e)
    {
    }
  });
}

function envia (rota,dado, cb)
{
    var xhttp = new XMLHttpRequest();
    rota='http://localhost:3000/'+rota;

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        try {
          let resposta = JSON.parse(xhttp.responseText);
                  cb(resposta)

        }
        catch(e){
          return
        }
        
        
      }
    };
    xhttp.open("POST", rota, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dado);
  }
  function POSTA (dado) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let resposta = JSON.parse(xhttp.responseText);
        switch (resposta.tipo)
        {
            case 'FALHALOGIN':
                  alert('falha no login');
                  break;
            case 'SUCESSOLOGIN':
                  alert('sucesso no login');
                  carrega('logados.html',resposta.dado);
                  break;
            case 'FALHAREMOVE':
                  alert('erro removendo sensor');
                  break;
        }
        
      }
    };
    xhttp.open("POST", "http://localhost:3000/LOGIN", true);
     xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dado );
  }
  // ----------------------------------------
    
    
    function O(id)
    {
      return document.getElementById(id);
    }
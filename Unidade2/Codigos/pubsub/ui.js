function O (id)
  {
    return document.getElementById(id)
  }

PubSub.subscribe('init', function (msg, data) {

  console.log('Modulo UI inicializado');

});
  O('envia').addEventListener('click', function() {
      let i = O('id').value;
      let p = O('password').value;
      
      PubSub.publish('enviaDados', {ID:i,password:p});

  },false);
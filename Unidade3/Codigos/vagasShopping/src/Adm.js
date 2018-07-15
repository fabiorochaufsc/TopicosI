
function Adm () {
  this.id = 0;
  this.conectados = Object();
  this.TIMEOUT = 10000;
  this.PERIODICIDADE=5000;

  setInterval(this.varreduraPeriodica.bind(this),this.PERIODICIDADE)

}

Adm.prototype.conecta = function (ws)
{
  ws.id = this.id;
  ws.validado=false;
  ws.timestamp = Date.now();
  this.conectados[ws.id]=ws;
  //this.conectados.push(ws);
  this.id++;
}
Adm.prototype.ehValido = function (ws)
{
  return ws.validado;
}
Adm.prototype.desconecta = function (ws)
{
  ws.validado=false;
  ws.close();

  delete this.conectados[ws.id];
  console.log('tam',Object.keys(this.conectados).length)
  if  (Object.keys(this.conectados).length==0) this.id = 0;
}
 Adm.prototype.envia = function (msg )
 {
    this.conectados[msg.msgValue.destinatario].send(JSON.stringify({tipo:msg.msgType,valor:msg.msgValue.dados}))
 }
 Adm.prototype.enviaBroadcast = function (msg )
 {
    for (x in this.conectados)
    {
          this.conectados[x].send(JSON.stringify({tipo:msg.msgType,valor:msg.msgValue.dados}))
    }
   
 }

Adm.prototype.varreduraPeriodica = function ()
{
 // console.log('varredura rodando...'+Object.keys(this.conectados).length)
  let agora = Date.now();

  let x=0;

  for (x in this.conectados)
  {

    if (( this.conectados[x].validado==false) && ((agora -  this.conectados[x].timestamp) >  this.TIMEOUT ) )
    {
        console.log('remove usuario da lista de ativos')
        let MSG = {tipo:'ERRO',valor:'timeout'};
         this.conectados[x].send(JSON.stringify(MSG));
         this.conectados[x].close();
        delete this.conectados[x]

    }
  }


}


Adm.prototype.valida = function (ws, dados)
{
  ws.validado=true;
  return true;
}

module.exports = Adm;
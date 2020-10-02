process.on('uncaughtException',function(erro){
	console.log('erro detectado e nao tratado, o app sera encerrado.');
})


function minhaFuncao ()
{
    return A;

}


console.log('App iniciou.');
setTimeout(function(){
	minhaFuncao();

},5000);

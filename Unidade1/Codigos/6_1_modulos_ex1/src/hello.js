/*
	Exporta apenas uma funcao
	forma de usar:
	var hello = require ('./hello.js');
	hello('oi mundo');
*/

module.exports = function(msg) {
	console.log(msg);
};

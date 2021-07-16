var QRCode = require("qrcode-svg");


var qrcode = new QRCode({
  content: "https://fabiodelarocha.paginas.ufsc.br",
  padding: 4,
  width: 256,
  height: 256,
  color: "#000000",
  background: "#ffffff",
  ecl: "M",
});





qrcode.save("sample.svg", function(error) {
  if (error)  console.log('deu erro');
  else   console.log("Done!");

});


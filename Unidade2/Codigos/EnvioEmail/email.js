'use strict';



var config       = require('config');
const nodemailer = require('nodemailer');


function ListaEmail()
{
    this.transporter = nodemailer.createTransport(config.authEmail);
    /*const transporter = nodemailer.createTransport({ // Configura os parâmetros de conexão com servidor.
  host: 'smtp.umbler.com',
  port: 547,
  secure: false,
  auth: {
    user: 'exemplo@ufsc.br',
    pass: 'ex3mpl0'
  }
})*/


}

ListaEmail.prototype.check = function() {



}

ListaEmail.prototype.sendEmail = function(data) {
    try {
      var mailOptions = { // Define informações pertinentes ao E-mail que será enviado
        to: data.to,
        from:config.nomeLoja+'<'+config.authEmail.user+'>',
        subject: data.subject,
        text: data.text
      };

      this.transporter.sendMail(mailOptions, function(err, info) {
        if (err)
        {
          console.log('Erro enviando email para '+mailOptions.to);
        }
        else console.log('Sucesso ao enviar email para '+mailOptions.to);
      });

    } catch (e) {}

}
module.exports = ListaEmail;

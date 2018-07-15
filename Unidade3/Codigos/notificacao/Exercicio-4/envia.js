var admin = require("firebase-admin");


var registrationToken = "";
var serviceAccount = require("./serviceAccountKey.json");

var payload = {
  notification: {
    title: "Account Deposit",
    body: "A deposit to your savings account has just cleared."
  }
};
var options = {
  priority: "normal",
  timeToLive: 60 * 60
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fabio-notificacao.firebaseio.com"
});

function enviaTODOS()
{
  var topic = "todos";

admin.messaging().sendToTopic(topic, payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });

}

function enviaUM ()
{
admin.messaging().sendToDevice(registrationToken, payload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response);
    
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
 }
//setInterval (enviaUM, 5000);

enviaTODOS();

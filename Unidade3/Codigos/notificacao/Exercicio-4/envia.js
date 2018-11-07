var admin = require("firebase-admin");


var registrationToken = "drc89rv5018:APA91bETs0y0MQ4WqF6km9BR3WT_h1rA0pepeXK_zrXnt68n5dtwu6dK55K1t7hT-HRbppU3JWgP6qM6KiYPfBOYR7QhqShCXi2WOlOYGyF7YTwkzgDsbLTeg7h49rles6J2UAymy7AO";
var serviceAccount = require("./chave.json");

var payload = {
  notification: {
    title: "Mensagem enviada pelo Node",
    body: "Nao foi enviado pelo firebase."
  },
  data: {
    title: "Force Start",
    message: "This notification should restart the app",
    "force-start": "1",
    "visibility": "1",
    "ongoing": "true",
     priority: "2",
         "vibrationPattern": "[2000, 1000, 500, 500]"

  }
 

};
var options = {
  priority: "high",
  timeToLive: 60 * 60
};



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pizzaria-d2924.firebaseio.com"
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

function enviaTOPICO(topic)
{

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

enviaUM();


//enviaTODOS();
//enviaTOPICO('topic');

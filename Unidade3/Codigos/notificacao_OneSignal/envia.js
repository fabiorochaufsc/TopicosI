var OneSignal = require('onesignal-node');    
    
// first we need to create a client    
var myClient = new OneSignal.Client({    
    userAuthKey: 'XXXXXX',    
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }    
});    
    
// we need to create a notification to send    
var firstNotification = new OneSignal.Notification({    
    contents: {    
        en: "Test notification",    
        tr: "Test mesajı"    
    }    
});    
    
// set target users    
firstNotification.postBody["included_segments"] = ["Active Users"];    
firstNotification.postBody["excluded_segments"] = ["Banned Users"];    
    
// set notification parameters    
firstNotification.postBody["data"] = {"abc": "123", "foo": "bar"};    
firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';  
    
// send this notification to All Users except Inactive ones    
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {    
   if (err) {    
       console.log('Something went wrong...');    
   } else {    
       console.log(data, httpResponse.statusCode);    
   }    
});    
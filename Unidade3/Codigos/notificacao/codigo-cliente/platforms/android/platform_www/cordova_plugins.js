cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-fcm-with-dependecy-updated.FCMPlugin",
    "file": "plugins/cordova-plugin-fcm-with-dependecy-updated/www/FCMPlugin.js",
    "pluginId": "cordova-plugin-fcm-with-dependecy-updated",
    "clobbers": [
      "FCMPlugin"
    ]
  },
  {
    "id": "cordova-plugin-firebase-extended-notification.FirebaseExtendedNotification",
    "file": "plugins/cordova-plugin-firebase-extended-notification/www/FirebaseExtendedNotification.js",
    "pluginId": "cordova-plugin-firebase-extended-notification",
    "clobbers": [
      "FirebaseExtendedNotification"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-fcm-with-dependecy-updated": "2.2.5",
  "cordova-plugin-firebase-extended-notification": "1.10.0",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-support-google-services": "1.2.1",
  "phonegap-plugin-multidex": "1.0.0",
  "phonegap-plugin-push": "2.2.3"
};
// BOTTOM OF METADATA
});
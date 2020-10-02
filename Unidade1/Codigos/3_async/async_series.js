var async = require('async');

function shortTimeFunction(callback) {
  setTimeout(function() {
    console.log('terminou short');
    callback(null, 'resultOfShortTime');
  }, 2000);
}

function mediumTimeFunction(callback) {
  setTimeout(function() {
    console.log('terminou medium');
    callback(null, 'resultOfMediumTime');
  }, 5000);
}

function longTimeFunction(callback) {
  setTimeout(function() {
    console.log('terminou long');
    callback(null, 'resultOfLongTime');
  }, 10000);
}


async.series ([mediumTimeFunction, shortTimeFunction, longTimeFunction],
  function(err, results) {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });

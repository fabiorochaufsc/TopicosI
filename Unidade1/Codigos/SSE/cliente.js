var locations = new EventSource("/busLocations");
var events    = new EventSource("/events");




locations.onmessage = function (event) {
  console.log(event.data);
};


events.onmessage = function (event) {
  console.log('Evento recebido'+event.data);
};
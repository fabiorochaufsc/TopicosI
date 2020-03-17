var es = new EventSource("/sse");
es.onmessage = function (event) {
  console.log(event.data);
};
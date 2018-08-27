/** Server-sent events management
 *
 * @license: MIT
 * @author: Manuel Di Iorio
 **/

"use strict";

const padding = ":" + Array(2049).join(" ") + "\n";

// @param data (Any) = the data to send to the client
// @param event (String) [OPTIONAL] = message event
const __send__ = function(data, event) {
    // Writes the data header
    const res = this._res;    
    res.write("id: " + this._id++ + "\n");
  
    if (event) res.write("event: " + event + "\n");
    if (typeof data === "object") data = JSON.stringify(data);
       
    // Fixes the carriage returns of datas
    data = data.replace(/(\r\n|\r|\n)/g, '\n');
    const dataLines = data.split(/\n/);

    for (let i=0, l=dataLines.length; i<l; ++i) {
        let line = dataLines[i];
        if ((i+1) === l) res.write('data: ' + line + '\n\n');
        else res.write('data: ' + line + '\n');
    }             
},

// @param callback (Function): The function to be called on client disconnection
__onClose__ = function(callback) {
    this._res.on("close", () => {
        if (this._pingInterval) clearInterval(this._pingInterval);
        if (callback) callback();
    });
};

/** const SSE = require("sse-node"),
 *  client = SSE(req, res);
 *  client.send("test");
 *
 * @param req (HTTP request object)
 * @param res (HTTP response object)
 * @param options (Hash) [OPTIONAL] = Map of options
      padding=false (Boolean): When to write a 2KB header (for older browsers)
      ping=false (Integer): When to send a ping to the client each X seconds
      retry=3000 (Integer): Number of milliseconds to retry the connection
 **/
module.exports = (req, res, options) => {
    options = options || {};
   
    // Configure the EventStream request
    req.socket.setNoDelay(true);
    
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });
    
    // 2KB Padding (required from some old browsers)
    if (options.padding) res.write(padding);
    
    // Connection retry
    res.write("retry: " + (options.retry || 3000) + '\n');
    
    // Ping
    let pingInterval;
    
    if (options.ping)
        pingInterval = setInterval(() => res.write("data: \n\n"), options.ping);
    
    // Returns the SSE object
    return {      
        send: __send__,
        onClose: __onClose__,
        _id: 0, 
        _res: res, 
        _pingInterval: pingInterval
    };
};
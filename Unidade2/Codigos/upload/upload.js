var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	console.log(req.headers)
      var oldpath = files.file.path;
      var newpath = '/home/frr/' + files.file.name;
      mv(oldpath, newpath, {mkdirp: true}, function(err) {
           if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
  
      });
      
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="text" name="gps" id="gps">');

    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 

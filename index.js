var express = require('express');
var jsonfile = require('jsonfile');

var app = express();
app.use(express.static(__dirname + ''));

app.get('*', function(req, res) {
	var options = { root: __dirname };
    res.sendFile('index.html',options);
});

var file = '..\\dev.txt';

jsonfile.readFile(file, function(err, obj) {
  if (obj == undefined) {
	 console.log("dddddd");
  }	 
});

var port = "3000";
app.listen(port);
console.log("Listening to Port: " + port);
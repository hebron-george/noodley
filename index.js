var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port_num = 8081;

const fs = require('fs')

app.use(bodyParser.json()); // to support JSON-encoded bodies
//app.use(express.json()); // to support JSON-encoded bodies


//TODO: move these configs to a config file
var projects_dir = '/home/einstein/Documents/projects/'; 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/projects', function (req, res) {
	res.send("Projects: " + fs.readdirSync(projects_dir));
});

app.post('/projects', function (req, res){
	console.log(req.body);
});

app.listen(port_num, function () {
  console.log('Example app listening on port ' + port_num + '!');
});

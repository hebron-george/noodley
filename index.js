var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const spawn = require('child_process').spawn;

var port_num = 8081;

const fs = require('fs')

app.use(bodyParser.json()); // to support JSON-encoded bodies


//TODO: move these configs to a config file
var projects_dir = '/opt/'; 

app.get('/', function (req, res) {
	console.log(req);
  res.send('Hello World!');
});

app.get('/projects', function (req, res) {
	//res.send("Projects: " + fs.readdirSync(projects_dir));
	console.log('GET request for /projects')
});

app.post('/projects/:projectname', function (req, res){
	var projectname = req.params.projectname;
	const ansible = spawn( projects_dir + projectname + '/ansible-playbook', ['play.yml']);
	console.log("There was a push for project: %s", projectname);
	if (fs.statSync(__dirname + '/' + projectname).isDirectory() == true)
		console.log(projectname + ' directory exists');
	else
		console.log('Push event came in for ' + projectname + ' but the directory does not exist');

	// Check to see if `projectname` is a directory within `projects_dir`


	/*
		1. Log that request has come in for :projectname
		2. Check if :projectname directory exists 
		3. Fire ansible-playbook
			a. Stop the process if it's running
			b. `git pull`
			c. Reinstall
				i. Copy repo code to /usr/share/hebron/
	*/
});

app.listen(port_num, function () {

  console.log('Example app listening on port ' + port_num + '!');
});


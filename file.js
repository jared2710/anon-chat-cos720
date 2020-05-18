var fs = require("fs");

var AUTH = require('./auth');
var FILE = require('./file');
var CHAT = require('./chat');

//functions for general file interaction

module.exports =
{
	getJsonFromTextfile: function (filename)
	{
		var rawdata = fs.readFileSync(filename);
		console.log("File contents: " + rawdata.toString());
		var jsonOfFile = JSON.parse(rawdata);
		console.log(jsonOfFile);
		return jsonOfFile;
	},

	writeJsonToTextfile: function (json, filename)
	{
		console.log(json);
		var toWrite = JSON.stringify(json);
		console.log("To write: " + toWrite);
		fs.writeFileSync(filename, toWrite);
	}
}

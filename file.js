var fs = require("fs");

//functions for general file interaction

var getJsonFromTextfile = function (filename)
{
	var rawdata = fs.readFileSync(filename);
	console.log("File contents: " + rawdata.toString());
	var jsonOfFile = JSON.parse(rawdata);
	console.log(jsonOfFile);
	return jsonOfFile;
}

var writeJsonToTextfile = function (json, filename)
{
	console.log(json);
	var toWrite = JSON.stringify(json);
	console.log("To write: " + toWrite);
	fs.writeFileSync(filename, toWrite);
}

module.exports =
{
	getJsonFromTextfile: getJsonFromTextfile,

	writeJsonToTextfile: writeJsonToTextfile
}

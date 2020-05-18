var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

var fs = require("fs");
var glob = require("glob");
var crypto = require("crypto");


//app boiler plate code
app.use(express.json());

app.get("/", (req, res) =>
{	
	res.json({"status" : 0, "data" : "GET requests are not permitted"});
});

app.post("/", (req, res) =>
{
	var json = req.body;
	var auth = json.auth;
	if(isValidAuth(auth))
	{
		var type = json.type;
		
		switch(type)
		{
			case "sendMessage":
				sendMessage(auth, json, res);
				break;
			case "getAllMessages":
				getAllMessages(auth, json, res);
				break;
			case "getAllChatroomNames":
				getAllChatroomNames(auth, json, res);
				break;
			default:
				error(res, "Invalid type for API");
		}
	}
	else
	{
		error(res, "Authorization failed");
	}
	
});

app.listen(port, () =>
{
	console.log("Server running on port " + port);
});


//helper functions
function respond(res, data)
{
	res.json({"status" : 1, "data" : data});
}

function error(res, message)
{
	res.json({"status" : 0, "data" : message});
}

function chatroomNameToChatroomFilename(chatroomName)
{
	return "chatroom_" + chatroomName + ".json";
}

function chatroomFilenameToChatroomName(chatroomFilename)
{
	return chatroomFilename.substring(chatroomFilename.indexOf("_")+1, chatroomFilename.indexOf("."));
}

function currentDate()
{
	var d = new Date();

    	d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    	return d;
}



//validation and auth functions
function isValidAuth(auth)
{
	return true;
}

function isValidChatroom(chatroom)
{
	var filenames = getAllChatroomFilenames();
	var names = chatroomFilenamesToChatroomNames(filenames);
	for(var i = 0; i < names.length; i++)
	{
		if(names[i] === chatroom)
		{
			return true;
		}
	}
	return false;
}

function sha256(text)
{
	return crypto.createHash('sha256').update(text).digest('hex');
}

function authStringToUsername(auth)
{
	var hash = sha256(auth);
	console.log(hash);
	hash = hash.substring(0, 10);
	console.log(hash);
	var username = "";
	for(var i = 0; i < hash.length; i++)
	{
		console.log(hash[i]);
		var toAdd = "";
		switch(hash[i])
		{
			case "0":
				toAdd = "a";
				break;
			case "1":
				toAdd = "a";
				break;
			case "2":
				toAdd = "e";
				break;
			case "3":
				toAdd = "e";
				break;
			case "4":
				toAdd = "i";
				break;
			case "5":
				toAdd = "i";
				break;
			case "6":
				toAdd = "o";
				break;
			case "7":
				toAdd = "o";
				break;
			case "8":
				toAdd = "u";
				break;
			case "9":
				toAdd = "u";
				break;
			case "a":
				toAdd = "r";
				break;
			case "b":
				toAdd = "d";
				break;
			case "c":
				toAdd = "l";
				break;
			case "d":
				toAdd = "m";
				break;
			case "e":
				toAdd = "s";
				break;
			case "f":
				toAdd = "p";
				break;
			default:
				toAdd = "";
			
		}
		username += toAdd;
	}
	return username;
}

function stripRealAuth(messages)
{
	for(var i = 0; i < messages.length; i++)
	{
		messages[i].user = authStringToUsername(messages[i].user);
	}
	return messages;
}


//textfile functions
function getJsonFromTextfile(filename)
{
	var rawdata = fs.readFileSync(filename);
	console.log("File contents: " + rawdata.toString());
	var jsonOfFile = JSON.parse(rawdata);
	console.log(jsonOfFile);
	return jsonOfFile;
}

function writeJsonToTextfile(json, filename)
{
	console.log(json);
	var toWrite = JSON.stringify(json);
	console.log("To write: " + toWrite);
	fs.writeFileSync(filename, toWrite);
}

function getChatroomMessages(chatroom)
{
	var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
	console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = getJsonFromTextfile(chatroomFilename);
	console.log(chatroomData);
	return chatroomData.messages;
}

function addMessageToChatroom(auth, chatroom, message)
{
	var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
	console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = getJsonFromTextfile(chatroomFilename);
	console.log(chatroomData);
	chatroomData.messages.push({"time": currentDate(), "user" : auth, "message":message});
	console.log(chatroomData);
	writeJsonToTextfile(chatroomData, chatroomFilename);
	return true;
}

function getAllChatroomFilenames()
{
	var filenames = glob.sync("chatroom_*.json");
	console.log(filenames);
	return filenames;
}

function chatroomFilenamesToChatroomNames(filenames)
{
	var names = [];
	for(var i = 0; i < filenames.length; i++)
	{
		names.push(chatroomFilenameToChatroomName(filenames[i]));
	}
	console.log(names);
	return names;
}



//request type methods
function sendMessage(auth, json, res)
{
	console.log("Send message");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var chatroom = json.chatroom;
	if(isValidChatroom(chatroom))
	{
		var message = json.message;
		var result = addMessageToChatroom(auth, chatroom, message);
		respond(res, "Message sent: " + result);
	}
	else
	{
		error(res, "Invalid chatroom");
	}
}

function getAllMessages(auth, json, res)
{
	console.log("Get all messages");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var chatroom = json.chatroom;
	if(isValidChatroom(chatroom))
	{
		var result = getChatroomMessages(chatroom);
		result = stripRealAuth(result);
		respond(res, result);
	}
	else
	{
		error(res, "Invalid chatroom");
	}
}

function getAllChatroomNames(auth, json, res)
{
	console.log("Get all chatrooms");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var filenames = getAllChatroomFilenames();
	var names = chatroomFilenamesToChatroomNames(filenames);

	respond(res, names);
}









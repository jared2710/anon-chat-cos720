var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

var fs = require("fs");
var glob = require("glob");


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



//validation functions
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

function addMessageToChatroom(chatroom, message)
{
	var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
	console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = getJsonFromTextfile(chatroomFilename);
	console.log(chatroomData);
	chatroomData.messages.push({"message":message});
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
		var result = addMessageToChatroom(chatroom, message);
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









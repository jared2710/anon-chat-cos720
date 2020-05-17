var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

var fs = require("fs");


//app boiler plate code
app.use(express.json());

app.get("/", (req, res) =>
{	
	res.json({"status" : 0, "data" : "GET requests are not permitted"});
});

app.post("/", (req, res) =>
{
	var json = req.body;
	var auth = "123456";//json.auth;
	var type = json.type;
	
	switch(type)
	{
		case "sendMessage":
			sendMessage(auth, json, res);
			break;
		case "getAllMessages":
			getAllMessages(auth, json, res);
			break;
		default:
			res.json({"status" : 0, "data" : "Invalid type for API"});
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
	var chatroomFilename = "room_" + chatroom + ".json";
	console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = getJsonFromTextfile(chatroomFilename);
	console.log(chatroomData);
	return chatroomData.messages;
}

function addMessageToChatroom(chatroom, message)
{
	var chatroomFilename = "room_" + chatroom + ".json";
	console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = getJsonFromTextfile(chatroomFilename);
	console.log(chatroomData);
	chatroomData.messages.push({"message":message});
	console.log(chatroomData);
	writeJsonToTextfile(chatroomData, chatroomFilename);
	return true;
}



//request type methods
function sendMessage(auth, json, res)
{
	console.log("Send message");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var chatroom = "veryniceroom";//json.chatroom;
	var message = json.message;
	var result = addMessageToChatroom(chatroom, message);

	respond(res, "Message sent: " + result);
}

function getAllMessages(auth, json, res)
{
	console.log("Get all messages");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var chatroom = "veryniceroom";//json.chatroom;
	var result = getChatroomMessages(chatroom);

	respond(res, result);
}









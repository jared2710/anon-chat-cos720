var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

var AUTH = require('./auth');
var CHAT = require('./chat');


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
	if(AUTH.isValidAuth(auth))
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



//request type methods
function sendMessage(auth, json, res)
{
	console.log("Send message");
	console.log("auth: " + auth);
	console.log("json: " + json);

	var chatroom = json.chatroom;
	if(AUTH.isValidChatroom(chatroom))
	{
		var message = json.message;

		var result = CHAT.addMessageToChatroom(auth, chatroom, message);
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
	if(AUTH.isValidChatroom(chatroom))
	{
		var result = CHAT.getChatroomMessages(chatroom);
		//result = AUTH.stripRealAuth(result);
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

	var filenames = CHAT.getAllChatroomFilenames();
	var names = CHAT.chatroomFilenamesToChatroomNames(filenames);

	respond(res, names);
}









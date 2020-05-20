var ChatroomManager = require("./ChatroomManager");
var Authenticator = require("./Authenticator");

class Handler
{
	constructor()
	{
		this.chatroommanager = new ChatroomManager();
		this.authenticator = new Authenticator(this.chatroommanager);
	}

	print()
	{
		console.log("Handler object");
	}
	
	handle(req, res)
	{
		var json = req.body;
		var auth = json.auth;

		console.log("json: " + JSON.stringify(json));

		if(this.authenticator.isValidAuth(auth))
		{
			var type = json.type;
			
			switch(type)
			{
				case "sendMessage":
					this.sendMessageType(auth, json, res);
					break;
				case "getAllMessages":
					this.getAllMessagesType(auth, json, res);
					break;
				case "getAllChatroomNames":
					this.getAllChatroomNamesType(auth, json, res);
					break;
				default:
					this.error(res, "Invalid type for API");
			}
		}
		else
		{
			this.error(res, "Authorization failed");
		}
	}

	respond(res, data)
	{
		res.json({"status" : 1, "data" : data});
	}

	error(res, message)
	{
		res.json({"status" : 0, "data" : message});
	}
	
	sendMessageType(auth, json, res)
	{
		var chatroomName = json.chatroom;
		var message = json.message;
		
		if(this.authenticator.isValidChatroom(chatroomName))
		{
			var result = this.chatroommanager.addMessageToChatroom(chatroomName, auth, message);
			this.respond(res, "Message sent: " + result);
		}
		else
		{
			this.error(res, "Invalid chatroom");
		}
	}

	getAllMessagesType(auth, json, res)
	{
		var chatroomName = json.chatroom;
		console.log(chatroomName);
		
		if(this.authenticator.isValidChatroom(chatroomName))
		{
			var result = this.chatroommanager.getChatroomMessages(chatroomName);
			this.respond(res, result);
		}
		else
		{
			this.error(res, "Invalid chatroom");
		}
	}

	getAllChatroomNamesType(auth, json, res)
	{
		var result = this.chatroommanager.getAllChatroomNames();
		this.respond(res, result);
	}
}

module.exports = Handler;

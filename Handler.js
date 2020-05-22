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
		this.req = req;
		this.res = res;
		
		var json = this.req.body;
		var auth = json.auth;

		console.log("json: " + JSON.stringify(json));

		if(this.authenticator.isValidAuth(auth))
		{
			var type = json.type;
			
			switch(type)
			{
				case "sendMessage":
					this.sendMessageType(auth, json);
					break;
				case "getAllMessages":
					this.getAllMessagesType(auth, json);
					break;
				case "getAllChatroomNames":
					this.getAllChatroomNamesType(auth, json);
					break;
				default:
					this.error("Invalid request for API: " + type);
			}
		}
		else
		{
			this.error("Authorization failed");
		}
	}

	respond(data)
	{
		this.res.json({"status" : 1, "data" : data});
	}

	error(message)
	{
		this.res.json({"status" : 0, "data" : message});
	}
	
	sendMessageType(auth, json)
	{
		var chatroomName = json.chatroom;
		var message = json.message;
		
		if(this.authenticator.isValidChatroom(chatroomName))
		{
			var result = this.chatroommanager.addMessageToChatroom(chatroomName, auth, message);
			this.respond("Message sent: " + result);
		}
		else
		{
			this.error("Invalid chatroom");
		}
	}

	getAllMessagesType(auth, json)
	{
		var chatroomName = json.chatroom;
		
		if(this.authenticator.isValidChatroom(chatroomName))
		{
			var result = this.chatroommanager.getChatroomMessages(chatroomName);
			this.respond(result);
		}
		else
		{
			this.error("Invalid chatroom");
		}
	}

	getAllChatroomNamesType(auth, json)
	{
		var result = this.chatroommanager.getAllChatroomNames();
		this.respond(result);
	}
}

module.exports = Handler;

var crypto = require("crypto");
var ChatroomFileInterface = require("./ChatroomFileInterface");
var TextFile = require("./TextFile");

class Chatroom
{
	constructor(chatroomName)
	{
		this.chatroomName = chatroomName;
		this.chatroomfileinterface = new ChatroomFileInterface(chatroomName);
		this.namesfile = new TextFile("names.json")
	}

	print()
	{
		console.log("Chatroom object: " + this.chatroomName);
	}

	sha256(text)
	{
		return crypto.createHash('sha256').update(text).digest('hex');
	}

	authStringToPseudonym(auth)
	{
		var names = JSON.parse(this.namesfile.getContents());
		var hash = this.sha256(auth);
		hash = hash.substring(0, 9);
		
		var username = "";
		for(var i = 0; i < 9; i = i + 3)
		{
			var hex = hash[i] + hash[i+1] + hash[i+2];

			var pos = parseInt(Number("0x" + hex), 10);

			pos += (i/3)*16*16*16;

			var toAdd = names[pos];
			
			username += toAdd + " ";
		}
		return username.substring(0, username.length-1);
	}
	
	getChatroomMessages()
	{
		return this.chatroomfileinterface.getMessages();
	}
	
	addMessageToChatroom(auth, message)
	{
		var pseudonym = this.authStringToPseudonym(auth);
		var result = this.chatroomfileinterface.addMessage(pseudonym, message);
		return result;
	}
}

module.exports = Chatroom;

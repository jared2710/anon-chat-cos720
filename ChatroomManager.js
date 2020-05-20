var glob = require("glob");
var Chatroom = require("./Chatroom");

class ChatroomManager
{
	constructor()
	{
	}

	print()
	{
		console.log("ChatroomManager object");
	}

	getAllChatroomFilenames()
	{
		var filenames = glob.sync("chatroom_*.json");
		return filenames;
	}

	chatroomFilenameToChatroomName(chatroomFilename)
	{
		return chatroomFilename.substring(chatroomFilename.indexOf("_")+1, chatroomFilename.indexOf("."));
	}

	chatroomFilenamesToChatroomNames(filenames)
	{
		var names = [];
		for(var i = 0; i < filenames.length; i++)
		{
			names.push(this.chatroomFilenameToChatroomName(filenames[i]));
		}
		return names;
	}
	
	getAllChatroomNames()
	{
		var chatroomFilenames = this.getAllChatroomFilenames();
		var chatroomNames = this.chatroomFilenamesToChatroomNames(chatroomFilenames);
		return chatroomNames;
	}
	
	getChatroomMessages(chatroomName)
	{
		var chatroom = new Chatroom(chatroomName);
		var messages = chatroom.getChatroomMessages();
		var result = messages.messages;
		return result;
	}
	
	addMessageToChatroom(chatroomName, auth, message)
	{
		var chatroom = new Chatroom(chatroomName);
		chatroom.addMessageToChatroom(auth, message);
		return true;
	}
}

module.exports = ChatroomManager;

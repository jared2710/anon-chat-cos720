var ChatroomFile = require("./ChatroomFile");

class ChatroomFileInterface
{
	constructor(chatroomName)
	{
		this.chatroomName = chatroomName;
		this.chatroomfile = new ChatroomFile(chatroomName);
	}

	print()
	{
		console.log("ChatroomFileInterface object: " + this.chatroomName);
	}

	currentDate()
	{
		var d = new Date();

		d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

		return d;
	}
	
	getMessages()
	{
		return this.chatroomfile.getMessages();
	}
	
	addMessage(pseudonym, message)
	{
		var json = this.chatroomfile.getMessages();
		console.log(json);

		json.messages.push({"time":this.currentDate(), "user":pseudonym, "message":message});
		console.log(json);
		
		this.chatroomfile.writeMessages(json);
	}
}

module.exports = ChatroomFileInterface;

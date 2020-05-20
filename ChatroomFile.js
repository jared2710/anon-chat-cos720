var TextFile = require("./TextFile");

class ChatroomFile
{
	constructor(chatroomName)
	{
		this.chatroomName = chatroomName;
		this.chatroomFilename = "chatroom_" + chatroomName + ".json";
		this.textfile = new TextFile(this.chatroomFilename);
	}

	print()
	{
		console.log("ChatroomFile object: " + this.chatroomFilename);
	}
	
	getMessages()
	{
		var fileContents = this.textfile.getContents();
		console.log(fileContents);
		var messages = JSON.parse(fileContents);
		console.log(messages);
		return messages;
	}
	
	writeMessages(messages)
	{
		console.log(messages);
		var toWrite = JSON.stringify(messages);
		console.log(toWrite);
		this.textfile.writeContents(toWrite);
	}
}

module.exports = ChatroomFile;

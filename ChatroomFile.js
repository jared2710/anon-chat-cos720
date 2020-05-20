var TextFile = require("./TextFile");

class ChatroomFile
{
	constructor(chatroomName)
	{
		this.chatroomName = chatroomName;
		this.chatroomFilename = "chatroom_" + chatroomName + ".json";
		this.textfile = new TextFile(chatroomFilename);
	}

	print()
	{
		console.log("ChatroomFile object: " + this.chatroomFilename);
	}
	
	getMessages()
	{
		var fileContents = this.textfile.getContents();
		var messages = JSON.parse(fileContents);
		return messages;
	}
	
	writeMessages(messages)
	{
		var toWrite = JSON.stringify(messages);
		this.textfile.writeContents(toWrite);
	}
}

module.exports = ChatroomFile;

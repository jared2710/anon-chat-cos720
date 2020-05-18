var glob = require("glob");

var AUTH = require('./auth');
var FILE = require('./file');
var CHAT = require('./chat');

//functions for chatroom file interaction

module.exports =
{
	chatroomNameToChatroomFilename: function (chatroomName)
	{
		return "chatroom_" + chatroomName + ".json";
	},

	chatroomFilenameToChatroomName: function (chatroomFilename)
	{
		return chatroomFilename.substring(chatroomFilename.indexOf("_")+1, chatroomFilename.indexOf("."));
	},

	currentDate: function ()
	{
		var d = new Date();

	    	d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

	    	return d;
	},

	getChatroomMessages: function (chatroom)
	{
		var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
		console.log("chatroomFilename: " + chatroomFilename);
		var chatroomData = FILE.getJsonFromTextfile(chatroomFilename);
		console.log(chatroomData);
		return chatroomData.messages;
	},

	addMessageToChatroom: function (auth, chatroom, message)
	{
		var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
		console.log("chatroomFilename: " + chatroomFilename);
		var chatroomData = FILE.getJsonFromTextfile(chatroomFilename);
		console.log(chatroomData);
		chatroomData.messages.push({"time": currentDate(), "user" : auth, "message":message});
		console.log(chatroomData);
		FILE.writeJsonToTextfile(chatroomData, chatroomFilename);
		return true;
	},

	getAllChatroomFilenames: function ()
	{
		var filenames = glob.sync("chatroom_*.json");
		console.log(filenames);
		return filenames;
	},

	chatroomFilenamesToChatroomNames: function (filenames)
	{
		var names = [];
		for(var i = 0; i < filenames.length; i++)
		{
			names.push(chatroomFilenameToChatroomName(filenames[i]));
		}
		console.log(names);
		return names;
	}
}

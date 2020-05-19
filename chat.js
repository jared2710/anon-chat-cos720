var glob = require("glob");

var AUTH = require('./auth');
var FILE = require('./file');

//functions for chatroom file interaction

var chatroomNameToChatroomFilename = function (chatroomName)
{
	return "chatroom_" + chatroomName + ".json";
}

var chatroomFilenameToChatroomName = function (chatroomFilename)
{
	return chatroomFilename.substring(chatroomFilename.indexOf("_")+1, chatroomFilename.indexOf("."));
}

var currentDate = function ()
{
	var d = new Date();

    	d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    	return d;
}

var getChatroomMessages = function (chatroom)
{
	var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
	//console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = FILE.getJsonFromTextfile(chatroomFilename);
	//console.log(chatroomData);
	return chatroomData.messages;
}

var addMessageToChatroom = function (auth, chatroom, message)
{
	var chatroomFilename = chatroomNameToChatroomFilename(chatroom);
	//console.log("chatroomFilename: " + chatroomFilename);
	var chatroomData = FILE.getJsonFromTextfile(chatroomFilename);
	//console.log(chatroomData);

	var names = FILE.getJsonFromTextfile("names.json");
	auth = AUTH.authStringToUsername(auth);

	chatroomData.messages.push({"time":currentDate(), "user":auth, "message":message});
	//console.log(chatroomData);
	FILE.writeJsonToTextfile(chatroomData, chatroomFilename);
	return true;
}

var getAllChatroomFilenames = function ()
{
	var filenames = glob.sync("chatroom_*.json");
	//console.log(filenames);
	return filenames;
}

var chatroomFilenamesToChatroomNames = function (filenames)
{
	var names = [];
	for(var i = 0; i < filenames.length; i++)
	{
		names.push(chatroomFilenameToChatroomName(filenames[i]));
	}
	//console.log(names);
	return names;
}

module.exports =
{
	chatroomNameToChatroomFilename: chatroomNameToChatroomFilename,

	chatroomFilenameToChatroomName: chatroomFilenameToChatroomName,

	currentDate: currentDate,

	getChatroomMessages: getChatroomMessages,

	addMessageToChatroom: addMessageToChatroom,

	getAllChatroomFilenames: getAllChatroomFilenames,

	chatroomFilenamesToChatroomNames: chatroomFilenamesToChatroomNames
}

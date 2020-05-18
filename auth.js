var crypto = require("crypto");

var CHAT = require('./chat');

//functions for validation and authorization

var isValidAuth = function (auth)
{
	if(auth.length == 50)
	{
		return true;
	}
	return false;
}

var isValidChatroom = function (chatroom)
{
	var filenames = CHAT.getAllChatroomFilenames();
	var names = CHAT.chatroomFilenamesToChatroomNames(filenames);
	for(var i = 0; i < names.length; i++)
	{
		if(names[i] === chatroom)
		{
			return true;
		}
	}
	return false;
}

var sha256 = function (text)
{
	return crypto.createHash('sha256').update(text).digest('hex');
}

var authStringToUsername = function (auth)
{
	var hash = sha256(auth);
	console.log(hash);
	hash = hash.substring(0, 10);
	console.log(hash);
	var username = "";
	for(var i = 0; i < hash.length; i++)
	{
		console.log(hash[i]);
		var toAdd = "";
		switch(hash[i])
		{
			case "0":
				toAdd = "a";
				break;
			case "1":
				toAdd = "a";
				break;
			case "2":
				toAdd = "e";
				break;
			case "3":
				toAdd = "e";
				break;
			case "4":
				toAdd = "i";
				break;
			case "5":
				toAdd = "i";
				break;
			case "6":
				toAdd = "o";
				break;
			case "7":
				toAdd = "o";
				break;
			case "8":
				toAdd = "u";
				break;
			case "9":
				toAdd = "u";
				break;
			case "a":
				toAdd = "r";
				break;
			case "b":
				toAdd = "d";
				break;
			case "c":
				toAdd = "l";
				break;
			case "d":
				toAdd = "m";
				break;
			case "e":
				toAdd = "s";
				break;
			case "f":
				toAdd = "p";
				break;
			default:
				toAdd = "";
			
		}
		username += toAdd;
	}
	return username;
}

var stripRealAuth = function (messages)
{
	for(var i = 0; i < messages.length; i++)
	{
		messages[i].user = authStringToUsername(messages[i].user);
	}
	return messages;
}

module.exports =
{
	isValidAuth: isValidAuth,

	isValidChatroom: isValidChatroom,

	sha256: sha256,

	authStringToUsername: authStringToUsername,

	stripRealAuth: stripRealAuth
}


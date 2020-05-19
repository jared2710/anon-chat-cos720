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

var authStringToUsername = function (auth, names)
{
	console.log(auth);
	var hash = sha256(auth);
	console.log(hash);
	hash = hash.substring(0, 9);
	console.log(hash);
	var username = "";
	for(var i = 0; i < 9; i = i + 3)
	{
		//console.log(hash[i]);
		var char1 = hash[i];
		var char2 = hash[i+1];
		var char3 = hash[i+2];
		console.log(char1 + "|" + char2 + "|" + char3);

		char1 = parseInt(Number("0x" + char1), 10);
		char2 = parseInt(Number("0x" + char2), 10);
		char3 = parseInt(Number("0x" + char3), 10);
		console.log(char1 + "|" + char2 + "|" + char3);

		var pos = char1*16*16 + char2*16 + char3;
		console.log(pos);
		pos += i*16*16*16;
		console.log(pos);


		var toAdd = names[pos];
		console.log(toAdd);
		
		username += toAdd + " ";
		console.log(username.substring(0, -1));
	}
	return username.substring(0, -1);
}

/*var stripRealAuth = function (messages)
{
	for(var i = 0; i < messages.length; i++)
	{
		messages[i].user = authStringToUsername(messages[i].user);
	}
	return messages;
}*/

module.exports =
{
	isValidAuth: isValidAuth,

	isValidChatroom: isValidChatroom,

	sha256: sha256,

	authStringToUsername: authStringToUsername//,

	//stripRealAuth: stripRealAuth
}


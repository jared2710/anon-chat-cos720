
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

	isValidChatroom: isValidChatroom//,

	//stripRealAuth: stripRealAuth
}


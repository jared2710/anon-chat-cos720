
class Authenticator
{
	constructor(chatroommanager)
	{
		this.chatroommanager = chatroommanager;
	}

	print()
	{
		console.log("Authenticator object");
	}
	
	isValidAuth(auth)
	{
		if(auth.length == 50)
		{
			return true;
		}
		return false;
	}

	isValidChatroom(chatroom)
	{
		var names = this.chatroommanager.getAllChatroomNames();
		for(var i = 0; i < names.length; i++)
		{
			if(names[i] === chatroom)
			{
				return true;
			}
		}
		return false;
	}
}

module.exports = Authenticator;

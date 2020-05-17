var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) =>
{	
	res.json({"status" : 0, "data" : "GET requests are not permitted"});
});

app.post("/", (req, res) =>
{
	var json = req.body;
	
	switch(json.type)
	{
		case "sendMessage":
			console.log("Send message");
			res.json({"status" : 1, "data" : req.body});
			break;
		case "getAllMessages":
			console.log("Get all messages");
			res.json({"status" : 1, "data" : req.body});
			break;
		default:
			res.json({"status" : 0, "data" : "Invalid type for API"});
	}
	
	
});

app.listen(port, () =>
{
	console.log("Server running on port " + port);
});

var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

app.get("/", (req, res) =>
{	
	console.log("Got GET request for /");
	res.json({"response" : "get hello"});
	console.log("Replied to GET request for /");
});

app.post("/", (req, res) =>
{
	console.log("Got POST request for /");
	res.json({"response" : "post hello"});
	console.log("Replied to POST request for /");
});

app.listen(port, () =>
{
	console.log("Server running on port " + port);
});

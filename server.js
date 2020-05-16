var express = require("express");
var app = express();

app.get("/", (req, res) =>
{	
	console.log("Got GET request for /");
	res.json({"response" : "hello"});
	console.log("Replied to GET request for /");
});

app.post("/", (req, res) =>
{
	console.log("Got POST request for /");
	res.json({"response" : "hello"});
	console.log("Replied to POST request for /");
});

app.listen(4000, () =>
{
	console.log("Server running on port 4000");
});

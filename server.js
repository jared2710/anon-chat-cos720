var express = require("express");
var app = express();

app.get("/", (req, res) =>
{
	res.json({"response" : "hello"});
});

app.post("/", (req, res) =>
{
	res.json({"response" : "hello"});
});

app.listen(4000, () =>
{
	console.log("Server running on port 4000");
});

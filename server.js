var express = require("express");
var app = express();

app.post("/", (req, res) =>
{
	res.json({"response" : "hello"});
});

app.listen(443, () =>
{
	console.log("Server running on port 4000");
});

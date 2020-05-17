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
	console.log(req.body);
	res.json({"status" : 1, "data" : req.body});
});

app.listen(port, () =>
{
	console.log("Server running on port " + port);
});

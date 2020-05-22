var express = require("express");
var app = express();
app.use(express.json());
var port = process.env.PORT || 4000;



var Handler = require('./Handler');
handler = new Handler();


app.get("/", (req, res) =>
{	
	req.body.auth = "00000000000000000000000000000000000000000000000000";
	req.body.type = "GET";
	handler.handle(req, res);
});

app.post("/", (req, res) =>
{
	handler.handle(req, res);
});

app.listen(port, () =>
{
	console.log("Server running on port " + port);
});

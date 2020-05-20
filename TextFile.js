var fs = require("fs");

class TextFile
{
	constructor(filename)
	{
		this.filename = filename;
	}

	print()
	{
		console.log("TextFile object: " + this.filename);
	}
	
	getContents()
	{
		return fs.readFileSync(this.filename);
	}
	
	writeContents(toWrite)
	{
		console.log(this.filename);
		console.log(toWrite);
		fs.writeFileSync(this.filename, toWrite);
	}
}

module.exports = TextFile;

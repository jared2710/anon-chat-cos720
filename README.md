# anon-chat-cos720
The server-side NodeJS server for an anonymous chatroom, which forms part of a COS720 project at the University of Pretoria in South Africa.

## Environment
This code was designed for and runs on Heroku, a Cloud Application Platform. Specifically, a free app was created, called 'anon-chat-cos720', and this was linked to this GitHub repository, with automatic deploys from master enabled. Heroku simply uses the npm start script located in package.json to run the server.

For this reason, the client-side application connects to the URL given to this free app on Heroku, and doesn't connect to a specific port, as Heroku assigns a port to the app using environment variables. However, this server could be run on any platform really, as all that is needed is NodeJS and npm. The default port is 4000 if none is assigned using environment variables (this can easily be changed in the code). 

This API server is a NodeJS project, which is interacted with using HTTP requests. Therefore, NodeJS and npm must be installed on the server - instructions for this are included in Installation.

## Installation

Firstly, we need to install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) in order to run the application:

```bash
sudo apt update
sudo apt install nodejs npm # both installed in one command
```

Then, we can clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:

```bash
git clone https://github.com/jared2710/anon-chat-cos720.git
cd anon-chat-cos720
npm install .
node server
```

## Usage
This is an HTTP API server, so once we install and run it as above, we can interfact with it using HTTP requests. The possible request types are specified below:

Attempt | #1 | #2 | #3 | #4 | #5 | #6 | #7 | #8 | #9 | #10 | #11
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
Seconds | 301 | 283 | 290 | 286 | 289 | 285 | 287 | 287 | 272 | 276 | 269


## Contribution
This server was created by Jared O'Reilly, a Computer Science Honours student at the University of Pretoria. Besides the npm packages, everything was designed, coded and tested by him. 

# anon-chat-cos720
The server-side NodeJS API for an anonymous chatroom, which forms part of a COS720 project at the University of Pretoria in South Africa. See [anon-chat-local-cos720](https://github.com/jared2710/anon-chat-local-cos720) for the client-side command-line application which accesses this server.

## Environment
This code was designed for and currently is running on [Heroku](https://heroku.com), a Cloud Application Platform (PaaS). Specifically, a free app was created, called 'anon-chat-cos720', and this was linked to this GitHub repository, with automatic deploys from master enabled. Heroku simply uses the npm start script located in package.json to run the server.

For this reason, the client-side application connects to the URL given to this free app on Heroku, and doesn't connect to a specific port, as Heroku assigns a port to the app using environment variables. However, this server could be run on any platform really, as all that is needed is NodeJS and npm. The default port is 4000 if none is assigned using environment variables (this can easily be changed in the code). 

This API server is a NodeJS project, which is interacted with using HTTP requests. Therefore, NodeJS and npm must be installed on the server - instructions for this are included in Installation. This server should be connected to through the Tor network, to ensure the anonymity of anyone wishing to use the chatroom.

## Installation

Firstly, we need to install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) in order to run the application:

```bash
sudo apt update
sudo apt install nodejs npm     # both installed in one command
```

If you are setting up on a server you have full control over (not like Heroku), you will need to open up ports on your firewall to allow traffic into and out of this application. On Ubuntu, which uses [ufw](https://help.ubuntu.com/community/UFW), you could open these ports up like this:

```bash
sudo ufw allow 4000             # open port 4000, the default port for this server
```

Then, we can clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:

```bash
git clone https://github.com/jared2710/anon-chat-cos720.git
cd anon-chat-cos720
npm install .
node server
```

## Usage
This is an HTTP API server, so once we install and run it as above, we can interfact with it using HTTP requests. 
- Specifically, only POST requests can be used, any other requests (like GET) will fail.
- All POST requests should be directed at the endpoint /, like myserver.com/ or 123.456.789.123/. 
- JSON should be sent in the body of the POST request, so the content type heading should be application/json. 

The possible request types are specified below:

### getAllChatroomNames 
Required fields:
- **auth**: random string of length 50, consisting of uppercase, lowercase, numbers

Example JSON body:
````json
{
    "type" : "getAllChatroomNames",
    "auth" : "12345...67890"
}
````

Example JSON response:
````json
{
    "status": 1,
    "data": 
    [
        "room1",
        "room2",
        "room3"
    ]
}
````

### getAllMessages 
Required fields:
- **auth**: random string of length 50, consisting of uppercase, lowercase, numbers
- **chatroom**: name of the chatroom to send a message to, a list of possible chatrooms can be found using getAllChatroomNames

Example JSON body:
````json
{
    "type" : "getAllMessages",
    "auth" : "12345...67890",
    "chatroom" : "room1"
}
````

Example JSON response:
````json
{
    "status": 1,
    "data": 
    {
        "messages": 
        [
            {
                "user":"abdkgslwoi",
                "time": "2020-05-18 16:01:34",
                "message": "hi"
            },
            {
                "user":"fjodjudhas",
                "time": "2020-05-18 16:01:51",
                "message": "hey there bro"
            }
        ]
    }
}
````

### sendMessage
Required fields:
- **auth**: random string of length 50, consisting of uppercase, lowercase, numbers
- **chatroom**: name of the chatroom to send a message to, a list of possible chatrooms can be found using getAllChatroomNames
- **message**: the message to be sent to the chatroom, no real constraints imposed on this message

Example JSON body:
````json
{
    "type" : "sendMessage",
    "auth" : "12345...67890",
    "chatroom" : "room1",
    "message" : "welcome to my crib"
}
````

Example JSON response:
````json
{
    "status": 1,
    "data": "Message sent: true"
}
````

### Errors from API
Errors returned from the API are detectable from the status field of the JSON response, with 0 meaning an error occurred, and 1 meaning the request was accepted and executed without error. For example, an error from the API would look like this:
````json
{
    "status": 0,
    "data": "Error message will be here"
}
````

## Uninstallation

You can uninstall NodeJS and npm using the following commands in Ubuntu:

```bash
sudo apt remove nodejs npm      # remove nodejs and npm but keep configuration files
sudo apt purge nodejs npm       # completely remove nodejs and npm and all configuration files
```

If you opened up a port on your firewall using ufw, e.g. port 4000, you can close that port with the following command:

```bash
sudo ufw delete allow 4000      # open port 4000, the default port for this server
```

Finally, navigate to the directory that contains the cloned anon-chat-local-cos720 directory, and run the following command to delete the anon-chat-local-cos720 directory:

```bash
rm -rf anon-chat-cos720         # delete the directory cloned to this machine
```



## Contribution
This server was created by Jared O'Reilly, a Computer Science Honours student at the University of Pretoria. Besides the npm packages, everything was designed, coded and tested by him. 

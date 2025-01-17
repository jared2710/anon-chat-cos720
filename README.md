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

If you do not have git installed already on your Ubuntu machine, you can install it with:
```bash
sudo apt update
sudo apt install git            # only pro coders install this bad boy
```

If you are setting up on a server you have full control over (not like Heroku), you will need to open up ports on your firewall to allow traffic into and out of this application. On Ubuntu, which uses [ufw](https://help.ubuntu.com/community/UFW), you could open these ports up like this:
```bash
sudo ufw allow 4000             # open port 4000, the default port for this server
```

Then, we can clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:
```bash
git clone https://github.com/jared2710/anon-chat-cos720.git
cd anon-chat-cos720
npm install .                   # crypto, express, fs and glob are installed
node server
```

## Usage
This is an HTTP API server, so once we install and run it as above, we can interfact with it using HTTP requests. 
- Specifically, only POST requests can be used, any other requests (like GET) will fail.
- All POST requests should be directed at the endpoint /, like myserver.com/ or 123.456.789.123/. 
- JSON should be sent in the body of the POST request, so the content type heading should be application/json. 

The possible request types are specified below:

### getAllChatroomNames 
This request is used to retrieve all possible chatrooms which can be joined on this server. 

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
    "status" : 1,
    "data" : 
    [
        "room1",
        "room2",
        "room3"
    ]
}
````

### getAllMessages 
This request is used to retrieve all messages sent to a chatroom, including the author of the message, the time it was received and the content of the message.

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
    "status" : 1,
    "data" : 
    [
        {
            "user" : "Angel Dorami Grazili",
            "time" : "2020-05-18 16:01:34",
            "message" : "hi"
        },
        {
            "user" : "Clive Edward Hokku",
            "time" : "2020-05-18 16:01:51",
            "message" : "hey there bro"
        }
    ]
}
````

### sendMessage
This request is used to send a message to a chatroom. The auth field is converted into a 3-word pseudonym, which is assigned as the author of the message. This conversion is one-way i.e. we cannot figure out the auth value that produced a certain pseudonym, and therefore only the holder of that (long and random) auth value can identify as that pseudonym when sending a message.

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
    "status" : 1,
    "data" : "Message sent: true"
}
````

### Errors from API
Errors returned from the API are detectable from the status field of the JSON response, with 0 meaning an error occurred, and 1 meaning the request was accepted and executed without error. For example, an error from the API would look like this:
````json
{
    "status" : 0,
    "data" : "Error message will be here"
}
````

## Uninstallation

You can uninstall NodeJS and npm using the following commands in Ubuntu:
```bash
sudo apt remove nodejs npm      # remove nodejs and npm but keep configuration files
-- OR --
sudo apt purge nodejs npm       # completely remove nodejs and npm and all configuration files
```

You will probably want to keep git installed, but in case you don't, you can uninstall it like this:
```bash
sudo apt remove git             # remove git but keep configuration files
-- OR --
sudo apt purge git              # completely remove git and all configuration files
```

A bunch of packages will not be explicity uninstalled from this removal/purging, and they may not be needed by any other packages you have installed. You can automatically remove them using apt's autoremove command, like so:
```bash
sudo apt autoremove             # remove any of the leftover packages
```

If you opened up a port on your firewall using ufw, e.g. port 4000, you can close that port with the following command:
```bash
sudo ufw delete allow 4000      # open port 4000, the default port for this server
```

Finally, navigate to the directory that contains the cloned anon-chat-cos720 directory, and run the following command to delete the anon-chat-cos720 directory:
```bash
rm -rf anon-chat-cos720         # delete the directory cloned to this machine
```



## Contribution
This server was created by Jared O'Reilly, a Computer Science Honours student at the University of Pretoria. Besides the npm packages, everything was designed, coded and tested by him. Thanks must go to the [random-name](https://github.com/dominictarr/random-name) project, for providing a list of 21986 names in JSON format which were used in pseudonym creation.

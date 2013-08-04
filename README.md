Node-Multiplayer-Drawing-Game
=============================
CMPT470 Group 14 iDo
Technology Evaluation Demo
Group members:
	Te Bu
	Haowei Zhang
	Yu Yu

Our technology is Node.js

Our demo is a online multiplayer drawing game
Basically, this demo use socket.io module in node.js to easily broadcast data to all connected users to share drawing and chat

Installation:
	To run our demo, first you need to have node.js and npm
	Under Ubuntu, it can be done is the following commands:
	sudo apt-get install python-software-properties
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs npm

	And then change to our folder and run:
	sudo npm install
	It will automatically install all required modules.

Running:
	To run our demo, change to our folder and simplely run:
	node app.js
	Then the demo server will start and listen to port 8080
	If you are doing this locally, just go to 127.0.0.1:8080 to see the demo

It is based on a tutorial online:
	http://tutorialzine.com/2012/08/nodejs-drawing-game/

Improvement we made upon the tutorial:
	1. Can drawing different colors
	2. Can save the drawing iamge
	3. Display the number of online users
	4. Can chating with all people online

It also uses Jquery(1.8.2) and some opensource plugins of Jquery:
	miniColors:
	https://github.com/claviska/jquery-miniColors
	jquery-cookie:
	https://github.com/carhartl/jquery-cookie


// Including libraries
var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files
	
// Server all static files
// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
	
// This is the port for our web server.
app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler (request, response) {
	request.addListener('end', function () {
		//Server the static file
        fileServer.serve(request, response);
    });
}

// Set the log level to normal.
io.set('log level', 1);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {	
	// Write socket connection information to log
	console.log(socket);

	// Start listening for mouse move events
	socket.on('mousemove', function (data) {
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});

	// Start listening for sending message events
	socket.on('send', function (data) {
		// Broadcast the receieve message to all other clints.
        	socket.broadcast.emit('message', data);
    	});
});

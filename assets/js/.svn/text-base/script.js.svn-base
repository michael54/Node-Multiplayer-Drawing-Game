$(function(){

	// This demo depends on the canvas element
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}

	// The URL of the web page
	var url = 'http://' + window.location.hostname + ':' + window.location.port;

	var doc = $(document),
		win = $(window),
		canvas = $('#paper'),
		ctx = canvas[0].getContext('2d'),
		instructions = $('#instructions'),
		local_color = $('#color'),
		messages = $('#log'),
		input = $('#message'),
		nickname = $('#nickname'),
		login = $('#login'),
		button = $('#submit');
	
	// Generate an unique ID
	var id = Math.round($.now()*Math.random());

	if($.cookie('nickname')){
		name = $.cookie('nickname');
		input.show('fast');
		button.show('fast');
	}
	else {
		nickname.show('fast');
		login.show('fast');
	}
	
	// A flag for drawing activity
	var drawing = false;

	var clients = {};
	var cursors = {};

	var socket = io.connect(url);

	var onlineNum = 1;
	
	// Listening to other's moving
	socket.on('moving', function (data) {
		if(! (data.id in clients)){
			// a new user has come online. create a cursor for them
			cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');

			// Increase the number of online users by 1
			onlineNum++;
			$('#count').text(onlineNum+' Users Online');
		}
		
		// Move the mouse pointer
		cursors[data.id].css({
			'left' : data.x,
			'top' : data.y
		});
		
		// Is the user drawing?
		if(data.drawing && clients[data.id]){
			
			// Draw a line on the canvas. clients[data.id] holds
			// the previous position of this user's mouse pointer
			
			drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y, data.color);
		}
		
		// Saving the current client state
		clients[data.id] = data;
		clients[data.id].updated = $.now();
	});

	var prev = {};
	
	canvas.on('mousedown',function(e){
		e.preventDefault();
		drawing = true;
		prev.x = e.pageX;
		prev.y = e.pageY;
		
		// Hide the instructions
		instructions.fadeOut();
	});
	
	doc.bind('mouseup mouseleave',function(){
		drawing = false;
	});

	var lastEmit = $.now();

	// Send the mouse move information to the server
	doc.on('mousemove',function(e){
		if($.now() - lastEmit > 5){
			socket.emit('mousemove',{
				'x': e.pageX,
				'y': e.pageY,
				'drawing': drawing,
				'id': id,
				'color': local_color.val()
			});
			lastEmit = $.now();
		}
		
		// Draw a line for the current user's movement, as it is
		// not received in the socket.on('moving') event above
		
		if(drawing){
			
			drawLine(prev.x, prev.y, e.pageX, e.pageY, local_color.val());
			
			prev.x = e.pageX;
			prev.y = e.pageY;
		}
	});

	// Remove inactive clients after 10 seconds of inactivity
	setInterval(function(){
		
		for(ident in clients){
			if($.now() - clients[ident].updated > 10000){
				
				// Last update was more than 10 seconds ago. 
				// This user has probably closed the page
				
				cursors[ident].remove();
				delete clients[ident];
				delete cursors[ident];

				// Decrease the number of online users by 1
				onlineNum--;
				if(onlineNum==1){
					$('#count').text(onlineNum+' User Online');
				}
				else{
					$('#count').text(onlineNum+' Users Online');
				}				
			}
		}
		
	},1000);

	// Function to draw a line on canvas
	function drawLine(fromx, fromy, tox, toy, c){
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.strokeStyle = c;
		ctx.stroke();
	}

	// Function to send chat message to the server
	var send = function() {
        socket.emit('send', {
        	username : name,
        	msg : input.val()
        });
        // Add the message for current user
        messages.append('<li><strong>'+name+':</strong> ' + input.val() + '</li>');

        // Clear the input and scroll to the bottom
        input.val('');
        messages.scrollTop(10000000000);
    };
    
   	// Listening to others' messages
    socket.on('message', function (data) {
    	// Append the recieved messages and scroll to the bottom
        messages.append('<li><strong>'+data.username+':</strong> ' + data.msg + '</li>');
        messages.scrollTop(10000000000);
    });

    // Send the message when press ENTER
    input.keypress(function(event) {
        if (event.keyCode == 13) {
        	if(input.val()==''){
    			alert("Message cannot be empty!");
    		}
    		else {
    			send();
    		}            
        }
    });
    
    // Click on login button to login
    login.click(function() {
    	if(nickname.val()==''){
    		alert("Nickname cannot be empty!");
    	}
    	else {
    		// Set cookie to remeber user's nickname
    		$.cookie('nickname', nickname.val(), {expires: 1});
	    	name = nickname.val();
	    	// Hide the login form and display the chatting form
	    	login.hide('fast');
	    	nickname.hide('fast');
	    	input.show('fast');
	    	button.show('fast');
    	}    	
    })

    // Click on logout button to logout
    button.click(function() {

    	// Delete the cookie and clear the name
        $.removeCookie('nickname');
        nickname.val('');
        name = '';
    	
    	// Return to the login form.
    	input.hide('fast');
    	button.hide('fast');
    	login.show('fast');
    	nickname.show('fast');
    });


});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clients = 0;

io.on('connection', function(socket) {
	clients++;
	io.sockets.emit('broadcast', {description: clients + 'clients connected!'});
	socket.on('disconnect', function() {
		clients--;
		io.sockets.emit('broadcast', {descripton: clients + 'clients connected!'});

	});
});

http.listen((process.env.PORT || 5000), function() {
    console.log('listening on *:3000');
});


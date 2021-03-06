var express = require('express')
, path = require('path')
, app = express()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

//configure sockets
server.listen(process.env.PORT || 3000);
//configure express
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//support for hosting the app online at heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});



app.get('/', function (req, res) { //when you visit the homepage
  res.render('client.hbs'); //display the client.hbs file (no variables passed in) 
});


io.sockets.on('connection', function (socket) { //new socket connection established
  socket.on('circle', function(info) { //when the server recieves a message
    //otherwise broadcast the message to all connected clients 
    io.sockets.emit('circle', { x: info.x, y: info.y });
  })
});
// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});

// require body-parser
var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));

// tell the express app to listen on port 8000
var server = app.listen(8080, function() {
 console.log("listening on port 8080");
});

// this gets the socket.io module *new code!* 
var io =  require('socket.io').listen(server);
var counter = 0;
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
		//all the socket code goes in here!
		socket.on("posting_form", function (data){
			counter++;
		  console.log('Someone submit the form,  counter: ' + counter );
		  io.emit("my_full_broadcast_even", 
		  		{
		  			counter: counter
					});
		});
		socket.on("posting_form_reset", function (data){
			counter= 0;
		  console.log('Someone submit the form,  counter: ' + counter );
		  io.emit('updated_message_reset', 
		  		{
		  			counter: counter
					}
		  );

		});
    // //  EMIT:
    // socket.emit('my_emit_event');
    // //  BROADCAST:
    // socket.broadcast.emit("my_broadcast_event");
    // //  FULL BROADCAST:
    // io.emit("my_full_broadcast_even");
})



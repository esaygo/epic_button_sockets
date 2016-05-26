//the server param is passed from server.js var route = require("./routes/index.js")(app, server);
//so that the code for server's response can be included in here
module.exports = function(app, server){
  //this gets the socket.io module
var io = require("socket.io").listen(server);
var counter = 0;

  app.get('/', function (req,res) {
    res.render('index');
    //console.log(res);
  });

  // Whenever a connection event happens (the connection event is built in) run the following code
  io.sockets.on('connection', function(socket) {
    //console.log("epic button");
    // console.log(socket.id);
    socket.on("update_count", function(){
    //if I update the counter on the client, it increments only for that client.
    //the total count is displayed to all clients, but the incrementing happens separately
    //solution: update the counter on the server
      counter++;

      //broadcast to all users
      io.sockets.emit('updated_count', {response: counter});

    });
    socket.on("reset_count", function() {
      counter = 0;
      //broadcast to all users
      io.sockets.emit('updated_count', {response: counter});

    });
  });

}

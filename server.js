
// 1. Have the server render views/index.ejs that has the form for the user to fill out
// 2. The user fills out the form and submits
// 3. The form information is EMITTED to the server with the event name "posting_form"
// 4. The server listens for an event 'posting_form' and when this event gets triggered, organizes all the emitted information to form a single message and sends this single message with the event called 'updated_message'. It also EMITs an event called 'random_number' with random number between 1-1000.
// 5. The client listens for an event called 'random_number' and when this event gets triggered, shows the number in the HTML.
// 6. The client listens for an event called 'updated_message' and when this event gets triggered, displays the message somewhere in the HTML

var express = require('express');
var path = require('path'); //!!!
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static"))); //!!!
// This sets the location where express will look for the ejs views
app.set('views',path.join(__dirname, '/views'));
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
//app.use(bodyParser.json());

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
//his is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
//var io = require('socket.io').listen(server);

var route = require("./routes/index.js")(app, server);

var socket = require('socket.io');
var fs = require('fs');

var express = require('express');
var app = express();

// dans le dossier public a la racine
app.use(express.static(__dirname + '/public'));


var server = app.listen(3333, function ()
{
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})




// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket)
{


  console.log('Un client est connecté !');
});

server.listen(3333);
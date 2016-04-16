var socket = require('socket.io');
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
	host     : "localhost",
	user     : "root",
	password : "wac",
	database : "wacdoc"
});

// var toto = socket.on(pseudo, email, pass);
// console.log(toto);



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

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket)
{
	socket.on('login', function (pseudo, email, pass) {
		console.log(pseudo, email, pass);
	});

	con.query("SELECT * FROM users WHERE username = 'Skizz' ", function(err, rows) {
		// console.log(rows);
	});

	// console.log('Un client est connecté !');
});


server.listen(3333);
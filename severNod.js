var socket = require('socket.io');
var fs = require('fs');
var mysql = require("mysql");
var express = require('express');
var path = require('path');

var app = express();
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "wacdoc"
});

var crypto = require('crypto');


app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

// app.get('/register', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/public/register.html'));
// });

app.get('/logo', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/c.login.php'));
});

// dans le dossier public a la racine
app.use(express.static(__dirname + '/public'));

//  con.query("SELECT * from users where username = 'root' ",function(err,rows){
//   console.log(rows);
// });


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
	socket.on("insciption",function(first_name,email,password){
		con.query("SELECT * from users where username='"+first_name+"' OR email ='" +email+"' ",function(err,rows){


			if(rows.length === 1)
			{
				socket.emit("insciption","error");  
			}
			else
			{
				var md5 = crypto.createHash('md5').update(password).digest("hex");
				con.query("INSERT INTO users (username,email,password) VALUES ('" +first_name + "','" + email + "','"+md5 +"') ",function(err,rows){
					console.log(err);

				})
			}
		});
})

		socket.on("login",function(first_name,password){
			// console.log(first_name)
		var md5 = crypto.createHash('md5').update(password).digest("hex");
			// console.log(first_name,md5);
			 socket.emit("login",first_name,md5);  

			})

		console.log('Un client est connecté !');
	});
server.listen(3333);
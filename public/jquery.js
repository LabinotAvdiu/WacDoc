$(document).ready(function () {
	var socket = io.connect('http://localhost:3000');
	$(".submit").click(function(e){
		console.log("ll");
	e.preventDefault();
		var first_name = 	$("#first_name").val();
		var email = 	$("#email").val();
		var password = 	$("#password").val();
	// socket.emit("insciption",first_name,email,password);
	})

$("#connexion").click(function(e){
	e.preventDefault();
		var pseudo = $("#pseudo").val();
		var password = 	$("#password").val();
	socket.emit("login",pseudo,password);
	});


////// SOCKET//////////

	socket.on("insciption",function(wid)
	{
		$(".error").html("<p>Votre username ou email exist deja</p>")
	});


	socket.on("login",function(user,password)
	{
		console.log(user,password)
		$.get({
			url:"http://localhost:3333/logo?login="+user+"&pass="+password,
			success:function(data,s){
				console.log(data);
				if(data == false){
					// window.location = "App/page-accueil/view_acceueil.php";
					$('h3').remove();
				} else {
					// $('h3').remove();
					$("body").append("<h3>Ce Login ou ce Mot de passe n'existe pas !</h3>");
				}
			}
		});
		
	});




});


$(document).ready(function () {
	socket = io.connect('http://localhost:3333');
	$(".submit").click(function(e){
		e.preventDefault();
		var first_name = $("#first_name").val();
		var email = $("#email").val();
		var password = $("#password").val();
		socket.emit("insciption",first_name,email,password);
	});

	socket.on("insciption",function(wid)
	{
		console.log("s",wid)
		$(".error").html("<p>Votre pseudonyme ou adresse email existe déjà</p>")
	});
});
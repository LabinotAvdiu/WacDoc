$(document).ready(function () {
	socket = io.connect('http://localhost:3333');
	$(".submit").click(function(e){
	e.preventDefault();
		var first_name = 	$("#first_name").val();
		var email = 	$("#email").val();
		var password = 	$("#password").val();
	socket.emit("insciption",first_name,email,password);
	})
	// socket.emit("pencil",X1,Y1,X-2,Y-5,null, $("#color").val(),range());


	socket.on("insciption",function(wid)
	{
		console.log("s",wid)
		$(".error").html("<p>Votre username ou email exist deja</p>")
	});
});


$(document).ready(function () {
	socket = io.connect('http://localhost:3333');
	$(".submit").click(function(e){
		e.preventDefault();
		var first_name = $("#first_name").val();
		var email = $("#email").val();
		var password = $("#password").val();
		socket.emit("insciption",first_name,email,password);
	})
	
	var selDiv = "";

	document.addEventListener("DOMContentLoaded", init, false);

	function init() {
		document.querySelector('#files').addEventListener('change', handleFileSelect, false);
		selDiv = document.querySelector("#selectedFiles");
	}

	function handleFileSelect(e) {

		if(!e.target.files) return;

		selDiv.innerHTML = "";

		var files = e.target.files;
		console.log(files);
		for(var i=0; i<files.length; i++) {
			var f = files[i];

			selDiv.innerHTML += f.name + "<br/>";

		}

	}

	socket.on("insciption",function(wid)
	{
		console.log("s",wid)
		$(".error").html("<p>Votre pseudonyme ou adresse email existe déjà</p>")
	});
});
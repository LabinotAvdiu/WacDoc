$(document).ready(function () {
	socket = io.connect('http://localhost:3000');

	$(document).mousemove(function(){
		sock ()
	})


	$(document).keyup(function(){
		sock ()
	})

	function sock (){
		socket.emit("text",$("#content").html());
	}




	socket.on("text",function(value){
		// console.log(value);
		$('#content').html(value);
	})


	$('#content').wacDocWysiwyg();
});

// Plugin WYSIWYG


$(document).ready(function() {
	var socket = io.connect('http://localhost:3333');

	$('#inscription').click(function(e) {
		e.preventDefault();
		var pseudo = $('#pseudo').val();
		var email = $('#email').val();
		var pass = $('#password').val();

		socket.emit('login', pseudo, email, pass);
	});
});
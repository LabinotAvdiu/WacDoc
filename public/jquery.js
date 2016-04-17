$(document).ready(function () {
    socket = io.connect('http://localhost:3000');
    var change = false;

    $("#content").bind('DOMSubtreeModified', function () {
        if (change == true) {
            socket.emit("text", $("#content").html());
        }
        change = true
    });

    socket.on("text", function (value) {
        $('#content').html(value);
        change = false

    })

// Plugin WYSIWYG
    $('#content').wacDocWysiwyg();
});


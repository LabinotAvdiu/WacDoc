var http = require('http');

var url = require('url');


var server = http.createServer(function(req, res) {

    var page = url.parse(req.url).pathname;

    console.log(page);

    res.writeHead(200, {"Content-Type": "text/plain"});

    if (page == '/') {

        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');

    }

    else if (page == '/sous-sol') {

        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');

    }

    else if (page == '/etage/1/chambre') {

        res.write('Hé ho, c\'est privé ici !');

    } else {
    	res.writeHead(404, {"Content-Type": "text/plain"});
    	res.write('La page demandé n\'existe pas');
    }

    res.end();

});

server.listen(8080);

// var http = require('http'),
//     fs = require('fs');


// fs.readFile('/index.html', function (err, html) {
//     // if (err) {
//     //     throw err; 
//     // }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8080);
// });
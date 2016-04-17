var Bookshelf = require('bookshelf');

var config = {
   host: 'localhost',  // your host
   user: 'root', // your database user
   password: 'wac', // your database password
   database: 'wacdoc',
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});

module.exports.DB = DB;
var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'users',
   idAttribute: 'id',
});
var Files = DB.Model.extend({
   tableName: 'files',
   idAttribute: 'id',
});

module.exports = {
   User: User,
   Files: Files
};
var username = 'admin';
var password = 'accedoapp';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'accedoapp';

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;

module.exports = {
  'secret': 'devdacticIsAwesome',
  //'database': 'mongodb://localhost/accedodb'
  'database' : url
};
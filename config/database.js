const mysql = require('mysql')
const {db} = require('./dbConfig')
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'mylibrary'
//   });

// updated
const database = mysql.createConnection(db);

module.exports = database

// const Sequelize = require('sequelize')
const {db} = require('./dbConfig')
// const User = require('../models/User')

// const sequelize = new Sequelize (
//     dbConfig.dbname, 
//     dbConfig.user, 
//     dbConfig.password, 
//     {
//         host : dbConfig.host, 
//         dialect : dbConfig.dialect,
//         operatorsAliases: false,
//         pool : {
//             max : 5,
//             min : 0,
//             acquire: 30000,
//             idle : 10000,
//         },
//     }
// )

// // db initalization
// const db = {}
// db.Sequelize = Sequelize
// db.sequelize = sequelize



// module.exports = {sequelize, db}

// ==================================
// ==================================

const mysql = require('mysql')
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'mylibrary'
//   });

// updated
  const database = mysql.createConnection(db);

module.exports = database

/**
 * Created by bb2ridder on 15/05/2017.
 */
var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    connectionLimit : 25,
    host : config.dbHost,
    user : config.dbUsername,
    password : config.dbPassword,
    database : config.dbDatabase
});

module.exports = pool;
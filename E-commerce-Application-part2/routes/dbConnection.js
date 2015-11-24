var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  //host     : 'ecommerce.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
  port : '3306',
  user     : 'root',
  password : '12312312',
  database :'ecommerce',
});

/*var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '12312312',
    database : 'ecommerce'
});*/




module.exports = connection;
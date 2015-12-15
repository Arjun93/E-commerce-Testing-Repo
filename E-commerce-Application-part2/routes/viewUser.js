var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.get('/', function(req, res, next) {
  
  var userName = req.session.endUser;
  var firstnamePattern = req.query.fname;
  var lastnamePattern = req.query.lname;
  var personRole = req.session.role;
  //console.log(firstnamePattern);
  //console.log(lastnamePattern);

  var query = "SELECT firstname,lastname FROM user_credentials";
  if(personRole == 'admin') {
    	if(firstnamePattern || lastnamePattern) {
      		query += " WHERE firstname LIKE '%"+firstnamePattern+"%' AND lastname LIKE '%"+lastnamePattern+"%'";
      		//console.log(query);
    	}

      connection.query(query,function(err,rows) {            
            if(err) {
              console.log("Error Selecting : %s ",err );
            }
            if(rows.length > 0) {
              res.json({"user_list":rows});
            }
            else {
              res.json({"err_message":"no results found"});
            }
      });
  }
  else {
  	  res.json({"err_message":"you are not authorized to view the information."});
  }

});

module.exports = router;
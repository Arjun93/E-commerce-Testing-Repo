var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.get('/', function(req, res, next) {
	var sessionUserName = req.session.endUser;
	var sessionRole = req.session.role;

	if(typeof sessionUserName != 'undefined') {
		if(sessionRole == 'admin') {
			retrieveOrderInformation(req,res);
		}
		else {
			res.json({"message":"02 You need to log in as an admin prior to making a request"});
		}		
	}
	else {
		res.json({"message":"02 You need to log in as an admin prior to making a request"});
	}
});     

function retrieveOrderInformation(req,res) {
	var query = "SELECT * FROM order_information where quantity_sold > 0";
	//console.log(query);		
	connection.query(query,function(err,rows) {            
	    if(err) {
		    //console.log("Error Selecting : %s ",err );
		    res.json({"message":"There was a problem with this action"});
	    }
	    if(rows.length > 0) {
	    	res.json({"order_list":rows,"message": "01 The request was successful"});
	    }			        
  	});//connection
		
		
}

module.exports = router;
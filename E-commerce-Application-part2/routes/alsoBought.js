var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.post('/', function(req, res, next) {
	var userName = req.session.endUser;
	var personRole = req.session.role;
	var isValid = true;
	if(personRole == 'admin') {
		var productIdOne = req.body.productId1;
		var productIdTwo = req.body.productId2;
		
		var insertData = {
			from_node_id: productIdOne,
			to_node_id: productIdTwo
		};
		
		if(typeof productIdOne == 'undefined' && productIdOne == "") {
			 isValid = false;
		}

		if(typeof productIdTwo == 'undefined' && productIdTwo == "") {
			 isValid = false;
		}

		connection.query('INSERT INTO related_products set ?',insertData,function(err,rows) {            
		    if(err) {
		      console.log("Error Selecting : %s ",err );
		      res.json({"message":"There was a problem with this action"});
		    }
		    else {
		      res.json({"message":"The request was successful"});
		    }	        
		});
	}
	else {
	  res.json({"message":"There was a problem with this action"});
	}
});

module.exports = router;
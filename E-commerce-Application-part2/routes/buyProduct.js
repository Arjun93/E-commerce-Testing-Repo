var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.post('/', function(req, res, next) {
	var sessionUserName = req.session.endUser;
	var userInputProductId = req.body.productId;

	var query = "SELECT * FROM product_inventory_information WHERE";

    if(typeof userInputProductId != 'undefined' && userInputProductId != "") {
		query += " product_id= '"+userInputProductId+"',";
	}

	var finalQuery = query.substring(0,query.length-1);
	//console.log(finalQuery);

	if(typeof sessionUserName != 'undefined') {			
		connection.beginTransaction(function(err) {
	    	retrieveInformation(req,res,finalQuery,userInputProductId);
		});
      	connection.commit(function(err) {
	        if (err) {
	          return connection.rollback(function() {
	            throw err;
	            res.json({"message":"There was a problem with this action"});
	            return;
	          });
	        }
        	//console.log('success!');
	    });			
	}
	else {
		res.json({"message":"02 You need to log in prior to buying a product"});
	}
});     

function retrieveInformation(req,res,finalQuery,userInputProductId) {
	var query = finalQuery;
	var stockAvailable;
	//console.log(query);
	connection.query(query,function(err,rows) {            
	    if(err) {
		    //console.log("Error Selecting : %s ",err );
		    res.json({"message":"There was a problem with this action"});
	    }
	    if(rows.length > 0) {
	    	stockAvailable = rows[0].quantity_remaining;
	    	if(stockAvailable == 0) {
	    		res.json({"message":"03 That product is out of stock"});
	    	}
	    	else {
	    		stockAvailable = stockAvailable - 1;
	    		updateInformation(req,res,connection,stockAvailable,userInputProductId);
	    	}
	    }
	        
  	});//connection
}

function updateInformation(req,res,connection,stockAvailable,userInputProductId) {
	var query = "UPDATE product_inventory_information SET quantity_remaining = ";
	query += stockAvailable + " WHERE product_id = "+userInputProductId;
	//console.log(query);
	connection.query(query,function(err,rows) {            
	    if(err) {
	      //console.log("Error Selecting : %s ",err );
	      res.json({"message":"There was a problem with this action"});
	    }
	    else {
	      updateOrders(req,res,connection,userInputProductId);
	    }
	        
  	});
}

function updateOrders(req,res,connection,userInputProductId) {
	var query = "INSERT INTO order_information (product_id, quantity_sold) VALUES("+userInputProductId+",1) ON DUPLICATE KEY UPDATE quantity_sold = quantity_sold + 1";
	//console.log(query);
	connection.query(query,function(err,rows) {            
	    if(err) {
	      //console.log("Error Selecting : %s ",err );
	      res.json({"message":"There was a problem with this action"});
	    }
	    else {
	      res.json({"message":"01 The purchase has been made successfully"});
	    }
	        
  	});
}

module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./../routes/dbConnection');

router.get('/', function(req, res, next) {
	var inputProductId = req.query.productId;
	var inputCategory = req.query.category;
	var inputKeyword = req.query.keyword;
	//console.log(inputProductId);
	//console.log(inputCategory);
	//console.log(inputKeyword);
	var query="SELECT product_title FROM product_information ";
	
	if(typeof inputKeyword != 'undefined' && inputKeyword!="") {
		//console.log("fetching description query");
		query += "WHERE product_description LIKE '%"+inputKeyword+"%'";
	}

	if(typeof inputCategory != 'undefined' && inputCategory!="") {
		//console.log("fetching category query");
		query = "SELECT PRO.product_id, PRO.product_asin, PRO.product_title, PRO.product_group, CAT.category_name FROM product_information AS PRO, "+
				"category_information as CAT, product_category_information as PRO_CAT WHERE "+
				"PRO.product_id = PRO_CAT.product_id AND CAT.category_id = PRO_CAT.category_id AND "+
				"CAT.category_name='"+inputCategory+"'";
		//console.log(query);
	}

	if(typeof inputProductId != 'undefined' && inputProductId!="") {
		//console.log("fetching product query");
		query += "WHERE product_id="+inputProductId+"";
	}

	if(typeof inputCategory != 'undefined' && inputCategory!="" && typeof inputKeyword != 'undefined' && inputKeyword!="") {
		//console.log("fetching category and description query");
		query = "SELECT PRO.product_id, PRO.product_asin, PRO.product_title,PRO.product_description, PRO.product_group, CAT.category_name FROM product_information AS PRO, "+
				"category_information as CAT, product_category_information as PRO_CAT WHERE "+
				"PRO.product_id = PRO_CAT.product_id AND CAT.category_id = PRO_CAT.category_id AND "+
				"CAT.category_name='"+inputCategory+"' AND PRO.product_description LIKE '%"+inputKeyword+"%'";
		//console.log(query);
	}

	searchProduct(query,req,res);
});

function searchProduct(query,req,res) {
	//console.log(query);
	connection.query(query,function(err,rows) {            
	    if(err) {
	        //console.log("Error Selecting : %s ",err );
	        res.json({"err_message":"Error occured"});
	    }
	    if(rows.length > 0) {
	      	//console.log("fetching rows");
	        res.json({"product_list":rows});
	    }
	});
		
}

module.exports = router;
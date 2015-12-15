var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

/*Homescreen - login - post method*/
router.post('/', function(req, res, next) {
    var productIdOne = req.body.productId;
    var sessionUserName = req.session.endUser;
    var isValid = true;
    if(typeof productIdOne == 'undefined' || typeof productIdOne == 'undefined' || productIdOne == "") {
      isValid = false;
      res.json({"message":"There was a problem processing the request"});
    }
    if(typeof sessionUserName != 'undefined') {
      getRecommendations(productIdOne,res);
      /*connection.query('SELECT * FROM user_credentials where username = ?',[req.session.endUser],function(err,rows) {            
          console.log("Retrieving rows");
          if(err) {
              console.log("Error Selecting : %s ",err );
              console.log("User not logged in");
              res.json({"message":"There was a problem processing the request"});
          }          
          if(rows.length > 0) {
              getRecommendations(productIdOne);
          }
          else {
              res.json({"message":"There was a problem with this action"});
          }
      });*/
    }
    else {
      res.json({"message":"There was a problem processing the request"});
    }
});

function getRecommendations(productIdOne,res) {
    connection.query('SELECT to_node_id FROM related_products where from_node_id = ? LIMIT 5',[productIdOne],function(err,rows) {            
      if(err) {
        //console.log("Error Selecting : %s ",err );
        res.json({"message":"There was a problem with this action"});
      }
      if(rows.length > 0) {
          res.json({"relatedProducts":rows});
      }
      else {
          res.json({"message":"There was a problem with this action"});
      }
    });
}


module.exports = router;
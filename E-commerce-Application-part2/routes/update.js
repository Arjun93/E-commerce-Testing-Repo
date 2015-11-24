var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.post('/', function(req, res, next) {
	/*var userInputSessionId = req.body.sessionID;
	var userSessionId = req.sessionID;
	console.log(userInputSessionId);
	console.log(userSessionId);*/
	var isInputFormatCorrect = true;
	var sessionUserName = req.session.endUser;
	var userDbSessionId;

	var currentUser = req.session.endUser;
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var userAddress = req.body.address;
	var userCity = req.body.city;
	var userState = req.body.state;
	var userZip = req.body.zip;
	var userEmail = req.body.email;
	var userName = req.body.username;
	var passWord = req.body.password;

	console.log(userName);

	var query = "UPDATE user_credentials SET";

    if(typeof firstName != 'undefined' && firstName != "") {
		query += " firstname= '"+firstName+"',";
	}

	if(typeof lastName != 'undefined' && lastName != "") {
		query += " lastname= '"+lastName+"',";
	}

	if(typeof userAddress != 'undefined' && userAddress != "") {
		query += " address= '"+userAddress+"',";
	}

	if(typeof userCity != 'undefined' && userCity != "") {
		query += " city= '"+userCity+"',";
	}

	if(typeof userState != 'undefined' && userState != "") {
		if(userState.length != 2) {
			isInputFormatCorrect = false;
		}
		query += " state= '"+userState+"',";
	}

	if(typeof userZip != 'undefined' && userZip != "") {
		if(userZip.length != 5) {
			isInputFormatCorrect = false;
		}
		query += " zip= '"+userZip+"',";
	}

	if(typeof userEmail != 'undefined' && userEmail != "") {
		query += " email= '"+userEmail+"',";
	}

	if(typeof userName != 'undefined' && userName != "") {
		query += " username= '"+userName+"',";
	}

	if(typeof passWord != 'undefined' && passWord != "") {
		query += " password= '"+passWord+"',";
	}

	var finalQuery = query.substring(0,query.length-1);
	console.log(finalQuery);

	
	//connection.query('SELECT * FROM user_credentials where sessionId = ?',[req.sessionID],function(err,rows) {            
    connection.query('SELECT * FROM user_credentials where username = ?',[req.session.endUser],function(err,rows) {            
	    console.log("Retrieving rows");
	    if(err) {
	        console.log("Error Selecting : %s ",err );
	        console.log("User not logged in");
	        res.json({"message":"There was a problem with this action"});
	    }
      
	    if(rows.length > 0) {
	      	userDbSessionId = rows[0].sessionId;
	      	console.log(req.sessionId);
	      	console.log(userDbSessionId);
	      	//finalQuery = finalQuery+ " WHERE sessionId='"+userDbSessionId+"'";
	      	finalQuery = finalQuery+ " WHERE username='"+req.session.endUser+"'";
		    if (isInputFormatCorrect == true) {
				updateInformation(userName,finalQuery,req,res,connection);
			}
			else {
				console.log("Validation error");
			    res.json({"message":"There was a problem with this action"});
			}
	    }
	    else {
	      	res.json({"message":"User is not logged in"});
	    }
	});
});

function updateInformation(userName,finalQuery,req,res,connection) {
	var query = finalQuery;
	console.log(query);
	connection.query(query,function(err,rows) {            
	    if(err) {
	      console.log("Error Selecting : %s ",err );
	      res.json({"message":"There was a problem with this action--"});
	    }
	    else {
	      if(query.indexOf(userName) != -1) {
	      	req.session.endUser = userName;
	      	var meUser = req.session.endUser;
	      	console.log("New User Name: "+meUser);
	      }
	      res.json({"message":"Your information has been updated"});
	    }
	        
  	});
}

module.exports = router;
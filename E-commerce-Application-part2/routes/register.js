var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

router.post('/', function(req, res, next) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var userAddress = req.body.address;
  var userCity = req.body.city;
  var userState = req.body.state;
  var userZip = req.body.zip;
  var userEmail = req.body.email;
  var userName = req.body.username;
  var passWord = req.body.password;
 
  var validationResult = validateUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord);
  insertUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord,res,validationResult);
});

function validateUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord) {
	var validationFlag = 0;
	if (firstName == "" || lastName =="" || userAddress =="" || userCity =="" ||userState == "" || userZip == "" || userEmail == "" || userName == "" || passWord == "" ) {
		validationFlag = 1;
		//console.log("Validation Error");
	}
	/*if (userState.length != 2 || userZip.length != 5) {
		validationFlag = 1;
		console.log("Validation Error");
	}*/
	if (userEmail.indexOf('@') == -1) {
		validationFlag = 1;
		//console.log("Validation Error");
	}

	if (userEmail.indexOf('.') == -1) {
		validationFlag = 1;
		//console.log("Validation Error");
	}

	if (validationFlag == 1) {
		return false;
	}
	else {
		return true;
	}

}


function insertUserInformation(firstName,lastName,userAddress,userCity,userState,userZip,userEmail,userName,passWord,res,validationResult) {
	var userRole;
	if(userName === "jadmin") {
		userRole = "admin";
	}
	else {
		userRole = "customer"
	}
	var insertData = {
	    firstname: firstName,
		lastname: lastName,
		address: userAddress,
		city: userCity,
		state: userState,
		zip: userZip,
		email: userEmail,
		username: userName,
		password: passWord,
		role: userRole,    
  	};
  	if(validationResult == true) {
  		
		connection.query('INSERT INTO user_credentials set ? ',insertData,function(err,rows) {            
		    if(err) {
			    res.json({"message":"there was a problem with your registration"});
			    //console.log("Error Selecting : %s ",err );
		    }
		    else {
		      	res.json({"message":"Your account has been registered"});	
		    }
  		});
			
  	}
  	else {
  		res.json({"message":"there was a problem with your registration"});
  	}
}

module.exports = router;
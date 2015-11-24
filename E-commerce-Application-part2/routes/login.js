var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection');

/*Homescreen - login - post method*/
router.post('/', function(req, res, next) {
    var userName = req.body.username;
    var password = req.body.password;
    console.log(userName);
    console.log(password);
    if(typeof userName == 'undefined' || typeof password == 'undefined' || userName == "" || password == "") {
      res.json({"err_message":"Not sufficient information"});
      req.session.endUser="";
    }
    else {
      validate_login_credentials(userName,password,req,res);
    }
});

function validate_login_credentials(userName,password,req,res) {
  /*if(req.session.endUser) {
    if(req.session.endUser == userName) {
      res.json({"err_message":"You are already logged in"});
    }
    else {
      res.json({"err_message":"Another user already logged in"});
    } 
  }*/
  //else {
    req.session.endUser = userName;
      connection.query('SELECT * FROM user_credentials where username = ? AND password = ?',[userName,password],function(err,rows) {            
      
        if(err) {
          console.log("Error Selecting : %s ",err );
        }
        if(rows.length > 0) {
            req.session.cookie.maxAge = new Date(Date.now() + 900000);
            //req.session.cookie.maxAge = new Date(Date.now() + 25000);
            req.session.role = rows[0].role;
            var personRole = req.session.role;
            var userSessionId = req.sessionID;
            console.log(userSessionId);

            connection.query('UPDATE user_credentials SET sessionId = ? WHERE username = ?',[userSessionId,userName], function(err,rows) {

              if(err) {
                console.log("Error Selecting : %s ",err );
              }

            });
            
            if(personRole == 'admin') {
              res.json({"message":"You are logged in","menu":"/login, /logout, /updateInfo, /modifyProduct, /viewUsers, /getProducts","Session ID":""+req.sessionID});
            }
            else {
              res.json({"message":"You are logged in","menu":"/logout, /updateInfo, /getProducts","Session ID":""+req.sessionID});
            }  
        }
        else {
          console.log("auth fail!!!");
          req.session.endUser = "";
          res.json({"err_message":"That username and password combination was not correct"});
        }
      });
    //}
}


module.exports = router;
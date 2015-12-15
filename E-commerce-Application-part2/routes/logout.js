var express = require('express');
var router = express.Router();
var connection = require('./../routes/dbConnection'); 


/*Handling logout*/
router.post('/', function(req, res, next) {
  var userInputSessionId = req.body.sessionID;
  var userSessionId = req.sessionID;
  var userName = req.session.endUser;
  var userDbSessionId;
  //console.log(userSessionId);  

  if(req.session && req.session.endUser) {
    req.session.destroy();
    //req.session.regenerate(function(err) {});
    res.json({"Message":"You have been logged out."});
  }
  else {
    res.json({"Message":"You are not currently logged in"});
  }
});

module.exports = router;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var logout = require('./routes/logout');
var login = require('./routes/login');
var register = require('./routes/register');
var update = require('./routes/update');
var viewuser = require('./routes/viewUser');
var modifyProduct = require('./routes/modifyProduct');
var viewProduct = require('./routes/getProducts');
var buyProduct = require('./routes/buyProduct');
var getOrders = require('./routes/getOrders');
var connect = require("connect");
//var redis   = require("redis");
//var redisStore = require('connect-redis')(session);
//var client  = redis.createClient();
var SessionStore = require('express-mysql-session');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var storeOptions = {
    host: 'localhost',
    //host: 'ecommerce.ccwtwgtut47e.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'root',
    password: '12312312',
    database: 'ecommerce'
};

app.use(session({ 
  //store: new redisStore({ host: 'localhost', port: 8000, client: client,ttl :  260}),
  store: new SessionStore(storeOptions),
  secret: 'quizapplication', 
  resave: false, 
  saveUninitialized: false, 
  rolling:true 
}));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/registerUser', register);
app.use('/updateInfo', update);
app.use('/viewUsers', viewuser);
app.use('/modifyProduct', modifyProduct);
app.use('/getProducts', viewProduct);
app.use('/buyProduct', buyProduct);
app.use('/getOrders', getOrders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

module.exports = app;

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

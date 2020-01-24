var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var userListRouter = require('./routes/userList');
var loginRouter = require('./routes/login');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:'my_session_key'
}),function(req,res,next){
  if(req.session.logined){
    res.locals.login_id=req.session.login_id;
    res.locals.user_name=req.session.user_name;
  }
  next();
});

app.use('/', indexRouter);
app.use('/userList',function(req,res,next){
  if(req.session.logined){
    next();
  }else{
    res.redirect('/');
  }
} , userListRouter);
app.use('/login', loginRouter);
app.use('/board',function(req,res,next){
  if(req.session.logined){
    next();
  }else{
    res.redirect('/');
  }
} ,boardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message);
});

module.exports = app;

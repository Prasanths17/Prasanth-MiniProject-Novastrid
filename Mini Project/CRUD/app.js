var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {sequelize,testConnection} = require('./Database/database');
const bodyParser = require('body-parser');

require('./Config/dotenv');

testConnection()
  .then(() => {
    console.log('Starting the application...');
    // Add your application startup logic here
  })
  .catch((error) => {
    
    console.error('Unable to start the application:', error);
    process.exit(1);
  });






var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/authenticationRoute');
const crudRouter = require('./routes/crudRoute');

var app = express();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/' , authRouter);
app.use('/' , crudRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

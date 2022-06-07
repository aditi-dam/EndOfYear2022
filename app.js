var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var physicsRouter = require('./routes/physics')
var phys2023Router = require('./routes/physics2023');
var electricRouter = require('./routes/electricity');
var magnetRouter = require('./routes/magnetism');

var calcRouter = require('./routes/apcalc');
var calc2023Router = require('./routes/apcalc2023');
var derivRouter = require('./routes/derivatives');
var integRouter = require('./routes/integrals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/physics', physicsRouter);
app.use('/physics2023', phys2023Router);
app.use('/electricity', electricRouter);
app.use('/magnetism', magnetRouter);

app.use('/apcalc', calcRouter);
app.use('/apcalc2023', calc2023Router);
app.use('/derivatives', derivRouter);
app.use('/integrals', integRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var address = require('./routes/address');
var banner = require('./routes/banner');
var file = require('./routes/file');
var log = require('./routes/log');
var order = require('./routes/order');
var product = require('./routes/product');
var shopcar = require('./routes/shopcar');
var user = require('./routes/user');
var userinfo = require('./routes/userinfo');
var cors = require('cors');
console.log(product);
var app = express();
app.use(cors({
    // origin:['*'],  //指定接收的地址
    // methods:['GET','POST'],  //指定接收的请求类型
    // alloweHeaders:['Content-Type','Authorization']  //指定header
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/address', address);
app.use('/banner', banner);
app.use('/file', file);
app.use('/log', log);
app.use('/order', order);
app.use('/product', product);
app.use('/shopcar', shopcar);
app.use('/user', user);
app.use('/userinfo', userinfo);

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

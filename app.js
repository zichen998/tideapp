var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const products = require("./routes/products");
const customers = require("./routes/customers");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Our Custom Donation Web App Routes
app.get('/products', products.findAll);
app.get('/products/votes', products.findTotalVotes);
app.get('/products/:id', products.findOne);
app.get('/products/name',products.findBYName);
app.post('/products',products.addProduct);

app.put('/products/:id/vote', products.incrementUpvotes);

app.delete('/products/:id',products.deleteProduct);
app.get('/customers', customers.findAll);
app.get('/customers/votes', customers.findTotalVotes);
app.get('/customers/:id', customers.findOne);

app.post('/customers',customers.addCustomer);

app.put('/customers/:id/vote',customers.incrementUpvotes);

app.delete('/customers/:id',customers.deleteCustomer);


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
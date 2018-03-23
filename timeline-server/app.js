const express = require('express');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(`mongodb://localhost/timeline-db`);

const app = express();

// view engine setup

const hbs = exphbs.create({
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// rest API requirements

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// enable cors

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    require('./server/index')(req, res, next);
});

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen('3001');

module.exports = app;

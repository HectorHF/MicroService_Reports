var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var mongoose = require('mongoose');

// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url, { useMongoClient: true });
mongoose.Promise = global.Promise;

if (config.seed) {
  require('./util/seed');
}
// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);
// set up global error handling

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    //res.status(401).send('Invalid token');
    res.status(401).json({
    	message: 'Token expired or incorrect. Please log in again.',
  		status: 'failed'
    });
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
module.exports = app;

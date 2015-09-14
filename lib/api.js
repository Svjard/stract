/**
 * REST API endpoints
 */
var _ = require('lodash'),
    async = require('async'),
    fs = require('fs'),
    modules = {},
    os = require('os'),
    path = require('path'),
    pj = require('../package.json'),
    spawn = require('child_process').spawn,
    util = require('util');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

module.exports = function (dbs, app, emitter, rollbar, config, callback) {
  function check(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, 'shhhhhhhh', function(err, decoded) {      
        if (err) {
          return res.send({ success: false, message: 'Failed to authenticate token.' });    
        }
        else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {
      // if there is no token
      // return an error
      return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
      });
    }
  }

  // find all routes files within the routes folder and load each one
  // then use async parellel to call the functions with their callback
  walk('lib/routes', function(err, routes) {
    var routeStubs = [];
    _.each(routes, function(n) {
      routeStubs.push(
        function (cb) {
          require(n.replace('lib/routes/', './routes/'))(dbs, app, emitter, rollbar, config, check, function() {
            cb(null, null);
          });
        }
      );
    });

    async.parallel(routeStubs, function(err, results) {
      // done - no op required
    });
  });

  // render main page
  app.get('/', function (req, res) {
    res.render('index', { 'title': pj.title, 'dev': (process.argv[2] === 'dev' || process.argv[2] === 'test') || false });
  });

  callback(app);
};
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
  // Middleware to check if a user is authenticated
  function check (req, res, next) {
    if (config.bypassSso) {
      req.session = config.session;
      next();
    }
    else {
      if (!req.session.email) {
        return res.redirect('/login');
      }
      else {
        return next();
      }
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
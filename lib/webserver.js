/**
 * Web server
 */
var _ = require('lodash'),
    bodyParser = require('body-parser'),
    domainCreate = require('domain').create,
    express = require('express'),
    path = require('path'),
    util = require('util');

module.exports = function (dbs, pj, rollbar, callback) {
  var app = express();

  require('http').maxSockets = Infinity;

  var ddOptions = {
    'response_code': true,
    'tags': ['app:stract']
  };

  var datadog = require('connect-datadog')(ddOptions);

  app.enable('trust proxy');
  app.set('port', pj.config.port || 5000);
  app.set('views', path.join(__dirname, '..', '.tmp/serve'));
  app.set('view engine', 'ejs');
  if (process.argv[2] !== 'test' && process.argv[2] !== 'dev') {
    app.use(function(req, res, next) {
      var d = domainCreate();
      d.add(req);
      d.add(res);
      d.run(function() {
        next();
      });
      d.on('error', function(err) {
        rollbar.handleErrorWithPayloadData(e, { level: 'error' }, req);
        res.sendStatus(500).send({});
      });
    });
  }
  //app.use(require('tdmorgan')('combined-json', { 'rollbar': rollbar, 'tool': pj.name, 'dev': false })); // logging
  app.use(require('compression')()); // gzip
  app.use(require('method-override')()); // provides REST support to browsers that only support GET and POST
  app.use(require('cookie-session')({
    keys: ['e01aed5b-f48f-4ccd-8d37-52761c5baf10', '4dae713a-46d6-47cb-a24e-7ca61c684907']
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({ 'limit': '50mb' }))
  app.use(require('cookie-parser')('Play Stract And Have Fun'));
  app.use(require('serve-static')(path.join(__dirname, '..', '.tmp/serve')));
  app.use(require('serve-static')(path.join(__dirname, '..', 'public')));
  app.use(require('serve-static')(path.join(__dirname, '..')));
  if (process.argv[2] !== 'test' && process.argv[2] !== 'dev') {
    app.use(datadog);
  }
  
  return callback(app);
};
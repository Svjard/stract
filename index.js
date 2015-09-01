var _ = require('lodash'),
    Cookies = require('cookies'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    pj = require('./package.json'),
    rollbar = require('rollbar'),
    os = require('os'),
    exec = require('child_process').exec,
    WebSocketServer = require('ws').Server;

var config = require('./config/' + ((process.argv[2] === 'test') ? 'test.json' : (process.argv[2] === 'dev') ? 'dev.json' : 'production.json'));

// Rename the process
process.title = pj.name;

rollbar.init('f9df980beda348b5b7bf51c5340445cf');

// Initialize the database connection
require('./lib/db')(config, rollbar, function (dbs) {
  // Initialize the web server
  require('./lib/webserver')(dbs, pj, rollbar, function (app) {
    // Attach the REST API endpoints to the server
    require('./lib/api')(dbs, app, emitter, rollbar, config, function (app) {
      // Start the web server
      var server = require('http').createServer(app);
      server.listen(app.get('port'), function () {
        console.log(new Date().toLocaleString(), ':', pj.title, 'started on port', app.get('port'));
      });
      
      var wss = new WebSocketServer({ server: server });
      emitter.on('broadcast', function(data) {
        for (var i in wss.clients) {
          wss.clients[i].send(JSON.stringify(data));
        }
      });

      wss.on('connection', function(ws) {
        var c = new Cookies(ws.upgradeReq, null, app.get('session keys'));
        if (c !== void 0 && c !== null && c.get('express:sess') !== void 0) {
          ws.user = JSON.parse(new Buffer(c.get('express:sess'), 'base64').toString());
        }

        ws.on('close', function() {
        
        });
      });
    });
  });

  // Tidy up after MongoDB
  process.on('exit', function () {
    if (dbs != null) {
      
    }
  });
});

process.on('exit', function () {
  console.log(new Date().toLocaleString(), ':', pj.title, 'exiting');
});

process.on('SIGINT', function () {
  process.exit(1);
});
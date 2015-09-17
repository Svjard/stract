var pg = require('pg');

module.exports = function(config, rollbar, callback) {
  var connString = "postgres://" + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.database;

  pg.connect(connString, function(err, client, done) {
    if (err) {
      rollbar.handleError(err);
    }

    client.query('SELECT CURRENT_TIMESTAMP', function(err, result) {
      if (err) {
        rollbar.handleError(err);
      }

      done();
      callback(client);
    });
  });
};
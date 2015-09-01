var mysql = require('mysql');

module.exports = function(config, rollbar, callback) {
  console.log(config);

  var pool = mysql.createPool({
    connectionLimit : 100,
    host            : config.db.host,
    port            : config.db.port,
    user            : config.db.user,
    password        : config.db.password
  });

  pool.getConnection(function(err, connection) {
    connection.query( 'SELECT CURRENT_TIMESTAMP', function(err, rows) {
      if (err) {
        rollbar.handleError(err);
      }

      connection.release();
      callback(pool);
    });
  });

};
var _ = require('lodash'),
    util = require('util');

module.exports = function (dbs, app, emitter, rollbar, config, check, callback) {
  app.post('/api/register', function(req, res) {
    if (!req.body.email || req.body.email.length === 0) {
      return res.status(403).send({ error: 'Invalid email was specified.' });
    }

    if (!req.body.password || req.body.password.length === 0) {
      return res.status(403).send({ error: 'Invalid password was specified.' });
    }

    dbs.query('SELECT * FROM stractdev.User WHERE Email=?', [ req.body.email ], function(err, rows, fields) {
      if (err) {
        rollbar.handleError(err, req);
        return res.status(500).send({ error: 'Failed to reach the database.' });
      }

      if (rows && rows.length > 0) {
        return res.status(500).send({ error: 'Email has already been registered.' });
      }
      else {
        dbs.query('INSERT INTO stractdev.User WHERE Email=?', [ req.body.email ], function(err, rows, fields) {
          

        });
      }
    });
  });

  callback(app);
};
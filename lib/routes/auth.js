var _ = require('lodash'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    util = require('util');

module.exports = function (dbs, app, emitter, rollbar, config, check, callback) {
  function token() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
  }

  app.post('/api/auth/login', function(req, res) {
    if (!req.body.email || req.body.email.length === 0) {
      return res.status(403).send({ error: 'Invalid email was specified.' });
    }

    if (!req.body.password || req.body.password.length === 0) {
      return res.status(403).send({ error: 'Invalid password was specified.' });
    }

    dbs.query('SELECT * FROM stractdev.User WHERE Email= ?', [ req.body.email ], function(err, rows, fields) {
      if (err) {
        rollbar.handleError(err, req);
        return res.status(500).send({ error: 'Failed to reach the database.' });
      }

      if (rows && rows.length > 0) {
        bcrypt.compare(req.body.password, rows[0].PassHash, function(err, r) {
          if (err) {
            rollbar.handleError(err, req);
            return res.status(500).send({ error: 'Failed to encrypt the password.' });
          }

          if (r) {
            return res.send({ 'value': token() })
          }
          else {
            return res.status(403).send({ error: 'Password does not match for user specified.' });
          }
        });
      }
      else {
        return false;
      }
    });
  });

  callback(app);
};
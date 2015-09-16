var _ = require('lodash'),
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    jwt = require('jsonwebtoken'),
    util = require('util');

module.exports = function (dbs, app, emitter, rollbar, config, check, callback) {
  app.post('/api/auth/login', function(req, res) {
    if (!req.body.email || req.body.email.length === 0) {
      return res.status(500).send({ error: 'Invalid email was specified.' });
    }

    if (!req.body.password || req.body.password.length === 0) {
      return res.status(500).send({ error: 'Invalid password was specified.' });
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
            //var cert = fs.readFileSync('private.key');
            var token = jwt.sign(rows[0], 'shhhhhhhh', {
              algorithm: 'HS256',
              expiresInMinutes: 1440
            });

            return res.status(200).send({ 'token': token });
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
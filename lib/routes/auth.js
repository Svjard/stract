var _ = require('lodash'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    util = require('util');

module.exports = function (dbs, app, emitter, rollbar, config, check, callback) {
  function uuid(callback) {
    if (typeof(callback) !== 'function') {
      return uuidFromBytes(crypto.randomBytes(16));
    }

    crypto.randomBytes(16, function(err, rnd) {
      if (err) return callback(err);
      callback(null, uuidFromBytes(rnd));
    });
  }

  function uuidFromBytes(rnd) {
    rnd[6] = (rnd[6] & 0x0f) | 0x40;
    rnd[8] = (rnd[8] & 0x3f) | 0x80;
    rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
    rnd.shift();
    return rnd.join('-');
  }

  app.post('/api/auth/login', function(req, res) {
    dbs.query('SELECT * FROM User WHERE Email=' + req.body.email, function(err, rows, fields) {
      if (err) {
        rollbar.handleError(err, req);
        return res.sendStatus(500);
      }

      if (rows && rows.length > 0) {
        bcrypt.compare(req.body.password, rows[0].PassHash, function(err, r) {
          if (err) {
            rollbar.handleError(err, req);
            return res.sendStatus(500);
          }

          if (r) {
            uuid(function(err, token) {
              if (err) {
                rollbar.handleError(err, req);
                return res.sendStatus(500);
              }

              return res.send({ 'value': token })
            });
          }
          else {
            res.sendStatus(403)
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
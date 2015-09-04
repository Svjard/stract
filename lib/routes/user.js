var _ = require('lodash'),
    pj = require('../../package.json'),
    util = require('util');

module.exports = function (dbs, app, emitter, rollbar, config, check, callback) {
  app.get('/api/user/find', function(req, res) {
    console.log('user api find', req.query, req.params);

    dbs.query('SELECT * FROM stractdev.User WHERE Email = ?', [ req.query.email ], function(err, rows, fields) {
      if (err) {
        rollbar.handleError(err, req);
        return res.sendStatus(500);
      }

      if (rows && rows.length > 0) {
        res.send(rows[0]);
      }
      else {
        res.send({});
      }
    });
  });

  app.get('/api/user/:userId', function(req, res) {
    console.log('user api with userId', req.query, req.params);

    dbs.query('SELECT * FROM stractdev.User WHERE ID = ?', [ req.params.userId ], function(err, rows, fields) {
      if (err) {
        rollbar.handleError(err, req);
        return res.sendStatus(500);
      }

      if (rows && rows.length > 0) {
        res.send(rows[0]);
      }
      else {
        res.send({});
      }
    });
  });

  app.get('/api/user', function(req, res) {
    console.log('user api null', req, req.query, req.params);

    // Need to be able to lookup our auth token here if in the header
    return res.sendStatus(304);
  });

  app.post('/api/user', check, function(req, res) {
    req.body.createdOn = new Date(req.body.createdOn);
    req.body.lastModifiedOn = new Date(req.body.lastModifiedOn);

    dbs.midge.admin.count({ 'group': req.body.group, 'type': req.body.type }, function(err, count) {
      if (err) {
        log.logEvent(req.session.employeeId, req.ip, 'POST', '/api/admin/role', { 'tool': pj.name, 'data': req.body, 'message': 'Failed to insert the new role.', 'error': err });
        return res.sendStatus(500);
      }

      if (count === 0) {
        req.body.default = true;
      }

      dbs.midge.admin.insert(req.body, { safe: true }, function(err, items) {
        emitter.emit('broadcast', { event: req.body.type + ':add', item: req.body });
        res.send(req.body);
      });
    });
  });

  app.put('/api/user/:id', check, function(req, res) {
    delete req.body._id;
    
    req.body.createdOn = new Date(req.body.createdOn);
    req.body.lastModifiedOn = new Date(req.body.lastModifiedOn);

    dbs.midge.admin.update({ _id: new ObjectID(req.params.id) }, req.body, function(err, item) {
      if (err) {
        log.logEvent(req.session.employeeId, req.ip, 'PUT', '/api/admin/role/' + req.params.id, { 'tool': pj.name, 'data': req.body, 'message': 'Failed to update the role.', 'error': err });
        return res.sendStatus(500);
      }

      req.body._id = new ObjectID(req.params.id);
      emitter.emit('broadcast', { event: req.body.type + ':update', item: req.body });
      res.send(req.body);
    });
  });

  app.delete('/api/user/:id', check, function(req, res) {
    dbs.midge.admin.remove({ _id: new ObjectID(req.params.id) }, function(err, obj) {
      if (err) {
        log.logEvent(req.session.employeeId, req.ip, 'DELETE', '/api/admin/role/' + req.params.id, { 'tool': pj.name, 'data': req.query, 'message': 'Failed to delete the role.', 'error': err });
        return res.sendStatus(500);
      }

      emitter.emit('broadcast', { event: req.body.type + ':delete', item: req.params.id });
      res.sendStatus(200);
    });
  });

  callback(app);
};
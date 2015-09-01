'use strict';

var minimist = require('minimist');
var url = require('url');
var proxy = require('proxy-middleware');

var serverOptions = {
  string: 'server',
  default: { server: 'http://localhost:6565' }
};

var options = minimist(process.argv.slice(2), serverOptions);

var patterns = ['/api', '/ws'];

var proxies = []

patterns.forEach(function(pattern) {
  var proxyOptions = url.parse(options.server + pattern);
  proxyOptions.route = '/api';
  proxyOptions.preserveHost = false;
  proxies.push(proxy(proxyOptions));
});

console.log('Using server', options.server);

/*
 * Enable proxy
 */

module.exports = proxies;

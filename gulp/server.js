'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var util = require('util');
var gls = require('gulp-live-server');

gulp.task('serve', ['watch'], function() {
  var server = gls.new('./index.js');
  server.start();

  // use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch('./index.js', server.start.bind(server)); //restart my server
});

gulp.task('serve:app', ['serve'], function () {

});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(paths.dist);
});

gulp.task('serve:docs', ['ngdocs'], function () {
  browserSyncInit(paths.doc);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(paths.dist, null, []);
});

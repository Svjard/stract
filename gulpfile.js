'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'public',
  dist: 'dist',
  tmp: 'tmp',
  e2e: 'e2e',
  doc: 'docs'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

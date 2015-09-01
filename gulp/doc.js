'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

gulp.task('ngfonts', function () {
  return gulp.src(paths.dist + '/fonts/*')
    .pipe($.flatten())
    .pipe(gulp.dest(paths.doc + '/fonts/'));
});

gulp.task('ngdocs', ['ngfonts'], function () {
  var options = {
    scripts: [paths.dist + '/scripts/vendor.js',paths.dist + '/scripts/app.js' ],
    styles: [paths.dist + '/styles/vendor.css', paths.dist + '/styles/app.css'],
    editExample: false,
    title: "Stract Documentation"
  }

  return gulp.src(paths.src + '/{app,components}/**/*.js')
    .pipe($.ngdocs.process(options))
    .pipe(gulp.dest(paths.doc));
});



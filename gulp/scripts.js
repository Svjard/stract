'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(paths.src + '/{app,components}/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.babel())
    .on('error',  $.notify.onError({
      message: "Error: <%= error.message %>",
      title: "There was an error in the code"}))
    .pipe($.ngAnnotate())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.tmp + '/babel'))
    .pipe($.size());
});

gulp.task('browserify', ['scripts'], function () {
  return gulp.src(paths.tmp + '/babel/app/index.js', { read: false })
    .pipe($.browserify( {debug : true}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app'))
    .pipe($.size());
});

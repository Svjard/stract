'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('material-svgfonts', function() {
  return gulp.src('bower_components/material-design-icons/**/production/*')
    .pipe($.iconfontCss({
      fontName: 'material-design',
      targetPath: '../styles/material-design.css',
      fontPath: '../fonts/'
    }))
    .pipe($.iconfont({
      fontName: 'material-design',
      appendCodepoints: false,
      normalize: true,
      centerHorizontally: true,
      fontHeight: 100
    }))
    .pipe( gulp.dest('public/assets/fonts') );
});

/*
This file is created with lot of blood and sweat. For the same purpose Grunt could have been used but we shall live on the cutting edge so using Gulp. If you are interested in knowing why I advise you to watch these slides http://slides.com/contra/gulp but anyways for me the real joy is ability to execute asyncronously where ever possible in terms of executing task and more nodejs-ish flavour.

p.s I shall remove this big comment block after some time ;-)
*/
var gulp          = require('gulp'),
    minifyCSS     = require('gulp-minify-css');
    uglify        = require('gulp-uglify'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    stylish       = require('jshint-stylish');

var uglifyConfigs = {
  mangle           : true,
  compress         : {
      drop_console : true
  },
};

var JSFiles = [
  'src/awesome-select.js'
];

var CSSFiles = [
  'src/awesome-select.css'
];

// task for building require files
gulp.task('buildjs', function() {
  gulp.src(JSFiles)
  .pipe(uglify(uglifyConfigs))
  .pipe(concat('awesome-select.min.js'))
  .pipe(gulp.dest("dist"));
});

gulp.task('buildcss', function() {
  gulp.src(CSSFiles)
    .pipe(minifyCSS())
    .pipe(concat('awesome-select.min.css'))
    .pipe(gulp.dest("dist"));
});

gulp.task('default', ['buildjs','buildcss']);
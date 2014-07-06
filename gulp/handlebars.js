var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');
var handlebars   = require('gulp-handlebars');
var declare   = require('gulp-declare');
var defineModule   = require('gulp-define-module');
var concat   = require('gulp-concat');
var livereload   = require('gulp-livereload');

var buildPath = './templates/build/';

gulp.task('handlebarsBuild', function () {
  return gulp.src('./templates/*.hbs')
    .pipe(handlebars())
    .pipe(defineModule('plain', {
      wrapper: '<%= handlebars %>'
    }))
    .pipe(declare({
      namespace: 'templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('handlebars', ['handlebarsBuild'], function(){
  return gulp.src([buildPath + 'before.js', buildPath + 'templates.js', buildPath + 'after.js'])
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./scripts/'))
    .on('error', handleErrors);
});

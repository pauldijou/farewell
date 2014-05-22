var minifyCss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('out', function() {
  return gulp.src('./resources/app.css')
    .pipe(minifyCss())
    .pipe(rename(function (path) {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('./out/resources'))
    .pipe(gulp.src('./resources/app.js'))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('./out/resources'))
    .pipe(gulp.src(['./index.html', 'CNAME']))
    .pipe(gulp.dest('./out'))
    .on('error', handleErrors);
});
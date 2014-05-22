var minifyCss    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('minifyCss', function() {
  return gulp.src('./resources/app.css')
    .pipe(minifyCss())
    .pipe(rename(function (path) {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('./resources'))
    .on('error', handleErrors);
});
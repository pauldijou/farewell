var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');
var browserify   = require('gulp-browserify');
var livereload   = require('gulp-livereload');
// var source       = require('vinyl-source-stream');

gulp.task('browserify', function(){
  return gulp.src('./scripts/app.js')
    .pipe(browserify({
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./resources'))
    .on('error', handleErrors)
    .pipe(livereload());
});

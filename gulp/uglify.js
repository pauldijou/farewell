var uglify         = require('gulp-uglify');
var rename         = require('gulp-rename');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('uglify', function() {
  return gulp.src('./resources/app.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('./resources'))
    .on('error', handleErrors);
});
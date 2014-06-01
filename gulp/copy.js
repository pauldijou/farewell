var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('copy', function() {
  return gulp.src(['./bower_components/lightbox2/img/*.*'])
    .pipe(gulp.dest('./img'))
    .on('error', handleErrors);
});

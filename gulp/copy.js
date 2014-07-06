var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('copy:lightbox', function() {
  return gulp.src(['./node_modules/blueimp-gallery/img/*.*'])
    .pipe(gulp.dest('./img'))
    .on('error', handleErrors);
});

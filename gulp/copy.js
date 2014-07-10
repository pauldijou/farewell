var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('copy:lightbox', function() {
  return gulp.src(['./node_modules/blueimp-gallery/img/*.*'])
    .pipe(gulp.dest('./img'))
    .on('error', handleErrors);
});

gulp.task('copy:fontAwesome', function() {
  return gulp.src(['./bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest('./resources/fonts/font-awesome'))
    .on('error', handleErrors);
});

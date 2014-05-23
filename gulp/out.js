var clean        = require('gulp-clean');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('out', function() {
  return gulp.src(['./out/resources/*.*', './out/resources/fonts/*.*', './out/index.html', './out/CNAME'], {read: false})
    .pipe(clean())
    .pipe(gulp.src(['./CNAME']))
    .pipe(gulp.dest('./out'))
    .pipe(gulp.src(['./resources/fonts/*']))
    .pipe(gulp.dest('./out/resources/fonts'))
    .on('error', handleErrors);
});
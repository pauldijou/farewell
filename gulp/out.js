var clean        = require('gulp-clean');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('out:clean', function() {
  return gulp.src(['./out/img/*.*', './out/resources/*.*', './out/resources/fonts/*.*', './out/index.html', './out/CNAME'], {read: false})
    .pipe(clean())
    .on('error', handleErrors);
});

gulp.task('out:root', function() {
  return gulp.src(['./CNAME'])
    .pipe(gulp.dest('./out'))
    .on('error', handleErrors);
});

gulp.task('out:img', function() {
  return gulp.src(['./img/*'])
    .pipe(gulp.dest('./out/img'))
    .on('error', handleErrors);
});

gulp.task('out:fonts', function() {
  return gulp.src(['./resources/fonts/*'])
    .pipe(gulp.dest('./out/resources/fonts'))
    .on('error', handleErrors);
});

gulp.task('out', ['out:clean', 'out:root', 'out:img', 'out:fonts']);

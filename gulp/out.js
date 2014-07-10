var rimraf       = require('gulp-rimraf');
var ignore       = require('gulp-ignore');
var gulp         = require('gulp');
var handleErrors = require('./utils/handleErrors');

gulp.task('out:clean', function() {
  return gulp.src(['./out/img', './out/resources', './out/*.*', './out/CNAME'], {read: false})
    .pipe(ignore('./out/.git'))
    .pipe(rimraf())
    .on('error', handleErrors);
});

gulp.task('out:root', function() {
  return gulp.src(['./CNAME', './*.ico'])
    .pipe(gulp.dest('./out'))
    .on('error', handleErrors);
});

gulp.task('out:img', function() {
  return gulp.src(['./img/*'])
    .pipe(gulp.dest('./out/img'))
    .on('error', handleErrors);
});

gulp.task('out:fonts', function() {
  return gulp.src(['./resources/fonts/**/*'])
    .pipe(gulp.dest('./out/resources/fonts'))
    .on('error', handleErrors);
});

gulp.task('out', ['out:clean', 'out:root', 'out:img', 'out:fonts', 'build']);

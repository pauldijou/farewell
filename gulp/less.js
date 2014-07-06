var less         = require('gulp-less');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var path         = require('path');
var handleErrors = require('./utils/handleErrors');

gulp.task('less', function() {
  return gulp.src('./styles/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, '..', 'styles'), path.join(__dirname, '..', 'bower_components'), path.join(__dirname, '..', 'node_modules') ]
    }))
    .pipe(gulp.dest('./resources'))
    .on('error', handleErrors);
});

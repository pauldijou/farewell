var gulp         = require('gulp');
var shell        = require('gulp-shell');
var handleErrors = require('./utils/handleErrors');

gulp.task('deploy', function() {
  return gulp.src('', {read: false})
    .pipe(shell([
      'gulp build',
      'gulp out',
      'gulp usemin',
      'cd out && git add . -A',
      'cd out && git commit -m "Publish website"',
      'cd out && git push -f origin gh-pages'
    ]))
    .on('error', handleErrors);
});

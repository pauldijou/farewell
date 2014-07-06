var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
// var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var gulp  = require('gulp');

gulp.task('usemin', ['out'], function() {
  gulp.src('./*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      // html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('./out'));
});

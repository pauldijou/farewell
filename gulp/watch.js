var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function(){
  gulp.watch('./scripts/**', ['browserify']);
  gulp.watch('./styles/**', ['less']);
  gulp.watch(['./templates/*.hbs', './templates/build/*.js'], ['handlebars']);
  livereload();
});

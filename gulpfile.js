var fs    = require('fs');
var path  = require('path');
var gulp  = require('gulp');
var tasks = fs.readdirSync('./gulp/').filter(function(name) {
  return (/(\.js$)/i).test(path.extname(name));
});

tasks.forEach(function(task) {
  require('./gulp/' + task);
});

gulp.task('build', ['handlebars', 'browserify', 'less', 'copy:lightbox', 'copy:fontAwesome']);

gulp.task('default', ['build', 'watch', 'connect']);

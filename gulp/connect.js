var path    = require('path');
var connect = require('connect');
var gulp    = require("gulp");
var http    = require('http');
var config  = {
  port: '8080',
  root: path.resolve('./')
};

gulp.task('connect', function(){
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static(config.root));

  http.createServer(app).listen(config.port);
});

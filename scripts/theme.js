var config = require('./config'),
    theme = config('theme');

var is = function (name) {
  return theme.toLowerCase() === name;
}

module.exports = {
  isFullscreen: is('fullscreen'),
  isZigzag: is('zigzag')
};

var utils = require('./utils'),
    handlebarsHelpers = require('./handlebars-helpers'),
    templates = require('./templates'),
    keys = require('./keys'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    router = require('./router'),
    map = require('./map'),
    on = require('./on'),
    $ = utils.$;

map.load();

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
});

keys.bind('esc', function() { aside.hideCloser(); });
keys.bind('m', function() { map.toggle(); });
keys.bind('c', function() { aside.toggle('feedback'); });
keys.bind('b', function() { aside.toggle('right'); });
keys.bind('r', function() { aside.toggle('right'); });

router.
  addState('home', require('./states/home')).
  addState('maps', require('./states/maps')).
  init();

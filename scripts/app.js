var jQuery = require('jquery');
window.jQuery = jQuery;

var whatever = require('lightbox'),
    hammer = require('hammerjs'),
    utils = require('./utils'),
    lightbox = require('./lightbox'),
    handlebarsHelpers = require('./handlebars-helpers'),
    templates = require('./templates'),
    keys = require('./keys'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    router = require('./router'),
    map = require('./map'),
    on = require('./on');

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
});

hammer(window, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swiperight', function () {
  if (lightbox.isVisible()) {
    lightbox.previous();
  } else if (aside.isOpen('feedback')) {
    // aside.hide('feedback');
    router.search('feedback', null);
  } else if (aside.isOpen('right')) {
    // aside.hide('right');
    router.search('right', null);
  }
});

hammer(window, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swipeleft', function () {
  if (lightbox.isVisible()) {
    lightbox.next();
  } else if (aside.isOpen('right')) {
    // aside.show('feedback');
    router.search('feedback', 'in');
  } else {
    // aside.show('right');
    router.search('right', 'in');
  }
});

// keys.bind('esc', function() { if (!lightbox.isVisible()) aside.hideCloser(); });
// keys.bind('m', function() { map.toggle(); });
// keys.bind('c', function() { aside.toggle('feedback'); });
// keys.bind('b', function() { aside.toggle('right'); });
// keys.bind('r', function() { aside.toggle('right'); });

keys.bind('esc', function() { if (!lightbox.isVisible()) aside.hideCloserUri(); });
keys.bind('m', function() { aside.toggleUri('top'); });
keys.bind('c', function() { aside.toggleUri('feedback'); });
keys.bind('b', function() { aside.toggleUri('right'); });
keys.bind('r', function() { aside.toggleUri('right'); });

router.addState('global', require('./states/global')).init();

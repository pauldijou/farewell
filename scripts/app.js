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
    on = require('./on'),
    footer = require('./footer'),
    footer = require('./nyan');

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
});

hammer(window, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swiperight', function () {
  if (lightbox.isVisible()) {
    lightbox.previous();
  } else if (aside.isOpen('feedback')) {
    router.search('feedback', null);
  } else if (aside.isOpen('right')) {
    router.search('right', null);
  }
});

hammer(window, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swipeleft', function () {
  if (lightbox.isVisible()) {
    lightbox.next();
  } else if (aside.isOpen('right')) {
    router.search('feedback', 'in');
  } else {
    router.search('right', 'in');
  }
});

jQuery('body').on('lightboxstart', function () {
  router.search('lightbox', 'in');
});

jQuery('body').on('lightboxend', function () {
  router.search('lightbox', null);
});

keys.bind('esc', function() { if (!lightbox.isVisible()) aside.hideCloserUri(); });
keys.bind('m', function() { lightbox.hide(); aside.toggleUri('top'); });
keys.bind('b', function() { lightbox.hide(); aside.hideCloserUri(); });
keys.bind('r', function() { lightbox.hide(); aside.hideCloserUri(); });
keys.bind('c', function() {
  if (aside.isOpen('right')) {
    lightbox.hide();
    aside.toggleUri('feedback'); }
  }
);

router.addState('global', require('./states/global')).init();

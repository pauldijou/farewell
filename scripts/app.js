var jQuery = require('jquery');
window.jQuery = jQuery;

var hammer = require('hammerjs'),
    utils = require('./utils'),
    lightbox = require('./lightbox'),
    handlebarsHelpers = require('./handlebars-helpers'),
    templates = require('./templates'),
    keys = require('./keys'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    router = require('./router'),
    on = require('./on'),
    footer = require('./footer'),
    nyan = require('./nyan'),
    body = utils.$('body');

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
});

hammer(body, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swiperight', function () {
  if (lightbox.isVisible()) {
    // lightbox.previous();
  } else if (aside.isOpen('feedback')) {
    aside.hideUri('feedback');
  } else if (aside.isOpen('right')) {
    aside.hideUri('right');
  }
});

hammer(body, {dragLockToAxis: true, dragBlockHorizontal: true}).on('swipeleft', function () {
  if (lightbox.isVisible()) {
    // lightbox.next();
  } else if (aside.isOpen('right')) {
    aside.showUri('feedback');
  }
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

var whatever = require('lightbox'),
    _ = require('lodash'),
    Hammer = require('hammerjs'),
    router = require('./router'),
    ga = require('./ga'),
    utils = require('./utils'),
    $$ = utils.$$,
    responsive = require('./responsive');

function init(carousel) {
  if (carousel && carousel.name) {
    var container = document.getElementById('carousel-' + carousel.name);
    var device = responsive.device();
    var links = [];

    _.forEach(carousel.images, function (image) {
      var view = image[device] || image.main;
      links.push({
        href: view.url,
        title: image.caption || ''
      });
    });

    var carousel = blueimp.Gallery(links, {
      container: container,
      carousel: true,
      continuous: true,
      startSlideshow: false
    });

    var hamContainer = new Hammer(container, {});

    var swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL
    });

    var tap = new Hammer.Tap({});
    tap.requireFailure(swipe);

    hamContainer.add([tap, swipe]);

    hamContainer.on('tap', function (e) {
      var source = e.target || e.srcElement;
      if (source && (source.nodeName || '').toLowerCase() === 'img') {
        blueimp.Gallery(links, {
          index: carousel.getIndex(),
          event: event,
          onopen: function () {
            router.search('lightbox', 'in');
            ga.send.event.lightbox.opened();
          },
          onclosed: function () {
            gallery = undefined;
            ga.send.event.lightbox.closed();
            router.search('lightbox', null);
          }
        });
      }
    });
  }
}

module.exports = {
  init: init
};

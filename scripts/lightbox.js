var whatever = require('lightbox'),
    router = require('./router'),
    utils = require('./utils'),
    ga = require('./ga'),
    $ = utils.$,
    $$ = utils.$$,
    gallery;

$('body').addEventListener('click', function (event) {
  var link = utils.closest(event.target || event.srcElement, 'a');
  var galleryName = link && link.getAttribute('data-lightbox');

  if (galleryName) {
    var links = $$('[data-lightbox=' + galleryName + ']');
    gallery = blueimp.Gallery(links, {
      index: link,
      event: event,
      emulateTouchEvents: false,
      urlProperty: 'lightbox-src',
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

var isVisible = function () {
  return !!gallery;
};

var hide = function () {
  gallery && gallery.close();
};

var next = function () {
  gallery && gallery.next();
};

var previous = function () {
  gallery && gallery.prev();
};

module.exports = {
  isVisible: isVisible,
  hide: hide,
  next: next,
  previous: previous
};

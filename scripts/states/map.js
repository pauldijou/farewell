var q = require('q'),
    hammer = require('hammerjs'),
    _ = require('lodash'),
    State = require('abyssa').State,
    router = require('../router'),
    aside = require('../aside'),
    api = require('../api'),
    utils = require('../utils'),
    disqus = require('../disqus'),
    on = require('../on'),
    $ = utils.$,
    $$ = utils.$$,
    tooltip = require('../tooltip'),
    templates = require('../templates'),
    Place = require('../models/place'),
    Map = require('../models/map');

var state,
    elements = {},
    places = [],
    maps = [],
    map;

var getImageSize = function () {
  var dims = aside.elements.top.getBoundingClientRect();
  var ratio = dims.width / dims.height;

  var image = {
    ratio: map.image.ratio,
    top: 0,
    left: 0,
    width: dims.width,
    height: dims.height
  };

  if (image.ratio > ratio) {
    // Top blank
    image.height = dims.width / image.ratio;
    image.top = (dims.height - image.height) / 2;
  } else {
    // Left blank
    image.width = dims.height * image.ratio;
    image.left = (dims.width - image.width) / 2;
  }

  return image;
};

var setPlacePosition = function () {
  var image = getImageSize();

  _.forEach(places, function (place) {
    var percents = map.getPosition(place.latitude, place.longitude);

    place.position = {
      top: image.top + (percents.top * image.height) - 10,
      left: image.left + (percents.left * image.width) - 10
    };
  });
};

var updatePlaces = function () {
  setPlacePosition();

  _.forEach(places, function (place) {
    var li = $('[data-place-id='+ place.reference.id +']', elements.places);
    utils.setStyle(li, 'transform', 'translate3d('+place.position.left+'px, '+place.position.top+'px, 0)');
  });
};

on.resized.add(_.throttle(updatePlaces, 100));

var load = function (mapsIn, placesIn) {
  maps = mapsIn;
  places = placesIn;

  map = maps[_.random(maps.length - 1)];

  setPlacePosition();

  aside.elements.top.innerHTML = templates.map({
    map: map,
    places: places
  });

  elements.map = $('.map', aside.elements.top);
  elements.places = $('.map .places', aside.elements.top);
  elements.arrow = $('.map-arrow', aside.elements.top);

  tooltip.load(aside.elements.top);

  hammer(elements.arrow).on('tap', function() {
    aside.toggleUri('top');
  });

  hammer(elements.map).on('tap', function(e) {
    var target = e.target || e.srcElement;
    var li = utils.closest(target, 'li');
    if (li.getAttribute('data-place-id')) {
      router.state('global.map.place.root', {id: li.getAttribute('data-place-id')});
    }
  });

  setTimeout(function () {
    aside.elements.top.classList.add('loaded');
    loaded = true;
  }, 500);
};

module.exports = State('map', {
  enter: function (params) {
    state = this;
    aside.show('top');
  },
  exit: function () {
    aside.hide('top');
  },
  root: require('./empty')(),
  place: require('./place')
});

module.exports._load = load;

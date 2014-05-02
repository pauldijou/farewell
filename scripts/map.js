var q = require('q'),
    _ = require('lodash'),
    router = require('./router'),
    aside = require('./aside'),
    api = require('./api'),
    utils = require('./utils'),
    disqus = require('./disqus'),
    on = require('./on'),
    $ = utils.$,
    $$ = utils.$$,
    templates = require('./templates'),
    Place = require('./models/place'),
    Map = require('./models/map');

var elements = {},
    loaded = false,
    firstShow = true,
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
      top: image.top + (percents.top * image.height) - 5,
      left: image.left + (percents.left * image.width) - 5
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

var showPlaces = function () {

};

var showPlaceDetail = function (id) {
  var place = _.find(places, function (p) { return p.reference.id === id; });

  if (place) {
    aside.show('right', templates.place(place));
    disqus.reloadReference(place.reference);
  }
};

var show = function () {
  aside.hideOthers('top');
  aside.show('top');

  if (firstShow) {
    firstShow = !firstShow;
    showPlaces();
  }
};

var hide = function () {
  aside.hide('top');
};

var toggle = function () {
  if (aside.isOpen('top')) {
    hide();
  } else {
    show();
  }
};

var load = function () {
  q.all([api.maps(), api.places()]).spread(function (mapsDoc, placesDoc) {
    maps = _.map(mapsDoc.results, Map.fromDoc);
    places = _.map(placesDoc.results, Place.fromDoc);

    map = maps[_.random(maps.length - 1)];

    setPlacePosition();

    aside.elements.top.innerHTML = templates.map({
      map: map,
      places: places
    });

    elements.map = $('.map', aside.elements.top);
    elements.places = $('.map .places', aside.elements.top);
    elements.arrow = $('.map-arrow', aside.elements.top);

    elements.arrow.addEventListener('click', function() {
      toggle();
    });

    _.forEach($$('[data-place-id]', elements.places), function (place) {
      place.addEventListener('click', function(event) {
        showPlaceDetail(event.target.getAttribute('data-place-id'));
      });
    });

    setTimeout(function () {
      aside.elements.top.classList.add('loaded');
      loaded = true;
    }, 500);
  }).done();
};

module.exports = {
  elements: elements,
  load: load,
  isLoaded: function () { return loaded; },
  show: show,
  hide: hide,
  toggle: toggle,
  places: {
    all: function () { return places; },
    byId : function (id) { return _.find(places, {reference: {id: id}}); }
  },
  maps: {
    all: function () { return maps; },
    byId : function (id) { return _.find(maps, {reference: {id: id}}); }
  }
};

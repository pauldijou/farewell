var q = require('q'),
    _ = require('lodash'),
    aside = require('./aside'),
    api = require('./api'),
    utils = require('./utils'),
    $ = utils.$,
    templates = require('./templates'),
    Map = require('./models/map');

var loaded = false;

var show = function () {
  aside.show('top');
};

var hide = function () {
  aside.hide('top');
};

var toggle = function () {
  aside.toggle('top');
};

var load = function () {
  q.all([api.maps(), api.places()]).spread(function (maps, places) {
    var map = Map.fromDoc(maps.results[_.random(maps.results.length - 1)]);

    aside.elements.top.innerHTML = templates.map(map);

    $('.map-arrow', aside.elements.top).addEventListener('click', function() {
      toggle();
    });

    setTimeout(function () {
      aside.elements.top.classList.add('loaded');
      loaded = true;
    }, 500);
  }).done();
};

module.exports = {
  load: load,
  isLoaded: function () { return loaded; },
  show: show,
  hide: hide,
  toggle: toggle
};

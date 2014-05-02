var _ = require('lodash'),
    State = require('abyssa').State,
    Map = require('../models/map'),
    templates = require('../templates'),
    api = require('../api'),
    $ = require('../utils').$;
    preventDefault = require('../utils').preventDefault;

var image,
    currentMap,
    currentBar,
    dimensions,
    coordinates = _.clone(Map.coordinates.all());

var getCoordinate = function (name) {
  return _.find(coordinates, function (c) {
    return c.name === name;
  });
};

var move = function (name, value) {
  currentMap.getCoordinate(name).percent = value;

  var item = getCoordinate(name);
  item.input.value = value;
  item.bar.style[item.isLatitude ? 'top' : 'left'] = (value * dimensions[item.isLatitude ? 'height' : 'width']) + 'px';
};

var selectMap = function (map) {
  currentMap = map;

  dimensions = $('.current-map .map').getBoundingClientRect();

  if (!dimensions.width || !dimensions.height) {
    setTimeout(function () {
      selectMap(map);
    }, 100);

    return;
  }

  _.forEach(currentMap.coordinates, function (value) {
    if (value.withInput) move(value.name, value.percent);
  });
};

module.exports = State('/maps', {
  enter: function () {
    api.maps().done(function (docs) {
      var maps = _.map(docs.results, Map.fromDoc);

      document.getElementById('content').innerHTML = templates['maps']({
        maps: maps,
        current: maps[0],
        coordinates: coordinates
      });

      var image = $('.current-map .map');

      document.addEventListener('mouseup', function () {
        currentBar = undefined;
      });

      image.addEventListener('mousemove', function (event) {
        if (currentBar) {
          var name = currentBar.getAttribute('data-name');
          var item = getCoordinate(name);
          var value = event['offset' + (item.isLatitude ? 'Y': 'X')] / dimensions[item.isLatitude ? 'height' : 'width'];
          move(name, value);
        }
      });

      _.forEach(coordinates, function (value) {
        var item = getCoordinate(value.name);

        if (item.withInput !== false) {
          item.bar = $('.current-map .' + value.type + '-' + value.name);
          item.input = $('.current-values .value-' + value.name);

          item.bar.addEventListener('mousedown', function (event) {
            currentBar = event.target;
            preventDefault(event);
          });
        }
      });

      selectMap(maps[0]);
    });
  }
});

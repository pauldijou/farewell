var _ = require('lodash'),
    State = require('abyssa').State,
    templates = require('../templates'),
    api = require('../api'),
    $ = require('../utils').$;
    preventDefault = require('../utils').preventDefault;

var image,
    currentMap,
    currentBar,
    dimensions,
    data = {
      equator: {
        defaultValue: 0.5,
        type: 'latitude',
        isLatitude: true,
        isLongitude: false
      },
      greenland: {
        defaultValue: 0.1,
        type: 'latitude',
        isLatitude: true,
        isLongitude: false
      },
      chili: {
        defaultValue: 0.9,
        type: 'latitude',
        isLatitude: true,
        isLongitude: false
      },
      greenwich: {
        defaultValue: 0.5,
        type: 'longitude',
        isLatitude: false,
        isLongitude: true
      },
      alaska: {
        defaultValue: 0.1,
        type: 'longitude',
        isLatitude: false,
        isLongitude: true
      },
      siberia: {
        defaultValue: 0.9,
        type: 'longitude',
        isLatitude: false,
        isLongitude: true
      }
    };

var move = function (name, value) {
  currentMap.data[name] = value;

  var item = data[name];
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

  _.forEach(currentMap.data, function (value, key) {
    move(key, value);
  });
};

module.exports = State('/maps', {
  enter: function () {
    console.log('enter maps', templates);
    api.maps().done(function (docs) {
      console.log(docs);

      var maps = _.map(docs.results, function (doc) {
        console.log(doc);
        var result = {
          id: doc.id,
          name: doc.fragments['map.name'].value,
          href: doc.href,
          image: doc.fragments['map.map'].value.main.url,
          width: doc.fragments['map.map'].value.main.dimensions.width,
          height: doc.fragments['map.map'].value.main.dimensions.height,
          data: {}
        };

        _.forEach(data, function (item, name) {
          result.data[name] = (doc.fragments['map.'+name] && doc.fragments['map.'+name].value) || item.defaultValue;
        });

        console.log(result);

        return result;
      });

      document.getElementById('content').innerHTML = templates['maps']({
        maps: maps,
        current: maps[0]
      });

      var image = $('.current-map .map');

      document.addEventListener('mouseup', function () {
        console.log('mouseup');
        currentBar = undefined;
      });

      image.addEventListener('mousemove', function (event) {
        if (currentBar) {
          var name = currentBar.getAttribute('data-name');
          var item = data[name];
          var value = event['offset' + (item.isLatitude ? 'Y': 'X')] / dimensions[item.isLatitude ? 'height' : 'width'];
          move(name, value);
        }
      });

      _.forEach(data, function (value, key) {
        data[key].bar = $('.current-map .' + value.type + '-' + key);
        data[key].input = $('.current-values .value-' + key);

        data[key].bar.addEventListener('mousedown', function (event) {
          currentBar = event.target;
          preventDefault(event);
        });
      });

      selectMap(maps[0]);
    });
  }
});

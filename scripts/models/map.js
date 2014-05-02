var _ = require('lodash'),
    reference = require('./reference');

var coordinates = [
  {
    name: 'greenland',
    defaultPercent: 0.1,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: 83.572
  },
  {
    name: 'northEngland',
    defaultPercent: 0.3,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: 58.6
  },
  {
    name: 'gibraltar',
    defaultPercent: 0.4,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: 36
  },
  {
    name: 'equator',
    defaultPercent: 0.5,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: 0
  },
  {
    name: 'southMadagascar',
    defaultPercent: 0.7,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: -26
  },
  {
    name: 'chili',
    defaultPercent: 0.9,
    type: 'latitude',
    isLatitude: true,
    isLongitude: false,
    withInput: true,
    value: -56
  },
  {
    name: 'alaska',
    defaultPercent: 0.1,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: -168
  },
  {
    name: 'florida',
    defaultPercent: 0.3,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: -80
  },
  {
    name: 'greenwich',
    defaultPercent: 0.5,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: 0
  },
  {
    name: 'eastArabia',
    defaultPercent: 0.6,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: 56
  },
  {
    name: 'korea',
    defaultPercent: 0.8,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: 127
  },
  {
    name: 'plus180',
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: false,
    value: 180
  },
  {
    name: 'minus180',
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: false,
    value: -180
  },
  {
    name: 'siberia',
    defaultPercent: 0.9,
    type: 'longitude',
    isLatitude: false,
    isLongitude: true,
    withInput: true,
    value: -170
  }
];

var getCoordinate = function (name, array) {
  return _.find(array || coordinates, function (c) {
    return c.name === name;
  });
};

function Map (reference, name, bgColor, image, docCoordinates) {
  this.reference = reference;
  this.name = name;
  this.bgColor = bgColor;
  this.image = image;
  this.coordinates = docCoordinates;

  this.getCoordinate = function (name) {
    return getCoordinate(name, this.coordinates);
  };

  this.getLongitude180 = function () {
    var left = this.getCoordinate('korea');
    var right = this.getCoordinate('siberia');
    return left.percent + (180 - left.value) * (right.percent - left.percent) / (2 * 180 + right.value - left.value);
  };

  this.getCoordinate('plus180').percent = this.getLongitude180();
  this.getCoordinate('minus180').percent = this.getLongitude180();

  this.getPosition = function (latitude, longitude) {
    var corner = {};

    for(var i = 0, le = coordinates.length; i < le-1; ++i) {
      var current = coordinates[i];
      var next = coordinates[i+1];

      if (current.isLongitude && next.isLongitude) {
        if (current.value <= longitude && longitude <= next.value) {
          corner.left = current;
          corner.right = next;
        }
      }

      if (current.isLatitude && next.isLatitude) {
        if (current.value >= latitude && latitude >= next.value) {
          corner.top = current;
          corner.bottom = next;
        }
      }
    }

    if (!corner.top || !corner.bottom || !corner.left || !corner.right) {
      console.error('Out of bounds', latitude, longitude, corner);
    }

    // console.log(corner.top.percent);
    // console.log(corner.bottom.percent - corner.top.percent);
    // console.log(corner.top.value - latitude);
    // console.log(corner.top.value - corner.bottom.value);
    // console.log((corner.top.value - latitude) / (corner.top.value - corner.bottom.value));
    // console.log((corner.bottom.percent - corner.top.percent) * (corner.top.value - latitude) / (corner.top.value - corner.bottom.value));
    // console.log(corner.top.percent + (corner.bottom.percent - corner.top.percent) * (corner.top.value - latitude) / (corner.top.value - corner.bottom.value));

    return {
      top: corner.top.percent + (corner.bottom.percent - corner.top.percent) * (corner.top.value - latitude) / (corner.top.value - corner.bottom.value),
      left: corner.left.percent + (corner.right.percent - corner.left.percent) * (longitude - corner.left.value) / (corner.right.value - corner.left.value)
    };
  };
}

var fromDoc = function (doc) {
  var image = doc.getImage('map.map').main;
  image.ratio = image.width / image.height;

  var mapCoordinates = _.clone(coordinates);

  _.forEach(doc.getGroup('map.coordinates').value, function (c) {
    var coordinate = getCoordinate(c.name.value, mapCoordinates);
    if (coordinate && coordinate.withInput) {
      coordinate.percent = c.percent.value || coordinate.defaultPercent;
    }
  });

  return new Map(
    reference.fromDoc(doc),
    doc.getText('map.name'),
    doc.getText('map.color') || '#000000',
    image,
    mapCoordinates
  );
};

module.exports = {
  coordinates: {
    all: function () { return coordinates; },
    byName: getCoordinate
  },
  fromDoc: fromDoc
};

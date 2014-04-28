var reference = require('./reference');

var coordinates = {
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

function Map (reference, name, bgColor, image, coordinates) {
  this.reference = reference;
  this.name = name;
  this.bgColor = bgColor;
  this.image = image;
  this.coordinates = coordinates;
}

var fromDoc = function (doc) {
  return new Map(
    reference.fromDoc(doc),
    doc.getText('map.name'),
    doc.getText('map.color') || '#000000',
    doc.getImage('map.map').main,
    {
      alaska: doc.getNumber('map.alaska'),
      chili: doc.getNumber('map.chili'),
      equator: doc.getNumber('map.equator'),
      greenland: doc.getNumber('map.greenland'),
      greenwich: doc.getNumber('map.greenwich'),
      siberia: doc.getNumber('map.siberia')
    }
  );
};

module.exports = {
  coordinates: coordinates,
  fromDoc: fromDoc
};

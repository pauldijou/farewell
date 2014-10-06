var reference = require('./reference'),
    responsive = require('../responsive'),
    prismic = require('../prismic');

function Place (reference, name, illustration, latitude, longitude, dates, content) {
  this.reference = reference;
  this.title = name;
  this.illustration = responsive.mapImage(illustration)[responsive.device()] || illustration.main;
  this.latitude = latitude;
  this.longitude = longitude;
  this.dates = dates;
  this.content = content && prismic.asHtml(content, {}, {
    lightbox: reference.type + '-' + reference.id
  });
}

var fromDoc = function (doc) {
  return new Place(
    reference.fromDoc(doc),
    doc.get('place.name') && doc.get('place.name').asHtml(),
    doc.getImage('place.illustration'),
    doc.getNumber('place.latitude'),
    doc.getNumber('place.longitude'),
    [],
    doc.get('place.content')
  );
};

module.exports = {
  fromDoc: fromDoc
};

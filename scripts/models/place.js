var reference = require('./reference');

function Place (reference, name, latitude, longitude, descriptions, dates, content) {
  this.reference = reference;
  this.name = name;
  this.latitude = latitude;
  this.longitude = longitude;
  this.descriptions = descriptions;
  this.dates = dates;
  this.content = content;
}

var fromDoc = function (doc) {
  return new Place(
    reference.fromDoc(doc),
    doc.get('place.name') && doc.get('place.name').asHtml(),
    doc.getNumber('place.latitude'),
    doc.getNumber('place.longitude'),
    {
      short: doc.get('place.shortdescription') && doc.get('place.shortdescription').asHtml(),
      long: doc.get('place.longdescription') && doc.get('place.longdescription').asHtml()
    },
    [],
    doc.get('place.content') && doc.get('place.content').asHtml()
  );
};

module.exports = {
  fromDoc: fromDoc
};

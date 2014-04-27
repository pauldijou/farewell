var reference = require('./reference');

function Author (reference) {
  this.reference = reference;
}

var fromDoc = function (doc) {
  new Author(reference.fromDoc(doc));
};

module.exports = {
  fromDoc: fromDoc
};

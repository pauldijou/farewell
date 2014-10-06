var reference = require('./reference');

function Author (reference, firstName, lastName, fullName) {
  this.reference = reference;
  this.name = {
    first: firstName,
    last: lastName,
    full: fullName
  };
}

var fromDoc = function (doc) {
  return new Author(
    reference.fromDoc(doc),
    doc.getText('author.first_name'),
    doc.getText('author.last_name'),
    doc.getText('author.full_name')
  );
};

module.exports = {
  fromDoc: fromDoc
};

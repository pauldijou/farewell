var color = require('color'),
    reference = require('./reference');

function Article (reference, title, date, author, illustration, colors, descriptions, content) {
  this.reference = reference;
  this.title = title;
  this.date = date;
  this.author = author;
  this.illustration = illustration;
  this.colors = colors;
  this.descriptions = descriptions;
  this.content = content;
}

var fromDoc = function (doc) {
  var colors;

  if (doc.get('article.color').value) {
    var docColor = color(doc.get('article.color') && doc.get('article.color').value || '#ffffff');
    var docBgColor = color(doc.get('article.bgColor') && doc.get('article.color').value || '#aeaeae');

    colors = {
      primary: docColor.hexString(),
      lighten: docColor.lighten(0.2).hexString(),
      darken: docColor.darken(0.2).hexString(),
      bgPrimary: docColor.hexString(),
      bgLighten: docColor.lighten(0.2).hexString(),
      bgDarken: docColor.darken(0.2).hexString()
    };
  }

  return new Article(
    reference.fromDoc(doc),
    doc.get('article.title') && doc.get('article.title').asHtml(),
    doc.getDate('article.date'),
    doc.get('article.author'),
    doc.getImage('article.illustration'),
    colors,
    {
      short: doc.get('article.shortdescription') && doc.get('article.shortdescription').asHtml(),
      long: doc.get('article.longdescription') && doc.get('article.longdescription').asHtml()
    },
    doc.get('article.content') && doc.get('article.content').asHtml()
  );
};

module.exports = {
  fromDoc: fromDoc
};

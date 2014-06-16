var reference = require('./reference'),
    theme = require('../theme'),
    config = require('../config'),
    prismic = require('../prismic');

var is = {
  image: {
    template: {
      full: function (image) { return image.template && image.template.toLowerCase() === 'full'; },
      partial: function (image) { return image.template && image.template.toLowerCase() === 'partial'; },
      thumbnail: function (image) { return image.template && image.template.toLowerCase() === 'thumbnail'; }
    },
    position: {
      top: function (image) { return image.position && image.position.toLowerCase() === 'top'; },
      bottom: function (image) { return image.position && image.position.toLowerCase() === 'bottom'; },
      left: function (image) { return image.position && image.position.toLowerCase() === 'left'; },
      right: function (image) { return image.position && image.position.toLowerCase() === 'right'; }
    }
  }
}

function Article (reference, title, date, author, illustration, color, image, text, descriptions, content) {
  this.reference = reference;
  this.title = title;
  this.date = date;
  this.author = author;
  this.illustration = illustration;
  this.color = color && color.split(' (')[0].toLowerCase();
  this.image = image;
  this.text = text;
  this.descriptions = descriptions;
  this.isNew = config.isNew(date.getTime());
  this.content = content && prismic.asHtml(content, {}, {
    lightbox: reference.type + '-' + reference.id
  });

  this.classes = '';
  this.style = '';
  this.illustrationStyle = '';
  this.summaryStyle = '';

  if (color) {
    this.classes += 'color-' + this.color + ' ';
  }

  if (image.template) {
    this.classes += 'image-template-' + image.template.toLowerCase() + ' ';
  }

  if (image.position) {
    this.classes += 'image-position-' + image.position.toLowerCase() + ' ';
  }

  if (text.position) {
    this.classes += 'text-position-' + text.position.toLowerCase() + ' ';
  }

  if (is.image.template.full(image)) {
    if (theme.isFullscreen) {
      this.style += 'background-image:url('+ illustration.main.url +');';
    }
  } else if (is.image.template.partial(image)) {
    this.illustrationStyle += 'background-image:url('+ illustration.main.url +');';

    if (is.image.position.top(image) || is.image.position.bottom(image)) {
      this.illustrationStyle += 'flex-grow:'+ image.size +';';
      this.summaryStyle += 'flex-grow:'+ text.size +';';
    } else {
      this.illustrationStyle += 'flex-grow:'+ image.size +';';
      this.summaryStyle += 'flex-grow:'+ text.size +';';
    }
  } else if (is.image.template.thumbnail(image)) {
    this.illustrationStyle += 'background-image:url('+ illustration.main.url +');';
  }
}

var fromDoc = function (doc) {
  var toto = new Article(
    reference.fromDoc(doc),
    doc.get('article.title') && doc.get('article.title').asHtml(),
    doc.getDate('article.date'),
    doc.get('article.author'),
    doc.getImage('article.illustration'),
    doc.getText('article.color'),
    {
      template: 'partial', //doc.getText('article.imageTemplate'),
      size: 3, //doc.getNumber('article.imageSize'),
      position: 'bottom' //doc.getText('article.imagePosition')
    },
    {
      position: doc.getText('article.textPosition'),
      size: 1 //doc.getNumber('article.textSize')
    },
    {
      short: doc.get('article.shortdescription') && doc.get('article.shortdescription').asHtml(),
      long: doc.get('article.longdescription') && doc.get('article.longdescription').asHtml()
    },
    doc.get('article.content')
  );
  // console.log(toto);
  return toto;
};

module.exports = {
  fromDoc: fromDoc
};

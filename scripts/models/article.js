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

function Article (reference, title, date, author, illustration, color, image, text, description, content) {
  this.reference = reference;
  this.title = title;
  this.date = date;
  this.author = author;
  this.illustration = illustration;
  this.color = color && color.split(' (')[0].toLowerCase();
  this.image = image;
  this.text = text;
  this.description = description;
  this.isNew = date && config.isNew(date.getTime()) || false;
  this.content = content && prismic.asHtml(content, {}, {
    lightbox: reference.type + '-' + reference.id
  });

  var style = '';
  this.classes = '';
  this.attributes = '';
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
      style += 'background-image:url('+ illustration.main.url +');';
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

  if (style) {
    this.attributes += ' style="' + style + '"';
  }
}

var fromDoc = function (doc) {
  return new Article(
    reference.fromDoc(doc),
    doc.get('article.title') && doc.get('article.title').asHtml(),
    doc.getDate('article.date'),
    doc.get('article.author'),
    doc.getImage('article.illustration'),
    doc.getText('article.color'),
    {
      template: doc.getText('article.imageTemplate') || 'full',
      size: doc.getNumber('article.imageSize') || 1,
      position: doc.getText('article.imagePosition') || 'left'
    },
    {
      position: doc.getText('article.textPosition') || 'right',
      size: doc.getNumber('article.textSize') || 1
    },
    doc.get('article.description') && doc.get('article.description').asHtml(),
    doc.get('article.content')
  );
};

module.exports = {
  fromDoc: fromDoc
};

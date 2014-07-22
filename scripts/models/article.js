var _ = require('lodash'),
    reference = require('./reference'),
    theme = require('../theme'),
    config = require('../config'),
    responsive = require('../responsive'),
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

var mapImage = function mapImage(i) {
  if (i.image) {
    return {
      name: i.name && i.name.value,
      caption: i.caption.value,
      main: i.image.main,
      desktop: i.image.main,
      tablet: i.image.views.tablet,
      mobile: i.image.views.mobile
    };
  } else {
    return {
      main: i.main,
      desktop: i.main,
      tablet: i.views.tablet,
      mobile: i.views.mobile
    };
  }
};

function Article (reference, title, date, author, illustration, color, image, text, description, content, images, carousels) {
  this.reference = reference;
  this.title = title;
  this.date = date;
  this.author = author;
  this.illustration = mapImage(illustration)[responsive.device()] || illustration.main;
  this.color = color && color.split(' (')[0].toLowerCase();
  this.image = image;
  this.text = text;
  this.description = description;
  this.isNew = date && config.isNew(date.getTime()) || false;

  this.images = _.map(images, mapImage);

  console.log(carousels);
  this.carousels = _.map(carousels, function (c) {
    return {
      name: c.name,
      images: _.map(c.images, mapImage)
    }
  });
  console.log(this.carousels);

  this.content = content && prismic.asHtml(content, {}, {
    lightbox: reference.type + '-' + reference.id
  }, this);

  var style = '';
  this.classes = '';
  this.attributes = '';
  this.illustrationStyle = '';
  this.summaryStyle = '';

  if (color) {
    this.classes += 'article-color-' + this.color + ' ';
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
      style += 'background-image:url('+ this.illustration.url +');';
    }
  } else if (is.image.template.partial(image)) {
    this.illustrationStyle += 'background-image:url('+ this.illustration.url +');';

    if (is.image.position.top(image) || is.image.position.bottom(image)) {
      this.illustrationStyle += 'flex-grow:'+ image.size +';';
      this.summaryStyle += 'flex-grow:'+ text.size +';';
    } else {
      this.illustrationStyle += 'flex-grow:'+ image.size +';';
      this.summaryStyle += 'flex-grow:'+ text.size +';';
    }
  } else if (is.image.template.thumbnail(image)) {
    this.illustrationStyle += 'background-image:url('+ this.illustration.url +');';
  }

  if (style) {
    this.attributes += ' style="' + style + '"';
  }
}

var fromDoc = function (doc) {
  var carousels = [];

  for (var i = 1; i <= 3; ++i) {
    var carouselPrefix = 'article.carousel' + i;
    var name = doc.getText(carouselPrefix + 'Name');

    if (name) {
      carousels.push({
        name: name,
        images: (doc.getGroup(carouselPrefix + 'Images') && doc.getGroup(carouselPrefix + 'Images').toArray()) || []
      });
    }
  }

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
    doc.get('article.content'),
    (doc.getGroup('article.images') && doc.getGroup('article.images').toArray()) || [],
    carousels
  );
};

module.exports = {
  fromDoc: fromDoc
};

var Handlebars = require('handlebars'),
    lang = require('./lang');

var months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
];

Handlebars.registerHelper('i18n', function(key) {
  return new Handlebars.SafeString(lang.msg(key));
});

Handlebars.registerHelper('json', function(obj) {
  return JSON.stringify(obj);
});

Handlebars.registerHelper('escapedjson', function(obj) {
  return window.escape(JSON.stringify(obj));
});

Handlebars.registerHelper('date', function(date) {
  if (date) {
    return ', le ' + (date.getDay() === 1 ? '1er' : date.getDay()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  } else {
    return '';
  }
});

Handlebars.registerHelper('equals', function(val1, val2, options) {
  if (val1 === val2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifEmpty', function(collection, options) {
  if (!collection || !collection.length) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifNot', function(predicate, options) {
  if (!predicate) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

var Handlebars = require('handlebars'),
    lang = require('./lang');

Handlebars.registerHelper('i18n', function(key) {
  return new Handlebars.SafeString(lang.msg(key));
});

Handlebars.registerHelper('json', function(obj) {
  return JSON.stringify(obj);
});

Handlebars.registerHelper('escapedjson', function(obj) {
  return window.escape(JSON.stringify(obj));
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

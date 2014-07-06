var _ = require('lodash'),
    State = require('abyssa').State,
    aside = require('../aside'),
    disqus = require('../disqus'),
    utils = require('../utils');

module.exports = function () {
  return State('feedback', {
    enter: function () {
      aside.show('feedback');
    },
    exit: function () {
      aside.hide('feedback');
    }
  });
}

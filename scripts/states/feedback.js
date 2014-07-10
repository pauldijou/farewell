var _ = require('lodash'),
    State = require('abyssa').State,
    aside = require('../aside'),
    disqus = require('../disqus'),
    ga = require('../ga'),
    utils = require('../utils');

module.exports = function () {
  return State('feedback', {
    enter: function () {
      aside.show('feedback');
      ga.send.event.feedback.opened();
    },
    exit: function () {
      aside.hide('feedback');
      setTimeout(function () {
        ga.send.event.feedback.closed();
      });
    }
  });
}

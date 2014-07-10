var jquery = require('jquery'),
    _ = require('lodash'),
    whatever = require('tooltip');

var current;

var load = function load(context, options) {
  jquery(context).find('.tooltip').tooltipster(_.defaults(options || {}, {
    delay: 100,
    contentAsHTML: true,
    autoClose: true,
    functionBefore: function (origin, continueTooltip) {
      current = origin;
      continueTooltip();
    },
    functionAfter: function () {
      current = undefined;
    }
  }));
};

var hideAll = function hideAll() {
  current && current.tooltipster('hide');
};

module.exports = {
  load: load,
  hideAll: hideAll
};

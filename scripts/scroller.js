// var IScroll = require('iscroll'),
var  _ = require('lodash'),
    utils = require('./utils'),
    $ = utils.$,
    scrollers = {};

var defaultOptions = {
  bounce: false,
  mouseWheel: true,
  scrollbars: false
};
  
var create = function (name, elem, options) {
  if (utils.has('iscroll')) {
    destroyIfExists(name);
    scrollers[name] = new IScroll(elem, _.defaults(options || {}, defaultOptions));
  }
};

var refreshIfExists = function (name) {
  if (scrollers[name]) {
    setTimeout(function () {
      scrollers[name].refresh();
    }, 0);
  }
};

var destroyIfExists = function (name) {
  if (scrollers[name]) {
    scrollers[name].destroy();
    scrollers[name] = undefined;
  }
};

create('content', document.getElementById('content'));
// scrollers.asideright = new IScroll($('.iscroll-wrapper', document.getElementById('aside-right')), defaultOptions);

module.exports = {
  defaultOptions: defaultOptions,
  create: create,
  refresh: {
    content: function () { refreshIfExists('content'); },
    asideright: function () { refreshIfExists('asideright'); }
  },
  destroy: {
    asideright: function () { destroyIfExists('asideright'); }
  }
};

var _ = require('lodash'),
    utils = require('./utils'),
    $ = utils.$;

var body = $('body'),
    ordering = ['feedback', 'right', 'top'],
    elements = {
      right: document.getElementById('aside-right'),
      rightMask: document.getElementById('mask-right'),
      feedback: document.getElementById('aside-feedback'),
      feedbackMask: document.getElementById('mask-feedback'),
      top: document.getElementById('aside-top'),
      topMask: document.getElementById('mask-top'),
    },
    mapping = {
      'right': elements.right,
      'feedback': elements.feedback,
      'top': elements.top
    };

// var tShowMaskOpacity = zanimo.f('opacity', '0.5', 200);
// var tHideMaskOpacity = zanimo.f('opacity', '0', 200);
// var tShowAside = zanimo.f('transform', 'translate3d(0, 0, 0)', 200, 'ease-in');
// var tHideAside = zanimo.f('transform', 'translate3d(100%, 0, 0)', 200, 'ease-in');

// var showMask = function () {
//   mask.style.display = 'block';
//   return zanimo(mask).then(tShowMaskOpacity);
// };

// var hideMask = function () {
//   return zanimo(mask).then(tHideMaskOpacity).then(function () {
//     mask.style.display = 'none';
//   });
// };

// var showAside = function () {
//   return zanimo(aside).then(tShowAside);
// };

// var hideAside = function () {
//   return zanimo(aside).then(tHideAside);
// };

var className = function (position) {
  return 'aside-'+ position +'-open';
};

var isOpen = function (position) {
  return body.classList.contains(className(position));
};

var allHidden = function () {
  var result = true;

  _.forEach(ordering, function (position) {
    result = result && !isOpen(position);
  });

  return result;
};

var set = function (position, content) {
  mapping[position].innerHTML = content;
};

var show = function (position, content) {
  body.classList.add(className(position));

  if (content) {
    set(position, content);
  }
};

var hide = function (position) {
  body.classList.remove(className(position));
};

var toggle = function (position) {
  body.classList.toggle(className(position));
};

var hideTop = function () {
  var hidden = false;

  _.forEach(ordering, function (position) {
    if (!hidden && isOpen(position)) {
      hidden = true;
      hide(position);
    }
  });
};

var hideAll = function () {
  _.forEach(ordering, function (position) {
    if (isOpen(position)) {
      hide(position);
    }
  });
};

var hideOthers = function (position) {
  _.forEach(ordering, function (currentPosition) {
    if (position !== currentPosition && isOpen(currentPosition)) {
      hide(currentPosition);
    }
  });
};

module.exports = {
  elements: elements,
  set: set,
  isOpen: isOpen,
  allHidden: allHidden,
  show: show,
  hide: hide,
  toggle: toggle,
  hideTop: hideTop,
  hideAll: hideAll,
  hideOthers: hideOthers
};

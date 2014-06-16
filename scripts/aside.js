var _ = require('lodash'),
    hammer = require('hammerjs'),
    utils = require('./utils'),
    router = require('./router'),
    $ = utils.$;

var body = $('body'),
    ordering = ['feedback', 'right', 'top'],
    elements = {
      bottom: document.getElementById('aside-bottom'),
      topMask: document.getElementById('mask-top'),
      top: document.getElementById('aside-top'),
      rightMask: document.getElementById('mask-right'),
      right: document.getElementById('aside-right'),
      rightContent: $('.content', document.getElementById('aside-right')),
      feedbackMask: document.getElementById('mask-feedback'),
      feedback: document.getElementById('aside-feedback'),
      feedbackButtons: document.getElementById('aside-feedback-buttons')
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
  if (elements[position + 'Content']) {
    elements[position + 'Content'].innerHTML = content;
  } else if (elements[position]) {
    elements[position].innerHTML = content;
  }
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

var toggleUri = function (position) {
  if (isOpen(position)) {
    router.search(position, null);
  } else {
    router.search(position, 'in');
  }
};

var hideCloser = function () {
  var hidden = false;

  _.forEach(ordering, function (position) {
    if (!hidden && isOpen(position)) {
      hidden = true;
      hide(position);
    }
  });
};

var hideCloserUri = function () {
  var hidden = false;

  _.forEach(ordering, function (position) {
    if (!hidden && isOpen(position)) {
      hidden = true;
      router.search(position, null);
    }
  });
};

var hideAllUri = function () {
  _.forEach(ordering, function (position) {
    if (isOpen(position)) {
      router.search(position, null);
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

var hideOthersUri = function (position) {
  _.forEach(ordering, function (currentPosition) {
    if (position !== currentPosition && isOpen(currentPosition)) {
      router.search(currentPosition, null);
    }
  });
};

hammer(elements.rightMask).on('tap', function() {
  // hide('right');
  router.search('right', null);
});

hammer($('.btn-back', elements.feedbackButtons)).on('tap', function() {
  // hide('right');
  router.search('right', null);
});

hammer(elements.feedbackMask).on('tap', function() {
  // hide('feedback');
  router.search('feedback', null);
});

hammer($('.btn-feedback', elements.feedbackButtons)).on('tap', function() {
  // toggle('feedback');
  toggleUri('feedback');
});

hammer(elements.topMask).on('tap', function() {
  // hide('top');
  router.search('top', null);
});

hammer(elements.top, {preventDefault: true}).on('swipeup', function () {
  // hide('top');
  router.search('top', null);
});

module.exports = {
  elements: elements,
  set: set,
  isOpen: isOpen,
  allHidden: allHidden,
  show: show,
  hide: hide,
  toggle: toggle,
  toggleUri: toggleUri,
  hideCloser: hideCloser,
  hideCloserUri: hideCloserUri,
  hideAll: hideAll,
  hideAllUri: hideAllUri,
  hideOthers: hideOthers,
  hideOthersUri: hideOthersUri
};

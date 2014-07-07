var _ = require('lodash'),
    hammer = require('hammerjs'),
    jquery = require('jquery'),
    utils = require('./utils'),
    router = require('./router'),
    $ = utils.$;

var body = $('body'),
    ordering = ['feedback', 'right', 'top'],
    positionFromName = function (name, axis, withMask) {
      var position = {
        element: document.getElementById('aside-' + name),
        $element: jquery('#aside-' + name),
        animation: [{
          property: 'translate' + axis.toUpperCase(),
          from: '100%',
          to: 0
        }]
      }

      if (withMask) {
        position.mask = {
          element: document.getElementById('mask-' + name),
          $element: jquery('#mask-' + name)
        }
      }

      return position;
    },
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
    },
    positions = {},
    duration = 300;

positions.bottom = positionFromName('bottom', 'Y', false);
positions.top = positionFromName('top', 'Y', true);
positions.right = positionFromName('right', 'X', true);
positions.feedback = positionFromName('feedback', 'X', true);
positions.feedbackButtons = positionFromName('feedback-buttons', 'Y', false);

positions.bottom.animation[0].from = '500%';
positions.top.animation[0].from = '-100%';

positions.right.content = {
  element: $('.content', positions.right.element),
  $element: positions.right.$element.find('.content')
};

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
  position = positions[position];
  if (position && position.content && position.content.element) {
    position.content.element.innerHTML = content;
  } else if (position && position.element) {
    position.element.innerHTML = content;
  }
};

var show = function (position, content) {
  body.classList.add(className(position));

  if (content) {
    set(position, content);
  }

  // position = positions[position];
  // if (position) {
  //   var movements = {};
  //   _.forEach(position.animation || [], function (anim) {
  //     movements[anim.property] = anim.to;
  //   });
  //
  //   position.$element.velocity(movements, {duration: duration});
  //   position.mask && position.mask.$element.velocity({opacity: 0.5}, {display: 'block', duration: duration});
  // }
};

var showUri = function (position) {
  if (position === 'feedback') { router.siblingState('feedback'); }
  else if (position === 'top') {
    router.state('global.map.root');
  }
};

var hide = function (position) {
  body.classList.remove(className(position));
  // position = positions[position];
  // if (position) {
  //   var movements = {};
  //   _.forEach(position.animation || [], function (anim) {
  //     movements[anim.property] = anim.from;
  //   });
  //
  //   position.$element.velocity(movements, {duration: duration});
  //   position.mask && position.mask.$element.velocity({opacity: 0}, {display: 'none', duration: duration});
  // }
};

var hideUri = function (position) {
  if (position === 'feedback') {
    router.siblingState('root');
  } else if (position === 'right') {
    var currentState = router.currentState();
    if (currentState.state && currentState.state.parent && currentState.state.parent.parent) {
      router.backTo(currentState.state.parent.parent.fullName + '.root', currentState.params);
    }
  } else if (position === 'top') {
    router.state('global.root.root');
  }
};

var toggle = function (position) {
  body.classList.toggle(className(position));
};

var toggleUri = function (position) {
  if (isOpen(position)) {
    hideUri(position);
  } else {
    showUri(position);
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
      // router.search(position, null);
      hideUri(position);
    }
  });
};

var hideAllUri = function () {
  // _.forEach(ordering, function (position) {
  //   if (isOpen(position)) {
  //     router.search(position, null);
  //   }
  // });
  router.backTo('global.root.root');
};

// var hideAll = function () {
//   _.forEach(ordering, function (position) {
//     if (isOpen(position)) {
//       hide(position);
//     }
//   });
// };
//
// var hideOthers = function (position) {
//   _.forEach(ordering, function (currentPosition) {
//     if (position !== currentPosition && isOpen(currentPosition)) {
//       hide(currentPosition);
//     }
//   });
// };
//
// var hideOthersUri = function (position) {
//   _.forEach(ordering, function (currentPosition) {
//     if (position !== currentPosition && isOpen(currentPosition)) {
//       router.search(currentPosition, null);
//     }
//   });
// };

hammer(elements.rightMask, utils.hammerOptions()).on('tap', function() {
  hideUri('right');
});

hammer($('.btn-back', elements.feedbackButtons), utils.hammerOptions()).on('tap', function() {
  hideCloserUri();
});

hammer(elements.feedbackMask, utils.hammerOptions()).on('tap', function() {
  hideUri('feedback');
});

hammer($('.btn-feedback', elements.feedbackButtons), utils.hammerOptions()).on('tap', function() {
  toggleUri('feedback');
});

hammer(elements.topMask, utils.hammerOptions()).on('tap', function() {
  hideUri('top');
});

hammer(elements.top, utils.hammerOptions({preventDefault: true})).on('swipeup', function () {
  hideUri('top');
});

module.exports = {
  elements: elements,
  set: set,
  isOpen: isOpen,
  allHidden: allHidden,
  show: show,
  showUri: showUri,
  hide: hide,
  hideUri: hideUri,
  toggle: toggle,
  toggleUri: toggleUri,
  hideCloser: hideCloser,
  hideCloserUri: hideCloserUri
  // hideAll: hideAll,
  // hideAllUri: hideAllUri,
  // hideOthers: hideOthers,
  // hideOthersUri: hideOthersUri
};

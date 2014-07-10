var _ = require('lodash'),
    hammer = require('hammerjs'),
    Steady = require('steady'),
    $ = require('./utils').$,
    on = require('./on'),
    aside = require('./aside');

var closed = false;

var elements = {
  content: document.getElementById('content'),
  footer: $('.footer', aside.elements.bottom),
  icon: $('.footer-icon', aside.elements.bottom)
};

// var s = new Steady({
//   conditions: {
//     "max-bottom": 200
//   },
//   scrollElement: elements.content,
//   handler: function (values, done) {
//     console.log('bottom reached');
//     var listeners = 0;

//     var checkDone = function checkDoneF() {
//       console.log('check listeners', listeners);
//       if (!listeners) {
//         done();
//       }
//     };

//     var registerListener = function registerListenerF() {
//       console.log('add listener');
//       listeners++;
//       return function listenerDone() {
//         console.log('done listener');
//         listeners--;
//         checkDone();
//       };
//     };

//     console.log('trigger bottom reached');
//     on.bottomReached.dispatch(registerListener);
//     console.log('post trigger bottom reached');

//     setTimeout(function () {
//       console.log('timeout check');
//       checkDone();
//     }, 0);
//   }
// });

hammer(elements.footer).on('tap', function (e) {
  on.footerTaped.dispatch(e);
});

module.exports.startLoading = function () {
  elments.footer.classList.add('footer-loading');
};

module.exports.stopLoading = function () {
  elements.footer.classList.remove('footer-loading');
};

module.exports.setColor = function (color) {
  var newColor = 'color-' + color;
  var currentColor =_.find(elements.footer.classList, function (clazz) {
    return (clazz.indexOf('color-') === 0);
  });

  if (newColor !== currentColor) {
    if (currentColor) {
      elements.footer.classList.remove(currentColor);
      elements.icon.classList.remove(currentColor);
    }

    elements.footer.classList.add('color-' + color);
    elements.icon.classList.add('color-' + color);
  }
};

module.exports.show = function show() {
  if (!closed) aside.show('bottom');
};

module.exports.hide = function hide() {
  closed = true;
  aside.hide('bottom');
};

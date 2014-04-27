var zanimo = require('zanimo'),
    utils = require('./utils'),
    $ = utils.$;

var body = $('body'),
    aside = $('#aside'),
    mask = $('#mask');

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

var show = function (content) {
  body.classList.add('aside-open');

  if (content) {
    aside.innerHTML = content;
  }
};

var hide = function () {
  body.classList.remove('aside-open');
};

module.exports = {
  aside: aside,
  mask: mask,
  show: show,
  hide: hide
};

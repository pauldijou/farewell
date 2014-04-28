// var isMobile = module.exports.isMobile = /WebKit.*Mobile.*|Android/.test(window.navigator.userAgent);
module.exports.isMobile = window.isMobile;

module.exports.$ = function $(selector, context) { return (context || window.document).querySelector(selector); };
module.exports.$$ = function $$(selector, context) { return (context || window.document).querySelectorAll(selector); };
module.exports.DOM = function DOM(tag) { return window.document.createElement(tag); };
module.exports.empty = function empty() { };
module.exports.isTouchable = window.document.ontouchstart === null;
module.exports.isDefined = function (value) {
  return value !== undefined && value !== null;
};

module.exports.getViewportHeight = function () { return isMobile ? window.outerHeight : window.innerHeight; };

var dummyStyle = document.createElement('div').style,
    vendor = (function () {
      var vendors = 't,webkitT,MozT,msT,OT'.split(','),
        t,
        i = 0,
        l = vendors.length;

      for ( ; i < l; i++ ) {
        t = vendors[i] + 'ransform';
        if ( t in dummyStyle ) {
          return vendors[i].substr(0, vendors[i].length - 1);
        }
      }

      return false;
    })(),
    cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '';

module.exports.vendor = vendor;
module.exports.cssVendor = cssVendor;

module.exports.prefixStyle = function (style) {
  if ( vendor === '' ) return style;
  style = style.charAt(0).toUpperCase() + style.substr(1);
  return vendor + style;
};

module.exports.preventDefault = function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; }
};

module.exports.closest = function (element, tagName) {
  while (element) {
    if (element.nodeName === tagName) return element;
    element = element.parentNode;
  }
};

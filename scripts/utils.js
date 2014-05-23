if ( typeof Object.getPrototypeOf !== "function" ) {
  if ( typeof "test".__proto__ === "object" ) {
    Object.getPrototypeOf = function(object){
      return object.__proto__;
    };
  } else {
    Object.getPrototypeOf = function(object){
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    };
  }
}

// var isMobile = module.exports.isMobile = /WebKit.*Mobile.*|Android/.test(window.navigator.userAgent);
module.exports.isMobile = window.farewell.isMobile;
module.exports.hasIscroll = window.farewell.hasIscroll;
module.exports.has = module.exports.can = window.farewell.can;

module.exports.$ = function $(selector, context) { return (context || window.document).querySelector(selector); };
module.exports.$$ = function $$(selector, context) { return (context || window.document).querySelectorAll(selector); };
module.exports.DOM = function DOM(tag) { return window.document.createElement(tag); };
module.exports.empty = function empty() { };
module.exports.isTouchable = window.document.ontouchstart === null;
module.exports.isDefined = function (value) {
  return value !== undefined && value !== null;
};

module.exports.getViewportHeight = function () { return isMobile ? window.outerHeight : window.innerHeight; };

// var dummyStyle = document.createElement('div').style,
//     vendor = (function () {
//       var vendors = 't,webkitT,MozT,msT,OT'.split(','),
//         t,
//         i = 0,
//         l = vendors.length;

//       for ( ; i < l; i++ ) {
//         t = vendors[i] + 'ransform';
//         if ( t in dummyStyle ) {
//           return vendors[i].substr(0, vendors[i].length - 1);
//         }
//       }

//       return false;
//     })(),
//     cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '';

// module.exports.vendor = vendor;
// module.exports.cssVendor = cssVendor;

var vendor = module.exports.vendor = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

console.log('UTILS', vendor);

var prefixStyle = module.exports.prefixStyle = function (style) {
  return vendor.lowercase + style.charAt(0).toUpperCase() + style.substr(1);
};

module.exports.setStyle = function (elem, property, value) {
  elem.style[prefixStyle(property)] = value;
  elem.style[property] = value;
  return elem;
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

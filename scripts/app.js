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

var utils = require('./utils');

if (utils.isMobile) {
  $('body').classList.add('mobile');
}

var templates = require('./templates'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    states = {
      home: require('./states/home'),
      maps: require('./states/maps')
    };

aside.mask.addEventListener('click', function() {
  aside.hide();
});

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 27) {
    aside.hide();
  }
});

router
  .addState('home', states.home)
  .addState('maps', states.maps)
  .init();

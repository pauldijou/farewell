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

var templates = require('./templates'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    map = require('./map'),
    states = {
      home: require('./states/home'),
      maps: require('./states/maps')
    };

map.load();

aside.elements.rightMask.addEventListener('click', function() {
  aside.hide('right');
});

aside.elements.rightBisMask.addEventListener('click', function() {
  aside.hide('right-bis');
});

aside.elements.topMask.addEventListener('click', function() {
  aside.hide('top');
});

document.addEventListener('keyup', function (event) {
  // Escape
  if (event.keyCode === 27) {
    aside.hideTop();
  }

  // M
  if (event.keyCode === 77 && map.isLoaded()) {
    map.toggle();
  }
});

router
  .addState('home', states.home)
  .addState('maps', states.maps)
  .init();

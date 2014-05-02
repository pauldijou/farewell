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
    router = require('./router'),
    map = require('./map'),
    on = require('./on'),
    $ = require('./utils').$;

map.load();

$('.btn-feedback', aside.elements.feedback).addEventListener('click', function() {
  aside.toggle('feedback');
});

aside.elements.rightMask.addEventListener('click', function() {
  // router.search({i: null, t: null});
  aside.hide('right');
});

aside.elements.feedbackMask.addEventListener('click', function() {
  aside.hide('feedback');
});

aside.elements.topMask.addEventListener('click', function() {
  aside.hide('top');
});

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
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

  // C
  if (event.keyCode === 67 && aside.isOpen('right')) {
    aside.toggle('feedback');
  }
});

router
  .addState('home', require('./states/home'))
  .addState('maps', require('./states/maps'))
  .init();

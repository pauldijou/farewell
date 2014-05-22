var utils = require('./utils'),
    handlebarsHelpers = require('./handlebars-helpers'),
    templates = require('./templates'),
    keys = require('./keys'),
    router = require('./router'),
    api = require('./api'),
    aside = require('./aside'),
    router = require('./router'),
    map = require('./map'),
    on = require('./on'),
    $ = utils.$;

map.load();

window.addEventListener('resize', function (event) {
  on.resized.dispatch(event);
});

keys.bind('esc', function() { aside.hideCloser(); });
keys.bind('m', function() { map.toggle(); });
keys.bind('c', function() { aside.toggle('feedback'); });
keys.bind('b', function() { aside.toggle('right'); });
keys.bind('r', function() { aside.toggle('right'); });

router.
  addState('home', require('./states/home')).
  addState('maps', require('./states/maps')).
  init();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-51258218-1', 'pauldijou.com');
ga('send', 'pageview');

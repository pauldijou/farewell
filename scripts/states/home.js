var q = require('q'),
    _ = require('lodash'),
    IScroll = require('iscroll'),
    mobileButton = require('mobile-button'),
    State = require('abyssa').State,
    templates = require('../templates'),
    api = require('../api'),
    aside = require('../aside'),
    utils = require('../utils'),
    article = require('../models/article'),
    $ = utils.$,
    $$ = utils.$$;

var scroller,
    articles = [],
    elements = {};

var showArticle = function () {
  var id = this.id;
  var article = _.find(articles, function (a) {
    return a.reference.id === id;
  });

  if (article) {
    aside.show(templates.article(article));
  }
};

module.exports = State('/', {
  exit: function () {
    if (scroller) {
      scroller.destroy();
      scroller = undefined;
    }
  },
  enter: function () {
    articles = [];

    q.all([
      api.maps(),
      api.places(),
      api.articles()
    ]).spread(function (maps, places, articlesDocs) {
      var map = maps.results[_.random(maps.results.length - 1)];

      // HACK
      var oneArticle = articlesDocs.results[0];
      
      articles = _.map([oneArticle, oneArticle, oneArticle, oneArticle], article.fromDoc);

      document.getElementById('content').innerHTML = templates.home({
        map: {
          url: map.getImage('map.map').main.url
        },
        articles: articles
      });

      // scroller = new IScroll('.home', {
      //   mouseWheel: true,
      //   scrollbars: true
      // });

      elements.home = $('.home');
      elements.detail = $('.article-detail');

      _.forEach($$('.btn'), function (elem) {
        // button.addEventListener('click', function(event) {
        //   aside.show();
        // });

        new mobileButton.Touchend({
          el: elem,
          f: showArticle.bind({id: elem.getAttribute('data-article-id')})
        }).bind();
      });
    }).done();
  }
});

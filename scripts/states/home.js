var q = require('q'),
    _ = require('lodash'),
    IScroll = require('iscroll'),
    mobileButton = require('mobile-button'),
    State = require('abyssa').State,
    templates = require('../templates'),
    api = require('../api'),
    aside = require('../aside'),
    disqus = require('../disqus'),
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
    aside.show('right', templates.article(article));

    aside.set('right-bis', templates.feedback());
    disqus.reload({
      id: article.reference.type + '-' + article.reference.id,
      title: article.reference.slug
    });

    $('#aside-right h1').addEventListener('click', function () {
      aside.show('right-bis');
    });
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
      api.articles()
    ]).spread(function (articlesDocs) {
      // HACK
      var oneArticle = articlesDocs.results[0];
      
      articles = _.map([oneArticle, oneArticle, oneArticle, oneArticle], article.fromDoc);

      document.getElementById('content').innerHTML = templates.home({
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

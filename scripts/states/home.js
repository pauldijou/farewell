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
    router = require('../router'),
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
    disqus.reloadReference(article.reference);
  }
};

module.exports = State('?page&search', {
  exit: function () {
    if (scroller) {
      scroller.destroy();
      scroller = undefined;
    }
  },
  enter: function (params) {
    articles = [];
    var state = this;

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
          // f: (function () {
          //   router.search({i: this.id, t: 'article'});
          // }).bind({id: elem.getAttribute('data-article-id')})
        }).bind();
      });
    }).done();
  },
  update: function (params) {
    console.log('UPDATE', params);

    // if (params.t && params.t === 'article') {
    //   showArticle.call({id: params.i});
    // }
  }
});

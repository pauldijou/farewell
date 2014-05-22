var q = require('q'),
    _ = require('lodash'),
    hammer = require('hammerjs'),
    mobileButton = require('mobile-button'),
    State = require('abyssa').State,
    templates = require('../templates'),
    api = require('../api'),
    aside = require('../aside'),
    disqus = require('../disqus'),
    utils = require('../utils'),
    router = require('../router'),
    article = require('../models/article'),
    scroller = require('../scroller'),
    $ = utils.$,
    $$ = utils.$$;

var articles = [],
    elements = {};

var showArticle = function () {
  var id = this.id;
  var article = _.find(articles, function (a) {
    return a.reference.id === id;
  });

  if (article) {
    aside.show('right', templates.article(article));
    scroller.create('asideright', $('.article', aside.elements.right));
    disqus.reloadReference(article.reference);
  }
};

module.exports = State('?page&search', {
  enter: function (params) {
    articles = [];
    var state = this;

    q.all([
      api.articles()
    ]).spread(function (articlesDocs) {
      // HACK
      var oneArticle = articlesDocs.results[0];
      
      articles = _.map([oneArticle, oneArticle, oneArticle, oneArticle], article.fromDoc);

      $('#content > .content').innerHTML = templates.home({
        articles: articles
      });

      scroller.refresh.content();

      elements.home = $('.home');
      elements.detail = $('.article-detail');

      _.forEach($$('.btn'), function (elem) {
        // button.addEventListener('click', function(event) {
        //   aside.show();
        // });

        hammer(elem).on('tap', function (e) {
          console.log(e);
        });

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

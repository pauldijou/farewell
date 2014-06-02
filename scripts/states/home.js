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
    $ = utils.$,
    $$ = utils.$$;

var articles = [],
    elements = {},
    lastParams = {};

var showArticle = function (id) {
  // var id = this.id;
  var article = _.find(articles, function (a) {
    return a.reference.id === id;
  });

  console.log('showArticle', id, article);

  if (article) {
    aside.show('right', templates.article(article));
    disqus.reloadReference(article.reference);
  }
};

module.exports = State('?page&search', {
  enter: function (params) {
    articles = [];
    var state = this;

    state.data('loaded').then(function () {
      q.all([
        api.articles()
      ]).spread(function (articlesDocs) {
        // HACK
        var oneArticle = articlesDocs.results[0];
        
        articles = _.map([oneArticle, oneArticle, oneArticle, oneArticle], article.fromDoc);

        $('#content').innerHTML = templates.home({
          articles: articles
        });

        elements.home = $('.home');
        elements.detail = $('.article-detail');

        _.forEach($$('.btn'), function (elem) {
          // button.addEventListener('click', function(event) {
          //   aside.show();
          // });

          hammer(elem).on('tap', function (e) {
            // showArticle(e.target.getAttribute('data-article-id'));
            router.search('right', 'article-' + e.target.getAttribute('data-article-id'));
          });

          // new mobileButton.Touchend({
          //   el: elem,
          //   f: showArticle.bind({id: elem.getAttribute('data-article-id')})
          //   // f: (function () {
          //   //   router.search({i: this.id, t: 'article'});
          //   // }).bind({id: elem.getAttribute('data-article-id')})
          // }).bind();
        });

        state.update(params);
      }).done();
    });
  },
  update: function (params) {
    var diffParams = utils.diff(params, lastParams);
    var keys = _.keys(diffParams);

    if (_.contains(keys, 'right')) {
      if (diffParams.right) {
        var ref = diffParams.right.split('-');
        if (ref[0] === 'article') {
          showArticle(ref[1]);
        }
      }
    }

    lastParams = params;
  }
});

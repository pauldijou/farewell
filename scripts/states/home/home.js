var q = require('q'),
    _ = require('lodash'),
    hammer = require('hammerjs'),
    jquery = require('jquery'),
    State = require('abyssa').State,
    Steady = require('steady'),
    templates = require('../../templates'),
    api = require('../../api'),
    aside = require('../../aside'),
    disqus = require('../../disqus'),
    utils = require('../../utils'),
    router = require('../../router'),
    on = require('../../on'),
    footer = require('../../footer'),
    tooltip = require('../../tooltip'),
    article = require('../../models/article'),
    $ = utils.$,
    $$ = utils.$$;

var state,
    articles = [],
    elements = {
      content: document.getElementById('content')
    },
    lastParams = {},
    nextArticles = undefined;

var updateFooter = function updateFooterColorF(values, done) {
  var nextArticle = articles[values.articles + 1];
  if (nextArticle && nextArticle.color) {
    footer.setColor(nextArticle.color);
    done();
  } else if (hasNextArticles()) {
    // Load articles here finally
    footer.startLoading();
    loadArticles().then(function () {
      footer.stopLoading();
      done();
    });
  } else {
    footer.hide();
    done();
  }
};

var findIndexVisibleArticle = function findIndexVisibleArticleF() {
  return _.findIndex(articles, function (article, idx) {
    if (article.element) {
      var top = Math.round(article.element.getBoundingClientRect().top);
      return ((-1 * window.innerHeight < top) && (top <= 0));
    } else {
      return false;
    }
  });
};

var scrollingListener = new Steady({
  scrollElement: elements.content,
  throttle: 100,
  handler: updateFooter
});

scrollingListener.addTracker('articles', findIndexVisibleArticle);
scrollingListener.addCondition('min-articles', 0);

var hasNextArticles = function hasNextArticlesF() {
  return !!nextArticles;
};

var loadArticles = function loadArticlesF(page) {
  return api.articles().then(function (articlesDocs) {
    nextArticles = articlesDocs.next_page;

    var newArticles = _.map(articlesDocs.results, article.fromDoc);

    if (!articles.length) {
      footer.setColor(newArticles[1] && newArticles[1].color || 'jade');
    }

    if (newArticles.length) {
      articles = articles.concat(newArticles);

      elements.content.innerHTML = templates.home({
        articles: articles
      });

      _.forEach(newArticles, function (article) {
        article.element = document.getElementById('article-' + article.reference.id);
        tooltip.load(article.element, {
          theme: 'tooltipster-' + (article.color || 'default')
        });
      });

      footer.show();

      state.data('articles', q.when(articles));
    }

    return articles;
  });
};

on.footerTaped.add(function () {
  var visibleIndex = findIndexVisibleArticle();
  var nextArticle = articles && articles[visibleIndex + 1];

  if (nextArticle && nextArticle.element) {
    jquery(elements.content).animate({
      scrollTop: nextArticle.element.offsetTop
    }, 1000);
  }
});

// on.bottomReached.add(function (async) {
//   console.log('adding listener bottomReached');
//   var done = async();

//   if (hasNextArticles()) {
//     footer.startLoading();
//     loadArticles().then(function () {
//       footer.stopLoading();
//       done();
//     });
//   } else {
//     aside.hide('bottom');
//     done();
//   }
// });

module.exports = State('?page&search', {
  enter: function (params) {
    articles = [];
    state = this;
    lastParams = {};

    hammer(elements.content, utils.hammerOptions()).on('tap', function (e) {
      if (e.target.getAttribute('data-article-id')) {
        // router.search('right', 'article-' + e.target.getAttribute('data-article-id'));
        router.state('global.root.article.root', {id:  e.target.getAttribute('data-article-id')});
      }
    });

    state.data('articles', state.data('loaded').then(function () {
      return loadArticles(params.page || 0);
    }));

    state.data('articles').done(function () { state.update(params); });
  },
  update: function (params) {
    var diffParams = utils.diff(params, lastParams);
    var keys = _.keys(diffParams);

    lastParams = params;
  },
  root: require('../empty')(),
  map: require('./map'),
  article: require('./article')
});

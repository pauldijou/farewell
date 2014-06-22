var q = require('q'),
    _ = require('lodash'),
    hammer = require('hammerjs'),
    jquery = require('jquery'),
    mobileButton = require('mobile-button'),
    State = require('abyssa').State,
    Steady = require('steady'),
    templates = require('../templates'),
    api = require('../api'),
    aside = require('../aside'),
    disqus = require('../disqus'),
    utils = require('../utils'),
    router = require('../router'),
    on = require('../on'),
    footer = require('../footer'),
    article = require('../models/article'),
    $ = utils.$,
    $$ = utils.$$;

var articles = [],
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
    aside.hide('bottom');
    done();
  }
};

var findIndexVisibleArticle = function findIndexVisibleArticleF() {
  return _.findIndex(articles, function (article) {
    if (article.element) {
      var top = article.element.getBoundingClientRect().top;
      return ((window.innerHeight / -2 <= top) && (top < window.innerHeight / 2));
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
    // HACK
    var oneArticle = articlesDocs.results[0];
    articlesDocs = [oneArticle, oneArticle, oneArticle, oneArticle];
    // END HACK

    var newArticles = _.map(articlesDocs, article.fromDoc);
    newArticles[0].reference.id = newArticles[0].reference.id + 'a';
    newArticles[1].reference.id = newArticles[1].reference.id + 'b';
    newArticles[2].reference.id = newArticles[2].reference.id + 'c';
    newArticles[3].reference.id = newArticles[3].reference.id + 'd';

    newArticles[0].color = 'studio';
    newArticles[1].color = 'thunderbird';
    newArticles[2].color = 'jade';
    newArticles[3].color = 'ebonyclay';

    if (!articles.length) {
      footer.setColor(newArticles[1] && newArticles[1].color || 'jade');
    }

    articles = articles.concat(newArticles);

    $('#content').innerHTML = templates.home({
      articles: articles
    });

    _.forEach(newArticles, function (article) {
      article.element = document.getElementById('article-' + article.reference.id);
    });

    aside.show('bottom');
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

var showArticle = function (id) {
  // var id = this.id;
  var article = _.find(articles, function (a) {
    return a.reference.id === id;
  });

  if (article) {
    aside.show('right', templates.article(article));
    disqus.reloadReference(article.reference);
  }
};

module.exports = State('?page&search', {
  enter: function (params) {
    articles = [];
    var state = this;

    hammer(elements.content).on('tap', function (e) {
      if (e.target.getAttribute('data-article-id')) {
        router.search('right', 'article-' + e.target.getAttribute('data-article-id'));
      }
    });

    state.data('loaded').then(function () {
      return loadArticles(params.page || 0).then(function () { state.update(params); });
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

var _ = require('lodash'),
    State = require('abyssa').State,
    aside = require('../../aside'),
    templates = require('../../templates'),
    disqus = require('../../disqus'),
    router = require('../../router'),
    lightbox = require('../../lightbox'),
    utils = require('../../utils');

var state, lastParams = {};

var showArticle = function showArticleF(id) {
  state.data('articles').done(function (articles) {
    var article = _.find(articles || [], function (a) {
      return a.reference.id === id;
    });

    if (article) {
      aside.show('right', templates.article(article));
      disqus.reloadReference(article.reference);
    } else {
      var previousState = router.previousState();
      if (previousState) {
        router.backTo(previousState.fullName);
      }
    }
  });
};

module.exports = State('articles/:id', {
  enter: function (params) {
    state = this;
    lastParams = {};
    state.update(params);
  },
  exit: function () {
    aside.hide('right');
  },
  update: function (params) {
    var diffParams = utils.diff(params, lastParams);
    var keys = _.keys(diffParams);
    if (_.contains(keys, 'id') && diffParams.id) {
      showArticle(diffParams.id);
    }
    lastParams = params;
  },
  root: require('../empty')(),
  feedback: require('../feedback')()
});

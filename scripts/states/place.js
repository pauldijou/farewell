var _ = require('lodash'),
    State = require('abyssa').State,
    aside = require('../aside'),
    templates = require('../templates'),
    router = require('../router'),
    disqus = require('../disqus'),
    utils = require('../utils');

var state, lastParams = {};

var showPlace = function showPlaceF(id) {
  state.data('places').done(function (places) {
    var place = _.find(places || [], function (p) {
      return p.reference.id === id;
    });

    if (place) {
      aside.show('right', templates.article(place));
      disqus.reloadReference(place.reference);
    } else {
      var previousState = router.previousState();
      if (previousState) {
        router.backTo(previousState.fullName);
      }
    }
  });
};

module.exports = State('places/:id', {
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
      showPlace(diffParams.id);
    }

    lastParams = params;
  },
  root: require('./empty')(),
  feedback: require('./feedback')()
});

var _ = require('lodash'),
    q = require('q'),
    State = require('abyssa').State,
    Map = require('../models/map'),
    Place = require('../models/place'),
    api = require('../api'),
    utils = require('../utils'),
    aside = require('../aside'),
    router = require('../router'),
    lightbox = require('../lightbox'),
    map = require('../map');

var lastParams = {},
    lastRight;

module.exports = State('?top&right&feedback&lightbox', {
  enter: function (params) {
    var state = this;

    state.data('loaded', q.all([api.maps(), api.places(), api.authors()]).spread(function (mapsDoc, placesDoc, authorsDoc) {
      maps = _.map(mapsDoc.results, Map.fromDoc);
      state.data('maps', maps);

      places = _.map(placesDoc.results, Place.fromDoc);
      state.data('places', places);

      authors = authorsDoc;
      state.data('authors', authors);

      map.load(maps, places);

      state.update(params);

      return [maps, places, authors];
    }));
  },
  update: function (params) {
    var diffParams = utils.diff(params, lastParams);
    var keys = _.keys(diffParams);

    if (_.contains(keys, 'top')) {
      if (diffParams.top) {
        map.show();
      } else {
        map.hide();
      }
    }

    if (_.contains(keys, 'right')) {
      if (diffParams.right) {
        var rightDoc = utils.extractTypeId(diffParams.right);
        if (diffParams.right === 'in') {
          router.search('right', lastRight || null);
        } else if (rightDoc.nature === 'place') {
          map.showPlaceDetail(rightDoc.id);
        }

        if (diffParams.right !== 'in') {
          lastRight = diffParams.right;
        }
      } else {
        aside.hide('right');
      }
    }

    if (_.contains(keys, 'feedback')) {
      if (diffParams.feedback) {
        aside.show('feedback');
      } else {
        aside.hide('feedback');
      }
    }

    if (_.contains(keys, 'lightbox')) {
      if (!diffParams.lightbox) {
        lightbox.hide();
      }
    }

    lastParams = params;
  },
  home: require('./home'),
  maps: require('./maps')
});

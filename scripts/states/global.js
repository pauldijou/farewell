var _ = require('lodash'),
    q = require('q'),
    State = require('abyssa').State,
    Map = require('../models/map'),
    Place = require('../models/place'),
    Author = require('../models/author'),
    api = require('../api'),
    utils = require('../utils'),
    aside = require('../aside'),
    router = require('../router'),
    lightbox = require('../lightbox');

var lastParams = {},
    lastRight;

module.exports = State('?top&right&feedback&lightbox', {
  enter: function (params) {
    var state = this;
    lastParams = {};

    var loading = q.all([api.maps(), api.places(), api.authors()]).spread(function (mapsDoc, placesDoc, authorsDoc) {
      return [_.map(mapsDoc.results, Map.fromDoc), _.map(placesDoc.results, Place.fromDoc), _.map(authorsDoc.results, Author.fromDoc)];
    });

    state.data('loaded', loading);

    state.data('maps', loading.spread(function (maps, places, authors) {
      return maps;
    }));

    state.data('places', loading.spread(function (maps, places, authors) {
      return places;
    }));

    state.data('authors', loading.spread(function (maps, places, authors) {
      return authors;
    }));

    loading.spread(function (maps, places, authors) {
      require('./home/map')._load(maps, places);
      state.update(params);
      return [maps, places, authors];
    });
  },
  update: function (params) {
    var diffParams = utils.diff(params, lastParams);
    var keys = _.keys(diffParams);

    if (_.contains(keys, 'lightbox')) {
      if (!diffParams.lightbox) {
        lightbox.hide();
      }
    }

    lastParams = params;
  },
  root: require('./home/home'),
  maps: require('./maps')
});

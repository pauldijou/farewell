var q = require('q'),
    Prismic = require('prismic.io').Prismic,
    prismic = require('./prismic'),
    lang = require('./lang');

var ref;

var deferApi = q.defer();
var api = deferApi.promise;

new Prismic.Api(prismic.configuration.apiEndpoint, function (err, resolvedApi) {
  if (err) {
    prismic.configuration.onPrismicError(err);
    deferApi.reject(err);
  } else {
    var SearchFormProto = Object.getPrototypeOf(resolvedApi.forms('everything'));
    var originalSubmit = SearchFormProto.submit;

    SearchFormProto.submit = function () {
      var defer = q.defer();

      originalSubmit.call(this, function (err, docs) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(docs);
        }
      });

      return defer.promise;
    };

    var ctx = {
      ref: (ref || resolvedApi.data.master.ref),
      api: resolvedApi,
      maybeRefParam: (ref && ref != resolvedApi.data.master.ref ? '~' + ref : ''),
      
      oauth: function() {
        var token = sessionStorage.getItem('ACCESS_TOKEN');
        return {
          accessToken: token,
          hasPrivilegedAccess: !!token
        };
      },

      linkResolver: function(ctx, doc) {
        return prismic.configuration.linkResolver(ctx, doc);
      }
    };

    deferApi.resolve(ctx);
  }
});

var collection = function (name, page, pageSize) {
  if (!page) { page = 1; }
  if (pageSize === undefined) { pageSize = 20; }

  return api.then(function (ctx) {
    return ctx.api.forms(name).ref(ctx.ref).set('pageSize', pageSize).set('page', page).submit();
  });
};

var authors = function () {
  return collection('authors', 1, 9999999);
};

var maps = function () {
  return collection('maps', 1, 9999999);
};

var places = function () {
  return collection('places-' + lang.current());
};

var articles = function () {
  return collection('articles-' + lang.current(), 1, 20);
};

module.exports = {
  api: api,
  ref: function (newRef) {
    if (newRef) { ref = newRef; }
    return ref;
  },
  authors: authors,
  maps: maps,
  places: places,
  articles: articles
};

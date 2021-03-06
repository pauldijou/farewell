var q = require('q'),
  Prismic = require('prismic.io').Prismic,
  prismic = require('./prismic'),
  lang = require('./lang');

var releaseRegex = /r=([^&]+)/;
var ref = ((location.href.split('?')[1] || '').match(releaseRegex) || [])[1];

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
        if (err) { defer.reject(err); }
        else { defer.resolve(docs); }
      });

      return defer.promise;
    };

    deferApi.resolve(resolvedApi);
  }
});

var collection = function (name, page, pageSize, orderings) {
  if (!page) { page = 1; }
  if (pageSize === undefined) { pageSize = 20; }

  return api.then(function (ctx) {
    var form = ctx.form(name).ref(ref || ctx.master())

    if (orderings) {
      form.orderings(orderings);
    }

    return form.pageSize(pageSize).page(page).submit();
  });
};

var authors = function () {
  return collection('authors', 1, 9999999);
};

var maps = function () {
  return collection('maps', 1, 9999999);
};

var places = function () {
  return collection('places', 1, 9999999);
};

var articles = function (page, pageSize) {
  return collection('articles', page, pageSize, '[my.article.date desc]');
};

module.exports = {
  api: api,
  authors: authors,
  maps: maps,
  places: places,
  articles: articles
};

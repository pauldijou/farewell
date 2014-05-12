var configuration = module.exports.configuration = {
  apiEndpoint: 'https://farewell.prismic.io/api',

  linkResolver: function(ctx, doc, isBroken) {
    if(doc.id === ctx.api.bookmarks['about']) {
      return '/#about' + ctx.maybeRefParam;
    }

    if(doc.id === ctx.api.bookmarks['jobs']) {
      return '/#jobs' + ctx.maybeRefParam;
    }

    if(doc.id === ctx.api.bookmarks['stores']) {
      return '/#stores' + ctx.maybeRefParam;
    }

    if(doc.type === 'store' && !isBroken) {
      return '/#stores' + ctx.maybeRefParam + '/' + doc.id + '/' + doc.slug;
    }

    if(doc.type === 'product' && !isBroken) {
      return '/#products' + ctx.maybeRefParam + '/' + doc.id + '/' + doc.slug;
    }

    if(doc.type === 'selection' && !isBroken) {
      return '/#selections' + ctx.maybeRefParam + '/' + doc.id + '/' + doc.slug;
    }

    if(doc.type === 'job-offer' && !isBroken) {
      return '/#jobs' + ctx.maybeRefParam + '/' + doc.id + '/' + doc.slug;
    }

    if(doc.type === 'blog-post' && !isBroken) {
      return '/blog.html#posts' + ctx.maybeRefParam + '/' + doc.id + '/' + doc.slug;
    }

    return '/#not-found';
  },

  onPrismicError: function(err) {
    console.error("An error happened on the server side: "+(err ? err.message : ''));
  }
};

var helpers = module.exports.helpers = {

};

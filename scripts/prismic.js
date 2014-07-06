var _ = require('lodash'),
    Prismic = require('prismic.io').Prismic;

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

// OVERRIDE default asHtml method for StructuredText
var defaults = {};

var keywords = {
  caption: '[caption]'
};

function BlockGroup(tag, blocks) {
  this.tag = tag;
  this.blocks = blocks;
}

var asHtml = module.exports.asHtml = function (blocks, ctx, opts) {
  var blockGroups = [],
      blockGroup,
      block,
      html = [],
      opts = _.defaults(opts || {}, defaults);

  if (blocks && !_.isArray(blocks)) {
    blocks = blocks.blocks;
  }

  if (_.isArray(blocks)) {
    var blocksLength = blocks.length;

    for(var i=0; i<blocksLength; ++i) {
      block = blocks[i];

      if (block.type !== 'list-item' && block.type !== 'o-list-item') { // it's not a type that groups
        blockGroup = new BlockGroup(block.type, []);
        blockGroups.push(blockGroup);
      }
      else if (!blockGroup || blockGroup.tag !== block.type) { // it's a new type or no BlockGroup was set so far
        blockGroup = new BlockGroup(block.type, []);
        blockGroups.push(blockGroup);
      }
      // else: it's the same type as before, no touching blockGroup

      blockGroup.blocks.push(block);
    };

    _.forEach(blockGroups, function (blockGroup, index) {
      if(blockGroup.tag === 'heading1') {
        html.push('<h1>' + insertSpans(blockGroup.blocks[0].text, blockGroup.blocks[0].spans, ctx) + '</h1>');
      }
      else if(blockGroup.tag === 'heading2') {
        html.push('<h2>' + insertSpans(blockGroup.blocks[0].text, blockGroup.blocks[0].spans, ctx) + '</h2>');
      }
      else if(blockGroup.tag === 'heading3') {
        html.push('<h3>' + insertSpans(blockGroup.blocks[0].text, blockGroup.blocks[0].spans, ctx) + '</h3>');
      }
      else if(blockGroup.tag === 'paragraph') {
        if (blockGroup.blocks[0].text) {
          html.push('<p>' + insertSpans(blockGroup.blocks[0].text, blockGroup.blocks[0].spans, ctx) + '</p>');
        }
      }
      else if(blockGroup.tag === 'preformatted') {
        html.push('<pre>' + blockGroup.blocks[0].text + '</pre>');
      }
      else if(blockGroup.tag === 'image') {
        var img = '';
        if (opts.lightbox) {
          img += '<a data-lightbox-src="' + blockGroup.blocks[0].url + '" data-lightbox="' + opts.lightbox + '"';

          var next = blockGroups[index+1];
          if (next && next.tag === 'paragraph' && next.blocks[0].text.indexOf(keywords.caption) === 0) {
            img += ' title="' + next.blocks[0].text.substring(keywords.caption.length) + '"';
            next.blocks[0].text = '';
          }

          img += '>'
          img += '<img src="' + blockGroup.blocks[0].url + '" alt="' + blockGroup.blocks[0].alt + '">';
          img += '</a>';
        } else {
          img = '<img src="' + blockGroup.blocks[0].url + '" alt="' + blockGroup.blocks[0].alt + '">';
        }

        html.push(img);
      }
      else if(blockGroup.tag === 'embed') {
        html.push('<div data-oembed="'+ blockGroup.blocks[0].embed_url
            + '" data-oembed-type="'+ blockGroup.blocks[0].type
            + '" data-oembed-provider="'+ blockGroup.blocks[0].provider_name
            + '">' + blockGroup.blocks[0].oembed.html+"</div>")
      }
      else if(blockGroup.tag === 'list-item' || blockGroup.tag === 'o-list-item') {
        html.push(blockGroup.tag === 'list-item'?'<ul>':"<ol>");
        blockGroup.blocks.forEach(function(block){
            html.push('<li>'+insertSpans(block.text, block.spans, ctx)+'</li>');
        });
        html.push(blockGroup.tag === 'list-item'?'</ul>':'</ol>');
      }
      else throw new Error(blockGroup.tag+' not implemented');
    });
  }

  return html.join('');
};

function insertSpans(text, spans, ctx) {
  var textBits = [];
  var tags = [];
  var cursor = 0;
  var html = [];

  /* checking the spans are following each other, or else not doing anything */
  _.forEach(spans, function(span){
      if (span.end < span.start) return text;
      if (span.start < cursor) return text;
      cursor = span.end;
  });

  cursor = 0;

  _.forEach(spans, function(span){
      textBits.push(text.substring(0, span.start-cursor));
      text = text.substring(span.start-cursor);
      cursor = span.start;
      textBits.push(text.substring(0, span.end-cursor));
      text = text.substring(span.end-cursor);
      tags.push(span);
      cursor = span.end;
  });
  textBits.push(text);

  _.forEach(tags, function(tag, index){
    html.push(textBits.shift());
    if(tag.type == "hyperlink"){
      // Since the content of tag.data is similar to a link fragment, we can initialize it just like a fragment.
      html.push('<a href="'+ Prismic.Fragments.initField(tag.data).url(ctx) +'">');
      html.push(textBits.shift());
      html.push('</a>');
    } else {
      html.push('<'+tag.type+'>');
      html.push(textBits.shift());
      html.push('</'+tag.type+'>');
    }
  });
  html.push(textBits.shift());

  return html.join('');
}

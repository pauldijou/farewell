var _ = require('lodash'),
    Prismic = require('prismic.io').Prismic,
    responsive = require('./responsive');

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

var asHtml = module.exports.asHtml = function (blocks, ctx, opts, model) {
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
        var name;
        var content = blockGroup.blocks[0].text;
        if (content) {
          if (content.indexOf('{image-') === 0 && (name = /{image\-([a-zA-Z0-9_-]+)}/.exec(content)[1])) {
            html.push(renderImage(name, opts, model));
          } else if (content.indexOf('{carousel-') === 0 && (name = /{carousel\-([a-zA-Z0-9_-]+)}/.exec(content)[1])) {
            html.push(renderCarousel(name, opts, model));
          } else {
            html.push('<p>' + insertSpans(content, blockGroup.blocks[0].spans, ctx) + '</p>');
          }
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
      else {
        throw new Error(blockGroup.tag+' not implemented');
      }
    });
  }

  return html.join('');
};

function insertSpans(text, spans, ctx) {
    function getTag(span, isStart) {
        if (span.type === 'hyperlink') {
            // FIXME
            // Right now, span.type == 'hyperlink'
            // and sometimes span.data is something like {document: Document, isBroken: false}
            // it should be something like {type: 'Link.document', value: {document: Document, isBroken: false}}
            // so obviously, you cannot cast span.data to a Fragment using initField
            // Need a way to do that though... I don't why this is happening from the API
            var fragment = initField(span.data);

            // Try to patch the bug described previously
            if (!fragment && span.data && span.data.document) {
              fragment = initField({
                type: 'Link.document',
                value: span.data
              });
            }

            return fragment && (isStart ? '<a href="'+ fragment.url(ctx) +'">' : '</a>');
        } else {
            return '<' + (isStart ? '': '/') + span.type + '>'
        }
    }

    // Ultimate optimization!
    // You know... doing nothing when there is nothing to be done
    if (!spans || !spans.length) {
        return text;
    }

    var positions = [];
    var tagsStart = {};
    var tagsEnd = {};

    spans.forEach(function (span) {
        if (!tagsStart[span.start]) { tagsStart[span.start] = []; }
        if (!tagsEnd[span.end]) { tagsEnd[span.end] = []; }

        tagsStart[span.start].push(getTag(span, true));
        tagsEnd[span.end].unshift(getTag(span, false));

        positions.push(span.start, span.end);
    });

    positions = positions.filter(function (elem, index, self) {
        return self.indexOf(elem) === index;
    }).sort(function(a, b) {
        return a - b;
    });

    var html = [];
    var cursor = 0;

    positions.forEach(function (pos) {
        html.push(text.substring(cursor, pos));
        html = html.concat(tagsEnd[pos] || []);
        html = html.concat(tagsStart[pos] || []);
        cursor = pos;
    });

    html.push(text.substring(cursor));

    return html.join('');
}

function renderImageView(view, opts) {
  var img = '';

  if (opts.lightbox) {
    img += '<a data-lightbox-src="' + view.url + '" data-lightbox="' + opts.lightbox + '" title="' + view.caption + '">';
    img += '<figure>';
    img += '<img src="' + view.url + '" alt="' + view.alt + '">';
    img += '<figcaption>' + view.caption + '</figcaption>';
    img += '</figure>';
    img += '</a>';
  } else {
    img = '<img src="' + view.url + '" alt="' + view.alt + '">';
  }

  return img;
}

function renderImage(name, opts, model) {
  var img = '';
  var image = _.find(model && model.images || [], {name: name});
  if (image) {
    var device = responsive.device();
    var view = image[device] || image.main;
    view.caption = image.caption;
    img += renderImageView(view, opts);
  }

  return img;
}

function carouselTemplate(name) {
  return  '<section data-swipe="disabled">'
        + '<div id="carousel-'+name+'" class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">'
        + '<div class="slides"></div>'
        + '<h3 class="title"></h3>'
        + '<a class="prev">‹</a>'
        + '<a class="next">›</a>'
        + '<a class="play-pause"></a>'
        + '<ol class="indicator"></ol>'
    + '</div>'
  + '</section>';
}

function renderCarousel(name, opts, model) {
  var car = '';
  var carousel = _.find(model && model.carousels || [], {name: name});
  if (carousel && carousel.name) {
    // var device = responsive.device();
    // car += '<div class="carousel">';
    //
    // _.forEach(carousel.images, function (image) {
    //   var view = image[device] || image.main;
    //   car += '<div>';
    //   car += '<img src="' + view.url + '" alt="' + view.alt + '">';
    //   car += '</div>';
    // });
    //
    // car += '</div>';
    car += carouselTemplate(carousel.name);

  }
  return car;
}

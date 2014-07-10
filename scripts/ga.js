var ga = window.ga;

var page = '/';

function sendEvent(category, action) {
  // console.log('GA send event', category, action, page);
  ga('send', 'event', category, action, {
    page: page
  });
};

module.exports = {
  set: {
    page: function (path) {
      // ga('set', 'page', path);
      page = path;
    }
  },
  send: {
    pageView: function () {
      // console.log('GA send pageView', page);
      ga('send', 'pageview', {
        page: page
      });
    },
    event: {
      lightbox: {
        opened: function () { sendEvent('lightbox', 'opened'); },
        closed: function () { sendEvent('lightbox', 'closed'); }
      },
      feedback: {
        opened: function () { sendEvent('feedback', 'opened'); },
        closed: function () { sendEvent('feedback', 'closed'); }
      }
    }
  }
};

var ga = window.ga;

function sendEvent(category, action) {
  ga('send', 'event', category, action);
};

module.exports = {
  set: {
    page: function (path) {
      ga('set', 'page', path);
    }
  },
  send: {
    pageView: function () {
      ga('send', 'pageview');
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

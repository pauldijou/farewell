var idScript = 'script-disqus',
    body = document.getElementsByTagName('body')[0],
    script;

var load = function (config) {
  window.disqus_shortname = 'farewell-pauldijou';
  window.disqus_identifier = config.id;
  window.disqus_title = config.title;

  (function() {
      script = document.createElement('script');
      script.id = idScript;
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      console.log(script);
      body.appendChild(script);
  })();
};

var destroy = function () {
  if (script) {
    body.removeChild(script);
    script = undefined;
  }
};

var reload = function (config) {
  if (script) {
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = config.id;
        this.page.title = config.title;
        this.page.url = window.href;
        // this.language = newLanguage;
      }
    });
  } else {
    load(config);
  }
};

module.exports = {
  load: load,
  destroy: destroy,
  reload: reload
};

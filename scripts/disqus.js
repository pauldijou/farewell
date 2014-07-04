var idScript = 'script-disqus',
    body = document.getElementsByTagName('body')[0],
    script;

window.disqus_shortname = 'farewell-pauldijou';
window.disqus_disable_mobile = false;

var setVariables = function (config) {
  window.disqus_identifier = config.id;
  window.disqus_title = config.title;
  window.disqus_url = window.location.origin + '/' + config.id;
};

var load = function (config) {
  setVariables(config);
  (function() {
      script = document.createElement('script');
      script.id = idScript;
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//' + window.disqus_shortname + '.disqus.com/embed.js';
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
  console.log('reload disqus', config);
  if (config && config.id && config.title) {
    if (script && window.DISQUS) {
      setVariables(config);
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = window.disqus_identifier;
          this.page.title = window.disqus_title;
          this.page.url = window.disqus_url;
          // this.language = newLanguage;
          console.log('setting', this.page);
        }
      });
    } else {
      load(config);
    }
  }
};

var reloadReference = function (reference) {
  reference = reference || {};
  reload({
    id: reference.type + '-' + reference.id,
    title: reference.slug
  });
};

module.exports = {
  load: load,
  destroy: destroy,
  reload: reload,
  reloadReference: reloadReference
};

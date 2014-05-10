var lang = 'fr',
    availables = ['fr', 'en'],
    messages = {};

var defaultLang = function () { return availables[0]; };
var get = function () { return lang; };

module.exports = {
  current: function () { return lang; },
  default: defaultLang,
  availables: function () { return availables; },
  set: function (newLang) {
    newLang = newLang.split('-')[0];

    if (availables.indexOf(newLang) > -1) {
      lang = newLang;
    }

    return lang;
  },
  get: get,
  msg: function (key) {
    return messages[lang][key] || messages[defaultLang()][key] || key;
  }
};

messages = {
  'en': {
    'global.world.map': 'World <span class="text-underline">m</span>ap',
    'global.comments': '<span class="text-underline">C</span>omments'
  },
  'fr': {
    'global.world.map': 'Carte du <span class="text-underline">m</span>onde',
    'global.comments': '<span class="text-underline">C</span>ommentaires'
  }
};

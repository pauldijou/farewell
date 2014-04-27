var lang = 'fr';
    availables = ['fr', 'en'];

module.exports = {
  current: function () { return lang; },
  default: function () { return availables[0]; },
  availables: function () { return availables; }
}

var _ = require('lodash'),
    configKey = 'farewellConfiguration',
    configuration = {},
    defaultConfiguration = {
      theme: 'fullscreen',
      lang: 'fr',
      lastRead: 0
    },
    lastRead = 0;

var read = function () {
  return _.defaults(JSON.parse(localStorage.getItem(configKey)) || {}, defaultConfiguration);
};

var write = function () {
  return localStorage.setItem(configKey, JSON.stringify(configuration));
};

configuration = read();
lastRead = configuration.lastRead;
configuration.lastRead = Date.now();
write();

module.exports = function (key, value) {
  if (value !== undefined) {
    configuration[key] = value;
    write();
  }

  return configuration[key];
};

module.exports.isNew = function (timestamp) {
  timestamp = timestamp || Date.now();
  return (timestamp > lastRead);
};

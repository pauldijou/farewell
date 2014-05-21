var configKey = 'farewellConfiguration';

var read = function () {
  return JSON.parse(localStorage.getItem(configKey));
};

var write = function (value) {
  return localStorage.setItem(configKey, JSON.stringify(value));
};

var configuration = read() || {
  theme: 'fullscreen',
  lang: 'fr',
  lastRead: 0
};

module.exports = function (key, value) {
  if (value !== undefined) {
    configuration[key] = value;
    write(configuration);
  }

  return configuration[key];
};

var Signal = require('signals').Signal;

module.exports = {
  resized: new Signal(),
  bottomReached: new Signal(),
  footerTaped: new Signal()
};

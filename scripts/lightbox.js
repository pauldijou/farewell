var jQuery = require('jquery'),
    lightboxOuterContainer = jQuery('.lb-outerContainer'),
    elements = {
      next: jQuery('.lb-nav .lb-next', lightboxOuterContainer),
      previous: jQuery('.lb-nav .lb-prev', lightboxOuterContainer)
    };

var isVisible = function () {
  return false;
};

var next = function () {
  elements.next.click();
};

var previous = function () {
  elements.previous.click();
};

module.exports = {
  isVisible: isVisible,
  next: next,
  previous: previous
};

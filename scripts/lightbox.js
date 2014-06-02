var jQuery = require('jquery'),
    elements = {};

var checkElements = function () {
  if (!elements.container) {
    elements.container = document.getElementById('lightbox');
    elements.overlay = document.getElementById('lightboxOverlay');
    elements.next = jQuery('.lb-nav .lb-next', elements.container),
    elements.previous = jQuery('.lb-nav .lb-prev', elements.container)
  }
};

var isVisible = function () {
  checkElements();
  return elements.container.style.display !== 'none';
};

var hide = function () {
  checkElements();
  elements.overlay.click();
};

var next = function () {
  checkElements();
  elements.next.click();
};

var previous = function () {
  checkElements();
  elements.previous.click();
};

module.exports = {
  isVisible: isVisible,
  hide: hide,
  next: next,
  previous: previous
};

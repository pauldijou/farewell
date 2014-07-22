var mobileMax = 480;
var desktopMin = 1025;

var device = function device() {
  if (window.innerWidth >= desktopMin) {
    return 'desktop';
  } else if (window.innerWidth <= mobileMax) {
    return 'mobile';
  } else {
    return 'tablet';
  }
}

var isMobile = function isMobile() {
  return device() === 'mobile';
};

var isTablet = function isTablet() {
  return device() === 'tablet';
};

var isDesktop = function isDesktop() {
  return device() === 'desktop';
};

module.exports = {
  device: device,
  isMobile: isMobile,
  isTablet: isTablet,
  isDesktop: isDesktop
}

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

var mapImage = function mapImage(i) {
  if (i.image) {
    return {
      name: i.name && i.name.value,
      caption: i.caption.value,
      main: i.image.main,
      desktop: i.image.main,
      tablet: i.image.views.tablet,
      mobile: i.image.views.mobile
    };
  } else {
    return {
      main: i.main,
      desktop: i.main,
      tablet: i.views.tablet,
      mobile: i.views.mobile
    };
  }
};

module.exports = {
  device: device,
  isMobile: isMobile,
  isTablet: isTablet,
  isDesktop: isDesktop,
  mapImage: mapImage
}

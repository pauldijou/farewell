var abyssa = require('abyssa'),
    _ = require('lodash'),
    tooltip = require('./tooltip');

var router = module.exports = abyssa.Router().configure({
  enableLogs: false,
  urlSync: 'hash',
  hashPrefix: '!'
});

router.transition.started.add(function () {
  setTimeout(tooltip.hideAll, 0);
});

router.transition.ended.add(function () {
  setTimeout(tooltip.hideAll, 0);
});

router.siblingState = function siblingState(childName, params) {
  var currentState = router.currentState();
  var names = currentState.fullName.split('.');
  names.pop();
  names.push(childName);
  router.state(names.join('.'), _.merge(params || {}, currentState.params));
};

var updateAll = router.updateAll = function updateAll(state, params) {
  state.update(params);

  if (state.parent) {
    updateAll(state.parent, params);
  }
};

var currentParams = function () {
  return router.currentState().params;
};

var clonedCurrentParams = function () {
  return _.clone(router.currentState().params);
};

var updateCurrentParams = function (newParams) {
  if (!_.isEqual(newParams, currentParams())) {
    return router.state(router.currentState().fullName, newParams);
  }
};

var getSearch = function (key) {
  return currentParams()[key];
};

var addSearch = function (key, value) {
  var params = clonedCurrentParams();
  params[key] = value;
  return updateCurrentParams(params);
};

var removeSearch = function (key) {
  return updateCurrentParams(_.omit(clonedCurrentParams(), key));
};

var setSearch = function (values) {
  // Merge with current params
  var params = _.defaults(values, currentParams());

  // Remove null values
  _.forEach(values, function (value, key) {
    if (value === null) {
      params = _.omit(params, key);
    }
  });

  return updateCurrentParams(params);
};


var search = router.search = function (key, value, toggle) {
  if (!key) return setSearch({});

  var isKeyString = _.isString(key);

  if (toggle) {
    if (getSearch(key) === undefined) {
      return addSearch(key, value);
    } else {
      return removeSearch(key);
    }
  }
  else if (isKeyString && value === null) {
    return removeSearch(key);
  } else if (isKeyString && value === undefined) {
    return getSearch(key);
  } else if (isKeyString) {
    return addSearch(key, value);
  } else if (_.isPlainObject(key)) {
    return setSearch(key);
  }
};

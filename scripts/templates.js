var Handlebars = require('handlebars');

this.templates = {};

this["templates"] = this["templates"] || {};
this["templates"]["about"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>About</h1>";
  });;
this["templates"] = this["templates"] || {};
this["templates"]["article"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"illustration\" style=\"background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.illustration)),stack1 == null || stack1 === false ? stack1 : stack1.main)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n\n<div class=\"article\">\n  <div class=\"article-content\">\n    ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"article-summary ";
  if (helper = helpers.classes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.classes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <div class=\"illustration\" style=\"";
  if (helper = helpers.illustrationStyle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.illustrationStyle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "')\"></div>\n    <div class=\"summary\" style=\"";
  if (helper = helpers.summaryStyle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.summaryStyle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <div class=\"description\">\n        ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button type=\"button\" class=\"btn\" data-article-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Lire la suite...</button>\n      </div>\n    </div>\n  </div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n      <div class=\"article-new fa fa-star tooltip\" title=\"Tout neuf !\"></div>\n      ";
  }

  buffer += "<h1 class=\"main-title\">Farewell...</h1>\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.articles), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["map"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <li data-place-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"-webkit-transform:translate3d("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.position)),stack1 == null || stack1 === false ? stack1 : stack1.left)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px, "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.position)),stack1 == null || stack1 === false ? stack1 : stack1.top)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px, 0);transform:translate3d("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.position)),stack1 == null || stack1 === false ? stack1 : stack1.left)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px, "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.position)),stack1 == null || stack1 === false ? stack1 : stack1.top)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px, 0);\">\n        <div class=\"tooltip\" title=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\n      </li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"map\" style=\"background-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.bgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\">\n  <ul class=\"places\" style=\"margin:0;padding:0;\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.places), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>\n\n<div class=\"map-arrow\" style=\"background-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.bgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\">\n  <span class=\"fa fa-map-marker\"></span><span class=\"map-arrow-label\"> "
    + escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n),options={hash:{},data:data},helper ? helper.call(depth0, "global.world.map", options) : helperMissing.call(depth0, "i18n", "global.world.map", options)))
    + "</span>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["maps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.withInput), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.withInput), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLatitude), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <li><span>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":</span><input class=\"value value-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/></li>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.withInput), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program9(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLongitude), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

  buffer += "<div class=\"current-map\">\n  <img class=\"map\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.current)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n<div class=\"current-values\">\n  <ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n\n  <ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["place"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"illustration\" style=\"background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.illustration)),stack1 == null || stack1 === false ? stack1 : stack1.main)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n\n<div class=\"place\">\n  <div class=\"place-content\">\n    ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });;

module.exports = this.templates;

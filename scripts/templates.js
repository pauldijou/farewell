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
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"illustration\" style=\"background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.illustration)),stack1 == null || stack1 === false ? stack1 : stack1.main)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n\n<div class=\"article\">\n  <div class=\"content\">\n    ";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.title); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  if (stack2 = helpers.content) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.content); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <div id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"article-summary\">\n      <div class=\"illustration\" style=\"background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.illustration)),stack1 == null || stack1 === false ? stack1 : stack1.main)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n      <div class=\"summary\"";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.colors), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">\n        <h1>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.title); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</h1>\n        <div class=\"description\">\n          ";
  stack2 = ((stack1 = ((stack1 = (depth0 && depth0.descriptions)),stack1 == null || stack1 === false ? stack1 : stack1['long'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <button type=\"button\" class=\"btn\" data-article-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.reference)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.colors), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">Show</button>\n        </div>\n      </div>\n    </div>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " style=\"border-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.colors)),stack1 == null || stack1 === false ? stack1 : stack1.primary)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\"";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " style=\"background-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.colors)),stack1 == null || stack1 === false ? stack1 : stack1.lighten)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";border-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.colors)),stack1 == null || stack1 === false ? stack1 : stack1.primary)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\"";
  return buffer;
  }

  buffer += "<div class=\"home iscroll-wrapper\">\n<div class=\"content\">\n\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.articles), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <hr>\n\n  <img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"width:100%;\"/>\n</div>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["maps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"current-map\">\n  <img class=\"map\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.current)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n  <div data-name=\"greenwich\" class=\"longitude longitude-greenwich\"></div>\n  <div data-name=\"alaska\" class=\"longitude longitude-alaska\"></div>\n  <div data-name=\"siberia\" class=\"longitude longitude-siberia\"></div>\n  <div data-name=\"equator\" class=\"latitude latitude-equator\"></div>\n  <div data-name=\"greenland\" class=\"latitude latitude-greenland\"></div>\n  <div data-name=\"chili\" class=\"latitude latitude-chili\"></div>\n</div>\n\n<ul class=\"current-values\">\n  <li><span>Greenwich:</span><input class=\"value value-greenwich\"/></li>\n  <li><span>Alaska:</span><input class=\"value value-alaska\"/></li>\n  <li><span>Siberia:</span><input class=\"value value-siberia\"/></li>\n  <li><span>Equator:</span><input class=\"value value-equator\"/></li>\n  <li><span>Greenland:</span><input class=\"value value-greenland\"/></li>\n  <li><span>Chili:</span><input class=\"value value-chili\"/></li>\n</ul>\n";
  return buffer;
  });;

module.exports = this.templates;

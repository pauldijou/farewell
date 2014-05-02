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
this["templates"]["feedback"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"feedback\">\n  <div class=\"btn-feedback\">Comments</div>\n  <div id=\"disqus_thread\" class=\"disqus-thread\"></div>\n  <noscript>Please enable JavaScript to view the <a href=\"http://disqus.com/?ref_noscript\">comments powered by Disqus.</a></noscript>\n  <a href=\"http://disqus.com\" class=\"dsq-brlink\">comments powered by <span class=\"logo-disqus\">Disqus</span></a>\n</div>\n";
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

  buffer += "<div class=\"home iscroll-wrapper\">\n<div class=\"content\">\n  <h1 class=\"main-title\">Farewell...</h1>\n\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.articles), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["map"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
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
    + "px, 0);\"></li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"map\" style=\"background-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.bgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\">\n  <ul class=\"places\" style=\"margin:0;padding:0;\">\n    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.places), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n</div>\n\n<div class=\"map-arrow\" style=\"background-color:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.map)),stack1 == null || stack1 === false ? stack1 : stack1.bgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\">\n  <span class=\"fa fa-chevron-circle-down\"></span> World map\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["maps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.withInput), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.type); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.type); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  
  var buffer = "", stack1;
  buffer += "\n      <li><span>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</span><input class=\"value value-";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  stack2 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n\n<div class=\"current-values\">\n  <ul>\n    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n\n  <ul>\n    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.coordinates), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n</div>\n";
  return buffer;
  });;
this["templates"] = this["templates"] || {};
this["templates"]["place"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"illustration\" style=\"background-image:url('"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.illustration)),stack1 == null || stack1 === false ? stack1 : stack1.main)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n\n<div class=\"place\">\n  <div class=\"content\">\n    ";
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

module.exports = this.templates;

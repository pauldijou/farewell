window.Modernizr=function(e,t,n){function r(e){y.cssText=e}function o(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&y[o]!==n)return"pfx"==t?o:!0}return!1}function c(e,t,r){for(var i in e){var a=t[e[i]];if(a!==n)return r===!1?e[i]:o(a,"function")?a.bind(r||t):a}return!1}function l(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+E.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+x.join(r+" ")+r).split(" "),c(i,t,n))}var s,u,f,d="2.8.2",p={},m=!0,h=t.documentElement,v="modernizr",g=t.createElement(v),y=g.style,b=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),w="Webkit Moz O ms",E=w.split(" "),x=w.toLowerCase().split(" "),S={},j=[],C=j.slice,T=function(e,n,r,o){var i,a,c,l,s=t.createElement("div"),u=t.body,f=u||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:v+(r+1),s.appendChild(c);return i=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),s.id=v,(u?s:f).innerHTML+=i,f.appendChild(s),u||(f.style.background="",f.style.overflow="hidden",l=h.style.overflow,h.style.overflow="hidden",h.appendChild(f)),a=n(s,e),u?s.parentNode.removeChild(s):(f.parentNode.removeChild(f),h.style.overflow=l),!!a},L=function(){function e(e,i){i=i||t.createElement(r[e]||"div"),e="on"+e;var a=e in i;return a||(i.setAttribute||(i=t.createElement("div")),i.setAttribute&&i.removeAttribute&&(i.setAttribute(e,""),a=o(i[e],"function"),o(i[e],"undefined")||(i[e]=n),i.removeAttribute(e))),i=null,a}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),M={}.hasOwnProperty;f=o(M,"undefined")||o(M.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return M.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=C.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(C.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(C.call(arguments)))};return r}),S.flexbox=function(){return l("flexWrap")},S.flexboxlegacy=function(){return l("boxDirection")},S.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:T(["@media (",b.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},S.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},S.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}};for(var N in S)f(S,N)&&(u=N.toLowerCase(),p[u]=S[N](),j.push((p[u]?"":"no-")+u));return p.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof m&&m&&(h.className+=" "+(t?"":"no-")+e),p[e]=t}return p},r(""),g=s=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=g[e[h]];return t||(t={},v++,e[h]=v,g[v]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():m.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||p.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function a(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,c=r(),l=c.length;l>a;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=o(e);return y.shivCSS&&!s&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||c(e,r),e}var s,u,f="3.7.0",d=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,m=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",v=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",s="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){s=!0,u=!0}}();var y={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:d.shivCSS!==!1,supportsUnknownElements:u,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=y,l(t)}(this,t),p._version=d,p._prefixes=b,p._domPrefixes=x,p._cssomPrefixes=E,p.hasEvent=L,p.testProp=function(e){return a([e])},p.testAllProps=l,p.testStyles=T,h.className=h.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(m?" js "+j.join(" "):""),p}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==v.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=g.shift();y=1,e?e.t?m(function(){("c"==e.t?d.injectCss:d.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):y=0}function l(e,n,r,o,i,l,s){function u(t){if(!p&&a(f.readyState)&&(b.r=p=1,!y&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&m(function(){E.removeChild(f)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload()}}var s=s||d.errorTimeout,f=t.createElement(e),p=0,v=0,b={t:r,s:n,e:i,a:l,x:s};1===T[n]&&(v=1,T[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,v)},g.splice(o,0,b),"img"!=e&&(v||2===T[n]?(E.insertBefore(f,w?null:h),m(u,s)):T[n].push(f))}function s(e,t,n,r,i){return y=0,t=t||"j",o(e)?l("c"==t?S:x,e,t,this.i++,n,r,i):(g.splice(this.i++,0,e),1==g.length&&c()),this}function u(){var e=d;return e.loader={load:s,i:0},e}var f,d,p=t.documentElement,m=e.setTimeout,h=t.getElementsByTagName("script")[0],v={}.toString,g=[],y=0,b="MozAppearance"in p.style,w=b&&!!t.createRange().compareNode,E=w?p:h.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,x=b?"object":p?"script":"img",S=p?"script":x,j=Array.isArray||function(e){return"[object Array]"==v.call(e)},C=[],T={},L={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};d=function(e){function t(e){var t,n,r,e=e.split("!"),o=C.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;a>n;n++)r=e[n].split("="),(t=L[r.shift()])&&(i=t(i,r));for(n=0;o>n;n++)i=C[n](i);return i}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(T[l.url]?l.noexec=!0:T[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),T[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}),a(e,f,t,0,s);else if(Object(e)===e)for(l in c=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--c&&(r(f)?f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(d[l])),a(e[l],f,t,l,s))}else!n&&p()}var c,l,s=!!e.test,u=e.load||e.both,f=e.callback||i,d=f,p=e.complete||i;n(s?e.yep:e.nope,!!u),u&&n(u)}var l,s,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(j(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,f,0):j(s)?d(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)},d.addPrefix=function(e,t){L[e]=t},d.addFilter=function(e){C.push(e)},d.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u,f,p=t.createElement("script"),o=o||d.errorTimeout;p.src=e;for(f in r)p.setAttribute(f,r[f]);n=s?c:n||i,p.onreadystatechange=p.onload=function(){!u&&a(p.readyState)&&(u=1,n(),p.onload=p.onreadystatechange=null)},m(function(){u||(u=1,n(1))},o),l?p.onload():h.parentNode.insertBefore(p,h)},e.yepnope.injectCss=function(e,n,r,o,a,l){var s,o=t.createElement("link"),n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(h.parentNode.insertBefore(o,h),m(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(e){e.farewell={};var t=window.document.querySelector("html");e.farewell.capabilities={},e.farewell.can=function(n){return void 0!==e.farewell.capabilities[n]||(t.classList.contains(n)?e.farewell.capabilities[n]=!0:t.classList.contains("no-"+n)&&(e.farewell.capabilities[n]=!1)),e.farewell.capabilities[n]},navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?(e.farewell.capabilities.pointer=!0,t.classList.add("pointer")):(e.farewell.capabilities.pointer=!1,t.classList.add("no-pointer")),e.farewell.hasIscroll=e.farewell.can("touch")||e.farewell.can("pointer"),e.farewell.isMobile=/WebKit.*Mobile.*|Android/.test(window.navigator.userAgent),t.classList.add(e.farewell.isMobile?"mobile":"no-mobile"),t.classList.add(e.farewell.hasIscroll?"iscroll":"no-iscroll")}(window,document);
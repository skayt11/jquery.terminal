/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.5.4
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Fri, 15 Mar 2013 16:23:35 +0000
*/
(function(i,L){function ea(d,g){var f;if(typeof d==="string"&&typeof g==="string"){localStorage[d]=g;return true}else if(typeof d==="object"&&typeof g==="undefined"){for(f in d)if(d.hasOwnProperty(f))localStorage[f]=d[f];return true}return false}function aa(d,g){var f,h;f=new Date;f.setTime(f.getTime()+31536E6);f="; expires="+f.toGMTString();if(typeof d==="string"&&typeof g==="string"){document.cookie=d+"="+g+f+"; path=/";return true}else if(typeof d==="object"&&typeof g==="undefined"){for(h in d)if(d.hasOwnProperty(h))document.cookie=
h+"="+d[h]+f+"; path=/";return true}return false}function fa(d){return localStorage[d]}function ga(d){var g,f,h;d+="=";g=document.cookie.split(";");for(f=0;f<g.length;f++){for(h=g[f];h.charAt(0)===" ";)h=h.substring(1,h.length);if(h.indexOf(d)===0)return h.substring(d.length,h.length)}return null}function ha(d){return delete localStorage[d]}function ia(d){return aa(d,"",-1)}function X(d,g){var f=[],h=d.length;if(h<g)return[d];for(var j=0;j<h;j+=g)f.push(d.substring(j,j+g));return f}function ba(d){var g=
d instanceof Array?d:d?[d]:[],f=0;i.extend(this,{left:function(){if(f===0)f=g.length-1;else--f;return g[f]},right:function(){if(f===g.length-1)f=0;else++f;return g[f]},current:function(){return g[f]},data:function(){return g},length:function(){return g.length},reset:function(){f=0},append:function(h){g.push(h);this.reset()}})}function ja(d){var g=d?[d]:[];i.extend(this,{size:function(){return g.length},pop:function(){if(g.length===0)return null;else{var f=g[g.length-1];g=g.slice(0,g.length-1);return f}},
push:function(f){g=g.concat([f]);return f},top:function(){return g.length>0?g[g.length-1]:null}})}function ka(d){var g=true;if(typeof d==="string"&&d!=="")d+="_";var f=i.Storage.get(d+"commands"),h=new ba(f?(new Function("return "+f+";"))():[""]);i.extend(this,{append:function(j){if(g){h.append(j);i.Storage.set(d+"commands",i.json_stringify(h.data()))}},data:function(){return h.data()},next:function(){return h.right()},last:function(){h.reset()},previous:function(){return h.left()},clear:function(){h=
new ba;i.Storage.remove(d+"commands")},enable:function(){g=true},disable:function(){g=false}})}function ca(d){return i("<div>"+i.terminal.strip(d)+"</div>").text().length}i.omap=function(d,g){var f={};i.each(d,function(h,j){f[h]=g.call(d,h,j)});return f};var U=typeof window.localStorage!=="undefined";i.extend({Storage:{set:U?ea:aa,get:U?fa:ga,remove:U?ha:ia}});jQuery.fn.extend({everyTime:function(d,g,f,h,j){return this.each(function(){jQuery.timer.add(this,d,g,f,h,j)})},oneTime:function(d,g,f){return this.each(function(){jQuery.timer.add(this,
d,g,f,1)})},stopTime:function(d,g){return this.each(function(){jQuery.timer.remove(this,d,g)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(d){if(d===L||d===null)return null;var g=this.regex.exec(jQuery.trim(d.toString()));return g[2]?parseInt(g[1],10)*(this.powers[g[2]]||1):d},add:function(d,g,f,h,j,p){var v=0;if(jQuery.isFunction(f)){j||(j=h);h=f;f=g}g=jQuery.timer.timeParse(g);if(!(typeof g!=="number"||
isNaN(g)||g<=0)){if(j&&j.constructor!==Number){p=!!j;j=0}j=j||0;p=p||false;if(!d.$timers)d.$timers={};d.$timers[f]||(d.$timers[f]={});h.$timerID=h.$timerID||this.guid++;var k=function(){if(!(p&&k.inProgress)){k.inProgress=true;if(++v>j&&j!==0||h.call(d,v)===false)jQuery.timer.remove(d,f,h);k.inProgress=false}};k.$timerID=h.$timerID;d.$timers[f][h.$timerID]||(d.$timers[f][h.$timerID]=window.setInterval(k,g));this.global[f]||(this.global[f]=[]);this.global[f].push(d)}},remove:function(d,g,f){var h=
d.$timers,j;if(h){if(g){if(h[g]){if(f){if(f.$timerID){window.clearInterval(h[g][f.$timerID]);delete h[g][f.$timerID]}}else for(var p in h[g])if(h[g].hasOwnProperty(p)){window.clearInterval(h[g][p]);delete h[g][p]}for(j in h[g])if(h[g].hasOwnProperty(j))break;if(!j){j=null;delete h[g]}}}else for(var v in h)h.hasOwnProperty(v)&&this.remove(d,v,f);for(j in h)if(h.hasOwnProperty(j))break;if(!j)d.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",
function(){var d=jQuery.timer.global,g;for(g in d)if(d.hasOwnProperty(g))for(var f=d[g],h=f.length;--h;)jQuery.timer.remove(f[h],g)});(function(d){if(String.prototype.split.toString().match(/\[native/)){var g=String.prototype.split,f=/()??/.exec("")[1]===d,h;h=function(j,p,v){if(Object.prototype.toString.call(p)!=="[object RegExp]")return g.call(j,p,v);var k=[],C=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.extended?"x":"")+(p.sticky?"y":""),y=0,A,z,F;p=RegExp(p.source,C+"g");j+="";f||(A=RegExp("^"+
p.source+"$(?!\\s)",C));for(v=v===d?4294967295:v>>>0;z=p.exec(j);){C=z.index+z[0].length;if(C>y){k.push(j.slice(y,z.index));!f&&z.length>1&&z[0].replace(A,function(){for(var I=1;I<arguments.length-2;I++)if(arguments[I]===d)z[I]=d});z.length>1&&z.index<j.length&&Array.prototype.push.apply(k,z.slice(1));F=z[0].length;y=C;if(k.length>=v)break}p.lastIndex===z.index&&p.lastIndex++}if(y===j.length){if(F||!p.test(""))k.push("")}else k.push(j.slice(y));return k.length>v?k.slice(0,v):k};String.prototype.split=
function(j,p){return h(this,j,p)};return h}})();i.json_stringify=function(d,g){var f="",h;g=g===L?1:g;switch(typeof d){case "function":f+=d;break;case "boolean":f+=d?"true":"false";break;case "object":if(d===null)f+="null";else if(d instanceof Array){f+="[";var j=d.length;for(h=0;h<j-1;++h)f+=i.json_stringify(d[h],g+1);f+=i.json_stringify(d[j-1],g+1)+"]"}else{f+="{";for(j in d)if(d.hasOwnProperty(j))f+='"'+j+'":'+i.json_stringify(d[j],g+1);f+="}"}break;case "string":j=d;var p={"\\\\":"\\\\",'"':'\\"',
"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(h in p)if(p.hasOwnProperty(h))j=j.replace(RegExp(h,"g"),p[h]);f+='"'+j+'"';break;case "number":f+=String(d)}f+=g>1?",":"";if(g===1)f=f.replace(/,([\]}])/g,"$1");return f.replace(/([\[{]),/g,"$1")};i.fn.cmd=function(d){function g(){O.toggleClass("inverted")}function f(){x="(reverse-i-search)`"+F+"': ";l()}function h(b){var t=H.data(),R=RegExp("^"+F),P=t.length;if(b&&I>0)P-=I;for(b=P;b--;)if(R.test(t[b])){I=t.length-b;m=0;k.set(t[b],true);D();break}}
function j(b){var t=b.substring(0,y-A);b=b.substring(y-A);return[t].concat(X(b,y))}function p(){C.focus();k.oneTime(1,function(){k.insert(C.val());C.blur().val("")})}function v(b){if(d.keydown){var t=d.keydown(b);if(t!==L)return t}if(J){if(z&&(b.which===35||b.which===36||b.which===37||b.which===38||b.which===39||b.which===40||b.which===66||b.which===13||b.which===27)){x=M;z=false;I=null;F="";l();if(b.which===27)o="";D();v.call(this,b)}else if(b.altKey){if(b.which===68){k.set(o.slice(0,m)+o.slice(m).replace(/[^ ]+ |[^ ]+$/,
""),true);return false}return true}else if(b.keyCode===13){if(H&&o&&(d.historyFilter&&d.historyFilter(o)||!d.historyFilter))H.data().slice(-1)[0]!==o&&H.append(o);H.last();b=o;k.set("");d.commands&&d.commands(b);typeof x==="function"&&l()}else if(b.which===32)if(z){F+=" ";f()}else k.insert(" ");else if(b.which===8)if(z){F=F.slice(0,-1);f()}else{if(o!==""&&m>0){o=o.slice(0,m-1)+o.slice(m,o.length);--m;D()}}else if(b.which===9&&!(b.ctrlKey||b.altKey))k.insert("\t");else if(b.which===46){if(o!==""&&
m<o.length){o=o.slice(0,m)+o.slice(m+1,o.length);D()}return true}else if(H&&b.which===38||b.which===80&&b.ctrlKey)k.set(H.previous());else if(H&&b.which===40||b.which===78&&b.ctrlKey)k.set(H.next());else if(b.which===37||b.which===66&&b.ctrlKey)if(b.ctrlKey&&b.which!==66){t=m-1;b=0;for(o[t]===" "&&--t;t>0;--t)if(o[t]===" "&&o[t+1]!==" "){b=t+1;break}else if(o[t]==="\n"&&o[t+1]!=="\n"){b=t;break}k.position(b)}else{if(m>0){--m;D()}}else if(b.which===82&&b.ctrlKey)if(z)h(true);else{M=x;f();V=o;o="";
D();z=true}else if(b.which==71&&b.ctrlKey){if(z){x=M;l();o=V;D();z=false}}else if(b.which===39||b.which===70&&b.ctrlKey)if(b.ctrlKey&&b.which!==70){o[m]===" "&&++m;b=o.slice(m).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!b||b[0].match(/^\s+$/))m=o.length;else if(b[0][0]!==" ")m+=b.index+1;else{m+=b.index+b[0].length-1;b[0][b[0].length-1]!==" "&&--m}D()}else{if(m<o.length){++m;D()}}else if(b.which===123)return true;else if(b.which===36)k.position(0);else if(b.which===35)k.position(o.length);else if(b.shiftKey&&
b.which==45){p();return true}else if(b.ctrlKey||b.metaKey)if(b.shiftKey){if(b.which===84)return true}else if(b.which===87){if(o!==""){b=o.slice(0,m);t=o.slice(m+1);var R=b.match(/([^ ]+ *$)/);m=b.length-R[0].length;o=b.slice(0,m)+t;D()}}else if(b.which===72){if(o!==""&&m>0){o=o.slice(0,--m);if(m<o.length-1)o+=o.slice(m);D()}}else if(b.which===65)k.position(0);else if(b.which===69)k.position(o.length);else if(b.which===88||b.which===67||b.which===84)return true;else if(b.which===86){p();return true}else if(b.which===
75)if(m===0)k.set("");else m!==o.length&&k.set(o.slice(0,m));else{if(b.which===85){k.set(o.slice(m,o.length));k.position(0)}}else return true;return false}}var k=this;k.addClass("cmd");k.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var C=i("<textarea/>").addClass("clipboard").appendTo(k);d.width&&k.width(d.width);var y,A,z=false,F="",I=null,M,G=d.mask||false,o="",m=0,x,J=d.enabled,c=d.historySize||60,Q,H,O=k.find(".cursor"),D=function(b){function t(w,
r){if(r===w.length){N.html(i.terminal.encode(w));O.html("&nbsp;");S.html("")}else if(r===0){N.html("");O.html(i.terminal.encode(w.slice(0,1)));S.html(i.terminal.encode(w.slice(1)))}else{var q=i.terminal.encode(w.slice(0,r));N.html(q);q=w.slice(r,r+1);O.html(q===" "?"&nbsp;":i.terminal.encode(q));r===w.length-1?S.html(""):S.html(i.terminal.encode(w.slice(r+1)))}}function R(w){return"<div>"+i.terminal.encode(w)+"</div>"}function P(w){var r=S;i.each(w,function(q,a){r=i(R(a)).insertAfter(r).addClass("clear")})}
function W(w){i.each(w,function(r,q){N.before(R(q))})}var N=O.prev(),S=O.next();return function(){var w=G?o.replace(/./g,"*"):o,r,q;b.find("div").remove();N.html("");if(w.length>y-A-1||w.match(/\n/)){var a,e=w.match(/\t/g),n=e?e.length*3:0;if(e)w=w.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(w.match(/\n/)){var s=w.split("\n");q=y-A-1;for(r=0;r<s.length-1;++r)s[r]+=" ";if(s[0].length>q){a=[s[0].substring(0,q)];a=a.concat(X(s[0].substring(q),y))}else a=[s[0]];for(r=1;r<s.length;++r)if(s[r].length>
y)a=a.concat(X(s[r],y));else a.push(s[r])}else a=j(w);if(e)a=i.map(a,function(E){return E.replace(/\x00\x00\x00\x00/g,"\t")});q=a[0].length;if(m<q){t(a[0],m);P(a.slice(1))}else if(m===q){N.before(R(a[0]));t(a[1],0);P(a.slice(2))}else{r=a.length;if(m<q){t(a[0],m);P(a.slice(1))}else if(m===q){N.before(R(a[0]));t(a[1],0);P(a.slice(2))}else{e=a.slice(-1)[0];s=w.length-m;var u=e.length;w=0;if(s<=u){W(a.slice(0,-1));t(e,(u===s?0:u-s)+n)}else if(r===3){N.before("<div>"+i.terminal.encode(a[0])+"</div>");
t(a[1],m-q-1);S.after('<div class="clear">'+i.terminal.encode(a[2])+"</div>")}else{w=m;for(r=0;r<a.length;++r){q=a[r].length;if(w>q)w-=q;else break}q=a[r];n=r;if(w===q.length){w=0;q=a[++n]}t(q,w);W(a.slice(0,n));P(a.slice(n+1))}}}}else if(w===""){N.html("");O.html("&nbsp;");S.html("")}else t(w,m)}}(k),V,l=function(){var b=k.find(".prompt");return function(){if(typeof x==="string"){A=ca(x);b.html(i.terminal.format(x))}else x(function(t){A=ca(t);b.html(i.terminal.format(t))})}}();i.extend(k,{name:function(b){if(b!==
L){Q=b;H=new ka(b,c)}else return Q},history:function(){return H},set:function(b,t){if(b!==L){o=b;if(!t)m=o.length;D();if(typeof d.onCommandChange==="function")d.onCommandChange(o)}},insert:function(b,t){if(m===o.length)o+=b;else o=m===0?b+o:o.slice(0,m)+b+o.slice(m);t||(m+=b.length);D();if(typeof d.onCommandChange==="function")d.onCommandChange(o)},get:function(){return o},commands:function(b){if(b)d.commands=b;else return b},destroy:function(){i(document.documentElement).unbind(".commandline");k.find(".prompt").remove()},
prompt:function(b){if(b===L)return x;else{if(typeof b==="string"||typeof b==="function")x=b;else throw"prompt must be a function or string";l();D()}},position:function(b){if(typeof b==="number"){m=b<0?0:b>o.length?o.length:b;D()}else return m},visible:function(){var b=k.visible;return function(){b.apply(k,[]);D();l()}}(),show:function(){var b=k.show;return function(){b.apply(k,[]);D();l()}}(),resize:function(b){if(b)y=b;else{b=k.width();var t=O.innerWidth();y=Math.floor(b/t)}D()},enable:function(){if(!J){O.addClass("inverted");
k.everyTime(500,"blink",g);J=true}},isenabled:function(){return J},disable:function(){if(J){k.stopTime("blink",g);O.removeClass("inverted");J=false}},mask:function(b){if(typeof b==="boolean"){G=b;D()}else return G}});k.name(d.name||"");x=d.prompt||"> ";l();if(d.enabled===L||d.enabled===true)k.enable();i(document.documentElement||window).keypress(function(b){var t;if(b.ctrlKey&&b.which===99)return true;if(!z&&d.keypress)t=d.keypress(b);if(t===L||t){if(J)if(i.inArray(b.which,[38,32,13,0,8])>-1&&b.keyCode!==
123&&!(b.which===38&&b.shiftKey))return false;else if(!b.ctrlKey&&!(b.altKey&&b.which===100)){if(z){F+=String.fromCharCode(b.which);f();h()}else k.insert(String.fromCharCode(b.which));return false}else if(b.altKey)if(z){F+=String.fromCharCode(b.which);f();h()}else k.insert(String.fromCharCode(b.which))}else return t}).keydown(v);return k};var la=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,Y=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
Y=/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;var da=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ma=/(https?:((?!&[^;]+;)[^\s:"'<)])+)/g,na=/((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;i.terminal={split_equal:function(d,g){for(var f=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,h=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,
j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,p=false,v=false,k="",C=[],y=d.replace(f,function(J,c,Q){J=c.match(/;/g).length;return"[["+c+(J==2?";;":J==3?";":"")+Q.replace(/\\\]/g,"&#93;")+"]"+Q+"]"}).split(/\n/g),A=0,z=y.length;A<z;++A){if(k!=="")if(y[A]===""){C.push(k+"]");continue}else{y[A]=k+y[A];k=""}else if(y[A]===""){C.push("");continue}for(var F=y[A],I=0,M=0,G=0,o=F.length;G<o;++G){if(F[G]==="["&&F[G+1]==="[")p=true;else if(p&&F[G]==="]")if(v)v=p=false;else v=true;else if(p&&v||!p)if(F[G]==="&"){var m=
F.substring(G).match(/^(&[^;]+;)/);if(!m)throw"Unclosed html entity at char "+G;G+=m[0].length-1;++M;continue}else if(F[G]==="]"&&F[G-1]==="\\")--M;else++M;if(M===g||G===o-1){m=F.substring(I,G+1);if(k){m=k+m;if(m.match("]"))k=""}I=G+1;M=0;var x=m.match(f);if(x){x=x[x.length-1];if(x[x.length-1]!=="]"){k=x.match(h)[1];m+="]"}else if(m.match(j)){m=m.replace(j,"");k=x.match(h)[1]}}C.push(m)}}}return C},encode:function(d){return d.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,
"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(d){if(typeof d==="string"){d=i.terminal.encode(i.terminal.from_ansi(d));var g=d.split(la);if(g&&g.length>1)d=i.map(g,function(f){return f===""?f:f.substring(0,1)==="["?f.replace(Y,function(h,j,p,v,k,C,y){if(y==="")return"<span>&nbsp;</span>";y=y.replace(/\\]/g,"]");h="";if(j.indexOf("b")!==-1)h+="font-weight:bold;";var A="text-decoration:";if(j.indexOf("u")!==-1)A+="underline ";if(j.indexOf("s")!==
-1)A+="line-through";if(j.indexOf("s")!==-1||j.indexOf("u")!==-1)h+=A+";";if(j.indexOf("i")!==-1)h+="font-style:italic;";if(p.match(da)){h+="color:"+p+";";if(j.indexOf("g")!==-1)h+="text-shadow: 0 0 5px "+p+";"}if(v.match(da))h+="background-color:"+v;return'<span style="'+h+'"'+(k!==""?' class="'+k+'"':"")+' data-text="'+(C===""?y:C).replace('"',"&quote;")+'">'+y+"</span>"}):"<span>"+f+"</span>"}).join("");return d.replace(ma,function(f){var h=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+
f+'">'+f+"</a>"+(h?".":"")}).replace(na,'<a href="mailto:$1">$1</a>').replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(d){return d.replace(Y,"$6")},active:function(){return T.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function d(h){var j=
h.split(";"),p;h=[];var v="",k="",C;for(C in j){p=parseInt(j[C],10);p===1&&h.push("b");p===4&&h.push("u");if(f[p])k=f[p];if(g[p])v=g[p]}p=j=i.terminal.ansi_colors.normal;for(C=h.length;C--;)if(h[C]=="b"){if(v=="")v="white";p=i.terminal.ansi_colors.bold;break}return"[["+[h.join(""),p[v],j[k]].join(";")+"]"}var g={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},f={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(h){var j=
h.split(/(\[[0-9;]*m)/g);if(j.length==1)return h;h=[];if(j.length>3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var p=false,v=0;v<j.length;++v){var k=j[v].match(/^\[([0-9;]*)m$/);if(k){if(k[1]!="")if(p){h.push("]");if(k[1]=="0")p=false;else h.push(d(k[1]))}else{p=true;h.push(d(k[1]))}}else h.push(j[v])}p&&h.push("]");return h.join("")}}()};i.fn.visible=function(){return this.css("visibility","visible")};i.fn.hidden=function(){return this.css("visibility","hidden")};i.jrpc=function(d,g,f,h,j,p){g=
i.json_stringify({jsonrpc:"2.0",method:f,params:h,id:g});return i.ajax({url:d,data:g,success:j,error:p,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};U=/ {13}$/;var oa=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __",
"     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(U,"")+"version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __",
"     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(U,"")+"version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],Z=[],T=new function(d){var g=
d?[d]:[],f=0;i.extend(this,{rotate:function(){if(g.length===1)return g[0];else{if(f===g.length-1)f=0;else++f;return g[f]}},length:function(){return g.length},set:function(h){for(var j=g.length;j--;)if(g[j]===h){f=j;return}this.append(h)},front:function(){return g[f]},append:function(h){g.push(h)}})};i.fn.terminal=function(d,g){function f(){return c.get(0).scrollHeight>c.innerHeight()}function h(){var a=c.find(".cursor").width(),e=Math.floor(c.width()/a);if(f()){var n=c.innerWidth()-c.width();e-=Math.ceil((20-
n/2)/(a-1))}return e}function j(a,e){if(l.displayExceptions){c.error("&#91;"+e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){c.pause();i.get(a.fileName,function(n){c.resume();var s=a.lineNumber-1;(n=n.split("\n")[s])&&c.error("&#91;"+a.lineNumber+"&#93;: "+n)})}a.stack&&c.error(a.stack)}}function p(){var a=x.prop?x.prop("scrollHeight"):x.attr("scrollHeight");x.scrollTop(a)}function v(a,e){try{if(typeof e==="function")e(function(){});
else if(typeof e!=="string")throw a+" must be string or function";}catch(n){j(n,a.toUpperCase());return false}return true}function k(a){a=typeof a==="string"?a:String(a);var e,n;if(a.length>D){var s=i.terminal.split_equal(a,D);a=i("<div></div>");e=0;for(n=s.length;e<n;++e)s[e]===""||s[e]==="\r"?a.append("<div>&nbsp;</div>"):i("<div/>").html(i.terminal.format(s[e])).appendTo(a)}else a=i("<div/>").html("<div>"+i.terminal.format(a)+"</div>");H.append(a);a.width("100%");p();return a}function C(){if(g.greetings===
L)c.echo(c.signature);else g.greetings&&c.echo(g.greetings)}function y(a,e){var n=1,s=function(u,E){e.pause();i.jrpc(a,n++,u,E,function(B){if(B.error)e.error("&#91;RPC&#93; "+B.error.message);else if(typeof B.result==="string")e.echo(B.result);else if(B.result instanceof Array)e.echo(i.map(B.result,function(K){return i.json_stringify(K)}).join(" "));else typeof B.result==="object"&&e.echo(i.json_stringify(B.result));e.resume()},function(B,K){K!=="abort"&&e.error("&#91;AJAX&#93; "+K+" - Server reponse is: \n"+
B.responseText);e.resume()})};return function(u,E){if(u!==""){var B,K;if(u.match(/[^ ]* /)){u=u.split(/ +/);B=u[0];K=u.slice(1)}else{B=u;K=[]}if(!l.login||B==="help")s(B,K);else{var $=E.token();$?s(B,[$].concat(K)):E.error("&#91;AUTH&#93; Access denied (no token)")}}}}function A(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var e=q.prompt();if(q.mask())a=a.replace(/./g,"*");typeof e==="function"?e(function(n){c.echo(n+a)}):c.echo(e+a)}function z(a,e){try{var n=r.top();if(a==="exit"&&l.exit)if(r.size()===
1)if(l.login)I();else{e||A(a);c.echo("You can't exit from main interpeter")}else c.pop("exit");else{e||A(a);a==="clear"&&l.clear?c.clear():n.eval(a,c)}}catch(s){j(s,"USER");c.resume();throw s;}}function F(){var a=null;q.prompt("login: ");l.history&&q.history().disable();q.commands(function(e){try{A(e);if(a){q.mask(false);c.pause();if(typeof l.login!=="function")throw"Value of login property must be a function";l.login(a,e,function(s){if(s){var u=l.name;u=u?"_"+u:"";i.Storage.set("token"+u,s);i.Storage.set("login"+
u,a);q.commands(z);G()}else{c.error("Wrong password try again");q.prompt("login: ");a=null}c.resume();l.history&&q.history().enable()},c)}else{a=e;q.prompt("password: ");q.mask(true)}}catch(n){j(n,"LOGIN",c);throw n;}})}function I(){if(typeof l.onBeforelogout==="function")try{if(l.onBeforelogout(c)==false)return}catch(a){j(a,"onBeforelogout");throw a;}var e=l.name;e=e?"_"+e:"";i.Storage.remove("token"+e,null);i.Storage.remove("login"+e,null);l.history&&q.history().disable();F();if(typeof l.onAfterlogout===
"function")try{l.onAfterlogout(c)}catch(n){j(n,"onAfterlogout");throw n;}}function M(){var a=r.top(),e="";if(a.name!==L&&a.name!=="")e+=a.name+"_";e+=O;q.name(e);typeof a.prompt=="function"?q.prompt(function(n){a.prompt(n,c)}):q.prompt(a.prompt);l.history&&q.history().enable();q.set("");if(typeof a.onStart==="function")a.onStart(c)}function G(){M();C();if(typeof l.onInit==="function")try{l.onInit(c)}catch(a){j(a,"OnInit");throw a;}}function o(a){var e;c.oneTime(10,function(){W()});if(l.keydown){var n=
l.keydown(a,c);if(n!==L)return n}if(c.paused()){if(a.which===68&&a.ctrlKey){for(e=Z.length;e--;){a=Z[e];if(4!==a.readyState)try{a.abort()}catch(s){c.error("error in aborting ajax")}}c.resume();return false}}else{if(a.which!==9)J=0;if(a.which===68&&a.ctrlKey){if(q.get()==="")if(r.size()>1||l.login!==L)c.pop("");else{c.resume();c.echo("")}else c.set_command("");return false}else if(l.tabcompletion&&a.which===9){++J;var u=q.get().substring(0,q.position());a=u.split(" ");if(a.length==1)n=a[0];else{n=
a[a.length-1];for(e=a.length-1;e>0;e--)if(a[e-1][a[e-1].length-1]=="\\")n=a[e-1]+" "+n;else break}var E=RegExp("^"+n);r.top().completion(c,n,function(B){var K=[];for(e=B.length;e--;)E.test(B[e])&&K.push(B[e]);if(K.length===1)c.insert(K[0].replace(E,""));else if(K.length>1)if(J>=2){A(u);c.echo(K.join("\t"));J=0}});return false}else if(a.which===86&&a.ctrlKey)c.oneTime(1,function(){p()});else if(a.which===9&&a.ctrlKey){T.length()>1&&c.focus(false);return false}else if(a.which===34)c.scroll(c.height());
else a.which===33?c.scroll(-c.height()):c.attr({scrollTop:c.attr("scrollHeight")})}}function m(a){return function(e){if(e!==""){e=e.split(/ +/);var n=e[0];e=e.slice(1);var s=a[n],u=i.type(s);if(u==="function")s.apply(c,e);else if(u==="object"||u==="string"){var E=[];if(u==="object"){for(var B in s)s.hasOwnProperty(B)&&E.push(B);s=m(s)}c.push(s,{prompt:n+"> ",name:n,completion:function(K,$,pa){pa(E)}})}else c.error("Command '"+n+"' Not Found")}}}var x,J=0;if(this.length>1)return this.each(function(){i.fn.terminal.call(i(this),
d,g)});else{var c=this,Q=[],H,O=T.length(),D,V=[],l=i.extend({name:c.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,historyFilter:null,onInit:i.noop,onClear:i.noop,onBlur:i.noop,onFocus:i.noop,onTerminalChange:i.noop,onExit:i.noop,keypress:i.noop,keydown:i.noop},g||{});l.width&&c.width(l.width);l.height&&c.height(l.height);x=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&
c[0].tagName.toLowerCase()=="body"?i("html"):c;var b=!l.enabled;if(c.length===0)throw'Sorry, but terminal said that "'+c.selector+'" is not valid selector!';c.ajaxSend(function(a,e){Z.push(e)});if(c.data("terminal"))return c.data("terminal");H=i("<div>").addClass("terminal-output").appendTo(c);c.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch){c.click(function(){c.find("textarea").focus()});c.find("textarea").focus()}var t,
R,P=[];i.extend(c,i.omap({clear:function(){H.html("");q.set("");Q=[];try{l.onClear(c)}catch(a){j(a,"onClear");throw a;}c.attr({scrollTop:0});return c},exec:function(a,e){b?P.push([a,e]):z(a,e);return c},commands:function(){return r.top().eval},greetings:function(){C();return c},paused:function(){return b},pause:function(){if(q){b=true;c.disable();q.hidden()}return c},resume:function(){if(q){c.enable();var a=P;for(P=[];a.length;){var e=a.shift();c.exec.apply(c,e)}q.visible();p()}return c},cols:function(){return D},
rows:function(){return Q.length},history:function(){return q.history()},next:function(){if(T.length()===1)return c;else{var a=c.offset().top;c.height();c.scrollTop();var e=c,n=i(window).scrollTop(),s=n+i(window).height(),u=i(e).offset().top;if(u+i(e).height()>=n&&u<=s){T.front().disable();a=T.rotate().enable();e=a.offset().top-50;i("html,body").animate({scrollTop:e},500);try{l.onTerminalChange(a)}catch(E){j(E,"onTerminalChange");throw E;}return a}else{c.enable();i("html,body").animate({scrollTop:a-
50},500);return c}}},focus:function(a,e){c.oneTime(1,function(){if(T.length()===1)if(a===false)try{!e&&l.onBlur(c)!==false&&c.disable()}catch(n){j(n,"onBlur");throw n;}else try{!e&&l.onFocus(c)!==false&&c.enable()}catch(s){j(s,"onFocus");throw s;}else if(a===false)c.next();else{var u=T.front();if(u!=c){u.disable();if(!e)try{l.onTerminalChange(c)}catch(E){j(E,"onTerminalChange");throw E;}}T.set(c);c.enable()}});return c},enable:function(){D===L&&c.resize();if(b)if(q){q.enable();b=false}return c},disable:function(){if(q){b=
true;q.disable()}return c},enabled:function(){return b},signature:function(){var a=c.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?oa[a].join("\n")+"\n":""},version:function(){return"0.5.4"},get_command:function(){return q.get()},insert:function(a){if(typeof a==="string"){q.insert(a);return c}else throw"insert function argument is not a string";},set_prompt:function(a){if(v("prompt",a)){typeof a=="function"?q.prompt(function(e){a(e,c)}):q.prompt(a);r.top().prompt=a}return c},get_prompt:function(){return r.top().prompt},
set_command:function(a){q.set(a);return c},set_mask:function(a){q.mask(a);return c},get_output:function(a){return a?Q:i.map(Q,function(e,n){return typeof n=="function"?n():n}).join("\n")},resize:function(a,e){if(a&&e){c.width(a);c.height(e)}a=c.width();e=c.height();if(R!==e||t!==a){R=e;t=a;D=h();q.resize(D);var n=H.detach();H.html("");i.each(Q,function(s,u){k(u&&typeof u=="function"?u():u)});c.prepend(n);p()}return c},echo:function(a){Q.push(a);k(typeof a==="function"?a():a);W();return c},error:function(a){return c.echo("[[;#f00;]"+
a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var e;a=Math.round(a);if(x.prop){a>x.prop("scrollTop")&&a>0&&x.prop("scrollTop",0);e=x.prop("scrollTop")}else{a>x.attr("scrollTop")&&a>0&&x.attr("scrollTop",0);e=x.attr("scrollTop")}x.scrollTop(e+a);return c},logout:l.login?function(){for(;r.size()>1;)r.pop();I();return c}:function(){throw"You don't have login function";},token:l.login?function(){var a=l.name;return i.Storage.get("token"+(a?"_"+a:""))}:i.noop,login_name:l.login?
function(){var a=l.name;return i.Storage.get("login"+(a?"_"+a:""))}:i.noop,name:function(){return r.top().name},push:function(a,e){if(e&&(!e.prompt||v("prompt",e.prompt))||!e){r.top().mask=q.mask();if(i.type(a)==="string")a=y(a,c);else if(i.type(a)==="object"){var n=[],s;for(s in a)n.push(s);a=m(a);e=e||{};e.completion=function(u,E,B){B(n)}}else if(i.type(a)!="function")throw"Invalid value as eval in push command";r.push(i.extend({eval:a},e));M()}return c},pop:function(a){a!==L&&A(a);if(r.top().name===
l.name){if(l.login){I();if(typeof l.onExit==="function")try{l.onExit(c)}catch(e){j(e,"onExit");throw e;}}}else{a=r.pop();M();if(typeof a.onExit==="function")try{a.onExit(c)}catch(n){j(n,"onExit");throw n;}c.set_mask(r.top().mask)}return c},level:function(){return r.size()},reset:function(){for(c.clear();r.size()>1;)r.pop();G()}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(n){j(n,"TERMINAL")}}}));var W=function(){var a=f();return function(){if(a!==
f()){c.resize();a=f()}}}(),N;if(l.login&&typeof l.onBeforeLogin==="function")try{l.onBeforeLogin(c)}catch(S){j(S,"onBeforeLogin");throw S;}if(typeof d=="string"){N=d;d=y(d,c)}else if(typeof d=="object"&&d.constructor===Array)throw"You can't use array as eval";else if(typeof d==="object"){for(var w in d)d.hasOwnProperty(w)&&V.push(w);d=m(d)}else if(typeof d!=="function")throw'Unknow object "'+String(d)+'" passed as eval';if(N&&(typeof l.login==="string"||l.login))l.login=function(a){var e=1;return function(n,
s,u){c.pause();i.jrpc(N,e++,a,[n,s],function(E){c.resume();!E.error&&E.result?u(E.result):u(null)},function(E,B){c.resume();c.error("&#91;AJAX&#92; Response: "+B+"\n"+E.responseText)})}}(typeof l.login==="boolean"?"login":l.login);if(v("prompt",l.prompt)){var r=new ja({name:l.name,eval:d,prompt:l.prompt,completion:l.completion?l.completion:function(a,e,n){n(V)},greetings:l.greetings}),q=c.find(".terminal-output").next().cmd({prompt:l.prompt,history:l.history,historyFilter:l.historyFilter,historySize:l.historySize,
width:"100%",keydown:o,keypress:l.keypress?function(a){return l.keypress(a,c)}:null,onCommandChange:function(a){if(typeof l.onCommandChange==="function")try{l.onCommandChange(a,c)}catch(e){j(e,"onCommandChange");throw e;}p()},commands:z});T.append(c);l.enabled===true?c.focus(L,true):c.disable();i(document).click(function(a){!i(a.target).parents().hasClass("terminal")&&l.onBlur(c)!==false&&c.disable()});i(window).resize(c.resize);c.click(function(){c.focus()});g.login&&c.token&&!c.token()&&c.login_name&&
!c.login_name()?F():G();typeof i.fn.init.prototype.mousewheel==="function"&&c.mousewheel(function(a,e){e>0?c.scroll(-40):c.scroll(40);return false},true)}c.data("terminal",c);return c}}})(jQuery);

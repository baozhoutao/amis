;/*!node_modules/ooxml-viewer/lib/OpenXML.js*/
amis.define("node_modules/ooxml-viewer/lib/OpenXML",(function(e,t,r,n){"use strict";function u(e){return e.getAttribute("w:val")||e.getAttribute("w14:val")||e.getAttribute("val")||""}function o(e,t){if(void 0===t&&(t=!1),"boolean"==typeof e)return e;if("string"==typeof e){switch(e){case"1":case"on":case"true":return!0;case"0":case"off":case"false":return!1}if("number"==typeof e)return 0!==e}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getAttrBoolean=function(e,t,r){return void 0===r&&(r=!0),o(e.getAttribute(t),r)},t.getAttrNumber=function(e,t,r){void 0===r&&(r=0);var n=e.getAttribute(t);return n?parseInt(n,10):r},t.getAttrPercentage=function(e,t){var r=e.getAttribute(t);return r?r.endsWith("%")?parseInt(r,10)/100:parseInt(r,10)/1e5:1},t.getVal=u,t.getValBoolean=function(e,t){return void 0===t&&(t=!0),o(u(e),t)},t.getValHex=function(e){return parseInt(u(e)||"0",16)},t.getValNumber=function(e){return parseInt(u(e),10)},t.normalizeBoolean=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Font.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Font",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/OpenXML");var l=function(){function e(){}return e.fromXML=function(a,t){var r,l,s=new e;s.name=t.getAttribute("w:name")||"";try{for(var c=n.__values(t.children),i=c.next();!i.done;i=c.next()){var u=i.value,d=u.tagName;switch(d){case"w:family":s.family=o.getVal(u);break;case"w:altName":s.altName=o.getVal(u);break;case"w:panose1":case"w:charset":case"w:sig":case"w:pitch":break;case"w:embedRegular":case"w:embedBold":case"w:embedItalic":case"w:embedBoldItalic":case"w:embedSystemFonts":case"w:embedTrueTypeFonts":var w=u.getAttribute("r:id")||"",m=u.getAttribute("w:fontKey")||"",b=a.loadFont(w,m);b&&(s.url=b);break;default:console.warn("parse Font: Unknown key",d,u)}}}catch(e){r={error:e}}finally{try{i&&!i.done&&(l=c.return)&&l.call(c)}finally{if(r)throw r.error}}return s},e}();a.Font=l,a.deobfuscate=function(e,a){for(var t=a.replace(/{|}|-/g,""),r=new Array(16),n=0;n<16;n++)r[16-n-1]=parseInt(t.substr(2*n,2),16);for(n=0;n<32;n++)e[n]=e[n]^r[n%16];return e}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/FontTable.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/FontTable",(function(e,o,n,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/Font"),i=function(){function e(){this.fonts=[]}return e.fromXML=function(o,n){var r,i,a=Array.from(n.getElementsByTagName("w:font")),f=new e;try{for(var u=t.__values(a),s=u.next();!s.done;s=u.next()){var d=s.value,m=l.Font.fromXML(o,d);f.fonts.push(m)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(i=u.return)&&i.call(u)}finally{if(r)throw r.error}}return f},e}();o.FontTable=i}));
;/*!node_modules/ooxml-viewer/lib/parse/parseRelationship.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseRelationship",(function(e,t,r,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib");function n(e,t){return{id:e.getAttribute("Id")||"",type:e.getAttribute("Type")||"",target:e.getAttribute("Target")||"",targetMode:e.getAttribute("TargetMode")||"",part:t}}t.parseRelationship=n,t.parseRelationships=function(e,t){var r,i,o={},l=e.getElementsByTagName("Relationship");try{for(var s=a.__values(l),u=s.next();!u.done;u=s.next()){var d=n(u.value,t);o[d.id]=d}}catch(e){r={error:e}}finally{try{u&&!u.done&&(i=s.return)&&i.call(s)}finally{if(r)throw r.error}}return o}}));
;/*!node_modules/ooxml-viewer/lib/openxml/ContentType.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/ContentType",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib");t.parseContentType=function(e){var t,r,n={overrides:[]},l=[].slice.call(e.getElementsByTagName("Override"));try{for(var a=o.__values(l),i=a.next();!i.done;i=a.next()){var s=i.value;n.overrides.push({partName:s.getAttribute("PartName"),contentType:s.getAttribute("ContentType")})}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return n}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseSize.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseSize",(function(e,t,n,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={Dxa:{mul:.066665,unit:"px"},Emu:{mul:1.3333/12700,unit:"px"},FontSize:{mul:.66665,unit:"px"},Border:{mul:.1666625,unit:"px"},Point:{mul:1.3333,unit:"px"},Percent:{mul:.02,unit:"%"},LineHeight:{mul:1/240,unit:""},VmlEmu:{mul:1/12700,unit:""}};function r(e,t){return void 0===t&&(t=i.Dxa),null==e||/.+(p[xt]|[%])$/.test(e)?e:"".concat((parseInt(e)*t.mul).toFixed(2)).concat(t.unit)}t.LengthUsage=i,t.convertAngle=function(e){return e?parseInt(e)/6e4:0},t.convertLength=r,t.parseSize=function(e,t,n){void 0===n&&(n=i.Dxa);var u=e.getAttribute(t);return u?r(String(u),n):""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseCellMargin.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseCellMargin",(function(e,a,r,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/parse/parseSize");a.parseCellMargin=function(e,a){var r,i;try{for(var l=t.__values(e.children),o=l.next();!o.done;o=l.next()){var n=o.value;switch(n.tagName){case"w:left":case"w:start":a["padding-left"]=s.parseSize(n,"w:w");break;case"w:right":case"w:end":a["padding-right"]=s.parseSize(n,"w:w");break;case"w:top":a["padding-top"]=s.parseSize(n,"w:w");break;case"w:bottom":a["padding-bottom"]=s.parseSize(n,"w:w")}}}catch(e){r={error:e}}finally{try{o&&!o.done&&(i=l.return)&&i.call(l)}finally{if(r)throw r.error}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/colorNameMap.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/colorNameMap",(function(e,f,a,d){"use strict";Object.defineProperty(f,"__esModule",{value:!0});f.colorNameMap={aliceBlue:"#f0f8ff",antiqueWhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedAlmond:"#ffebcd",blue:"#0000ff",blueViolet:"#8a2be2",brown:"#a52a2a",burlyWood:"#deb887",cadetBlue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerBlue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00FFFF",darkBlue:"#00008B",darkCyan:"#008B8B",darkGoldenRod:"#b8860b",darkGray:"#A9A9A9",darkGreen:"#006400",darkGrey:"#a9a9a9",darkKhaki:"#bdb76b",darkMagenta:"#800080",darkOliveGreen:"#556b2f",darkOrange:"#ff8c00",darkOrchid:"#9932cc",darkRed:"#8B0000",darkSalmon:"#e9967a",darkSeaGreen:"#8fbc8f",darkSlateBlue:"#483d8b",darkSlateGray:"#2f4f4f",darkSlateGrey:"#2f4f4f",darkTurquoise:"#00ced1",darkViolet:"#9400d3",darkYellow:"#808000",deepPink:"#ff1493",deepSkyBlue:"#00bfff",dimGray:"#696969",dimGrey:"#696969",dodgerBlue:"#1e90ff",fireBrick:"#b22222",floralWhite:"#fffaf0",forestGreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostWhite:"#f8f8ff",gold:"#ffd700",goldenRod:"#daa520",gray:"#808080",green:"#008000",greenYellow:"#adff2f",grey:"#808080",honeyDew:"#f0fff0",hotPink:"#ff69b4",indianRed:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderBlush:"#fff0f5",lawnGreen:"#7cfc00",lemonChiffon:"#fffacd",lightBlue:"#add8e6",lightCoral:"#f08080",lightCyan:"#e0ffff",lightGoldenRodYellow:"#fafad2",lightGray:"#D3D3D3",lightGreen:"#90ee90",lightGrey:"#d3d3d3",lightPink:"#ffb6c1",lightSalmon:"#ffa07a",lightSeaGreen:"#20b2aa",lightSkyBlue:"#87cefa",lightSlateGray:"#778899",lightSlateGrey:"#778899",lightSteelBlue:"#b0c4de",lightYellow:"#ffffe0",lime:"#00ff00",limeGreen:"#32cd32",linen:"#faf0e6",magenta:"#FF00FF",maroon:"#800000",mediumAquaMarine:"#66cdaa",mediumBlue:"#0000cd",mediumOrchid:"#ba55d3",mediumPurple:"#9370db",mediumSeaGreen:"#3cb371",mediumSlateBlue:"#7b68ee",mediumSpringGreen:"#00fa9a",mediumTurquoise:"#48d1cc",mediumVioletRed:"#c71585",midnightBlue:"#191970",mintCream:"#f5fffa",mistyRose:"#ffe4e1",moccasin:"#ffe4b5",navajoWhite:"#ffdead",navy:"#000080",none:"transparent",oldLace:"#fdf5e6",olive:"#808000",oliveDrab:"#6b8e23",orange:"#ffa500",orangeRed:"#ff4500",orchid:"#da70d6",paleGoldenRod:"#eee8aa",paleGreen:"#98fb98",paleTurquoise:"#afeeee",paleVioletRed:"#db7093",papayaWhip:"#ffefd5",peachPuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderBlue:"#b0e0e6",purple:"#800080",rebeccaPurple:"#663399",red:"#ff0000",rosyBrown:"#bc8f8f",royalBlue:"#4169e1",saddleBrown:"#8b4513",salmon:"#fa8072",sandyBrown:"#f4a460",seaGreen:"#2e8b57",seaShell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyBlue:"#87ceeb",slateBlue:"#6a5acd",slateGray:"#708090",slateGrey:"#708090",snow:"#fffafa",springGreen:"#00ff7f",steelBlue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whiteSmoke:"#f5f5f5",yellow:"#ffff00",yellowGreen:"#9acd32"}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseColor.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseColor",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/ooxml-viewer/lib/OpenXML"),a=e("node_modules/ooxml-viewer/lib/parse/colorNameMap"),o=["black","blue","green","red","white","yellow"];function s(e,r,t,c){void 0===t&&(t="w:color"),void 0===c&&(c="black");var n=r.getAttribute(t);if(n)return"auto"==n?c:o.includes(n)?n:n in a.colorNameMap?a.colorNameMap[n]:"#".concat(n);var s=r.getAttribute("w:themeColor");return s?e.getThemeColor(s):""}function u(e,r){"FFFFFF"===e&&(e="000000");var t=parseInt(e.substring(0,2),16),c=parseInt(e.substring(2,4),16),n=parseInt(e.substring(4,6),16);return"rgba(".concat(t,", ").concat(c,", ").concat(n,", ").concat(r,")")}r.cssColors=o,r.parseColor=function(e,r){return s(e,r,"w:val")},r.parseColorAttr=s,r.parseShdColor=function(e,r){var t=r.getAttribute("w:fill")||"",c=n.getVal(r);if("auto"===t&&(t="FFFFFF"),6===t.length)switch(c){case"clear":return"#".concat(t);case"pct10":return u(t,.1);case"pct12":return u(t,.125);case"pct15":return u(t,.15);case"pct20":return u(t,.2);case"pct25":return u(t,.25);case"pct30":return u(t,.3);case"pct35":return u(t,.35);case"pct37":return u(t,.375);case"pct40":return u(t,.4);case"pct45":return u(t,.45);case"pct5":return u(t,.05);case"pct50":return u(t,.5);case"pct55":return u(t,.55);case"pct60":return u(t,.6);case"pct65":return u(t,.65);case"pct70":return u(t,.7);case"pct75":return u(t,.75);case"pct80":return u(t,.8);case"pct85":return u(t,.85);case"pct87":return u(t,.87);case"pct90":return u(t,.9);case"pct95":return u(t,.95);default:return console.warn("unsupport shd val",c),"#".concat(t)}return""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseBorder.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseBorder",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/parse/parseColor"),n=e("node_modules/ooxml-viewer/lib/parse/parseSize");function i(e,r){var o=l.getVal(r);if("nil"===o||"none"===o)return"none";var a=s.parseColorAttr(e,r),t=n.parseSize(r,"w:sz",n.LengthUsage.Border);return"".concat(t," solid ").concat("auto"==a?"black":a)}r.parseBorder=i,r.parseBorders=function(e,r,o){var a,l;try{for(var s=t.__values(r.children),n=s.next();!n.done;n=s.next()){var d=n.value;switch(d.tagName){case"w:start":case"w:left":o["border-left"]=i(e,d);break;case"w:end":case"w:right":o["border-right"]=i(e,d);break;case"w:top":o["border-top"]=i(e,d);break;case"w:bottom":o["border-bottom"]=i(e,d)}}}catch(e){a={error:e}}finally{try{n&&!n.done&&(l=s.return)&&l.call(s)}finally{if(a)throw a.error}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTextDirection.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTextDirection",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.parseTextDirection=function(e,r){switch(e.getAttribute("w:val")){case"lr":case"lrV":case"btLr":case"lrTb":case"lrTbV":case"tbLrV":r.direction="ltr";break;case"rl":case"rlV":case"tbRl":case"tbRlV":r.direction="rtl"}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTblWidth.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTblWidth",(function(e,r,t,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");r.parseTblWidth=function(e){var r=e.getAttribute("w:type");return r&&"dxa"!==r?"pct"===r?a.parseSize(e,"w:w",a.LengthUsage.Percent):"auto"===r?"auto":(console.warn("parseTblWidth: ignore type",r,e),""):a.parseSize(e,"w:w")}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseInsideBorders.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseInsideBorders",(function(e,r,s,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/ooxml-viewer/lib/parse/parseBorder");r.parseInsideBorders=function(e,r){var s,i,a=r.getElementsByTagName("w:insideH").item(0);a&&(s=o.parseBorder(e,a));var d=r.getElementsByTagName("w:insideV").item(0);return d&&(i=o.parseBorder(e,d)),{H:s,V:i}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTcPr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTcPr",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/parse/parseCellMargin"),i=e("node_modules/ooxml-viewer/lib/parse/parseColor"),n=e("node_modules/ooxml-viewer/lib/OpenXML"),t=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),c=e("node_modules/ooxml-viewer/lib/parse/parseTextDirection"),d=e("node_modules/ooxml-viewer/lib/parse/parseTblWidth"),p=e("node_modules/ooxml-viewer/lib/parse/parseInsideBorders");function b(e,r){switch(n.getVal(e)){case"bottom":r["vertical-align"]="bottom";break;case"center":r["vertical-align"]="middle";break;case"top":r["vertical-align"]="top"}}function w(e,r){var a=d.parseTblWidth(e);a&&(r.width=a)}r.parseTblCellSpacing=function(e,r){var a=d.parseTblWidth(e);a&&(r["cell-spacing"]=a)},r.parseTcPr=function(e,r){var a,o,d={},u={};d.cssStyle=u;try{for(var m=l.__values(r.children),v=m.next();!v.done;v=m.next()){var g=v.value,k=g.tagName;switch(k){case"w:tcMar":s.parseCellMargin(g,u);break;case"w:shd":u["background-color"]=i.parseShdColor(e,g);break;case"w:tcW":w(g,u);break;case"w:noWrap":n.getValBoolean(g)&&(u["white-space"]="nowrap");break;case"w:vAlign":b(g,u);break;case"w:tcBorders":t.parseBorders(e,g,u),d.insideBorder=p.parseInsideBorders(e,g);break;case"w:gridSpan":d.gridSpan=n.getValNumber(g);break;case"w:vMerge":d.vMerge=n.getVal(g)||"continue";break;case"w:textDirection":c.parseTextDirection(g,u);break;case"w:cnfStyle":break;case"w:hideMark":d.hideMark=n.getValBoolean(g,!0);break;default:console.warn("parseTcPr: ignore",k,g)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(o=m.return)&&o.call(m)}finally{if(a)throw a.error}}return d}}));
;/*!node_modules/ooxml-viewer/lib/util/color.js*/
amis.define("node_modules/ooxml-viewer/lib/util/color",(function(t,r,i,n){"use strict";function s(t,r,i){t/=255,r/=255,i/=255;var n,s=Math.max(t,r,i),e=Math.min(t,r,i),a=0,h=(s+e)/2;if(s==e)a=n=0;else{var o=s-e;switch(n=h>.5?o/(2-s-e):o/(s+e),s){case t:a=(r-i)/o+(r<i?6:0);break;case r:a=(i-t)/o+2;break;case i:a=(t-r)/o+4}a/=6}return{h:a,s:n,l:h}}function e(t,r,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(r-t)*i:i<.5?r:i<2/3?t+(r-t)*(2/3-i)*6:t}function a(t,r,i){var n,s,a;if(0==r)n=s=a=i;else{var h=i<.5?i*(1+r):i+r-i*r,o=2*i-h;n=e(o,h,t+1/3),s=e(o,h,t),a=e(o,h,t-1/3)}return{r:255*n,g:255*s,b:255*a}}function h(t){return 1==t.length?"0"+t:""+t}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t){var r=t.match(/^#?([0-9a-f]{6})$/i);r&&(this.r=parseInt(r[1].substring(0,2),16),this.g=parseInt(r[1].substring(2,4),16),this.b=parseInt(r[1].substring(4,6),16),this.isValid=!0)}return t.prototype.lumMod=function(t){var r=s(this.r,this.g,this.b);r.l=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=a(r.h,r.s,r.l);return this.r=i.r,this.g=i.g,this.b=i.b,this},t.prototype.lumOff=function(t){var r=s(this.r,this.g,this.b);r.l+=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=a(r.h,r.s,r.l);return this.r=i.r,this.g=i.g,this.b=i.b,this},t.prototype.toHex=function(){return"#"+(t=this.r,r=this.g,i=this.b,[h(Math.round(t).toString(16)),h(Math.round(r).toString(16)),h(Math.round(i).toString(16))].join("").toUpperCase());var t,r,i},t}();r.Color=o}));
;/*!node_modules/ooxml-viewer/lib/parse/parseChildColor.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseChildColor",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/util/color");function i(e,r){var a,t,i=new n.Color(r);if(i.isValid){try{for(var c=l.__values(e.children),u=c.next();!u.done;u=c.next()){var s=u.value;switch(s.tagName){case"a:lumMod":i.lumMod(o.getAttrPercentage(s,"val"));break;case"a:lumOff":i.lumOff(o.getAttrPercentage(s,"val"))}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return i.toHex()}return r}function c(e,r){var a,t,i=new n.Color(r);if(i.isValid){try{for(var c=l.__values(e.children),u=c.next();!u.done;u=c.next()){var s=u.value;if("w14:alpha"===s.tagName){var f=o.getVal(s);if(f)return"rgba(".concat(i.r,", ").concat(i.g,", ").concat(i.b,", ").concat(parseInt(f,10)/1e5,")")}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return i.toHex()}return r}r.parseChildColor=function(e,r){var a=r.firstElementChild;if(a){var t=a.tagName;switch(t){case"a:prstClr":return i(a,o.getVal(a)||"");case"a:srgbClr":case"w14:srgbClr":var l=i(a,"#"+o.getVal(a));return l=c(a,l);case"a:schemeClr":var n=a.getAttribute("val")||"";if(n)return i(a,e.getThemeColor(n));default:console.warn("parseOutline: Unknown color type ",t,a)}}return""}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseInd.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseInd",(function(e,i,r,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseInd=function(e,i){var r=a.parseSize(e,"w:firstLine"),n=a.parseSize(e,"w:hanging"),t=a.parseSize(e,"w:left"),s=a.parseSize(e,"w:start"),o=a.parseSize(e,"w:right"),d=a.parseSize(e,"w:end");r&&(i["text-indent"]=r),n&&(i["text-indent"]="-".concat(n)),(t||s)&&(i["margin-left"]=t||s),(o||d)&&(i["margin-right"]=o||d)}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseSpacing.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseSpacing",(function(e,i,t,r){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseSpacing=function(e,i,t){var r=a.parseSize(i,"w:before"),n=a.parseSize(i,"w:after"),o=i.getAttribute("w:lineRule");r&&(t["margin-top"]=r),n&&(t["margin-bottom"]=n);var s=i.getAttribute("w:line");if(s){if(e.renderOptions.forceLineHeight)return void(t["line-height"]=e.renderOptions.forceLineHeight);var p=parseInt(s,10),c=e.renderOptions.minLineHeight||1;switch(o){case"auto":var l=Math.max(c,p/240);t["line-height"]="".concat(l.toFixed(2));break;case"atLeast":break;default:var d=Math.max(c,p/20);t["line-height"]="".concat(d,"pt")}}}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseFont.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseFont",(function(e,a,s,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib");a.parseFont=function(e,a,s){var r,n,i=[],o=e.renderOptions.fontMapping;try{for(var c=t.__values(a.attributes),l=c.next();!l.done;l=c.next()){var u=l.value,f=u.name,d=u.value;switch(f){case"w:ascii":case"w:cs":case"w:eastAsia":o&&d in o&&(d=o[d]),-1===d.indexOf(" ")?i.push(d):i.push('"'+d+'"');break;case"w:asciiTheme":case"w:csTheme":case"w:eastAsiaTheme":i.push("var(--docx-theme-font-".concat(d,")"))}}}catch(e){r={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(r)throw r.error}}i.length&&(s["font-family"]=Array.from(new Set(i)).join(", "))}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTrHeight.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTrHeight",(function(e,i,t,r){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize");i.parseTrHeight=function(e,i){var t=a.parseSize(e,"w:val"),r=e.getAttribute("w:hRule");"exact"===r?i.height=t:"atLeast"===r&&(i.height=t,i["min-height"]=t)}}));
;/*!node_modules/ooxml-viewer/lib/parse/jcToTextAlign.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/jcToTextAlign",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.jcToTextAlign=function(e){switch(e){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":case"distribute":return"justify"}return e}}));
;/*!node_modules/ooxml-viewer/lib/parse/parsePr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parsePr",(function(e,a,r,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/parse/parseSize"),l=e("node_modules/ooxml-viewer/lib/OpenXML"),c=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),n=e("node_modules/ooxml-viewer/lib/parse/parseColor"),i=e("node_modules/ooxml-viewer/lib/parse/parseChildColor"),w=e("node_modules/ooxml-viewer/lib/parse/parseInd"),d=e("node_modules/ooxml-viewer/lib/parse/parseSpacing"),p=e("node_modules/ooxml-viewer/lib/parse/parseFont"),b=e("node_modules/ooxml-viewer/lib/parse/parseTrHeight"),u=e("node_modules/ooxml-viewer/lib/parse/jcToTextAlign"),k=e("node_modules/ooxml-viewer/lib/parse/parseTextDirection");function g(e,a,r){var o=l.getVal(a);if(null!=o){switch(o){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":r["text-decoration-style"]="dashed";break;case"dotted":case"dottedHeavy":r["text-decoration-style"]="dotted";break;case"double":r["text-decoration-style"]="double";break;case"single":case"thick":case"words":r["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":r["text-decoration-style"]="wavy";break;case"none":r["text-decoration"]="none"}var s=n.parseColorAttr(e,a);s&&(r["text-decoration-color"]=s)}}function h(e,a){var r,o;try{for(var l=s.__values(e.attributes),c=l.next();!c.done;c=l.next()){var n=c.value,i=n.name,w=n.value;switch(i){case"w:dropCap":"drop"===w&&(a.float="left");break;case"w:h":"object"!=typeof w||Array.isArray(w)||(a.height=t.parseSize(w,"w:h"));break;case"w:w":"object"!=typeof w||Array.isArray(w)||(a.width=t.parseSize(w,"w:w"));break;case"w:hAnchor":case"w:vAnchor":case"w:lines":break;case"w:wrap":"around"!==w&&console.warn("parseFrame: w:wrap not support "+w);break;default:console.warn("parseFrame: unknown attribute "+i,n)}}}catch(e){r={error:e}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}}function m(e,a){switch(e){case"dot":case"underDot":a["text-emphasis"]="filled",a["text-emphasis-position"]="under right";break;case"comma":a["text-emphasis"]="filled sesame";break;case"circle":a["text-emphasis"]="open"}}a.parsePr=function(e,a,r){var o,v,x={};try{for(var y=s.__values(a.children),f=y.next();!f.done;f=y.next()){var A=f.value,S=A.tagName;switch(S){case"w:sz":case"w:szCs":x["font-size"]=t.parseSize(A,"w:val",t.LengthUsage.FontSize);break;case"w:jc":x["text-align"]=u.jcToTextAlign(l.getVal(A));break;case"w:framePr":h(A,x);break;case"w:pBdr":c.parseBorders(e,A,x);break;case"w:ind":w.parseInd(A,x);break;case"w:color":x.color=n.parseColor(e,A);break;case"w:shd":"background-color"in x||(x["background-color"]=n.parseShdColor(e,A));break;case"w:spacing":d.parseSpacing(e,A,x);break;case"w:highlight":x["background-color"]=n.parseColorAttr(e,A,"w:val","yellow");break;case"w:vertAlign":var _=l.getVal(A);"superscript"===_?x["vertical-align"]="super":"subscript"===_&&(x["vertical-align"]="sub");break;case"w:position":x["vertical-align"]=t.parseSize(A,"w:val",t.LengthUsage.FontSize);break;case"w:trHeight":b.parseTrHeight(A,x);break;case"w:strike":case"w:dstrike":x["text-decoration"]=l.getValBoolean(A)?"line-through":"none";break;case"w:b":x["font-weight"]=l.getValBoolean(A)?"bold":"normal";break;case"w:adjustRightInd":case"w:bCs":case"w:iCs":case"w:kern":case"w:pStyle":case"w:lang":case"w:noProof":case"w:keepLines":case"w:keepNext":case"w:widowControl":case"w:pageBreakBefore":case"w:outlineLvl":case"w:contextualSpacing":case"w:numPr":case"w:rPr":case"w:rStyle":case"w:tabs":case"w:snapToGrid":case"w:topLinePunct":case"w:cnfStyle":case"w:autoSpaceDE":case"w:autoSpaceDN":case"w:kinsoku":case"w:overflowPunct":break;case"w:i":x["font-style"]=l.getValBoolean(A)?"italic":"normal";break;case"w:caps":x["text-transform"]=l.getValBoolean(A)?"uppercase":"normal";break;case"w:smallCaps":x["text-transform"]=l.getValBoolean(A)?"lowercase":"normal";break;case"w:u":g(e,A,x);break;case"w:rFonts":p.parseFont(e,A,x);break;case"w:tblCellSpacing":x["border-spacing"]=t.parseSize(A,"w:w"),x["border-collapse"]="separate";break;case"w:bdr":x.border=c.parseBorder(e,A);break;case"w:vanish":l.getValBoolean(A)&&(x.display="none");break;case"w:webHidden":x.display="none";break;case"w:wordWrap":l.getValBoolean(A)&&(x["word-break"]="break-all");break;case"w:textAlignment":var C=l.getVal(A);"center"===C?x["vertical-align"]="middle":"auto"!==C&&(x["vertical-align"]=C);break;case"w:textDirection":k.parseTextDirection(A,x);break;case"w:bidi":l.getValBoolean(A,!0)&&console.warn("w:bidi is not supported.");break;case"w:em":m(l.getVal(A),x);break;case"w:w":var B=l.getValNumber(A);x.transform="scaleX(".concat(B/100,")"),x.display="inline-block";break;case"w:outline":x["text-shadow"]="-1pt -1pt 0 #AAA, 1pt -1pt 0 #AAA, -1pt 1pt 0 #AAA, 1pt 1pt 0 #AAA";break;case"w:shadown":case"w:imprint":l.getValBoolean(A,!0)&&(x["text-shadow"]="1pt 1pt 2pt rgba(0, 0, 0, 0.6)");break;case"w14:shadow":var V=t.parseSize(A,"w14:blurRad",t.LengthUsage.Emu)||"2pt",D="rgba(0, 0, 0, 0.6)",z=i.parseChildColor(e,A);z&&(D=z),x["text-shadow"]="1pt 1pt ".concat(V," ").concat(D);break;default:console.warn("parsePr Unknown tagName",S,A)}}}catch(e){o={error:e}}finally{try{f&&!f.done&&(v=y.return)&&v.call(y)}finally{if(o)throw o.error}}return x}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Bookmark.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Bookmark",(function(e,n,o,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e){this.name=e}return e.fromXML=function(n,o){var t=o.getAttribute("w:name");return t?new e(t):(console.warn("Bookmark without name"),new e("unknown"))},e}();n.BookmarkStart=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Break.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Break",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(){this.type="textWrapping"}return e.fromXML=function(n,r){return new e},e}();n.Break=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(){}return e.fromXML=function(n,r){var t=new e,o=r.getAttribute("r:embed")||"",i=n.getDocumentRels(o);return i&&(t.embled=i,t.src=n.loadImage(t.embled)),t},e}();n.Blip=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill",(function(e,i,l,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Blip"),r=function(){function e(){}return e.fromXML=function(i,l){var n=new e,r=null==l?void 0:l.getElementsByTagName("a:blip").item(0);return r&&(n.blip=o.Blip.fromXML(i,r)),n},e}();i.BlipFill=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),o=function(){function e(){}return e.fromXML=function(r,t){var n=new e,o=t.getElementsByTagName("a:off").item(0);o&&(n.off={x:a.parseSize(o,"x",a.LengthUsage.Emu),y:a.parseSize(o,"y",a.LengthUsage.Emu)});var i=t.getElementsByTagName("a:ext").item(0);i&&(n.ext={cx:a.parseSize(i,"cx",a.LengthUsage.Emu),cy:a.parseSize(i,"cy",a.LengthUsage.Emu)});var s=t.getAttribute("rot");return s&&(n.rot=a.convertAngle(s)),n},e}();r.Transform=o}));
;/*!node_modules/ooxml-viewer/lib/parse/parseShape.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseShape",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/OpenXML");function o(e){var t,r,a=[];try{for(var s=n.__values(e.children),o=s.next();!o.done;o=s.next()){var l=o.value,c=l.tagName;if("a:pt"===c||"pt"===c){var i=l.getAttribute("x"),u=l.getAttribute("y");i&&u&&a.push({x:i,y:u})}else console.warn("unknown pt",c,l)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return a}function l(e){var t,r,a=[];try{for(var l=n.__values(e.children),c=l.next();!c.done;c=l.next()){var i=c.value,u=i.tagName;switch(u){case"a:moveTo":case"moveTo":var v=o(i);if(v.length){var h={type:"moveTo",pt:v[0]};a.push(h)}break;case"a:lnTo":case"lnTo":var p=o(i);if(p.length){var f={type:"lnTo",pt:p[0]};a.push(f)}break;case"a:quadBezTo":case"quadBezTo":var g=o(i);if(g.length){var d={type:"quadBezTo",pts:g};a.push(d)}break;case"a:cubicBezTo":case"cubicBezTo":var b=o(i);if(b.length){var y={type:"cubicBezTo",pts:b};a.push(y)}break;case"a:arcTo":case"arcTo":var w=i.getAttribute("wR"),A=i.getAttribute("hR"),m=i.getAttribute("stAng"),x=i.getAttribute("swAng");if(w&&A&&m&&x){var k={type:"arcTo",wR:w,hR:A,stAng:m,swAng:x};a.push(k)}break;case"a:close":case"close":a.push({type:"close"});break;default:console.warn("parsePath: unknown tag",u,i)}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(r=l.return)&&r.call(l)}finally{if(t)throw t.error}}var T={defines:a},_=e.getAttribute("fill");_&&(T.fill=_),T.extrusionOk=s.getAttrBoolean(e,"extrusionOk",!1),T.stroke=s.getAttrBoolean(e,"stroke",!0);var L=e.getAttribute("w");L&&(T.w=parseInt(L,10));var B=e.getAttribute("h");return B&&(T.h=parseInt(B,10)),T}function c(e){var t,r,a=[];try{for(var s=n.__values(e.children),o=s.next();!o.done;o=s.next()){var c=o.value;switch(c.tagName){case"a:path":case"path":a.push(l(c))}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return a}function i(e){var t,r,a=[];try{for(var s=n.__values(e.children),o=s.next();!o.done;o=s.next()){var l=o.value;switch(l.tagName){case"a:gd":case"gd":var c=l.getAttribute("name"),i=l.getAttribute("fmla");if(c&&i){var u={n:c,f:i};a.push(u)}}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return a}t.parsePath=l,t.parsePathLst=c,t.parsePts=o,t.parseShape=function(e){var t,r,a={};try{for(var s=n.__values(e.children),o=s.next();!o.done;o=s.next()){var l=o.value;switch(l.tagName){case"a:avLst":case"avLst":a.avLst=i(l);break;case"a:gdLst":case"gdLst":a.gdLst=i(l);break;case"a:rect":case"react":var u={b:l.getAttribute("b")||"",l:l.getAttribute("l")||"",r:l.getAttribute("r")||"",t:l.getAttribute("t")||""};a.rect=u;break;case"a:pathLst":case"pathLst":a.pathLst=c(l)}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return a},t.parseShapeGuide=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom",(function(e,r,t,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseShape"),i=function(){function e(){}return e.fromXML=function(r,t){var o,i,l=new e;l.prst=t.getAttribute("prst");try{for(var s=n.__values(t.children),u=s.next();!u.done;u=s.next()){var d=u.value;if("a:avLst"===d.tagName)l.avLst=a.parseShapeGuide(d)}}catch(e){o={error:e}}finally{try{u&&!u.done&&(i=s.return)&&i.call(s)}finally{if(o)throw o.error}}return l},e}();r.Geom=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/CustomGeom.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/CustomGeom",(function(e,o,n,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/parse/parseShape"),u=function(){function e(){}return e.fromXML=function(o,n){var r=new e;return r.shape=i.parseShape(n),r},e}();o.CustomGeom=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties",(function(e,o,r,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Transform"),n=e("node_modules/ooxml-viewer/lib/parse/parseSize"),t=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Geom"),i=e("node_modules/ooxml-viewer/lib/parse/parseChildColor"),d=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/CustomGeom");function c(e){var o="solid";switch(e){case"dash":case"dashDot":case"lgDash":case"lgDashDot":case"lgDashDotDot":case"sysDash":case"sysDashDot":case"sysDashDotDot":o="dashed";break;case"dot":case"sysDot":o="dotted"}return o}function m(e,o){var r,a,l={width:n.parseSize(o,"w",n.LengthUsage.Emu),style:"solid"};try{for(var t=s.__values(o.children),d=t.next();!d.done;d=t.next()){var m=d.value,u=m.tagName;switch(u){case"a:solidFill":l.color=i.parseChildColor(e,m);break;case"a:noFill":l.style="none";break;case"a:round":l.radius="8%";break;case"a:prstDash":l.style=c(m.getAttribute("val"));break;default:console.warn("parseOutline: Unknown tag ",u,m)}}}catch(e){r={error:e}}finally{try{d&&!d.done&&(a=t.return)&&a.call(t)}finally{if(r)throw r.error}}return l}var u=function(){function e(){}return e.fromXML=function(o,r){var a,n,c=new e;if(r)try{for(var u=s.__values(r.children),f=u.next();!f.done;f=u.next()){var h=f.value,w=h.tagName;switch(w){case"a:xfrm":c.xfrm=l.Transform.fromXML(o,h);break;case"a:prstGeom":c.geom=t.Geom.fromXML(o,h);break;case"a:custGeom":c.custGeom=d.CustomGeom.fromXML(o,h);break;case"a:ln":c.outline=m(o,h);break;case"a:noFill":c.noFill=!0;break;case"a:solidFill":c.fillColor=i.parseChildColor(o,h);break;default:console.warn("ShapePr: Unknown tag ",w,h)}}}catch(e){a={error:e}}finally{try{f&&!f.done&&(n=u.return)&&n.call(u)}finally{if(a)throw a.error}}return c},e}();o.ShapePr=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic",(function(e,i,l,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/BlipFill"),r=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties"),m=function(){function e(){}return e.fromXML=function(i,l){var o=new e;return o.blipFill=n.BlipFill.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:blipFill").item(0)),o.spPr=r.ShapePr.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:spPr").item(0)),o},e}();i.Pic=m}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Table.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Table",(function(e,i,t,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=function(){this.properties={},this.tblGrid=[],this.trs=[]};i.Table=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/table/Tr.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/table/Tr",(function(e,i,o,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=function(){this.properties={},this.tcs=[]};i.Tr=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/table/Tc.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/table/Tc",(function(e,i,t,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(){this.properties={},this.children=[]}return e.prototype.add=function(e){e&&this.children.push(e)},e}();i.Tc=o}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTc.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTc",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/table/Tc"),l=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),p=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),s=e("node_modules/ooxml-viewer/lib/parse/parseTable");r.parseTc=function(e,r,o,a){var t,d,c=new n.Tc;try{for(var u=i.__values(r.children),w=u.next();!w.done;w=u.next()){var m=w.value;switch(m.tagName){case"w:tcPr":c.properties=l.parseTcPr(e,m);break;case"w:p":c.add(p.Paragraph.fromXML(e,m));break;case"w:tbl":c.add(s.parseTable(e,m))}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(d=u.return)&&d.call(u)}finally{if(t)throw t.error}}var v=a[o.index];if(c.properties.vMerge){if("restart"===c.properties.vMerge)c.properties.rowSpan=1,a[o.index]=c;else if(v){if(v.properties&&v.properties.rowSpan){v.properties.rowSpan=v.properties.rowSpan+1;var b=c.properties.gridSpan||1;return o.index+=b,null}console.warn("Tc.fromXML: continue but not found lastCol",o.index,c,a)}}else delete a[o.index];var f=c.properties.gridSpan||1;return o.index+=f,c}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTablePr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTablePr",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/parse/parseBorder"),n=e("node_modules/ooxml-viewer/lib/parse/parseInsideBorders"),i=e("node_modules/ooxml-viewer/lib/parse/parseTblWidth"),d=e("node_modules/ooxml-viewer/lib/parse/parseColor"),b=e("node_modules/ooxml-viewer/lib/parse/parseSize"),c=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),p=e("node_modules/ooxml-viewer/lib/parse/parseCellMargin");function w(e,r){switch(t.getVal(e)){case"left":case"start":break;case"right":case"end":r.float="right"}}function u(e,r){var a=i.parseTblWidth(e);a&&(r["margin-left"]=a)}function m(e,r){var a=i.parseTblWidth(e);a&&(r.width=a)}function f(e){var r={},a=t.getValHex(e);return(t.getAttrBoolean(e,"firstRow",!1)||32&a)&&(r.firstRow=!0),(t.getAttrBoolean(e,"lastRow",!1)||64&a)&&(r.lastRow=!0),(t.getAttrBoolean(e,"firstColumn",!1)||128&a)&&(r.firstColumn=!0),(t.getAttrBoolean(e,"lastColumn",!1)||256&a)&&(r.lastColumn=!0),t.getAttrBoolean(e,"noHBand",!1)||512&a?r.noHBand=!0:r.noHBand=!1,t.getAttrBoolean(e,"noVBand",!1)||1024&a?r.noVBand=!0:r.noVBand=!1,r}function g(e,r,a){if(void 0===e.renderOptions.padding){var o=b.parseSize(r,"w:tblpX"),l=b.parseSize(r,"w:tblpY");a.top=l,a.left=o}}function B(e,r){"fixed"===e.getAttribute("w:type")&&(r["table-layout"]="fixed")}r.parseTablePr=function(e,r){var a,o,i={},b={},k={};i.tblLook={},i.cssStyle=b,i.tcCSSStyle=k;try{for(var v=l.__values(r.children),S=v.next();!S.done;S=v.next()){var C=S.value,x=C.tagName;switch(x){case"w:tblBorders":s.parseBorders(e,C,b),i.insideBorder=n.parseInsideBorders(e,C);break;case"w:tcBorders":s.parseBorders(e,C,b);break;case"w:tblInd":u(C,b);break;case"w:jc":w(C,b);break;case"w:tblCellMar":case"w:tcMar":p.parseCellMargin(C,k);break;case"w:tblStyle":i.pStyle=t.getVal(C);break;case"w:tblW":m(C,b);break;case"w:shd":b["background-color"]=d.parseShdColor(e,C);break;case"w:tblCaption":i.tblCaption=t.getVal(C);break;case"w:tblCellSpacing":c.parseTblCellSpacing(C,b);break;case"w:tblLayout":B(C,b);break;case"w:tblLook":i.tblLook=f(C);break;case"w:tblStyleRowBandSize":i.rowBandSize=t.getValNumber(C);break;case"w:tblStyleColBandSize":i.colBandSize=t.getValNumber(C);break;case"w:tblpPr":g(e,C,b);break;default:console.warn("parseTableProperties unknown tag",x,C)}}}catch(e){a={error:e}}finally{try{S&&!S.done&&(o=v.return)&&o.call(v)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTrPr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTrPr",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/parse/jcToTextAlign"),t=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),c=e("node_modules/ooxml-viewer/lib/parse/parseTrHeight");r.parseTrPr=function(e,r){var a,l,d={},b={};try{for(var p=o.__values(r.children),u=p.next();!u.done;u=p.next()){var w=u.value,m=w.tagName;switch(m){case"w:hidden":s.getValBoolean(w)&&(d.display="none");break;case"w:trHeight":c.parseTrHeight(w,d);break;case"w:jc":d["text-align"]=n.jcToTextAlign(s.getVal(w));break;case"w:cantSplit":case"w:cnfStyle":break;case"w:tblPrEx":var v=t.parseTablePr(e,w);Object.assign(d,v.cssStyle);break;case"w:tblCellSpacing":i.parseTblCellSpacing(w,b);break;default:console.warn("Tr: Unknown tag ",m,w)}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(l=p.return)&&l.call(p)}finally{if(a)throw a.error}}return{cssStyle:d}}}));
;/*!node_modules/ooxml-viewer/lib/parse/mergeSdt.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/mergeSdt",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib");function n(e){var r,t,a=e.slice(),i=0,s=!1;try{for(var c=l.__values(e),d=c.next();!d.done;d=c.next()){var o=d.value;switch(o.tagName){case"w:smartTag":case"w:customXml":var m=[].slice.call(o.children);a.splice.apply(a,l.__spreadArray([i,1],l.__read(m),!1)),i+=m.length;continue;case"w:sdt":var u=o.getElementsByTagName("w:sdtContent").item(0);if(o.getElementsByTagName("w:sdt").item(0)&&(s=!0),u){var _=[].slice.call(u.children);a.splice.apply(a,l.__spreadArray([i,1],l.__read(_),!1)),i+=_.length;continue}}i+=1}}catch(e){r={error:e}}finally{try{d&&!d.done&&(t=c.return)&&t.call(c)}finally{if(r)throw r.error}}return s?n(a):a}r.mergeSdt=function(e){return n([].slice.call(e.children))}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTr.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTr",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/table/Tr"),t=e("node_modules/ooxml-viewer/lib/parse/parseTc"),n=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseTrPr"),d=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");r.parseTr=function(e,r,o){var a,p,c=new l.Tr,m={index:0};try{for(var u=s.__values(d.mergeSdt(r)),b=u.next();!b.done;b=u.next()){var v=b.value,w=v.tagName;switch(w){case"w:tc":var x=t.parseTc(e,v,m,o);x&&c.tcs.push(x);break;case"w:trPr":c.properties=i.parseTrPr(e,v);break;case"w:tblPrEx":var T=n.parseTablePr(e,v);Object.assign(c.properties.cssStyle||{},T.cssStyle);break;default:console.warn("Tr: Unknown tag ",w,v)}}}catch(e){a={error:e}}finally{try{b&&!b.done&&(p=u.return)&&p.call(u)}finally{if(a)throw a.error}}return c}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseTable.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseTable",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),t=e("node_modules/ooxml-viewer/lib/parse/parseTr"),s=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),i=e("node_modules/ooxml-viewer/lib/parse/parseSize"),d=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");function u(e){var r,a,l=[],n=e.getElementsByTagName("w:gridCol");try{for(var t=o.__values(n),s=t.next();!s.done;s=t.next()){var d=s.value,u=i.parseSize(d,"w:w");l.push({w:u})}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=t.return)&&a.call(t)}finally{if(r)throw r.error}}return l}r.parseTable=function(e,r){var a,l,i=new n.Table,b={};try{for(var m=o.__values(d.mergeSdt(r)),w=m.next();!w.done;w=m.next()){var p=w.value,v=p.tagName;switch(v){case"w:tblPr":i.properties=s.parseTablePr(e,p);break;case"w:tr":i.trs.push(t.parseTr(e,p,b));break;case"w:tblGrid":i.tblGrid=u(p);break;default:console.warn("Table.fromXML unknown tag",v,p)}}}catch(e){a={error:e}}finally{try{w&&!w.done&&(l=m.return)&&l.call(m)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/wps/WPSStyle.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/wps/WPSStyle",(function(e,r,o,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseChildColor"),i=function(){function e(){}return e.fromXML=function(r,o){var l,i,t=new e;try{for(var s=n.__values(o.children),f=s.next();!f.done;f=s.next()){var d=f.value;switch(d.tagName){case"a:fillRef":t.fillColor=a.parseChildColor(r,d);break;case"a:lnRef":t.lineColor=a.parseChildColor(r,d);break;case"a:fontRef":t.fontColor=a.parseChildColor(r,d)}}}catch(e){l={error:e}}finally{try{f&&!f.done&&(i=s.return)&&i.call(s)}finally{if(l)throw l.error}}return t},e}();r.WPSStyle=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/wps/WPS.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/wps/WPS",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/ShapeProperties"),s=e("node_modules/ooxml-viewer/lib/parse/parseTable"),i=e("node_modules/ooxml-viewer/lib/parse/parseSize"),c=e("node_modules/ooxml-viewer/lib/openxml/word/wps/WPSStyle");function d(e,r){var a,t;try{for(var n=o.__values(e.attributes),l=n.next();!l.done;l=n.next()){var s=l.value,c=s.name,d=s.value;switch(c){case"numCol":"1"!==d&&(r["column-count"]=d);break;case"vert":switch(d){case"vert":r["writing-mode"]="vertical-rl",r["text-orientation"]="sideways";break;case"vert270":case"eaVert":r["writing-mode"]="vertical-rl",r["text-orientation"]="mixed"}break;case"anchor":switch(d){case"b":r["vertical-align"]="bottom";break;case"t":r["vertical-align"]="top";break;case"ctr":r["vertical-align"]="middle"}break;case"rot":var w=i.convertAngle(d);w&&(r.transform="rotate(".concat(w,"deg)"))}}}catch(e){a={error:e}}finally{try{l&&!l.done&&(t=n.return)&&t.call(n)}finally{if(a)throw a.error}}}var w=function(){function e(){this.style={}}return e.fromXML=function(r,a){var t,i,w,v,u=new e;u.txbxContent=[];try{for(var m=o.__values(a.children),b=m.next();!b.done;b=m.next()){var p=b.value,x=p.tagName;switch(x){case"wps:cNvSpPr":break;case"wps:spPr":u.spPr=l.ShapePr.fromXML(r,p);break;case"wps:txbx":var f=p.firstElementChild;if(f)try{for(var h=(w=void 0,o.__values(f.children)),y=h.next();!y.done;y=h.next()){var _=y.value;switch(_.tagName){case"w:p":u.txbxContent.push(n.Paragraph.fromXML(r,_));break;case"w:tbl":u.txbxContent.push(s.parseTable(r,_))}}}catch(e){w={error:e}}finally{try{y&&!y.done&&(v=h.return)&&v.call(h)}finally{if(w)throw w.error}}else console.warn("unknown wps:txbx",p);break;case"wps:style":u.wpsStyle=c.WPSStyle.fromXML(r,p);break;case"wps:bodyPr":d(p,u.style);break;default:console.warn("WPS: Unknown tag ",x,p)}}}catch(e){t={error:e}}finally{try{b&&!b.done&&(i=m.return)&&i.call(m)}finally{if(t)throw t.error}}return u},e}();r.WPS=w}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing",(function(e,i,o,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t,r=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),l=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Pic"),p=e("node_modules/ooxml-viewer/lib/openxml/word/wps/WPS");i.Position=void 0,(t=i.Position||(i.Position={})).inline="inline",t.anchor="anchor";var c=function(){function e(){this.position=i.Position.inline}return e.fromXML=function(o,n){var t,c,d,m=new e,u={};m.containerStyle=u;var w=n.firstElementChild;if(w){if("wp:anchor"===w.tagName){m.position=i.Position.anchor,m.anchor=function(e){return{simplePos:s.getAttrBoolean(e,"simplePos",!1),hidden:s.getAttrBoolean(e,"hidden",!1),behindDoc:s.getAttrBoolean(e,"behindDoc",!1)}}(w);var g=s.getAttrNumber(w,"relativeHeight",1);u["z-index"]=g}try{for(var h=r.__values(w.children),f=h.next();!f.done;f=h.next()){var v=f.value,b=v.tagName;switch(b){case"wp:simplePos":(null===(d=m.anchor)||void 0===d?void 0:d.simplePos)&&(u.position="absolute",u.x=a.parseSize(v,"x",a.LengthUsage.Emu),u.y=a.parseSize(v,"y",a.LengthUsage.Emu));break;case"wp:positionH":var x=v.getAttribute("relativeFrom");if("column"===x||"page"===x||"margin"===x){if(L=v.firstElementChild){var P=L.tagName;u.position="absolute","wp:posOffset"===P?u.left=a.convertLength(L.innerHTML,a.LengthUsage.Emu):(u.left="0",console.warn("unsupport positionType",P))}}else console.warn("unsupport positionH relativeFrom",x);break;case"wp:positionV":var L,E=v.getAttribute("relativeFrom");if("paragraph"===E||"page"===E){if(m.relativeFromV=E,L=v.firstElementChild){P=L.tagName;u.position="absolute","wp:posOffset"===P?u.top=a.convertLength(L.innerHTML,a.LengthUsage.Emu):(u.top="0",console.warn("unsupport positionType",P))}}else console.warn("unsupport positionV relativeFrom",E);break;case"wp:docPr":m.id=v.getAttribute("id")||void 0,m.name=v.getAttribute("name")||void 0;break;case"wp:cNvGraphicFramePr":case"wp:effectExtent":case"wp:wrapNone":case"wp14:sizeRelH":case"wp14:sizeRelV":break;case"a:graphic":var k=v.firstElementChild,y=null==k?void 0:k.firstElementChild;if(y)switch(y.tagName){case"pic:pic":m.pic=l.Pic.fromXML(o,y);break;case"wps:wsp":m.wps=p.WPS.fromXML(o,y);break;default:console.warn("unknown graphicData child tag",y)}break;case"wp:extent":u.width=a.parseSize(v,"cx",a.LengthUsage.Emu),u.height=a.parseSize(v,"cy",a.LengthUsage.Emu);break;default:console.warn("drawing unknown tag",b)}}}catch(e){t={error:e}}finally{try{f&&!f.done&&(c=h.return)&&c.call(h)}finally{if(t)throw t.error}}}return m},e}();i.Drawing=c}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/InstrText.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/InstrText",(function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){this.text=e};t.InstrText=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen",(function(e,o,n,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=function(){};o.NoBreakHyphen=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Pict.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Pict",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(t,i){var n=new e,r=i.getElementsByTagName("v:imagedata").item(0);if(r){var o=r.getAttribute("r:id")||"",a=t.getDocumentRels(o);a&&(n.src=t.loadImage(a))}return n},e}();t.Pict=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Ruby.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Ruby",(function(r,e,n,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("node_modules/tslib/tslib"),a=r("node_modules/ooxml-viewer/lib/openxml/word/Run"),l=function(){function r(){}return r.fromXML=function(e,n){var o,l,u=new r;u.children=[];try{for(var i=t.__values(n.children),c=i.next();!c.done;c=i.next()){var f=c.value,s=f.tagName;if("w:r"===s){var d=a.Run.fromXML(e,f);d&&u.children.push(d)}else console.warn("parse Ruby: Unknown key",s,f)}}catch(r){o={error:r}}finally{try{c&&!c.done&&(l=i.return)&&l.call(i)}finally{if(o)throw o.error}}return u},r}();!function(r){function e(){return null!==r&&r.apply(this,arguments)||this}t.__extends(e,r)}(l);var u=function(){function r(){}return r.fromXML=function(e,n){var o,a,u=new r;try{for(var i=t.__values(n.children),c=i.next();!c.done;c=i.next()){var f=c.value,s=f.tagName;switch(s){case"w:rubyPr":break;case"w:rt":u.rt=l.fromXML(e,f);break;case"w:rubyBase":u.rubyBase=l.fromXML(e,f);break;default:console.warn("parse Ruby: Unknown key",s,f)}}}catch(r){o={error:r}}finally{try{c&&!c.done&&(a=i.return)&&a.call(i)}finally{if(o)throw o.error}}return u},r}();e.Ruby=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Separator.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Separator",(function(e,o,r,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){};o.Separator=n}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen",(function(e,o,n,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=function(){};o.SoftHyphen=t}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Sym.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Sym",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.parseXML=function(t){var n=new e;return n.font=t.getAttribute("w:font")||"",n.char=t.getAttribute("w:char")||"",n},e}();t.Sym=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Tab.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Tab",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/OpenXML"),t=e("node_modules/ooxml-viewer/lib/parse/parseSize"),l=function(){function e(){}return e.fromXML=function(o,r){var n=new e;return n.pos=t.parseSize(r,"w:pos"),n.type=i.getVal(r),n.leader=r.getAttribute("w:leader"),n},e}();o.Tab=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Run.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Run",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/OpenXML"),l=e("node_modules/ooxml-viewer/lib/parse/parsePr"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Break"),i=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing"),s=e("node_modules/ooxml-viewer/lib/openxml/word/InstrText"),w=e("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Pict"),p=e("node_modules/ooxml-viewer/lib/openxml/word/Ruby"),c=e("node_modules/ooxml-viewer/lib/openxml/word/Separator"),u=e("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen"),b=e("node_modules/ooxml-viewer/lib/openxml/word/Sym"),h=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),x=function(e){this.preserveSpace=!1,this.text=String(e)},f=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){e&&this.children.push(e)},e.parseRunPr=function(e,r){var o,a=l.parsePr(e,r),n=r.getElementsByTagName("w:rStyle").item(0);return n&&(o=d.getVal(n)),{cssStyle:a,rStyle:o}},e.fromXML=function(r,o){var a,d,l=new e;try{for(var f=n.__values(o.children),y=f.next();!y.done;y=f.next()){var k=y.value,v=k.tagName;switch(v){case"w:t":var C=k.textContent||"",_=new x(C);l.addChild(_);break;case"w:rPr":l.properties=e.parseRunPr(r,k);break;case"w:br":case"w:cr":l.addChild(t.Break.fromXML(r,k));break;case"w:drawing":l.addChild(i.Drawing.fromXML(r,k));break;case"w:tab":l.addChild(h.Tab.fromXML(r,k));break;case"w:fldChar":l.fldChar=k.getAttribute("w:fldCharType");break;case"w:instrText":l.addChild(new s.InstrText(k.textContent||""));break;case"w:lastRenderedPageBreak":var g=new t.Break;g.type="page",l.addChild(g);break;case"w:pict":l.addChild(m.Pict.fromXML(r,k));break;case"w:ruby":l.addChild(p.Ruby.fromXML(r,k));break;case"w:sym":l.addChild(b.Sym.parseXML(k));break;case"mc:AlternateContent":var S=k.getElementsByTagName("w:drawing").item(0);S&&l.addChild(i.Drawing.fromXML(r,S));break;case"w:softHyphen":l.addChild(new u.SoftHyphen);break;case"w:noBreakHyphen":l.addChild(new w.NoBreakHyphen);break;case"w:separator":l.addChild(new c.Separator);break;case"w:continuationSeparator":break;default:console.warn("parse Run: Unknown key",v,k)}}}catch(e){a={error:e}}finally{try{y&&!y.done&&(d=f.return)&&d.call(f)}finally{if(a)throw a.error}}return l},e}();r.Run=f,r.Text=x}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Hyperlink.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),l=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,n){var t,l,a=new e,d=n.getAttribute("r:id");if(d){var u=r.getDocumentRels(d);u&&(a.relation=u)}var c=n.getAttribute("w:anchor");c&&(a.anchor=c);var s=n.getAttribute("w:tooltip");s&&(a.tooltip=s);try{for(var f=o.__values(n.children),h=f.next();!h.done;h=f.next()){var m=h.value,p=m.tagName;if("w:r"===p)a.addChild(i.Run.fromXML(r,m));else console.warn("parse Hyperlink: Unknown key",p,m)}}catch(e){t={error:e}}finally{try{h&&!h.done&&(l=f.return)&&l.call(f)}finally{if(t)throw t.error}}return a},e}();r.Hyperlink=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/OpenXML"),m=function(){function e(){}return e.fromXML=function(n,r){var t=new e,m=r.getElementsByTagName("w:ilvl").item(0);m&&(t.ilvl=i.getVal(m));var o=r.getElementsByTagName("w:numId").item(0);return o&&(t.numId=i.getVal(o)),t},e}();n.NumberPr=m}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/InlineText.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/InlineText",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),t=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(o,r){var n,t,s=new e;try{for(var m=l.__values(r.children),c=m.next();!c.done;c=m.next()){var u=c.value,w=u.tagName;switch(w){case"w:r":s.addChild(d.Run.fromXML(o,u));break;case"w:hyperlink":s.addChild(i.Hyperlink.fromXML(o,u));break;case"w:bookmarkStart":s.addChild(a.BookmarkStart.fromXML(o,u));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:smartTagPr":case"w:del":break;default:console.warn("parse Inline: Unknown key",w,u)}}}catch(e){n={error:e}}finally{try{c&&!c.done&&(t=m.return)&&t.call(m)}finally{if(n)throw n.error}}return s},e}();o.InlineText=t}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/FldSimple.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/FldSimple",(function(e,n,i,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/word/InlineText"),r=function(){function e(){}return e.fromXML=function(n,i){var o=new e;return o.inlineText=t.InlineText.fromXML(n,i),o.instr=i.getAttribute("w:instr")||"",o},e}();n.FldSimple=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/OMath.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/OMath",(function(e,n,t,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(n,t){var o=new e;return o.element=t,o},e}();n.OMath=r}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Paragraph.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Paragraph",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/OpenXML"),n=e("node_modules/ooxml-viewer/lib/parse/parsePr"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),d=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/NumberProperties"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),p=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),u=e("node_modules/ooxml-viewer/lib/openxml/word/FldSimple"),w=e("node_modules/ooxml-viewer/lib/openxml/math/OMath"),c=e("node_modules/ooxml-viewer/lib/parse/mergeSdt");var f=function(){function e(){this.properties={},this.children=[],this.fldSimples=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parseParagraphPr=function(e,r){var o,a,m,i,s=n.parsePr(e,r),u=r.getElementsByTagName("w:pStyle").item(0);u&&(m=t.getVal(u));var w=r.getElementsByTagName("w:numPr").item(0);w&&(i=d.NumberPr.fromXML(e,w));var c=[],f=r.getElementsByTagName("w:tab");try{for(var b=l.__values(f),h=b.next();!h.done;h=b.next()){var v=h.value;c.push(p.Tab.fromXML(e,v))}}catch(e){o={error:e}}finally{try{h&&!h.done&&(a=b.return)&&a.call(b)}finally{if(o)throw o.error}}var x=function(e){var r=e.getElementsByTagName("w:autoSpaceDE").item(0),o=e.getElementsByTagName("w:autoSpaceDN").item(0);return!!r||!!o}(r);return{cssStyle:s,pStyle:m,numPr:i,tabs:c,autoSpace:x}},e.fromXML=function(r,o){var a,t,n=new e;n.fldSimples=[],n.paraId=o.getAttribute("w14:paraId")||"";try{for(var d=l.__values(c.mergeSdt(o)),p=d.next();!p.done;p=d.next()){var f=p.value,b=f.tagName;switch(b){case"w:pPr":n.properties=e.parseParagraphPr(r,f);break;case"w:r":n.addChild(s.Run.fromXML(r,f));break;case"w:hyperlink":n.addChild(i.Hyperlink.fromXML(r,f));break;case"w:bookmarkStart":n.addChild(m.BookmarkStart.fromXML(r,f));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:del":case"w:moveTo":case"w:moveFrom":break;case"w:fldSimple":n.fldSimples.push(u.FldSimple.fromXML(r,f));break;case"m:oMathPara":case"m:oMath":n.addChild(w.OMath.fromXML(r,f));break;default:console.warn("parse Paragraph: Unknown key",b,f)}}}catch(e){a={error:e}}finally{try{p&&!p.done&&(t=d.return)&&t.call(d)}finally{if(a)throw a.error}}return n},e}();r.Paragraph=f}));
;/*!node_modules/ooxml-viewer/lib/openxml/Style.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/Style",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/parse/parseTcPr"),s=e("node_modules/ooxml-viewer/lib/OpenXML"),o=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),c=e("node_modules/ooxml-viewer/lib/parse/parseTablePr"),u=e("node_modules/ooxml-viewer/lib/parse/parseTrPr");function w(e,r){var a,t,s={};try{for(var w=l.__values(r.children),d=w.next();!d.done;d=w.next()){var m=d.value;switch(m.tagName){case"w:rPr":s.rPr=i.Run.parseRunPr(e,m);break;case"w:pPr":s.pPr=o.Paragraph.parseParagraphPr(e,m);break;case"w:tblPr":s.tblPr=c.parseTablePr(e,m);break;case"w:tcPr":s.tcPr=n.parseTcPr(e,m);break;case"w:trPr":s.trPr=u.parseTrPr(e,m)}}}catch(e){a={error:e}}finally{try{d&&!d.done&&(t=w.return)&&t.call(w)}finally{if(a)throw a.error}}return s}function d(e,r){var a,t,n={};n.id=r.getAttribute("w:styleId")||"",n.type=r.getAttribute("w:type"),n.tblStylePr={},Object.assign(n,w(e,r));try{for(var o=l.__values(r.children),i=o.next();!i.done;i=o.next()){var c=i.value,u=c.tagName;switch(u){case"w:name":n.name=s.getVal(c);break;case"w:basedOn":n.basedOn=s.getVal(c);break;case"w:rPr":case"w:pPr":case"w:tblPr":case"w:tcPr":case"w:trPr":case"w:next":case"w:link":case"w:unhideWhenUsed":case"w:qFormat":case"w:rsid":case"w:uiPriority":case"w:semiHidden":case"w:autoRedefine":break;case"w:tblStylePr":var d=c.getAttribute("w:type");n.tblStylePr[d]=w(e,c);break;default:console.warn("parseStyle Unknown tag",u,c)}}}catch(e){a={error:e}}finally{try{i&&!i.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}return n}r.parseStyles=function(e,r){var a,t,n={styleMap:{}},s=Array.from(r.getElementsByTagName("w:style"));try{for(var c=l.__values(s),u=c.next();!u.done;u=c.next()){var w=d(e,u.value);w.id&&(n.styleMap[w.id]=w)}}catch(e){a={error:e}}finally{try{u&&!u.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return n.defaultStyle=function(e,r){var a={};if(!r)return a;var t=r.getElementsByTagName("w:rPrDefault").item(0);if(t){var l=t.getElementsByTagName("w:rPr").item(0);l&&(a.rPr=i.Run.parseRunPr(e,l))}var n=r.getElementsByTagName("w:pPrDefault").item(0);if(n){var s=n.getElementsByTagName("w:pPr").item(0);s&&(a.pPr=o.Paragraph.parseParagraphPr(e,s))}return a}(e,r.getElementsByTagName("w:docDefaults").item(0)),n}}));
;/*!node_modules/ooxml-viewer/lib/openxml/Theme.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/Theme",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/parse/parseSize"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),c=function(){this.colors={}};function m(e){var t={};return e&&(t.clrScheme=function(e){var t,r,l=new c;if(!e)return l;l.name=e.getAttribute("name")||"";try{for(var m=n.__values(e.children),s=m.next();!s.done;s=m.next()){var i=s.value,g=i.tagName.replace("a:",""),u=i.firstElementChild;if(u){var f=u.nodeName.replace("a:","");if("sysClr"===f)l.colors[g]=u.getAttribute("lastClr")||"";else if("srgbClr"===f)l.colors[g]="#"+u.getAttribute("val")||"";else if("scrgbClr"===f){var h=256*o.getAttrPercentage(i,"r"),v=256*o.getAttrPercentage(i,"g"),d=256*o.getAttrPercentage(i,"b");l.colors[g]="rgb(".concat(h,", ").concat(v,", ").concat(d,")")}else if("hslClr"===f){var b=a.convertAngle(i.getAttribute("hue")),y=100*o.getAttrPercentage(i,"sat"),A=100*o.getAttrPercentage(i,"lum");l.colors[g]="hsl(".concat(b,", ").concat(y,"%, ").concat(A,"%)")}else"prstClr"===f?l.colors[g]=o.getVal(i):console.error("unknown clr name",f)}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=m.return)&&r.call(m)}finally{if(t)throw t.error}}return l}(e.getElementsByTagName("a:clrScheme").item(0)),t.fontScheme=(e.getElementsByTagName("a:fontScheme").item(0),{}),t.fmtScheme=(e.getElementsByTagName("a:fmtScheme").item(0),{})),t}t.parseTheme=function(e){var t={};return t.themeElements=m(e.getElementsByTagName("a:themeElements").item(0)),t}}));
;/*!node_modules/ooxml-viewer/lib/util/dom.js*/
amis.define("node_modules/ooxml-viewer/lib/util/dom",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib");t.addClassName=function(e,t){e&&t&&e.classList.add(t)},t.addClassNames=function(e,t){var n;e&&t&&(n=e.classList).add.apply(n,a.__spreadArray([],a.__read(t),!1))},t.appendChild=function(e,t){e&&t&&e.appendChild(t)},t.applyStyle=function(e,t){if(t)for(var n in t){var r=t[n];null!=r&&""!==r&&e.style.setProperty(n,String(r))}},t.createElement=function(e){return document.createElement(e)},t.createSVGElement=function(e){return document.createElementNS("http://www.w3.org/2000/svg",e)},t.removeChild=function(e,t){e&&t&&e.removeChild(t)},t.styleToText=function(e){void 0===e&&(e={});var t="";for(var n in e){var r=e[n];null!=r&&""!==r&&(t+="".concat(n,": ").concat(r,";\n"))}return t}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBr.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBr",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");r.renderBr=function(e,r){return"page"===r.type&&(e.breakPage=!0),d.createElement("br")}}));
;/*!node_modules/ooxml-viewer/lib/render/renderStyle.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderStyle",(function(n,t,c,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("node_modules/tslib/tslib"),a=n("node_modules/ooxml-viewer/lib/util/dom");function r(n,t,c){var e="",o=c.tblPr,r=c.tcPr;if(o){var l=a.styleToText(o.cssStyle),s=a.styleToText(o.tcCSSStyle);if(e+="\n .".concat(n," .").concat(t," {\n  border-collapse: collapse;\n  ").concat(l,"\n }\n\n .").concat(n," .").concat(t," > tbody > tr > td {\n  ").concat(s,"\n }\n "),o.insideBorder){var d=o.insideBorder;d.H&&(e+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-top: ").concat(d.H,";\n      }")),d.V&&(e+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-left: ").concat(d.V,";\n      }"))}}if(r){var i=a.styleToText(r.cssStyle);e+="\n    .".concat(n," .").concat(t," > tbody > tr > td {\n     ").concat(i,"\n    }\n    ")}return e}function l(n,t,c,e){var o,r,l,s,d,i,y="",b=a.styleToText(null===(o=e.trPr)||void 0===o?void 0:o.cssStyle),v="";switch(c){case"firstCol":v="enable-firstColumn";break;case"lastCol":v="enable-lastColumn";break;case"firstRow":v="enable-firstRow";break;case"lastRow":v="enable-lastRow";break;case"band1Horz":case"band2Horz":v="enable-hBand";break;case"band1Vert":case"band2Vert":v="enable-vBand"}b&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr.").concat(c,"{\n       ").concat(b,"\n    }\n    "));var f=a.styleToText(null===(r=e.tcPr)||void 0===r?void 0:r.cssStyle);if(f&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n       ").concat(f,"\n    }\n    "),null===(l=e.tcPr)||void 0===l?void 0:l.insideBorder)){var u=null===(s=e.tcPr)||void 0===s?void 0:s.insideBorder;u.H&&(y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-top: ").concat(u.H,";\n          }")),u.V&&("none"===u.V?y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: none;\n            border-right: none;\n          }"):y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: ").concat(u.V,";\n          }"))}var T=a.styleToText(null===(d=e.pPr)||void 0===d?void 0:d.cssStyle);T&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p {\n       ").concat(T,"\n    }\n    "));var p=a.styleToText(null===(i=e.rPr)||void 0===i?void 0:i.cssStyle);return p&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p > .").concat(t,"-r {\n       ").concat(p,"\n    }\n    ")),y}var s=new Set(["wholeTable","band1Horz","band2Horz","band1Vert","band2Vert","firstCol","firstRow","lastCol","lastRow","neCell","nwCell","seCell","swCell"]);function d(n,t,c){var e,a;if(!c)return"";var r="",d=".".concat(n," .").concat(t);try{for(var i=o.__values(s),y=i.next();!y.done;y=i.next()){var b=y.value;if(b in c)r+=l(d,n,b,c[b])}}catch(n){e={error:n}}finally{try{y&&!y.done&&(a=i.return)&&a.call(i)}finally{if(e)throw e.error}}return r}t.generateTableStyle=r,t.renderStyle=function(n){var t=a.createElement("style"),c=function(n){var t=n.styles.defaultStyle,c="";(null==t?void 0:t.pPr)&&(c=a.styleToText(t.pPr.cssStyle));var e="";(null==t?void 0:t.rPr)&&(e=a.styleToText(t.rPr.cssStyle));var o=n.getClassPrefix();return"\n\n\n  /** docDefaults **/\n\n  .".concat(o," p {\n    margin: 0;\n    padding: 0;\n    line-height: 1.5;\n  }\n\n  .").concat(o,' .justify:after {\n    content: "";\n    display: inline-block;\n    width: 100%;\n  }\n\n  .').concat(o," table {\n    border-spacing: 0;\n  }\n\n  .").concat(o," .").concat(o,"-p {\n    ").concat(c,"\n  }\n\n  .").concat(o," .").concat(o,"-r {\n    white-space: pre-wrap;\n    overflow-wrap: break-word;\n    ").concat(e,"\n  }\n  ")}(n),e=function(n){var t=n.styles.styleMap,c=n.getClassPrefix(),e="";for(var o in t){var l=n.getStyleIdDisplayName(o),s=t[o],i=s.pPr,y="";if(i){var b=a.styleToText(i.cssStyle);y="\n      .".concat(c," .").concat(l," {\n        ").concat(b,"\n      }\n      ")}var v="";if(s.rPr){var f=a.styleToText(s.rPr.cssStyle);v="\n      .".concat(c," .").concat(l," > .").concat(c,"-r {\n        ").concat(f,"\n      }\n      ")}var u=r(c,l,s),T=d(c,l,s.tblStylePr);e+="\n    ".concat(y,"\n    ").concat(v,"\n    ").concat(u,"\n    ").concat(T,"\n    ")}return e}(n);return t.textContent="\n  ".concat(c,"\n\n  ").concat(e,"\n  "),t}}));
;/*!node_modules/ooxml-viewer/lib/render/setElementStyle.js*/
amis.define("node_modules/ooxml-viewer/lib/render/setElementStyle",(function(e,l,t,s){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/util/dom");l.setElementStyle=function(e,l,t){t&&(t.cssStyle&&(a.applyStyle(l,t.cssStyle),"justify"===t.cssStyle["text-align"]&&a.addClassName(l,"justify")),t.pStyle&&a.addClassNames(l,e.getStyleClassName(t.pStyle)),t.rStyle&&a.addClassNames(l,e.getStyleClassName(t.rStyle)))}}));
;/*!node_modules/ooxml-viewer/lib/render/renderTable.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderTable",(function(e,a,l,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),o=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),d=e("node_modules/ooxml-viewer/lib/util/dom"),s=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),i=e("node_modules/ooxml-viewer/lib/render/renderStyle"),c=e("node_modules/ooxml-viewer/lib/render/setElementStyle");function p(e,a,l,r,t,n,o){0===e&&0===a&&t.classList.add("nwCell"),0===e&&a===r-1&&t.classList.add("neCell"),e===l-1&&0===a&&t.classList.add("swCell"),e===l-1&&a===r-1&&t.classList.add("seCell"),0===e&&t.classList.add("firstRow"),e===l-1&&t.classList.add("lastRow"),0===a&&t.classList.add("firstCol"),a===r-1&&t.classList.add("lastCol"),m(e+1)&&t.classList.add("band1Horz"),m(e+1)||t.classList.add("band2Horz"),m(a+1)&&t.classList.add("band1Vert"),m(a+1)||t.classList.add("band2Vert")}function m(e,a){return!(e%2)}a.default=function e(a,l){var r,m,u,v,b,f,y=document.createElement("table"),w=l.properties;if(w.tblCaption){var h=document.createElement("caption");h.textContent=w.tblCaption,y.appendChild(h)}if(w.tblLook)for(var C in w.tblLook)"noHBand"===C?w.tblLook[C]||d.addClassName(y,"enable-hBand"):"noVBand"===C?w.tblLook[C]||d.addClassName(y,"enable-vBand"):w.tblLook[C]&&d.addClassName(y,"enable-"+C);c.setElementStyle(a,y,w);var S=a.genClassName();y.classList.add(S),a.appendStyle(i.generateTableStyle(a.getClassPrefix(),S,{tblPr:w}));var L=document.createElement("tbody");y.appendChild(L);var x=0;try{for(var _=t.__values(l.trs),g=_.next();!g.done;g=_.next()){var E=g.value,k=document.createElement("tr");L.appendChild(k);var B=0;try{for(var P=(u=void 0,t.__values(E.tcs)),z=P.next();!z.done;z=P.next()){var N=z.value,T=document.createElement("td");k.appendChild(T),p(x,B,l.trs.length,E.tcs.length,T,w.rowBandSize,w.colBandSize),E.properties.tcStyle&&d.applyStyle(T,E.properties.tcStyle);var H=N.properties;c.setElementStyle(a,T,H),H.gridSpan&&(T.colSpan=H.gridSpan),H.rowSpan&&(T.rowSpan=H.rowSpan);var V=!0;H.hideMark&&(V=!1);try{for(var M=(b=void 0,t.__values(N.children)),R=M.next();!R.done;R=M.next()){var j=R.value;if(j instanceof n.Paragraph){var O=s.default(a,j,V);d.appendChild(T,O)}else j instanceof o.Table?(V=!1,d.appendChild(T,e(a,j))):console.warn("unknown child type: "+j)}}catch(e){b={error:e}}finally{try{R&&!R.done&&(f=M.return)&&f.call(M)}finally{if(b)throw b.error}}H.rowSpan?B+=H.rowSpan:B++}}catch(e){u={error:e}}finally{try{z&&!z.done&&(v=P.return)&&v.call(P)}finally{if(u)throw u.error}}x++}}catch(e){r={error:e}}finally{try{g&&!g.done&&(m=_.return)&&m.call(_)}finally{if(r)throw r.error}}return y}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/presetShape.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/presetShape",(function(n,t,y,x){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.presetShape={accentBorderCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentBorderCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentBorderCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBackPrevious:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBeginning:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 8"},{n:"g15",f:"*/ g13 1 4"},{n:"g16",f:"+- g11 g14 0"},{n:"g17",f:"+- g11 g15 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBlank:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},actionButtonDocument:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"dx1",f:"*/ ss 9 32"},{n:"g11",f:"+- hc 0 dx1"},{n:"g12",f:"+- hc dx1 0"},{n:"g13",f:"*/ ss 3 16"},{n:"g14",f:"+- g12 0 g13"},{n:"g15",f:"+- g9 g13 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g14",y:"g9"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonEnd:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 3 4"},{n:"g15",f:"*/ g13 7 8"},{n:"g16",f:"+- g11 g14 0"},{n:"g17",f:"+- g11 g15 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonForwardNext:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonHelp:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g11",f:"+- hc 0 dx2"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 7"},{n:"g15",f:"*/ g13 3 14"},{n:"g16",f:"*/ g13 2 7"},{n:"g19",f:"*/ g13 3 7"},{n:"g20",f:"*/ g13 4 7"},{n:"g21",f:"*/ g13 17 28"},{n:"g23",f:"*/ g13 21 28"},{n:"g24",f:"*/ g13 11 14"},{n:"g27",f:"+- g9 g16 0"},{n:"g29",f:"+- g9 g21 0"},{n:"g30",f:"+- g9 g23 0"},{n:"g31",f:"+- g9 g24 0"},{n:"g33",f:"+- g11 g15 0"},{n:"g36",f:"+- g11 g19 0"},{n:"g37",f:"+- g11 g20 0"},{n:"g41",f:"*/ g13 1 14"},{n:"g42",f:"*/ g13 3 28"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonHome:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 16"},{n:"g15",f:"*/ g13 1 8"},{n:"g16",f:"*/ g13 3 16"},{n:"g17",f:"*/ g13 5 16"},{n:"g18",f:"*/ g13 7 16"},{n:"g19",f:"*/ g13 9 16"},{n:"g20",f:"*/ g13 11 16"},{n:"g21",f:"*/ g13 3 4"},{n:"g22",f:"*/ g13 13 16"},{n:"g23",f:"*/ g13 7 8"},{n:"g24",f:"+- g9 g14 0"},{n:"g25",f:"+- g9 g16 0"},{n:"g26",f:"+- g9 g17 0"},{n:"g27",f:"+- g9 g21 0"},{n:"g28",f:"+- g11 g15 0"},{n:"g29",f:"+- g11 g18 0"},{n:"g30",f:"+- g11 g19 0"},{n:"g31",f:"+- g11 g20 0"},{n:"g32",f:"+- g11 g22 0"},{n:"g33",f:"+- g11 g23 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"close"},{type:"moveTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"close"},{type:"moveTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"close"},{type:"moveTo",pt:{x:"g31",y:"g25"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"moveTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"moveTo",pt:{x:"g29",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonInformation:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g11",f:"+- hc 0 dx2"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 32"},{n:"g17",f:"*/ g13 5 16"},{n:"g18",f:"*/ g13 3 8"},{n:"g19",f:"*/ g13 13 32"},{n:"g20",f:"*/ g13 19 32"},{n:"g22",f:"*/ g13 11 16"},{n:"g23",f:"*/ g13 13 16"},{n:"g24",f:"*/ g13 7 8"},{n:"g25",f:"+- g9 g14 0"},{n:"g28",f:"+- g9 g17 0"},{n:"g29",f:"+- g9 g18 0"},{n:"g30",f:"+- g9 g23 0"},{n:"g31",f:"+- g9 g24 0"},{n:"g32",f:"+- g11 g17 0"},{n:"g34",f:"+- g11 g19 0"},{n:"g35",f:"+- g11 g20 0"},{n:"g37",f:"+- g11 g22 0"},{n:"g38",f:"*/ g13 3 32"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonMovie:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1455 21600"},{n:"g15",f:"*/ g13 1905 21600"},{n:"g16",f:"*/ g13 2325 21600"},{n:"g17",f:"*/ g13 16155 21600"},{n:"g18",f:"*/ g13 17010 21600"},{n:"g19",f:"*/ g13 19335 21600"},{n:"g20",f:"*/ g13 19725 21600"},{n:"g21",f:"*/ g13 20595 21600"},{n:"g22",f:"*/ g13 5280 21600"},{n:"g23",f:"*/ g13 5730 21600"},{n:"g24",f:"*/ g13 6630 21600"},{n:"g25",f:"*/ g13 7492 21600"},{n:"g26",f:"*/ g13 9067 21600"},{n:"g27",f:"*/ g13 9555 21600"},{n:"g28",f:"*/ g13 13342 21600"},{n:"g29",f:"*/ g13 14580 21600"},{n:"g30",f:"*/ g13 15592 21600"},{n:"g31",f:"+- g11 g14 0"},{n:"g32",f:"+- g11 g15 0"},{n:"g33",f:"+- g11 g16 0"},{n:"g34",f:"+- g11 g17 0"},{n:"g35",f:"+- g11 g18 0"},{n:"g36",f:"+- g11 g19 0"},{n:"g37",f:"+- g11 g20 0"},{n:"g38",f:"+- g11 g21 0"},{n:"g39",f:"+- g9 g22 0"},{n:"g40",f:"+- g9 g23 0"},{n:"g41",f:"+- g9 g24 0"},{n:"g42",f:"+- g9 g25 0"},{n:"g43",f:"+- g9 g26 0"},{n:"g44",f:"+- g9 g27 0"},{n:"g45",f:"+- g9 g28 0"},{n:"g46",f:"+- g9 g29 0"},{n:"g47",f:"+- g9 g30 0"},{n:"g48",f:"+- g9 g31 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonReturn:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 7 8"},{n:"g15",f:"*/ g13 3 4"},{n:"g16",f:"*/ g13 5 8"},{n:"g17",f:"*/ g13 3 8"},{n:"g18",f:"*/ g13 1 4"},{n:"g19",f:"+- g9 g15 0"},{n:"g20",f:"+- g9 g16 0"},{n:"g21",f:"+- g9 g18 0"},{n:"g22",f:"+- g11 g14 0"},{n:"g23",f:"+- g11 g15 0"},{n:"g24",f:"+- g11 g16 0"},{n:"g25",f:"+- g11 g17 0"},{n:"g26",f:"+- g11 g18 0"},{n:"g27",f:"*/ g13 1 8"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"lnTo",pt:{x:"g22",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g26",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonSound:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 8"},{n:"g15",f:"*/ g13 5 16"},{n:"g16",f:"*/ g13 5 8"},{n:"g17",f:"*/ g13 11 16"},{n:"g18",f:"*/ g13 3 4"},{n:"g19",f:"*/ g13 7 8"},{n:"g20",f:"+- g9 g14 0"},{n:"g21",f:"+- g9 g15 0"},{n:"g22",f:"+- g9 g17 0"},{n:"g23",f:"+- g9 g19 0"},{n:"g24",f:"+- g11 g15 0"},{n:"g25",f:"+- g11 g16 0"},{n:"g26",f:"+- g11 g18 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"close"},{type:"moveTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g12",y:"g20"}},{type:"moveTo",pt:{x:"g26",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"moveTo",pt:{x:"g26",y:"g22"}},{type:"lnTo",pt:{x:"g12",y:"g23"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},arc:{avLst:[{n:"adj1",f:"val 16200000"},{n:"adj2",f:"val 0"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw11",f:"+- enAng 0 stAng"},{n:"sw12",f:"+- sw11 21600000 0"},{n:"swAng",f:"?: sw11 sw11 sw12"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"sw0",f:"+- 21600000 0 stAng"},{n:"da1",f:"+- swAng 0 sw0"},{n:"g1",f:"max x1 x2"},{n:"ir",f:"?: da1 r g1"},{n:"sw1",f:"+- cd4 0 stAng"},{n:"sw2",f:"+- 27000000 0 stAng"},{n:"sw3",f:"?: sw1 sw1 sw2"},{n:"da2",f:"+- swAng 0 sw3"},{n:"g5",f:"max y1 y2"},{n:"ib",f:"?: da2 b g5"},{n:"sw4",f:"+- cd2 0 stAng"},{n:"sw5",f:"+- 32400000 0 stAng"},{n:"sw6",f:"?: sw4 sw4 sw5"},{n:"da3",f:"+- swAng 0 sw6"},{n:"g9",f:"min x1 x2"},{n:"il",f:"?: da3 l g9"},{n:"sw7",f:"+- 3cd4 0 stAng"},{n:"sw8",f:"+- 37800000 0 stAng"},{n:"sw9",f:"?: sw7 sw7 sw8"},{n:"da4",f:"+- swAng 0 sw9"},{n:"g13",f:"min y1 y2"},{n:"it",f:"?: da4 t g13"},{n:"cang1",f:"+- stAng 0 cd4"},{n:"cang2",f:"+- enAng cd4 0"},{n:"cang3",f:"+/ cang1 cang2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"hc",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"}],fill:"none",extrusionOk:!1,stroke:!0}]},bentArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 43750"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"a3",f:"pin 0 adj3 50000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw2",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"dh2",f:"+- aw2 0 th2"},{n:"ah",f:"*/ ss a3 100000"},{n:"bw",f:"+- r 0 ah"},{n:"bh",f:"+- b 0 dh2"},{n:"bs",f:"min bw bh"},{n:"maxAdj4",f:"*/ 100000 bs ss"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"bd",f:"*/ ss a4 100000"},{n:"bd3",f:"+- bd 0 th"},{n:"bd2",f:"max bd3 0"},{n:"x3",f:"+- th bd2 0"},{n:"x4",f:"+- r 0 ah"},{n:"y3",f:"+- dh2 th 0"},{n:"y4",f:"+- y3 dh2 0"},{n:"y5",f:"+- dh2 bd 0"},{n:"y6",f:"+- y3 bd2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y5"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"dh2"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"lnTo",pt:{x:"r",y:"aw2"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"th",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},bentConnector2:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector3:{avLst:[{n:"adj1",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector4:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"},{n:"x2",f:"+/ x1 r 2"},{n:"y2",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector5:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"},{n:"x3",f:"*/ w adj3 100000"},{n:"x2",f:"+/ x1 x3 2"},{n:"y2",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y2 2"},{n:"y3",f:"+/ b y2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"a3",f:"pin 0 adj3 50000"},{n:"y1",f:"*/ ss a3 100000"},{n:"dx1",f:"*/ ss a2 50000"},{n:"x1",f:"+- r 0 dx1"},{n:"dx3",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x2",f:"+- x3 0 dx2"},{n:"x4",f:"+- x3 dx2 0"},{n:"dy2",f:"*/ ss a1 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"x0",f:"*/ x4 1 2"},{n:"y3",f:"+/ y2 b 2"},{n:"y15",f:"+/ y1 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},bevel:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"close"}],fill:"lightenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"moveTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},blockArc:{avLst:[{n:"adj1",f:"val 10800000"},{n:"adj2",f:"val 0"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"istAng",f:"pin 0 adj2 21599999"},{n:"a3",f:"pin 0 adj3 50000"},{n:"sw11",f:"+- istAng 0 stAng"},{n:"sw12",f:"+- sw11 21600000 0"},{n:"swAng",f:"?: sw11 sw11 sw12"},{n:"iswAng",f:"+- 0 0 swAng"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"wt3",f:"sin wd2 istAng"},{n:"ht3",f:"cos hd2 istAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"dx3",f:"cat2 wd2 ht3 wt3"},{n:"dy3",f:"sat2 hd2 ht3 wt3"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x3",f:"+- hc dx3 0"},{n:"y3",f:"+- vc dy3 0"},{n:"dr",f:"*/ ss a3 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"wt2",f:"sin iwd2 istAng"},{n:"ht2",f:"cos ihd2 istAng"},{n:"wt4",f:"sin iwd2 stAng"},{n:"ht4",f:"cos ihd2 stAng"},{n:"dx2",f:"cat2 iwd2 ht2 wt2"},{n:"dy2",f:"sat2 ihd2 ht2 wt2"},{n:"dx4",f:"cat2 iwd2 ht4 wt4"},{n:"dy4",f:"sat2 ihd2 ht4 wt4"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"x4",f:"+- hc dx4 0"},{n:"y4",f:"+- vc dy4 0"},{n:"sw0",f:"+- 21600000 0 stAng"},{n:"da1",f:"+- swAng 0 sw0"},{n:"g1",f:"max x1 x2"},{n:"g2",f:"max x3 x4"},{n:"g3",f:"max g1 g2"},{n:"ir",f:"?: da1 r g3"},{n:"sw1",f:"+- cd4 0 stAng"},{n:"sw2",f:"+- 27000000 0 stAng"},{n:"sw3",f:"?: sw1 sw1 sw2"},{n:"da2",f:"+- swAng 0 sw3"},{n:"g5",f:"max y1 y2"},{n:"g6",f:"max y3 y4"},{n:"g7",f:"max g5 g6"},{n:"ib",f:"?: da2 b g7"},{n:"sw4",f:"+- cd2 0 stAng"},{n:"sw5",f:"+- 32400000 0 stAng"},{n:"sw6",f:"?: sw4 sw4 sw5"},{n:"da3",f:"+- swAng 0 sw6"},{n:"g9",f:"min x1 x2"},{n:"g10",f:"min x3 x4"},{n:"g11",f:"min g9 g10"},{n:"il",f:"?: da3 l g11"},{n:"sw7",f:"+- 3cd4 0 stAng"},{n:"sw8",f:"+- 37800000 0 stAng"},{n:"sw9",f:"?: sw7 sw7 sw8"},{n:"da4",f:"+- swAng 0 sw9"},{n:"g13",f:"min y1 y2"},{n:"g14",f:"min y3 y4"},{n:"g15",f:"min g13 g14"},{n:"it",f:"?: da4 t g15"},{n:"x5",f:"+/ x1 x4 2"},{n:"y5",f:"+/ y1 y4 2"},{n:"x6",f:"+/ x3 x2 2"},{n:"y6",f:"+/ y3 y2 2"},{n:"cang1",f:"+- stAng 0 cd4"},{n:"cang2",f:"+- istAng cd4 0"},{n:"cang3",f:"+/ cang1 cang2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"istAng",swAng:"iswAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},borderCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},borderCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},borderCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bracePair:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"*/ ss a 50000"},{n:"x3",f:"+- r 0 x2"},{n:"x4",f:"+- r 0 x1"},{n:"y2",f:"+- vc 0 x1"},{n:"y3",f:"+- vc x1 0"},{n:"y4",f:"+- b 0 x1"},{n:"it",f:"*/ x1 29289 100000"},{n:"il",f:"+- x1 it 0"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x2",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"moveTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},bracketPair:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"moveTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},callout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},callout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},callout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},can:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 200000"},{n:"y2",f:"+- y1 y1 0"},{n:"y3",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-10800000"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"lnTo",pt:{x:"l",y:"y1"}}],fill:"none",extrusionOk:!1,stroke:!0}]},chartPlus:{pathLst:[{defines:[{type:"moveTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"10"}},{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"10",y:"5"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chartStar:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"moveTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"moveTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"10"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chartX:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"moveTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chevron:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"x3",f:"*/ x2 1 2"},{n:"dx",f:"+- x2 0 x1"},{n:"il",f:"?: dx x1 l"},{n:"ir",f:"?: dx x2 r"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},chord:{avLst:[{n:"adj1",f:"val 2700000"},{n:"adj2",f:"val 16200000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw1",f:"+- enAng 0 stAng"},{n:"sw2",f:"+- sw1 21600000 0"},{n:"swAng",f:"?: sw1 sw1 sw2"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"x3",f:"+/ x1 x2 2"},{n:"y3",f:"+/ y1 y2 2"},{n:"midAng0",f:"*/ swAng 1 2"},{n:"midAng",f:"+- stAng midAng0 cd2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},circularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 1142319"},{n:"adj3",f:"val 20457681"},{n:"adj4",f:"val 10800000"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"maxAng",f:"abs u21"},{n:"aAng",f:"pin 0 adj2 maxAng"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"wtE",f:"sin rw1 stAng"},{n:"htE",f:"cos rh1 stAng"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng",f:"?: ist0 ist0 ist1"},{n:"isw1",f:"+- stAng 0 istAng"},{n:"isw2",f:"+- isw1 0 21600000"},{n:"iswAng",f:"?: isw1 isw2 isw1"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"sw0",f:"+- en2 0 stAng"},{n:"sw1",f:"+- sw0 21600000 0"},{n:"swAng",f:"?: sw0 sw0 sw1"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"aI",f:"+- stAng 0 cd4"},{n:"aA",f:"+- ptAng cd4 0"},{n:"aB",f:"+- ptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xE",y:"yE"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xC",y:"yC"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},cloud:{gdLst:[{n:"il",f:"*/ w 2977 21600"},{n:"it",f:"*/ h 3262 21600"},{n:"ir",f:"*/ w 17087 21600"},{n:"ib",f:"*/ h 17337 21600"},{n:"g27",f:"*/ w 67 21600"},{n:"g28",f:"*/ h 21577 21600"},{n:"g29",f:"*/ w 21582 21600"},{n:"g30",f:"*/ h 1235 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3900",y:"14370"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-11429249",swAng:"7426832"},{type:"arcTo",wR:"5333",hR:"7267",stAng:"-8646143",swAng:"5396714"},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-8748475",swAng:"5983381"},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-7859164",swAng:"7034504"},{type:"arcTo",wR:"5333",hR:"7273",stAng:"-4722533",swAng:"6541615"},{type:"arcTo",wR:"6775",hR:"9220",stAng:"-2776035",swAng:"7816140"},{type:"arcTo",wR:"5785",hR:"7867",stAng:"37501",swAng:"6842000"},{type:"arcTo",wR:"6752",hR:"9215",stAng:"1347096",swAng:"6910353"},{type:"arcTo",wR:"7720",hR:"10543",stAng:"3974558",swAng:"4542661"},{type:"arcTo",wR:"4360",hR:"5918",stAng:"-16496525",swAng:"8804134"},{type:"arcTo",wR:"4345",hR:"5945",stAng:"-14809710",swAng:"9151131"},{type:"close"}],extrusionOk:!1,stroke:!0,w:43200,h:43200},{defines:[{type:"moveTo",pt:{x:"4693",y:"26177"}},{type:"arcTo",wR:"4345",hR:"5945",stAng:"5204520",swAng:"1585770"},{type:"moveTo",pt:{x:"6928",y:"34899"}},{type:"arcTo",wR:"4360",hR:"5918",stAng:"4416628",swAng:"686848"},{type:"moveTo",pt:{x:"16478",y:"39090"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"8257449",swAng:"844866"},{type:"moveTo",pt:{x:"28827",y:"34751"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"387196",swAng:"959901"},{type:"moveTo",pt:{x:"34129",y:"22954"}},{type:"arcTo",wR:"5785",hR:"7867",stAng:"-4217541",swAng:"4255042"},{type:"moveTo",pt:{x:"41798",y:"15354"}},{type:"arcTo",wR:"5333",hR:"7273",stAng:"1819082",swAng:"1665090"},{type:"moveTo",pt:{x:"38324",y:"5426"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-824660",swAng:"891534"},{type:"moveTo",pt:{x:"29078",y:"3952"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-8950887",swAng:"1091722"},{type:"moveTo",pt:{x:"22141",y:"4720"}},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-9809656",swAng:"1061181"},{type:"moveTo",pt:{x:"14000",y:"5192"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-4002417",swAng:"739161"},{type:"moveTo",pt:{x:"4127",y:"15789"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"9459261",swAng:"711490"}],fill:"none",extrusionOk:!1,stroke:!0,w:43200,h:43200}]},cloudCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"ht",f:"cat2 hd2 dxPos dyPos"},{n:"wt",f:"sat2 wd2 dxPos dyPos"},{n:"g2",f:"cat2 wd2 ht wt"},{n:"g3",f:"sat2 hd2 ht wt"},{n:"g4",f:"+- hc g2 0"},{n:"g5",f:"+- vc g3 0"},{n:"g6",f:"+- g4 0 xPos"},{n:"g7",f:"+- g5 0 yPos"},{n:"g8",f:"mod g6 g7 0"},{n:"g9",f:"*/ ss 6600 21600"},{n:"g10",f:"+- g8 0 g9"},{n:"g11",f:"*/ g10 1 3"},{n:"g12",f:"*/ ss 1800 21600"},{n:"g13",f:"+- g11 g12 0"},{n:"g14",f:"*/ g13 g6 g8"},{n:"g15",f:"*/ g13 g7 g8"},{n:"g16",f:"+- g14 xPos 0"},{n:"g17",f:"+- g15 yPos 0"},{n:"g18",f:"*/ ss 4800 21600"},{n:"g19",f:"*/ g11 2 1"},{n:"g20",f:"+- g18 g19 0"},{n:"g21",f:"*/ g20 g6 g8"},{n:"g22",f:"*/ g20 g7 g8"},{n:"g23",f:"+- g21 xPos 0"},{n:"g24",f:"+- g22 yPos 0"},{n:"g25",f:"*/ ss 1200 21600"},{n:"g26",f:"*/ ss 600 21600"},{n:"x23",f:"+- xPos g26 0"},{n:"x24",f:"+- g16 g25 0"},{n:"x25",f:"+- g23 g12 0"},{n:"il",f:"*/ w 2977 21600"},{n:"it",f:"*/ h 3262 21600"},{n:"ir",f:"*/ w 17087 21600"},{n:"ib",f:"*/ h 17337 21600"},{n:"g27",f:"*/ w 67 21600"},{n:"g28",f:"*/ h 21577 21600"},{n:"g29",f:"*/ w 21582 21600"},{n:"g30",f:"*/ h 1235 21600"},{n:"pang",f:"at2 dxPos dyPos"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3900",y:"14370"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-11429249",swAng:"7426832"},{type:"arcTo",wR:"5333",hR:"7267",stAng:"-8646143",swAng:"5396714"},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-8748475",swAng:"5983381"},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-7859164",swAng:"7034504"},{type:"arcTo",wR:"5333",hR:"7273",stAng:"-4722533",swAng:"6541615"},{type:"arcTo",wR:"6775",hR:"9220",stAng:"-2776035",swAng:"7816140"},{type:"arcTo",wR:"5785",hR:"7867",stAng:"37501",swAng:"6842000"},{type:"arcTo",wR:"6752",hR:"9215",stAng:"1347096",swAng:"6910353"},{type:"arcTo",wR:"7720",hR:"10543",stAng:"3974558",swAng:"4542661"},{type:"arcTo",wR:"4360",hR:"5918",stAng:"-16496525",swAng:"8804134"},{type:"arcTo",wR:"4345",hR:"5945",stAng:"-14809710",swAng:"9151131"},{type:"close"}],extrusionOk:!1,stroke:!0,w:43200,h:43200},{defines:[{type:"moveTo",pt:{x:"x23",y:"yPos"}},{type:"arcTo",wR:"g26",hR:"g26",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x24",y:"g17"}},{type:"arcTo",wR:"g25",hR:"g25",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x25",y:"g24"}},{type:"arcTo",wR:"g12",hR:"g12",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"4693",y:"26177"}},{type:"arcTo",wR:"4345",hR:"5945",stAng:"5204520",swAng:"1585770"},{type:"moveTo",pt:{x:"6928",y:"34899"}},{type:"arcTo",wR:"4360",hR:"5918",stAng:"4416628",swAng:"686848"},{type:"moveTo",pt:{x:"16478",y:"39090"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"8257449",swAng:"844866"},{type:"moveTo",pt:{x:"28827",y:"34751"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"387196",swAng:"959901"},{type:"moveTo",pt:{x:"34129",y:"22954"}},{type:"arcTo",wR:"5785",hR:"7867",stAng:"-4217541",swAng:"4255042"},{type:"moveTo",pt:{x:"41798",y:"15354"}},{type:"arcTo",wR:"5333",hR:"7273",stAng:"1819082",swAng:"1665090"},{type:"moveTo",pt:{x:"38324",y:"5426"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-824660",swAng:"891534"},{type:"moveTo",pt:{x:"29078",y:"3952"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-8950887",swAng:"1091722"},{type:"moveTo",pt:{x:"22141",y:"4720"}},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-9809656",swAng:"1061181"},{type:"moveTo",pt:{x:"14000",y:"5192"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-4002417",swAng:"739161"},{type:"moveTo",pt:{x:"4127",y:"15789"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"9459261",swAng:"711490"}],fill:"none",extrusionOk:!1,stroke:!0,w:43200,h:43200}]},corner:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj1",f:"*/ 100000 h ss"},{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"dy1",f:"*/ ss a1 100000"},{n:"y1",f:"+- b 0 dy1"},{n:"cx1",f:"*/ x1 1 2"},{n:"cy1",f:"+/ y1 b 2"},{n:"d",f:"+- w 0 h"},{n:"it",f:"?: d y1 t"},{n:"ir",f:"?: d r x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},cornerTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"lnTo",pt:{x:"l",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},cube:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"y1",f:"*/ ss a 100000"},{n:"y4",f:"+- b 0 y1"},{n:"y2",f:"*/ y4 1 2"},{n:"y3",f:"+/ y1 b 2"},{n:"x4",f:"+- r 0 y1"},{n:"x2",f:"*/ x4 1 2"},{n:"x3",f:"+/ y1 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"y1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"close"}],fill:"lightenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"y1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector2:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"wd2",y:"t"},{x:"r",y:"hd2"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector3:{avLst:[{n:"adj1",f:"val 50000"}],gdLst:[{n:"x2",f:"*/ w adj1 100000"},{n:"x1",f:"+/ l x2 2"},{n:"x3",f:"+/ r x2 2"},{n:"y3",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x1",y:"t"},{x:"x2",y:"hd4"},{x:"x2",y:"vc"}]},{type:"cubicBezTo",pts:[{x:"x2",y:"y3"},{x:"x3",y:"b"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector4:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"x2",f:"*/ w adj1 100000"},{n:"x1",f:"+/ l x2 2"},{n:"x3",f:"+/ r x2 2"},{n:"x4",f:"+/ x2 x3 2"},{n:"x5",f:"+/ x3 r 2"},{n:"y4",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y4 2"},{n:"y2",f:"+/ t y1 2"},{n:"y3",f:"+/ y1 y4 2"},{n:"y5",f:"+/ b y4 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x1",y:"t"},{x:"x2",y:"y2"},{x:"x2",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x2",y:"y3"},{x:"x4",y:"y4"},{x:"x3",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x5",y:"y4"},{x:"r",y:"y5"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector5:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 50000"}],gdLst:[{n:"x3",f:"*/ w adj1 100000"},{n:"x6",f:"*/ w adj3 100000"},{n:"x1",f:"+/ x3 x6 2"},{n:"x2",f:"+/ l x3 2"},{n:"x4",f:"+/ x3 x1 2"},{n:"x5",f:"+/ x6 x1 2"},{n:"x7",f:"+/ x6 r 2"},{n:"y4",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y4 2"},{n:"y2",f:"+/ t y1 2"},{n:"y3",f:"+/ y1 y4 2"},{n:"y5",f:"+/ b y4 2"},{n:"y6",f:"+/ y5 y4 2"},{n:"y7",f:"+/ y5 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x2",y:"t"},{x:"x3",y:"y2"},{x:"x3",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x3",y:"y3"},{x:"x4",y:"y4"},{x:"x1",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x5",y:"y4"},{x:"x6",y:"y6"},{x:"x6",y:"y5"}]},{type:"cubicBezTo",pts:[{x:"x6",y:"y7"},{x:"x7",y:"b"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedDownArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"wR",f:"+- wd2 0 q1"},{n:"q7",f:"*/ wR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idy",f:"*/ q11 h q7"},{n:"maxAdj3",f:"*/ 100000 idy ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss adj3 100000"},{n:"x3",f:"+- wR th 0"},{n:"q2",f:"*/ h h 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dx",f:"*/ q5 wR h"},{n:"x5",f:"+- wR dx 0"},{n:"x7",f:"+- x3 dx 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"x4",f:"+- x5 0 dh"},{n:"x8",f:"+- x7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"x6",f:"+- r 0 aw2"},{n:"y1",f:"+- b 0 ah"},{n:"swAng",f:"at2 ah dx"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"iy",f:"+- b 0 idy"},{n:"ix",f:"+/ wR x3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idy q12"},{n:"stAng",f:"+- 3cd4 swAng 0"},{n:"stAng2",f:"+- 3cd4 0 dang2"},{n:"swAng2",f:"+- dang2 0 cd4"},{n:"swAng3",f:"+- cd4 dang2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng",swAng:"mswAng"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"3cd4",swAng:"swAng"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"swAng3"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"3cd4",swAng:"swAng"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng",swAng:"mswAng"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedLeftArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 a2"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"hR",f:"+- hd2 0 q1"},{n:"q7",f:"*/ hR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idx",f:"*/ q11 w q7"},{n:"maxAdj3",f:"*/ 100000 idx ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss a3 100000"},{n:"y3",f:"+- hR th 0"},{n:"q2",f:"*/ w w 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dy",f:"*/ q5 hR w"},{n:"y5",f:"+- hR dy 0"},{n:"y7",f:"+- y3 dy 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"y4",f:"+- y5 0 dh"},{n:"y8",f:"+- y7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"y6",f:"+- b 0 aw2"},{n:"x1",f:"+- l ah 0"},{n:"swAng",f:"at2 ah dy"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"ix",f:"+- l idx 0"},{n:"iy",f:"+/ hR y3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idx q12"},{n:"swAng2",f:"+- dang2 0 swAng"},{n:"swAng3",f:"+- swAng dang2 0"},{n:"stAng3",f:"+- 0 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"swAng",swAng:"swAng2"},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng3",swAng:"swAng3"},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"swAng"},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"l",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"swAng",swAng:"swAng2"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedRightArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 a2"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"hR",f:"+- hd2 0 q1"},{n:"q7",f:"*/ hR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idx",f:"*/ q11 w q7"},{n:"maxAdj3",f:"*/ 100000 idx ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss a3 100000"},{n:"y3",f:"+- hR th 0"},{n:"q2",f:"*/ w w 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dy",f:"*/ q5 hR w"},{n:"y5",f:"+- hR dy 0"},{n:"y7",f:"+- y3 dy 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"y4",f:"+- y5 0 dh"},{n:"y8",f:"+- y7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"y6",f:"+- b 0 aw2"},{n:"x1",f:"+- r 0 ah"},{n:"swAng",f:"at2 ah dy"},{n:"stAng",f:"+- cd2 0 swAng"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"ix",f:"+- r 0 idx"},{n:"iy",f:"+/ hR y3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idx q12"},{n:"swAng2",f:"+- dang2 0 cd4"},{n:"swAng3",f:"+- cd4 dang2 0"},{n:"stAng3",f:"+- cd2 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"mswAng"},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"th"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"swAng2"},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng3",swAng:"swAng3"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"mswAng"},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"th"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"swAng2"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"wR",f:"+- wd2 0 q1"},{n:"q7",f:"*/ wR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idy",f:"*/ q11 h q7"},{n:"maxAdj3",f:"*/ 100000 idy ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss adj3 100000"},{n:"x3",f:"+- wR th 0"},{n:"q2",f:"*/ h h 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dx",f:"*/ q5 wR h"},{n:"x5",f:"+- wR dx 0"},{n:"x7",f:"+- x3 dx 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"x4",f:"+- x5 0 dh"},{n:"x8",f:"+- x7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"x6",f:"+- r 0 aw2"},{n:"y1",f:"+- t ah 0"},{n:"swAng",f:"at2 ah dx"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"iy",f:"+- t idy 0"},{n:"ix",f:"+/ wR x3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idy q12"},{n:"swAng2",f:"+- dang2 0 swAng"},{n:"mswAng2",f:"+- 0 0 swAng2"},{n:"stAng3",f:"+- cd4 0 swAng"},{n:"swAng3",f:"+- swAng dang2 0"},{n:"stAng2",f:"+- cd4 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x6",y:"t"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng3",swAng:"swAng3"},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"wR",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"th",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"-5400000"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"t"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng3",swAng:"swAng"},{type:"lnTo",pt:{x:"wR",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"th",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"-5400000"}],fill:"none",extrusionOk:!1,stroke:!0}]},decagon:{avLst:[{n:"vf",f:"val 105146"}],gdLst:[{n:"shd2",f:"*/ hd2 vf 100000"},{n:"dx1",f:"cos wd2 2160000"},{n:"dx2",f:"cos wd2 4320000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy1",f:"sin shd2 4320000"},{n:"dy2",f:"sin shd2 2160000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},diagStripe:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"x2",f:"*/ w a 100000"},{n:"x1",f:"*/ x2 1 2"},{n:"x3",f:"+/ x2 r 2"},{n:"y2",f:"*/ h a 100000"},{n:"y1",f:"*/ y2 1 2"},{n:"y3",f:"+/ y2 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},diamond:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},dodecagon:{gdLst:[{n:"x1",f:"*/ w 2894 21600"},{n:"x2",f:"*/ w 7906 21600"},{n:"x3",f:"*/ w 13694 21600"},{n:"x4",f:"*/ w 18706 21600"},{n:"y1",f:"*/ h 2894 21600"},{n:"y2",f:"*/ h 7906 21600"},{n:"y3",f:"*/ h 13694 21600"},{n:"y4",f:"*/ h 18706 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},donut:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dr",f:"*/ ss a 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"dr",y:"vc"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"3cd4",swAng:"-5400000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},doubleWave:{avLst:[{n:"adj1",f:"val 6250"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 12500"},{n:"a2",f:"pin -10000 adj2 10000"},{n:"y1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ y1 10 3"},{n:"y2",f:"+- y1 0 dy2"},{n:"y3",f:"+- y1 dy2 0"},{n:"y4",f:"+- b 0 y1"},{n:"y5",f:"+- y4 0 dy2"},{n:"y6",f:"+- y4 dy2 0"},{n:"dx1",f:"*/ w a2 100000"},{n:"of2",f:"*/ w a2 50000"},{n:"x1",f:"abs dx1"},{n:"dx2",f:"?: of2 0 of2"},{n:"x2",f:"+- l 0 dx2"},{n:"dx8",f:"?: of2 of2 0"},{n:"x8",f:"+- r 0 dx8"},{n:"dx3",f:"+/ dx2 x8 6"},{n:"x3",f:"+- x2 dx3 0"},{n:"dx4",f:"+/ dx2 x8 3"},{n:"x4",f:"+- x2 dx4 0"},{n:"x5",f:"+/ x2 x8 2"},{n:"x6",f:"+- x5 dx3 0"},{n:"x7",f:"+/ x6 x8 2"},{n:"x9",f:"+- l dx8 0"},{n:"x15",f:"+- r dx2 0"},{n:"x10",f:"+- x9 dx3 0"},{n:"x11",f:"+- x9 dx4 0"},{n:"x12",f:"+/ x9 x15 2"},{n:"x13",f:"+- x12 dx3 0"},{n:"x14",f:"+/ x13 x15 2"},{n:"x16",f:"+- r 0 x1"},{n:"xAdj",f:"+- hc dx1 0"},{n:"il",f:"max x2 x9"},{n:"ir",f:"min x8 x15"},{n:"it",f:"*/ h a1 50000"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y2"},{x:"x4",y:"y3"},{x:"x5",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x6",y:"y2"},{x:"x7",y:"y3"},{x:"x8",y:"y1"}]},{type:"lnTo",pt:{x:"x15",y:"y4"}},{type:"cubicBezTo",pts:[{x:"x14",y:"y6"},{x:"x13",y:"y5"},{x:"x12",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x11",y:"y6"},{x:"x10",y:"y5"},{x:"x9",y:"y4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},downArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy1",f:"*/ ss a2 100000"},{n:"y1",f:"+- b 0 dy1"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy2",f:"*/ x1 dy1 wd2"},{n:"y2",f:"+- y1 dy2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},downArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss h"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy3",f:"*/ ss a3 100000"},{n:"y3",f:"+- b 0 dy3"},{n:"y2",f:"*/ h a4 100000"},{n:"y1",f:"*/ y2 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},ellipse:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},ellipseRibbon:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"q10",f:"+- 100000 0 a1"},{n:"q11",f:"*/ q10 1 2"},{n:"q12",f:"+- a1 0 q11"},{n:"minAdj3",f:"max 0 q12"},{n:"a3",f:"pin minAdj3 adj3 a1"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- x2 wd8 0"},{n:"x4",f:"+- r 0 x3"},{n:"x5",f:"+- r 0 x2"},{n:"x6",f:"+- r 0 wd8"},{n:"dy1",f:"*/ h a3 100000"},{n:"f1",f:"*/ 4 dy1 w"},{n:"q1",f:"*/ x3 x3 w"},{n:"q2",f:"+- x3 0 q1"},{n:"y1",f:"*/ f1 q2 1"},{n:"cx1",f:"*/ x3 1 2"},{n:"cy1",f:"*/ f1 cx1 1"},{n:"cx2",f:"+- r 0 cx1"},{n:"q1",f:"*/ h a1 100000"},{n:"dy3",f:"+- q1 0 dy1"},{n:"q3",f:"*/ x2 x2 w"},{n:"q4",f:"+- x2 0 q3"},{n:"q5",f:"*/ f1 q4 1"},{n:"y3",f:"+- q5 dy3 0"},{n:"q6",f:"+- dy1 dy3 y3"},{n:"q7",f:"+- q6 dy1 0"},{n:"cy3",f:"+- q7 dy3 0"},{n:"rh",f:"+- b 0 q1"},{n:"q8",f:"*/ dy1 14 16"},{n:"y2",f:"+/ q8 rh 2"},{n:"y5",f:"+- q5 rh 0"},{n:"y6",f:"+- y3 rh 0"},{n:"cx4",f:"*/ x2 1 2"},{n:"q9",f:"*/ f1 cx4 1"},{n:"cy4",f:"+- q9 rh 0"},{n:"cx5",f:"+- r 0 cx4"},{n:"cy6",f:"+- cy3 rh 0"},{n:"y7",f:"+- y1 dy3 0"},{n:"cy7",f:"+- q1 q1 y7"},{n:"y8",f:"+- b 0 dy1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"t"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"rh"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"rh"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy7"},{x:"x3",y:"y7"}]},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"t"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"rh"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"rh"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"moveTo",pt:{x:"x5",y:"y3"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y7"}},{type:"moveTo",pt:{x:"x4",y:"y7"}},{type:"lnTo",pt:{x:"x4",y:"y1"}}],fill:"none",extrusionOk:!1,stroke:!0}]},ellipseRibbon2:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"q10",f:"+- 100000 0 a1"},{n:"q11",f:"*/ q10 1 2"},{n:"q12",f:"+- a1 0 q11"},{n:"minAdj3",f:"max 0 q12"},{n:"a3",f:"pin minAdj3 adj3 a1"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- x2 wd8 0"},{n:"x4",f:"+- r 0 x3"},{n:"x5",f:"+- r 0 x2"},{n:"x6",f:"+- r 0 wd8"},{n:"dy1",f:"*/ h a3 100000"},{n:"f1",f:"*/ 4 dy1 w"},{n:"q1",f:"*/ x3 x3 w"},{n:"q2",f:"+- x3 0 q1"},{n:"u1",f:"*/ f1 q2 1"},{n:"y1",f:"+- b 0 u1"},{n:"cx1",f:"*/ x3 1 2"},{n:"cu1",f:"*/ f1 cx1 1"},{n:"cy1",f:"+- b 0 cu1"},{n:"cx2",f:"+- r 0 cx1"},{n:"q1",f:"*/ h a1 100000"},{n:"dy3",f:"+- q1 0 dy1"},{n:"q3",f:"*/ x2 x2 w"},{n:"q4",f:"+- x2 0 q3"},{n:"q5",f:"*/ f1 q4 1"},{n:"u3",f:"+- q5 dy3 0"},{n:"y3",f:"+- b 0 u3"},{n:"q6",f:"+- dy1 dy3 u3"},{n:"q7",f:"+- q6 dy1 0"},{n:"cu3",f:"+- q7 dy3 0"},{n:"cy3",f:"+- b 0 cu3"},{n:"rh",f:"+- b 0 q1"},{n:"q8",f:"*/ dy1 14 16"},{n:"u2",f:"+/ q8 rh 2"},{n:"y2",f:"+- b 0 u2"},{n:"u5",f:"+- q5 rh 0"},{n:"y5",f:"+- b 0 u5"},{n:"u6",f:"+- u3 rh 0"},{n:"y6",f:"+- b 0 u6"},{n:"cx4",f:"*/ x2 1 2"},{n:"q9",f:"*/ f1 cx4 1"},{n:"cu4",f:"+- q9 rh 0"},{n:"cy4",f:"+- b 0 cu4"},{n:"cx5",f:"+- r 0 cx4"},{n:"cu6",f:"+- cu3 rh 0"},{n:"cy6",f:"+- b 0 cu6"},{n:"u7",f:"+- u1 dy3 0"},{n:"y7",f:"+- b 0 u7"},{n:"cu7",f:"+- q1 q1 u7"},{n:"cy7",f:"+- b 0 cu7"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"b"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"q1"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"q1"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy7"},{x:"x3",y:"y7"}]},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"q1"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"x2",y:"y5"}]},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x5",y:"y6"}]},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"r",y:"q1"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"x4",y:"y1"}]},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x2",y:"y3"}]},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"l",y:"b"}]},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"moveTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartAlternateProcess:{gdLst:[{n:"x2",f:"+- r 0 ssd6"},{n:"y2",f:"+- b 0 ssd6"},{n:"il",f:"*/ ssd6 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"ssd6"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ssd6",y:"b"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartCollate:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"2",y:"2"}},{type:"lnTo",pt:{x:"0",y:"2"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartConnector:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartDecision:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartDelay:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartDisplay:{gdLst:[{n:"x2",f:"*/ w 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"3"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartDocument:{gdLst:[{n:"y1",f:"*/ h 17322 21600"},{n:"y2",f:"*/ h 20172 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"17322"}},{type:"cubicBezTo",pts:[{x:"10800",y:"17322"},{x:"10800",y:"23922"},{x:"0",y:"20172"}]},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},flowChartExtract:{gdLst:[{n:"x2",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"2"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartInputOutput:{gdLst:[{n:"x3",f:"*/ w 2 5"},{n:"x4",f:"*/ w 3 5"},{n:"x5",f:"*/ w 4 5"},{n:"x6",f:"*/ w 9 10"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"4",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartInternalStorage:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:1,h:1},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"8"}},{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"8",y:"1"}}],fill:"none",extrusionOk:!1,stroke:!0,w:8,h:8},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartMagneticDisk:{gdLst:[{n:"y3",f:"*/ h 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"6",y:"5"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"6",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"6",y:"5"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartMagneticDrum:{gdLst:[{n:"x2",f:"*/ w 2 3"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"5",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartMagneticTape:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"},{n:"ang1",f:"at2 w h"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"b"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"ang1"},{type:"lnTo",pt:{x:"r",y:"ib"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartManualInput:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"5"}},{type:"lnTo",pt:{x:"0",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartManualOperation:{gdLst:[{n:"x3",f:"*/ w 4 5"},{n:"x4",f:"*/ w 9 10"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"4",y:"5"}},{type:"lnTo",pt:{x:"1",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartMerge:{gdLst:[{n:"x2",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartMultidocument:{gdLst:[{n:"y2",f:"*/ h 3675 21600"},{n:"y8",f:"*/ h 20782 21600"},{n:"x3",f:"*/ w 9298 21600"},{n:"x4",f:"*/ w 12286 21600"},{n:"x5",f:"*/ w 18595 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"20782"}},{type:"cubicBezTo",pts:[{x:"9298",y:"23542"},{x:"9298",y:"18022"},{x:"18595",y:"18022"}]},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"lnTo",pt:{x:"0",y:"3675"}},{type:"close"},{type:"moveTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"16252"}},{type:"cubicBezTo",pts:[{x:"19298",y:"16252"},{x:"18595",y:"16352"},{x:"18595",y:"16352"}]},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"close"},{type:"moveTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"14392"}},{type:"cubicBezTo",pts:[{x:"20800",y:"14392"},{x:"20000",y:"14467"},{x:"20000",y:"14467"}]},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:21600,h:21600},{defines:[{type:"moveTo",pt:{x:"0",y:"3675"}},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"lnTo",pt:{x:"18595",y:"18022"}},{type:"cubicBezTo",pts:[{x:"9298",y:"18022"},{x:"9298",y:"23542"},{x:"0",y:"20782"}]},{type:"close"},{type:"moveTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"16252"}},{type:"cubicBezTo",pts:[{x:"19298",y:"16252"},{x:"18595",y:"16352"},{x:"18595",y:"16352"}]},{type:"moveTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"14392"}},{type:"cubicBezTo",pts:[{x:"20800",y:"14392"},{x:"20000",y:"14467"},{x:"20000",y:"14467"}]}],fill:"none",extrusionOk:!1,stroke:!0,w:21600,h:21600},{defines:[{type:"moveTo",pt:{x:"0",y:"20782"}},{type:"cubicBezTo",pts:[{x:"9298",y:"23542"},{x:"9298",y:"18022"},{x:"18595",y:"18022"}]},{type:"lnTo",pt:{x:"18595",y:"16352"}},{type:"cubicBezTo",pts:[{x:"18595",y:"16352"},{x:"19298",y:"16252"},{x:"20000",y:"16252"}]},{type:"lnTo",pt:{x:"20000",y:"14467"}},{type:"cubicBezTo",pts:[{x:"20000",y:"14467"},{x:"20800",y:"14392"},{x:"21600",y:"14392"}]},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"0",y:"3675"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!1,w:21600,h:21600}]},flowChartOfflineStorage:{gdLst:[{n:"x4",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"2",y:"4"}},{type:"lnTo",pt:{x:"3",y:"4"}}],fill:"none",extrusionOk:!1,stroke:!0,w:5,h:5},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],fill:"none",extrusionOk:!0,stroke:!0,w:2,h:2}]},flowChartOffpageConnector:{gdLst:[{n:"y1",f:"*/ h 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"lnTo",pt:{x:"10",y:"8"}},{type:"lnTo",pt:{x:"5",y:"10"}},{type:"lnTo",pt:{x:"0",y:"8"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:10,h:10}]},flowChartOnlineStorage:{gdLst:[{n:"x2",f:"*/ w 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"6",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartOr:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"r",y:"vc"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartPredefinedProcess:{gdLst:[{n:"x2",f:"*/ w 7 8"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:1,h:1},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"8"}},{type:"moveTo",pt:{x:"7",y:"0"}},{type:"lnTo",pt:{x:"7",y:"8"}}],fill:"none",extrusionOk:!1,stroke:!0,w:8,h:8},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartPreparation:{gdLst:[{n:"x2",f:"*/ w 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"8",y:"0"}},{type:"lnTo",pt:{x:"10",y:"5"}},{type:"lnTo",pt:{x:"8",y:"10"}},{type:"lnTo",pt:{x:"2",y:"10"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:10,h:10}]},flowChartProcess:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartPunchedCard:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"5"}},{type:"lnTo",pt:{x:"0",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartPunchedTape:{gdLst:[{n:"y2",f:"*/ h 9 10"},{n:"ib",f:"*/ h 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"2"}},{type:"arcTo",wR:"5",hR:"2",stAng:"cd2",swAng:"-10800000"},{type:"arcTo",wR:"5",hR:"2",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"20",y:"18"}},{type:"arcTo",wR:"5",hR:"2",stAng:"0",swAng:"-10800000"},{type:"arcTo",wR:"5",hR:"2",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:20,h:20}]},flowChartSort:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"2",y:"1"}}],fill:"none",extrusionOk:!1,stroke:!0,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartSummingJunction:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"il",y:"it"}},{type:"lnTo",pt:{x:"ir",y:"ib"}},{type:"moveTo",pt:{x:"ir",y:"it"}},{type:"lnTo",pt:{x:"il",y:"ib"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartTerminator:{gdLst:[{n:"il",f:"*/ w 1018 21600"},{n:"ir",f:"*/ w 20582 21600"},{n:"it",f:"*/ h 3163 21600"},{n:"ib",f:"*/ h 18437 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3475",y:"0"}},{type:"lnTo",pt:{x:"18125",y:"0"}},{type:"arcTo",wR:"3475",hR:"10800",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"3475",y:"21600"}},{type:"arcTo",wR:"3475",hR:"10800",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},foldedCorner:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dy2",f:"*/ ss a 100000"},{n:"dy1",f:"*/ dy2 1 5"},{n:"x1",f:"+- r 0 dy2"},{n:"x2",f:"+- x1 dy1 0"},{n:"y2",f:"+- b 0 dy2"},{n:"y1",f:"+- y2 dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},frame:{avLst:[{n:"adj1",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"x4",f:"+- r 0 x1"},{n:"y4",f:"+- b 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},funnel:{gdLst:[{n:"d",f:"*/ ss 1 20"},{n:"rw2",f:"+- wd2 0 d"},{n:"rh2",f:"+- hd4 0 d"},{n:"t1",f:"cos wd2 480000"},{n:"t2",f:"sin hd4 480000"},{n:"da",f:"at2 t1 t2"},{n:"2da",f:"*/ da 2 1"},{n:"stAng1",f:"+- cd2 0 da"},{n:"swAng1",f:"+- cd2 2da 0"},{n:"swAng3",f:"+- cd2 0 2da"},{n:"rw3",f:"*/ wd2 1 4"},{n:"rh3",f:"*/ hd4 1 4"},{n:"ct1",f:"cos hd4 stAng1"},{n:"st1",f:"sin wd2 stAng1"},{n:"m1",f:"mod ct1 st1 0"},{n:"n1",f:"*/ wd2 hd4 m1"},{n:"dx1",f:"cos n1 stAng1"},{n:"dy1",f:"sin n1 stAng1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- hd4 dy1 0"},{n:"ct3",f:"cos rh3 da"},{n:"st3",f:"sin rw3 da"},{n:"m3",f:"mod ct3 st3 0"},{n:"n3",f:"*/ rw3 rh3 m3"},{n:"dx3",f:"cos n3 da"},{n:"dy3",f:"sin n3 da"},{n:"x3",f:"+- hc dx3 0"},{n:"vc3",f:"+- b 0 rh3"},{n:"y2",f:"+- vc3 dy3 0"},{n:"x2",f:"+- wd2 0 rw2"},{n:"cd",f:"*/ cd2 2 1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd4",stAng:"stAng1",swAng:"swAng1"},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"arcTo",wR:"rw3",hR:"rh3",stAng:"da",swAng:"swAng3"},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"hd4"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"cd2",swAng:"-21600000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},gear6:{avLst:[{n:"adj1",f:"val 15000"},{n:"adj2",f:"val 3526"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin 0 adj2 5358"},{n:"th",f:"*/ ss a1 100000"},{n:"lFD",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"l2",f:"*/ lFD 1 2"},{n:"l3",f:"+- th2 l2 0"},{n:"rh",f:"+- hd2 0 th"},{n:"rw",f:"+- wd2 0 th"},{n:"dr",f:"+- rw 0 rh"},{n:"maxr",f:"?: dr rh rw"},{n:"ha",f:"at2 maxr l3"},{n:"aA1",f:"+- 19800000 0 ha"},{n:"aD1",f:"+- 19800000 ha 0"},{n:"ta11",f:"cos rw aA1"},{n:"ta12",f:"sin rh aA1"},{n:"bA1",f:"at2 ta11 ta12"},{n:"cta1",f:"cos rh bA1"},{n:"sta1",f:"sin rw bA1"},{n:"ma1",f:"mod cta1 sta1 0"},{n:"na1",f:"*/ rw rh ma1"},{n:"dxa1",f:"cos na1 bA1"},{n:"dya1",f:"sin na1 bA1"},{n:"xA1",f:"+- hc dxa1 0"},{n:"yA1",f:"+- vc dya1 0"},{n:"td11",f:"cos rw aD1"},{n:"td12",f:"sin rh aD1"},{n:"bD1",f:"at2 td11 td12"},{n:"ctd1",f:"cos rh bD1"},{n:"std1",f:"sin rw bD1"},{n:"md1",f:"mod ctd1 std1 0"},{n:"nd1",f:"*/ rw rh md1"},{n:"dxd1",f:"cos nd1 bD1"},{n:"dyd1",f:"sin nd1 bD1"},{n:"xD1",f:"+- hc dxd1 0"},{n:"yD1",f:"+- vc dyd1 0"},{n:"xAD1",f:"+- xA1 0 xD1"},{n:"yAD1",f:"+- yA1 0 yD1"},{n:"lAD1",f:"mod xAD1 yAD1 0"},{n:"a1",f:"at2 yAD1 xAD1"},{n:"dxF1",f:"sin lFD a1"},{n:"dyF1",f:"cos lFD a1"},{n:"xF1",f:"+- xD1 dxF1 0"},{n:"yF1",f:"+- yD1 dyF1 0"},{n:"xE1",f:"+- xA1 0 dxF1"},{n:"yE1",f:"+- yA1 0 dyF1"},{n:"yC1t",f:"sin th a1"},{n:"xC1t",f:"cos th a1"},{n:"yC1",f:"+- yF1 yC1t 0"},{n:"xC1",f:"+- xF1 0 xC1t"},{n:"yB1",f:"+- yE1 yC1t 0"},{n:"xB1",f:"+- xE1 0 xC1t"},{n:"aD6",f:"+- 3cd4 ha 0"},{n:"td61",f:"cos rw aD6"},{n:"td62",f:"sin rh aD6"},{n:"bD6",f:"at2 td61 td62"},{n:"ctd6",f:"cos rh bD6"},{n:"std6",f:"sin rw bD6"},{n:"md6",f:"mod ctd6 std6 0"},{n:"nd6",f:"*/ rw rh md6"},{n:"dxd6",f:"cos nd6 bD6"},{n:"dyd6",f:"sin nd6 bD6"},{n:"xD6",f:"+- hc dxd6 0"},{n:"yD6",f:"+- vc dyd6 0"},{n:"xA6",f:"+- hc 0 dxd6"},{n:"xF6",f:"+- xD6 0 lFD"},{n:"xE6",f:"+- xA6 lFD 0"},{n:"yC6",f:"+- yD6 0 th"},{n:"swAng1",f:"+- bA1 0 bD6"},{n:"aA2",f:"+- 1800000 0 ha"},{n:"aD2",f:"+- 1800000 ha 0"},{n:"ta21",f:"cos rw aA2"},{n:"ta22",f:"sin rh aA2"},{n:"bA2",f:"at2 ta21 ta22"},{n:"yA2",f:"+- h 0 yD1"},{n:"td21",f:"cos rw aD2"},{n:"td22",f:"sin rh aD2"},{n:"bD2",f:"at2 td21 td22"},{n:"yD2",f:"+- h 0 yA1"},{n:"yC2",f:"+- h 0 yB1"},{n:"yB2",f:"+- h 0 yC1"},{n:"xB2",f:"val xC1"},{n:"swAng2",f:"+- bA2 0 bD1"},{n:"aD3",f:"+- cd4 ha 0"},{n:"td31",f:"cos rw aD3"},{n:"td32",f:"sin rh aD3"},{n:"bD3",f:"at2 td31 td32"},{n:"yD3",f:"+- h 0 yD6"},{n:"yB3",f:"+- h 0 yC6"},{n:"aD4",f:"+- 9000000 ha 0"},{n:"td41",f:"cos rw aD4"},{n:"td42",f:"sin rh aD4"},{n:"bD4",f:"at2 td41 td42"},{n:"xD4",f:"+- w 0 xD1"},{n:"xC4",f:"+- w 0 xC1"},{n:"xB4",f:"+- w 0 xB1"},{n:"aD5",f:"+- 12600000 ha 0"},{n:"td51",f:"cos rw aD5"},{n:"td52",f:"sin rh aD5"},{n:"bD5",f:"at2 td51 td52"},{n:"xD5",f:"+- w 0 xA1"},{n:"xC5",f:"+- w 0 xB1"},{n:"xB5",f:"+- w 0 xC1"},{n:"xCxn1",f:"+/ xB1 xC1 2"},{n:"yCxn1",f:"+/ yB1 yC1 2"},{n:"yCxn2",f:"+- b 0 yCxn1"},{n:"xCxn4",f:"+/ r 0 xCxn1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA1",y:"yA1"}},{type:"lnTo",pt:{x:"xB1",y:"yB1"}},{type:"lnTo",pt:{x:"xC1",y:"yC1"}},{type:"lnTo",pt:{x:"xD1",y:"yD1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD1",swAng:"swAng2"},{type:"lnTo",pt:{x:"xC1",y:"yB2"}},{type:"lnTo",pt:{x:"xB1",y:"yC2"}},{type:"lnTo",pt:{x:"xA1",y:"yD2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD2",swAng:"swAng1"},{type:"lnTo",pt:{x:"xF6",y:"yB3"}},{type:"lnTo",pt:{x:"xE6",y:"yB3"}},{type:"lnTo",pt:{x:"xA6",y:"yD3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD3",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB4",y:"yC2"}},{type:"lnTo",pt:{x:"xC4",y:"yB2"}},{type:"lnTo",pt:{x:"xD4",y:"yA2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD4",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB5",y:"yC1"}},{type:"lnTo",pt:{x:"xC5",y:"yB1"}},{type:"lnTo",pt:{x:"xD5",y:"yA1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD5",swAng:"swAng1"},{type:"lnTo",pt:{x:"xE6",y:"yC6"}},{type:"lnTo",pt:{x:"xF6",y:"yC6"}},{type:"lnTo",pt:{x:"xD6",y:"yD6"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD6",swAng:"swAng1"},{type:"close"}],extrusionOk:!1,stroke:!0}]},gear9:{avLst:[{n:"adj1",f:"val 10000"},{n:"adj2",f:"val 1763"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin 0 adj2 2679"},{n:"th",f:"*/ ss a1 100000"},{n:"lFD",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"l2",f:"*/ lFD 1 2"},{n:"l3",f:"+- th2 l2 0"},{n:"rh",f:"+- hd2 0 th"},{n:"rw",f:"+- wd2 0 th"},{n:"dr",f:"+- rw 0 rh"},{n:"maxr",f:"?: dr rh rw"},{n:"ha",f:"at2 maxr l3"},{n:"aA1",f:"+- 18600000 0 ha"},{n:"aD1",f:"+- 18600000 ha 0"},{n:"ta11",f:"cos rw aA1"},{n:"ta12",f:"sin rh aA1"},{n:"bA1",f:"at2 ta11 ta12"},{n:"cta1",f:"cos rh bA1"},{n:"sta1",f:"sin rw bA1"},{n:"ma1",f:"mod cta1 sta1 0"},{n:"na1",f:"*/ rw rh ma1"},{n:"dxa1",f:"cos na1 bA1"},{n:"dya1",f:"sin na1 bA1"},{n:"xA1",f:"+- hc dxa1 0"},{n:"yA1",f:"+- vc dya1 0"},{n:"td11",f:"cos rw aD1"},{n:"td12",f:"sin rh aD1"},{n:"bD1",f:"at2 td11 td12"},{n:"ctd1",f:"cos rh bD1"},{n:"std1",f:"sin rw bD1"},{n:"md1",f:"mod ctd1 std1 0"},{n:"nd1",f:"*/ rw rh md1"},{n:"dxd1",f:"cos nd1 bD1"},{n:"dyd1",f:"sin nd1 bD1"},{n:"xD1",f:"+- hc dxd1 0"},{n:"yD1",f:"+- vc dyd1 0"},{n:"xAD1",f:"+- xA1 0 xD1"},{n:"yAD1",f:"+- yA1 0 yD1"},{n:"lAD1",f:"mod xAD1 yAD1 0"},{n:"a1",f:"at2 yAD1 xAD1"},{n:"dxF1",f:"sin lFD a1"},{n:"dyF1",f:"cos lFD a1"},{n:"xF1",f:"+- xD1 dxF1 0"},{n:"yF1",f:"+- yD1 dyF1 0"},{n:"xE1",f:"+- xA1 0 dxF1"},{n:"yE1",f:"+- yA1 0 dyF1"},{n:"yC1t",f:"sin th a1"},{n:"xC1t",f:"cos th a1"},{n:"yC1",f:"+- yF1 yC1t 0"},{n:"xC1",f:"+- xF1 0 xC1t"},{n:"yB1",f:"+- yE1 yC1t 0"},{n:"xB1",f:"+- xE1 0 xC1t"},{n:"aA2",f:"+- 21000000 0 ha"},{n:"aD2",f:"+- 21000000 ha 0"},{n:"ta21",f:"cos rw aA2"},{n:"ta22",f:"sin rh aA2"},{n:"bA2",f:"at2 ta21 ta22"},{n:"cta2",f:"cos rh bA2"},{n:"sta2",f:"sin rw bA2"},{n:"ma2",f:"mod cta2 sta2 0"},{n:"na2",f:"*/ rw rh ma2"},{n:"dxa2",f:"cos na2 bA2"},{n:"dya2",f:"sin na2 bA2"},{n:"xA2",f:"+- hc dxa2 0"},{n:"yA2",f:"+- vc dya2 0"},{n:"td21",f:"cos rw aD2"},{n:"td22",f:"sin rh aD2"},{n:"bD2",f:"at2 td21 td22"},{n:"ctd2",f:"cos rh bD2"},{n:"std2",f:"sin rw bD2"},{n:"md2",f:"mod ctd2 std2 0"},{n:"nd2",f:"*/ rw rh md2"},{n:"dxd2",f:"cos nd2 bD2"},{n:"dyd2",f:"sin nd2 bD2"},{n:"xD2",f:"+- hc dxd2 0"},{n:"yD2",f:"+- vc dyd2 0"},{n:"xAD2",f:"+- xA2 0 xD2"},{n:"yAD2",f:"+- yA2 0 yD2"},{n:"lAD2",f:"mod xAD2 yAD2 0"},{n:"a2",f:"at2 yAD2 xAD2"},{n:"dxF2",f:"sin lFD a2"},{n:"dyF2",f:"cos lFD a2"},{n:"xF2",f:"+- xD2 dxF2 0"},{n:"yF2",f:"+- yD2 dyF2 0"},{n:"xE2",f:"+- xA2 0 dxF2"},{n:"yE2",f:"+- yA2 0 dyF2"},{n:"yC2t",f:"sin th a2"},{n:"xC2t",f:"cos th a2"},{n:"yC2",f:"+- yF2 yC2t 0"},{n:"xC2",f:"+- xF2 0 xC2t"},{n:"yB2",f:"+- yE2 yC2t 0"},{n:"xB2",f:"+- xE2 0 xC2t"},{n:"swAng1",f:"+- bA2 0 bD1"},{n:"aA3",f:"+- 1800000 0 ha"},{n:"aD3",f:"+- 1800000 ha 0"},{n:"ta31",f:"cos rw aA3"},{n:"ta32",f:"sin rh aA3"},{n:"bA3",f:"at2 ta31 ta32"},{n:"cta3",f:"cos rh bA3"},{n:"sta3",f:"sin rw bA3"},{n:"ma3",f:"mod cta3 sta3 0"},{n:"na3",f:"*/ rw rh ma3"},{n:"dxa3",f:"cos na3 bA3"},{n:"dya3",f:"sin na3 bA3"},{n:"xA3",f:"+- hc dxa3 0"},{n:"yA3",f:"+- vc dya3 0"},{n:"td31",f:"cos rw aD3"},{n:"td32",f:"sin rh aD3"},{n:"bD3",f:"at2 td31 td32"},{n:"ctd3",f:"cos rh bD3"},{n:"std3",f:"sin rw bD3"},{n:"md3",f:"mod ctd3 std3 0"},{n:"nd3",f:"*/ rw rh md3"},{n:"dxd3",f:"cos nd3 bD3"},{n:"dyd3",f:"sin nd3 bD3"},{n:"xD3",f:"+- hc dxd3 0"},{n:"yD3",f:"+- vc dyd3 0"},{n:"xAD3",f:"+- xA3 0 xD3"},{n:"yAD3",f:"+- yA3 0 yD3"},{n:"lAD3",f:"mod xAD3 yAD3 0"},{n:"a3",f:"at2 yAD3 xAD3"},{n:"dxF3",f:"sin lFD a3"},{n:"dyF3",f:"cos lFD a3"},{n:"xF3",f:"+- xD3 dxF3 0"},{n:"yF3",f:"+- yD3 dyF3 0"},{n:"xE3",f:"+- xA3 0 dxF3"},{n:"yE3",f:"+- yA3 0 dyF3"},{n:"yC3t",f:"sin th a3"},{n:"xC3t",f:"cos th a3"},{n:"yC3",f:"+- yF3 yC3t 0"},{n:"xC3",f:"+- xF3 0 xC3t"},{n:"yB3",f:"+- yE3 yC3t 0"},{n:"xB3",f:"+- xE3 0 xC3t"},{n:"swAng2",f:"+- bA3 0 bD2"},{n:"aA4",f:"+- 4200000 0 ha"},{n:"aD4",f:"+- 4200000 ha 0"},{n:"ta41",f:"cos rw aA4"},{n:"ta42",f:"sin rh aA4"},{n:"bA4",f:"at2 ta41 ta42"},{n:"cta4",f:"cos rh bA4"},{n:"sta4",f:"sin rw bA4"},{n:"ma4",f:"mod cta4 sta4 0"},{n:"na4",f:"*/ rw rh ma4"},{n:"dxa4",f:"cos na4 bA4"},{n:"dya4",f:"sin na4 bA4"},{n:"xA4",f:"+- hc dxa4 0"},{n:"yA4",f:"+- vc dya4 0"},{n:"td41",f:"cos rw aD4"},{n:"td42",f:"sin rh aD4"},{n:"bD4",f:"at2 td41 td42"},{n:"ctd4",f:"cos rh bD4"},{n:"std4",f:"sin rw bD4"},{n:"md4",f:"mod ctd4 std4 0"},{n:"nd4",f:"*/ rw rh md4"},{n:"dxd4",f:"cos nd4 bD4"},{n:"dyd4",f:"sin nd4 bD4"},{n:"xD4",f:"+- hc dxd4 0"},{n:"yD4",f:"+- vc dyd4 0"},{n:"xAD4",f:"+- xA4 0 xD4"},{n:"yAD4",f:"+- yA4 0 yD4"},{n:"lAD4",f:"mod xAD4 yAD4 0"},{n:"a4",f:"at2 yAD4 xAD4"},{n:"dxF4",f:"sin lFD a4"},{n:"dyF4",f:"cos lFD a4"},{n:"xF4",f:"+- xD4 dxF4 0"},{n:"yF4",f:"+- yD4 dyF4 0"},{n:"xE4",f:"+- xA4 0 dxF4"},{n:"yE4",f:"+- yA4 0 dyF4"},{n:"yC4t",f:"sin th a4"},{n:"xC4t",f:"cos th a4"},{n:"yC4",f:"+- yF4 yC4t 0"},{n:"xC4",f:"+- xF4 0 xC4t"},{n:"yB4",f:"+- yE4 yC4t 0"},{n:"xB4",f:"+- xE4 0 xC4t"},{n:"swAng3",f:"+- bA4 0 bD3"},{n:"aA5",f:"+- 6600000 0 ha"},{n:"aD5",f:"+- 6600000 ha 0"},{n:"ta51",f:"cos rw aA5"},{n:"ta52",f:"sin rh aA5"},{n:"bA5",f:"at2 ta51 ta52"},{n:"td51",f:"cos rw aD5"},{n:"td52",f:"sin rh aD5"},{n:"bD5",f:"at2 td51 td52"},{n:"xD5",f:"+- w 0 xA4"},{n:"xC5",f:"+- w 0 xB4"},{n:"xB5",f:"+- w 0 xC4"},{n:"swAng4",f:"+- bA5 0 bD4"},{n:"aD6",f:"+- 9000000 ha 0"},{n:"td61",f:"cos rw aD6"},{n:"td62",f:"sin rh aD6"},{n:"bD6",f:"at2 td61 td62"},{n:"xD6",f:"+- w 0 xA3"},{n:"xC6",f:"+- w 0 xB3"},{n:"xB6",f:"+- w 0 xC3"},{n:"aD7",f:"+- 11400000 ha 0"},{n:"td71",f:"cos rw aD7"},{n:"td72",f:"sin rh aD7"},{n:"bD7",f:"at2 td71 td72"},{n:"xD7",f:"+- w 0 xA2"},{n:"xC7",f:"+- w 0 xB2"},{n:"xB7",f:"+- w 0 xC2"},{n:"aD8",f:"+- 13800000 ha 0"},{n:"td81",f:"cos rw aD8"},{n:"td82",f:"sin rh aD8"},{n:"bD8",f:"at2 td81 td82"},{n:"xA8",f:"+- w 0 xD1"},{n:"xD8",f:"+- w 0 xA1"},{n:"xC8",f:"+- w 0 xB1"},{n:"xB8",f:"+- w 0 xC1"},{n:"aA9",f:"+- 3cd4 0 ha"},{n:"aD9",f:"+- 3cd4 ha 0"},{n:"td91",f:"cos rw aD9"},{n:"td92",f:"sin rh aD9"},{n:"bD9",f:"at2 td91 td92"},{n:"ctd9",f:"cos rh bD9"},{n:"std9",f:"sin rw bD9"},{n:"md9",f:"mod ctd9 std9 0"},{n:"nd9",f:"*/ rw rh md9"},{n:"dxd9",f:"cos nd9 bD9"},{n:"dyd9",f:"sin nd9 bD9"},{n:"xD9",f:"+- hc dxd9 0"},{n:"yD9",f:"+- vc dyd9 0"},{n:"ta91",f:"cos rw aA9"},{n:"ta92",f:"sin rh aA9"},{n:"bA9",f:"at2 ta91 ta92"},{n:"xA9",f:"+- hc 0 dxd9"},{n:"xF9",f:"+- xD9 0 lFD"},{n:"xE9",f:"+- xA9 lFD 0"},{n:"yC9",f:"+- yD9 0 th"},{n:"swAng5",f:"+- bA9 0 bD8"},{n:"xCxn1",f:"+/ xB1 xC1 2"},{n:"yCxn1",f:"+/ yB1 yC1 2"},{n:"xCxn2",f:"+/ xB2 xC2 2"},{n:"yCxn2",f:"+/ yB2 yC2 2"},{n:"xCxn3",f:"+/ xB3 xC3 2"},{n:"yCxn3",f:"+/ yB3 yC3 2"},{n:"xCxn4",f:"+/ xB4 xC4 2"},{n:"yCxn4",f:"+/ yB4 yC4 2"},{n:"xCxn5",f:"+/ r 0 xCxn4"},{n:"xCxn6",f:"+/ r 0 xCxn3"},{n:"xCxn7",f:"+/ r 0 xCxn2"},{n:"xCxn8",f:"+/ r 0 xCxn1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA1",y:"yA1"}},{type:"lnTo",pt:{x:"xB1",y:"yB1"}},{type:"lnTo",pt:{x:"xC1",y:"yC1"}},{type:"lnTo",pt:{x:"xD1",y:"yD1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD1",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB2",y:"yB2"}},{type:"lnTo",pt:{x:"xC2",y:"yC2"}},{type:"lnTo",pt:{x:"xD2",y:"yD2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD2",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB3",y:"yB3"}},{type:"lnTo",pt:{x:"xC3",y:"yC3"}},{type:"lnTo",pt:{x:"xD3",y:"yD3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD3",swAng:"swAng3"},{type:"lnTo",pt:{x:"xB4",y:"yB4"}},{type:"lnTo",pt:{x:"xC4",y:"yC4"}},{type:"lnTo",pt:{x:"xD4",y:"yD4"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD4",swAng:"swAng4"},{type:"lnTo",pt:{x:"xB5",y:"yC4"}},{type:"lnTo",pt:{x:"xC5",y:"yB4"}},{type:"lnTo",pt:{x:"xD5",y:"yA4"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD5",swAng:"swAng3"},{type:"lnTo",pt:{x:"xB6",y:"yC3"}},{type:"lnTo",pt:{x:"xC6",y:"yB3"}},{type:"lnTo",pt:{x:"xD6",y:"yA3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD6",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB7",y:"yC2"}},{type:"lnTo",pt:{x:"xC7",y:"yB2"}},{type:"lnTo",pt:{x:"xD7",y:"yA2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD7",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB8",y:"yC1"}},{type:"lnTo",pt:{x:"xC8",y:"yB1"}},{type:"lnTo",pt:{x:"xD8",y:"yA1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD8",swAng:"swAng5"},{type:"lnTo",pt:{x:"xE9",y:"yC9"}},{type:"lnTo",pt:{x:"xF9",y:"yC9"}},{type:"lnTo",pt:{x:"xD9",y:"yD9"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD9",swAng:"swAng5"},{type:"close"}],extrusionOk:!1,stroke:!0}]},halfFrame:{avLst:[{n:"adj1",f:"val 33333"},{n:"adj2",f:"val 33333"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"g1",f:"*/ h x1 w"},{n:"g2",f:"+- h 0 g1"},{n:"maxAdj1",f:"*/ 100000 g2 ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"dx2",f:"*/ y1 w h"},{n:"x2",f:"+- r 0 dx2"},{n:"dy2",f:"*/ x1 h w"},{n:"y2",f:"+- b 0 dy2"},{n:"cx1",f:"*/ x1 1 2"},{n:"cy1",f:"+/ y2 b 2"},{n:"cx2",f:"+/ x2 r 2"},{n:"cy2",f:"*/ y1 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},heart:{gdLst:[{n:"dx1",f:"*/ w 49 48"},{n:"dx2",f:"*/ w 10 48"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- t 0 hd3"},{n:"il",f:"*/ w 1 6"},{n:"ir",f:"*/ w 5 6"},{n:"ib",f:"*/ h 2 3"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"hd4"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y1"},{x:"x4",y:"hd4"},{x:"hc",y:"b"}]},{type:"cubicBezTo",pts:[{x:"x1",y:"hd4"},{x:"x2",y:"y1"},{x:"hc",y:"hd4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},heptagon:{avLst:[{n:"hf",f:"val 102572"},{n:"vf",f:"val 105210"}],gdLst:[{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"*/ swd2 97493 100000"},{n:"dx2",f:"*/ swd2 78183 100000"},{n:"dx3",f:"*/ swd2 43388 100000"},{n:"dy1",f:"*/ shd2 62349 100000"},{n:"dy2",f:"*/ shd2 22252 100000"},{n:"dy3",f:"*/ shd2 90097 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc dy2 0"},{n:"y3",f:"+- svc dy3 0"},{n:"ib",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},hexagon:{avLst:[{n:"adj",f:"val 25000"},{n:"vf",f:"val 115470"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"dy1",f:"sin shd2 3600000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"q1",f:"*/ maxAdj -1 2"},{n:"q2",f:"+- a q1 0"},{n:"q3",f:"?: q2 4 2"},{n:"q4",f:"?: q2 3 2"},{n:"q5",f:"?: q2 q1 0"},{n:"q6",f:"+/ a q5 q1"},{n:"q7",f:"*/ q6 q4 -1"},{n:"q8",f:"+- q3 q7 0"},{n:"il",f:"*/ w q8 24"},{n:"it",f:"*/ h q8 24"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},homePlate:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"ir",f:"+/ x1 r 2"},{n:"x2",f:"*/ x1 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},horizontalScroll:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"ch",f:"*/ ss a 100000"},{n:"ch2",f:"*/ ch 1 2"},{n:"ch4",f:"*/ ch 1 4"},{n:"y3",f:"+- ch ch2 0"},{n:"y4",f:"+- ch ch 0"},{n:"y6",f:"+- b 0 ch"},{n:"y7",f:"+- b 0 ch2"},{n:"y5",f:"+- y6 0 ch2"},{n:"x3",f:"+- r 0 ch"},{n:"x4",f:"+- r 0 ch2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"ch2",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"y7"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"-10800000"},{type:"lnTo",pt:{x:"ch",y:"y6"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"close"},{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"-10800000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-16200000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd2",swAng:"-10800000"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y3"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"x3",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"y5"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ch",y:"y6"}},{type:"lnTo",pt:{x:"ch",y:"y7"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"x4",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"moveTo",pt:{x:"x4",y:"ch"}},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"cd2"},{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"lnTo",pt:{x:"ch2",y:"y3"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd2"},{type:"moveTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"y6"}}],fill:"none",extrusionOk:!1,stroke:!0}]},irregularSeal1:{gdLst:[{n:"x5",f:"*/ w 4627 21600"},{n:"x12",f:"*/ w 8485 21600"},{n:"x21",f:"*/ w 16702 21600"},{n:"x24",f:"*/ w 14522 21600"},{n:"y3",f:"*/ h 6320 21600"},{n:"y6",f:"*/ h 8615 21600"},{n:"y9",f:"*/ h 13937 21600"},{n:"y18",f:"*/ h 13290 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"10800",y:"5800"}},{type:"lnTo",pt:{x:"14522",y:"0"}},{type:"lnTo",pt:{x:"14155",y:"5325"}},{type:"lnTo",pt:{x:"18380",y:"4457"}},{type:"lnTo",pt:{x:"16702",y:"7315"}},{type:"lnTo",pt:{x:"21097",y:"8137"}},{type:"lnTo",pt:{x:"17607",y:"10475"}},{type:"lnTo",pt:{x:"21600",y:"13290"}},{type:"lnTo",pt:{x:"16837",y:"12942"}},{type:"lnTo",pt:{x:"18145",y:"18095"}},{type:"lnTo",pt:{x:"14020",y:"14457"}},{type:"lnTo",pt:{x:"13247",y:"19737"}},{type:"lnTo",pt:{x:"10532",y:"14935"}},{type:"lnTo",pt:{x:"8485",y:"21600"}},{type:"lnTo",pt:{x:"7715",y:"15627"}},{type:"lnTo",pt:{x:"4762",y:"17617"}},{type:"lnTo",pt:{x:"5667",y:"13937"}},{type:"lnTo",pt:{x:"135",y:"14587"}},{type:"lnTo",pt:{x:"3722",y:"11775"}},{type:"lnTo",pt:{x:"0",y:"8615"}},{type:"lnTo",pt:{x:"4627",y:"7617"}},{type:"lnTo",pt:{x:"370",y:"2295"}},{type:"lnTo",pt:{x:"7312",y:"6320"}},{type:"lnTo",pt:{x:"8352",y:"2295"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},irregularSeal2:{gdLst:[{n:"x2",f:"*/ w 9722 21600"},{n:"x5",f:"*/ w 5372 21600"},{n:"x16",f:"*/ w 11612 21600"},{n:"x19",f:"*/ w 14640 21600"},{n:"y2",f:"*/ h 1887 21600"},{n:"y3",f:"*/ h 6382 21600"},{n:"y8",f:"*/ h 12877 21600"},{n:"y14",f:"*/ h 19712 21600"},{n:"y16",f:"*/ h 18842 21600"},{n:"y17",f:"*/ h 15935 21600"},{n:"y24",f:"*/ h 6645 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"11462",y:"4342"}},{type:"lnTo",pt:{x:"14790",y:"0"}},{type:"lnTo",pt:{x:"14525",y:"5777"}},{type:"lnTo",pt:{x:"18007",y:"3172"}},{type:"lnTo",pt:{x:"16380",y:"6532"}},{type:"lnTo",pt:{x:"21600",y:"6645"}},{type:"lnTo",pt:{x:"16985",y:"9402"}},{type:"lnTo",pt:{x:"18270",y:"11290"}},{type:"lnTo",pt:{x:"16380",y:"12310"}},{type:"lnTo",pt:{x:"18877",y:"15632"}},{type:"lnTo",pt:{x:"14640",y:"14350"}},{type:"lnTo",pt:{x:"14942",y:"17370"}},{type:"lnTo",pt:{x:"12180",y:"15935"}},{type:"lnTo",pt:{x:"11612",y:"18842"}},{type:"lnTo",pt:{x:"9872",y:"17370"}},{type:"lnTo",pt:{x:"8700",y:"19712"}},{type:"lnTo",pt:{x:"7527",y:"18125"}},{type:"lnTo",pt:{x:"4917",y:"21600"}},{type:"lnTo",pt:{x:"4805",y:"18240"}},{type:"lnTo",pt:{x:"1285",y:"17825"}},{type:"lnTo",pt:{x:"3330",y:"15370"}},{type:"lnTo",pt:{x:"0",y:"12877"}},{type:"lnTo",pt:{x:"3935",y:"11592"}},{type:"lnTo",pt:{x:"1172",y:"8270"}},{type:"lnTo",pt:{x:"5372",y:"7817"}},{type:"lnTo",pt:{x:"4502",y:"3625"}},{type:"lnTo",pt:{x:"8550",y:"6382"}},{type:"lnTo",pt:{x:"9722",y:"1887"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},leftArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- l dx2 0"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx1",f:"*/ y1 dx2 hd2"},{n:"x1",f:"+- x2  0 dx1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss w"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ w a4 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"x3",f:"+/ x2 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftBrace:{avLst:[{n:"adj1",f:"val 8333"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a2",f:"pin 0 adj2 100000"},{n:"q1",f:"+- 100000 0 a2"},{n:"q2",f:"min q1 a2"},{n:"q3",f:"*/ q2 1 2"},{n:"maxAdj1",f:"*/ q3 h ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"y3",f:"*/ h a2 100000"},{n:"y4",f:"+- y3 y1 0"},{n:"dx1",f:"cos wd2 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"il",f:"+- r 0 dx1"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},leftBracket:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 100000"},{n:"y2",f:"+- b 0 y1"},{n:"dx1",f:"cos w 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"il",f:"+- r 0 dx1"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd2",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},leftCircularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val -1142319"},{n:"adj3",f:"val 1142319"},{n:"adj4",f:"val 10800000"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"u22",f:"abs u21"},{n:"minAng",f:"*/ u22 -1 1"},{n:"u23",f:"abs adj2"},{n:"a2",f:"*/ u23 -1 1"},{n:"aAng",f:"pin minAng a2 0"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"wtE",f:"sin rw1 stAng"},{n:"htE",f:"cos rh1 stAng"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"wtD",f:"sin rw2 stAng"},{n:"htD",f:"cos rh2 stAng"},{n:"dxD",f:"cat2 rw2 htD wtD"},{n:"dyD",f:"sat2 rh2 htD wtD"},{n:"xD",f:"+- hc dxD 0"},{n:"yD",f:"+- vc dyD 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng0",f:"?: ist0 ist0 ist1"},{n:"isw1",f:"+- stAng 0 istAng0"},{n:"isw2",f:"+- isw1 21600000 0"},{n:"iswAng0",f:"?: isw1 isw1 isw2"},{n:"istAng",f:"+- istAng0 iswAng0 0"},{n:"iswAng",f:"+- 0 0 iswAng0"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"sw0",f:"+- en2 0 stAng"},{n:"sw1",f:"+- sw0 0 21600000"},{n:"swAng",f:"?: sw0 sw1 sw0"},{n:"stAng0",f:"+- stAng swAng 0"},{n:"swAng0",f:"+- 0 0 swAng"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"aI",f:"+- stAng cd4 0"},{n:"aA",f:"+- ptAng 0 cd4"},{n:"aB",f:"+- ptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xE",y:"yE"}},{type:"lnTo",pt:{x:"xD",y:"yD"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xF",y:"yF"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"stAng0",swAng:"swAng0"},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x2",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 x2"},{n:"dy",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy"},{n:"y2",f:"+- vc dy 0"},{n:"dx1",f:"*/ y1 x2 hd2"},{n:"x1",f:"+- x2 0 dx1"},{n:"x4",f:"+- x3 dx1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 50000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss wd2"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"x1",f:"*/ ss a3 100000"},{n:"x4",f:"+- r 0 x1"},{n:"dx2",f:"*/ w a4 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightCircularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 1142319"},{n:"adj3",f:"val 20457681"},{n:"adj4",f:"val 11942319"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"maxAng",f:"abs u21"},{n:"aAng",f:"pin 0 adj2 maxAng"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"lptAng",f:"+- stAng 0 aAng"},{n:"wtL",f:"sin rw3 lptAng"},{n:"htL",f:"cos rh3 lptAng"},{n:"dxL",f:"cat2 rw3 htL wtL"},{n:"dyL",f:"sat2 rh3 htL wtL"},{n:"xL",f:"+- hc dxL 0"},{n:"yL",f:"+- vc dyL 0"},{n:"dxK",f:"cos thh lptAng"},{n:"dyK",f:"sin thh lptAng"},{n:"xK",f:"+- xI dxK 0"},{n:"yK",f:"+- yI dyK 0"},{n:"dxJ",f:"cos thh lptAng"},{n:"dyJ",f:"sin thh lptAng"},{n:"xJ",f:"+- xI 0 dxJ 0"},{n:"yJ",f:"+- yI 0 dyJ 0"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"od0",f:"+- en2 0 enAng"},{n:"od1",f:"+- od0 21600000 0"},{n:"od2",f:"?: od0 od0 od1"},{n:"st0",f:"+- stAng 0 od2"},{n:"st1",f:"+- st0 21600000 0"},{n:"st2",f:"?: st0 st0 st1"},{n:"sw0",f:"+- en2 0 st2"},{n:"sw1",f:"+- sw0 21600000 0"},{n:"swAng",f:"?: sw0 sw0 sw1"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng",f:"?: ist0 ist0 ist1"},{n:"id0",f:"+- istAng 0 enAng"},{n:"id1",f:"+- id0 0 21600000"},{n:"id2",f:"?: id0 id1 id0"},{n:"ien0",f:"+- stAng 0 id2"},{n:"ien1",f:"+- ien0 0 21600000"},{n:"ien2",f:"?: ien1 ien1 ien0"},{n:"isw1",f:"+- ien2 0 istAng"},{n:"isw2",f:"+- isw1 0 21600000"},{n:"iswAng",f:"?: isw1 isw2 isw1"},{n:"wtE",f:"sin rw1 st2"},{n:"htE",f:"cos rh1 st2"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"wtD",f:"sin rw2 ien2"},{n:"htD",f:"cos rh2 ien2"},{n:"dxD",f:"cat2 rw2 htD wtD"},{n:"dyD",f:"sat2 rh2 htD wtD"},{n:"xD",f:"+- hc dxD 0"},{n:"yD",f:"+- vc dyD 0"},{n:"xKp",f:"?: p5 xE xK"},{n:"yKp",f:"?: p5 yE yK"},{n:"xJp",f:"?: p5 xD xJ"},{n:"yJp",f:"?: p5 yD yJ"},{n:"aL",f:"+- lptAng 0 cd4"},{n:"aA",f:"+- ptAng cd4 0"},{n:"aB",f:"+- ptAng cd2 0"},{n:"aJ",f:"+- lptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xL",y:"yL"}},{type:"lnTo",pt:{x:"xKp",y:"yKp"}},{type:"lnTo",pt:{x:"xE",y:"yE"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"st2",swAng:"swAng"},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xC",y:"yC"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"lnTo",pt:{x:"xJp",y:"yJp"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightRibbon:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 16667"}],gdLst:[{n:"a3",f:"pin 0 adj3 33333"},{n:"maxAdj1",f:"+- 100000 0 a3"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"w1",f:"+- wd2 0 wd32"},{n:"maxAdj2",f:"*/ 100000 w1 ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"x4",f:"+- r 0 x1"},{n:"dy1",f:"*/ h a1 200000"},{n:"dy2",f:"*/ h a3 -200000"},{n:"ly1",f:"+- vc dy2 dy1"},{n:"ry4",f:"+- vc dy1 dy2"},{n:"ly2",f:"+- ly1 dy1 0"},{n:"ry3",f:"+- b 0 ly2"},{n:"ly4",f:"*/ ly2 2 1"},{n:"ry1",f:"+- b 0 ly4"},{n:"ly3",f:"+- ly4 0 ly1"},{n:"ry2",f:"+- b 0 ly3"},{n:"hR",f:"*/ a3 ss 400000"},{n:"x2",f:"+- hc 0 wd32"},{n:"x3",f:"+- hc wd32 0"},{n:"y1",f:"+- ly1 hR 0"},{n:"y2",f:"+- ry2 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"ly2"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"ly1"}},{type:"lnTo",pt:{x:"hc",y:"ly1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"ry2"}},{type:"lnTo",pt:{x:"x4",y:"ry1"}},{type:"lnTo",pt:{x:"r",y:"ry3"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"ry4"}},{type:"lnTo",pt:{x:"hc",y:"ry4"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly4"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"ry2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"ly2"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"ly1"}},{type:"lnTo",pt:{x:"hc",y:"ly1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"ry2"}},{type:"lnTo",pt:{x:"x4",y:"ry1"}},{type:"lnTo",pt:{x:"r",y:"ry3"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"ry4"}},{type:"lnTo",pt:{x:"hc",y:"ry4"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly4"}},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"ry2"}},{type:"moveTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"ly3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},leftRightUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q1",f:"+- 100000 0 maxAdj1"},{n:"maxAdj3",f:"*/ q1 1 2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x5",f:"+- hc dx2 0"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x6",f:"+- r 0 x1"},{n:"dy2",f:"*/ ss a2 50000"},{n:"y2",f:"+- b 0 dy2"},{n:"y4",f:"+- b 0 dx2"},{n:"y3",f:"+- y4 0 dx3"},{n:"y5",f:"+- y4 dx3 0"},{n:"il",f:"*/ dx3 x1 dx2"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x6",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"+- 100000 0 maxAdj1"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 50000"},{n:"x2",f:"+- r 0 dx2"},{n:"y2",f:"+- b 0 dx2"},{n:"dx4",f:"*/ ss a2 100000"},{n:"x4",f:"+- r 0 dx4"},{n:"y4",f:"+- b 0 dx4"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- x4 0 dx3"},{n:"x5",f:"+- x4 dx3 0"},{n:"y3",f:"+- y4 0 dx3"},{n:"y5",f:"+- y4 dx3 0"},{n:"il",f:"*/ dx3 x1 dx4"},{n:"cx1",f:"+/ x1 x5 2"},{n:"cy1",f:"+/ x1 y5 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},lightningBolt:{gdLst:[{n:"x1",f:"*/ w 5022 21600"},{n:"x3",f:"*/ w 8472 21600"},{n:"x4",f:"*/ w 8757 21600"},{n:"x5",f:"*/ w 10012 21600"},{n:"x8",f:"*/ w 12860 21600"},{n:"x9",f:"*/ w 13917 21600"},{n:"x11",f:"*/ w 16577 21600"},{n:"y1",f:"*/ h 3890 21600"},{n:"y2",f:"*/ h 6080 21600"},{n:"y4",f:"*/ h 7437 21600"},{n:"y6",f:"*/ h 9705 21600"},{n:"y7",f:"*/ h 12007 21600"},{n:"y10",f:"*/ h 14277 21600"},{n:"y11",f:"*/ h 14915 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"8472",y:"0"}},{type:"lnTo",pt:{x:"12860",y:"6080"}},{type:"lnTo",pt:{x:"11050",y:"6797"}},{type:"lnTo",pt:{x:"16577",y:"12007"}},{type:"lnTo",pt:{x:"14767",y:"12877"}},{type:"lnTo",pt:{x:"21600",y:"21600"}},{type:"lnTo",pt:{x:"10012",y:"14915"}},{type:"lnTo",pt:{x:"12222",y:"13987"}},{type:"lnTo",pt:{x:"5022",y:"9705"}},{type:"lnTo",pt:{x:"7602",y:"8382"}},{type:"lnTo",pt:{x:"0",y:"3890"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},line:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],extrusionOk:!1,stroke:!0}]},lineInv:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"r",y:"t"}}],extrusionOk:!1,stroke:!0}]},mathDivide:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 5880"},{n:"adj3",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 1000 adj1 36745"},{n:"ma1",f:"+- 0 0 a1"},{n:"ma3h",f:"+/ 73490 ma1 4"},{n:"ma3w",f:"*/ 36745 w h"},{n:"maxAdj3",f:"min ma3h ma3w"},{n:"a3",f:"pin 1000 adj3 maxAdj3"},{n:"m4a3",f:"*/ -4 a3 1"},{n:"maxAdj2",f:"+- 73490 m4a3 a1"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy1",f:"*/ h a1 200000"},{n:"yg",f:"*/ h a2 100000"},{n:"rad",f:"*/ h a3 100000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y3",f:"+- vc 0 dy1"},{n:"y4",f:"+- vc dy1 0"},{n:"a",f:"+- yg rad 0"},{n:"y2",f:"+- y3 0 a"},{n:"y1",f:"+- y2 0 rad"},{n:"y5",f:"+- b 0 y1"},{n:"x1",f:"+- hc 0 dx1"},{n:"x3",f:"+- hc dx1 0"},{n:"x2",f:"+- hc 0 rad"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"rad",hR:"rad",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"y5"}},{type:"arcTo",wR:"rad",hR:"rad",stAng:"cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathEqual:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 0 adj1 36745"},{n:"2a1",f:"*/ a1 2 1"},{n:"mAdj2",f:"+- 100000 0 2a1"},{n:"a2",f:"pin 0 adj2 mAdj2"},{n:"dy1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ h a2 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"yC1",f:"+/ y1 y2 2"},{n:"yC2",f:"+/ y3 y4 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathMinus:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"dy1",f:"*/ h a1 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathMultiply:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 51965"},{n:"th",f:"*/ ss a1 100000"},{n:"a",f:"at2 w h"},{n:"sa",f:"sin 1 a"},{n:"ca",f:"cos 1 a"},{n:"ta",f:"tan 1 a"},{n:"dl",f:"mod w h 0"},{n:"rw",f:"*/ dl 51965 100000"},{n:"lM",f:"+- dl 0 rw"},{n:"xM",f:"*/ ca lM 2"},{n:"yM",f:"*/ sa lM 2"},{n:"dxAM",f:"*/ sa th 2"},{n:"dyAM",f:"*/ ca th 2"},{n:"xA",f:"+- xM 0 dxAM"},{n:"yA",f:"+- yM dyAM 0"},{n:"xB",f:"+- xM dxAM 0"},{n:"yB",f:"+- yM 0 dyAM"},{n:"xBC",f:"+- hc 0 xB"},{n:"yBC",f:"*/ xBC ta 1"},{n:"yC",f:"+- yBC yB 0"},{n:"xD",f:"+- r 0 xB"},{n:"xE",f:"+- r 0 xA"},{n:"yFE",f:"+- vc 0 yA"},{n:"xFE",f:"*/ yFE 1 ta"},{n:"xF",f:"+- xE 0 xFE"},{n:"xL",f:"+- xA xFE 0"},{n:"yG",f:"+- b 0 yA"},{n:"yH",f:"+- b 0 yB"},{n:"yI",f:"+- b 0 yC"},{n:"xC2",f:"+- r 0 xM"},{n:"yC3",f:"+- b 0 yM"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xB",y:"yB"}},{type:"lnTo",pt:{x:"hc",y:"yC"}},{type:"lnTo",pt:{x:"xD",y:"yB"}},{type:"lnTo",pt:{x:"xE",y:"yA"}},{type:"lnTo",pt:{x:"xF",y:"vc"}},{type:"lnTo",pt:{x:"xE",y:"yG"}},{type:"lnTo",pt:{x:"xD",y:"yH"}},{type:"lnTo",pt:{x:"hc",y:"yI"}},{type:"lnTo",pt:{x:"xB",y:"yH"}},{type:"lnTo",pt:{x:"xA",y:"yG"}},{type:"lnTo",pt:{x:"xL",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathNotEqual:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 6600000"},{n:"adj3",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"crAng",f:"pin 4200000 adj2 6600000"},{n:"2a1",f:"*/ a1 2 1"},{n:"maxAdj3",f:"+- 100000 0 2a1"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"dy1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ h a3 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x8",f:"+- hc dx1 0"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"},{n:"cadj2",f:"+- crAng 0 cd4"},{n:"xadj2",f:"tan hd2 cadj2"},{n:"len",f:"mod xadj2 hd2 0"},{n:"bhw",f:"*/ len dy1 hd2"},{n:"bhw2",f:"*/ bhw 1 2"},{n:"x7",f:"+- hc xadj2 bhw2"},{n:"dx67",f:"*/ xadj2 y1 hd2"},{n:"x6",f:"+- x7 0 dx67"},{n:"dx57",f:"*/ xadj2 y2 hd2"},{n:"x5",f:"+- x7 0 dx57"},{n:"dx47",f:"*/ xadj2 y3 hd2"},{n:"x4",f:"+- x7 0 dx47"},{n:"dx37",f:"*/ xadj2 y4 hd2"},{n:"x3",f:"+- x7 0 dx37"},{n:"dx27",f:"*/ xadj2 2 1"},{n:"x2",f:"+- x7 0 dx27"},{n:"rx7",f:"+- x7 bhw 0"},{n:"rx6",f:"+- x6 bhw 0"},{n:"rx5",f:"+- x5 bhw 0"},{n:"rx4",f:"+- x4 bhw 0"},{n:"rx3",f:"+- x3 bhw 0"},{n:"rx2",f:"+- x2 bhw 0"},{n:"dx7",f:"*/ dy1 hd2 len"},{n:"rxt",f:"+- x7 dx7 0"},{n:"lxt",f:"+- rx7 0 dx7"},{n:"rx",f:"?: cadj2 rxt rx7"},{n:"lx",f:"?: cadj2 x7 lxt"},{n:"dy3",f:"*/ dy1 xadj2 len"},{n:"dy4",f:"+- 0 0 dy3"},{n:"ry",f:"?: cadj2 dy3 t"},{n:"ly",f:"?: cadj2 t dy4"},{n:"dlx",f:"+- w 0 rx"},{n:"drx",f:"+- w 0 lx"},{n:"dly",f:"+- h 0 ry"},{n:"dry",f:"+- h 0 ly"},{n:"xC1",f:"+/ rx lx 2"},{n:"xC2",f:"+/ drx dlx 2"},{n:"yC1",f:"+/ ry ly 2"},{n:"yC2",f:"+/ y1 y2 2"},{n:"yC3",f:"+/ y3 y4 2"},{n:"yC4",f:"+/ dry dly 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"y1"}},{type:"lnTo",pt:{x:"lx",y:"ly"}},{type:"lnTo",pt:{x:"rx",y:"ry"}},{type:"lnTo",pt:{x:"rx6",y:"y1"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"lnTo",pt:{x:"rx5",y:"y2"}},{type:"lnTo",pt:{x:"rx4",y:"y3"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"x8",y:"y4"}},{type:"lnTo",pt:{x:"rx3",y:"y4"}},{type:"lnTo",pt:{x:"drx",y:"dry"}},{type:"lnTo",pt:{x:"dlx",y:"dly"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathPlus:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 73490"},{n:"dx1",f:"*/ w 73490 200000"},{n:"dy1",f:"*/ h 73490 200000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dx2"},{n:"y3",f:"+- vc dx2 0"},{n:"y4",f:"+- vc dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},moon:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 87500"},{n:"g0",f:"*/ ss a 100000"},{n:"g0w",f:"*/ g0 w ss"},{n:"g1",f:"+- ss 0 g0"},{n:"g2",f:"*/ g0 g0 g1"},{n:"g3",f:"*/ ss ss g1"},{n:"g4",f:"*/ g3 2 1"},{n:"g5",f:"+- g4 0 g2"},{n:"g6",f:"+- g5 0 g0"},{n:"g6w",f:"*/ g6 w ss"},{n:"g7",f:"*/ g5 1 2"},{n:"g8",f:"+- g7 0 g0"},{n:"dy1",f:"*/ g8 hd2 ss"},{n:"g10h",f:"+- vc 0 dy1"},{n:"g11h",f:"+- vc dy1 0"},{n:"g12",f:"*/ g0 9598 32768"},{n:"g12w",f:"*/ g12 w ss"},{n:"g13",f:"+- ss 0 g12"},{n:"q1",f:"*/ ss ss 1"},{n:"q2",f:"*/ g13 g13 1"},{n:"q3",f:"+- q1 0 q2"},{n:"q4",f:"sqrt q3"},{n:"dy4",f:"*/ q4 hd2 ss"},{n:"g15h",f:"+- vc 0 dy4"},{n:"g16h",f:"+- vc dy4 0"},{n:"g17w",f:"+- g6w 0 g0w"},{n:"g18w",f:"*/ g17w 1 2"},{n:"dx2p",f:"+- g0w g18w w"},{n:"dx2",f:"*/ dx2p -1 1"},{n:"dy2",f:"*/ hd2 -1 1"},{n:"stAng1",f:"at2 dx2 dy2"},{n:"enAngp1",f:"at2 dx2 hd2"},{n:"enAng1",f:"+- enAngp1 0 21600000"},{n:"swAng1",f:"+- enAng1 0 stAng1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"hd2",stAng:"cd4",swAng:"cd2"},{type:"arcTo",wR:"g18w",hR:"dy1",stAng:"stAng1",swAng:"swAng1"},{type:"close"}],extrusionOk:!1,stroke:!0}]},nonIsoscelesTrapezoid:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a1",f:"pin 0 adj1 maxAdj"},{n:"a2",f:"pin 0 adj2 maxAdj"},{n:"x1",f:"*/ ss a1 200000"},{n:"x2",f:"*/ ss a1 100000"},{n:"dx3",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"x4",f:"+/ r x3 2"},{n:"il",f:"*/ wd3 a1 maxAdj"},{n:"adjm",f:"max a1 a2"},{n:"it",f:"*/ hd3 adjm maxAdj"},{n:"irt",f:"*/ wd3 a2 maxAdj"},{n:"ir",f:"+- r 0 irt"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},noSmoking:{avLst:[{n:"adj",f:"val 18750"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dr",f:"*/ ss a 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"ang",f:"at2 w h"},{n:"ct",f:"cos ihd2 ang"},{n:"st",f:"sin iwd2 ang"},{n:"m",f:"mod ct st 0"},{n:"n",f:"*/ iwd2 ihd2 m"},{n:"drd2",f:"*/ dr 1 2"},{n:"dang",f:"at2 n drd2"},{n:"dang2",f:"*/ dang 2 1"},{n:"swAng",f:"+- -10800000 dang2 0"},{n:"t3",f:"at2 w h"},{n:"stAng1",f:"+- t3 0 dang"},{n:"stAng2",f:"+- stAng1 0 cd2"},{n:"ct1",f:"cos ihd2 stAng1"},{n:"st1",f:"sin iwd2 stAng1"},{n:"m1",f:"mod ct1 st1 0"},{n:"n1",f:"*/ iwd2 ihd2 m1"},{n:"dx1",f:"cos n1 stAng1"},{n:"dy1",f:"sin n1 stAng1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc 0 dx1"},{n:"y2",f:"+- vc 0 dy1"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"stAng1",swAng:"swAng"},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y2"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"stAng2",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},notchedRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"x1",f:"*/ dy1 dx2 hd2"},{n:"x3",f:"+- r 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},octagon:{avLst:[{n:"adj",f:"val 29289"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 1 2"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},parallelogram:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 200000"},{n:"x2",f:"*/ ss a 100000"},{n:"x6",f:"+- r 0 x1"},{n:"x5",f:"+- r 0 x2"},{n:"x3",f:"*/ x5 1 2"},{n:"x4",f:"+- r 0 x3"},{n:"il",f:"*/ wd2 a maxAdj"},{n:"q1",f:"*/ 5 a maxAdj"},{n:"q2",f:"+/ 1 q1 12"},{n:"il",f:"*/ q2 w 1"},{n:"it",f:"*/ q2 h 1"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"},{n:"q3",f:"*/ h hc x2"},{n:"y1",f:"pin 0 q3 h"},{n:"y2",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pentagon:{avLst:[{n:"hf",f:"val 105146"},{n:"vf",f:"val 110557"}],gdLst:[{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"cos swd2 1080000"},{n:"dx2",f:"cos swd2 18360000"},{n:"dy1",f:"sin shd2 1080000"},{n:"dy2",f:"sin shd2 18360000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc 0 dy2"},{n:"it",f:"*/ y1 dx2 dx1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pie:{avLst:[{n:"adj1",f:"val 0"},{n:"adj2",f:"val 16200000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw1",f:"+- enAng 0 stAng"},{n:"sw2",f:"+- sw1 21600000 0"},{n:"swAng",f:"?: sw1 sw1 sw2"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"hc",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pieWedge:{gdLst:[{n:"g1",f:"cos w 13500000"},{n:"g2",f:"sin h 13500000"},{n:"x1",f:"+- r g1 0"},{n:"y1",f:"+- b g2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"w",hR:"h",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},plaque:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 70711 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},plaqueTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},plus:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"d",f:"+- w 0 h"},{n:"il",f:"?: d l x1"},{n:"ir",f:"?: d r x2"},{n:"it",f:"?: d x1 t"},{n:"ib",f:"?: d y2 b"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},quadArrow:{avLst:[{n:"adj1",f:"val 22500"},{n:"adj2",f:"val 22500"},{n:"adj3",f:"val 22500"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q1",f:"+- 100000 0 maxAdj1"},{n:"maxAdj3",f:"*/ q1 1 2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x5",f:"+- hc dx2 0"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x6",f:"+- r 0 x1"},{n:"y2",f:"+- vc 0 dx2"},{n:"y5",f:"+- vc dx2 0"},{n:"y3",f:"+- vc 0 dx3"},{n:"y4",f:"+- vc dx3 0"},{n:"y6",f:"+- b 0 x1"},{n:"il",f:"*/ dx3 x1 dx2"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x6",y:"y5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"lnTo",pt:{x:"x3",y:"y6"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},quadArrowCallout:{avLst:[{n:"adj1",f:"val 18515"},{n:"adj2",f:"val 18515"},{n:"adj3",f:"val 18515"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"+- 50000 0 a2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 2 1"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin a1 adj4 maxAdj4"},{n:"dx2",f:"*/ ss a2 100000"},{n:"dx3",f:"*/ ss a1 200000"},{n:"ah",f:"*/ ss a3 100000"},{n:"dx1",f:"*/ w a4 200000"},{n:"dy1",f:"*/ h a4 200000"},{n:"x8",f:"+- r 0 ah"},{n:"x2",f:"+- hc 0 dx1"},{n:"x7",f:"+- hc dx1 0"},{n:"x3",f:"+- hc 0 dx2"},{n:"x6",f:"+- hc dx2 0"},{n:"x4",f:"+- hc 0 dx3"},{n:"x5",f:"+- hc dx3 0"},{n:"y8",f:"+- b 0 ah"},{n:"y2",f:"+- vc 0 dy1"},{n:"y7",f:"+- vc dy1 0"},{n:"y3",f:"+- vc 0 dx2"},{n:"y6",f:"+- vc dx2 0"},{n:"y4",f:"+- vc 0 dx3"},{n:"y5",f:"+- vc dx3 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"ah",y:"y3"}},{type:"lnTo",pt:{x:"ah",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"ah"}},{type:"lnTo",pt:{x:"x3",y:"ah"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x6",y:"ah"}},{type:"lnTo",pt:{x:"x5",y:"ah"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x7",y:"y2"}},{type:"lnTo",pt:{x:"x7",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x8",y:"y6"}},{type:"lnTo",pt:{x:"x8",y:"y5"}},{type:"lnTo",pt:{x:"x7",y:"y5"}},{type:"lnTo",pt:{x:"x7",y:"y7"}},{type:"lnTo",pt:{x:"x5",y:"y7"}},{type:"lnTo",pt:{x:"x5",y:"y8"}},{type:"lnTo",pt:{x:"x6",y:"y8"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x3",y:"y8"}},{type:"lnTo",pt:{x:"x4",y:"y8"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"ah",y:"y5"}},{type:"lnTo",pt:{x:"ah",y:"y6"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rect:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},ribbon:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a1",f:"pin 0 adj1 33333"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"x10",f:"+- r 0 wd8"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x9",f:"+- hc dx2 0"},{n:"x3",f:"+- x2 wd32 0"},{n:"x8",f:"+- x9 0 wd32"},{n:"x5",f:"+- x2 wd8 0"},{n:"x6",f:"+- x9 0 wd8"},{n:"x4",f:"+- x5 0 wd32"},{n:"x7",f:"+- x6 wd32 0"},{n:"y1",f:"*/ h a1 200000"},{n:"y2",f:"*/ h a1 100000"},{n:"y4",f:"+- b 0 y2"},{n:"y3",f:"*/ y4 1 2"},{n:"hR",f:"*/ h a1 400000"},{n:"y5",f:"+- b 0 hR"},{n:"y6",f:"+- y2 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y5"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x5",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x6",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y5"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"},{type:"moveTo",pt:{x:"x5",y:"hR"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"moveTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"x6",y:"hR"}},{type:"moveTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"moveTo",pt:{x:"x9",y:"y6"}},{type:"lnTo",pt:{x:"x9",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},ribbon2:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a1",f:"pin 0 adj1 33333"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"x10",f:"+- r 0 wd8"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x9",f:"+- hc dx2 0"},{n:"x3",f:"+- x2 wd32 0"},{n:"x8",f:"+- x9 0 wd32"},{n:"x5",f:"+- x2 wd8 0"},{n:"x6",f:"+- x9 0 wd8"},{n:"x4",f:"+- x5 0 wd32"},{n:"x7",f:"+- x6 wd32 0"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- b 0 dy1"},{n:"dy2",f:"*/ h a1 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"y4",f:"+- t dy2 0"},{n:"y3",f:"+/ y4 b 2"},{n:"hR",f:"*/ h a1 400000"},{n:"y6",f:"+- b 0 hR"},{n:"y7",f:"+- y1 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x5",y:"y6"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x6",y:"y6"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x8",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x7",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"moveTo",pt:{x:"x6",y:"y6"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"moveTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"moveTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y7"}}],fill:"none",extrusionOk:!1,stroke:!0}]},rightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx1",f:"*/ ss a2 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx2",f:"*/ y1 dx1 hd2"},{n:"x2",f:"+- x1 dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rightArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss w"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"dx3",f:"*/ ss a3 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"x2",f:"*/ w a4 100000"},{n:"x1",f:"*/ x2 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rightBrace:{avLst:[{n:"adj1",f:"val 8333"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a2",f:"pin 0 adj2 100000"},{n:"q1",f:"+- 100000 0 a2"},{n:"q2",f:"min q1 a2"},{n:"q3",f:"*/ q2 1 2"},{n:"maxAdj1",f:"*/ q3 h ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"y3",f:"*/ h a2 100000"},{n:"y2",f:"+- y3 0 y1"},{n:"y4",f:"+- b 0 y1"},{n:"dx1",f:"cos wd2 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"ir",f:"+- l dx1 0"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y2"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y2"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},rightBracket:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 100000"},{n:"y2",f:"+- b 0 y1"},{n:"dx1",f:"cos w 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"ir",f:"+- l dx1 0"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},round1Rect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"idx",f:"*/ dx1 29289 100000"},{n:"ir",f:"+- r 0 idx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"arcTo",wR:"dx1",hR:"dx1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},round2DiagRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"y1",f:"+- b 0 x1"},{n:"a",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 a"},{n:"y2",f:"+- b 0 a"},{n:"dx1",f:"*/ x1 29289 100000"},{n:"dx2",f:"*/ a 29289 100000"},{n:"d",f:"+- dx1 0 dx2"},{n:"dx",f:"?: d dx1 dx2"},{n:"ir",f:"+- r 0 dx"},{n:"ib",f:"+- b 0 dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"a",hR:"a",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"a",y:"b"}},{type:"arcTo",wR:"a",hR:"a",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},round2SameRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"tx1",f:"*/ ss a1 100000"},{n:"tx2",f:"+- r 0 tx1"},{n:"bx1",f:"*/ ss a2 100000"},{n:"bx2",f:"+- r 0 bx1"},{n:"by1",f:"+- b 0 bx1"},{n:"d",f:"+- tx1 0 bx1"},{n:"tdx",f:"*/ tx1 29289 100000"},{n:"bdx",f:"*/ bx1 29289 100000"},{n:"il",f:"?: d tdx bdx"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 bdx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"tx1",y:"t"}},{type:"lnTo",pt:{x:"tx2",y:"t"}},{type:"arcTo",wR:"tx1",hR:"tx1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"by1"}},{type:"arcTo",wR:"bx1",hR:"bx1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"bx1",y:"b"}},{type:"arcTo",wR:"bx1",hR:"bx1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"tx1"}},{type:"arcTo",wR:"tx1",hR:"tx1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},roundRect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},rtTriangle:{gdLst:[{n:"it",f:"*/ h 7 12"},{n:"ir",f:"*/ w 7 12"},{n:"ib",f:"*/ h 11 12"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},smileyFace:{avLst:[{n:"adj",f:"val 4653"}],gdLst:[{n:"a",f:"pin -4653 adj 4653"},{n:"x1",f:"*/ w 4969 21699"},{n:"x2",f:"*/ w 6215 21600"},{n:"x3",f:"*/ w 13135 21600"},{n:"x4",f:"*/ w 16640 21600"},{n:"y1",f:"*/ h 7570 21600"},{n:"y3",f:"*/ h 16515 21600"},{n:"dy2",f:"*/ h a 100000"},{n:"y2",f:"+- y3 0 dy2"},{n:"y4",f:"+- y3 dy2 0"},{n:"dy3",f:"*/ h a 50000"},{n:"y5",f:"+- y4 dy3 0"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"},{n:"wR",f:"*/ w 1125 21600"},{n:"hR",f:"*/ h 1125 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"}],fill:"darkenLess",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"quadBezTo",pts:[{x:"hc",y:"y5"},{x:"x4",y:"y2"}]}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"21600000"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},snip1Rect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"it",f:"*/ dx1 1 2"},{n:"ir",f:"+/ x1 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snip2DiagRect:{avLst:[{n:"adj1",f:"val 0"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"lx1",f:"*/ ss a1 100000"},{n:"lx2",f:"+- r 0 lx1"},{n:"ly1",f:"+- b 0 lx1"},{n:"rx1",f:"*/ ss a2 100000"},{n:"rx2",f:"+- r 0 rx1"},{n:"ry1",f:"+- b 0 rx1"},{n:"d",f:"+- lx1 0 rx1"},{n:"dx",f:"?: d lx1 rx1"},{n:"il",f:"*/ dx 1 2"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"lx1",y:"t"}},{type:"lnTo",pt:{x:"rx2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"rx1"}},{type:"lnTo",pt:{x:"r",y:"ly1"}},{type:"lnTo",pt:{x:"lx2",y:"b"}},{type:"lnTo",pt:{x:"rx1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"ry1"}},{type:"lnTo",pt:{x:"l",y:"lx1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snip2SameRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"tx1",f:"*/ ss a1 100000"},{n:"tx2",f:"+- r 0 tx1"},{n:"bx1",f:"*/ ss a2 100000"},{n:"bx2",f:"+- r 0 bx1"},{n:"by1",f:"+- b 0 bx1"},{n:"d",f:"+- tx1 0 bx1"},{n:"dx",f:"?: d tx1 bx1"},{n:"il",f:"*/ dx 1 2"},{n:"ir",f:"+- r 0 il"},{n:"it",f:"*/ tx1 1 2"},{n:"ib",f:"+/ by1 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"tx1",y:"t"}},{type:"lnTo",pt:{x:"tx2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"tx1"}},{type:"lnTo",pt:{x:"r",y:"by1"}},{type:"lnTo",pt:{x:"bx2",y:"b"}},{type:"lnTo",pt:{x:"bx1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"by1"}},{type:"lnTo",pt:{x:"l",y:"tx1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snipRoundRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+/ x2 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},squareTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"dx"}},{type:"lnTo",pt:{x:"l",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"lnTo",pt:{x:"x1",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star10:{avLst:[{n:"adj",f:"val 42533"},{n:"hf",f:"val 105146"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"dx1",f:"*/ swd2 95106 100000"},{n:"dx2",f:"*/ swd2 58779 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy1",f:"*/ hd2 80902 100000"},{n:"dy2",f:"*/ hd2 30902 100000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 80902 100000"},{n:"sdx2",f:"*/ iwd2 30902 100000"},{n:"sdy1",f:"*/ ihd2 95106 100000"},{n:"sdy2",f:"*/ ihd2 58779 100000"},{n:"sx1",f:"+- hc 0 iwd2"},{n:"sx2",f:"+- hc 0 sdx1"},{n:"sx3",f:"+- hc 0 sdx2"},{n:"sx4",f:"+- hc sdx2 0"},{n:"sx5",f:"+- hc sdx1 0"},{n:"sx6",f:"+- hc iwd2 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc sdy2 0"},{n:"sy4",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"sx6",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"sx5",y:"sy3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"sx4",y:"sy4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star12:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 1800000"},{n:"dy1",f:"sin hd2 3600000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x3",f:"*/ w 3 4"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y3",f:"*/ h 3 4"},{n:"y4",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"cos iwd2 900000"},{n:"sdx2",f:"cos iwd2 2700000"},{n:"sdx3",f:"cos iwd2 4500000"},{n:"sdy1",f:"sin ihd2 4500000"},{n:"sdy2",f:"sin ihd2 2700000"},{n:"sdy3",f:"sin ihd2 900000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc sdx3 0"},{n:"sx5",f:"+- hc sdx2 0"},{n:"sx6",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc sdy3 0"},{n:"sy5",f:"+- vc sdy2 0"},{n:"sy6",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy3"}},{type:"lnTo",pt:{x:"x1",y:"hd4"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"wd4",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x4",y:"hd4"}},{type:"lnTo",pt:{x:"sx6",y:"sy3"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx6",y:"sy4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"sx5",y:"sy5"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"sx4",y:"sy6"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx3",y:"sy6"}},{type:"lnTo",pt:{x:"wd4",y:"y4"}},{type:"lnTo",pt:{x:"sx2",y:"sy5"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx1",y:"sy4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star16:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ wd2 92388 100000"},{n:"dx2",f:"*/ wd2 70711 100000"},{n:"dx3",f:"*/ wd2 38268 100000"},{n:"dy1",f:"*/ hd2 92388 100000"},{n:"dy2",f:"*/ hd2 70711 100000"},{n:"dy3",f:"*/ hd2 38268 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc dy3 0"},{n:"y5",f:"+- vc dy2 0"},{n:"y6",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 98079 100000"},{n:"sdx2",f:"*/ iwd2 83147 100000"},{n:"sdx3",f:"*/ iwd2 55557 100000"},{n:"sdx4",f:"*/ iwd2 19509 100000"},{n:"sdy1",f:"*/ ihd2 98079 100000"},{n:"sdy2",f:"*/ ihd2 83147 100000"},{n:"sdy3",f:"*/ ihd2 55557 100000"},{n:"sdy4",f:"*/ ihd2 19509 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc sdx4 0"},{n:"sx6",f:"+- hc sdx3 0"},{n:"sx7",f:"+- hc sdx2 0"},{n:"sx8",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc sdy4 0"},{n:"sy6",f:"+- vc sdy3 0"},{n:"sy7",f:"+- vc sdy2 0"},{n:"sy8",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy2"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx5",y:"sy1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy2"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"sx7",y:"sy3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"sx8",y:"sy4"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx8",y:"sy5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"sx7",y:"sy6"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"sx6",y:"sy7"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"lnTo",pt:{x:"sx5",y:"sy8"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx4",y:"sy8"}},{type:"lnTo",pt:{x:"x3",y:"y6"}},{type:"lnTo",pt:{x:"sx3",y:"sy7"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"sx2",y:"sy6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"sx1",y:"sy5"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star24:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 900000"},{n:"dx2",f:"cos wd2 1800000"},{n:"dx3",f:"cos wd2 2700000"},{n:"dx4",f:"val wd4"},{n:"dx5",f:"cos wd2 4500000"},{n:"dy1",f:"sin hd2 4500000"},{n:"dy2",f:"sin hd2 3600000"},{n:"dy3",f:"sin hd2 2700000"},{n:"dy4",f:"val hd4"},{n:"dy5",f:"sin hd2 900000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc 0 dx4"},{n:"x5",f:"+- hc 0 dx5"},{n:"x6",f:"+- hc dx5 0"},{n:"x7",f:"+- hc dx4 0"},{n:"x8",f:"+- hc dx3 0"},{n:"x9",f:"+- hc dx2 0"},{n:"x10",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc 0 dy4"},{n:"y5",f:"+- vc 0 dy5"},{n:"y6",f:"+- vc dy5 0"},{n:"y7",f:"+- vc dy4 0"},{n:"y8",f:"+- vc dy3 0"},{n:"y9",f:"+- vc dy2 0"},{n:"y10",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 99144 100000"},{n:"sdx2",f:"*/ iwd2 92388 100000"},{n:"sdx3",f:"*/ iwd2 79335 100000"},{n:"sdx4",f:"*/ iwd2 60876 100000"},{n:"sdx5",f:"*/ iwd2 38268 100000"},{n:"sdx6",f:"*/ iwd2 13053 100000"},{n:"sdy1",f:"*/ ihd2 99144 100000"},{n:"sdy2",f:"*/ ihd2 92388 100000"},{n:"sdy3",f:"*/ ihd2 79335 100000"},{n:"sdy4",f:"*/ ihd2 60876 100000"},{n:"sdy5",f:"*/ ihd2 38268 100000"},{n:"sdy6",f:"*/ ihd2 13053 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc 0 sdx5"},{n:"sx6",f:"+- hc 0 sdx6"},{n:"sx7",f:"+- hc sdx6 0"},{n:"sx8",f:"+- hc sdx5 0"},{n:"sx9",f:"+- hc sdx4 0"},{n:"sx10",f:"+- hc sdx3 0"},{n:"sx11",f:"+- hc sdx2 0"},{n:"sx12",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc 0 sdy5"},{n:"sy6",f:"+- vc 0 sdy6"},{n:"sy7",f:"+- vc sdy6 0"},{n:"sy8",f:"+- vc sdy5 0"},{n:"sy9",f:"+- vc sdy4 0"},{n:"sy10",f:"+- vc sdy3 0"},{n:"sy11",f:"+- vc sdy2 0"},{n:"sy12",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy6"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"sx2",y:"sy5"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"sx4",y:"sy3"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx7",y:"sy1"}},{type:"lnTo",pt:{x:"x6",y:"y1"}},{type:"lnTo",pt:{x:"sx8",y:"sy2"}},{type:"lnTo",pt:{x:"x7",y:"y2"}},{type:"lnTo",pt:{x:"sx9",y:"sy3"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"sx10",y:"sy4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"sx11",y:"sy5"}},{type:"lnTo",pt:{x:"x10",y:"y5"}},{type:"lnTo",pt:{x:"sx12",y:"sy6"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx12",y:"sy7"}},{type:"lnTo",pt:{x:"x10",y:"y6"}},{type:"lnTo",pt:{x:"sx11",y:"sy8"}},{type:"lnTo",pt:{x:"x9",y:"y7"}},{type:"lnTo",pt:{x:"sx10",y:"sy9"}},{type:"lnTo",pt:{x:"x8",y:"y8"}},{type:"lnTo",pt:{x:"sx9",y:"sy10"}},{type:"lnTo",pt:{x:"x7",y:"y9"}},{type:"lnTo",pt:{x:"sx8",y:"sy11"}},{type:"lnTo",pt:{x:"x6",y:"y10"}},{type:"lnTo",pt:{x:"sx7",y:"sy12"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx6",y:"sy12"}},{type:"lnTo",pt:{x:"x5",y:"y10"}},{type:"lnTo",pt:{x:"sx5",y:"sy11"}},{type:"lnTo",pt:{x:"x4",y:"y9"}},{type:"lnTo",pt:{x:"sx4",y:"sy10"}},{type:"lnTo",pt:{x:"x3",y:"y8"}},{type:"lnTo",pt:{x:"sx3",y:"sy9"}},{type:"lnTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"sx2",y:"sy8"}},{type:"lnTo",pt:{x:"x1",y:"y6"}},{type:"lnTo",pt:{x:"sx1",y:"sy7"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star32:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ wd2 98079 100000"},{n:"dx2",f:"*/ wd2 92388 100000"},{n:"dx3",f:"*/ wd2 83147 100000"},{n:"dx4",f:"cos wd2 2700000"},{n:"dx5",f:"*/ wd2 55557 100000"},{n:"dx6",f:"*/ wd2 38268 100000"},{n:"dx7",f:"*/ wd2 19509 100000"},{n:"dy1",f:"*/ hd2 98079 100000"},{n:"dy2",f:"*/ hd2 92388 100000"},{n:"dy3",f:"*/ hd2 83147 100000"},{n:"dy4",f:"sin hd2 2700000"},{n:"dy5",f:"*/ hd2 55557 100000"},{n:"dy6",f:"*/ hd2 38268 100000"},{n:"dy7",f:"*/ hd2 19509 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc 0 dx4"},{n:"x5",f:"+- hc 0 dx5"},{n:"x6",f:"+- hc 0 dx6"},{n:"x7",f:"+- hc 0 dx7"},{n:"x8",f:"+- hc dx7 0"},{n:"x9",f:"+- hc dx6 0"},{n:"x10",f:"+- hc dx5 0"},{n:"x11",f:"+- hc dx4 0"},{n:"x12",f:"+- hc dx3 0"},{n:"x13",f:"+- hc dx2 0"},{n:"x14",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc 0 dy4"},{n:"y5",f:"+- vc 0 dy5"},{n:"y6",f:"+- vc 0 dy6"},{n:"y7",f:"+- vc 0 dy7"},{n:"y8",f:"+- vc dy7 0"},{n:"y9",f:"+- vc dy6 0"},{n:"y10",f:"+- vc dy5 0"},{n:"y11",f:"+- vc dy4 0"},{n:"y12",f:"+- vc dy3 0"},{n:"y13",f:"+- vc dy2 0"},{n:"y14",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 99518 100000"},{n:"sdx2",f:"*/ iwd2 95694 100000"},{n:"sdx3",f:"*/ iwd2 88192 100000"},{n:"sdx4",f:"*/ iwd2 77301 100000"},{n:"sdx5",f:"*/ iwd2 63439 100000"},{n:"sdx6",f:"*/ iwd2 47140 100000"},{n:"sdx7",f:"*/ iwd2 29028 100000"},{n:"sdx8",f:"*/ iwd2 9802 100000"},{n:"sdy1",f:"*/ ihd2 99518 100000"},{n:"sdy2",f:"*/ ihd2 95694 100000"},{n:"sdy3",f:"*/ ihd2 88192 100000"},{n:"sdy4",f:"*/ ihd2 77301 100000"},{n:"sdy5",f:"*/ ihd2 63439 100000"},{n:"sdy6",f:"*/ ihd2 47140 100000"},{n:"sdy7",f:"*/ ihd2 29028 100000"},{n:"sdy8",f:"*/ ihd2 9802 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc 0 sdx5"},{n:"sx6",f:"+- hc 0 sdx6"},{n:"sx7",f:"+- hc 0 sdx7"},{n:"sx8",f:"+- hc 0 sdx8"},{n:"sx9",f:"+- hc sdx8 0"},{n:"sx10",f:"+- hc sdx7 0"},{n:"sx11",f:"+- hc sdx6 0"},{n:"sx12",f:"+- hc sdx5 0"},{n:"sx13",f:"+- hc sdx4 0"},{n:"sx14",f:"+- hc sdx3 0"},{n:"sx15",f:"+- hc sdx2 0"},{n:"sx16",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc 0 sdy5"},{n:"sy6",f:"+- vc 0 sdy6"},{n:"sy7",f:"+- vc 0 sdy7"},{n:"sy8",f:"+- vc 0 sdy8"},{n:"sy9",f:"+- vc sdy8 0"},{n:"sy10",f:"+- vc sdy7 0"},{n:"sy11",f:"+- vc sdy6 0"},{n:"sy12",f:"+- vc sdy5 0"},{n:"sy13",f:"+- vc sdy4 0"},{n:"sy14",f:"+- vc sdy3 0"},{n:"sy15",f:"+- vc sdy2 0"},{n:"sy16",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"lnTo",pt:{x:"sx2",y:"sy7"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"lnTo",pt:{x:"sx3",y:"sy6"}},{type:"lnTo",pt:{x:"x3",y:"y5"}},{type:"lnTo",pt:{x:"sx4",y:"sy5"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"sx5",y:"sy4"}},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"lnTo",pt:{x:"sx6",y:"sy3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"sx7",y:"sy2"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"lnTo",pt:{x:"sx8",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx9",y:"sy1"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"sx10",y:"sy2"}},{type:"lnTo",pt:{x:"x9",y:"y2"}},{type:"lnTo",pt:{x:"sx11",y:"sy3"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"sx12",y:"sy4"}},{type:"lnTo",pt:{x:"x11",y:"y4"}},{type:"lnTo",pt:{x:"sx13",y:"sy5"}},{type:"lnTo",pt:{x:"x12",y:"y5"}},{type:"lnTo",pt:{x:"sx14",y:"sy6"}},{type:"lnTo",pt:{x:"x13",y:"y6"}},{type:"lnTo",pt:{x:"sx15",y:"sy7"}},{type:"lnTo",pt:{x:"x14",y:"y7"}},{type:"lnTo",pt:{x:"sx16",y:"sy8"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx16",y:"sy9"}},{type:"lnTo",pt:{x:"x14",y:"y8"}},{type:"lnTo",pt:{x:"sx15",y:"sy10"}},{type:"lnTo",pt:{x:"x13",y:"y9"}},{type:"lnTo",pt:{x:"sx14",y:"sy11"}},{type:"lnTo",pt:{x:"x12",y:"y10"}},{type:"lnTo",pt:{x:"sx13",y:"sy12"}},{type:"lnTo",pt:{x:"x11",y:"y11"}},{type:"lnTo",pt:{x:"sx12",y:"sy13"}},{type:"lnTo",pt:{x:"x10",y:"y12"}},{type:"lnTo",pt:{x:"sx11",y:"sy14"}},{type:"lnTo",pt:{x:"x9",y:"y13"}},{type:"lnTo",pt:{x:"sx10",y:"sy15"}},{type:"lnTo",pt:{x:"x8",y:"y14"}},{type:"lnTo",pt:{x:"sx9",y:"sy16"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx8",y:"sy16"}},{type:"lnTo",pt:{x:"x7",y:"y14"}},{type:"lnTo",pt:{x:"sx7",y:"sy15"}},{type:"lnTo",pt:{x:"x6",y:"y13"}},{type:"lnTo",pt:{x:"sx6",y:"sy14"}},{type:"lnTo",pt:{x:"x5",y:"y12"}},{type:"lnTo",pt:{x:"sx5",y:"sy13"}},{type:"lnTo",pt:{x:"x4",y:"y11"}},{type:"lnTo",pt:{x:"sx4",y:"sy12"}},{type:"lnTo",pt:{x:"x3",y:"y10"}},{type:"lnTo",pt:{x:"sx3",y:"sy11"}},{type:"lnTo",pt:{x:"x2",y:"y9"}},{type:"lnTo",pt:{x:"sx2",y:"sy10"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"sx1",y:"sy9"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star4:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx",f:"cos iwd2 2700000"},{n:"sdy",f:"sin ihd2 2700000"},{n:"sx1",f:"+- hc 0 sdx"},{n:"sx2",f:"+- hc sdx 0"},{n:"sy1",f:"+- vc 0 sdy"},{n:"sy2",f:"+- vc sdy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star5:{avLst:[{n:"adj",f:"val 19098"},{n:"hf",f:"val 105146"},{n:"vf",f:"val 110557"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"cos swd2 1080000"},{n:"dx2",f:"cos swd2 18360000"},{n:"dy1",f:"sin shd2 1080000"},{n:"dy2",f:"sin shd2 18360000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc 0 dy2"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ shd2 a 50000"},{n:"sdx1",f:"cos iwd2 20520000"},{n:"sdx2",f:"cos iwd2 3240000"},{n:"sdy1",f:"sin ihd2 3240000"},{n:"sdy2",f:"sin ihd2 20520000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc sdx1 0"},{n:"sy1",f:"+- svc 0 sdy1"},{n:"sy2",f:"+- svc 0 sdy2"},{n:"sy3",f:"+- svc ihd2 0"},{n:"yAdj",f:"+- svc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star6:{avLst:[{n:"adj",f:"val 28868"},{n:"hf",f:"val 115470"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"dx1",f:"cos swd2 1800000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"y2",f:"+- vc hd4 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx2",f:"*/ iwd2 1 2"},{n:"sx1",f:"+- hc 0 iwd2"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc iwd2 0"},{n:"sdy1",f:"sin ihd2 3600000"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"hd4"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x2",y:"hd4"}},{type:"lnTo",pt:{x:"sx4",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy2"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star7:{avLst:[{n:"adj",f:"val 34601"},{n:"hf",f:"val 102572"},{n:"vf",f:"val 105210"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"*/ swd2 97493 100000"},{n:"dx2",f:"*/ swd2 78183 100000"},{n:"dx3",f:"*/ swd2 43388 100000"},{n:"dy1",f:"*/ shd2 62349 100000"},{n:"dy2",f:"*/ shd2 22252 100000"},{n:"dy3",f:"*/ shd2 90097 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc dy2 0"},{n:"y3",f:"+- svc dy3 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ shd2 a 50000"},{n:"sdx1",f:"*/ iwd2 97493 100000"},{n:"sdx2",f:"*/ iwd2 78183 100000"},{n:"sdx3",f:"*/ iwd2 43388 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc sdx3 0"},{n:"sx5",f:"+- hc sdx2 0"},{n:"sx6",f:"+- hc sdx1 0"},{n:"sdy1",f:"*/ ihd2 90097 100000"},{n:"sdy2",f:"*/ ihd2 22252 100000"},{n:"sdy3",f:"*/ ihd2 62349 100000"},{n:"sy1",f:"+- svc 0 sdy1"},{n:"sy2",f:"+- svc 0 sdy2"},{n:"sy3",f:"+- svc sdy3 0"},{n:"sy4",f:"+- svc ihd2 0"},{n:"yAdj",f:"+- svc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy2"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"sx5",y:"sy3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"sy4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star8:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 2700000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"sin hd2 2700000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 92388 100000"},{n:"sdx2",f:"*/ iwd2 38268 100000"},{n:"sdy1",f:"*/ ihd2 92388 100000"},{n:"sdy2",f:"*/ ihd2 38268 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc sdy2 0"},{n:"sy4",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx4",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx2",y:"sy4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},straightConnector1:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},stripedRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 84375 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x4",f:"*/ ss 5 32"},{n:"dx5",f:"*/ ss a2 100000"},{n:"x5",f:"+- r 0 dx5"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx6",f:"*/ dy1 dx5 hd2"},{n:"x6",f:"+- r 0 dx6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"ssd32",y:"y1"}},{type:"lnTo",pt:{x:"ssd32",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"ssd16",y:"y1"}},{type:"lnTo",pt:{x:"ssd8",y:"y1"}},{type:"lnTo",pt:{x:"ssd8",y:"y2"}},{type:"lnTo",pt:{x:"ssd16",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x5",y:"b"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},sun:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 12500 adj 46875"},{n:"g0",f:"+- 50000 0 a"},{n:"g1",f:"*/ g0 30274 32768"},{n:"g2",f:"*/ g0 12540 32768"},{n:"g3",f:"+- g1 50000 0"},{n:"g4",f:"+- g2 50000 0"},{n:"g5",f:"+- 50000 0 g1"},{n:"g6",f:"+- 50000 0 g2"},{n:"g7",f:"*/ g0 23170 32768"},{n:"g8",f:"+- 50000 g7 0"},{n:"g9",f:"+- 50000 0 g7"},{n:"g10",f:"*/ g5 3 4"},{n:"g11",f:"*/ g6 3 4"},{n:"g12",f:"+- g10 3662 0"},{n:"g13",f:"+- g11 3662 0"},{n:"g14",f:"+- g11 12500 0"},{n:"g15",f:"+- 100000 0 g10"},{n:"g16",f:"+- 100000 0 g12"},{n:"g17",f:"+- 100000 0 g13"},{n:"g18",f:"+- 100000 0 g14"},{n:"ox1",f:"*/ w 18436 21600"},{n:"oy1",f:"*/ h 3163 21600"},{n:"ox2",f:"*/ w 3163 21600"},{n:"oy2",f:"*/ h 18436 21600"},{n:"x8",f:"*/ w g8 100000"},{n:"x9",f:"*/ w g9 100000"},{n:"x10",f:"*/ w g10 100000"},{n:"x12",f:"*/ w g12 100000"},{n:"x13",f:"*/ w g13 100000"},{n:"x14",f:"*/ w g14 100000"},{n:"x15",f:"*/ w g15 100000"},{n:"x16",f:"*/ w g16 100000"},{n:"x17",f:"*/ w g17 100000"},{n:"x18",f:"*/ w g18 100000"},{n:"x19",f:"*/ w a 100000"},{n:"wR",f:"*/ w g0 100000"},{n:"hR",f:"*/ h g0 100000"},{n:"y8",f:"*/ h g8 100000"},{n:"y9",f:"*/ h g9 100000"},{n:"y10",f:"*/ h g10 100000"},{n:"y12",f:"*/ h g12 100000"},{n:"y13",f:"*/ h g13 100000"},{n:"y14",f:"*/ h g14 100000"},{n:"y15",f:"*/ h g15 100000"},{n:"y16",f:"*/ h g16 100000"},{n:"y17",f:"*/ h g17 100000"},{n:"y18",f:"*/ h g18 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x15",y:"y18"}},{type:"lnTo",pt:{x:"x15",y:"y14"}},{type:"close"},{type:"moveTo",pt:{x:"ox1",y:"oy1"}},{type:"lnTo",pt:{x:"x16",y:"y13"}},{type:"lnTo",pt:{x:"x17",y:"y12"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x18",y:"y10"}},{type:"lnTo",pt:{x:"x14",y:"y10"}},{type:"close"},{type:"moveTo",pt:{x:"ox2",y:"oy1"}},{type:"lnTo",pt:{x:"x13",y:"y12"}},{type:"lnTo",pt:{x:"x12",y:"y13"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x10",y:"y14"}},{type:"lnTo",pt:{x:"x10",y:"y18"}},{type:"close"},{type:"moveTo",pt:{x:"ox2",y:"oy2"}},{type:"lnTo",pt:{x:"x12",y:"y17"}},{type:"lnTo",pt:{x:"x13",y:"y16"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x14",y:"y15"}},{type:"lnTo",pt:{x:"x18",y:"y15"}},{type:"close"},{type:"moveTo",pt:{x:"ox1",y:"oy2"}},{type:"lnTo",pt:{x:"x17",y:"y16"}},{type:"lnTo",pt:{x:"x16",y:"y17"}},{type:"close"},{type:"moveTo",pt:{x:"x19",y:"vc"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},swooshArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 1 adj1 75000"},{n:"maxAdj2",f:"*/ 70000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"ad1",f:"*/ h a1 100000"},{n:"ad2",f:"*/ ss a2 100000"},{n:"xB",f:"+- r 0 ad2"},{n:"yB",f:"+- t ssd8 0"},{n:"alfa",f:"*/ cd4 1 14"},{n:"dx0",f:"tan ssd8 alfa"},{n:"xC",f:"+- xB 0 dx0"},{n:"dx1",f:"tan ad1 alfa"},{n:"yF",f:"+- yB ad1 0"},{n:"xF",f:"+- xB dx1 0"},{n:"xE",f:"+- xF dx0 0"},{n:"yE",f:"+- yF ssd8 0"},{n:"dy2",f:"+- yE 0 t"},{n:"dy22",f:"*/ dy2 1 2"},{n:"dy3",f:"*/ h 1 20"},{n:"yD",f:"+- t dy22 dy3"},{n:"dy4",f:"*/ hd6 1 1"},{n:"yP1",f:"+- hd6 dy4 0"},{n:"xP1",f:"val wd6"},{n:"dy5",f:"*/ hd6 1 2"},{n:"yP2",f:"+- yF dy5 0"},{n:"xP2",f:"val wd4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"quadBezTo",pts:[{x:"xP1",y:"yP1"},{x:"xB",y:"yB"}]},{type:"lnTo",pt:{x:"xC",y:"t"}},{type:"lnTo",pt:{x:"r",y:"yD"}},{type:"lnTo",pt:{x:"xE",y:"yE"}},{type:"lnTo",pt:{x:"xF",y:"yF"}},{type:"quadBezTo",pts:[{x:"xP2",y:"yP2"},{x:"l",y:"b"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},teardrop:{avLst:[{n:"adj",f:"val 100000"}],gdLst:[{n:"a",f:"pin 0 adj 200000"},{n:"r2",f:"sqrt 2"},{n:"tw",f:"*/ wd2 r2 1"},{n:"th",f:"*/ hd2 r2 1"},{n:"sw",f:"*/ tw a 100000"},{n:"sh",f:"*/ th a 100000"},{n:"dx1",f:"cos sw 2700000"},{n:"dy1",f:"sin sh 2700000"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"x2",f:"+/ hc x1 2"},{n:"y2",f:"+/ vc y1 2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"quadBezTo",pts:[{x:"x2",y:"t"},{x:"x1",y:"y1"}]},{type:"quadBezTo",pts:[{x:"r",y:"y2"},{x:"r",y:"vc"}]},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},trapezoid:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 200000"},{n:"x2",f:"*/ ss a 100000"},{n:"x3",f:"+- r 0 x2"},{n:"x4",f:"+- r 0 x1"},{n:"il",f:"*/ wd3 a maxAdj"},{n:"it",f:"*/ hd3 a maxAdj"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},triangle:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"x1",f:"*/ w a 200000"},{n:"x2",f:"*/ w a 100000"},{n:"x3",f:"+- x1 wd2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss h"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"*/ ss a3 100000"},{n:"dy2",f:"*/ h a4 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"y3",f:"+/ y2 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upDownArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"y2",f:"*/ ss a2 100000"},{n:"y3",f:"+- b 0 y2"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"*/ x1 y2 wd2"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy2",f:"*/ ss a2 100000"},{n:"y2",f:"+- t dy2 0"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"*/ x1 dy2 wd2"},{n:"y1",f:"+- y2  0 dy1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upDownArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 50000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss hd2"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"*/ ss a3 100000"},{n:"y4",f:"+- b 0 y1"},{n:"dy2",f:"*/ h a4 200000"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},uturnArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 43750"},{n:"adj5",f:"val 75000"}],gdLst:[{n:"a2",f:"pin 0 adj2 25000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q2",f:"*/ a1 ss h"},{n:"q3",f:"+- 100000 0 q2"},{n:"maxAdj3",f:"*/ q3 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q1",f:"+- a3 a1 0"},{n:"minAdj5",f:"*/ q1 ss h"},{n:"a5",f:"pin minAdj5 adj5 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw2",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"dh2",f:"+- aw2 0 th2"},{n:"y5",f:"*/ h a5 100000"},{n:"ah",f:"*/ ss a3 100000"},{n:"y4",f:"+- y5 0 ah"},{n:"x9",f:"+- r 0 dh2"},{n:"bw",f:"*/ x9 1 2"},{n:"bs",f:"min bw y4"},{n:"maxAdj4",f:"*/ bs 100000 ss"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"bd",f:"*/ ss a4 100000"},{n:"bd3",f:"+- bd 0 th"},{n:"bd2",f:"max bd3 0"},{n:"x3",f:"+- th bd2 0"},{n:"x8",f:"+- r 0 aw2"},{n:"x6",f:"+- x8 0 aw2"},{n:"x7",f:"+- x6 dh2 0"},{n:"x4",f:"+- x9 0 bd"},{n:"x5",f:"+- x7 0 bd2"},{n:"cx",f:"+/ th x7 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"bd"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"x7",y:"y4"}},{type:"lnTo",pt:{x:"x7",y:"x3"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"th"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"th",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},verticalScroll:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"ch",f:"*/ ss a 100000"},{n:"ch2",f:"*/ ch 1 2"},{n:"ch4",f:"*/ ch 1 4"},{n:"x3",f:"+- ch ch2 0"},{n:"x4",f:"+- ch ch 0"},{n:"x6",f:"+- r 0 ch"},{n:"x7",f:"+- r 0 ch2"},{n:"x5",f:"+- x6 0 ch2"},{n:"y3",f:"+- b 0 ch"},{n:"y4",f:"+- b 0 ch2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x7",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"ch",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"3cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"3cd4",swAng:"cd2"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x7",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"moveTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"moveTo",pt:{x:"ch2",y:"y3"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"ch",y:"y4"}},{type:"moveTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"ch",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},wave:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin -10000 adj2 10000"},{n:"y1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ y1 10 3"},{n:"y2",f:"+- y1 0 dy2"},{n:"y3",f:"+- y1 dy2 0"},{n:"y4",f:"+- b 0 y1"},{n:"y5",f:"+- y4 0 dy2"},{n:"y6",f:"+- y4 dy2 0"},{n:"dx1",f:"*/ w a2 100000"},{n:"of2",f:"*/ w a2 50000"},{n:"x1",f:"abs dx1"},{n:"dx2",f:"?: of2 0 of2"},{n:"x2",f:"+- l 0 dx2"},{n:"dx5",f:"?: of2 of2 0"},{n:"x5",f:"+- r 0 dx5"},{n:"dx3",f:"+/ dx2 x5 3"},{n:"x3",f:"+- x2 dx3 0"},{n:"x4",f:"+/ x3 x5 2"},{n:"x6",f:"+- l dx5 0"},{n:"x10",f:"+- r dx2 0"},{n:"x7",f:"+- x6 dx3 0"},{n:"x8",f:"+/ x7 x10 2"},{n:"x9",f:"+- r 0 x1"},{n:"xAdj",f:"+- hc dx1 0"},{n:"xAdj2",f:"+- hc 0 dx1"},{n:"il",f:"max x2 x6"},{n:"ir",f:"min x5 x10"},{n:"it",f:"*/ h a1 50000"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y2"},{x:"x4",y:"y3"},{x:"x5",y:"y1"}]},{type:"lnTo",pt:{x:"x10",y:"y4"}},{type:"cubicBezTo",pts:[{x:"x8",y:"y6"},{x:"x7",y:"y5"},{x:"x6",y:"y4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeEllipseCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"sdx",f:"*/ dxPos h 1"},{n:"sdy",f:"*/ dyPos w 1"},{n:"pang",f:"at2 sdx sdy"},{n:"stAng",f:"+- pang 660000 0"},{n:"enAng",f:"+- pang 0 660000"},{n:"dx1",f:"cos wd2 stAng"},{n:"dy1",f:"sin hd2 stAng"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"dx2",f:"cos wd2 enAng"},{n:"dy2",f:"sin hd2 enAng"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"stAng1",f:"at2 dx1 dy1"},{n:"enAng1",f:"at2 dx2 dy2"},{n:"swAng1",f:"+- enAng1 0 stAng1"},{n:"swAng2",f:"+- swAng1 21600000 0"},{n:"swAng",f:"?: swAng1 swAng1 swAng2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xPos",y:"yPos"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng1",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeRectCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"dx",f:"+- xPos 0 hc"},{n:"dy",f:"+- yPos 0 vc"},{n:"dq",f:"*/ dxPos h w"},{n:"ady",f:"abs dyPos"},{n:"adq",f:"abs dq"},{n:"dz",f:"+- ady 0 adq"},{n:"xg1",f:"?: dxPos 7 2"},{n:"xg2",f:"?: dxPos 10 5"},{n:"x1",f:"*/ w xg1 12"},{n:"x2",f:"*/ w xg2 12"},{n:"yg1",f:"?: dyPos 7 2"},{n:"yg2",f:"?: dyPos 10 5"},{n:"y1",f:"*/ h yg1 12"},{n:"y2",f:"*/ h yg2 12"},{n:"t1",f:"?: dxPos l xPos"},{n:"xl",f:"?: dz l t1"},{n:"t2",f:"?: dyPos x1 xPos"},{n:"xt",f:"?: dz t2 x1"},{n:"t3",f:"?: dxPos xPos r"},{n:"xr",f:"?: dz r t3"},{n:"t4",f:"?: dyPos xPos x1"},{n:"xb",f:"?: dz t4 x1"},{n:"t5",f:"?: dxPos y1 yPos"},{n:"yl",f:"?: dz y1 t5"},{n:"t6",f:"?: dyPos t yPos"},{n:"yt",f:"?: dz t6 t"},{n:"t7",f:"?: dxPos yPos y1"},{n:"yr",f:"?: dz y1 t7"},{n:"t8",f:"?: dyPos yPos b"},{n:"yb",f:"?: dz t8 b"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"xt",y:"yt"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"xr",y:"yr"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"xb",y:"yb"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"xl",y:"yl"}},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeRoundRectCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"},{n:"adj3",f:"val 16667"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"dq",f:"*/ dxPos h w"},{n:"ady",f:"abs dyPos"},{n:"adq",f:"abs dq"},{n:"dz",f:"+- ady 0 adq"},{n:"xg1",f:"?: dxPos 7 2"},{n:"xg2",f:"?: dxPos 10 5"},{n:"x1",f:"*/ w xg1 12"},{n:"x2",f:"*/ w xg2 12"},{n:"yg1",f:"?: dyPos 7 2"},{n:"yg2",f:"?: dyPos 10 5"},{n:"y1",f:"*/ h yg1 12"},{n:"y2",f:"*/ h yg2 12"},{n:"t1",f:"?: dxPos l xPos"},{n:"xl",f:"?: dz l t1"},{n:"t2",f:"?: dyPos x1 xPos"},{n:"xt",f:"?: dz t2 x1"},{n:"t3",f:"?: dxPos xPos r"},{n:"xr",f:"?: dz r t3"},{n:"t4",f:"?: dyPos xPos x1"},{n:"xb",f:"?: dz t4 x1"},{n:"t5",f:"?: dxPos y1 yPos"},{n:"yl",f:"?: dz y1 t5"},{n:"t6",f:"?: dyPos t yPos"},{n:"yt",f:"?: dz t6 t"},{n:"t7",f:"?: dxPos yPos y1"},{n:"yr",f:"?: dz y1 t7"},{n:"t8",f:"?: dyPos yPos b"},{n:"yb",f:"?: dz t8 b"},{n:"u1",f:"*/ ss adj3 100000"},{n:"u2",f:"+- r 0 u1"},{n:"v2",f:"+- b 0 u1"},{n:"il",f:"*/ u1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"u1"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"xt",y:"yt"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"u2",y:"t"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"xr",y:"yr"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"v2"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"xb",y:"yb"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"u1",y:"b"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"xl",y:"yl"}},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]}}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/formulas.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/formulas",(function(n,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=1/6e4/180*Math.PI,u={"*/":function(n,t,r){return n*t/r},"+-":function(n,t,r){return n+t-r},"+/":function(n,t,r){return(n+t)/r},"?:":function(n,t,r){return n>0?t:r},abs:function(n){return Math.abs(n)},at2:function(n,t){return 180*Math.atan2(t,n)*6e4/Math.PI},cat2:function(n,t,r){return n*Math.cos(Math.atan2(r,t))},cos:function(n,t){return n*Math.cos(t*e)},max:function(n,t){return Math.max(n,t)},min:function(n,t){return Math.min(n,t)},mod:function(n,t,r){return Math.sqrt(Math.pow(n,2)+Math.pow(t,2)+Math.pow(r,2))},pin:function(n,t,r){return t<n?n:t>r?r:t},sat2:function(n,t,r){return n*Math.sin(Math.atan2(r,t))},sin:function(n,t){return n*Math.sin(t*e)},sqrt:function(n){return Math.sqrt(n)},tan:function(n,t){return n*Math.tan(t*e)},val:function(n){var t=parseInt(n,10);return isNaN(t),t}};t.evalFmla=function(n,t,r){var a=t.split(/[ ]+/);a.length<=1&&console.warn("fmla format error",t);var e=a[0],o=a.slice(1).map((function(n){if(n in r)return r[n];var a=parseInt(n,10);return isNaN(a)?(console.warn("fmla arg error",n,t),0):a}));if(e in u){var i=u[e].apply(null,o);if(isNaN(i))return console.warn("fmla eval error",t,n),0;r[n]=i}return 0},t.formulas=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/arcToA.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/arcToA",(function(t,a,n,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=function(t){return Math.PI*(t/6e4/180)};function c(t,a){return[t[0][0]*a[0]+t[0][1]*a[1],t[1][0]*a[0]+t[1][1]*a[1]]}a.default=function(t,a,n,e,o,i){var u=r(n),s=r(e),h=r(n+e);(function(t,a){if(t===a)return!0;var n=Math.abs(t-a);return n<Number.EPSILON||n<=Number.EPSILON*Math.min(Math.abs(t),Math.abs(a))})(e,216e5)&&(h-=1e-4);var M=function(t,a,n,e,r,o,i){var u=n,s=e,h=[o,i],M=[[Math.cos(r),-Math.sin(r)],[Math.sin(r),Math.cos(r)]],f=[t*Math.cos(u),a*Math.sin(u)],d=c(M,f),b=[h[0]-d[0],h[1]-d[1]],v=[t*Math.cos(s),a*Math.sin(s)],l=c(M,v),m=[b[0]+l[0],b[1]+l[1]];return{x:m[0],y:m[1]}}(t,a,u,h,0,o,i),f=Math.abs(s)>Math.PI?1:0,d=e>0?1:0;return{path:"A ".concat(t," ").concat(a," 0 ").concat(f," ").concat(d," ").concat(M.x,",").concat(M.y),end:M}}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/generateDefines.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/generateDefines",(function(e,n,a,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),s=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/arcToA");function c(e,n,a){var t=0;if(e in n)t=n[e];else if(t=parseInt(e,10),isNaN(t))return console.warn("var not found",e),0;return a?t*a:t}n.generateDefines=function(e,n,a){var t,r,l=e.defines,u=[],i=e.w,p=e.h,h=1,v=1;i&&(h=n.w/i),p&&(v=n.h/p);try{for(var x=o.__values(l),y=x.next();!y.done;y=x.next()){var d=y.value;switch(d.type){case"moveTo":var f=c((w=d.pt).x,n,h),g=c(w.y,n,v);u.push("M ".concat(f," ").concat(g)),a.push({x:f,y:g});break;case"lnTo":var w;f=c((w=d.pt).x,n,h),g=c(w.y,n,v);u.push("L ".concat(f," ").concat(g)),a.push({x:f,y:g});break;case"arcTo":var b=d,m=c(b.wR,n,h),T=c(b.hR,n,v),_=c(b.stAng,n),k=c(b.swAng,n),z={x:0,y:0};a.length>0&&(z=a[a.length-1]);var B=s.default(m,T,_,k,z.x,z.y);u.push(B.path),a.push({x:B.end.x,y:B.end.y});break;case"quadBezTo":var A=d;if(A.pts.length>=2){var j=A.pts[0],q=A.pts[1],D=c(j.x,n,h),M=c(j.y,n,v),N=c(q.x,n,h),R=c(q.y,n,v);if(u.push("Q ".concat(D,",").concat(M," ").concat(N,",").concat(R)),A.pts.length>2){var C=c((O=A.pts[2]).x,n,h),I=c(O.y,n,v);u.push("T ".concat(C,",").concat(I)),a.push({x:C,y:I})}else a.push({x:N,y:R})}else console.warn("quadBezTo pts length must large than 2",d);break;case"cubicBezTo":var L=d;if(3===L.pts.length){j=L.pts[0],q=L.pts[1];var O=L.pts[2];D=c(j.x,n,h),M=c(j.y,n,v),N=c(q.x,n,h),R=c(q.y,n,v),C=c(O.x,n,h),I=c(O.y,n,v);u.push("C ".concat(D,",").concat(M," ").concat(N,",").concat(R," ").concat(C,",").concat(I)),a.push({x:C,y:I})}else console.warn("cubicBezTo pts length must be 3",d);break;case"close":u.push("Z")}}}catch(e){t={error:e}}finally{try{y&&!y.done&&(r=x.return)&&r.call(x)}finally{if(t)throw t.error}}return u.join(" ")}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/presetVal.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/presetVal",(function(d,e,s,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.presetVal=function(d,e){var s=Math.min(d,e),c=s/6,r=s/6,t=s/8,w=s/32,n=s/16;return{t:0,"3cd4":162e5,"3cd8":81e5,"5cd8":135e5,"7cd8":189e5,b:e,cd2:108e5,cd4:54e5,cd8:27e5,h:e,hd2:e/2,hd3:e/3,hd4:e/4,hd6:e/6,hd8:e/8,l:0,ls:Math.max(d,e),r:d,ss:s,ssd2:c,ssd6:r,ssd8:t,ssd16:n,ssd32:w,hc:d/2,vc:e/2,w:d,wd2:d/2,wd3:d/3,wd4:d/4,wd6:d/6,wd8:d/8,wd10:d/10,wd16:d/16,wd32:d/32}}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/shapeToSVG.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/shapeToSVG",(function(e,t,l,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/color"),n=e("node_modules/ooxml-viewer/lib/util/dom"),a=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/formulas"),s=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/generateDefines"),u=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/presetVal");t.shapeToSVG=function(e,t,l,r,f,d){var v,b,m,c,w,x,h,y,g=n.createSVGElement("svg");g.style.display="block",g.setAttribute("style","display: block; overflow: visible; position: absolute; z-index: -1"),g.setAttribute("width",r.toString()+"px"),g.setAttribute("height",f.toString()+"px");var p=u.presetVal(r,f);try{for(var A=o.__values(e.avLst||[]),_=A.next();!_.done;_=A.next()){var k=_.value;a.evalFmla(k.n,k.f,p)}}catch(e){v={error:e}}finally{try{_&&!_.done&&(b=A.return)&&b.call(A)}finally{if(v)throw v.error}}try{for(var C=o.__values(t),S=C.next();!S.done;S=C.next()){k=S.value;a.evalFmla(k.n,k.f,p)}}catch(e){m={error:e}}finally{try{S&&!S.done&&(c=C.return)&&c.call(C)}finally{if(m)throw m.error}}try{for(var V=o.__values(e.gdLst||[]),L=V.next();!L.done;L=V.next()){k=L.value;a.evalFmla(k.n,k.f,p)}}catch(e){w={error:e}}finally{try{L&&!L.done&&(x=V.return)&&x.call(V)}finally{if(w)throw w.error}}var O=l.outline,F=[];try{for(var G=o.__values(e.pathLst||[]),H=G.next();!H.done;H=G.next()){var D=H.value,E=n.createSVGElement("path"),T=s.generateDefines(D,p,F);E.setAttribute("d",T),l.fillColor?E.setAttribute("fill",l.fillColor):d&&d.fillColor?E.setAttribute("fill",d.fillColor):E.setAttribute("fill","none"),O?(O.color&&E.setAttribute("stroke",O.color),O.width&&E.setAttribute("stroke-width",O.width),"none"===O.style&&E.setAttribute("stroke","none")):d&&d.lineColor?E.setAttribute("stroke",d.lineColor):E.setAttribute("stroke","none");var j=E.getAttribute("fill");if(j&&"none"!==j){var z=new i.Color(j),M=D.fill,P="";switch(M){case"darken":P=z.lumOff(-.5).toHex();break;case"darkenLess":P=z.lumOff(-.2).toHex();break;case"lighten":P=z.lumOff(.5).toHex();break;case"lightenLess":P=z.lumOff(.2).toHex()}P&&E.setAttribute("fill",P)}"none"===D.fill&&E.setAttribute("fill","none"),!1===D.stroke&&(E.setAttribute("stroke","none"),D.fill||E.setAttribute("fill","none")),l.noFill&&E.setAttribute("fill","none"),g.appendChild(E)}}catch(e){h={error:e}}finally{try{H&&!H.done&&(y=G.return)&&y.call(G)}finally{if(h)throw h.error}}return g}}));
;/*!node_modules/ooxml-viewer/lib/render/renderGeom.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderGeom",(function(e,r,o,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/presetShape"),i=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/shapeToSVG");r.renderGeom=function(e,r,o,n,l){if(e.prst){var s=d.presetShape[e.prst];if(s)return i.shapeToSVG(s,e.avLst||[],r,o,n,l)}return null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderCustGeom.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderCustGeom",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/svg/shapeToSVG");o.renderCustGeom=function(e,o,r,n,d){return e.shape?s.shapeToSVG(e.shape,[],o,r,n,d):null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderDrawing.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderDrawing",(function(e,l,r,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),n=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),d=e("node_modules/ooxml-viewer/lib/render/renderTable"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),p=e("node_modules/ooxml-viewer/lib/render/renderGeom"),c=e("node_modules/ooxml-viewer/lib/render/renderCustGeom");l.renderDrawing=function(e,l,r){var t,m,v=document.createElement("div");if("inline"===l.position?v.style.display="inline-block":l.position,l.pic&&n.appendChild(v,function(e,l,r){var t,o,a=null===(t=e.blipFill)||void 0===t?void 0:t.blip;if(a&&a.src){var n=document.createElement("img");n.style.position="relative",n.src=a.src;var i=null===(o=e.spPr)||void 0===o?void 0:o.xfrm;if(i){var d=i.off;d&&(n.style.left=d.x,n.style.top=d.y);var s=i.ext;s&&(n.style.width=s.cx,n.style.height=s.cy),i.rot&&(n.style.transform="rotate(".concat(i.rot,"deg)"))}return n}return null}(l.pic)),"page"===l.relativeFromV&&console.warn('暂不支持 drawing.relativeFromV === "page"'),n.applyStyle(v,l.containerStyle),v.dataset.id=l.id||"",v.dataset.name=l.name||"",l.wps){var y=l.wps,u=y.wpsStyle,f=y.spPr;if(n.applyStyle(v,y.style),(null==u?void 0:u.fontColor)&&(v.style.color=u.fontColor),null==f?void 0:f.xfrm){var x=f.xfrm.ext;if(x){if(v.style.width=x.cx,v.style.height=x.cy,f.geom){var g=parseFloat(x.cx.replace("px","")),w=parseFloat(x.cy.replace("px",""));n.appendChild(v,p.renderGeom(f.geom,f,g,w,y.wpsStyle))}if(f.custGeom){g=parseFloat(x.cx.replace("px","")),w=parseFloat(x.cy.replace("px",""));n.appendChild(v,c.renderCustGeom(f.custGeom,f,g,w,y.wpsStyle))}}f.xfrm.rot&&(v.style.transform="rotate(".concat(f.xfrm.rot,"deg)"))}var b=y.txbxContent;if(b.length){var h=document.createElement("div");h.dataset.name="textContainer",v.style.display="table",h.style.display="table-cell",h.style.verticalAlign="middle",y.style&&y.style["vertical-align"]&&(h.style.verticalAlign=y.style["vertical-align"],v.style.verticalAlign=""),n.appendChild(v,h);try{for(var _=o.__values(b),C=_.next();!C.done;C=_.next()){var F=C.value;F instanceof a.Paragraph?n.appendChild(h,i.default(e,F)):F instanceof s.Table&&n.appendChild(h,d.default(e,F))}}catch(e){t={error:e}}finally{try{C&&!C.done&&(m=_.return)&&m.call(_)}finally{if(t)throw t.error}}}}return 0===v.children.length?null:v}}));
;/*!node_modules/ooxml-viewer/lib/render/renderTab.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderTab",(function(e,r,o,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");r.renderTab=function(e,r){var o=d.createElement("span");return o.innerHTML="&emsp;","dot"===r.leader&&(o.style.borderBottom="1pt dotted"),o}}));
;/*!node_modules/ooxml-viewer/lib/render/renderPict.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderPict",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderPict=function(e,r){if(r.src){var n=document.createElement("img");return n.style.position="relative",n.src=r.src,n}return null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderRuby.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderRuby",(function(e,r,n,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/util/dom"),d=e("node_modules/ooxml-viewer/lib/render/renderRun");r.renderRuby=function(e,r){var n,l,i,o,u=a.createElement("ruby");if(r.rubyBase){try{for(var c=t.__values(r.rubyBase.children),f=c.next();!f.done;f=c.next()){var v=f.value;u.appendChild(d.default(e,v))}}catch(e){n={error:e}}finally{try{f&&!f.done&&(l=c.return)&&l.call(c)}finally{if(n)throw n.error}}if(r.rt){var s=a.createElement("rp");s.innerText="(",u.appendChild(s);var y=a.createElement("rt");try{for(var m=t.__values(r.rt.children),p=m.next();!p.done;p=m.next()){v=p.value;y.appendChild(d.default(e,v))}}catch(e){i={error:e}}finally{try{p&&!p.done&&(o=m.return)&&o.call(m)}finally{if(i)throw i.error}}u.appendChild(y);var b=a.createElement("rp");b.innerText=")",u.appendChild(b)}}return u}}));
;/*!node_modules/ooxml-viewer/lib/render/renderHyperLink.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderHyperLink",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),t=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/render/renderRun");r.renderHyperLink=function(e,r,n){var o,d,u=t.createElement("a");if(r.relation){var f=r.relation;f&&"External"===f.targetMode&&(u.href=f.target,u.target="_blank")}r.anchor&&(u.href="#"+r.anchor),r.tooltip&&(u.title=r.tooltip);try{for(var m=l.__values(r.children),s=m.next();!s.done;s=m.next()){var v=s.value;if(v instanceof i.Run){var c=a.default(e,v,n);t.appendChild(u,c)}}}catch(e){o={error:e}}finally{try{s&&!s.done&&(d=m.return)&&d.call(m)}finally{if(o)throw o.error}}return u}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBookmark.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBookmark",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/util/dom");r.renderBookmarkStart=function(e,r){var n=r.name;if(n){var o=i.createElement("a");return o.name=n,o.id=n,o}return null}}));
;/*!node_modules/ooxml-viewer/lib/render/renderInlineText.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderInlineText",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),m=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),t=e("node_modules/ooxml-viewer/lib/render/renderRun"),u=e("node_modules/ooxml-viewer/lib/render/renderHyperLink"),s=e("node_modules/ooxml-viewer/lib/render/renderBookmark");o.default=function(e,o,r){var n,f;try{for(var v=l.__values(o.children),p=v.next();!p.done;p=v.next()){var x=p.value;if(x instanceof i.Run)d.appendChild(r,t.default(e,x));else if(x instanceof a.BookmarkStart)d.appendChild(r,s.renderBookmarkStart(e,x));else if(x instanceof m.Hyperlink){var _=u.renderHyperLink(e,x);d.appendChild(r,_)}}}catch(e){n={error:e}}finally{try{p&&!p.done&&(f=v.return)&&f.call(v)}finally{if(n)throw n.error}}}}));
;/*!node_modules/ooxml-viewer/lib/render/renderInstrText.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderInstrText",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/dom"),o=e("node_modules/ooxml-viewer/lib/render/renderInlineText");r.renderInstrText=function(e,r){var n,t,d,a=r.text,s=i.createElement("span"),u=null===(d=e.currentParagraph)||void 0===d?void 0:d.fldSimples;if(u)try{for(var f=l.__values(u),m=f.next();!m.done;m=f.next()){var v=m.value;if(v.instr===a.trim()||a.startsWith(v.instr+" ")){o.default(e,v.inlineText,s);break}}}catch(e){n={error:e}}finally{try{m&&!m.done&&(t=f.return)&&t.call(f)}finally{if(n)throw n.error}}return s}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSym.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSym",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/util/dom");n.renderSym=function(e,n){var r=t.createElement("span");return r.style.fontFamily=n.font,r.innerHTML="&#x".concat(n.char,";"),r}}));
;/*!node_modules/ooxml-viewer/lib/util/autoSpace.js*/
amis.define("node_modules/ooxml-viewer/lib/util/autoSpace",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=/\p{Punctuation}/u,i=/\p{Separator}/u,a=/\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/u;e.cjkspace=function(t){var e,n,r=t.filter((function(t){return void 0!==t&&""!==t}));return n=function(t,e){return function(t,e){return a.test(t)?!(u.test(e)||i.test(e)||a.test(e)):a.test(e)&&!u.test(t)&&!i.test(t)}(t,e)?" ":""},(e=r).reduce((function(t,r,u){return t+(0!==u?n(r,e[u-1]):"")+r}),"")}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSoftHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSoftHyphen",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/util/dom");n.renderSoftHyphen=function(){var e=i.createElement("span");return e.innerHTML="&shy;",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");n.renderNoBreakHyphen=function(){var e=d.createElement("span");return e.innerHTML="&ndash;",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSeparator.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSeparator",(function(e,r,o,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("node_modules/ooxml-viewer/lib/util/dom");r.renderSeparator=function(){var e=d.createElement("hr");return e.style.borderTop="1pt solid #bbb",e}}));
;/*!node_modules/ooxml-viewer/lib/render/renderRun.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderRun",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/render/renderBr"),i=e("node_modules/ooxml-viewer/lib/util/dom"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Break"),s=e("node_modules/ooxml-viewer/lib/openxml/word/drawing/Drawing"),m=e("node_modules/ooxml-viewer/lib/render/renderDrawing"),p=e("node_modules/ooxml-viewer/lib/render/setElementStyle"),u=e("node_modules/ooxml-viewer/lib/openxml/word/Tab"),x=e("node_modules/ooxml-viewer/lib/render/renderTab"),v=e("node_modules/ooxml-viewer/lib/render/renderPict"),c=e("node_modules/ooxml-viewer/lib/openxml/word/Pict"),w=e("node_modules/ooxml-viewer/lib/openxml/word/Ruby"),b=e("node_modules/ooxml-viewer/lib/render/renderRuby"),f=e("node_modules/ooxml-viewer/lib/openxml/word/InstrText"),y=e("node_modules/ooxml-viewer/lib/render/renderInstrText"),_=e("node_modules/ooxml-viewer/lib/openxml/word/Sym"),h=e("node_modules/ooxml-viewer/lib/render/renderSym"),S=e("node_modules/ooxml-viewer/lib/util/autoSpace"),C=e("node_modules/ooxml-viewer/lib/render/renderSoftHyphen"),T=e("node_modules/ooxml-viewer/lib/openxml/word/SoftHyphen"),g=e("node_modules/ooxml-viewer/lib/openxml/word/NoBreakHyphen"),k=e("node_modules/ooxml-viewer/lib/render/renderNoBreakHyphen"),B=e("node_modules/ooxml-viewer/lib/openxml/word/Separator"),H=e("node_modules/ooxml-viewer/lib/render/renderSeparator"),P="variable";function R(e,o,r,n){var l;-1===r.indexOf("{{")?(null===(l=null==n?void 0:n.properties)||void 0===l?void 0:l.autoSpace)?e.textContent=S.cjkspace(r.split("")):e.textContent=r:(e.dataset.originText=r,e.classList.add(P),e.textContent=o.replaceText(r))}o.default=function(e,o,r,n,S){var P,E,D,I,N=i.createElement("span");if(e.addClass(N,"r"),p.setElementStyle(e,N,o.properties),null===(D=o.properties)||void 0===D?void 0:D.rStyle){var j=e.getStyle(o.properties.rStyle);(null===(I=null==j?void 0:j.rPr)||void 0===I?void 0:I.cssStyle)&&i.applyStyle(N,j.rPr.cssStyle)}if(1===o.children.length&&o.children[0]instanceof t.Text)R(N,e,o.children[0].text,r);else try{for(var O=l.__values(o.children),q=O.next();!q.done;q=O.next()){var A=q.value;if(A instanceof t.Text){var L=i.createElement("span");R(L,e,A.text,r),i.appendChild(N,L)}else if(A instanceof a.Break){var M=d.renderBr(e,A);i.appendChild(N,M)}else A instanceof s.Drawing?i.appendChild(N,m.renderDrawing(e,A,S)):A instanceof u.Tab?i.appendChild(N,x.renderTab(e,A)):A instanceof c.Pict?i.appendChild(N,v.renderPict(e,A)):A instanceof w.Ruby?i.appendChild(N,b.renderRuby(e,A)):A instanceof f.InstrText?i.appendChild(N,y.renderInstrText(e,A)):A instanceof _.Sym?i.appendChild(N,h.renderSym(e,A)):A instanceof T.SoftHyphen?i.appendChild(N,C.renderSoftHyphen()):A instanceof g.NoBreakHyphen?i.appendChild(N,k.renderNoBreakHyphen()):A instanceof B.Separator?i.appendChild(N,H.renderSeparator()):console.warn("unknown child",A)}}catch(e){P={error:e}}finally{try{q&&!q.done&&(E=O.return)&&E.call(O)}finally{if(P)throw P.error}}return N},o.updateVariableText=function(e){for(var o=e.rootElement.querySelectorAll(".".concat(P)),r=0;r<o.length;r++){var n=o[r],l=n.dataset.originText||"";n.textContent=e.replaceText(l)}}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNumbering.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNumbering",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/dom"),u=e("node_modules/ooxml-viewer/lib/render/setElementStyle");function a(e){var r={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},n="";for(var t in r)for(;e>=r[t];)n+=t,e-=r[t];return n}function s(e,r){switch(e){case"decimal":default:return r.toString();case"lowerLetter":return String.fromCharCode(96+r);case"upperLetter":return String.fromCharCode(64+r);case"lowerRoman":return a(r).toLowerCase();case"upperRoman":return a(r).toUpperCase();case"bullet":return"&bull;"}}r.renderNumbering=function(e,r,n){var t=r.numbering,a=n.numId;if(!a)return console.warn("renderNumbering: numId is empty"),null;if(!t)return console.warn("renderNumbering: numbering is empty"),null;var o=t.nums[a];if(!o)return console.warn("renderNumbering: num is empty"),null;var m=t.abstractNums[o.abstractNumId].lvls;o.lvlOverride&&(m=l.__assign(l.__assign({},m),o.lvlOverride.lvls));var d=m[n.ilvl];if(!d)return console.warn("renderNumbering: lvl is empty"),null;var f=n.ilvl,v=t.numData[a];if(v[f])for(var c in v[f]+=1,v)parseInt(c)>parseInt(f)&&(v[c]=0);else v[f]=d.start;for(var b=i.createElement("span"),p=d.lvlText,g=parseInt(f),w=[],C=0;C<=g;C++){var _=v[C];if(_){var I=s(m[C].numFmt,_);d.isLgl&&(I=String(_)),w.push(I)}}for(C=0;C<w.length;C++){var L=w[C];p=p.replace("%".concat(C+1),L)}if(u.setElementStyle(r,e,d.pPr),u.setElementStyle(r,b,d.rPr),"bullet"!==d.numFmt||r.renderOptions.bulletUseFont)b.innerText=p;else{var S="&bull;",y=p.charCodeAt(0).toString(16).padStart(4,"0");"f06e"===y?S="&#9632;":"f075"===y?S="&#9670;":"f0d8"===y&&(S="&#9658;"),b.innerHTML=S}return"space"===d.suff?b.innerHTML+=" ":"tab"===d.suff&&(b.innerHTML+="&emsp;"),b}}));
;/*!node_modules/ooxml-viewer/lib/util/xml.js*/
amis.define("node_modules/ooxml-viewer/lib/util/xml",(function(e,i,r,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.buildXML=function(e){return(new XMLSerializer).serializeToString(e)},i.parseXML=function(e){return(new DOMParser).parseFromString(e,"application/xml")}}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/xsl.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/xsl",(function(e,t,n,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("node_modules/ooxml-viewer/lib/util/xml").parseXML('\n<?xml version="1.0" encoding="UTF-8" ?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mml="http://www.w3.org/1998/Math/MathML"\n\txmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">\n  <xsl:output method="xml" encoding="UTF-16" />\n\n  \x3c!-- %% Global Definitions --\x3e\n\n  \x3c!-- Every single unicode character that is recognized by OMML as an operator --\x3e\n  <xsl:variable name="sOperators"\n\t\tselect="concat(\n          \'&#x00A8;&#x0021;&#x0022;&#x0023;&#x0026;&#x0028;&#x0029;&#x002B;&#x002C;&#x002D;&#x002E;&#x002F;&#x003A;\',\n          \'&#x003B;&#x003C;&#x003D;&#x003E;&#x003F;&#x0040;&#x005B;&#x005C;&#x005D;&#x005E;&#x005F;&#x0060;&#x007B;\',\n          \'&#x007C;&#x007D;&#x007E;&#x00A1;&#x00A6;&#x00AC;&#x00AF;&#x00B0;&#x00B1;&#x00B2;&#x00B3;&#x00B4;&#x00B7;&#x00B9;&#x00BF;\',\n          \'&#x00D7;&#x007E;&#x00F7;&#x02C7;&#x02D8;&#x02D9;&#x02DC;&#x02DD;&#x0300;&#x0301;&#x0302;&#x0303;&#x0304;&#x0305;&#x0306;&#x0307;&#x0308;&#x0309;\',\n          \'&#x030A;&#x030B;&#x030C;&#x030D;&#x030E;&#x030F;&#x0310;&#x0311;&#x0312;&#x0313;&#x0314;&#x0315;\',\n          \'&#x0316;&#x0317;&#x0318;&#x0319;&#x031A;&#x031B;&#x031C;&#x031D;&#x031E;&#x031F;&#x0320;&#x0321;\',\n          \'&#x0322;&#x0323;&#x0324;&#x0325;&#x0326;&#x0327;&#x0328;&#x0329;&#x032A;&#x032B;&#x032C;&#x032D;\',\n          \'&#x032E;&#x032F;&#x0330;&#x0331;&#x0332;&#x0333;&#x0334;&#x0335;&#x0336;&#x0337;&#x0338;&#x033F;\',\n          \'&#x2000;&#x2001;&#x2002;&#x2003;&#x2004;&#x2005;&#x2006;&#x2009;&#x200A;&#x2010;&#x2012;&#x2013;\',\n          \'&#x2014;&#x2016;&#x2020;&#x2021;&#x2022;&#x2024;&#x2025;&#x2026;&#x2032;&#x2033;&#x2034;&#x203C;\',\n          \'&#x2040;&#x2044;&#x204E;&#x204F;&#x2050;&#x2057;&#x2061;&#x2062;&#x2063;&#x2070;&#x2074;&#x2075;\',\n          \'&#x2076;&#x2077;&#x2078;&#x2079;&#x207A;&#x207B;&#x207C;&#x207D;&#x207E;&#x2080;&#x2081;&#x2082;\',\n          \'&#x2083;&#x2084;&#x2085;&#x2086;&#x2087;&#x2088;&#x2089;&#x208A;&#x208B;&#x208C;&#x208D;&#x208E;\',\n          \'&#x20D0;&#x20D1;&#x20D2;&#x20D3;&#x20D4;&#x20D5;&#x20D6;&#x20D7;&#x20D8;&#x20D9;&#x20DA;&#x20DB;\',\n          \'&#x20DC;&#x20DD;&#x20DE;&#x20DF;&#x20E0;&#x20E1;&#x20E4;&#x20E5;&#x20E6;&#x20E7;&#x20E8;&#x20E9;\',\n          \'&#x20EA;&#x2140;&#x2146;&#x2190;&#x2191;&#x2192;&#x2193;&#x2194;&#x2195;&#x2196;&#x2197;&#x2198;&#x2199;\',\n          \'&#x219A;&#x219B;&#x219C;&#x219D;&#x219E;&#x219F;&#x21A0;&#x21A1;&#x21A2;&#x21A3;&#x21A4;&#x21A5;\',\n          \'&#x21A6;&#x21A7;&#x21A8;&#x21A9;&#x21AA;&#x21AB;&#x21AC;&#x21AD;&#x21AE;&#x21AF;&#x21B0;&#x21B1;\',\n          \'&#x21B2;&#x21B3;&#x21B6;&#x21B7;&#x21BA;&#x21BB;&#x21BC;&#x21BD;&#x21BE;&#x21BF;&#x21C0;&#x21C1;\',\n          \'&#x21C2;&#x21C3;&#x21C4;&#x21C5;&#x21C6;&#x21C7;&#x21C8;&#x21C9;&#x21CA;&#x21CB;&#x21CC;&#x21CD;\',\n          \'&#x21CE;&#x21CF;&#x21D0;&#x21D1;&#x21D2;&#x21D3;&#x21D4;&#x21D5;&#x21D6;&#x21D7;&#x21D8;&#x21D9;\',\n          \'&#x21DA;&#x21DB;&#x21DC;&#x21DD;&#x21DE;&#x21DF;&#x21E0;&#x21E1;&#x21E2;&#x21E3;&#x21E4;&#x21E5;\',\n          \'&#x21E6;&#x21E7;&#x21E8;&#x21E9;&#x21F3;&#x21F4;&#x21F5;&#x21F6;&#x21F7;&#x21F8;&#x21F9;&#x21FA;\',\n          \'&#x21FB;&#x21FC;&#x21FD;&#x21FE;&#x21FF;&#x2200;&#x2201;&#x2202;&#x2203;&#x2204;&#x2206;&#x2207;\',\n          \'&#x2208;&#x2209;&#x220A;&#x220B;&#x220C;&#x220D;&#x220F;&#x2210;&#x2211;&#x2212;&#x2213;&#x2214;\',\n          \'&#x2215;&#x2216;&#x2217;&#x2218;&#x2219;&#x221A;&#x221B;&#x221C;&#x221D;&#x2223;&#x2224;&#x2225;\',\n          \'&#x2226;&#x2227;&#x2228;&#x2229;&#x222A;&#x222B;&#x222C;&#x222D;&#x222E;&#x222F;&#x2230;&#x2231;\',\n          \'&#x2232;&#x2233;&#x2234;&#x2235;&#x2236;&#x2237;&#x2238;&#x2239;&#x223A;&#x223B;&#x223C;&#x223D;\',\n          \'&#x223E;&#x2240;&#x2241;&#x2242;&#x2243;&#x2244;&#x2245;&#x2246;&#x2247;&#x2248;&#x2249;&#x224A;\',\n          \'&#x224B;&#x224C;&#x224D;&#x224E;&#x224F;&#x2250;&#x2251;&#x2252;&#x2253;&#x2254;&#x2255;&#x2256;\',\n          \'&#x2257;&#x2258;&#x2259;&#x225A;&#x225B;&#x225C;&#x225D;&#x225E;&#x225F;&#x2260;&#x2261;&#x2262;\',\n          \'&#x2263;&#x2264;&#x2265;&#x2266;&#x2267;&#x2268;&#x2269;&#x226A;&#x226B;&#x226C;&#x226D;&#x226E;\',\n          \'&#x226F;&#x2270;&#x2271;&#x2272;&#x2273;&#x2274;&#x2275;&#x2276;&#x2277;&#x2278;&#x2279;&#x227A;\',\n          \'&#x227B;&#x227C;&#x227D;&#x227E;&#x227F;&#x2280;&#x2281;&#x2282;&#x2283;&#x2284;&#x2285;&#x2286;\',\n          \'&#x2287;&#x2288;&#x2289;&#x228A;&#x228B;&#x228C;&#x228D;&#x228E;&#x228F;&#x2290;&#x2291;&#x2292;\',\n          \'&#x2293;&#x2294;&#x2295;&#x2296;&#x2297;&#x2298;&#x2299;&#x229A;&#x229B;&#x229C;&#x229D;&#x229E;\',\n          \'&#x229F;&#x22A0;&#x22A1;&#x22A2;&#x22A3;&#x22A5;&#x22A6;&#x22A7;&#x22A8;&#x22A9;&#x22AA;&#x22AB;\',\n          \'&#x22AC;&#x22AD;&#x22AE;&#x22AF;&#x22B0;&#x22B1;&#x22B2;&#x22B3;&#x22B4;&#x22B5;&#x22B6;&#x22B7;\',\n          \'&#x22B8;&#x22B9;&#x22BA;&#x22BB;&#x22BC;&#x22BD;&#x22C0;&#x22C1;&#x22C2;&#x22C3;&#x22C4;&#x22C5;\',\n          \'&#x22C6;&#x22C7;&#x22C8;&#x22C9;&#x22CA;&#x22CB;&#x22CC;&#x22CD;&#x22CE;&#x22CF;&#x22D0;&#x22D1;\',\n          \'&#x22D2;&#x22D3;&#x22D4;&#x22D5;&#x22D6;&#x22D7;&#x22D8;&#x22D9;&#x22DA;&#x22DB;&#x22DC;&#x22DD;\',\n          \'&#x22DE;&#x22DF;&#x22E0;&#x22E1;&#x22E2;&#x22E3;&#x22E4;&#x22E5;&#x22E6;&#x22E7;&#x22E8;&#x22E9;\',\n          \'&#x22EA;&#x22EB;&#x22EC;&#x22ED;&#x22EE;&#x22EF;&#x22F0;&#x22F1;&#x22F2;&#x22F3;&#x22F4;&#x22F5;\',\n          \'&#x22F6;&#x22F7;&#x22F8;&#x22F9;&#x22FA;&#x22FB;&#x22FC;&#x22FD;&#x22FE;&#x22FF;&#x2305;&#x2306;\',\n          \'&#x2308;&#x2309;&#x230A;&#x230B;&#x231C;&#x231D;&#x231E;&#x231F;&#x2322;&#x2323;&#x2329;&#x232A;\',\n          \'&#x233D;&#x233F;&#x23B0;&#x23B1;&#x23DC;&#x23DD;&#x23DE;&#x23DF;&#x23E0;&#x2502;&#x251C;&#x2524;\',\n          \'&#x252C;&#x2534;&#x2581;&#x2588;&#x2592;&#x25A0;&#x25A1;&#x25AD;&#x25B2;&#x25B3;&#x25B4;&#x25B5;\',\n          \'&#x25B6;&#x25B7;&#x25B8;&#x25B9;&#x25BC;&#x25BD;&#x25BE;&#x25BF;&#x25C0;&#x25C1;&#x25C2;&#x25C3;\',\n          \'&#x25C4;&#x25C5;&#x25CA;&#x25CB;&#x25E6;&#x25EB;&#x25EC;&#x25F8;&#x25F9;&#x25FA;&#x25FB;&#x25FC;\',\n          \'&#x25FD;&#x25FE;&#x25FF;&#x2605;&#x2606;&#x2772;&#x2773;&#x27D1;&#x27D2;&#x27D3;&#x27D4;&#x27D5;\',\n          \'&#x27D6;&#x27D7;&#x27D8;&#x27D9;&#x27DA;&#x27DB;&#x27DC;&#x27DD;&#x27DE;&#x27DF;&#x27E0;&#x27E1;\',\n          \'&#x27E2;&#x27E3;&#x27E4;&#x27E5;&#x27E6;&#x27E7;&#x27E8;&#x27E9;&#x27EA;&#x27EB;&#x27F0;&#x27F1;\',\n          \'&#x27F2;&#x27F3;&#x27F4;&#x27F5;&#x27F6;&#x27F7;&#x27F8;&#x27F9;&#x27FA;&#x27FB;&#x27FC;&#x27FD;\',\n          \'&#x27FE;&#x27FF;&#x2900;&#x2901;&#x2902;&#x2903;&#x2904;&#x2905;&#x2906;&#x2907;&#x2908;&#x2909;\',\n          \'&#x290A;&#x290B;&#x290C;&#x290D;&#x290E;&#x290F;&#x2910;&#x2911;&#x2912;&#x2913;&#x2914;&#x2915;\',\n          \'&#x2916;&#x2917;&#x2918;&#x2919;&#x291A;&#x291B;&#x291C;&#x291D;&#x291E;&#x291F;&#x2920;&#x2921;\',\n          \'&#x2922;&#x2923;&#x2924;&#x2925;&#x2926;&#x2927;&#x2928;&#x2929;&#x292A;&#x292B;&#x292C;&#x292D;\',\n          \'&#x292E;&#x292F;&#x2930;&#x2931;&#x2932;&#x2933;&#x2934;&#x2935;&#x2936;&#x2937;&#x2938;&#x2939;\',\n          \'&#x293A;&#x293B;&#x293C;&#x293D;&#x293E;&#x293F;&#x2940;&#x2941;&#x2942;&#x2943;&#x2944;&#x2945;\',\n          \'&#x2946;&#x2947;&#x2948;&#x2949;&#x294A;&#x294B;&#x294C;&#x294D;&#x294E;&#x294F;&#x2950;&#x2951;\',\n          \'&#x2952;&#x2953;&#x2954;&#x2955;&#x2956;&#x2957;&#x2958;&#x2959;&#x295A;&#x295B;&#x295C;&#x295D;\',\n          \'&#x295E;&#x295F;&#x2960;&#x2961;&#x2962;&#x2963;&#x2964;&#x2965;&#x2966;&#x2967;&#x2968;&#x2969;\',\n          \'&#x296A;&#x296B;&#x296C;&#x296D;&#x296E;&#x296F;&#x2970;&#x2971;&#x2972;&#x2973;&#x2974;&#x2975;\',\n          \'&#x2976;&#x2977;&#x2978;&#x2979;&#x297A;&#x297B;&#x297C;&#x297D;&#x297E;&#x297F;&#x2980;&#x2982;\',\n          \'&#x2983;&#x2984;&#x2985;&#x2986;&#x2987;&#x2988;&#x2989;&#x298A;&#x298B;&#x298C;&#x298D;&#x298E;\',\n          \'&#x298F;&#x2990;&#x2991;&#x2992;&#x2993;&#x2994;&#x2995;&#x2996;&#x2997;&#x2998;&#x2999;&#x299A;\',\n          \'&#x29B6;&#x29B7;&#x29B8;&#x29B9;&#x29C0;&#x29C1;&#x29C4;&#x29C5;&#x29C6;&#x29C7;&#x29C8;&#x29CE;\',\n          \'&#x29CF;&#x29D0;&#x29D1;&#x29D2;&#x29D3;&#x29D4;&#x29D5;&#x29D6;&#x29D7;&#x29D8;&#x29D9;&#x29DA;\',\n          \'&#x29DB;&#x29DF;&#x29E1;&#x29E2;&#x29E3;&#x29E4;&#x29E5;&#x29E6;&#x29EB;&#x29F4;&#x29F5;&#x29F6;\',\n          \'&#x29F7;&#x29F8;&#x29F9;&#x29FA;&#x29FB;&#x29FC;&#x29FD;&#x29FE;&#x29FF;&#x2A00;&#x2A01;&#x2A02;\',\n          \'&#x2A03;&#x2A04;&#x2A05;&#x2A06;&#x2A07;&#x2A08;&#x2A09;&#x2A0A;&#x2A0B;&#x2A0C;&#x2A0D;&#x2A0E;\',\n          \'&#x2A0F;&#x2A10;&#x2A11;&#x2A12;&#x2A13;&#x2A14;&#x2A15;&#x2A16;&#x2A17;&#x2A18;&#x2A19;&#x2A1A;\',\n          \'&#x2A1B;&#x2A1C;&#x2A1D;&#x2A1E;&#x2A1F;&#x2A20;&#x2A21;&#x2A22;&#x2A23;&#x2A24;&#x2A25;&#x2A26;\',\n          \'&#x2A27;&#x2A28;&#x2A29;&#x2A2A;&#x2A2B;&#x2A2C;&#x2A2D;&#x2A2E;&#x2A2F;&#x2A30;&#x2A31;&#x2A32;\',\n          \'&#x2A33;&#x2A34;&#x2A35;&#x2A36;&#x2A37;&#x2A38;&#x2A39;&#x2A3A;&#x2A3B;&#x2A3C;&#x2A3D;&#x2A3E;\',\n          \'&#x2A3F;&#x2A40;&#x2A41;&#x2A42;&#x2A43;&#x2A44;&#x2A45;&#x2A46;&#x2A47;&#x2A48;&#x2A49;&#x2A4A;\',\n          \'&#x2A4B;&#x2A4C;&#x2A4D;&#x2A4E;&#x2A4F;&#x2A50;&#x2A51;&#x2A52;&#x2A53;&#x2A54;&#x2A55;&#x2A56;\',\n          \'&#x2A57;&#x2A58;&#x2A59;&#x2A5A;&#x2A5B;&#x2A5C;&#x2A5D;&#x2A5E;&#x2A5F;&#x2A60;&#x2A61;&#x2A62;\',\n          \'&#x2A63;&#x2A64;&#x2A65;&#x2A66;&#x2A67;&#x2A68;&#x2A69;&#x2A6A;&#x2A6B;&#x2A6C;&#x2A6D;&#x2A6E;\',\n          \'&#x2A6F;&#x2A70;&#x2A71;&#x2A72;&#x2A73;&#x2A74;&#x2A75;&#x2A76;&#x2A77;&#x2A78;&#x2A79;&#x2A7A;\',\n          \'&#x2A7B;&#x2A7C;&#x2A7D;&#x2A7E;&#x2A7F;&#x2A80;&#x2A81;&#x2A82;&#x2A83;&#x2A84;&#x2A85;&#x2A86;\',\n          \'&#x2A87;&#x2A88;&#x2A89;&#x2A8A;&#x2A8B;&#x2A8C;&#x2A8D;&#x2A8E;&#x2A8F;&#x2A90;&#x2A91;&#x2A92;\',\n          \'&#x2A93;&#x2A94;&#x2A95;&#x2A96;&#x2A97;&#x2A98;&#x2A99;&#x2A9A;&#x2A9B;&#x2A9C;&#x2A9D;&#x2A9E;\',\n          \'&#x2A9F;&#x2AA0;&#x2AA1;&#x2AA2;&#x2AA3;&#x2AA4;&#x2AA5;&#x2AA6;&#x2AA7;&#x2AA8;&#x2AA9;&#x2AAA;\',\n          \'&#x2AAB;&#x2AAC;&#x2AAD;&#x2AAE;&#x2AAF;&#x2AB0;&#x2AB1;&#x2AB2;&#x2AB3;&#x2AB4;&#x2AB5;&#x2AB6;\',\n          \'&#x2AB7;&#x2AB8;&#x2AB9;&#x2ABA;&#x2ABB;&#x2ABC;&#x2ABD;&#x2ABE;&#x2ABF;&#x2AC0;&#x2AC1;&#x2AC2;\',\n          \'&#x2AC3;&#x2AC4;&#x2AC5;&#x2AC6;&#x2AC7;&#x2AC8;&#x2AC9;&#x2ACA;&#x2ACB;&#x2ACC;&#x2ACD;&#x2ACE;\',\n          \'&#x2ACF;&#x2AD0;&#x2AD1;&#x2AD2;&#x2AD3;&#x2AD4;&#x2AD5;&#x2AD6;&#x2AD7;&#x2AD8;&#x2AD9;&#x2ADA;\',\n          \'&#x2ADB;&#x2ADC;&#x2ADD;&#x2ADE;&#x2ADF;&#x2AE0;&#x2AE2;&#x2AE3;&#x2AE4;&#x2AE5;&#x2AE6;&#x2AE7;\',\n          \'&#x2AE8;&#x2AE9;&#x2AEA;&#x2AEB;&#x2AEC;&#x2AED;&#x2AEE;&#x2AEF;&#x2AF0;&#x2AF2;&#x2AF3;&#x2AF4;\',\n          \'&#x2AF5;&#x2AF6;&#x2AF7;&#x2AF8;&#x2AF9;&#x2AFA;&#x2AFB;&#x2AFC;&#x2AFD;&#x2AFE;&#x2AFF;&#x2B04;\',\n          \'&#x2B06;&#x2B07;&#x2B0C;&#x2B0D;&#x3014;&#x3015;&#x3016;&#x3017;&#x3018;&#x3019;&#xFF01;&#xFF06;\',\n          \'&#xFF08;&#xFF09;&#xFF0B;&#xFF0C;&#xFF0D;&#xFF0E;&#xFF0F;&#xFF1A;&#xFF1B;&#xFF1C;&#xFF1D;&#xFF1E;\',\n          \'&#xFF1F;&#xFF20;&#xFF3B;&#xFF3C;&#xFF3D;&#xFF3E;&#xFF3F;&#xFF5B;&#xFF5C;&#xFF5D;\')" />\n\n  \x3c!-- A string of \'-\'s repeated exactly as many times as the operators above --\x3e\n  <xsl:variable name="sMinuses">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sOperators)" />\n      <xsl:with-param name="ch" select="\'-\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- Every single unicode character that is recognized by OMML as a number --\x3e\n  <xsl:variable name="sNumbers" select="\'0123456789\'" />\n\n  \x3c!-- A string of \'0\'s repeated exactly as many times as the list of numbers above --\x3e\n  <xsl:variable name="sZeros">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sNumbers)" />\n      <xsl:with-param name="ch" select="\'0\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- %%Template: SReplace\n\n\t\tReplace all occurences of sOrig in sInput with sReplacement\n\t\tand return the resulting string. --\x3e\n  <xsl:template name="SReplace">\n    <xsl:param name="sInput" />\n    <xsl:param name="sOrig" />\n    <xsl:param name="sReplacement" />\n\n    <xsl:choose>\n      <xsl:when test="not(contains($sInput, $sOrig))">\n        <xsl:value-of select="$sInput" />\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="sBefore" select="substring-before($sInput, $sOrig)" />\n        <xsl:variable name="sAfter" select="substring-after($sInput, $sOrig)" />\n        <xsl:variable name="sAfterProcessed">\n          <xsl:call-template name="SReplace">\n            <xsl:with-param name="sInput" select="$sAfter" />\n            <xsl:with-param name="sOrig" select="$sOrig" />\n            <xsl:with-param name="sReplacement" select="$sReplacement" />\n          </xsl:call-template>\n        </xsl:variable>\n\n        <xsl:value-of select="concat($sBefore, concat($sReplacement, $sAfterProcessed))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Templates --\x3e\n  <xsl:template match="/">\n    <mml:math>\n      <xsl:apply-templates select="*" />\n    </mml:math>\n  </xsl:template>\n\n  <xsl:template match="m:borderBox">\n\n    \x3c!-- Get Lowercase versions of properties --\x3e\n    <xsl:variable name="sLowerCaseHideTop" select="translate(m:borderBoxPr[last()]/m:hideTop[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideBot" select="translate(m:borderBoxPr[last()]/m:hideBot[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideLeft" select="translate(m:borderBoxPr[last()]/m:hideLeft[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideRight" select="translate(m:borderBoxPr[last()]/m:hideRight[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeH" select="translate(m:borderBoxPr[last()]/m:strikeH[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeV" select="translate(m:borderBoxPr[last()]/m:strikeV[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeBLTR" select="translate(m:borderBoxPr[last()]/m:strikeBLTR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeTLBR" select="translate(m:borderBoxPr[last()]/m:strikeTLBR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="fHideTop">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideTop" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideBot">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideBot" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideLeft">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideLeft" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideRight">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideRight" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeH">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeH" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeV">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeV" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeBLTR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeBLTR" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeTLBR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeTLBR" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fHideTop=1\n                      and $fHideBot=1\n                      and $fHideLeft=1\n                      and $fHideRight=1\n                      and $fStrikeH=0\n                      and $fStrikeV=0\n                      and $fStrikeBLTR=0\n                      and $fStrikeTLBR=0">\n        <mml:mrow>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:menclose>\n          <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n            <xsl:with-param name="fHideTop" select="$fHideTop" />\n            <xsl:with-param name="fHideBot" select="$fHideBot" />\n            <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n            <xsl:with-param name="fHideRight" select="$fHideRight" />\n            <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n            <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n            <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n            <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n          </xsl:call-template>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:menclose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="*">\n    <xsl:apply-templates select="*" />\n  </xsl:template>\n\n  \x3c!--\n      { Non-combining, Upper-combining, Lower-combining }\n      {U+02D8, U+0306, U+032E}, // BREVE\n      {U+00B8, U+0312, U+0327}, // CEDILLA\n      {U+0060, U+0300, U+0316}, // GRAVE ACCENT\n      {U+002D, U+0305, U+0332}, // HYPHEN-MINUS/OVERLINE\n      {U+2212, U+0305, U+0332}, // MINUS SIGN/OVERLINE\n      {U+002E, U+0305, U+0323}, // FULL STOP/DOT ABOVE\n      {U+02D9, U+0307, U+0323}, // DOT ABOVE\n      {U+02DD, U+030B, U+02DD}, // DOUBLE ACUTE ACCENT\n      {U+00B4, U+0301, U+0317}, // ACUTE ACCENT\n      {U+007E, U+0303, U+0330}, // TILDE\n      {U+02DC, U+0303, U+0330}, // SMALL TILDE\n      {U+00A8, U+0308, U+0324}, // DIAERESIS\n      {U+02C7, U+030C, U+032C}, // CARON\n      {U+005E, U+0302, U+032D}, // CIRCUMFLEX ACCENT\n      {U+00AF, U+0305, ::::::}, // MACRON\n      {U+005F, ::::::, U+0332}, // LOW LINE\n      {U+2192, U+20D7, U+20EF}, // RIGHTWARDS ARROW\n      {U+27F6, U+20D7, U+20EF}, // LONG RIGHTWARDS ARROW\n      {U+2190, U+20D6, U+20EE}, // LEFT ARROW\n  --\x3e\n  <xsl:template name="ToNonCombining">\n    <xsl:param name="ch" />\n    <xsl:choose>\n      \x3c!-- BREVE --\x3e\n      <xsl:when test="$ch=\'&#x0306;\' or $ch=\'&#x032e;\'">&#x02D8;</xsl:when>\n      \x3c!-- CEDILLA --\x3e\n      <xsl:when test="$ch=\'&#x0312;\' or $ch=\'&#x0327;\'">&#x00B8;</xsl:when>\n      \x3c!-- GRAVE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0300;\' or $ch=\'&#x0316;\'">&#x0060;</xsl:when>\n      \x3c!-- HYPHEN-MINUS/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x002D;</xsl:when>\n      \x3c!-- MINUS SIGN/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x2212;</xsl:when>\n      \x3c!-- FULL STOP/DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0323;\'">&#x002E;</xsl:when>\n      \x3c!-- DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0307;\' or $ch=\'&#x0323;\'">&#x02D9;</xsl:when>\n      \x3c!-- DOUBLE ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x030B;\' or $ch=\'&#x02DD;\'">&#x02DD;</xsl:when>\n      \x3c!-- ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0301;\' or $ch=\'&#x0317;\'">&#x00B4;</xsl:when>\n      \x3c!-- TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x007E;</xsl:when>\n      \x3c!-- SMALL TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x02DC;</xsl:when>\n      \x3c!-- DIAERESIS --\x3e\n      <xsl:when test="$ch=\'&#x0308;\' or $ch=\'&#x0324;\'">&#x00A8;</xsl:when>\n      \x3c!-- CARON --\x3e\n      <xsl:when test="$ch=\'&#x030C;\' or $ch=\'&#x032C;\'">&#x02C7;</xsl:when>\n      \x3c!-- CIRCUMFLEX ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0302;\' or $ch=\'&#x032D;\'">&#x005E;</xsl:when>\n      \x3c!-- MACRON --\x3e\n      <xsl:when test="$ch=\'&#x0305;\'                   ">&#x00AF;</xsl:when>\n      \x3c!-- LOW LINE --\x3e\n      <xsl:when test="                   $ch=\'&#x0332;\'">&#x005F;</xsl:when>\n      \x3c!-- RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x2192;</xsl:when>\n      \x3c!-- LONG RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x27F6;</xsl:when>\n      \x3c!-- LEFT ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D6;\' or $ch=\'&#x20EE;\'">&#x2190;</xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$ch"/>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:acc">\n    <mml:mover>\n      <xsl:attribute name="accent">true</xsl:attribute>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <xsl:variable name="chAcc">\n        <xsl:choose>\n          <xsl:when test="not(m:accPr[last()]/m:chr)">\n            <xsl:value-of select="\'&#x0302;\'" />\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:value-of select="substring(m:accPr/m:chr/@m:val,1,1)" />\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="chNonComb">\n        <xsl:call-template name="ToNonCombining">\n          <xsl:with-param name="ch" select="$chAcc" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:choose>\n        <xsl:when test="string-length($chAcc)=0">\n          <mml:mo/>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="$chNonComb" />\n            <xsl:with-param name="scr" select="m:e[1]/*/m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="m:e[1]/*/m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">\n              <xsl:choose>\n                <xsl:when test="count(m:e[1]/*/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n                <xsl:otherwise>\n                  <xsl:call-template name="ForceFalseStrVal">\n                    <xsl:with-param name="str" select="translate(m:e[1]/*/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                  </xsl:call-template>\n                </xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template name="OutputScript">\n    <xsl:param name="ndCur" select="." />\n    <xsl:choose>\n      \x3c!-- Only output contents of $ndCur if $ndCur exists\n           and $ndCur has children --\x3e\n      <xsl:when test="count($ndCur/*) &gt; 0">\n        <mml:mrow>\n          <xsl:apply-templates select="$ndCur" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:none />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:sPre">\n    <mml:mmultiscripts>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mprescripts />\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sub[1]"/>\n      </xsl:call-template>\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sup[1]" />\n      </xsl:call-template>\n    </mml:mmultiscripts>\n  </xsl:template>\n\n  <xsl:template match="m:m">\n    <mml:mtable>\n      <xsl:call-template name="CreateMathMLMatrixAttr">\n        <xsl:with-param name="mcJc" select="m:mPr[last()]/m:mcs/m:mc/m:mcPr[last()]/m:mcJc/@m:val" />\n      </xsl:call-template>\n      <xsl:for-each select="m:mr">\n        <mml:mtr>\n          <xsl:for-each select="m:e">\n            <mml:mtd>\n              <xsl:apply-templates select="." />\n            </mml:mtd>\n          </xsl:for-each>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateMathMLMatrixAttr">\n    <xsl:param name="mcJc" />\n    <xsl:variable name="sLowerCaseMcjc" select="translate($mcJc, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseMcjc=\'left\'">\n        <xsl:attribute name="columnalign">left</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="$sLowerCaseMcjc=\'right\'">\n        <xsl:attribute name="columnalign">right</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:phant">\n    <xsl:variable name="sLowerCaseZeroWidVal" select="translate(m:phantPr[last()]/m:zeroWid[last()]/@m:val,\n\t\t                                                       \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroAscVal" select="translate(m:phantPr[last()]/m:zeroAsc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroDescVal" select="translate(m:phantPr[last()]/m:zeroDesc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseShowVal" select="translate(m:phantPr[last()]/m:show[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n\n    \x3c!-- The following properties default to \'yes\' unless the last value equals \'no\' or there isn\'t any node for\n         the property --\x3e\n\n    <xsl:variable name="fZeroWid">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroWid[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroWidVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroAsc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroAsc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroAscVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroDesc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroDesc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroDescVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    \x3c!-- The show property defaults to \'on\' unless there exists a show property and its value is \'off\' --\x3e\n\n    <xsl:variable name="fShow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseShowVal" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      \x3c!-- Show the phantom contents, therefore, just use mpadded. --\x3e\n      <xsl:when test="$fShow = 1">\n        <xsl:element name="mml:mpadded">\n          <xsl:call-template name="CreateMpaddedAttributes">\n            <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n            <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n            <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Don\'t show phantom contents, but don\'t smash anything, therefore, just\n           use mphantom --\x3e\n      <xsl:when test="$fZeroWid=0 and $fZeroAsc=0 and $fZeroDesc=0">\n        <xsl:element name="mml:mphantom">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Combination --\x3e\n      <xsl:otherwise>\n        <xsl:element name="mml:mphantom">\n          <xsl:element name="mml:mpadded">\n            <xsl:call-template name="CreateMpaddedAttributes">\n              <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n              <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n              <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n            </xsl:call-template>\n            <mml:mrow>\n              <xsl:apply-templates select="m:e" />\n            </mml:mrow>\n          </xsl:element>\n        </xsl:element>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="CreateMpaddedAttributes">\n    <xsl:param name="fZeroWid" />\n    <xsl:param name="fZeroAsc" />\n    <xsl:param name="fZeroDesc" />\n\n    <xsl:if test="$fZeroWid=1">\n      <xsl:attribute name="width">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroAsc=1">\n      <xsl:attribute name="height">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroDesc=1">\n      <xsl:attribute name="depth">0in</xsl:attribute>\n    </xsl:if>\n  </xsl:template>\n\n\n\n  <xsl:template match="m:rad">\n    <xsl:variable name="fDegHide">\n      <xsl:choose>\n        <xsl:when test="count(m:radPr[last()]/m:degHide)=0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(m:radPr[last()]/m:degHide/@m:val,\n\t\t                                                          \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                          \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fDegHide=1">\n        <mml:msqrt>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:msqrt>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mroot>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:deg[1]" />\n          </mml:mrow>\n        </mml:mroot>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="OutputNaryMo">\n    <xsl:param name="ndCur" select="." />\n    <xsl:param name="fGrow" select="0" />\n    <mml:mo>\n      <xsl:choose>\n        <xsl:when test="$fGrow=1">\n          <xsl:attribute name="stretchy">true</xsl:attribute>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:attribute name="stretchy">false</xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n      <xsl:choose>\n        <xsl:when test="not($ndCur/m:naryPr[last()]/m:chr/@m:val) or\n\t\t\t                            $ndCur/m:naryPr[last()]/m:chr/@m:val=\'\'">\n          <xsl:text>&#x222b;</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="$ndCur/m:naryPr[last()]/m:chr/@m:val" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mo>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:nary\n\t\tProcess an n-ary.\n\n\t\tDecides, based on which arguments are supplied, between\n\t\tusing an mo, msup, msub, or msubsup for the n-ary operator\n\t--\x3e\n  <xsl:template match="m:nary">\n    <xsl:variable name="sLowerCaseSubHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:subHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:subHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseSupHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:supHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:supHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseLimLoc">\n      <xsl:value-of select="translate(m:naryPr[last()]/m:limLoc/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n    </xsl:variable>\n\n    <xsl:variable name="sLowerGrow">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:grow)=0">off</xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:grow/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fLimLocSubSup">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:limLoc)=0 or $sLowerCaseLimLoc=\'subsup\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fGrow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerGrow" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSupHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSupHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSubHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSubHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <mml:mrow>\n      <xsl:choose>\n        <xsl:when test="$fSupHide=1 and $fSubHide=1">\n          <xsl:call-template name="OutputNaryMo">\n            <xsl:with-param name="ndCur" select="." />\n            <xsl:with-param name="fGrow" select="$fGrow" />\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:when test="$fSubHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:mover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:mover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:when test="$fSupHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msub>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:msub>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munder>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:munder>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msubsup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msubsup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munderover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:munderover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  <xsl:template match="m:limLow">\n    <mml:munder>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:munder>\n  </xsl:template>\n\n  <xsl:template match="m:limUpp">\n    <mml:mover>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template match="m:sSub">\n    <mml:msub>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n    </mml:msub>\n  </xsl:template>\n\n  <xsl:template match="m:sSup">\n    <mml:msup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msup>\n  </xsl:template>\n\n  <xsl:template match="m:sSubSup">\n    <mml:msubsup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msubsup>\n  </xsl:template>\n\n  <xsl:template match="m:groupChr">\n    <xsl:variable name="ndLastGroupChrPr" select="m:groupChrPr[last()]" />\n    <xsl:variable name="sLowerCasePos" select="translate($ndLastGroupChrPr/m:pos/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="sLowerCaseVertJc" select="translate($ndLastGroupChrPr/m:vertJc/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="ndLastChr" select="$ndLastGroupChrPr/m:chr" />\n\n    <xsl:variable name="chr">\n      <xsl:choose>\n        <xsl:when test="$ndLastChr and (not($ndLastChr/@m:val) or string-length($ndLastChr/@m:val) = 0)"></xsl:when>\n        <xsl:when test="string-length($ndLastChr/@m:val) &gt;= 1">\n          <xsl:value-of select="substring($ndLastChr/@m:val,1,1)" />\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:text>&#x023DF;</xsl:text>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$sLowerCasePos = \'top\'">\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="fName">\n    <xsl:for-each select="m:fName/*">\n      <xsl:apply-templates select="." />\n    </xsl:for-each>\n  </xsl:template>\n\n  <xsl:template match="m:func">\n    <mml:mrow>\n      <mml:mrow>\n        <xsl:call-template name="fName" />\n      </mml:mrow>\n      <mml:mo>&#x02061;</mml:mo>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:f\n\n\t\tm:f maps directly to mfrac.\n\t--\x3e\n  <xsl:template match="m:f">\n    <xsl:variable name="sLowerCaseType" select="translate(m:fPr[last()]/m:type/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseType=\'lin\'">\n        <mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mo>/</mml:mo>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mfrac>\n          <xsl:call-template name="CreateMathMLFracProp">\n            <xsl:with-param name="type" select="$sLowerCaseType" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mfrac>\n      </xsl:otherwise>\n    </xsl:choose>\n\n  </xsl:template>\n\n\n  \x3c!-- %%Template: CreateMathMLFracProp\n\n\t\t\tMake fraction properties based on supplied parameters.\n\t\t\tOMML differentiates between a linear fraction and a skewed\n\t\t\tone. For MathML, we write both as bevelled.\n\t--\x3e\n  <xsl:template name="CreateMathMLFracProp">\n    <xsl:param name="type" />\n    <xsl:variable name="sLowerCaseType" select="translate($type, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:if test="$sLowerCaseType=\'skw\' or $sLowerCaseType=\'lin\'">\n      <xsl:attribute name="bevelled">true</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$sLowerCaseType=\'nobar\'">\n      <xsl:attribute name="linethickness">0pt</xsl:attribute>\n    </xsl:if>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseNumJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseNumJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseDenJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseDenJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:e | m:den | m:num | m:lim | m:sup | m:sub\n\n\t\tThese element delinate parts of an expression (like the numerator).  --\x3e\n  <xsl:template match="m:e | m:den | m:num | m:lim | m:sup | m:sub">\n    <xsl:choose>\n\n      \x3c!-- If there is no scriptLevel specified, just call through --\x3e\n      <xsl:when test="not(m:argPr[last()]/m:scrLvl/@m:val)">\n        <xsl:apply-templates select="*" />\n      </xsl:when>\n\n      \x3c!-- Otherwise, create an mstyle and set the script level --\x3e\n      <xsl:otherwise>\n        <mml:mstyle>\n          <xsl:attribute name="scriptlevel">\n            <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n          </xsl:attribute>\n          <xsl:apply-templates select="*" />\n        </mml:mstyle>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:bar">\n    <xsl:variable name="sLowerCasePos" select="translate(m:barPr/m:pos/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="fTop">\n\n      <xsl:choose>\n        <xsl:when test="$sLowerCasePos=\'top\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fTop=1">\n        <mml:mover accent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x00AF;</xsl:text>\n          </mml:mo>\n        </mml:mover>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:munder underaccent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x005F;</xsl:text>\n          </mml:mo>\n        </mml:munder>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:d\n\n\t\tProcess a delimiter.\n\t--\x3e\n  <xsl:template match="m:d">\n    <mml:mfenced>\n      \x3c!-- open: default is \'(\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:begChr/@m:val and not(m:dPr[1]/m:begChr/@m:val =\'(\')">\n        <xsl:attribute name="open">\n          <xsl:value-of select="m:dPr[1]/m:begChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- close: default is \')\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:endChr/@m:val and not(m:dPr[1]/m:endChr/@m:val =\')\')">\n        <xsl:attribute name="close">\n          <xsl:value-of select="m:dPr[1]/m:endChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- separator: the default is \',\' for MathML, and \'|\' for OMML --\x3e\n      <xsl:choose>\n        \x3c!-- Matches MathML default. Write nothing --\x3e\n        <xsl:when test="m:dPr[1]/m:sepChr/@m:val = \',\'" />\n\n        \x3c!-- OMML default: | --\x3e\n        <xsl:when test="not(m:dPr[1]/m:sepChr/@m:val)">\n          <xsl:attribute name="separators">\n            <xsl:value-of select="\'|\'" />\n          </xsl:attribute>\n        </xsl:when>\n\n        <xsl:otherwise>\n          <xsl:attribute name="separators">\n            <xsl:value-of select="m:dPr[1]/m:sepChr/@m:val" />\n          </xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n\n      \x3c!-- now write all the children. Put each one into an mrow\n\t\t\tjust in case it produces multiple runs, etc --\x3e\n      <xsl:for-each select="m:e">\n        <mml:mrow>\n          <xsl:apply-templates select="." />\n        </mml:mrow>\n      </xsl:for-each>\n    </mml:mfenced>\n  </xsl:template>\n\n  <xsl:template match="m:r">\n    <xsl:variable name="fNor">\n      <xsl:choose>\n        <xsl:when test="count(child::m:rPr[last()]/m:nor) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(child::m:rPr[last()]/m:nor/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fNor=1">\n        <mml:mtext>\n          <xsl:variable name="sOutput" select="translate(.//m:t, \' \', \'&#xa0;\')" />\n          <xsl:value-of select="$sOutput" />\n        </mml:mtext>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:for-each select=".//m:t">\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="text()" />\n            <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">0</xsl:with-param>\n          </xsl:call-template>\n        </xsl:for-each>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  <xsl:template name="CreateTokenAttributes">\n    <xsl:param name="scr" />\n    <xsl:param name="sty" />\n    <xsl:param name="nor" />\n    <xsl:param name="nCharToPrint" />\n    <xsl:param name="sTokenType" />\n\n    <xsl:choose>\n      <xsl:when test="$nor=1">\n        <xsl:attribute name="mathvariant">normal</xsl:attribute>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="mathvariant">\n          <xsl:choose>\n            \x3c!-- numbers don\'t care --\x3e\n            <xsl:when test="$sTokenType=\'mn\'" />\n\n            <xsl:when test="$scr=\'monospace\'">monospace</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'i\'">sans-serif-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'b\'">bold-sans-serif</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'bi\'">sans-serif-bold-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\'">sans-serif</xsl:when>\n            <xsl:when test="$scr=\'fraktur\' and ($sty=\'b\' or $sty=\'bi\')">bold-fraktur</xsl:when>\n            <xsl:when test="$scr=\'fraktur\'">fraktur</xsl:when>\n            <xsl:when test="$scr=\'double-struck\'">double-struck</xsl:when>\n            <xsl:when test="$scr=\'script\' and ($sty=\'b\' or $sty=\'bi\')">bold-script</xsl:when>\n            <xsl:when test="$scr=\'script\'">script</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'b\'">bold</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'i\'">italic</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'p\'">normal</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'bi\'">bold-italic</xsl:when>\n            <xsl:otherwise />\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontweight">\n          <xsl:choose>\n            <xsl:when test="$sty=\'b\' or $sty=\'bi\'">bold</xsl:when>\n            <xsl:otherwise>normal</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontstyle">\n          <xsl:choose>\n            <xsl:when test="$sty=\'p\' or $sty=\'b\'">normal</xsl:when>\n            <xsl:otherwise>italic</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n\n        \x3c!-- Writing of attributes begins here --\x3e\n        <xsl:choose>\n          \x3c!-- Don\'t write mathvariant for operators unless they want to be normal --\x3e\n          <xsl:when test="$sTokenType=\'mo\' and $mathvariant!=\'normal\'" />\n\n          \x3c!-- A single character within an mi is already italics, don\'t write --\x3e\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint=1 and ($mathvariant=\'\' or $mathvariant=\'italic\')" />\n\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint &gt; 1 and ($mathvariant=\'\' or $mathvariant=\'italic\')">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="\'italic\'" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:when test="$mathvariant!=\'italic\' and $mathvariant!=\'\'">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="$mathvariant" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:if test="not($sTokenType=\'mi\' and $nCharToPrint=1) and $fontstyle=\'italic\'">\n              <xsl:attribute name="fontstyle">italic</xsl:attribute>\n            </xsl:if>\n            <xsl:if test="$fontweight=\'bold\'">\n              <xsl:attribute name="fontweight">bold</xsl:attribute>\n            </xsl:if>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:eqArr">\n    <mml:mtable>\n      <xsl:for-each select="m:e">\n        <mml:mtr>\n          <mml:mtd>\n            <xsl:choose>\n              <xsl:when test="m:argPr[last()]/m:scrLvl/@m:val!=\'0\' or\n\t\t\t\t\t            not(m:argPr[last()]/m:scrLvl/@m:val)  or\n\t\t\t\t\t            m:argPr[last()]/m:scrLvl/@m:val=\'\'">\n                <mml:mrow>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mrow>\n              </xsl:when>\n              <xsl:otherwise>\n                <mml:mstyle>\n                  <xsl:attribute name="scriptlevel">\n                    <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n                  </xsl:attribute>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mstyle>\n              </xsl:otherwise>\n            </xsl:choose>\n          </mml:mtd>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateEqArrRow">\n    <xsl:param name="align" />\n    <xsl:param name="ndCur" />\n    <xsl:variable name="sAllMt">\n      <xsl:for-each select="$ndCur/m:t">\n        <xsl:value-of select="." />\n      </xsl:for-each>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$ndCur/self::m:r">\n        <xsl:call-template name="ParseEqArrMr">\n          <xsl:with-param name="sToParse" select="$sAllMt" />\n          <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n          <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n          <xsl:with-param name="nor">\n            <xsl:choose>\n              <xsl:when test="count($ndCur/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="ForceFalseStrVal">\n                  <xsl:with-param name="str" select="translate($ndCur/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:with-param>\n          <xsl:with-param name="align" select="$align" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:apply-templates select="$ndCur" />\n      </xsl:otherwise>\n    </xsl:choose>\n    <xsl:if test="count($ndCur/following-sibling::*) &gt; 0">\n      <xsl:variable name="cAmp">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="$sAllMt" />\n          <xsl:with-param name="cAmp" select="0" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:call-template name="CreateEqArrRow">\n        <xsl:with-param name="align" select="($align+($cAmp mod 2)) mod 2" />\n        <xsl:with-param name="ndCur" select="$ndCur/following-sibling::*[1]" />\n      </xsl:call-template>\n    </xsl:if>\n  </xsl:template>\n\n  <xsl:template name="CountAmp">\n    <xsl:param name="sAllMt" />\n    <xsl:param name="cAmp" />\n    <xsl:choose>\n      <xsl:when test="string-length(substring-after($sAllMt, \'&amp;\')) &gt; 0 or\n\t\t\t                substring($sAllMt, string-length($sAllMt))=\'&#x0026;\'">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="substring-after($sAllMt, \'&#x0026;\')" />\n          <xsl:with-param name="cAmp" select="$cAmp+1" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$cAmp" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseEqArrMr\n\n\t\t\tSimilar to ParseMt, but this one has to do more for an equation array.\n      In equation arrays &amp; is a special character which denotes alignment.\n\n      The &amp; in an equation works by alternating between meaning insert alignment spacing\n      and insert alignment mark.  For each equation in the equation array\n      there is an implied align space at the beginning of the equation.  Within each equation,\n      the first &amp; means alignmark, the second, align space, the third, alignmark, etc.\n\n      For this reason when parsing m:r\'s in equation arrays it is important to keep track of what\n      the next ampersand will mean.\n\n      $align=0 => Omml\'s align space, which is similar to MathML\'s maligngroup.\n      $align=1 => Omml\'s alignment mark, which is similar to MathML\'s malignmark.\n\t--\x3e\n  <xsl:template name="ParseEqArrMr">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:param name="align" />\n\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:choose>\n        <xsl:when test="substring($sToParse,1,1) = \'&amp;\'">\n          <xsl:choose>\n            <xsl:when test="$align=\'0\'">\n              <mml:maligngroup />\n            </xsl:when>\n            <xsl:when test="$align=\'1\'">\n              <mml:malignmark />\n            </xsl:when>\n          </xsl:choose>\n          <xsl:call-template name="ParseEqArrMr">\n            <xsl:with-param name="sToParse" select="substring($sToParse,2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n            <xsl:with-param name="align">\n              <xsl:choose>\n                <xsl:when test="$align=\'1\'">0</xsl:when>\n                <xsl:otherwise>1</xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:variable name="sRepNumWith0">\n            <xsl:call-template name="SReplaceNumWithZero">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n            </xsl:call-template>\n          </xsl:variable>\n          <xsl:variable name="sRepOperWith-">\n            <xsl:call-template name="SReplaceOperWithMinus">\n              <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n\n          <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n          <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n          <xsl:variable name="iFirstAmp" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'&#x0026;\'))" />\n          <xsl:variable name="fNumAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:variable name="fOperAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:choose>\n\n            \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n            <xsl:when test="$fNumAtPos1=\'0\' and $fOperAtPos1=\'0\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mi>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" select="$scr" />\n                      <xsl:with-param name="sty" select="$sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="nCharToPrint" select="1" />\n                      <xsl:with-param name="sTokenType" select="\'mi\'" />\n                    </xsl:call-template>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mi>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case II: There is an operator at position 1 --\x3e\n            <xsl:when test="$fOperAtPos1=\'1\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mo>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mo\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mo>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case III: There is a number at position 1 --\x3e\n            <xsl:otherwise>\n              <xsl:variable name="sConsecNum">\n                <xsl:call-template name="SNumStart">\n                  <xsl:with-param name="sToParse" select="$sToParse" />\n                  <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n                </xsl:call-template>\n              </xsl:variable>\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mn>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" select="\'p\'"/>\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mn\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mn>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseMt\n\n\t\t\tProduce a run of text. Technically, OMML makes no distinction\n\t\t\tbetween numbers, operators, and other characters in a run. For\n\t\t\tMathML we need to break these into mi, mn, or mo elements.\n\n\t\t\tSee also ParseEqArrMr\n\t--\x3e\n  <xsl:template name="ParseMt">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:variable name="sRepNumWith0">\n        <xsl:call-template name="SReplaceNumWithZero">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:variable name="sRepOperWith-">\n        <xsl:call-template name="SReplaceOperWithMinus">\n          <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n        </xsl:call-template>\n      </xsl:variable>\n\n      <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n      <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n      <xsl:variable name="fNumAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="fOperAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n\n      <xsl:choose>\n\n        \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n        <xsl:when test="$fOperAtPos1=\'0\' and $fNumAtPos1=\'0\'">\n          <xsl:variable name="nCharToPrint">\n            <xsl:choose>\n              <xsl:when test="ancestor::m:fName">\n                <xsl:choose>\n                  <xsl:when test="($iFirstOper=$iFirstNum) and\n\t\t\t\t\t\t\t\t\t\t\t($iFirstOper=string-length($sToParse)) and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'0\') and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'-\')">\n                    <xsl:value-of select="string-length($sToParse)" />\n                  </xsl:when>\n                  <xsl:when test="$iFirstOper &lt; $iFirstNum">\n                    <xsl:value-of select="$iFirstOper - 1" />\n                  </xsl:when>\n                  <xsl:otherwise>\n                    <xsl:value-of select="$iFirstNum - 1" />\n                  </xsl:otherwise>\n                </xsl:choose>\n              </xsl:when>\n              <xsl:otherwise>1</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n\n          <mml:mi>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="$sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="nCharToPrint" select="$nCharToPrint" />\n              <xsl:with-param name="sTokenType" select="\'mi\'" />\n            </xsl:call-template>\n            <xsl:variable name="sWrite" select="translate(substring($sToParse, 1, $nCharToPrint), \' \', \'&#xa0;\')" />\n            <xsl:value-of select="$sWrite" />\n          </mml:mi>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, $nCharToPrint+1)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case II: There is an operator at position 1 --\x3e\n        <xsl:when test="$fOperAtPos1=\'1\'">\n          <mml:mo>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" />\n              <xsl:with-param name="sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mo\'" />\n            </xsl:call-template>\n            <xsl:value-of select="substring($sToParse,1,1)" />\n          </mml:mo>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case III: There is a number at position 1 --\x3e\n        <xsl:otherwise>\n          <xsl:variable name="sConsecNum">\n            <xsl:call-template name="SNumStart">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n              <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n          <mml:mn>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="\'p\'" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mn\'" />\n            </xsl:call-template>\n            <xsl:value-of select="$sConsecNum" />\n          </mml:mn>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: SNumStart\n\n\t\tReturn the longest substring of sToParse starting from the\n\t\tstart of sToParse that is a number. In addition, it takes the\n\t\tpattern string, which is sToParse with all of its numbers\n\t\treplaced with a 0. sPattern should be the same length\n\t\tas sToParse\n\t--\x3e\n  <xsl:template name="SNumStart">\n    <xsl:param name="sToParse" select="\'\'" />\n    \x3c!-- if we don\'t get anything, take the string itself --\x3e\n    <xsl:param name="sPattern" select="\'$sToParse\'" />\n\n\n    <xsl:choose>\n      \x3c!-- the pattern says this is a number, recurse with the rest --\x3e\n      <xsl:when test="substring($sPattern, 1, 1) = \'0\'">\n        <xsl:call-template name="SNumStart">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n          <xsl:with-param name="sPattern" select="substring($sPattern, 2)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      \x3c!-- the pattern says we\'ve run out of numbers. Take as many\n\t\t\t\tcharacters from sToParse as we shaved off sPattern --\x3e\n      <xsl:otherwise>\n        <xsl:value-of select="substring($sToParse, 1, string-length($sToParse) - string-length($sPattern))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template SRepeatCharAcc\n\n\t\t\tThe core of SRepeatChar with an accumulator. The current\n\t\t\tstring is in param $acc, and we will double and recurse,\n\t\t\tif we\'re less than half of the required length or else just\n\t\t\tadd the right amount of characters to the accumulator and\n\t\t\treturn\n\t--\x3e\n  <xsl:template name="SRepeatCharAcc">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n    <xsl:param name="acc" select="$ch" />\n\n    <xsl:variable name="cchAcc" select="string-length($acc)" />\n    <xsl:choose>\n      <xsl:when test="(2 * $cchAcc) &lt; $cchRequired">\n        <xsl:call-template name="SRepeatCharAcc">\n          <xsl:with-param name="cchRequired" select="$cchRequired" />\n          <xsl:with-param name="ch" select="$ch" />\n          <xsl:with-param name="acc" select="concat($acc, $acc)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      <xsl:otherwise>\n        <xsl:value-of select="concat($acc, substring($acc, 1, $cchRequired - $cchAcc))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  \x3c!-- %%Template SRepeatChar\n\n\t\t\tGenerates a string nchRequired long by repeating the given character ch\n\t--\x3e\n  <xsl:template name="SRepeatChar">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n\n    <xsl:call-template name="SRepeatCharAcc">\n      <xsl:with-param name="cchRequired" select="$cchRequired" />\n      <xsl:with-param name="ch" select="$ch" />\n      <xsl:with-param name="acc" select="$ch" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceOperWithMinus\n\n\t\tGo through the given string and replace every instance\n\t\tof an operator with a minus \'-\'. This helps quickly identify\n\t\tthe first instance of an operator.\n\t--\x3e\n  <xsl:template name="SReplaceOperWithMinus">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    <xsl:value-of select="translate($sToParse, $sOperators, $sMinuses)" />\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceNumWithZero\n\n\t\tGo through the given string and replace every instance\n\t\tof an number with a zero \'0\'. This helps quickly identify\n\t\tthe first occurence of a number.\n\n\t\tConsiders the \'.\' and \',\' part of a number iff they are sandwiched\n\t\tbetween two other numbers. 0.3 will be recognized as a number,\n\t\tx.3 will not be. Since these characters can also be an operator, this\n\t\tshould be called before SReplaceOperWithMinus.\n\t--\x3e\n  <xsl:template name="SReplaceNumWithZero">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    \x3c!-- First do a simple replace. Numbers will all be come 0\'s.\n\t\t\tAfter this point, the pattern involving the . or , that\n\t\t\twe are looking for will become 0.0 or 0,0 --\x3e\n    <xsl:variable name="sSimpleReplace" select="translate($sToParse, $sNumbers, $sZeros)" />\n\n    \x3c!-- And then, replace 0.0 with just 000. This means that the . will\n\t\t\tbecome part of the number --\x3e\n    <xsl:variable name="sReplacePeriod">\n      <xsl:call-template name="SReplace">\n        <xsl:with-param name="sInput" select="$sSimpleReplace" />\n        <xsl:with-param name="sOrig" select="\'0.0\'" />\n        <xsl:with-param name="sReplacement" select="\'000\'" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    \x3c!-- And then, replace 0,0 with just 000. This means that the , will\n\t\t\tbecome part of the number --\x3e\n    <xsl:call-template name="SReplace">\n      <xsl:with-param name="sInput" select="$sReplacePeriod" />\n      <xsl:with-param name="sOrig" select="\'0,0\'" />\n      <xsl:with-param name="sReplacement" select="\'000\'" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- Template to translate Word\'s borderBox properties into the menclose notation attribute\n       The initial call to this SHOULD NOT pass an sAttribute.  Subsequent calls to\n       CreateMencloseNotationAttrFromBorderBoxAttr by CreateMencloseNotationAttrFromBorderBoxAttr will\n       update the sAttribute as appropriate.\n\n       CreateMencloseNotationAttrFromBorderBoxAttr looks at each attribute (fHideTop, fHideBot, etc.) one at a time\n       in the order they are listed and passes a modified sAttribute to CreateMencloseNotationAttrFromBorderBoxAttr.\n       Each successive call to CreateMencloseNotationAttrFromBorderBoxAttr knows which attribute to look at because\n       the previous call should have omitted passing the attribute it just analyzed.  This is why as you read lower\n       and lower in the template that each call to CreateMencloseNotationAttrFromBorderBoxAttr has fewer and fewer attributes.\n       --\x3e\n  <xsl:template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n    <xsl:param name="fHideTop" />\n    <xsl:param name="fHideBot" />\n    <xsl:param name="fHideLeft" />\n    <xsl:param name="fHideRight" />\n    <xsl:param name="fStrikeH" />\n    <xsl:param name="fStrikeV" />\n    <xsl:param name="fStrikeBLTR" />\n    <xsl:param name="fStrikeTLBR" />\n    <xsl:param name="sAttribute" />\n\n    <xsl:choose>\n      <xsl:when test="string-length($sAttribute) = 0">\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0\n                      and string-length($fHideBot) &gt; 0\n                      and string-length($fHideLeft) &gt; 0\n                      and string-length($fHideRight) &gt; 0">\n\n            <xsl:choose>\n              <xsl:when test="$fHideTop = 0\n                              and $fHideBot = 0\n                              and $fHideLeft = 0\n                              and $fHideRight = 0">\n                \x3c!-- We can use \'box\' instead of top, bot, left, and right.  Therefore,\n                  replace sAttribute with \'box\' and begin analyzing params fStrikeH\n                  and below. --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:text>box</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                \x3c!-- Can\'t use \'box\', theremore, must analyze all attributes --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideTop" select="$fHideTop" />\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    \x3c!-- Assume using all four (left right top bottom).  Subsequent calls\n                         will remove the sides which aren\'t to be includes. --\x3e\n                    <xsl:text>left right top bottom</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideTop=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'top\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideBot) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideBot=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'bottom\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideLeft) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideLeft=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'left\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideRight) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideRight=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'right\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeH) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeH=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' horizontalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeV) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeV=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' verticalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeBLTR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeBLTR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' updiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeTLBR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeTLBR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' downdiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:attribute name="notation">\n              <xsl:value-of select="normalize-space($sAttribute)" />\n            </xsl:attribute>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Tristate (true, false, neither) from string value --\x3e\n  <xsl:template name="TFromStrVal">\n    <xsl:param name="str" />\n    <xsl:choose>\n      <xsl:when test="$str = \'on\' or $str = \'1\' or $str = \'true\'">1</xsl:when>\n      <xsl:when test="$str = \'off\' or $str = \'0\' or $str = \'false\'">0</xsl:when>\n      <xsl:otherwise>-1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 0 iff $str is explicitly set to a false value.\n       Return true otherwise --\x3e\n  <xsl:template name="ForceFalseStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'0\'">0</xsl:when>\n      <xsl:otherwise>1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 1 iff $str is explicitly set to a true value.\n       Return false otherwise --\x3e\n  <xsl:template name="ForceTrueStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'1\'">1</xsl:when>\n      <xsl:otherwise>0</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n</xsl:stylesheet>\n'.trim());t.xsl=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/math/convertOOML.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/math/convertOOML",(function(e,o,n,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/math/xsl");o.convertOOXML=function(e){var o=new XSLTProcessor;return o.importStylesheet(t.xsl),o.transformToFragment(e,document)}}));
;/*!node_modules/ooxml-viewer/lib/render/renderMath.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderMath",(function(e,n,r,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("node_modules/ooxml-viewer/lib/openxml/math/convertOOML");n.renderOMath=function(e,n){return t.convertOOXML(n.element)}}));
;/*!node_modules/ooxml-viewer/lib/render/renderParagraph.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderParagraph",(function(e,r,n,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/util/dom"),i=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Bookmark"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Hyperlink"),m=e("node_modules/ooxml-viewer/lib/render/renderRun"),s=e("node_modules/ooxml-viewer/lib/render/renderHyperLink"),u=e("node_modules/ooxml-viewer/lib/render/renderBookmark"),p=e("node_modules/ooxml-viewer/lib/render/renderNumbering"),v=e("node_modules/ooxml-viewer/lib/render/setElementStyle"),b=e("node_modules/ooxml-viewer/lib/openxml/math/OMath"),f=e("node_modules/ooxml-viewer/lib/render/renderMath");r.default=function(e,r,n,o){var w,x;void 0===n&&(n=!0),void 0===o&&(o=!1),e.currentParagraph=r;var h=d.createElement("p");e.addClass(h,"p");var _=r.properties;v.setElementStyle(e,h,_),h.style.position="relative",_.numPr&&d.appendChild(h,p.renderNumbering(h,e,_.numPr));var c=!1;try{for(var k=l.__values(r.children),y=k.next();!y.done;y=k.next()){var C=y.value;if(C instanceof i.Run)"begin"===C.fldChar?c=!0:C&&(c=!1),d.appendChild(h,m.default(e,C,r,c,o));else if(C instanceof a.BookmarkStart)d.appendChild(h,u.renderBookmarkStart(e,C));else if(C instanceof t.Hyperlink){var M=s.renderHyperLink(e,C,r);d.appendChild(h,M)}else C instanceof b.OMath?d.appendChild(h,f.renderOMath(e,C)):console.warn("unknow pargraph type",C)}}catch(e){w={error:e}}finally{try{y&&!y.done&&(x=k.return)&&x.call(k)}finally{if(w)throw w.error}}return""===h.innerHTML&&n&&(h.innerHTML="&nbsp;"),h}}));
;/*!node_modules/ooxml-viewer/lib/render/renderHeader.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderHeader",(function(e,r,l,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),a=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),i=e("node_modules/ooxml-viewer/lib/util/dom"),t=e("node_modules/ooxml-viewer/lib/render/renderTable"),u=e("node_modules/ooxml-viewer/lib/openxml/word/Table");r.renderHeader=function(e,r){var l,o,s=i.createElement("div");try{for(var m=n.__values(r.children),v=m.next();!v.done;v=m.next()){var f=v.value;if(f instanceof d.Paragraph){var c=a.default(e,f,!0,!0);i.appendChild(s,c)}else if(f instanceof u.Table){var b=t.default(e,f);i.appendChild(s,b)}else console.warn("unknown child",f)}}catch(e){l={error:e}}finally{try{v&&!v.done&&(o=m.return)&&o.call(m)}finally{if(l)throw l.error}}return s}}));
;/*!node_modules/ooxml-viewer/lib/render/renderSection.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderSection",(function(e,t,r,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("node_modules/ooxml-viewer/lib/util/dom"),n=e("node_modules/ooxml-viewer/lib/render/renderHeader");t.renderSection=function(e,t,r){var o=a.createElement("section");o.style.position="relative",r.page&&(r.pageMarginBottom&&(o.style.marginBottom=r.pageMarginBottom+"px"),r.pageShadow&&(o.style.boxShadow="0 0 8px rgba(0, 0, 0, 0.5)"),r.pageBackground&&(o.style.background=r.pageBackground));var d=t.properties,i=d.pageSize;i&&(r.ignoreWidth||(o.style.width=i.width),r.ignoreHeight||(o.style.height=i.height)),r.padding?o.style.padding=r.padding:(p=d.pageMargin)&&(o.style.paddingLeft=p.left||"0",o.style.paddingRight=p.right||"0",o.style.paddingTop=p.top||"0",o.style.paddingBottom=p.bottom||"0"),d.cols&&d.cols.num&&d.cols.num>1&&(o.style.columnCount=""+d.cols.num,d.cols.space&&(o.style.columnGap=d.cols.space)),e.currentPage++;var l="auto";if(d.pageSize&&d.pageSize.width&&(l=d.pageSize.width),d.headers&&r.page&&r.renderHeader){var s=d.headers,g=null;if(s.even&&e.currentPage%2==0?g=n.renderHeader(e,s.even):s.default?g=n.renderHeader(e,s.default):console.warn("can not find header",e.currentPage,d.headers),g)g.style.position="absolute",(p=d.pageMargin)&&p.header&&(g.style.top=p.header,g.style.width=l),o.appendChild(g)}if(d.footers&&r.page&&r.renderFooter){var p,u=d.footers,c=null;if(u.even&&e.currentPage%2==0?c=n.renderHeader(e,u.even):u.default?c=n.renderHeader(e,u.default):console.warn("can not find footer",e.currentPage,d.footers),c)c.style.position="absolute",(p=d.pageMargin)&&p.footer&&(c.style.bottom=p.footer,c.style.width=l),o.appendChild(c)}return o}}));
;/*!node_modules/ooxml-viewer/lib/render/renderBody.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderBody",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/util/dom"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),l=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),d=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),s=e("node_modules/ooxml-viewer/lib/render/renderSection"),c=e("node_modules/ooxml-viewer/lib/render/renderTable");function u(e,r,n,t,o,a,l){var d=0===t.children.length;if(i.appendChild(t,l),!d&&function(e,r,n){if(e.breakPage)return e.breakPage=!1,!0;var t=n.getBoundingClientRect();return t.top+t.height>r.bottom||t.left>r.right}(e,o,l)){var c=l.cloneNode(!0);i.removeChild(t,l);var u=s.renderSection(e,a,r);return i.appendChild(n,u),i.appendChild(u,c),{sectionEl:u,sectionEnd:o=f(a,u)}}return{sectionEl:t,sectionEnd:o}}function f(e,r){var n=r.getBoundingClientRect(),t=e.properties.pageMargin,o=n.top+n.height;(null==t?void 0:t.bottom)&&(o-=parseInt(t.bottom.replace("px",""),10));var i=n.left+n.width;return(null==t?void 0:t.right)&&(i-=parseInt(t.right.replace("px",""),10)),{bottom:o,right:i}}function p(e,r,n){var t=r.properties,o=t.pageSize;if(n.zoomFitWidth&&!n.ignoreWidth){var i=null==o?void 0:o.width;if(e&&i){var a=parseInt(i.replace("px",""),10);if(t.pageMargin){var l=t.pageMargin;a+=l.left?parseInt(l.left.replace("px",""),10):0,a+=l.right?parseInt(l.right.replace("px",""),10):0}return e/a}}return 1}function h(e,r,n,t,i,s){setTimeout((function(){var p,h,v=f(i,t);try{for(var g=o.__values(i.children),m=g.next();!m.done;m=g.next()){var y=m.value;if(y instanceof a.Paragraph){var b=d.default(e,y),x=u(e,n,r,t,v,i,b);t=x.sectionEl,v=x.sectionEnd}else if(y instanceof l.Table){var _=c.default(e,y);x=u(e,n,r,t,v,i,_);t=x.sectionEl,v=x.sectionEnd}else console.warn("unknown child",y)}}catch(e){p={error:e}}finally{try{m&&!m.done&&(h=g.return)&&h.call(g)}finally{if(p)throw p.error}}s&&(t.style.marginBottom="0")}),0)}r.default=function(e,r,n,t,u){var f,v,g,m,y=u.page||!1,b=e.getBoundingClientRect().width-2*(u.pageWrapPadding||0),x=[],_=0,w=t.sections,C=w.length,E=!1;try{for(var P=o.__values(w),M=P.next();!M.done;M=P.next()){var T=M.value;x.push(p(b,T,u)),r.currentSection=T;var z=s.renderSection(r,T,u);if(i.appendChild(n,z),(_+=1)===C&&(E=!0),y)h(r,n,u,z,T,E);else try{for(var B=(g=void 0,o.__values(T.children)),I=B.next();!I.done;I=B.next()){var S=I.value;if(S instanceof a.Paragraph){var W=d.default(r,S);i.appendChild(z,W)}else if(S instanceof l.Table){var k=c.default(r,S);i.appendChild(z,k)}else console.warn("unknown child",S)}}catch(e){g={error:e}}finally{try{I&&!I.done&&(m=B.return)&&m.call(B)}finally{if(g)throw g.error}}}}catch(e){f={error:e}}finally{try{M&&!M.done&&(v=P.return)&&v.call(P)}finally{if(f)throw f.error}}setTimeout((function(){if(u.zoom)n.style.transformOrigin="0 0",n.style.transform="scale(".concat(u.zoom,")");else if(u.page&&u.zoomFitWidth&&!u.ignoreWidth){var e=Math.min.apply(Math,o.__spreadArray([],o.__read(x),!1));n.style.transformOrigin="0 0",n.style.transform="scale(".concat(e,")")}}),0)}}));
;/*!node_modules/ooxml-viewer/lib/render/renderDocument.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderDocument",(function(e,o,r,d){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/ooxml-viewer/lib/util/dom"),n=e("node_modules/ooxml-viewer/lib/render/renderBody");o.default=function(e,o,r,d){var i=l.createElement("article");return n.default(e,o,i,r.body,d),i}}));
;/*!node_modules/ooxml-viewer/lib/util/blob.js*/
amis.define("node_modules/ooxml-viewer/lib/util/blob",(function(e,o,d,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.downloadBlob=function(e,o){void 0===o&&(o="file.txt");var d=URL.createObjectURL(e),n=document.createElement("a");n.href=d,n.download=o,document.body.appendChild(n),n.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(n)}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl",(function(e,r,l,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Run"),o=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=function(){function e(){this.start=1,this.lvlText="%1.",this.isLgl=!1,this.lvlJc="start",this.suff="space"}return e.fromXML=function(r,l){var a,i,u=new e;u.ilvl=l.getAttribute("w:ilvl");try{for(var c=t.__values(l.children),v=c.next();!v.done;v=c.next()){var w=v.value,m=w.tagName;switch(m){case"w:start":u.start=o.getValNumber(w);break;case"w:numFmt":u.numFmt=o.getVal(w);break;case"w:lvlText":u.lvlText=o.getVal(w);break;case"w:lvlJc":u.lvlJc=o.getVal(w);break;case"w:legacy":case"w:pStyle":break;case"w:pPr":u.pPr=s.Paragraph.parseParagraphPr(r,w);break;case"w:rPr":u.rPr=n.Run.parseRunPr(r,w);break;case"w:isLgl":u.isLgl=o.getValBoolean(w);break;default:console.warn("Lvl: Unknown tag ",m,w)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(i=c.return)&&i.call(c)}finally{if(a)throw a.error}}return u},e}();r.Lvl=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum",(function(e,t,l,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl"),i=e("node_modules/ooxml-viewer/lib/OpenXML"),u=function(){function e(){this.lvls={}}return e.fromXML=function(t,l){var r,u,m=new e;m.abstractNumId=l.getAttribute("w:abstractNumId")||"",m.multiLevelType=l.getAttribute("w:multiLevelType");var a=l.getElementsByTagName("w:lvl");try{for(var v=n.__values(a),s=v.next();!s.done;s=v.next()){var d=s.value,b=d.getAttribute("w:ilvl")||"";m.lvls[b]=o.Lvl.fromXML(t,d)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(u=v.return)&&u.call(v)}finally{if(r)throw r.error}}var c=l.getElementsByTagName("w:multiLevelType").item(0);return c&&(m.multiLevelType=i.getVal(c)),m},e}();t.AbstractNum=u}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Num.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Num",(function(e,r,l,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),a=e("node_modules/ooxml-viewer/lib/OpenXML"),i=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Lvl"),o=function(){function e(){this.lvlOverride={lvls:{}}}return e.fromXML=function(r,l){var t,o,v=new e;v.numId=l.getAttribute("w:numId")||"";var u=l.getElementsByTagName("w:abstractNumId").item(0);u&&(v.abstractNumId=a.getVal(u));var d=l.getElementsByTagName("w:lvlOverride").item(0);if(d)try{for(var m=n.__values(d.children),s=m.next();!s.done;s=m.next()){var w=s.value,b=w.tagName;switch(b){case"w:lvl":var c=w.getAttribute("w:lvlId")||"";v.lvlOverride.lvls[c]=i.Lvl.fromXML(r,w);break;case"w:startOverride":var f=w.getAttribute("w:lvlId")||"";v.lvlOverride.lvls[f]&&(v.lvlOverride.lvls[f].start=a.getValNumber(w));break;default:console.warn("Num: Unknown tag ",b,w)}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(o=m.return)&&o.call(m)}finally{if(t)throw t.error}}return v},e}();r.Num=o}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),u=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/AbstractNum"),a=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Num"),m=function(){function e(){this.abstractNums={},this.nums={},this.numData={}}return e.fromXML=function(r,n){var t,m,l,i,s=new e;try{for(var d=o.__values(n.getElementsByTagName("w:abstractNum")),c=d.next();!c.done;c=d.next()){var b=c.value,f=u.AbstractNum.fromXML(r,b);s.abstractNums[f.abstractNumId]=f}}catch(e){t={error:e}}finally{try{c&&!c.done&&(m=d.return)&&m.call(d)}finally{if(t)throw t.error}}try{for(var v=o.__values(n.getElementsByTagName("w:num")),N=v.next();!N.done;N=v.next()){var w=N.value,y=a.Num.fromXML(r,w);s.nums[y.numId]=y,s.numData[y.numId]={}}}catch(e){l={error:e}}finally{try{N&&!N.done&&(i=v.return)&&i.call(v)}finally{if(l)throw l.error}}return s},e}();r.Numbering=m}));
;/*!node_modules/ooxml-viewer/lib/util/mergeRun.js*/
amis.define("node_modules/ooxml-viewer/lib/util/mergeRun",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/parse/parsePr");function o(e,r,t){var n=r?l.parsePr(e,r):{},a=t?l.parsePr(e,t):{};return JSON.stringify(n)===JSON.stringify(a)}function i(e,r){var t=e.getElementsByTagName("w:t")[0],n=r.getElementsByTagName("w:t")[0];if(t&&n){var a=n.textContent||"";t.textContent+=a||""}}function u(e){var r,t,n=e.tagName,l=e.children,o=!1,i=!1;try{for(var u=a.__values(l),f=u.next();!f.done;f=u.next()){var s=f.value;if("w:t"===s.tagName){o=!0,i="preserve"===s.getAttribute("xml:space");break}}}catch(e){r={error:e}}finally{try{f&&!f.done&&(t=u.return)&&t.call(u)}finally{if(r)throw r.error}}return"w:r"===n&&o&&!i}function f(e,r){var t,n,l,f,s=[],v=null;try{for(var c=a.__values(r.children),y=c.next();!y.done;y=c.next()){var m=y.value,d=m.tagName;if(u(m))if(v)o(e,v.getElementsByTagName("w:rPr")[0],m.getElementsByTagName("w:rPr")[0])?i(v,m):(v=m,s.push(m));else v=m,s.push(m);else"w:proofErr"!==d&&(v=null,s.push(m))}}catch(e){t={error:e}}finally{try{y&&!y.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}r.innerHTML="";try{for(var g=a.__values(s),h=g.next();!h.done;h=g.next()){var p=h.value;r.appendChild(p)}}catch(e){l={error:e}}finally{try{h&&!h.done&&(f=g.return)&&f.call(g)}finally{if(l)throw l.error}}}r.canMerge=u,r.mergeRun=function(e,r){var t,n,l=r.getElementsByTagName("w:p");try{for(var o=a.__values(l),i=o.next();!i.done;i=o.next()){f(e,i.value)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}},r.mergeRunInP=f}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Header.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Header",(function(e,r,a,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/parse/mergeSdt"),t=e("node_modules/ooxml-viewer/lib/parse/parseTable"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=function(){function e(){this.children=[]}return e.fromXML=function(r,a){var o,i,s=new e,m=[];s.children=m;var u=a,f=a.firstElementChild;!f||"w:hdr"!==f.tagName&&"w:ftr"!==f.tagName||(u=f);try{for(var c=l.__values(n.mergeSdt(u)),w=c.next();!w.done;w=c.next()){var v=w.value,b=v.tagName;switch(b){case"w:p":var h=d.Paragraph.fromXML(r,v);m.push(h);break;case"w:tbl":var p=t.parseTable(r,v);m.push(p);break;default:console.warn("Header.fromXML Unknown key",b,v)}}}catch(e){o={error:e}}finally{try{w&&!w.done&&(i=c.return)&&i.call(c)}finally{if(o)throw o.error}}return s},e}();r.Header=i}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Section.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Section",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/parse/parseSize"),n=e("node_modules/ooxml-viewer/lib/OpenXML"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Header");function d(e,r,t){var a=r.getAttribute("w:type"),o=r.getAttribute("r:id");if(a&&o){var i=e.getDocumentRels(o);if(i){var n=e.getXML("/word/"+i.target);if(n)return{headerType:a,header:s.Header.fromXML(e,n)}}}return null}var l=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parsePr=function(e,r,t){var a,s,l={headers:{},footers:{}};try{for(var p=o.__values(r.children),u=p.next();!u.done;u=p.next()){var c=u.value;switch(c.tagName){case"w:pgSz":l.pageSize={width:i.parseSize(c,"w:w"),height:i.parseSize(c,"w:h")};break;case"w:pgMar":l.pageMargin={left:i.parseSize(c,"w:left"),right:i.parseSize(c,"w:right"),top:i.parseSize(c,"w:top"),bottom:i.parseSize(c,"w:bottom"),header:i.parseSize(c,"w:header"),footer:i.parseSize(c,"w:footer"),gutter:i.parseSize(c,"w:gutter")};break;case"w:headerReference":var h=d(e,c);h&&(l.headers[h.headerType]=h.header);break;case"w:footerReference":var w=d(e,c);w&&(l.footers[w.headerType]=w.header);break;case"w:cols":var f={},m=n.getAttrNumber(c,"w:num",1);f.num=m;var v=i.parseSize(c,"w:space");v&&(f.space=v),l.cols=f}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(s=p.return)&&s.call(p)}finally{if(a)throw a.error}}return l},e}();r.Section=l}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Body.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Body",(function(e,o,r,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/parse/mergeSdt"),a=e("node_modules/ooxml-viewer/lib/parse/parseTable"),s=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),c=e("node_modules/ooxml-viewer/lib/openxml/word/Section"),d=function(){function e(){this.sections=[],this.currentSection=new c.Section,this.sections.push(this.currentSection)}return e.prototype.addChild=function(e){this.currentSection.addChild(e)},e.prototype.addSection=function(e){this.currentSection.properties=e,this.currentSection=new c.Section,this.sections.push(this.currentSection)},e.fromXML=function(o,r){var t,d,l=new e;try{for(var u=n.__values(i.mergeSdt(r)),m=u.next();!m.done;m=u.next()){var h=m.value,p=h.tagName;switch(p){case"w:p":var w=s.Paragraph.fromXML(o,h);l.addChild(w);break;case"w:tbl":var f=a.parseTable(o,h);l.addChild(f);break;case"w:bookmarkStart":case"w:bookmarkEnd":break;case"w:sectPr":l.addSection(c.Section.parsePr(o,h,l));break;default:console.warn("Body.fromXML Unknown key",p,h)}}}catch(e){t={error:e}}finally{try{m&&!m.done&&(d=u.return)&&d.call(u)}finally{if(t)throw t.error}}return l.sections=l.sections.filter((function(e){return e.children.length>0})),l},e}();o.Body=d}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/WDocument.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/WDocument",(function(e,o,r,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/parse/parseColor"),a=e("node_modules/ooxml-viewer/lib/openxml/word/Body"),d=function(){function e(){}return e.fromXML=function(o,r){var t,d,i,m,c=new e,u=r.getElementsByTagName("w:body").item(0);u&&(c.body=a.Body.fromXML(o,u));var s=r.getElementsByTagName("w:background").item(0);if(s){var w={};try{for(var f=n.__values(s.attributes),h=f.next();!h.done;h=f.next()){switch(h.value.name){case"w:color":w.color=l.parseColorAttr(o,s,"w:color");break;case"w:themeColor":w.themeColor=l.parseColorAttr(o,s,"w:themeColor");break;case"w:themeShade":w.themeShade=l.parseColorAttr(o,s,"w:themeShade");break;case"w:themeTint":w.themeTint=l.parseColorAttr(o,s,"w:themeTint");break;default:console.log("unknown background",s)}}}catch(e){t={error:e}}finally{try{h&&!h.done&&(d=f.return)&&d.call(f)}finally{if(t)throw t.error}}try{for(var b=n.__values(s.children),v=b.next();!v.done;v=b.next()){if("v:background"===v.value.tagName);else console.log("unknown background",s)}}catch(e){i={error:e}}finally{try{v&&!v.done&&(m=b.return)&&m.call(b)}finally{if(i)throw i.error}}c.documentBackground=w}return c},e}();o.WDocument=d}));
;/*!node_modules/fflate/lib/worker.cjs*/
amis.define('node_modules/fflate/lib/worker.cjs', function(require, exports, module, define) {

  "use strict";
  var ch2 = {};
  exports["default"] = (function (c, id, msg, transfer, cb) {
      var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
          c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
      ], { type: 'text/javascript' }))));
      w.onmessage = function (e) {
          var d = e.data, ed = d.$e$;
          if (ed) {
              var err = new Error(ed[0]);
              err['code'] = ed[1];
              err.stack = ed[2];
              cb(err, null);
          }
          else
              cb(null, d);
      };
      w.postMessage(msg, transfer);
      return w;
  });
  

});

;/*!node_modules/fflate/lib/index.cjs*/
amis.define('node_modules/fflate/lib/index.cjs', function(require, exports, module, define) {

  "use strict";
  // DEFLATE is a complex format; to read this code, you should probably check the RFC first:
  // https://tools.ietf.org/html/rfc1951
  // You may also wish to take a look at the guide I made about this program:
  // https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
  // Some of the following code is similar to that of UZIP.js:
  // https://github.com/photopea/UZIP.js
  // However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
  // Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
  // is better for memory in most engines (I *think*).
  var node_worker_1 = require("node_modules/fflate/lib/worker.cjs");
  // aliases for shorter compressed code (most minifers don't do this)
  var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
  // fixed length extra bits
  var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
  // fixed distance extra bits
  // see fleb note
  var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
  // code length index map
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  // get base, reverse index map from extra bits
  var freb = function (eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
          b[i] = start += 1 << eb[i - 1];
      }
      // numbers here are at max 18 bits
      var r = new u32(b[30]);
      for (var i = 1; i < 30; ++i) {
          for (var j = b[i]; j < b[i + 1]; ++j) {
              r[j] = ((j - b[i]) << 5) | i;
          }
      }
      return [b, r];
  };
  var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
  // we can ignore the fact that the other numbers are wrong; they never happen anyway
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
  // map of value to reverse (assuming 16 bits)
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
      // reverse table algorithm from SO
      var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
      x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
      x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
      rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
  }
  // create huffman tree from u8 "map": index -> code length for code index
  // mb (max bits) must be at most 15
  // TODO: optimize/split up?
  var hMap = (function (cd, mb, r) {
      var s = cd.length;
      // index
      var i = 0;
      // u16 "map": index -> # of codes with bit length = index
      var l = new u16(mb);
      // length of cd must be 288 (total # of codes)
      for (; i < s; ++i) {
          if (cd[i])
              ++l[cd[i] - 1];
      }
      // u16 "map": index -> minimum code for bit length = index
      var le = new u16(mb);
      for (i = 0; i < mb; ++i) {
          le[i] = (le[i - 1] + l[i - 1]) << 1;
      }
      var co;
      if (r) {
          // u16 "map": index -> number of actual bits, symbol for code
          co = new u16(1 << mb);
          // bits to remove for reverser
          var rvb = 15 - mb;
          for (i = 0; i < s; ++i) {
              // ignore 0 lengths
              if (cd[i]) {
                  // num encoding both symbol and bits read
                  var sv = (i << 4) | cd[i];
                  // free bits
                  var r_1 = mb - cd[i];
                  // start value
                  var v = le[cd[i] - 1]++ << r_1;
                  // m is end value
                  for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                      // every 16 bit value starting with the code yields the same result
                      co[rev[v] >>> rvb] = sv;
                  }
              }
          }
      }
      else {
          co = new u16(s);
          for (i = 0; i < s; ++i) {
              if (cd[i]) {
                  co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
              }
          }
      }
      return co;
  });
  // fixed length tree
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
      flt[i] = 8;
  for (var i = 144; i < 256; ++i)
      flt[i] = 9;
  for (var i = 256; i < 280; ++i)
      flt[i] = 7;
  for (var i = 280; i < 288; ++i)
      flt[i] = 8;
  // fixed distance tree
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
      fdt[i] = 5;
  // fixed length map
  var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
  // fixed distance map
  var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
  // find max of array
  var max = function (a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
          if (a[i] > m)
              m = a[i];
      }
      return m;
  };
  // read d, starting at bit p and mask with m
  var bits = function (d, p, m) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
  };
  // read d, starting at bit p continuing for at least 16 bits
  var bits16 = function (d, p) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
  };
  // get end of byte
  var shft = function (p) { return ((p + 7) / 8) | 0; };
  // typed array slice - allows garbage collector to free original reference,
  // while being more compatible than .slice
  var slc = function (v, s, e) {
      if (s == null || s < 0)
          s = 0;
      if (e == null || e > v.length)
          e = v.length;
      // can't use .constructor in case user-supplied
      var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
      n.set(v.subarray(s, e));
      return n;
  };
  /**
   * Codes for errors generated within this library
   */
  exports.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
  };
  // error codes
  var ec = [
      'unexpected EOF',
      'invalid block type',
      'invalid length/literal',
      'invalid distance',
      'stream finished',
      'no stream handler',
      ,
      'no callback',
      'invalid UTF-8 data',
      'extra field too long',
      'date not in range 1980-2099',
      'filename too long',
      'stream finishing',
      'invalid zip data'
      // determined by unknown compression method
  ];
  ;
  var err = function (ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
      if (!nt)
          throw e;
      return e;
  };
  // expands raw DEFLATE data
  var inflt = function (dat, buf, st) {
      // source length
      var sl = dat.length;
      if (!sl || (st && st.f && !st.l))
          return buf || new u8(0);
      // have to estimate size
      var noBuf = !buf || st;
      // no state
      var noSt = !st || st.i;
      if (!st)
          st = {};
      // Assumes roughly 33% compression ratio average
      if (!buf)
          buf = new u8(sl * 3);
      // ensure buffer can fit at least l elements
      var cbuf = function (l) {
          var bl = buf.length;
          // need to increase size to fit
          if (l > bl) {
              // Double or set to necessary, whichever is greater
              var nbuf = new u8(Math.max(bl * 2, l));
              nbuf.set(buf);
              buf = nbuf;
          }
      };
      //  last chunk         bitpos           bytes
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      // total bits
      var tbts = sl * 8;
      do {
          if (!lm) {
              // BFINAL - this is only 1 when last chunk is next
              final = bits(dat, pos, 1);
              // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
              var type = bits(dat, pos + 1, 3);
              pos += 3;
              if (!type) {
                  // go to end of byte boundary
                  var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                  if (t > sl) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  // ensure size
                  if (noBuf)
                      cbuf(bt + l);
                  // Copy over uncompressed data
                  buf.set(dat.subarray(s, t), bt);
                  // Get new bitpos, update byte count
                  st.b = bt += l, st.p = pos = t * 8, st.f = final;
                  continue;
              }
              else if (type == 1)
                  lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
              else if (type == 2) {
                  //  literal                            lengths
                  var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                  var tl = hLit + bits(dat, pos + 5, 31) + 1;
                  pos += 14;
                  // length+distance tree
                  var ldt = new u8(tl);
                  // code length tree
                  var clt = new u8(19);
                  for (var i = 0; i < hcLen; ++i) {
                      // use index map to get real code
                      clt[clim[i]] = bits(dat, pos + i * 3, 7);
                  }
                  pos += hcLen * 3;
                  // code lengths bits
                  var clb = max(clt), clbmsk = (1 << clb) - 1;
                  // code lengths map
                  var clm = hMap(clt, clb, 1);
                  for (var i = 0; i < tl;) {
                      var r = clm[bits(dat, pos, clbmsk)];
                      // bits read
                      pos += r & 15;
                      // symbol
                      var s = r >>> 4;
                      // code length to copy
                      if (s < 16) {
                          ldt[i++] = s;
                      }
                      else {
                          //  copy   count
                          var c = 0, n = 0;
                          if (s == 16)
                              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                          else if (s == 17)
                              n = 3 + bits(dat, pos, 7), pos += 3;
                          else if (s == 18)
                              n = 11 + bits(dat, pos, 127), pos += 7;
                          while (n--)
                              ldt[i++] = c;
                      }
                  }
                  //    length tree                 distance tree
                  var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                  // max length bits
                  lbt = max(lt);
                  // max dist bits
                  dbt = max(dt);
                  lm = hMap(lt, lbt, 1);
                  dm = hMap(dt, dbt, 1);
              }
              else
                  err(1);
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
          }
          // Make sure the buffer can hold this + the largest possible addition
          // Maximum chunk size (practically, theoretically infinite) is 2^17;
          if (noBuf)
              cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (;; lpos = pos) {
              // bits read, code
              var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
              pos += c & 15;
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
              if (!c)
                  err(2);
              if (sym < 256)
                  buf[bt++] = sym;
              else if (sym == 256) {
                  lpos = pos, lm = null;
                  break;
              }
              else {
                  var add = sym - 254;
                  // no extra bits needed if less
                  if (sym > 264) {
                      // index
                      var i = sym - 257, b = fleb[i];
                      add = bits(dat, pos, (1 << b) - 1) + fl[i];
                      pos += b;
                  }
                  // dist
                  var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                  if (!d)
                      err(3);
                  pos += d & 15;
                  var dt = fd[dsym];
                  if (dsym > 3) {
                      var b = fdeb[dsym];
                      dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                  }
                  if (pos > tbts) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  if (noBuf)
                      cbuf(bt + 131072);
                  var end = bt + add;
                  for (; bt < end; bt += 4) {
                      buf[bt] = buf[bt - dt];
                      buf[bt + 1] = buf[bt + 1 - dt];
                      buf[bt + 2] = buf[bt + 2 - dt];
                      buf[bt + 3] = buf[bt + 3 - dt];
                  }
                  bt = end;
              }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
              final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  // starting at p, write the minimum number of bits that can hold v to d
  var wbits = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
  };
  // starting at p, write the minimum number of bits (>8) that can hold v to d
  var wbits16 = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
      d[o + 2] |= v >>> 16;
  };
  // creates code lengths from a frequency table
  var hTree = function (d, mb) {
      // Need extra info to make a tree
      var t = [];
      for (var i = 0; i < d.length; ++i) {
          if (d[i])
              t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
          return [et, 0];
      if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return [v, 1];
      }
      t.sort(function (a, b) { return a.f - b.f; });
      // after i2 reaches last ind, will be stopped
      // freq must be greater than largest possible number of symbols
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
      // efficient algorithm from UZIP.js
      // i0 is lookbehind, i2 is lookahead - after processing two low-freq
      // symbols that combined have high freq, will start processing i2 (high-freq,
      // non-composite) symbols instead
      // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
      while (i1 != s - 1) {
          l = t[t[i0].f < t[i2].f ? i0++ : i2++];
          r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
          t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
          if (t2[i].s > maxSym)
              maxSym = t2[i].s;
      }
      // code lengths
      var tr = new u16(maxSym + 1);
      // max bits in tree
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
          // more algorithms from UZIP.js
          // TODO: find out how this code works (debt)
          //  ind    debt
          var i = 0, dt = 0;
          //    left            cost
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
          for (; i < s; ++i) {
              var i2_1 = t2[i].s;
              if (tr[i2_1] > mb) {
                  dt += cst - (1 << (mbt - tr[i2_1]));
                  tr[i2_1] = mb;
              }
              else
                  break;
          }
          dt >>>= lft;
          while (dt > 0) {
              var i2_2 = t2[i].s;
              if (tr[i2_2] < mb)
                  dt -= 1 << (mb - tr[i2_2]++ - 1);
              else
                  ++i;
          }
          for (; i >= 0 && dt; --i) {
              var i2_3 = t2[i].s;
              if (tr[i2_3] == mb) {
                  --tr[i2_3];
                  ++dt;
              }
          }
          mbt = mb;
      }
      return [new u8(tr), mbt];
  };
  // get the max length and assign length codes
  var ln = function (n, l, d) {
      return n.s == -1
          ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
          : (l[n.s] = d);
  };
  // length codes generation
  var lc = function (c) {
      var s = c.length;
      // Note that the semicolon was intentional
      while (s && !c[--s])
          ;
      var cl = new u16(++s);
      //  ind      num         streak
      var cli = 0, cln = c[0], cls = 1;
      var w = function (v) { cl[cli++] = v; };
      for (var i = 1; i <= s; ++i) {
          if (c[i] == cln && i != s)
              ++cls;
          else {
              if (!cln && cls > 2) {
                  for (; cls > 138; cls -= 138)
                      w(32754);
                  if (cls > 2) {
                      w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                      cls = 0;
                  }
              }
              else if (cls > 3) {
                  w(cln), --cls;
                  for (; cls > 6; cls -= 6)
                      w(8304);
                  if (cls > 2)
                      w(((cls - 3) << 5) | 8208), cls = 0;
              }
              while (cls--)
                  w(cln);
              cls = 1;
              cln = c[i];
          }
      }
      return [cl.subarray(0, cli), s];
  };
  // calculate the length of output from tree, code lengths
  var clen = function (cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
          l += cf[i] * cl[i];
      return l;
  };
  // writes a fixed block
  // returns the new bit pos
  var wfblk = function (out, pos, dat) {
      // no need to write 00 as type: TypedArray defaults to 0
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >>> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
          out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
  };
  // writes a block
  var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
      var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
      var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
      var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
          lcfreq[lclt[i] & 31]++;
      for (var i = 0; i < lcdt.length; ++i)
          lcfreq[lcdt[i] & 31]++;
      var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
      var flen = (bl + 5) << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
      if (flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i = 0; i < nlcc; ++i)
              wbits(out, p + 3 * i, lct[clim[i]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
              var clct = lcts[it];
              for (var i = 0; i < clct.length; ++i) {
                  var len = clct[i] & 31;
                  wbits(out, p, llm[len]), p += lct[len];
                  if (len > 15)
                      wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
              }
          }
      }
      else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
          if (syms[i] > 255) {
              var len = (syms[i] >>> 18) & 31;
              wbits16(out, p, lm[len + 257]), p += ll[len + 257];
              if (len > 7)
                  wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
              var dst = syms[i] & 31;
              wbits16(out, p, dm[dst]), p += dl[dst];
              if (dst > 3)
                  wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
          }
          else {
              wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
          }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
  };
  // deflate options (nice << 13) | chain
  var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  // empty
  var et = /*#__PURE__*/ new u8(0);
  // compresses data into a raw DEFLATE buffer
  var dflt = function (dat, lvl, plvl, pre, post, lst) {
      var s = dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
      // writing to this writes to the output buffer
      var w = o.subarray(pre, o.length - post);
      var pos = 0;
      if (!lvl || s < 8) {
          for (var i = 0; i <= s; i += 65535) {
              // end
              var e = i + 65535;
              if (e >= s) {
                  // write final block
                  w[pos >> 3] = lst;
              }
              pos = wfblk(w, pos + 1, dat.subarray(i, e));
          }
      }
      else {
          var opt = deo[lvl - 1];
          var n = opt >>> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          //    prev 2-byte val map    curr 2-byte val map
          var prev = new u16(32768), head = new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
          // 24576 is an arbitrary number of maximum symbols per block
          // 424 buffer for last block
          var syms = new u32(25000);
          // length/literal freq   distance freq
          var lf = new u16(288), df = new u16(32);
          //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
          var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
          for (; i < s; ++i) {
              // hash value
              // deopt when i > s - 3 - at end, deopt acceptable
              var hv = hsh(i);
              // index mod 32768    previous index mod
              var imod = i & 32767, pimod = head[hv];
              prev[imod] = pimod;
              head[hv] = imod;
              // We always should modify head and prev, but only add symbols if
              // this data is not yet processed ("wait" for wait index)
              if (wi <= i) {
                  // bytes remaining
                  var rem = s - i;
                  if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                      pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                      li = lc_1 = eb = 0, bs = i;
                      for (var j = 0; j < 286; ++j)
                          lf[j] = 0;
                      for (var j = 0; j < 30; ++j)
                          df[j] = 0;
                  }
                  //  len    dist   chain
                  var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                  if (rem > 2 && hv == hsh(i - dif)) {
                      var maxn = Math.min(n, rem) - 1;
                      var maxd = Math.min(32767, i);
                      // max possible length
                      // not capped at dif because decompressors implement "rolling" index population
                      var ml = Math.min(258, rem);
                      while (dif <= maxd && --ch_1 && imod != pimod) {
                          if (dat[i + l] == dat[i + l - dif]) {
                              var nl = 0;
                              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                  ;
                              if (nl > l) {
                                  l = nl, d = dif;
                                  // break out early when we reach "nice" (we are satisfied enough)
                                  if (nl > maxn)
                                      break;
                                  // now, find the rarest 2-byte sequence within this
                                  // length of literals and search for that instead.
                                  // Much faster than just using the start
                                  var mmd = Math.min(dif, nl - 2);
                                  var md = 0;
                                  for (var j = 0; j < mmd; ++j) {
                                      var ti = (i - dif + j + 32768) & 32767;
                                      var pti = prev[ti];
                                      var cd = (ti - pti + 32768) & 32767;
                                      if (cd > md)
                                          md = cd, pimod = ti;
                                  }
                              }
                          }
                          // check the previous match
                          imod = pimod, pimod = prev[imod];
                          dif += (imod - pimod + 32768) & 32767;
                      }
                  }
                  // d will be nonzero only when a match was found
                  if (d) {
                      // store both dist and len data in one Uint32
                      // Make sure this is recognized as a len/dist with 28th bit (2^28)
                      syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                      var lin = revfl[l] & 31, din = revfd[d] & 31;
                      eb += fleb[lin] + fdeb[din];
                      ++lf[257 + lin];
                      ++df[din];
                      wi = i + l;
                      ++lc_1;
                  }
                  else {
                      syms[li++] = dat[i];
                      ++lf[dat[i]];
                  }
              }
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
          // this is the easiest way to avoid needing to maintain state
          if (!lst && pos & 7)
              pos = wfblk(w, pos + 1, et);
      }
      return slc(o, 0, pre + shft(pos) + post);
  };
  // CRC32 table
  var crct = /*#__PURE__*/ (function () {
      var t = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
          var c = i, k = 9;
          while (--k)
              c = ((c & 1) && -306674912) ^ (c >>> 1);
          t[i] = c;
      }
      return t;
  })();
  // CRC32
  var crc = function () {
      var c = -1;
      return {
          p: function (d) {
              // closures have awful performance
              var cr = c;
              for (var i = 0; i < d.length; ++i)
                  cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
              c = cr;
          },
          d: function () { return ~c; }
      };
  };
  // Alder32
  var adler = function () {
      var a = 1, b = 0;
      return {
          p: function (d) {
              // closures have awful performance
              var n = a, m = b;
              var l = d.length | 0;
              for (var i = 0; i != l;) {
                  var e = Math.min(i + 2655, l);
                  for (; i < e; ++i)
                      m += n += d[i];
                  n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
              }
              a = n, b = m;
          },
          d: function () {
              a %= 65521, b %= 65521;
              return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
          }
      };
  };
  ;
  // deflate with opts
  var dopt = function (dat, opt, pre, post, st) {
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
  };
  // Walmart object spread
  var mrg = function (a, b) {
      var o = {};
      for (var k in a)
          o[k] = a[k];
      for (var k in b)
          o[k] = b[k];
      return o;
  };
  // worker clone
  // This is possibly the craziest part of the entire codebase, despite how simple it may seem.
  // The only parameter to this function is a closure that returns an array of variables outside of the function scope.
  // We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
  // We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
  // The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
  // This took me three weeks to figure out how to do.
  var wcln = function (fn, fnStr, td) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
      for (var i = 0; i < dt.length; ++i) {
          var v = dt[i], k = ks[i];
          if (typeof v == 'function') {
              fnStr += ';' + k + '=';
              var st_1 = v.toString();
              if (v.prototype) {
                  // for global objects
                  if (st_1.indexOf('[native code]') != -1) {
                      var spInd = st_1.indexOf(' ', 8) + 1;
                      fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                  }
                  else {
                      fnStr += st_1;
                      for (var t in v.prototype)
                          fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                  }
              }
              else
                  fnStr += st_1;
          }
          else
              td[k] = v;
      }
      return [fnStr, td];
  };
  var ch = [];
  // clone bufs
  var cbfs = function (v) {
      var tl = [];
      for (var k in v) {
          if (v[k].buffer) {
              tl.push((v[k] = new v[k].constructor(v[k])).buffer);
          }
      }
      return tl;
  };
  // use a worker to execute code
  var wrkr = function (fns, init, id, cb) {
      var _a;
      if (!ch[id]) {
          var fnStr = '', td_1 = {}, m = fns.length - 1;
          for (var i = 0; i < m; ++i)
              _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
          ch[id] = wcln(fns[m], fnStr, td_1);
      }
      var td = mrg({}, ch[id][1]);
      return node_worker_1["default"](ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
  };
  // base async inflate fn
  var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
  var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
  // gzip extra
  var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
  // gunzip extra
  var guze = function () { return [gzs, gzl]; };
  // zlib extra
  var zle = function () { return [zlh, wbytes, adler]; };
  // unzlib extra
  var zule = function () { return [zlv]; };
  // post buf
  var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
  // get u8
  var gu8 = function (o) { return o && o.size && new u8(o.size); };
  // async helper
  var cbify = function (dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function (err, dat) {
          w.terminate();
          cb(err, dat);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function () { w.terminate(); };
  };
  // auto stream
  var astrm = function (strm) {
      strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
      return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
  };
  // async stream attach
  var astrmify = function (fns, strm, opts, init, id) {
      var t;
      var w = wrkr(fns, init, id, function (err, dat) {
          if (err)
              w.terminate(), strm.ondata.call(strm, err);
          else {
              if (dat[1])
                  w.terminate();
              strm.ondata.call(strm, err, dat[0], dat[1]);
          }
      });
      w.postMessage(opts);
      strm.push = function (d, f) {
          if (!strm.ondata)
              err(5);
          if (t)
              strm.ondata(err(4, 0, 1), null, !!f);
          w.postMessage([d, t = f], [d.buffer]);
      };
      strm.terminate = function () { w.terminate(); };
  };
  // read 2 bytes
  var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
  // read 4 bytes
  var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
  var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
  // write bytes
  var wbytes = function (d, b, v) {
      for (; v; ++b)
          d[b] = v, v >>>= 8;
  };
  // gzip header
  var gzh = function (c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
      if (o.mtime != 0)
          wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
      if (fn) {
          c[3] = 8;
          for (var i = 0; i <= fn.length; ++i)
              c[i + 10] = fn.charCodeAt(i);
      }
  };
  // gzip footer: -8 to -4 = CRC, -4 to -0 is length
  // gzip start
  var gzs = function (d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          err(6, 'invalid gzip data');
      var flg = d[3];
      var st = 10;
      if (flg & 4)
          st += d[10] | (d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
      return st + (flg & 2);
  };
  // gzip length
  var gzl = function (d) {
      var l = d.length;
      return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
  };
  // gzip header length
  var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
  // zlib header
  var zlh = function (c, o) {
      var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
  };
  // zlib valid
  var zlv = function (d) {
      if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
          err(6, 'invalid zlib data');
      if (d[1] & 32)
          err(6, 'invalid zlib data: preset dictionaries not supported');
  };
  function AsyncCmpStrm(opts, cb) {
      if (!cb && typeof opts == 'function')
          cb = opts, opts = {};
      this.ondata = cb;
      return opts;
  }
  // zlib footer: -4 to -0 is Adler32
  /**
   * Streaming DEFLATE compression
   */
  var Deflate = /*#__PURE__*/ (function () {
      function Deflate(opts, cb) {
          if (!cb && typeof opts == 'function')
              cb = opts, opts = {};
          this.ondata = cb;
          this.o = opts || {};
      }
      Deflate.prototype.p = function (c, f) {
          this.ondata(dopt(c, this.o, 0, 0, !f), f);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Deflate.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.d = final;
          this.p(chunk, final || false);
      };
      return Deflate;
  }());
  exports.Deflate = Deflate;
  /**
   * Asynchronous streaming DEFLATE compression
   */
  var AsyncDeflate = /*#__PURE__*/ (function () {
      function AsyncDeflate(opts, cb) {
          astrmify([
              bDflt,
              function () { return [astrm, Deflate]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Deflate(ev.data);
              onmessage = astrm(strm);
          }, 6);
      }
      return AsyncDeflate;
  }());
  exports.AsyncDeflate = AsyncDeflate;
  function deflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
      ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
  }
  exports.deflate = deflate;
  /**
   * Compresses data with DEFLATE without any wrapper
   * @param data The data to compress
   * @param opts The compression options
   * @returns The deflated version of the data
   */
  function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
  }
  exports.deflateSync = deflateSync;
  /**
   * Streaming DEFLATE decompression
   */
  var Inflate = /*#__PURE__*/ (function () {
      /**
       * Creates an inflation stream
       * @param cb The callback to call whenever data is inflated
       */
      function Inflate(cb) {
          this.s = {};
          this.p = new u8(0);
          this.ondata = cb;
      }
      Inflate.prototype.e = function (c) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          var l = this.p.length;
          var n = new u8(l + c.length);
          n.set(this.p), n.set(c, l), this.p = n;
      };
      Inflate.prototype.c = function (final) {
          this.d = this.s.i = final || false;
          var bts = this.s.b;
          var dt = inflt(this.p, this.o, this.s);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
      };
      /**
       * Pushes a chunk to be inflated
       * @param chunk The chunk to push
       * @param final Whether this is the final chunk
       */
      Inflate.prototype.push = function (chunk, final) {
          this.e(chunk), this.c(final);
      };
      return Inflate;
  }());
  exports.Inflate = Inflate;
  /**
   * Asynchronous streaming DEFLATE decompression
   */
  var AsyncInflate = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous inflation stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncInflate(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              function () { return [astrm, Inflate]; }
          ], this, 0, function () {
              var strm = new Inflate();
              onmessage = astrm(strm);
          }, 7);
      }
      return AsyncInflate;
  }());
  exports.AsyncInflate = AsyncInflate;
  function inflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt
      ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
  }
  exports.inflate = inflate;
  /**
   * Expands DEFLATE data with no wrapper
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function inflateSync(data, out) {
      return inflt(data, out);
  }
  exports.inflateSync = inflateSync;
  // before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
  /**
   * Streaming GZIP compression
   */
  var Gzip = /*#__PURE__*/ (function () {
      function Gzip(opts, cb) {
          this.c = crc();
          this.l = 0;
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be GZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gzip.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip.prototype.p = function (c, f) {
          this.c.p(c);
          this.l += c.length;
          var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
          if (this.v)
              gzh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
          this.ondata(raw, f);
      };
      return Gzip;
  }());
  exports.Gzip = Gzip;
  exports.Compress = Gzip;
  /**
   * Asynchronous streaming GZIP compression
   */
  var AsyncGzip = /*#__PURE__*/ (function () {
      function AsyncGzip(opts, cb) {
          astrmify([
              bDflt,
              gze,
              function () { return [astrm, Deflate, Gzip]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Gzip(ev.data);
              onmessage = astrm(strm);
          }, 8);
      }
      return AsyncGzip;
  }());
  exports.AsyncGzip = AsyncGzip;
  exports.AsyncCompress = AsyncGzip;
  function gzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          gze,
          function () { return [gzipSync]; }
      ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
  }
  exports.gzip = gzip;
  exports.compress = gzip;
  /**
   * Compresses data with GZIP
   * @param data The data to compress
   * @param opts The compression options
   * @returns The gzipped version of the data
   */
  function gzipSync(data, opts) {
      if (!opts)
          opts = {};
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
  }
  exports.gzipSync = gzipSync;
  exports.compressSync = gzipSync;
  /**
   * Streaming GZIP decompression
   */
  var Gunzip = /*#__PURE__*/ (function () {
      /**
       * Creates a GUNZIP stream
       * @param cb The callback to call whenever data is inflated
       */
      function Gunzip(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be GUNZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gunzip.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              var s = this.p.length > 3 ? gzs(this.p) : 4;
              if (s >= this.p.length && !final)
                  return;
              this.p = this.p.subarray(s), this.v = 0;
          }
          if (final) {
              if (this.p.length < 8)
                  err(6, 'invalid gzip data');
              this.p = this.p.subarray(0, -8);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Gunzip;
  }());
  exports.Gunzip = Gunzip;
  /**
   * Asynchronous streaming GZIP decompression
   */
  var AsyncGunzip = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous GUNZIP stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncGunzip(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              guze,
              function () { return [astrm, Inflate, Gunzip]; }
          ], this, 0, function () {
              var strm = new Gunzip();
              onmessage = astrm(strm);
          }, 9);
      }
      return AsyncGunzip;
  }());
  exports.AsyncGunzip = AsyncGunzip;
  function gunzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          guze,
          function () { return [gunzipSync]; }
      ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
  }
  exports.gunzip = gunzip;
  /**
   * Expands GZIP data
   * @param data The data to decompress
   * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
   * @returns The decompressed version of the data
   */
  function gunzipSync(data, out) {
      return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
  }
  exports.gunzipSync = gunzipSync;
  /**
   * Streaming Zlib compression
   */
  var Zlib = /*#__PURE__*/ (function () {
      function Zlib(opts, cb) {
          this.c = adler();
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be zlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Zlib.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib.prototype.p = function (c, f) {
          this.c.p(c);
          var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
          if (this.v)
              zlh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 4, this.c.d());
          this.ondata(raw, f);
      };
      return Zlib;
  }());
  exports.Zlib = Zlib;
  /**
   * Asynchronous streaming Zlib compression
   */
  var AsyncZlib = /*#__PURE__*/ (function () {
      function AsyncZlib(opts, cb) {
          astrmify([
              bDflt,
              zle,
              function () { return [astrm, Deflate, Zlib]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Zlib(ev.data);
              onmessage = astrm(strm);
          }, 10);
      }
      return AsyncZlib;
  }());
  exports.AsyncZlib = AsyncZlib;
  function zlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          zle,
          function () { return [zlibSync]; }
      ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
  }
  exports.zlib = zlib;
  /**
   * Compress data with Zlib
   * @param data The data to compress
   * @param opts The compression options
   * @returns The zlib-compressed version of the data
   */
  function zlibSync(data, opts) {
      if (!opts)
          opts = {};
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
  }
  exports.zlibSync = zlibSync;
  /**
   * Streaming Zlib decompression
   */
  var Unzlib = /*#__PURE__*/ (function () {
      /**
       * Creates a Zlib decompression stream
       * @param cb The callback to call whenever data is inflated
       */
      function Unzlib(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be unzlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzlib.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              if (this.p.length < 2 && !final)
                  return;
              this.p = this.p.subarray(2), this.v = 0;
          }
          if (final) {
              if (this.p.length < 4)
                  err(6, 'invalid zlib data');
              this.p = this.p.subarray(0, -4);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Unzlib;
  }());
  exports.Unzlib = Unzlib;
  /**
   * Asynchronous streaming Zlib decompression
   */
  var AsyncUnzlib = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous Zlib decompression stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncUnzlib(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              zule,
              function () { return [astrm, Inflate, Unzlib]; }
          ], this, 0, function () {
              var strm = new Unzlib();
              onmessage = astrm(strm);
          }, 11);
      }
      return AsyncUnzlib;
  }());
  exports.AsyncUnzlib = AsyncUnzlib;
  function unzlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          zule,
          function () { return [unzlibSync]; }
      ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
  }
  exports.unzlib = unzlib;
  /**
   * Expands Zlib data
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function unzlibSync(data, out) {
      return inflt((zlv(data), data.subarray(2, -4)), out);
  }
  exports.unzlibSync = unzlibSync;
  /**
   * Streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var Decompress = /*#__PURE__*/ (function () {
      /**
       * Creates a decompression stream
       * @param cb The callback to call whenever data is decompressed
       */
      function Decompress(cb) {
          this.G = Gunzip;
          this.I = Inflate;
          this.Z = Unzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Decompress.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (!this.s) {
              if (this.p && this.p.length) {
                  var n = new u8(this.p.length + chunk.length);
                  n.set(this.p), n.set(chunk, this.p.length);
              }
              else
                  this.p = chunk;
              if (this.p.length > 2) {
                  var _this_1 = this;
                  var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                  this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                      ? new this.G(cb)
                      : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                          ? new this.I(cb)
                          : new this.Z(cb);
                  this.s.push(this.p, final);
                  this.p = null;
              }
          }
          else
              this.s.push(chunk, final);
      };
      return Decompress;
  }());
  exports.Decompress = Decompress;
  /**
   * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var AsyncDecompress = /*#__PURE__*/ (function () {
      /**
     * Creates an asynchronous decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
      function AsyncDecompress(cb) {
          this.G = AsyncGunzip;
          this.I = AsyncInflate;
          this.Z = AsyncUnzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncDecompress.prototype.push = function (chunk, final) {
          Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress;
  }());
  exports.AsyncDecompress = AsyncDecompress;
  function decompress(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzip(data, opts, cb)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflate(data, opts, cb)
              : unzlib(data, opts, cb);
  }
  exports.decompress = decompress;
  /**
   * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function decompressSync(data, out) {
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzipSync(data, out)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflateSync(data, out)
              : unzlibSync(data, out);
  }
  exports.decompressSync = decompressSync;
  // flatten a directory structure
  var fltn = function (d, p, t, o) {
      for (var k in d) {
          var val = d[k], n = p + k, op = o;
          if (Array.isArray(val))
              op = mrg(o, val[1]), val = val[0];
          if (val instanceof u8)
              t[n] = [val, op];
          else {
              t[n += '/'] = [new u8(0), op];
              fltn(val, n, t, o);
          }
      }
  };
  // text encoder
  var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
  // text decoder
  var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
  // text decoder stream
  var tds = 0;
  try {
      td.decode(et, { stream: true });
      tds = 1;
  }
  catch (e) { }
  // decode UTF8
  var dutf8 = function (d) {
      for (var r = '', i = 0;;) {
          var c = d[i++];
          var eb = (c > 127) + (c > 223) + (c > 239);
          if (i + eb > d.length)
              return [r, slc(d, i - 1)];
          if (!eb)
              r += String.fromCharCode(c);
          else if (eb == 3) {
              c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                  r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
          }
          else if (eb & 1)
              r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
          else
              r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
      }
  };
  /**
   * Streaming UTF-8 decoding
   */
  var DecodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is decoded
       */
      function DecodeUTF8(cb) {
          this.ondata = cb;
          if (tds)
              this.t = new TextDecoder();
          else
              this.p = et;
      }
      /**
       * Pushes a chunk to be decoded from UTF-8 binary
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      DecodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          final = !!final;
          if (this.t) {
              this.ondata(this.t.decode(chunk, { stream: true }), final);
              if (final) {
                  if (this.t.decode().length)
                      err(8);
                  this.t = null;
              }
              return;
          }
          if (!this.p)
              err(4);
          var dat = new u8(this.p.length + chunk.length);
          dat.set(this.p);
          dat.set(chunk, this.p.length);
          var _a = dutf8(dat), ch = _a[0], np = _a[1];
          if (final) {
              if (np.length)
                  err(8);
              this.p = null;
          }
          else
              this.p = np;
          this.ondata(ch, final);
      };
      return DecodeUTF8;
  }());
  exports.DecodeUTF8 = DecodeUTF8;
  /**
   * Streaming UTF-8 encoding
   */
  var EncodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is encoded
       */
      function EncodeUTF8(cb) {
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be encoded to UTF-8
       * @param chunk The string data to push
       * @param final Whether this is the last chunk
       */
      EncodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF8;
  }());
  exports.EncodeUTF8 = EncodeUTF8;
  /**
   * Converts a string into a Uint8Array for use with compression/decompression methods
   * @param str The string to encode
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless decoding a binary string.
   * @returns The string encoded in UTF-8/Latin-1 binary
   */
  function strToU8(str, latin1) {
      if (latin1) {
          var ar_1 = new u8(str.length);
          for (var i = 0; i < str.length; ++i)
              ar_1[i] = str.charCodeAt(i);
          return ar_1;
      }
      if (te)
          return te.encode(str);
      var l = str.length;
      var ar = new u8(str.length + (str.length >> 1));
      var ai = 0;
      var w = function (v) { ar[ai++] = v; };
      for (var i = 0; i < l; ++i) {
          if (ai + 5 > ar.length) {
              var n = new u8(ai + 8 + ((l - i) << 1));
              n.set(ar);
              ar = n;
          }
          var c = str.charCodeAt(i);
          if (c < 128 || latin1)
              w(c);
          else if (c < 2048)
              w(192 | (c >> 6)), w(128 | (c & 63));
          else if (c > 55295 && c < 57344)
              c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                  w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
          else
              w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
      }
      return slc(ar, 0, ai);
  }
  exports.strToU8 = strToU8;
  /**
   * Converts a Uint8Array to a string
   * @param dat The data to decode to string
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless encoding to binary string.
   * @returns The original UTF-8/Latin-1 string
   */
  function strFromU8(dat, latin1) {
      if (latin1) {
          var r = '';
          for (var i = 0; i < dat.length; i += 16384)
              r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
          return r;
      }
      else if (td)
          return td.decode(dat);
      else {
          var _a = dutf8(dat), out = _a[0], ext = _a[1];
          if (ext.length)
              err(8);
          return out;
      }
  }
  exports.strFromU8 = strFromU8;
  ;
  // deflate bit flag
  var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
  // skip local zip header
  var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
  // read zip header
  var zh = function (d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  // read zip64 extra field
  var z64e = function (d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
          ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  // extra field length
  var exfl = function (ex) {
      var le = 0;
      if (ex) {
          for (var k in ex) {
              var l = ex[k].length;
              if (l > 65535)
                  err(9);
              le += l + 4;
          }
      }
      return le;
  };
  // write zip header
  var wzh = function (d, b, f, fn, u, c, ce, co) {
      var fl = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
      if (ce != null)
          d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2; // spec compliance? what's that?
      d[b++] = (f.flag << 1) | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
          err(10);
      wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
      if (c != -1) {
          wbytes(d, b, f.crc);
          wbytes(d, b + 4, c < 0 ? -c - 2 : c);
          wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
          wbytes(d, b, col);
          wbytes(d, b + 6, f.attrs);
          wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl;
      if (exl) {
          for (var k in ex) {
              var exf = ex[k], l = exf.length;
              wbytes(d, b, +k);
              wbytes(d, b + 2, l);
              d.set(exf, b + 4), b += 4 + l;
          }
      }
      if (col)
          d.set(co, b), b += col;
      return b;
  };
  // write zip footer (end of central directory)
  var wzf = function (o, b, c, d, e) {
      wbytes(o, b, 0x6054B50); // skip disk
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
  };
  /**
   * A pass-through stream to keep data uncompressed in a ZIP archive.
   */
  var ZipPassThrough = /*#__PURE__*/ (function () {
      /**
       * Creates a pass-through stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       */
      function ZipPassThrough(filename) {
          this.filename = filename;
          this.c = crc();
          this.size = 0;
          this.compression = 0;
      }
      /**
       * Processes a chunk and pushes to the output stream. You can override this
       * method in a subclass for custom behavior, but by default this passes
       * the data through. You must call this.ondata(err, chunk, final) at some
       * point in this method.
       * @param chunk The chunk to process
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.process = function (chunk, final) {
          this.ondata(null, chunk, final);
      };
      /**
       * Pushes a chunk to be added. If you are subclassing this with a custom
       * compression algorithm, note that you must push data from the source
       * file only, pre-compression.
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          this.c.p(chunk);
          this.size += chunk.length;
          if (final)
              this.crc = this.c.d();
          this.process(chunk, final || false);
      };
      return ZipPassThrough;
  }());
  exports.ZipPassThrough = ZipPassThrough;
  // I don't extend because TypeScript extension adds 1kB of runtime bloat
  /**
   * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
   * for better performance
   */
  var ZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function ZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new Deflate(opts, function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
      }
      ZipDeflate.prototype.process = function (chunk, final) {
          try {
              this.d.push(chunk, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate;
  }());
  exports.ZipDeflate = ZipDeflate;
  /**
   * Asynchronous streaming DEFLATE compression for ZIP archives
   */
  var AsyncZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function AsyncZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new AsyncDeflate(opts, function (err, dat, final) {
              _this_1.ondata(err, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
          this.terminate = this.d.terminate;
      }
      AsyncZipDeflate.prototype.process = function (chunk, final) {
          this.d.push(chunk, final);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate;
  }());
  exports.AsyncZipDeflate = AsyncZipDeflate;
  // TODO: Better tree shaking
  /**
   * A zippable archive to which files can incrementally be added
   */
  var Zip = /*#__PURE__*/ (function () {
      /**
       * Creates an empty ZIP archive to which files can be added
       * @param cb The callback to call whenever data for the generated ZIP archive
       *           is available
       */
      function Zip(cb) {
          this.ondata = cb;
          this.u = [];
          this.d = 1;
      }
      /**
       * Adds a file to the ZIP archive
       * @param file The file stream to add
       */
      Zip.prototype.add = function (file) {
          var _this_1 = this;
          if (!this.ondata)
              err(5);
          // finishing or finished
          if (this.d & 2)
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
          else {
              var f = strToU8(file.filename), fl_1 = f.length;
              var com = file.comment, o = com && strToU8(com);
              var u = fl_1 != file.filename.length || (o && (com.length != o.length));
              var hl_1 = fl_1 + exfl(file.extra) + 30;
              if (fl_1 > 65535)
                  this.ondata(err(11, 0, 1), null, false);
              var header = new u8(hl_1);
              wzh(header, 0, file, f, u, -1);
              var chks_1 = [header];
              var pAll_1 = function () {
                  for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                      var chk = chks_2[_i];
                      _this_1.ondata(null, chk, false);
                  }
                  chks_1 = [];
              };
              var tr_1 = this.d;
              this.d = 0;
              var ind_1 = this.u.length;
              var uf_1 = mrg(file, {
                  f: f,
                  u: u,
                  o: o,
                  t: function () {
                      if (file.terminate)
                          file.terminate();
                  },
                  r: function () {
                      pAll_1();
                      if (tr_1) {
                          var nxt = _this_1.u[ind_1 + 1];
                          if (nxt)
                              nxt.r();
                          else
                              _this_1.d = 1;
                      }
                      tr_1 = 1;
                  }
              });
              var cl_1 = 0;
              file.ondata = function (err, dat, final) {
                  if (err) {
                      _this_1.ondata(err, dat, final);
                      _this_1.terminate();
                  }
                  else {
                      cl_1 += dat.length;
                      chks_1.push(dat);
                      if (final) {
                          var dd = new u8(16);
                          wbytes(dd, 0, 0x8074B50);
                          wbytes(dd, 4, file.crc);
                          wbytes(dd, 8, cl_1);
                          wbytes(dd, 12, file.size);
                          chks_1.push(dd);
                          uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                          if (tr_1)
                              uf_1.r();
                          tr_1 = 1;
                      }
                      else if (tr_1)
                          pAll_1();
                  }
              };
              this.u.push(uf_1);
          }
      };
      /**
       * Ends the process of adding files and prepares to emit the final chunks.
       * This *must* be called after adding all desired files for the resulting
       * ZIP file to work properly.
       */
      Zip.prototype.end = function () {
          var _this_1 = this;
          if (this.d & 2) {
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
              return;
          }
          if (this.d)
              this.e();
          else
              this.u.push({
                  r: function () {
                      if (!(_this_1.d & 1))
                          return;
                      _this_1.u.splice(-1, 1);
                      _this_1.e();
                  },
                  t: function () { }
              });
          this.d = 3;
      };
      Zip.prototype.e = function () {
          var bt = 0, l = 0, tl = 0;
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
          }
          var out = new u8(tl + 22);
          for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
              var f = _c[_b];
              wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
              bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
          }
          wzf(out, bt, this.u.length, tl, l);
          this.ondata(null, out, true);
          this.d = 2;
      };
      /**
       * A method to terminate any internal workers used by the stream. Subsequent
       * calls to add() will fail.
       */
      Zip.prototype.terminate = function () {
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              f.t();
          }
          this.d = 2;
      };
      return Zip;
  }());
  exports.Zip = Zip;
  function zip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var r = {};
      fltn(data, '', r, opts);
      var k = Object.keys(r);
      var lft = k.length, o = 0, tot = 0;
      var slft = lft, files = new Array(lft);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var cbf = function () {
          var out = new u8(tot + 22), oe = o, cdl = tot - o;
          tot = 0;
          for (var i = 0; i < slft; ++i) {
              var f = files[i];
              try {
                  var l = f.c.length;
                  wzh(out, tot, f, f.f, f.u, l);
                  var badd = 30 + f.f.length + exfl(f.extra);
                  var loc = tot + badd;
                  out.set(f.c, loc);
                  wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
              }
              catch (e) {
                  return cbd(e, null);
              }
          }
          wzf(out, o, files.length, cdl, oe);
          cbd(null, out);
      };
      if (!lft)
          cbf();
      var _loop_1 = function (i) {
          var fn = k[i];
          var _a = r[fn], file = _a[0], p = _a[1];
          var c = crc(), size = file.length;
          c.p(file);
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          var compression = p.level == 0 ? 0 : 8;
          var cbl = function (e, d) {
              if (e) {
                  tAll();
                  cbd(e, null);
              }
              else {
                  var l = d.length;
                  files[i] = mrg(p, {
                      size: size,
                      crc: c.d(),
                      c: d,
                      f: f,
                      m: m,
                      u: s != fn.length || (m && (com.length != ms)),
                      compression: compression
                  });
                  o += 30 + s + exl + l;
                  tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                  if (!--lft)
                      cbf();
              }
          };
          if (s > 65535)
              cbl(err(11, 0, 1), null);
          if (!compression)
              cbl(null, file);
          else if (size < 160000) {
              try {
                  cbl(null, deflateSync(file, p));
              }
              catch (e) {
                  cbl(e, null);
              }
          }
          else
              term.push(deflate(file, p, cbl));
      };
      // Cannot use lft because it can decrease
      for (var i = 0; i < slft; ++i) {
          _loop_1(i);
      }
      return tAll;
  }
  exports.zip = zip;
  /**
   * Synchronously creates a ZIP file. Prefer using `zip` for better performance
   * with more than one file.
   * @param data The directory structure for the ZIP archive
   * @param opts The main options, merged with per-file options
   * @returns The generated ZIP archive
   */
  function zipSync(data, opts) {
      if (!opts)
          opts = {};
      var r = {};
      var files = [];
      fltn(data, '', r, opts);
      var o = 0;
      var tot = 0;
      for (var fn in r) {
          var _a = r[fn], file = _a[0], p = _a[1];
          var compression = p.level == 0 ? 0 : 8;
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          if (s > 65535)
              err(11);
          var d = compression ? deflateSync(file, p) : file, l = d.length;
          var c = crc();
          c.p(file);
          files.push(mrg(p, {
              size: file.length,
              crc: c.d(),
              c: d,
              f: f,
              m: m,
              u: s != fn.length || (m && (com.length != ms)),
              o: o,
              compression: compression
          }));
          o += 30 + s + exl + l;
          tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      var out = new u8(tot + 22), oe = o, cdl = tot - o;
      for (var i = 0; i < files.length; ++i) {
          var f = files[i];
          wzh(out, f.o, f, f.f, f.u, f.c.length);
          var badd = 30 + f.f.length + exfl(f.extra);
          out.set(f.c, f.o + badd);
          wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      wzf(out, o, files.length, cdl, oe);
      return out;
  }
  exports.zipSync = zipSync;
  /**
   * Streaming pass-through decompression for ZIP archives
   */
  var UnzipPassThrough = /*#__PURE__*/ (function () {
      function UnzipPassThrough() {
      }
      UnzipPassThrough.prototype.push = function (data, final) {
          this.ondata(null, data, final);
      };
      UnzipPassThrough.compression = 0;
      return UnzipPassThrough;
  }());
  exports.UnzipPassThrough = UnzipPassThrough;
  /**
   * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
   * better performance.
   */
  var UnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function UnzipInflate() {
          var _this_1 = this;
          this.i = new Inflate(function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
      }
      UnzipInflate.prototype.push = function (data, final) {
          try {
              this.i.push(data, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      UnzipInflate.compression = 8;
      return UnzipInflate;
  }());
  exports.UnzipInflate = UnzipInflate;
  /**
   * Asynchronous streaming DEFLATE decompression for ZIP archives
   */
  var AsyncUnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function AsyncUnzipInflate(_, sz) {
          var _this_1 = this;
          if (sz < 320000) {
              this.i = new Inflate(function (dat, final) {
                  _this_1.ondata(null, dat, final);
              });
          }
          else {
              this.i = new AsyncInflate(function (err, dat, final) {
                  _this_1.ondata(err, dat, final);
              });
              this.terminate = this.i.terminate;
          }
      }
      AsyncUnzipInflate.prototype.push = function (data, final) {
          if (this.i.terminate)
              data = slc(data, 0);
          this.i.push(data, final);
      };
      AsyncUnzipInflate.compression = 8;
      return AsyncUnzipInflate;
  }());
  exports.AsyncUnzipInflate = AsyncUnzipInflate;
  /**
   * A ZIP archive decompression stream that emits files as they are discovered
   */
  var Unzip = /*#__PURE__*/ (function () {
      /**
       * Creates a ZIP decompression stream
       * @param cb The callback to call whenever a file in the ZIP archive is found
       */
      function Unzip(cb) {
          this.onfile = cb;
          this.k = [];
          this.o = {
              0: UnzipPassThrough
          };
          this.p = et;
      }
      /**
       * Pushes a chunk to be unzipped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzip.prototype.push = function (chunk, final) {
          var _this_1 = this;
          if (!this.onfile)
              err(5);
          if (!this.p)
              err(4);
          if (this.c > 0) {
              var len = Math.min(this.c, chunk.length);
              var toAdd = chunk.subarray(0, len);
              this.c -= len;
              if (this.d)
                  this.d.push(toAdd, !this.c);
              else
                  this.k[0].push(toAdd);
              chunk = chunk.subarray(len);
              if (chunk.length)
                  return this.push(chunk, final);
          }
          else {
              var f = 0, i = 0, is = void 0, buf = void 0;
              if (!this.p.length)
                  buf = chunk;
              else if (!chunk.length)
                  buf = this.p;
              else {
                  buf = new u8(this.p.length + chunk.length);
                  buf.set(this.p), buf.set(chunk, this.p.length);
              }
              var l = buf.length, oc = this.c, add = oc && this.d;
              var _loop_2 = function () {
                  var _a;
                  var sig = b4(buf, i);
                  if (sig == 0x4034B50) {
                      f = 1, is = i;
                      this_1.d = null;
                      this_1.c = 0;
                      var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                      if (l > i + 30 + fnl + es) {
                          var chks_3 = [];
                          this_1.k.unshift(chks_3);
                          f = 2;
                          var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                          var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                          if (sc_1 == 4294967295) {
                              _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                          }
                          else if (dd)
                              sc_1 = -1;
                          i += es;
                          this_1.c = sc_1;
                          var d_1;
                          var file_1 = {
                              name: fn_1,
                              compression: cmp_1,
                              start: function () {
                                  if (!file_1.ondata)
                                      err(5);
                                  if (!sc_1)
                                      file_1.ondata(null, et, true);
                                  else {
                                      var ctr = _this_1.o[cmp_1];
                                      if (!ctr)
                                          file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                      d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                          var dat = chks_4[_i];
                                          d_1.push(dat, false);
                                      }
                                      if (_this_1.k[0] == chks_3 && _this_1.c)
                                          _this_1.d = d_1;
                                      else
                                          d_1.push(et, true);
                                  }
                              },
                              terminate: function () {
                                  if (d_1 && d_1.terminate)
                                      d_1.terminate();
                              }
                          };
                          if (sc_1 >= 0)
                              file_1.size = sc_1, file_1.originalSize = su_1;
                          this_1.onfile(file_1);
                      }
                      return "break";
                  }
                  else if (oc) {
                      if (sig == 0x8074B50) {
                          is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                          return "break";
                      }
                      else if (sig == 0x2014B50) {
                          is = i -= 4, f = 3, this_1.c = 0;
                          return "break";
                      }
                  }
              };
              var this_1 = this;
              for (; i < l - 4; ++i) {
                  var state_1 = _loop_2();
                  if (state_1 === "break")
                      break;
              }
              this.p = et;
              if (oc < 0) {
                  var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                  if (add)
                      add.push(dat, !!f);
                  else
                      this.k[+(f == 2)].push(dat);
              }
              if (f & 2)
                  return this.push(buf.subarray(i), final);
              this.p = buf.subarray(i);
          }
          if (final) {
              if (this.c)
                  err(13);
              this.p = null;
          }
      };
      /**
       * Registers a decoder with the stream, allowing for files compressed with
       * the compression type provided to be expanded correctly
       * @param decoder The decoder constructor
       */
      Unzip.prototype.register = function (decoder) {
          this.o[decoder.compression] = decoder;
      };
      return Unzip;
  }());
  exports.Unzip = Unzip;
  var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
  function unzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var files = {};
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558) {
              cbd(err(13, 0, 1), null);
              return tAll;
          }
      }
      ;
      var lft = b2(data, e + 8);
      if (lft) {
          var c = lft;
          var o = b4(data, e + 16);
          var z = o == 4294967295 || c == 65535;
          if (z) {
              var ze = b4(data, e - 12);
              z = b4(data, ze) == 0x6064B50;
              if (z) {
                  c = lft = b4(data, ze + 32);
                  o = b4(data, ze + 48);
              }
          }
          var fltr = opts && opts.filter;
          var _loop_3 = function (i) {
              var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
              o = no;
              var cbl = function (e, d) {
                  if (e) {
                      tAll();
                      cbd(e, null);
                  }
                  else {
                      if (d)
                          files[fn] = d;
                      if (!--lft)
                          cbd(null, files);
                  }
              };
              if (!fltr || fltr({
                  name: fn,
                  size: sc,
                  originalSize: su,
                  compression: c_1
              })) {
                  if (!c_1)
                      cbl(null, slc(data, b, b + sc));
                  else if (c_1 == 8) {
                      var infl = data.subarray(b, b + sc);
                      if (sc < 320000) {
                          try {
                              cbl(null, inflateSync(infl, new u8(su)));
                          }
                          catch (e) {
                              cbl(e, null);
                          }
                      }
                      else
                          term.push(inflate(infl, { size: su }, cbl));
                  }
                  else
                      cbl(err(14, 'unknown compression type ' + c_1, 1), null);
              }
              else
                  cbl(null, null);
          };
          for (var i = 0; i < c; ++i) {
              _loop_3(i);
          }
      }
      else
          cbd(null, {});
      return tAll;
  }
  exports.unzip = unzip;
  /**
   * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
   * performance with more than one file.
   * @param data The raw compressed ZIP file
   * @param opts The ZIP extraction options
   * @returns The decompressed files
   */
  function unzipSync(data, opts) {
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558)
              err(13);
      }
      ;
      var c = b2(data, e + 8);
      if (!c)
          return {};
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
          var ze = b4(data, e - 12);
          z = b4(data, ze) == 0x6064B50;
          if (z) {
              c = b4(data, ze + 32);
              o = b4(data, ze + 48);
          }
      }
      var fltr = opts && opts.filter;
      for (var i = 0; i < c; ++i) {
          var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
          o = no;
          if (!fltr || fltr({
              name: fn,
              size: sc,
              originalSize: su,
              compression: c_2
          })) {
              if (!c_2)
                  files[fn] = slc(data, b, b + sc);
              else if (c_2 == 8)
                  files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
              else
                  err(14, 'unknown compression type ' + c_2);
          }
      }
      return files;
  }
  exports.unzipSync = unzipSync;
  

});

;/*!node_modules/ooxml-viewer/lib/package/ZipPackageParser.js*/
amis.define("node_modules/ooxml-viewer/lib/package/ZipPackageParser",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("node_modules/fflate/lib/index.cjs"),o=function(){function e(){}return e.prototype.load=function(e){this.zip=i.unzipSync(new Uint8Array(e))},e.prototype.getXML=function(e){var t=this.getFileByType(e,"string"),r=(new DOMParser).parseFromString(t,"application/xml"),n=r.getElementsByTagName("parsererror").item(0);if(n)throw new Error(n.textContent||"can't parse xml");return r},e.prototype.getFileByType=function(e,t){e=e.startsWith("/")?e.slice(1):e;var r=this.zip[e];if(r){if("string"===t)return i.strFromU8(r);if("blob"===t)return new Blob([r]);if("uint8array"===t)return r}return console.warn("getFileByType",e,"not found"),null},e.prototype.fileExists=function(e){return(e=e.startsWith("/")?e.slice(1):e)in this.zip},e.prototype.generateZip=function(e){return this.zip["word/document.xml"]=i.strToU8(e),new Blob([i.zipSync(this.zip)])},e}();t.default=o}));
;/*!node_modules/ooxml-viewer/lib/render/renderFont.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderFont",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),o=e("node_modules/ooxml-viewer/lib/util/dom");n.renderFont=function(e){var n,r;if(!e)return null;var t=e.fonts;if(!t||!t.length)return null;var a=o.createElement("style"),i="/** embedded fonts **/";try{for(var u=l.__values(e.fonts),d=u.next();!d.done;d=u.next()){var f=d.value,c=f.name.replace(/['\\]/g,""),s=f.url;c&&s&&(i+="\n      @font-face {\n        font-family: '".concat(c,"';\n        src: url('").concat(s,"');\n      }\n      "))}}catch(e){n={error:e}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}return a.innerHTML=i,a}}));
;/*!node_modules/ooxml-viewer/lib/util/createObject.js*/
amis.define("node_modules/ooxml-viewer/lib/util/createObject",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=e("node_modules/tslib/tslib");function u(e,t){void 0===t&&(t=!0);var r=e&&e.__super?Object.create(e.__super,{__super:{value:e.__super,writable:!1,enumerable:!1}}):Object.create(Object.prototype);return t&&e&&Object.keys(e).forEach((function(t){return r[t]=e[t]})),r}function o(e){var t=typeof e;return e&&"string"!==t&&"number"!==t&&"boolean"!==t&&"function"!==t&&!Array.isArray(e)}t.cloneObject=u,t.createObject=function(e,t,r){e&&Object.isFrozen(e)&&(e=u(e));var n=e?Object.create(e,c.__assign(c.__assign({},r),{__super:{value:e,writable:!1,enumerable:!1}})):Object.create(Object.prototype,r);return t&&o(t)&&Object.keys(t).forEach((function(e){return n[e]=t[e]})),n},t.isObject=o}));
;/*!node_modules/ooxml-viewer/lib/util/replaceVar.js*/
amis.define("node_modules/ooxml-viewer/lib/util/replaceVar",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/util/createObject");function o(e,r,t){var a=r.textContent||"",n=e.renderOptions.evalVar;if(a.startsWith("{{")){a=a.replace(/^{{/g,"").replace(/}}$/g,"");var l=String(n(a,t))||"";r.textContent=l}}function i(e,r){var t,a,i,v,f,u,d,y,s=e.renderOptions.evalVar,x=e.renderOptions.data,m=r.parentNode,h=r.getElementsByTagName("w:tc"),_=!1,g=[];try{for(var p=n.__values(h),w=p.next();!w.done;w=p.next()){var b=w.value.getElementsByTagName("w:t");try{for(var C=(i=void 0,n.__values(b)),N=C.next();!N.done;N=C.next()){var O=($=N.value).textContent||"";if(O.startsWith("{{#")){var E=/{{#([^\}]+)}}/.exec(O);if(E&&E.length>0){_=!0;var T=E[1],B=s(T,x);Array.isArray(B)&&(g=B),$.textContent=$.textContent.replace("{{#".concat(T,"}}"),"")}}O.indexOf("{{/}}")&&($.textContent=$.textContent.replace("{{/}}",""))}}catch(e){i={error:e}}finally{try{N&&!N.done&&(v=C.return)&&v.call(C)}finally{if(i)throw i.error}}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(a=p.return)&&a.call(p)}finally{if(t)throw t.error}}if(_){try{for(var V=n.__values(g),j=V.next();!j.done;j=V.next()){var A=j.value,S=c(r),W=(b=S.getElementsByTagName("w:t"),l.createObject(x,A));try{for(var M=(d=void 0,n.__values(b)),P=M.next();!P.done;P=M.next()){var $;o(e,$=P.value,W)}}catch(e){d={error:e}}finally{try{P&&!P.done&&(y=M.return)&&y.call(M)}finally{if(d)throw d.error}}m.appendChild(S)}}catch(e){f={error:e}}finally{try{j&&!j.done&&(u=V.return)&&u.call(V)}finally{if(f)throw f.error}}m.removeChild(r)}}function c(e){var r,t,a,l,o,i=e.cloneNode(!0);v(i);var c=[].slice.call(i.getElementsByTagName("w:p"));try{for(var f=n.__values(c),u=f.next();!u.done;u=f.next()){v(u.value)}}catch(e){r={error:e}}finally{try{u&&!u.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}var d=[].slice.call(i.getElementsByTagName("w:cnfStyle"));try{for(var y=n.__values(d),s=y.next();!s.done;s=y.next()){var x=s.value;null===(o=x.parentElement)||void 0===o||o.removeChild(x)}}catch(e){a={error:e}}finally{try{s&&!s.done&&(l=y.return)&&l.call(y)}finally{if(a)throw a.error}}return i}function v(e){for(;e.attributes.length>0;)e.removeAttributeNode(e.attributes[0])}r.replaceT=o,r.replaceVar=function(e,r){!function(e,r){var t,a;e.renderOptions.evalVar;var l=[].slice.call(r.getElementsByTagName("w:tr"));try{for(var o=n.__values(l),c=o.next();!c.done;c=o.next())i(e,c.value)}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=o.return)&&a.call(o)}finally{if(t)throw t.error}}}(e,r)}}));
;/*!node_modules/ooxml-viewer/lib/openxml/word/Note.js*/
amis.define("node_modules/ooxml-viewer/lib/openxml/word/Note",(function(e,r,o,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/parse/parseTable"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),i=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,o){var a,i,d=new e;try{for(var s=n.__values(o.children),u=s.next();!u.done;u=s.next()){var c=u.value,f=c.tagName;switch(f){case"w:p":var h=t.Paragraph.fromXML(r,c);d.addChild(h);break;case"w:tbl":var m=l.parseTable(r,c);d.addChild(m);break;default:console.warn("Note.fromXML unknown tag",f,c)}}}catch(e){a={error:e}}finally{try{u&&!u.done&&(i=s.return)&&i.call(s)}finally{if(a)throw a.error}}return d},e}();r.Note=i}));
;/*!node_modules/ooxml-viewer/lib/parse/Footnotes.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/Footnotes",(function(e,o,t,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),n=e("node_modules/ooxml-viewer/lib/openxml/word/Note");o.parseFootnotes=function(e,o){var t,r,i={},a=[].slice.call(o.getElementsByTagName("w:footnote"));try{for(var s=l.__values(a),d=s.next();!d.done;d=s.next()){var u=d.value,f=n.Note.fromXML(e,u);i[u.getAttribute("w:id")]=f}}catch(e){t={error:e}}finally{try{d&&!d.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return i}}));
;/*!node_modules/ooxml-viewer/lib/parse/parseEndnotes.js*/
amis.define("node_modules/ooxml-viewer/lib/parse/parseEndnotes",(function(e,r,o,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),l=e("node_modules/ooxml-viewer/lib/openxml/word/Note");r.parseEndnotes=function(e,r){var o,t,a={},i=[].slice.call(r.getElementsByTagName("w:endnote"));try{for(var s=n.__values(i),d=s.next();!d.done;d=s.next()){var u=d.value,m=l.Note.fromXML(e,u);a[u.getAttribute("w:id")]=m}}catch(e){o={error:e}}finally{try{d&&!d.done&&(t=s.return)&&t.call(s)}finally{if(o)throw o.error}}return a}}));
;/*!node_modules/ooxml-viewer/lib/render/renderNotes.js*/
amis.define("node_modules/ooxml-viewer/lib/render/renderNotes",(function(e,o,r,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var l=e("node_modules/tslib/tslib"),d=e("node_modules/ooxml-viewer/lib/openxml/word/Paragraph"),t=e("node_modules/ooxml-viewer/lib/openxml/word/Table"),i=e("node_modules/ooxml-viewer/lib/util/dom"),a=e("node_modules/ooxml-viewer/lib/render/renderParagraph"),f=e("node_modules/ooxml-viewer/lib/render/renderTable");function s(e,o,r,n,s){var u,m,v=s.children,c=i.createElement("div"),b=i.createElement("a"),h=r+"-"+n;b.name=h,b.id=h,o.appendChild(c);try{for(var p=l.__values(v),w=p.next();!w.done;w=p.next()){var _=w.value;if(_ instanceof d.Paragraph){var x=a.default(e,_);i.appendChild(c,x)}else _ instanceof t.Table?i.appendChild(c,f.default(e,_)):console.warn("unknown child",_)}}catch(e){u={error:e}}finally{try{w&&!w.done&&(m=p.return)&&m.call(p)}finally{if(u)throw u.error}}}function u(e){if(!e)return!1;for(var o in e)if("0"!==o&&"-1"!==o)return!0;return!1}o.renderNotes=function(e){var o=i.createElement("div");if(u(e.footNotes))for(var r in e.footNotes)s(e,o,"footnote",r,e.footNotes[r]);if(u(e.endNotes))for(var r in e.endNotes||{})s(e,o,"endnote",r,e.endNotes[r]);return o.children.length?o:null}}));
;/*!node_modules/ooxml-viewer/lib/Word.js*/
amis.define("node_modules/ooxml-viewer/lib/Word",(function(e,t,r,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("node_modules/tslib/tslib"),i=e("node_modules/ooxml-viewer/lib/openxml/word/FontTable"),s=e("node_modules/ooxml-viewer/lib/parse/parseRelationship"),a=e("node_modules/ooxml-viewer/lib/openxml/ContentType"),l=e("node_modules/ooxml-viewer/lib/openxml/Style"),d=e("node_modules/ooxml-viewer/lib/openxml/Theme"),p=e("node_modules/ooxml-viewer/lib/render/renderDocument"),h=e("node_modules/ooxml-viewer/lib/util/blob"),u=e("node_modules/ooxml-viewer/lib/openxml/word/numbering/Numbering"),m=e("node_modules/ooxml-viewer/lib/util/dom"),c=e("node_modules/ooxml-viewer/lib/render/renderStyle"),g=e("node_modules/ooxml-viewer/lib/util/mergeRun"),v=e("node_modules/ooxml-viewer/lib/openxml/word/WDocument"),f=e("node_modules/ooxml-viewer/lib/render/renderRun"),y=e("node_modules/ooxml-viewer/lib/package/ZipPackageParser"),b=e("node_modules/ooxml-viewer/lib/util/xml"),w=e("node_modules/ooxml-viewer/lib/openxml/word/Font"),x=e("node_modules/ooxml-viewer/lib/render/renderFont"),_=e("node_modules/ooxml-viewer/lib/util/replaceVar"),T=e("node_modules/ooxml-viewer/lib/parse/Footnotes"),N=e("node_modules/ooxml-viewer/lib/parse/parseEndnotes"),C=e("node_modules/ooxml-viewer/lib/render/renderNotes"),M={classPrefix:"docx-viewer",page:!1,pageWrap:!0,bulletUseFont:!0,ignoreHeight:!0,ignoreWidth:!1,minLineHeight:1,enableVar:!1,debug:!1,pageWrapPadding:20,pageMarginBottom:20,pageShadow:!0,pageBackground:"#FFFFFF",pageWrapBackground:"#ECECEC",printWaitTime:100,zoomFitWidth:!1,renderHeader:!0,renderFooter:!0,data:{},evalVar:function(e){return e}},L=function(){function e(t,r,o){void 0===o&&(o=new y.default),this.themes=[],this.styleIdMap={},this.styleIdNum=0,this.wrapClassName="docx-viewer-wrapper",this.footNotes={},this.endNotes={},this.inited=!1,this.breakPage=!1,o.load(t),this.id=e.globalId++,this.parser=o,this.renderOptions=n.__assign(n.__assign({},M),r),this.renderOptions.page&&(this.renderOptions.ignoreHeight=!1,this.renderOptions.ignoreWidth=!1)}return e.prototype.init=function(){this.inited||(this.initContentType(),this.initRelation(),this.initTheme(),this.initFontTable(),this.initStyle(),this.initNumbering(),this.initNotes(),this.inited=!0)},e.prototype.initTheme=function(){var e,t;try{for(var r=n.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var i=o.value;if(i.partName.startsWith("/word/theme")){var s=this.parser.getXML(i.partName);this.themes.push(d.parseTheme(s))}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initStyle=function(){var e,t;try{for(var r=n.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){o.value.partName.startsWith("/word/styles.xml")&&(this.styles=l.parseStyles(this,this.parser.getXML("/word/styles.xml")))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initFontTable=function(){var e,t;try{for(var r=n.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){o.value.partName.startsWith("/word/fontTable.xml")&&(this.fontTable=i.FontTable.fromXML(this,this.parser.getXML("/word/fontTable.xml")))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initRelation=function(){var e={};this.parser.fileExists("/_rels/.rels")&&(e=s.parseRelationships(this.parser.getXML("/_rels/.rels"),"root")),this.relationships=e;var t={};this.parser.fileExists("/word/_rels/document.xml.rels")&&(t=s.parseRelationships(this.parser.getXML("/word/_rels/document.xml.rels"),"word")),this.documentRels=t;var r={};this.parser.fileExists("/word/_rels/fontTable.xml.rels")&&(r=s.parseRelationships(this.parser.getXML("/word/_rels/fontTable.xml.rels"),"word")),this.fontTableRels=r},e.prototype.initContentType=function(){var e=this.parser.getXML("[Content_Types].xml");this.conentTypes=a.parseContentType(e)},e.prototype.initNumbering=function(){var e,t;try{for(var r=n.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var i=o.value;if(i.partName.startsWith("/word/numbering")){var s=this.parser.getXML(i.partName);this.numbering=u.Numbering.fromXML(this,s)}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.initNotes=function(){var e,t;try{for(var r=n.__values(this.conentTypes.overrides),o=r.next();!o.done;o=r.next()){var i=o.value;if(i.partName.startsWith("/word/footnotes.xml")){var s=this.parser.getXML(i.partName);this.footNotes=T.parseFootnotes(this,s)}if(i.partName.startsWith("/word/endnotes.xml")){s=this.parser.getXML(i.partName);this.endNotes=N.parseEndnotes(this,s)}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},e.prototype.getRelationship=function(e){return e&&this.relationships?this.relationships[e]:null},e.prototype.getDocumentRels=function(e){return e&&this.documentRels?this.documentRels[e]:null},e.prototype.getFontTableRels=function(e){return e&&this.fontTableRels?this.fontTableRels[e]:null},e.prototype.replaceText=function(e){if(!1===this.renderOptions.enableVar)return e;var t=this.renderOptions.data;if(-1!==e.indexOf("{{")){e=e.replace(/^{{/g,"").replace(/}}$/g,"");var r=this.renderOptions.evalVar(e,t);return void 0===r?"":String(r)}return e},e.prototype.loadImage=function(e){var t=e.target;"word"===e.part&&(t="word/"+t);var r=this.parser.getFileByType(t,"blob");return r?URL.createObjectURL(r):null},e.prototype.loadFont=function(e,t){var r=this.getFontTableRels(e);if(!r)return null;var o=r.target;"word"===r.part&&(o="word/"+o);var n=this.parser.getFileByType(o,"uint8array");return n?URL.createObjectURL(new Blob([w.deobfuscate(n,t)])):null},e.prototype.getXML=function(e){return this.parser.getXML(e)},e.prototype.getStyleIdDisplayName=function(e){return e.match(/^[a-zA-Z]+[a-zA-Z0-9\-\_]*$/)?this.getClassPrefix()+"-"+e:(e in this.styleIdMap||(this.styleIdMap[e]=this.genClassName()),this.styleIdMap[e])},e.prototype.genClassName=function(){return"docx-classname-"+this.styleIdNum++},e.prototype.appendStyle=function(e){void 0===e&&(e="");var t=m.createElement("style");t.textContent=e,this.rootElement.appendChild(t)},e.prototype.getStyleClassName=function(e){var t=this.styles.styleMap[e];if(!t)return[];var r=[this.getStyleIdDisplayName(e)];return t.basedOn&&r.unshift(this.getStyleIdDisplayName(t.basedOn)),r},e.prototype.getStyle=function(e){return this.styles.styleMap[e]},e.prototype.getClassPrefix=function(){return"".concat(this.renderOptions.classPrefix,"-").concat(this.id)},e.prototype.getThemeColor=function(e){var t,r,o;switch(e){case"tx1":e="dk1";break;case"tx2":e="dk2";break;case"bg1":e="lt1";break;case"bg2":e="lt2"}if(this.themes&&this.themes.length>0){var n=null===(o=null===(r=null===(t=this.themes[0].themeElements)||void 0===t?void 0:t.clrScheme)||void 0===r?void 0:r.colors)||void 0===o?void 0:o[e];if(n)return n;console.warn("unknown theme color: "+e)}return""},e.prototype.addClass=function(e,t){e.classList.add("".concat(this.getClassPrefix(),"-").concat(t))},e.prototype.updateVariable=function(){this.rootElement&&!1!==this.renderOptions.enableVar&&f.updateVariableText(this)},e.prototype.download=function(e){void 0===e&&(e="document.docx");var t=this.getXML("word/document.xml");if(this.renderOptions.enableVar){g.mergeRun(this,t),_.replaceVar(this,t);for(var r=t.getElementsByTagName("w:t"),o=0;o<r.length;o++)_.replaceT(this,r[o],this.renderOptions.data)}var n=this.parser.generateZip(b.buildXML(t));h.downloadBlob(n,e)},e.prototype.print=function(){var e,t;return n.__awaiter(this,void 0,void 0,(function(){var r;return n.__generator(this,(function(o){switch(o.label){case 0:return(r=document.createElement("iframe")).style.position="absolute",r.style.top="-10000px",document.body.appendChild(r),null===(e=r.contentDocument)||void 0===e||e.write('<style>\n      html, body { margin:0; padding:0 }\n      @page { size: auto; margin: 0mm; }\n      </style>\n      <div id="print"></div>'),[4,this.render(null===(t=r.contentDocument)||void 0===t?void 0:t.getElementById("print"),n.__assign({page:!0,pageWrap:!1,pageShadow:!1,pageMarginBottom:0,pageWrapPadding:void 0,zoom:1},this.renderOptions.printOptions))];case 1:return o.sent(),setTimeout((function(){var e,t;r.focus(),null===(e=r.contentWindow)||void 0===e||e.print(),null===(t=r.parentNode)||void 0===t||t.removeChild(r)}),this.renderOptions.printWaitTime||100),window.focus(),[2]}}))}))},e.prototype.render=function(e,t){return void 0===t&&(t={}),n.__awaiter(this,void 0,void 0,(function(){var r,o,i,s,a;return n.__generator(this,(function(l){return this.init(),this.currentPage=0,r=n.__assign(n.__assign({},this.renderOptions),t),(o=r.debug)&&console.log("init",this),this.rootElement=e,e.innerHTML="",i=this.getXML("word/document.xml"),o&&console.log("documentData",i),r.enableVar&&(g.mergeRun(this,i),_.replaceVar(this,i)),s=v.WDocument.fromXML(this,i),o&&console.log("document",s),a=p.default(e,this,s,r),e.classList.add(this.getClassPrefix()),r.page&&r.pageWrap&&(e.classList.add(this.wrapClassName),e.style.padding="".concat(r.pageWrapPadding||0,"pt"),e.style.background=r.pageWrapBackground||"#ECECEC"),m.appendChild(e,c.renderStyle(this)),m.appendChild(e,x.renderFont(this.fontTable)),m.appendChild(e,a),m.appendChild(e,C.renderNotes(this)),[2]}))}))},e.globalId=0,e}();t.default=L}));
;/*!node_modules/ooxml-viewer/lib/index.js*/
amis.define("node_modules/ooxml-viewer/lib/index",(function(e,d,o,l){"use strict";Object.defineProperty(d,"__esModule",{value:!0});var i=e("node_modules/ooxml-viewer/lib/Word"),r={Word:i.default};d.Word=i.default,d.default=r}));
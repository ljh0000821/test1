(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-more-stress-result"],{"0261":function(t,e,a){var r=a("23e7"),i=a("d039"),n=a("8eb5"),o=Math.abs,f=Math.exp,c=Math.E,l=i((function(){return-2e-17!=Math.sinh(-2e-17)}));r({target:"Math",stat:!0,forced:l},{sinh:function(t){return o(t=+t)<1?(n(t)-n(-t))/2:(f(t-1)-f(-t-1))*(c/2)}})},"1b0a":function(t,e,a){"use strict";a.r(e);var r=a("edeb"),i=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);e["default"]=i.a},"1bb0":function(t,e,a){"use strict";var r=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.alertHandle=e.alertOrder=e.alertList=e.testRecordQuery=e.stressCalcuation=e.pmcgwList=e.depguardList=void 0;var i=r(a("5f30")),n=function(t){return(0,i.default)({url:"/blade-sd/depguard/list",method:"GET",data:t})};e.depguardList=n;var o=function(t){return(0,i.default)({url:"/blade-sd/pmcgw/list",method:"get",data:t})};e.pmcgwList=o;var f=function(t){return(0,i.default)({url:"/blade-sd/pmcgw/stressCalcuation",method:"get",data:t})};e.stressCalcuation=f;var c=function(t){return(0,i.default)({url:"/blade-sd/stahis/testRecordQuery",method:"get",data:t})};e.testRecordQuery=c;var l=function(t){return(0,i.default)({url:"/blade-sd/api/alarmh/page",method:"get",data:t})};e.alertList=l;var s=function(t){return(0,i.default)({url:"/blade-sd/api/alarmh/detail",method:"get",data:t})};e.alertOrder=s;var d=function(t){return(0,i.default)({url:"/blade-sd/api/alarmh/saveOrUpdate",method:"post",data:t})};e.alertHandle=d},"384b":function(t,e,a){"use strict";a.r(e);var r=a("d8cb"),i=a("4ab3");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);a("53da");var o,f=a("f0c5"),c=Object(f["a"])(i["default"],r["b"],r["c"],!1,null,"9fcaf3e8",null,!1,r["a"],o);e["default"]=c.exports},"3fdd":function(t,e,a){var r=a("b52f");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=a("4f06").default;i("432d4e4c",r,!0,{sourceMap:!1,shadowMode:!1})},"48c7":function(t,e,a){"use strict";a.r(e);var r=a("d0b4"),i=a("1b0a");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o,f=a("f0c5"),c=Object(f["a"])(i["default"],r["b"],r["c"],!1,null,"424361dc",null,!1,r["a"],o);e["default"]=c.exports},"4ab3":function(t,e,a){"use strict";a.r(e);var r=a("6b52"),i=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);e["default"]=i.a},"53da":function(t,e,a){"use strict";var r=a("3fdd"),i=a.n(r);i.a},"6b52":function(t,e,a){"use strict";a("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{title:{type:String,default:""},iconLeft:{type:Boolean,default:!1},backNum:{type:Number,default:1}},data:function(){return{}},methods:{goback:function(){this.iconLeft&&this.$goBack(this.backNum)}}};e.default=r},"79a8":function(t,e,a){var r=a("23e7"),i=Math.asinh,n=Math.log,o=Math.sqrt;function f(t){return isFinite(t=+t)&&0!=t?t<0?-f(-t):n(t+o(t*t+1)):t}r({target:"Math",stat:!0,forced:!(i&&1/i(0)>0)},{asinh:f})},"8eb5":function(t,e){var a=Math.expm1,r=Math.exp;t.exports=!a||a(10)>22025.465794806718||a(10)<22025.465794806718||-2e-17!=a(-2e-17)?function(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:r(t)-1}:a},b52f:function(t,e,a){var r=a("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-9fcaf3e8]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-9fcaf3e8]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-9fcaf3e8]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-9fcaf3e8]{text-align:center}.m-8[data-v-9fcaf3e8]{margin:%?8?%}.m-16[data-v-9fcaf3e8]{margin:%?16?%}.p-8[data-v-9fcaf3e8]{padding:%?8?%}.p-16[data-v-9fcaf3e8]{padding:%?16?%}.m-t-16[data-v-9fcaf3e8]{margin-top:%?16?%}.m-t-8[data-v-9fcaf3e8]{margin-top:%?8?%}.m-t-24[data-v-9fcaf3e8]{margin-top:%?24?%}.m-t-32[data-v-9fcaf3e8]{margin-top:%?32?%}.m-t-40[data-v-9fcaf3e8]{margin-top:%?40?%}.m-l-16[data-v-9fcaf3e8]{margin-left:%?16?%}.m-l-24[data-v-9fcaf3e8]{margin-left:%?24?%}.m-l-32[data-v-9fcaf3e8]{margin-left:%?32?%}.m-l-40[data-v-9fcaf3e8]{margin-left:%?40?%}.m-l-8[data-v-9fcaf3e8]{margin-left:%?8?%}.m-r-8[data-v-9fcaf3e8]{margin-right:%?8?%}.m-r-16[data-v-9fcaf3e8]{margin-right:%?16?%}.m-r-24[data-v-9fcaf3e8]{margin-right:%?24?%}.m-b-16[data-v-9fcaf3e8]{margin-bottom:%?16?%}.m-b-32[data-v-9fcaf3e8]{margin-bottom:%?32?%}.p-l-8[data-v-9fcaf3e8]{padding-left:%?8?%}.p-l-16[data-v-9fcaf3e8]{padding-left:%?16?%}.p-b-24[data-v-9fcaf3e8]{padding-bottom:%?24?%}.p-b-32[data-v-9fcaf3e8]{padding-bottom:%?32?%}.p-b-48[data-v-9fcaf3e8]{padding-bottom:%?48?%}.text-ellipsis[data-v-9fcaf3e8]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-9fcaf3e8]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-9fcaf3e8]{background-color:#f7b500}.bg-blue[data-v-9fcaf3e8]{background-color:#05b2cc}.bg-green[data-v-9fcaf3e8]{background-color:#00be27}.base-green-text[data-v-9fcaf3e8]{color:#05b2cc}.gray-text[data-v-9fcaf3e8]{color:#97a4ae}.green-text[data-v-9fcaf3e8]{color:#05b2cc}.red-text[data-v-9fcaf3e8]{color:red}.orange-text[data-v-9fcaf3e8]{color:orange}.border-b-gray[data-v-9fcaf3e8]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-9fcaf3e8]{height:%?32?%}.ef-btn-normal[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-9fcaf3e8]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-9fcaf3e8]{color:#05b2cc!important}.my-video[data-v-9fcaf3e8]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.uni-navbar[data-v-9fcaf3e8]{height:%?88?%}.uni-navbar__header[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;height:%?88?%;line-height:%?88?%;font-size:%?36?%;padding:0 %?28?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:fixed;top:0;left:0;background-color:#dde4f2;z-index:1000}.uni-navbar__header_text[data-v-9fcaf3e8]{font-weight:700;color:#30495e;margin-left:%?10?%}body.?%PAGE?%[data-v-9fcaf3e8]{background-color:#dde4f2}',""]),t.exports=e},d0b4:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return r}));var r={customNavbar:a("384b").default,uFormItem:a("e2f4").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("custom-navbar",{attrs:{title:"应力计算结果",iconLeft:!0}}),a("v-uni-view",{staticClass:"container"},[a("u-form-item",{attrs:{label:"自重比截g1",prop:"isLay","label-width":"180"}},[a("efItem",{attrs:{type:"label",unit:"N/m.mm2",isRightIcon:!1},model:{value:t.form.g1,callback:function(e){t.$set(t.form,"g1",e)},expression:"form.g1"}})],1),a("u-form-item",{attrs:{label:"垂直比截g3",prop:"g3","label-width":"180"}},[a("efItem",{attrs:{type:"label",unit:"N/m.mm2",isRightIcon:!1},model:{value:t.form.g3,callback:function(e){t.$set(t.form,"g3",e)},expression:"form.g3"}})],1),a("u-form-item",{attrs:{label:"无冰风压比截g4",prop:"isLay","label-width":"240"}},[a("efItem",{attrs:{type:"label",unit:"N/m.mm2",isRightIcon:!1},model:{value:t.form.g4,callback:function(e){t.$set(t.form,"g4",e)},expression:"form.g4"}})],1),a("u-form-item",{attrs:{label:"无冰有风时综合比截g6",prop:"isLay","label-width":"300"}},[a("efItem",{attrs:{type:"label",unit:"N/m.mm2",isRightIcon:!1},model:{value:t.form.g6,callback:function(e){t.$set(t.form,"g6",e)},expression:"form.g6"}})],1),a("u-form-item",{attrs:{label:"年均气温应力",prop:"isLay","label-width":"180"}},[a("efItem",{attrs:{type:"label",unit:"MPa",isRightIcon:!1},model:{value:t.form.s1,callback:function(e){t.$set(t.form,"s1",e)},expression:"form.s1"}})],1),a("u-form-item",{attrs:{label:"年均气温导线应力",prop:"isLay","label-width":"240"}},[a("efItem",{attrs:{type:"label",unit:"N/mm2",isRightIcon:!1},model:{value:t.form.result,callback:function(e){t.$set(t.form,"result",e)},expression:"form.result"}})],1),a("u-form-item",{attrs:{label:"许用应力",prop:"isLay","label-width":"180"}},[a("efItem",{attrs:{type:"label",unit:"MPa",isRightIcon:!1},model:{value:t.form.s2,callback:function(e){t.$set(t.form,"s2",e)},expression:"form.s2"}})],1),a("u-form-item",{attrs:{label:"许用导线应力",prop:"isLay","label-width":"180"}},[a("efItem",{attrs:{type:"label",unit:"N/mm2",isRightIcon:!1},model:{value:t.form.result2,callback:function(e){t.$set(t.form,"result2",e)},expression:"form.result2"}})],1)],1)],1)},n=[]},d8cb:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return r}));var r={uniIcons:a("cfb1").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-navbar"},[a("v-uni-view",{staticClass:"uni-navbar__header"},[a("v-uni-view",{staticClass:"flex-center"},[t.iconLeft?a("uni-icons",{staticStyle:{"font-weight":"800","z-index":"9999"},attrs:{color:"#30495E",type:"arrowthinleft",size:"24"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goback()}}}):t._e(),a("v-uni-text",{staticClass:"uni-navbar__header_text"},[t._v(t._s(t.title))]),t._t("left")],2),t._t("right")],2)],1)},n=[]},edeb:function(t,e,a){"use strict";var r=a("4ea4");a("79a8"),a("ff9c"),a("0261"),a("a9e3"),a("b680"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(a("b35f")),n=a("1bb0"),o={components:{efItem:i.default},data:function(){return{form:{}}},filters:{capitalize:function(t){return t.toFixed(6)}},onLoad:function(t){var e=JSON.parse(decodeURIComponent(t.params));console.log(e,"params66"),this.getResult(e)},methods:{getResult:function(t){var e={},a=Number(t.zjmmj);e.g1=4574.64/a/1e3;var r=Number(t.fbhd)||0,i=Number(t.waij);e.g2=27.708*r*(r+i)/a/1e3,e.g3=e.g1+e.g2;var n=Number(t.fsbjyxs),o=Number(t.fztxs),f=Number(t.fs);e.g4=.6128*n*o*f*f/a*i/1e3,e.g5=.6125*n*o*(2*r+i)*f*f/a/1e3,e.g6=Math.sqrt(e.g1*e.g1+e.g4*e.g4),e.g7=Math.sqrt(e.g3*e.g3+e.g5*e.g5);var c=Number(t.aqxs),l=Number(t.pdl),s=.95*l;e.s1=.25*s/a,e.s2=s/a/c;var d=Number(e.s2),b=Number(t.dj),u=Number(t.gc),m=Number(t.xhjl),g=Number(e.g6),p=Number(e.g7);e.result=d*Math.cosh(g*(b-2*m)/(2*d)-Math.asinh(u/(2*d/g*Math.sinh(g*b/(2*d))))),e.result2=d*Math.cosh(p*(b-2*m)/(2*d)-Math.asin(u/(2*d/p*Math.sinh(p*b/(2*d))))),this.form=e},_stressCalcuation:function(t){(0,n.stressCalcuation)(t).then((function(t){console.log(t,"应力计算结果")}))}}};e.default=o},ff9c:function(t,e,a){var r=a("23e7"),i=a("8eb5"),n=Math.cosh,o=Math.abs,f=Math.E;r({target:"Math",stat:!0,forced:!n||n(710)===1/0},{cosh:function(t){var e=i(o(t)-1)+1;return(e+1/(e*f*f))*(f/2)}})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-more-calculator-calculator"],{2375:function(e,t,a){"use strict";a.r(t);var i=a("5e06"),n=a("ac8f");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("46e9");var o,f=a("f0c5"),c=Object(f["a"])(n["default"],i["b"],i["c"],!1,null,"1beaef7a",null,!1,i["a"],o);t["default"]=c.exports},"384b":function(e,t,a){"use strict";a.r(t);var i=a("d8cb"),n=a("4ab3");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("53da");var o,f=a("f0c5"),c=Object(f["a"])(n["default"],i["b"],i["c"],!1,null,"9fcaf3e8",null,!1,i["a"],o);t["default"]=c.exports},"3fdd":function(e,t,a){var i=a("b52f");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("432d4e4c",i,!0,{sourceMap:!1,shadowMode:!1})},"46e9":function(e,t,a){"use strict";var i=a("ead7"),n=a.n(i);n.a},"4ab3":function(e,t,a){"use strict";a.r(t);var i=a("6b52"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},"53da":function(e,t,a){"use strict";var i=a("3fdd"),n=a.n(i);n.a},"5e06":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={customNavbar:a("384b").default,uInput:a("87aa").default},n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("custom-navbar",{attrs:{title:"数线净空距离计算器",iconLeft:!0}}),i("v-uni-view",{staticClass:"main"},[i("img",{staticClass:"calculator-img m-t-40",attrs:{src:a("9439"),alt:""}}),i("v-uni-view",{staticClass:"input-group flex-between m-t-32"},[i("v-uni-text",{staticClass:"m-r-16 text-box"},[e._v("AC")]),i("u-input",{class:["flex1",{"bg-gray":!!(e.computed||e.lenEnough&&!e.form.b)}],attrs:{disabled:e.computed||e.lenEnough&&!e.form.b,clearable:!1,type:"number","border-color":"#000",border:!0,placeholder:""},model:{value:e.form.b,callback:function(t){e.$set(e.form,"b",t)},expression:"form.b"}}),i("v-uni-text",{staticClass:"m-l-16 text-box"},[e._v("m")])],1),i("v-uni-view",{staticClass:"input-group flex-between m-t-40"},[i("v-uni-text",{staticClass:"m-r-16 text-box"},[e._v("BC")]),i("u-input",{class:["flex1",{"bg-gray":!!(e.computed||e.lenEnough&&!e.form.a)}],attrs:{disabled:e.computed||e.lenEnough&&!e.form.a,clearable:!1,type:"number","border-color":"#000",border:!0,placeholder:""},model:{value:e.form.a,callback:function(t){e.$set(e.form,"a",t)},expression:"form.a"}}),i("v-uni-text",{staticClass:"m-l-16 text-box"},[e._v("m")])],1),i("v-uni-view",{staticClass:"input-group flex-between m-t-40"},[i("v-uni-text",{staticClass:"m-r-16 text-box"},[e._v("AB")]),i("u-input",{class:["flex1",{"bg-gray":!!(e.computed||e.lenEnough&&!e.form.c)}],attrs:{disabled:e.computed||e.lenEnough&&!e.form.c,clearable:!1,type:"number","border-color":"#000",border:!0,placeholder:""},model:{value:e.form.c,callback:function(t){e.$set(e.form,"c",t)},expression:"form.c"}}),i("v-uni-text",{staticClass:"m-l-16 text-box"},[e._v("m")])],1),i("v-uni-view",{staticClass:"input-group flex-between m-t-40"},[i("v-uni-text",{staticClass:"m-r-16 text-box"},[e._v("∠1")]),i("u-input",{class:["flex1",{"bg-gray":!!(e.computed||e.lenEnough&&!e.form.hornA)}],attrs:{disabled:e.computed||e.lenEnough&&!e.form.hornA,clearable:!1,type:"number","border-color":"#000",border:!0,placeholder:""},model:{value:e.form.hornA,callback:function(t){e.$set(e.form,"hornA",t)},expression:"form.hornA"}}),i("v-uni-text",{staticClass:"m-l-16 text-box"},[e._v("°")])],1),i("v-uni-view",{staticClass:"input-group flex-between m-t-40"},[i("v-uni-text",{staticClass:"m-r-16 text-box"},[e._v("∠2")]),i("u-input",{class:["flex1",{"bg-gray":!!(e.computed||e.lenEnough&&!e.form.hornB)}],attrs:{disabled:e.computed||e.lenEnough&&!e.form.hornB,clearable:!1,type:"number","border-color":"#000",border:!0,placeholder:""},model:{value:e.form.hornB,callback:function(t){e.$set(e.form,"hornB",t)},expression:"form.hornB"}}),i("v-uni-text",{staticClass:"m-l-16 text-box"},[e._v("°")])],1),e.errText?[i("v-uni-view",{staticClass:"err-text m-t-16"},[e._v("提示："+e._s(e.errText))])]:e._e(),i("v-uni-view",{staticClass:"btn-group m-t-40"},[i("v-uni-view",{staticClass:"red-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.init.apply(void 0,arguments)}}},[e._v("清空")]),i("v-uni-view",{class:["green-btn",{"bg-gray-btn":!(e.lenEnough&&!e.errText)}],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.calcule.apply(void 0,arguments)}}},[e._v("计算")])],1)],2)],1)},r=[]},"6b52":function(e,t,a){"use strict";a("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={props:{title:{type:String,default:""},iconLeft:{type:Boolean,default:!1},backNum:{type:Number,default:1}},data:function(){return{}},methods:{goback:function(){this.iconLeft&&this.$goBack(this.backNum)}}};t.default=i},"6cc5":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-1beaef7a]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-1beaef7a]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-1beaef7a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-1beaef7a]{text-align:center}.m-8[data-v-1beaef7a]{margin:%?8?%}.m-16[data-v-1beaef7a]{margin:%?16?%}.p-8[data-v-1beaef7a]{padding:%?8?%}.p-16[data-v-1beaef7a]{padding:%?16?%}.m-t-16[data-v-1beaef7a]{margin-top:%?16?%}.m-t-8[data-v-1beaef7a]{margin-top:%?8?%}.m-t-24[data-v-1beaef7a]{margin-top:%?24?%}.m-t-32[data-v-1beaef7a]{margin-top:%?32?%}.m-t-40[data-v-1beaef7a]{margin-top:%?40?%}.m-l-16[data-v-1beaef7a]{margin-left:%?16?%}.m-l-24[data-v-1beaef7a]{margin-left:%?24?%}.m-l-32[data-v-1beaef7a]{margin-left:%?32?%}.m-l-40[data-v-1beaef7a]{margin-left:%?40?%}.m-l-8[data-v-1beaef7a]{margin-left:%?8?%}.m-r-8[data-v-1beaef7a]{margin-right:%?8?%}.m-r-16[data-v-1beaef7a]{margin-right:%?16?%}.m-r-24[data-v-1beaef7a]{margin-right:%?24?%}.m-b-16[data-v-1beaef7a]{margin-bottom:%?16?%}.m-b-32[data-v-1beaef7a]{margin-bottom:%?32?%}.p-l-8[data-v-1beaef7a]{padding-left:%?8?%}.p-l-16[data-v-1beaef7a]{padding-left:%?16?%}.p-b-24[data-v-1beaef7a]{padding-bottom:%?24?%}.p-b-32[data-v-1beaef7a]{padding-bottom:%?32?%}.p-b-48[data-v-1beaef7a]{padding-bottom:%?48?%}.text-ellipsis[data-v-1beaef7a]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-1beaef7a]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-1beaef7a]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-1beaef7a]{background-color:#f7b500}.bg-blue[data-v-1beaef7a]{background-color:#05b2cc}.bg-green[data-v-1beaef7a]{background-color:#00be27}.base-green-text[data-v-1beaef7a]{color:#05b2cc}.gray-text[data-v-1beaef7a]{color:#97a4ae}.green-text[data-v-1beaef7a]{color:#05b2cc}.red-text[data-v-1beaef7a]{color:red}.orange-text[data-v-1beaef7a]{color:orange}.border-b-gray[data-v-1beaef7a]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-1beaef7a]{height:%?32?%}.ef-btn-normal[data-v-1beaef7a]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-1beaef7a]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-1beaef7a]{color:#05b2cc!important}.my-video[data-v-1beaef7a]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.main[data-v-1beaef7a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.calculator-img[data-v-1beaef7a]{width:%?460?%}.input-item[data-v-1beaef7a]{width:%?460?%}.text-box[data-v-1beaef7a]{width:%?40?%}.btn-group[data-v-1beaef7a]{width:%?460?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.red-btn[data-v-1beaef7a]{border:1px solid #f75f49;color:#f75f49;padding:%?8?% %?64?%;background-color:#fff;-webkit-border-radius:%?40?%;border-radius:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.green-btn[data-v-1beaef7a]{border:1px solid #05b2cc;color:#fff;padding:%?16?% %?64?%;background-color:#05b2cc;-webkit-border-radius:%?40?%;border-radius:%?40?%}.bg-gray-btn[data-v-1beaef7a]{background-color:grey;opacity:.1}.bg-gray[data-v-1beaef7a]{background-color:hsla(0,5%,80.2%,.4)}.err-text[data-v-1beaef7a]{color:red}body.?%PAGE?%[data-v-1beaef7a]{background-color:#dde4f2}',""]),e.exports=t},9439:function(e,t,a){e.exports=a.p+"static/img/img_tree_tool.b50cd0cb.png"},ac8f:function(e,t,a){"use strict";a.r(t);var i=a("da69"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},b52f:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-9fcaf3e8]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-9fcaf3e8]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-9fcaf3e8]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-9fcaf3e8]{text-align:center}.m-8[data-v-9fcaf3e8]{margin:%?8?%}.m-16[data-v-9fcaf3e8]{margin:%?16?%}.p-8[data-v-9fcaf3e8]{padding:%?8?%}.p-16[data-v-9fcaf3e8]{padding:%?16?%}.m-t-16[data-v-9fcaf3e8]{margin-top:%?16?%}.m-t-8[data-v-9fcaf3e8]{margin-top:%?8?%}.m-t-24[data-v-9fcaf3e8]{margin-top:%?24?%}.m-t-32[data-v-9fcaf3e8]{margin-top:%?32?%}.m-t-40[data-v-9fcaf3e8]{margin-top:%?40?%}.m-l-16[data-v-9fcaf3e8]{margin-left:%?16?%}.m-l-24[data-v-9fcaf3e8]{margin-left:%?24?%}.m-l-32[data-v-9fcaf3e8]{margin-left:%?32?%}.m-l-40[data-v-9fcaf3e8]{margin-left:%?40?%}.m-l-8[data-v-9fcaf3e8]{margin-left:%?8?%}.m-r-8[data-v-9fcaf3e8]{margin-right:%?8?%}.m-r-16[data-v-9fcaf3e8]{margin-right:%?16?%}.m-r-24[data-v-9fcaf3e8]{margin-right:%?24?%}.m-b-16[data-v-9fcaf3e8]{margin-bottom:%?16?%}.m-b-32[data-v-9fcaf3e8]{margin-bottom:%?32?%}.p-l-8[data-v-9fcaf3e8]{padding-left:%?8?%}.p-l-16[data-v-9fcaf3e8]{padding-left:%?16?%}.p-b-24[data-v-9fcaf3e8]{padding-bottom:%?24?%}.p-b-32[data-v-9fcaf3e8]{padding-bottom:%?32?%}.p-b-48[data-v-9fcaf3e8]{padding-bottom:%?48?%}.text-ellipsis[data-v-9fcaf3e8]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-9fcaf3e8]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-9fcaf3e8]{background-color:#f7b500}.bg-blue[data-v-9fcaf3e8]{background-color:#05b2cc}.bg-green[data-v-9fcaf3e8]{background-color:#00be27}.base-green-text[data-v-9fcaf3e8]{color:#05b2cc}.gray-text[data-v-9fcaf3e8]{color:#97a4ae}.green-text[data-v-9fcaf3e8]{color:#05b2cc}.red-text[data-v-9fcaf3e8]{color:red}.orange-text[data-v-9fcaf3e8]{color:orange}.border-b-gray[data-v-9fcaf3e8]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-9fcaf3e8]{height:%?32?%}.ef-btn-normal[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-9fcaf3e8]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-9fcaf3e8]{color:#05b2cc!important}.my-video[data-v-9fcaf3e8]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.uni-navbar[data-v-9fcaf3e8]{height:%?88?%}.uni-navbar__header[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;height:%?88?%;line-height:%?88?%;font-size:%?36?%;padding:0 %?28?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:fixed;top:0;left:0;background-color:#dde4f2;z-index:1000}.uni-navbar__header_text[data-v-9fcaf3e8]{font-weight:700;color:#30495e;margin-left:%?10?%}body.?%PAGE?%[data-v-9fcaf3e8]{background-color:#dde4f2}',""]),e.exports=t},d8cb:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={uniIcons:a("cfb1").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-navbar"},[a("v-uni-view",{staticClass:"uni-navbar__header"},[a("v-uni-view",{staticClass:"flex-center"},[e.iconLeft?a("uni-icons",{staticStyle:{"font-weight":"800","z-index":"9999"},attrs:{color:"#30495E",type:"arrowthinleft",size:"24"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goback()}}}):e._e(),a("v-uni-text",{staticClass:"uni-navbar__header_text"},[e._v(e._s(e.title))]),e._t("left")],2),e._t("right")],2)],1)},r=[]},da69:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a("f4cb"),n={data:function(){return{errText:"",lenEnough:!1,computed:!1,form:{b:null,a:null,c:null,hornA:null,hornB:null,hornC:90}}},computed:{formhornA:function(){return this.form.hornA},formhornB:function(){return this.form.hornB}},watch:{formhornA:function(){null!=this.form.hornA&&(this.form.hornB=90-this.form.hornA)},formhornB:function(){null!=this.form.hornB&&(this.form.hornA=90-this.form.hornB)},form:{handler:function(e){e.hornA>=90||e.hornB>=90?this.errText="∠1∠2必须为锐角":this.errText="";var t=0;for(var a in e)this.form[a]&&t++;this.lenEnough=!!(t>=3&&(this.form.b||this.form.c||this.form.a))},deep:!0}},methods:{init:function(){this.computed=!1,this.form={b:null,a:null,c:null,hornA:null,hornB:null,hornC:90}},calcule:function(){this.form.c&&(this.form.b>=this.form.c||this.form.a>=this.form.c)&&(this.errText="AB应为最长边"),this.errText||!this.lenEnough||this.computed||(this.form.hornA||this.form.hornB?(this.form.c&&(this.form.a=(0,i.getSin)(this.form.hornA)*this.form.c,this.form.b=(0,i.getSin)(this.form.hornB)*this.form.c),this.form.a&&(this.form.c=this.form.a/(0,i.getSin)(this.form.hornA),this.form.b=(0,i.getSin)(this.form.hornB)*this.form.c),this.form.b&&(this.form.c=this.form.b/(0,i.getSin)(this.form.hornB),this.form.a=(0,i.getSin)(this.form.hornA)*this.form.c)):(null==this.form.c&&(this.form.c=Math.sqrt(Math.pow(this.form.a,2)+Math.pow(this.form.b,2))),null==this.form.b&&(this.form.b=Math.sqrt(Math.pow(this.form.c,2)-Math.pow(this.form.a,2))),null==this.form.a&&(this.form.a=Math.sqrt(Math.pow(this.form.c,2)-Math.pow(this.form.b,2))),this.form.hornA=(0,i.getAngle)(this.form.a/this.form.c),this.form.hornB=(0,i.getAngle)(this.form.b/this.form.c)),(this.form.b>=this.form.c||this.form.a>=this.form.c)&&(this.errText="AB应为最长边"),this.computed=!0)}}};t.default=n},ead7:function(e,t,a){var i=a("6cc5");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("465df9d9",i,!0,{sourceMap:!1,shadowMode:!1})}}]);
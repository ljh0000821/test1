(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-task-testing-details"],{"0aa9":function(e,t,a){"use strict";var i=a("2d92"),n=a.n(i);n.a},"1e2d":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-64869dde]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-64869dde]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-64869dde]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-64869dde]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-64869dde]{text-align:center}.m-8[data-v-64869dde]{margin:%?8?%}.m-16[data-v-64869dde]{margin:%?16?%}.p-8[data-v-64869dde]{padding:%?8?%}.p-16[data-v-64869dde]{padding:%?16?%}.m-t-16[data-v-64869dde]{margin-top:%?16?%}.m-t-8[data-v-64869dde]{margin-top:%?8?%}.m-t-24[data-v-64869dde]{margin-top:%?24?%}.m-t-32[data-v-64869dde]{margin-top:%?32?%}.m-t-40[data-v-64869dde]{margin-top:%?40?%}.m-l-16[data-v-64869dde]{margin-left:%?16?%}.m-l-24[data-v-64869dde]{margin-left:%?24?%}.m-l-32[data-v-64869dde]{margin-left:%?32?%}.m-l-40[data-v-64869dde]{margin-left:%?40?%}.m-l-8[data-v-64869dde]{margin-left:%?8?%}.m-r-8[data-v-64869dde]{margin-right:%?8?%}.m-r-16[data-v-64869dde]{margin-right:%?16?%}.m-r-24[data-v-64869dde]{margin-right:%?24?%}.m-b-16[data-v-64869dde]{margin-bottom:%?16?%}.m-b-32[data-v-64869dde]{margin-bottom:%?32?%}.p-l-8[data-v-64869dde]{padding-left:%?8?%}.p-l-16[data-v-64869dde]{padding-left:%?16?%}.p-b-24[data-v-64869dde]{padding-bottom:%?24?%}.p-b-32[data-v-64869dde]{padding-bottom:%?32?%}.p-b-48[data-v-64869dde]{padding-bottom:%?48?%}.text-ellipsis[data-v-64869dde]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-64869dde]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-64869dde]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-64869dde]{background-color:#f7b500}.bg-blue[data-v-64869dde]{background-color:#05b2cc}.bg-green[data-v-64869dde]{background-color:#00be27}.base-green-text[data-v-64869dde]{color:#05b2cc}.gray-text[data-v-64869dde]{color:#97a4ae}.green-text[data-v-64869dde]{color:#05b2cc}.red-text[data-v-64869dde]{color:red}.orange-text[data-v-64869dde]{color:orange}.border-b-gray[data-v-64869dde]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-64869dde]{height:%?32?%}.ef-btn-normal[data-v-64869dde]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-64869dde]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-64869dde]{color:#05b2cc!important}.my-video[data-v-64869dde]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.custom-style[data-v-64869dde]{background-color:#05b2cc!important;color:#fff}.btn[data-v-64869dde]{width:%?200?%;height:%?60?%!important;margin-top:%?24?%}body.?%PAGE?%[data-v-64869dde]{background-color:#dde4f2}',""]),e.exports=t},2741:function(e,t,a){"use strict";a.r(t);var i=a("761b"),n=a("a51b");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("cea7");var o,d=a("f0c5"),f=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"64869dde",null,!1,i["a"],o);t["default"]=f.exports},"2d92":function(e,t,a){var i=a("907b");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("4e3f13d1",i,!0,{sourceMap:!1,shadowMode:!1})},"2de7":function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("edf4")),r=i(a("2741")),o={components:{BaseInfoForm:n.default,DetailsForm:r.default},data:function(){return{info:{}}},onLoad:function(e){this.info=JSON.parse(decodeURIComponent(e.info)),console.log(this.info,"this.info66")},methods:{initCollapse:function(e){this.$refs[e].init()}}};t.default=o},"31db":function(e,t,a){"use strict";a.r(t);var i=a("2de7"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},3378:function(e,t,a){var i=a("1e2d");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("50f9bd08",i,!0,{sourceMap:!1,shadowMode:!1})},"384b":function(e,t,a){"use strict";a.r(t);var i=a("d8cb"),n=a("4ab3");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("53da");var o,d=a("f0c5"),f=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"9fcaf3e8",null,!1,i["a"],o);t["default"]=f.exports},"3fdd":function(e,t,a){var i=a("b52f");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("432d4e4c",i,!0,{sourceMap:!1,shadowMode:!1})},"484e":function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.getTestByItemIdPage=t.getTestByItemId=t.tasknotesSubmit=t.tasksignSubmit=t.findTwrsByItemIdH5=t.taskitemFindTwrsByItemId=t.taskitemUpdate=t.findTwrsByTaskId=t.taskDetail=t.taskitemDetail=t.taskSave=t.taskList=void 0;var n=i(a("5f30")),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/blade-sd/taskitem/list",t=arguments.length>1?arguments[1]:void 0;return(0,n.default)({url:e,method:"GET",data:t})};t.taskList=r;var o=function(e){return(0,n.default)({url:"/blade-sd/task/save",method:"POST",data:e})};t.taskSave=o;var d=function(e){return(0,n.default)({url:"/blade-sd/taskitem/detail",method:"get",data:e})};t.taskitemDetail=d;var f=function(e){return(0,n.default)({url:"/blade-sd/task/detail/"+e,method:"get"})};t.taskDetail=f;var l=function(e){return(0,n.default)({url:"/blade-sd/task/findTwrsByTaskId",method:"get",data:e})};t.findTwrsByTaskId=l;var s=function(e){return(0,n.default)({url:"/blade-sd/taskitem/update",method:"post",data:e})};t.taskitemUpdate=s;var c=function(e,t){return(0,n.default)({url:"/blade-sd/taskitem/findTwrsByItemId/"+e+"/"+t,method:"get"})};t.taskitemFindTwrsByItemId=c;var b=function(e){return(0,n.default)({url:"/blade-sd/taskitem/findTwrsByItemIdH5",method:"get",data:e})};t.findTwrsByItemIdH5=b;var u=function(e){return(0,n.default)({url:"/blade-sd/tasksign/submit",method:"post",data:e})};t.tasksignSubmit=u;var m=function(e){return(0,n.default)({url:"/blade-sd/tasknotes/submit",method:"post",data:e})};t.tasknotesSubmit=m;var p=function(e){return(0,n.default)({url:"/blade-sd/taskitem/getTestByItemId",method:"get",data:e})};t.getTestByItemId=p;var g=function(e){return(0,n.default)({url:"/blade-sd/taskitem/getTestByItemIdPage",method:"get",data:e})};t.getTestByItemIdPage=g},"4ab3":function(e,t,a){"use strict";a.r(t);var i=a("6b52"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},"53da":function(e,t,a){"use strict";var i=a("3fdd"),n=a.n(i);n.a},"6b52":function(e,t,a){"use strict";a("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={props:{title:{type:String,default:""},iconLeft:{type:Boolean,default:!1},backNum:{type:Number,default:1}},data:function(){return{}},methods:{goback:function(){this.iconLeft&&this.$goBack(this.backNum)}}};t.default=i},"761b":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={uForm:a("586b").default,uFormItem:a("e2f4").default,uInput:a("87aa").default,uButton:a("147a").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("u-form",{ref:"uForm",attrs:{model:e.form,"error-type":["toast"]}},[a("u-form-item",{attrs:{prop:"defPicVOList",label:"任务照片","label-width":"150","label-position":"top"}},[a("chooseImage",{ref:"chooseImage",attrs:{images:e.form.taskPics,type:e.actionType,picType:"1"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.sourceChange.apply(void 0,arguments)}}})],1),a("u-form-item",{attrs:{prop:"defVoiVOList",label:"任务录音","label-width":"150","label-position":"top"}},[a("chooseAudio",{ref:"chooseAudio",attrs:{audioList:e.form.taskVois,type:e.actionType,picType:"1"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.sourceChange.apply(void 0,arguments)}}})],1),a("u-form-item",{attrs:{prop:"defVidVOList",label:"任务视频","label-width":"150","label-position":"top"}},[a("chooseVideo",{ref:"chooseVideo",attrs:{videoList:e.form.taskVids,type:e.actionType,picType:"1"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.sourceChange.apply(void 0,arguments)}}})],1),a("u-form-item",{attrs:{prop:"insReport",label:"工作总结","label-width":"150","label-position":"top"}},[a("v-uni-view",{staticClass:"flex1"},["add"===e.actionType||"edit"===e.actionType?a("v-uni-view",[a("u-input",{attrs:{disabled:"add"!==e.actionType&&"edit"!==e.actionType,clearable:"add"===e.actionType||"edit"===e.actionType,border:!0,placeholder:"请输入",type:"textarea"},model:{value:e.form.insReport,callback:function(t){e.$set(e.form,"insReport",t)},expression:"form.insReport"}})],1):e._e(),"details"===e.actionType?a("v-uni-view",{staticClass:"f-s-24"},[e._v(e._s(e.form.insReport))]):e._e()],1)],1)],1),"add"===e.actionType?a("u-button",{staticClass:"ef-btn-normal btn-primary",attrs:{loading:e.loading,shape:"circle",ripple:!0,plain:!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("提交")]):e._e()],1)},r=[]},9012:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={uForm:a("586b").default,uFormItem:a("e2f4").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("u-form",{ref:"uForm",attrs:{model:e.form,"error-type":["toast"]}},[a("u-form-item",{attrs:{label:"线路",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.lineName,callback:function(t){e.$set(e.form,"lineName",t)},expression:"form.lineName"}})],1),a("u-form-item",{attrs:{label:"杆塔",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.twrCodes,callback:function(t){e.$set(e.form,"twrCodes",t)},expression:"form.twrCodes"}})],1),a("u-form-item",{attrs:{label:"班组",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.teamName,callback:function(t){e.$set(e.form,"teamName",t)},expression:"form.teamName"}})],1),a("u-form-item",{attrs:{label:"开始/结束时间",prop:"layDesc","label-width":"200"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.timeSection,callback:function(t){e.$set(e.form,"timeSection",t)},expression:"form.timeSection"}})],1),a("u-form-item",{attrs:{label:"检测方式",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.testTypeName,callback:function(t){e.$set(e.form,"testTypeName",t)},expression:"form.testTypeName"}})],1),a("u-form-item",{attrs:{label:"负责人",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.itemLeaderName,callback:function(t){e.$set(e.form,"itemLeaderName",t)},expression:"form.itemLeaderName"}})],1),a("u-form-item",{attrs:{label:"检测人",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.taskItemNames,callback:function(t){e.$set(e.form,"taskItemNames",t)},expression:"form.taskItemNames"}})],1),a("u-form-item",{attrs:{label:"人数",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.taskItemNamesNum,callback:function(t){e.$set(e.form,"taskItemNamesNum",t)},expression:"form.taskItemNamesNum"}})],1),a("u-form-item",{attrs:{label:"工作内容",prop:"layDesc","label-width":"150"}},[a("efItem",{attrs:{type:"label",isRightIcon:!1},model:{value:e.form.insContent,callback:function(t){e.$set(e.form,"insContent",t)},expression:"form.insContent"}})],1)],1)],1)},r=[]},"907b":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-70fdfe51]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-70fdfe51]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-70fdfe51]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-70fdfe51]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-70fdfe51]{text-align:center}.m-8[data-v-70fdfe51]{margin:%?8?%}.m-16[data-v-70fdfe51]{margin:%?16?%}.p-8[data-v-70fdfe51]{padding:%?8?%}.p-16[data-v-70fdfe51]{padding:%?16?%}.m-t-16[data-v-70fdfe51]{margin-top:%?16?%}.m-t-8[data-v-70fdfe51]{margin-top:%?8?%}.m-t-24[data-v-70fdfe51]{margin-top:%?24?%}.m-t-32[data-v-70fdfe51]{margin-top:%?32?%}.m-t-40[data-v-70fdfe51]{margin-top:%?40?%}.m-l-16[data-v-70fdfe51]{margin-left:%?16?%}.m-l-24[data-v-70fdfe51]{margin-left:%?24?%}.m-l-32[data-v-70fdfe51]{margin-left:%?32?%}.m-l-40[data-v-70fdfe51]{margin-left:%?40?%}.m-l-8[data-v-70fdfe51]{margin-left:%?8?%}.m-r-8[data-v-70fdfe51]{margin-right:%?8?%}.m-r-16[data-v-70fdfe51]{margin-right:%?16?%}.m-r-24[data-v-70fdfe51]{margin-right:%?24?%}.m-b-16[data-v-70fdfe51]{margin-bottom:%?16?%}.m-b-32[data-v-70fdfe51]{margin-bottom:%?32?%}.p-l-8[data-v-70fdfe51]{padding-left:%?8?%}.p-l-16[data-v-70fdfe51]{padding-left:%?16?%}.p-b-24[data-v-70fdfe51]{padding-bottom:%?24?%}.p-b-32[data-v-70fdfe51]{padding-bottom:%?32?%}.p-b-48[data-v-70fdfe51]{padding-bottom:%?48?%}.text-ellipsis[data-v-70fdfe51]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-70fdfe51]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-70fdfe51]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-70fdfe51]{background-color:#f7b500}.bg-blue[data-v-70fdfe51]{background-color:#05b2cc}.bg-green[data-v-70fdfe51]{background-color:#00be27}.base-green-text[data-v-70fdfe51]{color:#05b2cc}.gray-text[data-v-70fdfe51]{color:#97a4ae}.green-text[data-v-70fdfe51]{color:#05b2cc}.red-text[data-v-70fdfe51]{color:red}.orange-text[data-v-70fdfe51]{color:orange}.border-b-gray[data-v-70fdfe51]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-70fdfe51]{height:%?32?%}.ef-btn-normal[data-v-70fdfe51]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-70fdfe51]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-70fdfe51]{color:#05b2cc!important}.my-video[data-v-70fdfe51]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.collapse-item[data-v-70fdfe51]{padding-bottom:10px}body.?%PAGE?%[data-v-70fdfe51]{background-color:#dde4f2}',""]),e.exports=t},a186:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var n=i(a("1da1")),r=a("484e"),o={components:{},props:{type:{type:String,default:"add"},info:{type:Object,default:function(){}}},data:function(){return{loading:!1,actionType:this.type,form:{insReport:""},rules:{}}},watch:{form:{handler:function(){this.$emit("over")},deep:!0},info:{handler:function(e){console.log(e,"详情里面nval"),this.form=e,3==e.itemState&&(this.actionType="details")},deep:!0,immediate:!0}},created:function(){},mounted:function(){this.$refs.uForm.setRules(this.rules)},methods:{submit:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,e.$refs.chooseImage.getIds();case 4:return e.form.claPic=t.sent,t.next=7,e.$refs.chooseAudio.getIds();case 7:return e.form.claVoi=t.sent,t.next=10,e.$refs.chooseVideo.getIds();case 10:e.form.claVid=t.sent,e.form.id=e.info.id,console.log(e.form,"form"),(0,r.taskitemUpdate)(e.form).then((function(){e.loading=!1,e.$u.toast("已提交"),setTimeout((function(){e.$goBack(1,!0)}),500)})),t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](1),e.loading=!1;case 19:case"end":return t.stop()}}),t,null,[[1,16]])})))()},sourceChange:function(){this.$emit("over")}}};t.default=o},a51b:function(e,t,a){"use strict";a.r(t);var i=a("a186"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},b52f:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*每个页面公共css */uni-page-body[data-v-9fcaf3e8]{background-color:#dde4f2;font-family:PingFangSC-Medium,PingFang SC}.flex-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-around[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-between[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-start[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-end[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex-column[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.flex-wrap[data-v-9fcaf3e8]{-webkit-flex-wrap:wrap;flex-wrap:wrap}.flex[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex}.flex1[data-v-9fcaf3e8]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.align-center[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.text-center[data-v-9fcaf3e8]{text-align:center}.m-8[data-v-9fcaf3e8]{margin:%?8?%}.m-16[data-v-9fcaf3e8]{margin:%?16?%}.p-8[data-v-9fcaf3e8]{padding:%?8?%}.p-16[data-v-9fcaf3e8]{padding:%?16?%}.m-t-16[data-v-9fcaf3e8]{margin-top:%?16?%}.m-t-8[data-v-9fcaf3e8]{margin-top:%?8?%}.m-t-24[data-v-9fcaf3e8]{margin-top:%?24?%}.m-t-32[data-v-9fcaf3e8]{margin-top:%?32?%}.m-t-40[data-v-9fcaf3e8]{margin-top:%?40?%}.m-l-16[data-v-9fcaf3e8]{margin-left:%?16?%}.m-l-24[data-v-9fcaf3e8]{margin-left:%?24?%}.m-l-32[data-v-9fcaf3e8]{margin-left:%?32?%}.m-l-40[data-v-9fcaf3e8]{margin-left:%?40?%}.m-l-8[data-v-9fcaf3e8]{margin-left:%?8?%}.m-r-8[data-v-9fcaf3e8]{margin-right:%?8?%}.m-r-16[data-v-9fcaf3e8]{margin-right:%?16?%}.m-r-24[data-v-9fcaf3e8]{margin-right:%?24?%}.m-b-16[data-v-9fcaf3e8]{margin-bottom:%?16?%}.m-b-32[data-v-9fcaf3e8]{margin-bottom:%?32?%}.p-l-8[data-v-9fcaf3e8]{padding-left:%?8?%}.p-l-16[data-v-9fcaf3e8]{padding-left:%?16?%}.p-b-24[data-v-9fcaf3e8]{padding-bottom:%?24?%}.p-b-32[data-v-9fcaf3e8]{padding-bottom:%?32?%}.p-b-48[data-v-9fcaf3e8]{padding-bottom:%?48?%}.text-ellipsis[data-v-9fcaf3e8]{width:0;overflow:hidden;\r\n  /*超出部分隐藏*/white-space:nowrap;\r\n  /*不换行*/text-overflow:ellipsis\r\n  /*超出部分文字以...显示*/}.container[data-v-9fcaf3e8]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.ef-btn[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?30?%;border-radius:%?30?%;margin-top:%?50?%;background-color:#05b2cc!important;font-size:%?24?%!important}.bg-orange[data-v-9fcaf3e8]{background-color:#f7b500}.bg-blue[data-v-9fcaf3e8]{background-color:#05b2cc}.bg-green[data-v-9fcaf3e8]{background-color:#00be27}.base-green-text[data-v-9fcaf3e8]{color:#05b2cc}.gray-text[data-v-9fcaf3e8]{color:#97a4ae}.green-text[data-v-9fcaf3e8]{color:#05b2cc}.red-text[data-v-9fcaf3e8]{color:red}.orange-text[data-v-9fcaf3e8]{color:orange}.border-b-gray[data-v-9fcaf3e8]{padding-bottom:%?16?%;border-bottom:1px solid #dde4f2}.title-icon[data-v-9fcaf3e8]{height:%?32?%}.ef-btn-normal[data-v-9fcaf3e8]{width:%?200?%;height:%?60?%!important;margin:%?20?% auto}.btn-primary[data-v-9fcaf3e8]{background-color:#05b2cc!important;color:#fff!important}.btn-normal[data-v-9fcaf3e8]{color:#05b2cc!important}.my-video[data-v-9fcaf3e8]{position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background-color:rgba(0,0,0,.5);z-index:3000}.uni-navbar[data-v-9fcaf3e8]{height:%?88?%}.uni-navbar__header[data-v-9fcaf3e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:100%;height:%?88?%;line-height:%?88?%;font-size:%?36?%;padding:0 %?28?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:fixed;top:0;left:0;background-color:#dde4f2;z-index:1000}.uni-navbar__header_text[data-v-9fcaf3e8]{font-weight:700;color:#30495e;margin-left:%?10?%}body.?%PAGE?%[data-v-9fcaf3e8]{background-color:#dde4f2}',""]),e.exports=t},b98f:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={customNavbar:a("384b").default,uCollapse:a("206a").default,uCollapseItem:a("6dab").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("custom-navbar",{attrs:{title:"任务详情",iconLeft:!0}}),a("v-uni-view",{staticClass:"container"},[a("u-collapse",{ref:"collapseBaseInfoForm",attrs:{"event-type":"close",arrow:!0,accordion:!0}},[a("u-collapse-item",{attrs:{title:"基本信息",open:!0}},[a("v-uni-view",{staticClass:"collapse-item"},[a("BaseInfoForm",{ref:"BaseInfoForm",attrs:{info:e.info},on:{over:function(t){arguments[0]=t=e.$handleEvent(t),e.initCollapse("collapseBaseInfoForm")}}})],1)],1)],1)],1),a("v-uni-view",{staticClass:"container",staticStyle:{"margin-top":"24rpx"}},[a("u-collapse",{ref:"collapseDetailsForm",attrs:{"event-type":"close",arrow:!0,accordion:!0}},[a("u-collapse-item",{attrs:{title:"任务详情",open:!0}},[a("v-uni-view",{staticClass:"collapse-item"},[a("DetailsForm",{ref:"DetailsForm",attrs:{info:e.info},on:{over:function(t){arguments[0]=t=e.$handleEvent(t),e.initCollapse("collapseDetailsForm")}}})],1)],1)],1)],1)],1)},r=[]},ba49:function(e,t,a){"use strict";a.r(t);var i=a("b98f"),n=a("31db");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("0aa9");var o,d=a("f0c5"),f=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"70fdfe51",null,!1,i["a"],o);t["default"]=f.exports},cea7:function(e,t,a){"use strict";var i=a("3378"),n=a.n(i);n.a},d8cb:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={uniIcons:a("cfb1").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-navbar"},[a("v-uni-view",{staticClass:"uni-navbar__header"},[a("v-uni-view",{staticClass:"flex-center"},[e.iconLeft?a("uni-icons",{staticStyle:{"font-weight":"800","z-index":"9999"},attrs:{color:"#30495E",type:"arrowthinleft",size:"24"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goback()}}}):e._e(),a("v-uni-text",{staticClass:"uni-navbar__header_text"},[e._v(e._s(e.title))]),e._t("left")],2),e._t("right")],2)],1)},r=[]},edf4:function(e,t,a){"use strict";a.r(t);var i=a("9012"),n=a("f760");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);var o,d=a("f0c5"),f=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"06d735b5",null,!1,i["a"],o);t["default"]=f.exports},f760:function(e,t,a){"use strict";a.r(t);var i=a("fd59"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},fd59:function(e,t,a){"use strict";var i=a("4ea4");a("fb6a"),a("ac1f"),a("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("b35f")),r={components:{efItem:n.default},props:{kinds:{type:String,default:""},id:{type:String,default:""},type:{type:String,default:"add"},info:{type:Object,default:function(){}}},data:function(){return{form:{},rules:{}}},watch:{info:{handler:function(e){console.log(e,"nval"),this.form=e,this.form.taskItemNamesNum=e.taskItemNames.split(",").length,this.form.timeSection=e.startPlanDate.slice(0,10)+"~"+e.finishPlanDate.slice(0,10)},deep:!0,immediate:!0},form:{handler:function(){this.$emit("over")},deep:!0}},created:function(){},mounted:function(){this.$refs.uForm.setRules(this.rules)},methods:{}};t.default=r}}]);
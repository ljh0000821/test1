(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-task-hiddenDanger-examine"],{"0bba":function(t,e,a){var r=a("24fb");e=r(!1),e.push([t.i,".container[data-v-34fb5776]{margin:0 %?16?%;background:#fff;-webkit-box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);box-shadow:0 %?4?% %?16?% 0 rgba(14,23,37,.08);-webkit-border-radius:%?24?%;border-radius:%?24?%;padding:%?15?% %?40?% %?15?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box}.btn[data-v-34fb5776]{width:%?120?%;height:%?50?%!important;-webkit-border-radius:%?30?%;border-radius:%?30?%;font-size:%?24?%!important;border-color:#05b2cc;color:#05b2cc}.btn-active[data-v-34fb5776]{color:#fff;background-color:#05b2cc}",""]),t.exports=e},"59a5":function(t,e,a){"use strict";a.r(e);var r=a("7829"),o=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);e["default"]=o.a},"59d8":function(t,e,a){"use strict";var r=a("ef36"),o=a.n(r);o.a},7829:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a("32aa"),o=a("ec77"),n={troexthSave:function(t){return(0,o.troexthSave)(t)},trotreehSave:function(t){return(0,o.trotreehSave)(t)}},i={ccsh:[3,1],bzsh:[6,4],zzsh:[7,4]},u={components:{},data:function(){return{loading:!1,id:"",form:{state:"",opinon:""},stateT:"",stateF:"",type:0,stateObj:""}},onLoad:function(t){this.id=t.id,this.type=t.type,this.stateObj=t.stateObj,this.form.state=i[t.stateObj][0],this.stateT=i[t.stateObj][0],this.stateF=i[t.stateObj][1]},onReady:function(){this.$refs.uForm.setRules(this.rules)},methods:{changeState:function(t){this.form.state=t},submit:function(){var t=this;this.loading=!0;var e=this.form.state==this.stateT?"已通过":"未通过",a={parentId:this.id,state:this.form.state,opinon:(0,r.sendOption)(e,this.form.opinon)};console.log(a,"params");var o=0==this.type?"troexthSave":"trotreehSave";n[o](a).then((function(){t.$refs.uToast.show({title:"审核成功！"}),t.loading=!1,setTimeout((function(){t.$goBack()}),500)})).catch((function(){t.loading=!1}))}}};e.default=u},d03c:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return r}));var r={customNavbar:a("384b").default,uForm:a("586b").default,uFormItem:a("e2f4").default,uButton:a("147a").default,uInput:a("87aa").default,uToast:a("4463").default},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("custom-navbar",{attrs:{title:"审核隐患",iconLeft:!0}}),a("v-uni-view",{staticClass:"container flex1"},[a("u-form",{ref:"uForm",attrs:{model:t.form}},[a("u-form-item",{attrs:{label:"审核结果",prop:"state","label-width":"150"}},[a("v-uni-view",{staticClass:"flex1 flex-end"},[a("v-uni-view",[a("u-button",{class:["btn",{"btn-active":t.form.state==t.stateT}],attrs:{shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeState(t.stateT)}}},[t._v("通过")])],1),a("v-uni-view",{staticClass:"m-l-16"},[a("u-button",{class:["btn",{"btn-active":t.form.state==t.stateF}],attrs:{shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeState(t.stateF)}}},[t._v("驳回")])],1)],1)],1),a("u-form-item",{attrs:{label:"审核意见",prop:"opinon","label-width":"150","label-position":"top"}},[a("u-input",{attrs:{type:"textarea",border:!0},model:{value:t.form.opinon,callback:function(e){t.$set(t.form,"opinon",e)},expression:"form.opinon"}})],1)],1),a("u-button",{staticClass:"ef-btn",attrs:{type:"primary",ripple:!0,loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确认")])],1),a("u-toast",{ref:"uToast"})],1)},n=[]},ea8d:function(t,e,a){"use strict";a.r(e);var r=a("d03c"),o=a("59a5");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("59d8");var i,u=a("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"34fb5776",null,!1,r["a"],i);e["default"]=s.exports},ec77:function(t,e,a){"use strict";var r=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.getTroTypeLevel=e.trotreeSubmit=e.depleaderListman=e.trotreemSubmit=e.troclaGetBasis=e.troclaGetType=e.trotreehSave=e.trotreeDetail=e.trotreeList=e.troexthSave=e.troextDetail=e.troextmSubmit=e.troextSubmit=e.troextList=void 0;var o=r(a("5f30")),n=function(t){return(0,o.default)({url:"/blade-sd/troext/list",method:"get",data:t})};e.troextList=n;var i=function(t){return(0,o.default)({url:"/blade-sd/troext/submit",method:"post",data:t})};e.troextSubmit=i;var u=function(t){return(0,o.default)({url:"/blade-sd/troextm/submit",method:"post",data:t})};e.troextmSubmit=u;var s=function(t){return(0,o.default)({url:"/blade-sd/troext/detail",method:"get",data:t})};e.troextDetail=s;var d=function(t){return(0,o.default)({url:"/blade-sd/troexth/save",method:"post",data:t})};e.troexthSave=d;var l=function(t){return(0,o.default)({url:"/blade-sd/trotree/list",method:"get",data:t})};e.trotreeList=l;var c=function(t){return(0,o.default)({url:"/blade-sd/trotree/detail",method:"get",data:t})};e.trotreeDetail=c;var f=function(t){return(0,o.default)({url:"/blade-sd/trotreeh/save",method:"post",data:t})};e.trotreehSave=f;var b=function(t){return(0,o.default)({url:"/blade-sd/trocla/getType",method:"get",data:t})};e.troclaGetType=b;var v=function(t){return(0,o.default)({url:"/blade-sd/trocla/getBasis",method:"get",data:t})};e.troclaGetBasis=v;var m=function(t){return(0,o.default)({url:"/blade-sd/trotreem/submit",method:"post",data:t})};e.trotreemSubmit=m;var h=function(t){return(0,o.default)({url:"/blade-sd/depleader/listman",method:"get",data:t})};e.depleaderListman=h;var p=function(t){return(0,o.default)({url:"/blade-sd/trotree/submit",method:"post",data:t})};e.trotreeSubmit=p;var g=function(t){return(0,o.default)({url:"/trocla/getTroTypeLevel",method:"get",data:t})};e.getTroTypeLevel=g},ef36:function(t,e,a){var r=a("0bba");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var o=a("4f06").default;o("43234744",r,!0,{sourceMap:!1,shadowMode:!1})}}]);
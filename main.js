import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
import store from "./store";
import filter from "./utils/filter";
import directives from "./utils/directives";
import {
	pulicUtils
} from "./utils/utils";
import config from "./common/config";
import VueAMap from "vue-amap";
import comComponents from "./utils/components";
import baseFunction from "./utils/baseFunction";
import {
	router,
	RouterMount
} from "./router/index"; //路径换成自己的
Vue.use(router);
Vue.use(filter);
Vue.use(directives);
Vue.prototype.$store = store;
Vue.prototype.$pu = pulicUtils;
Vue.use(uView);
Vue.use(VueAMap);
Vue.use(comComponents);
Vue.use(baseFunction);
VueAMap.initAMapApiLoader({
	key: "0c3b5aa083f840f9e7068e3e2456b0f3",
	plugin: ["AMap.ToolBar", "AMap.Geolocation", "AMap.Weather"],
	v: "1.4.4"
});
console.log(process.env.PRODUCTION, "process.env.PRODUCTION666");
//全局config
Vue.prototype.$config = config;
//i国网测试环境加载vconsole
// if (process.env.PRODUCTION == "IGWTEST") {
	require("@/static/js/vconsole.js");
// }
Vue.config.productionTip = false;
App.mpType = "app";


const app = new Vue({
	store,
	...App
});

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
export default app;

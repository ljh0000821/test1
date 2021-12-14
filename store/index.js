import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import dictionary from "./modules/dictionary";
import systemInfo from "./modules/systemInfo";
import { getNowTime } from "@/utils/tools";
Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state: {
        nowDate: getNowTime().slice(0,10),
    },
    modules: {
        user,
        dictionary,
        systemInfo
    }
});
export default store;
import { login, accountLogin } from "@/api/user.js";
import { setStore, getStore } from "@/utils/store.js";
import { dateFormat } from "@/utils/utils";
//判断是否拿出今日的巡视轨迹
const newUserMove = () => {
    let oldTime = getStore("newTime"), newTime = dateFormat(new Date(), "yyyy-MM-dd");
    if (oldTime != newTime) {
        setStore("newTime", newTime);
        setStore("usermove", []);
        return [];
    }
    return getStore("usermove");
};
export default {
    state: {
        userInfo: {},
        token: "",
        usermove: newUserMove() || []
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    console.log(res, "登录res");
                    const myData = res.data;
                    commit("setserInfo", myData);
                    commit("settoken", myData.access_token);
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        accountLogin({ commit }, data) {
            console.log("/blade-sd/source/getToken");
            return new Promise((resolve, reject) => {
                accountLogin(data).then(res => {
                    const myData = res.data;
                    //console.log('accountLogin', myData)
                    commit("setserInfo", myData);
                    commit("settoken", myData.access_token);
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    },
    mutations: {
        setserInfo(state, data) {
            state.userInfo = data;
            setStore("userInfo", data, true);
        },
        settoken(state, data) {
            state.token = data;
            setStore("token", data, true);
        },
        setUserMove(state, data) {
            state.usermove.push(data);
            setStore("usermove", state.usermove);
        }
    }
};

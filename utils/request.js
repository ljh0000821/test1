let time = null;
const clientId = "saber";
const clientSecret = "saber_secret";
import { Base64 } from "js_sdk/js-base64";
import { getStore } from "@/utils/store";
import config from "@/common/config";
console.log(config, "config");
console.log(process.env, "process.env");
// let baseUrl = config.baseUrl;
const request = (object) => {
    time && clearTimeout(time);
    time = setTimeout(() => {
        uni.showLoading({
            title: "加载中"
        });
    }, 600);
    return new Promise((resolve, reject) => {
        let baseUrl = object.baseUrl ? object.baseUrl : config.baseUrl;
        object.url = baseUrl + object.url;
        object.header = {
            "Authorization": `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
            "content-type": (object.header && object.header["content-type"]) || "application/json"
        };
        if (getStore("token")) {
            object.header["Blade-Auth"] = "bearer " + getStore("token");
        }
        // if (process.env.PRODUCTION == "IGWTEST" || process.env.PRODUCTION == "IGWPRO") {
        //     TMFJSBridge.invoke("commonRequest",
        //         {
        //             "headers": JSON.stringify(object.header),
        //             "params": JSON.stringify(object.data),
        //             "action": object.method.toLocaleLowerCase(),
        //             "url": object.url
        //         }
        //         , function (res) {
        //             console.log(res, "i国网回调");
        //             res.data = JSON.parse(res.result);
        //             time && clearTimeout(time);
        //             uni.hideLoading();
        //             const code = res.data.code || 200;
        //             if (code === 401) {
        //                 uni.navigateTo({
        //                     url: "/pages/login/index"
        //                 });
        //                 return;
        //             }
        //             if (code !== 200) {
        //                 return reject(otherMessge(res.data.msg || res.data.error_description));
        //             }
        //             resolve(res);
        //         }
        //     );
        // } else {
        uni.request({
            ...object,
            // dataType: "JSON",
            success(res) {
                console.log(res, "uni回调");
                time && clearTimeout(time);
                uni.hideLoading();
                if (res.statusCode === 401) {
                    uni.navigateTo({
                        url: "/pages/login/index"
                    });
                    return;
                }
                if (res.statusCode !== 200) {
                    return reject(otherMessge(res.data.msg || res.data.error_description));
                }
                const code = res.data.code || 200;
                if (code === 401) {
                    uni.navigateTo({
                        url: "/pages/login/index"
                    });
                    return;
                }
                if (code !== 200) {
                    return reject(otherMessge(res.data.msg || res.data.error_description));
                }
                resolve(res);
            },
            fail(err) {
                time && clearTimeout(time);
                uni.hideLoading();
                reject(err);
            }
        });
        // }
    });
};

export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return "?" + list.join("&");
};

function otherMessge(msg) {
    msg = msg || "连接服务器失败...";
    uni.$u.toast(msg);
    return msg;
}
export default request;

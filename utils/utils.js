import { JSEncrypt } from "../js_sdk/jsencrypt-Rsa/jsencrypt/jsencrypt.min.js";
export const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDr+ES+aJ52VgpNtkMH7E3G7yrq+77Hi23oWzh/9j3QElEE5G9XH2fBHcK4rDvr2uUcFcdL9aqdFSWJrBMpY8g+hAJER9vKI8oGXrtS5yKJqme2w85/igKhHOiV39TN8R2id+lTDWQzKO3W/f3rr0IzE50A8bCPEi0F5tyByBozSwIDAQAB";
export const encryptedData = (data) => {
    let encryptor = new JSEncrypt();
    // 设置公钥
    encryptor.setPublicKey(publicKey);
    // 加密数据
    return encryptor.encrypt(data);
};
/**
 * 发送审核判断
 * @param {*} text 
 * @param {*} opinion 
 */
export const sendOption = (text, opinion) => {
    return text + (opinion ? "：" + opinion : "");
};

export const pulicUtils = {
    // 对表单提交 进行验证
    validate(form, refs) {
        return new Promise((resolve, reject) => {
            if (!form) return reject("请传入验证对象");
            if (!refs) return reject("请传入验证ref");
            Array.isArray(refs.$slots.default) && refs.$slots.default.some(item => {
                const rules = item?.data?.attrs?.rules;
                if (rules?.required && (!form[rules?.prop] || form[rules?.prop]?.length === 0)) {
                    uni.showToast({
                        title: rules?.message || "请选择",
                        icon: "none"
                    });
                    reject && reject(rules?.message);
                    return true;
                }
            });
            resolve(true);
        });
    }
};

/**
 * 日期格式化
 */
export function dateFormat(date, format) {
    format = format || "yyyy-MM-dd hh:mm:ss";
    if (date !== "Invalid Date") {
        let o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    return "";

}
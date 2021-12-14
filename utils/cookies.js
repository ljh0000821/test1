/**
 * @author xxxx
 * @description 保存cookie
 * @param {String} name 需要存储cookie的key
 * @param {String} value 需要存储cookie的value
 * @param {Number} timer 默认存储多少天
 */
export function setCookie(name, value, timer = 3) {
    let Days = timer; //默认将被保存 3 天
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = "ef-" + name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * @author xxxx
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
export function getCookie(name) {
    let arr = document.cookie.match(new RegExp("(^| )" + "ef-" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    } else {
        return "";
    }
}

export function getCookieA(name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            let cookie = document.cookie.substring(c_start, c_end);
            return cookie;
        }
    }
    return "";
}

/**
 * @author xxxx
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
export function clearCookie(name) {
    let realName = "ef-" + name;
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(realName);
    if (cval != null) document.cookie = realName + "=" + cval + ";expires=" + exp.toGMTString();
}
export function GetCookie(offset) {
    let endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return decodeURIComponent(document.cookie.substring(offset, endstr));
}
export function emptyCookie() {
    console.log(document.cookie, "document.cookie");
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;) {
            let exp = new Date();
            exp.setTime(exp.getTime() - 1);
            let cval = getCookieA(keys[i]);
            console.log(cval, "cval");
            document.cookie = keys[i] + "=" + cval + "; expires=" + exp.toGMTString();
        }
    }
}
export function delCookie() {

    let keys = document.cookie.match(/[^ =;]+(?==)/g);

    console.log("delCookie", keys);

    if (keys) {

        for (let i = keys.length; i--;) {

            document.cookie = keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); // 清除当前域名下的,例如：m.ratingdog.cn

            document.cookie = keys[i] + "=0;path=/;domain=" + document.domain + ";expires=" + new Date(0)

                .toUTCString(); // 清除当前域名下的，例如 .m.ratingdog.cn

            document.cookie = keys[i] + "=0;path=/;domain=ratingdog.cn;expires=" + new Date(0)

                .toUTCString(); // 清除一级域名下的或指定的，例如 .ratingdog.cn

        }

    }

}
//判断类型
export function getType(data) {
    return Object.prototype.toString.call(data).match(/\s+(\w+)/)[1];
}
//组成[{text:any}]
export function getList(data) {
    if (data.length === 1 && !data[0]) {
        data = ["空"];
    }
    return data.map((item) => {
        let obj = {
            text: item,
            id: item
        };
        return obj;
    });
}
//时间格式化
export function dateFormat(date, fmt) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),// 年
        "m+": (date.getMonth() + 1).toString(),// 月
        "d+": date.getDate().toString(),// 日
        "H+": date.getHours().toString(),// 时
        "M+": date.getMinutes().toString(),// 分
        "S+": date.getSeconds().toString()// 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
        }
    }
    return fmt;
}
//获取当前时间
export function getNowTime() {
    let time = new Date();
    return dateFormat(time, "YYYY-mm-dd HH:MM:SS");
}
//获取日期的时间戳
export function getTime(date) {
    return new Date(date).getTime();
}
//结束日期是否大于开始日期
export function compareDate(date1, date2) {
    return new Date(date2).getTime() >= new Date(date1).getTime();
}
//数组内容分组
export function groupArr(arr, key, name) {
    let obj = {}, newArr = [];
    arr.forEach((item, index) => {
        if (!obj.hasOwnProperty(item[key])) {
            newArr.push({
                [key]: item[key],
                [name]: name && item[name] ? item[name] : index,
                data: [item]
            });
            obj[item[key]] = item[key];
        } else {
            newArr.forEach(v => {
                if (v[key] == item[key]) {
                    v.data.push(item);
                }
            });
        }
    });
    return newArr;
}
//传递参数编码
export function encodeData(data) {
    console.log(encodeURIComponent(JSON.stringify(data)), "123");
    return encodeURIComponent(JSON.stringify(data));
}
//传递参数
export function decodeData(data) {
    return JSON.parse(decodeURIComponent(data));
}
//两个数组交集
export function getIntersection(arr1, arr2) {
    return arr1.filter((val) => {
        return arr2.indexOf(val) > -1;
    });
}
//sin
export function getSin(vAngle) {
    return Math.round(Math.sin((vAngle * Math.PI / 180)) * 1000000) / 1000000;
}
//cos
export function getCos(vAngle) {
    return Math.round(Math.cos((vAngle * Math.PI / 180)) * 1000000) / 1000000;
}
//通过sin值返回角度
export function getAngle(data) {
    return Math.asin(data) * 180 / Math.PI;
}
//表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
};
//用于生成uuid
export function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function getUUID() {
    return guid();
}
//计算两个坐标间的距离
export function GetDistance(position1, position2) {
    let [lng1, lat1] = position1,
        [lng2, lat2] = position2;
    let radLat1 = lat1 * Math.PI / 180.0;
    let radLat2 = lat2 * Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
//base64加解密
export function Base64() {

    // private property  
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding  
    this.decode = function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding  
    let _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding  
    let _utf8_decode = function (utftext) {
        let string = "";
        let i = 0;
        let c = 0, c1 = 0, c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
}
//是否是ios
export function isIos() {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}
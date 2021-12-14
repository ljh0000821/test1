import request, { serialize } from "@/utils/request.js";

export const login = (data) => {
    return request({
        url: "/blade-auth/oauth/token",
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data
    });
};

//根据账户名登录
export const accountLogin = (data) => {
    return request({
        // url: "/blade-sd/api/getToken",
        url: "/blade-user/token/getToken",
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data
    });
};

//轨迹上传
export const usermoveSubmit = (data) => {
    return request({
        url: "/blade-sd/usermove/submit",
        method: "POST",
        data
    });
};
//用户列表
export const userList = (data) => {
    return request({
        url: "/blade-user/user-list",
        method: "get",
        data
    });
};

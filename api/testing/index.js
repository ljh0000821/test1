import request from "@/utils/request.js";

//红外测温添加修改
export const tyjjcdlwhcwjlSubmit = (data) => {
    return request({
        url: "/blade-sd/tyjjcdlwhcwjl/submit",
        method: "POST",
        data
    });
};
//覆冰观测添加修改
export const tyjjcdxblxfbgcjlSubmit = (data) => {
    return request({
        url: "/blade-sd/tyjjcdxblxfbgcjl/submit",
        method: "POST",
        data
    });
};
//接地电阻添加修改
export const tyjjcjddzcljlSubmit = (data) => {
    return request({
        url: "/blade-sd/tyjjcjddzcljl/submit",
        method: "POST",
        data
    });
};
//交叉跨越添加修改
export const tyjjcjckyjddjlcljlSubmit = (data) => {
    return request({
        url: "/blade-sd/tyjjcjckyjddjlcljl/submit",
        method: "POST",
        data
    });
};
//巡视检测列表
export const getTestByTwrIdPage = (data) => {
    return request({
        url: "/blade-sd/taskitem/getTestByTwrIdPage",
        method: "get",
        data
    });
};
//巡视检测列表-详情
export const taskitemGetTestByTestId = (data) => {
    return request({
        url: "/blade-sd/taskitem/getTestByTestId",
        method: "get",
        data
    });
};
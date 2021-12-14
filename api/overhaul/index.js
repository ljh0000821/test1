import request from "@/utils/request.js";

//检修详情
export const taskhaulitemDetail = (data) => {
    return request({
        url: "/blade-sd/taskhaulitem/detail",
        method: "get",
        data
    });
};
//杆塔检修列表
export const taskhaulitemGetItemTwrInfo = (data) => {
    return request({
        url: "/blade-sd/taskhaulitem/getItemTwrInfo",
        method: "get",
        data
    });
};
//修试记录提交
export const tyjdwyjxsjlSubmit = (data = {}) => {
    return request({
        url: "/blade-sd/tyjdwyjxsjl/submit",
        method: "post",
        data,
    });
};
//查看修饰记录 验收 勘察详情
export const taskhaulitemGetkcxsys = (data = {}) => {
    return request({
        url: "/blade-sd/taskhaulitem/getkcxsys",
        method: "get",
        data,
    });
};
//验收提交
export const tyjdwyjyxrzsbysjlSubmit = (data = {}) => {
    return request({
        url: "/blade-sd/tyjdwyjyxrzsbysjl/submit",
        method: "post",
        data,
    });
};
//勘察记录-详情
export const tyjdwyjxckcjlbDetail = (data = {}) => {
    return request({
        url: "/blade-sd/tyjdwyjxckcjlb/detail",
        method: "get",
        data,
    });
};
//检修-修改任务状态
export const taskhaulitemSubmit = (data = {}) => {//传入子任务主键ID和ITEM_STATE
    return request({
        url: "/blade-sd/taskhaulitem/submit",
        method: "post",
        data,
    });
};
//勘察-新增修改
export const tyjdwyjxckcjlbSubmit = (data = {}) => {
    return request({
        url: "/blade-sd/tyjdwyjxckcjlb/submit",
        method: "post",
        data,
    });
};
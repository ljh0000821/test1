import request from "@/utils/request.js";

//三级护线
export const depguardList = (data) => {
    return request({
        url: "/blade-sd/depguard/list",
        method: "GET",
        data
    });
};
//导线列表
export const pmcgwList = (data) => {
    return request({
        url: "/blade-sd/pmcgw/list",
        method: "get",
        data
    });
};
//应力计算
export const stressCalcuation = (data) => {
    return request({
        url: "/blade-sd/pmcgw/stressCalcuation",
        method: "get",
        data
    });
};
//接地电阻列表
export const testRecordQuery = (data) => {
    return request({
        url: "/blade-sd/stahis/testRecordQuery",
        method: "get",
        data
    });
};
//告警列表
export const alertList = (data) => {
    return request({
        url: "/blade-sd/source/alarmh/page",
        method: "get",
        data
    });
};
//告警详情
export const alertOrder = (data) => {
    return request({
        url: "/blade-sd/source/alarmh/detail",
        method: "get",
        data
    });
};
//告警处理
export const alertHandle = (data) => {
    return request({
        url: "/blade-sd/source/alarmh/saveOrUpdate",
        method: "post",
        data
    });
};
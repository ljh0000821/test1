import request from "@/utils/request.js";
//缺陷列表
export const historyListH = (data) => {
    return request({
        url: "/blade-sd/history/listH",
        method: "get",
        data,
    });
};
//外力隐患历史
export const troexthList = (data) => {
    return request({
        url: "/blade-sd/troexth/list",
        method: "get",
        data,
    });
};
//树竹隐患历史
export const trotreehList = (data) => {
    return request({
        url: "/blade-sd/trotreeh/list",
        method: "get",
        data,
    });
};
//首页缺陷隐患数量
export const defAndTroNumH5 = (params) => {
    return request({
        url: "/blade-sd/stahis/defAndTroNumH5",
        method: "get",
        params
    });
};
//总览数据统计
export const notRealTimeData = (params) => {
    return request({
        url: "/blade-sd/statistics/notRealTimeData",
        method: "get",
        params
    });
};

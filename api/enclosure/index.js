import request from "@/utils/request.js";
//创建围栏
export const addEnclosure = (data) => {
    return request({
        baseUrl: "/api?key=" + "c08fa55f62104250eaf587d9a4122c9a",
        url: "",
        method: "POST",
        data,
    });
};
//查询围栏
export const getEnclosure = (data) => {
    return request({
        baseUrl: "/api?key=" + "c08fa55f62104250eaf587d9a4122c9a",
        url: "",
        method: "GET",
        data,
    });
};
//设备围栏监控
export const watchEnclosure = (data) => {
    return request({
        baseUrl: "/api2",
        url: "",
        method: "GET",
        data,
    });
};
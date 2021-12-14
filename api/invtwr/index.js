import request from "@/utils/request.js";

//极速查询
export const invtwrList = (data) => {
    return request({
        url: "/blade-sd/invtwr/listAllByLineID",
        method: "GET",
        data
    });
};
//根据线路id查询杆塔
export const towersPMS = (data) => {
    return request({
        url: "/blade-sd/source/towers",
        method: "GET",
        data: {
            current: 1,
            size: -1,
            ...data
        }
    });
};
//杆塔详情
export const invtwrDetail = (data) => {
    return request({
        url: "/blade-sd/invtwr/detail",
        method: "get",
        data
    });
};
//杆塔纠正
export const twrsetSubmit = (data) => {
    return request({
        url: "/blade-sd/twrset/submit",
        method: "post",
        data
    });
};

import request from "@/utils/request.js";

//工程详情
export const checkengmanagDetailH5 = (data) => {
    return request({
        url: "/blade-sd/checkengmanag/detailH5",
        method: "get",
        data,
    });
};
//工程验收-新增修改
export const checkengtaskSubmit = (data) => {
    return request({
        url: "/blade-sd/checkengtask/submit",
        method: "post",
        data,
    });
};
//工程验收-新增缺陷
export const checkengdefSubmit = (data) => {
    return request({
        url: "/blade-sd/checkengdef/submit",
        method: "post",
        data,
    });
};
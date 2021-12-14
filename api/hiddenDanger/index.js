import request from "@/utils/request.js";
//外力隐患列表
export const troextList = (data) => {
    return request({
        url: "/blade-sd/troext/list",
        method: "get",
        data,
    });
};
//外力隐患添加修改
export const troextSubmit = (data) => {
    return request({
        url: "/blade-sd/troext/submit",
        method: "post",
        data,
    });
};
//外力隐患维护添加修改
export const troextmSubmit = (data) => {
    return request({
        url: "/blade-sd/troextm/submit",
        method: "post",
        data,
    });
};
//外力隐患详情
export const troextDetail = (data) => {
    return request({
        url: "/blade-sd/troext/detail",
        method: "get",
        data,
    });
};
//外力隐患审核
export const troexthSave = (data) => {
    return request({
        url: "/blade-sd/troexth/save",
        method: "post",
        data,
    });
};
//树竹隐患列表
export const trotreeList = (data) => {
    return request({
        url: "/blade-sd/trotree/list",
        method: "get",
        data,
    });
};
//树林隐患详情
export const trotreeDetail = (data) => {
    return request({
        url: "/blade-sd/trotree/detail",
        method: "get",
        data,
    });
};
//树林隐患审核
export const trotreehSave = (data) => {
    return request({
        url: "/blade-sd/trotreeh/save",
        method: "post",
        data,
    });
};
//隐患分类
export const troclaGetType = (data) => {
    return request({
        url: "/blade-sd/trocla/getType",
        method: "get",
        data,
    });
};
//隐患分类依据和分级
export const troclaGetBasis = (data) => {
    return request({
        url: "/blade-sd/trocla/getBasis",
        method: "get",
        data,
    });
};
//树林隐患维护添加修改
export const trotreemSubmit = (data) => {
    return request({
        url: "/blade-sd/trotreem/submit",
        method: "post",
        data,
    });
};
//供电单位联系人
export const depleaderListman = (data) => {
    return request({
        url: "/blade-sd/depleader/listman",
        method: "get",
        data
    });
};

//树林隐患添加修改
export const trotreeSubmit = (data) => {
    return request({
        url: "/blade-sd/trotree/submit",
        method: "post",
        data,
    });
};
//隐患等级 1外力，2树竹
export const getTroTypeLevel = (data) => {
    return request({
        url: "/trocla/getTroTypeLevel",
        method: "get",
        data,
    });
};
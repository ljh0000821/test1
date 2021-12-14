import request, { serialize } from "@/utils/request.js";
//缺陷列表
export const deflist = (data) => {
    return request({
        url: "/blade-sd/def/list",
        method: "get",
        data,
    });
};
//部件等
export const defclaDetail = (data = {}) => {
    return request({
        url: "/blade-sd/defcla/detail",
        method: "get",
        data,
    });
};
//新增修改
export const defSaveOrUpdate = (data = {}) => {
    return request({
        url: "/blade-sd/def/saveOrUpdate",
        method: "post",
        data,
    });
};
//缺陷详情
export const defFindByDef = (id) => {
    return request({
        url: "/blade-sd/def/findByDef/" + id,
        method: "get"
    });
};
//获取超期缺陷
export const defOverdue = () => {
    return request({
        url: "/blade-sd/def/overdue",
        method: "get"
    });
};

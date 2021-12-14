import request from "@/utils/request.js";

export const getList = (url, data) => {
    return request({
        url: url,
        method: "GET",
        data
    });
};

//班组列表
export const selectTeamUserList = (data) => {
    return request({
        url: "/blade-user/list",
        method: "get",
        data: {
            ...data,
            size: 1000
        }
    });
};

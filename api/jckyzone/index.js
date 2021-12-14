import request from "@/utils/request.js";

//交叉跨越区段
export const jckyzoneList = (data) => {
    return request({
        url: "/blade-sd/jckyzone/list",
        method: "get",
        data,
    });
};
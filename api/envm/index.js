import request from "@/utils/request.js";
//环境新增修改
export const envmSaveOrUpdate = (data) => {
    return request({
        url: "/blade-sd/envm/saveOrUpdate",
        method: "post",
        data,
    });
};
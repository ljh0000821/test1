import request from "@/utils/request.js";

//巡视列表
export const taskList = (url = "/blade-sd/taskitem/list", data) => {
    return request({
        url: url,
        method: "GET",
        data
    });
};

//巡视列表
export const taskSave = (data) => {
    return request({
        url: "/blade-sd/task/save",
        method: "POST",
        data
    });
};
//巡视列表-详情
export const taskitemDetail = (data) => {
    return request({
        url: "/blade-sd/taskitem/detail",
        method: "get",
        data
    });
};
//巡视任务-详情
export const taskDetail = (id) => {
    return request({
        url: "/blade-sd/task/detail/" + id,
        method: "get"
    });
};
//巡视杆塔列表
export const findTwrsByTaskId = (data) => {
    return request({
        url: "/blade-sd/task/findTwrsByTaskId",
        method: "get",
        data
    });
};
//巡视任务修改状态
export const taskitemUpdate = (data) => {
    return request({
        url: "/blade-sd/taskitem/update",
        method: "post",
        data
    });
};
//根据杆塔查询巡视详情
export const taskitemFindTwrsByItemId = (taskItemId, twrId) => {
    return request({
        url: "/blade-sd/taskitem/findTwrsByItemId/" + taskItemId + "/" + twrId,
        method: "get"
    });
};
//根据杆塔查询巡视详情H5
export const findTwrsByItemIdH5 = (data) => {
    return request({
        url: "/blade-sd/taskitem/findTwrsByItemIdH5",
        method: "get",
        data
    });
};
//巡视-签到
export const tasksignSubmit = (data) => {
    return request({
        url: "/blade-sd/tasksign/submit",
        method: "post",
        data
    });
};
//巡视-tasknotes创建
export const tasknotesSubmit = (data) => {
    return request({
        url: "/blade-sd/tasknotes/submit",
        method: "post",
        data
    });
};
//根据子任务和杆塔号查询检测记录
export const getTestByItemId = (data) => {
    return request({
        url: "/blade-sd/taskitem/getTestByItemId",
        method: "get",
        data
    });
};
//根据子任务和杆塔号查询检测记录-历史值
export const getTestByItemIdPage = (data) => {
    return request({
        url: "/blade-sd/taskitem/getTestByItemIdPage",
        method: "get",
        data
    });
};
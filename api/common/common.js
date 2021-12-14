import request from "@/utils/request.js";
const clientId = "saber";
const clientSecret = "saber_secret";
import config from "@/common/config";
import { Base64 } from "js_sdk/js-base64";
import { getStore } from "@/utils/store";
import { serialize } from "@/utils/tools";
//线路列表
export const equlineList = (data) => {
    return request({
        url: "/blade-sd/equline/list",
        method: "get",
        data,
    });
};
//线路列表（pms）
export const listByZone = (data) => {
    return request({
        url: "/blade-sd/source/listByZone",
        method: "get",
        data,
    });
};
//线路详情
export const equlineDetail = (data) => {
    return request({
        url: "/blade-sd/equline/detail",
        method: "get",
        data,
    });
};
//线路详情（pms）
export const pmsLines = (data) => {
    return request({
        url: "/blade-sd/source/lines",
        method: "get",
        data,
    });
};
//下载图片
export const downloadFile = (params) => {
    return request({
        url: "/blade-sd/source/download",
        method: "get",
        params,
        responseType: "blob"
    });
};

//文件上传
export const fileUpload = (params, data) => {
    let str = "";
    if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
        str = "/blade-sd/file/fileupload";
    } else {
        str = "/blade-sd/file/fileupload";
    }
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: config.baseUrl + str,
            header: {
                "Authorization": `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
                "Blade-Auth": "bearer " + getStore("token"),
            },
            name: "fileupload",
            files: params,
            formData: data,
            success(res) {
                let rel = JSON.parse(res.data);
                if (rel.code == 200) {
                    resolve(rel.data);
                }
            },
            fail(err) {
                console.log(err, "上传失败err", config.baseUrl + "/api/blade-sd/file/fileupload");
                reject(err);
            }
        });
    });
};

//删除图片
export const fileRemovePic = (params) => {
    return request({
        url: "/blade-sd/file/removePic?id=" + params.id + "&type=" + params.type,
        method: "post",
    });
};
//水印图片上传
export const fileFileUp = (params, data) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: config.baseUrl + "/blade-sd/file/fileUp",
            header: {
                "Authorization": `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
                "Blade-Auth": "bearer " + getStore("token"),
            },
            name: "file",
            files: params,
            formData: data,
            success(res) {
                let rel = JSON.parse(res.data);
                if (rel.code == 200) {
                    resolve(rel.data);
                }
            },
            fail(err) {
                console.log(err, "上传失败err", config.baseUrl + "/api/blade-sd/file/fileupload");
                reject(err);
            }
        });
    });
};
/**
 * 全局配置文件
 */
// import app from "../main";
import config from "./config";
export default {
    title: "架空输电巡检系统",
    logo: "S",
    key: "saber", //配置主键,目前用于存储
    indexTitle: "架空输电巡检系统",
    clientId: "saber", // 客户端id
    clientSecret: "saber_secret", // 客户端密钥
    tenantMode: false, // 是否开启租户模式
    lockPage: "/lock",
    tokenTime: 3000,
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [],
    //配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        label: "首页",
        value: "/home/index",
        params: {},
        query: {},
        meta: {
            i18n: "dashboard"
        },
        group: [],
        close: false
    },
    //配置菜单的属性
    menu: {
        iconDefault: "iconfont icon-caidan",
        props: {
            label: "name",
            path: "path",
            icon: "source",
            children: "children"
        }
    },
    // 流程设计器地址
    flowDesignUrl: "http://localhost:9999",
    //RSA加密 公钥
};


export const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDr+ES+aJ52VgpNtkMH7E3G7yrq+77Hi23oWzh/9j3QElEE5G9XH2fBHcK4rDvr2uUcFcdL9aqdFSWJrBMpY8g+hAJER9vKI8oGXrtS5yKJqme2w85/igKhHOiV39TN8R2id+lTDWQzKO3W/f3rr0IzE50A8bCPEi0F5tyByBozSwIDAQAB";
// export const BASE_IMG_URL = app.$config.baseUrl + "/blade-sd/api/downFromOracle"; //图片下载地址
export const BASE_IMG_URL = config.baseUrl + "/blade-sd/api/downFromOracle"; //图片下载地址
export const MAP_URL = "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_URL_img_w = "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=84567f2343b0d12ab07341d540f1fe2b";
export const MAP_URL_cia_w = "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=84567f2343b0d12ab07341d540f1fe2b";

//内网配置
// export const BASE_IMG_URL = '/cqef-gateway/blade-sd/api/downFromOracle'; //图片下载地址
// export const MAP_URL = '/cqef-tomcat/gismap/googlemaps/roadmap/{z}/{x}/{y}.png';
// export const MAP_URL_img_w = '/cqef-tomcat/gismap/googlemaps/satellite/{z}/{x}/{y}.jpg';
// export const MAP_URL_cia_w = 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=84567f2343b0d12ab07341d540f1fe2b';


/******************** TMFJSBridge 接入层 ********************/

// JS API 接口调用
/*
TMFJSBridge.invoke(apiName, {
    param0 : param0,            // any，参数 0
    param1 : param1,            // any，参数 1
    // ...
    paramN : paramN,            // any，参数 n
}, function (res) {
    console.log({
        version : res.ret,      // number，接入层错误码，有效值：0 表示成功，1 表示接入层失败，2 表示业务层失败，-1 表示取消（部分接口有取消操作）
        errMsg  : res.errMsg,   // string，接入层错误详细信息
    });
});
*/

// JS API 事件监听
/*
TMFJSBridge.on(event_name, function (e) {
    console.log();
});
*/

/******************** Log ********************/

function tmf_log(content, logType) {
    console.log(logType);
    if (logType == 1 || logType == null) {
        console.log(content);
    } else if (logType == 2) {
        setTimeout(function () {
            alert(content);
        }, 1);
    }
}

function tmf_logObject(object, logType) {
    tmf_log(JSON.stringify(object), logType);
}

/******************** 初始化 ********************/
/**
 * 当 window.onload 后，H5 容器会初始化，TMFJSBridge 会注入容器，然后触发 TMFJSBridge 初始化完毕（TMFJSBridgeReady）事件。
 * TMFJSBridge 注入是一个异步过程，因此尽可能监听该事件后，再使用 TMFJSBridge.invoke 来调用 JS API。
 */
function tmf_ready(callback) {
    if (window.TMFJSBridge) {
        callback && callback();
    } else {
        console.log("TMFJSBridgeReady添加监听");
        document.addEventListener("TMFJSBridgeReady", callback, false);
    }
}

/******************** 基础信息 ********************/
// 获取版本号
function tmf_getVersion() {
    TMFJSBridge.invoke("getVersion", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            version: res.version, // string，当前 app 的版本号
        });
    });
}

// 获取 Build 号
function tmf_getBuild() {
    TMFJSBridge.invoke("getBuild", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            build: res.build, // string，当前 app 的 build 号
        });
    });
}

// 获取 GUID
function tmf_getGUID() {
    TMFJSBridge.invoke("getGUID", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            guid: res.guid, // string，当前用户的 GUID
        });
    });
}

/******************** 页面上下文 ********************/

// 打开新页面
function tmf_openContainer(aUrl) {
    TMFJSBridge.invoke("openContainer", {
        url: aUrl, // string，必选，URL 地址
        params: { // dictionary，可选，参数
            defaultTitle: "", // string，可选，默认标题
            showsContainerTitle: true, // bool，可选，是否展示页面标题
        },
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 获取 H5 容器栈
// array，H5 容器栈，格式如下：
/*
 *  [
 *      { containerId: id_0, url: '...', }, // 容器 0
 *      { containerId: id_1, url: '...', }, // 容器 1
 *      { containerId: id_2, url: '...', }, // 容器 2
 *      // ...
 *      {                                   // 容器 N
 *        containerId: id_n,                // integer，容器 ID
 *        url: '...',                       // string，容器 URL
 *      }, // 容器 N
 *  ]
 */
function tmf_getContainerStack() {
    TMFJSBridge.invoke("getContainerStack", {
    }, function (res) {
        //        tmf_logObject(res, 2);
        tmf_logObject({
            containerStack: res.containerStack,
        });
        tmf_closeContainers();
    });
}

function tmf_showContainerStack() {
    TMFJSBridge.invoke("getContainerStack", {
    }, function (res) {
        tmf_logObject(res, 2);
    });
}

// 关闭当前页面
function tmf_closeContainer() {
    TMFJSBridge.invoke("closeContainer", {
    }, function (res) {
        //tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 关闭多个页面
function tmf_closeContainers() {
    TMFJSBridge.invoke("closeContainers", {
        containerIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // array，必选，需要关闭的 H5 容器 ID 的集合
    }, function (res) {
        //tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 判断其他应用是否安装
function tmf_isAppInstalled() {
    TMFJSBridge.invoke("isAppInstalled", {
        url_ios: "mqqsecure://", // string，必选（iOS），iOS app URL 地址
        packageName_android: "com.tencent.qqpimsecure" // string，必选（Android），Android app 包名
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            url: res.url, // string，实际判断的 URL 地址
            installed: res.installed, // bool，是否安装了 app
        });
    });
}

// 启动其他应用
function tmf_openApp() {
    TMFJSBridge.invoke("openApp", {
        url_ios: "mqqsecure://", // string，必选（iOS），iOS app URL 地址
        url_android: "weixin://dl/moments", // string，必选（Android），Android app URL 地址
        packageName_android: "com.tencent.qqpimsecure" // string，必选（Android），Android app 包名
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            url: res.url, // string，实际打开的 URL 地址
            packageName: res.packageName, // string，实际打开的包名
            error: res.error, // integer，错误码
        });
    });
}

/******************** 基础事件 ********************/

// 页面出现
function tmf_onPageAppear() {
    TMFJSBridge.on("pageAppear", function (e) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 页面消失
function tmf_onPageDisappear() {
    TMFJSBridge.on("pageDisappear", function (e) {
        //tmf_logObject(res, 2);
        //tmf_logObject();
    });
}

/******************** 网络接口 ********************/

// 获取网络状态
function tmf_getNetworkType() {
    TMFJSBridge.invoke("getNetworkType", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            networkType: res.networkType, // string，网络类型，有效值：'none'，'cellular'，'wifi'
        });
    });
}

/******************** 地理位置 ********************/

// 获取当前地理位置
function tmf_getLocation() {
    TMFJSBridge.invoke("getLocation", {
        type: "wgs84", // string，必选，坐标类型，有效值：'wgs84' 表示真实坐标，'gcj02' 表示火星坐标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            latitude: res.latitude, // double，纬度，范围为 90 ~ -90
            longitude: res.longitude, // double，经度，范围为 180 ~ -180
            speed: res.speed, // double，速度，单位为 m/s
            accuracy: res.accuracy, // double，位置精度
        });
    });
}

// 上报设备当前的地理位置
function tmf_reportCurrentLocation() {
    TMFJSBridge.invoke("reportCurrentLocation", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            ret: res.ret,
            errMsg: res.errMsg,
        });
    });
}

// 使用内置地图查看位置
function tmf_openLocation() {
    TMFJSBridge.invoke("openLocation", {
        latitude: 22.5403145, // double，必选，纬度，范围为 90 ~ -90
        longitude: 113.874348, // double，必选，经度，范围为 180 ~ -180
        name: "", // string，可选，位置名
        address: "", // string，可选，地址详情说明
        scale: 1.0, // double，可选，地图缩放级别，默认为 1.0
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

/******************** 分享 ********************/

// 自定义 app 分享内容
function tmf_updateShareData() {
    TMFJSBridge.invoke("updateShareData", {
        appKeys: ["wx_message", "wx_timeline", "qq_message"], // array，必选，分享的 app 组合
        title: "", // string，可选，分享标题
        desc: "", // string，可选，分享描述
        link: "", // string，可选，分享链接
        imgUrl: "", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享至微信朋友圈
function tmf_shareWxTimeLine() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "wx_timeline", // string，必选，分享的 app
        title: "分享到微信朋友圈", // string，可选，分享标题
        desc: "分享内容", // string，可选，分享描述
        link: "https://www.qq.com/?fromdefault", // string，可选，分享链接
        imgUrl: "base64", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享到微信好友
function tmf_shareWxFriend() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "wx_message", // string，必选，分享的 app
        title: "分享到微信好友", // string，可选，分享标题
        desc: "分享内容", // string，可选，分享描述
        link: "https://www.qq.com/?fromdefault", // string，可选，分享链接
        imgUrl: "base64", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享到QQ好友
function tmf_shareQQFriend() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "qq_message", // string，必选，分享的 app
        title: "分享给QQ好友", // string，可选，分享标题
        desc: "分享内容", // string，可选，分享描述
        link: "https://www.qq.com/?fromdefault", // string，可选，分享链接
        imgUrl: "http://img3.cache.netease.com/photo/0005/2013-03-07/8PBKS8G400BV0005.jpg", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享到新浪微博
function tmf_shareSinaWeibo() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "weibo_message", // string，必选，分享的 app
        title: "分享给新浪微博好友", // string，可选，分享标题
        desc: "我正在使用微博客户端发分享文字", // string，可选，分享描述
        link: "https://www.qq.com/?fromdefault", // string，可选，分享链接
        imgUrl: "base64", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享到支付宝会话好友
function tmf_shareAlipayFriend() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "ali_message", // string，必选，分享的 app
        title: "分享给支付宝会话好友", // string，可选，分享标题
        desc: "我正在使用支付宝客户端发分享给会话好友", // string，可选，分享描述
        link: "https://www.qq.com/", // string，可选，分享链接
        imgUrl: "http://img3.cache.netease.com/photo/0005/2013-03-07/8PBKS8G400BV0005.jpg", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 分享网页到支付宝生活圈
function tmf_shareAlipayTimeline() {
    TMFJSBridge.invoke("shareApp", {
        appKeys: "ali_timeline", // string，必选，分享的 app
        title: "分享给支付宝生活圈", // string，可选，分享标题
        desc: "我正在使用支付宝客户端发分享到生活圈", // string，可选，分享描述
        link: "https://www.qq.com/", // string，可选，分享链接
        imgUrl: "http://img3.cache.netease.com/photo/0005/2013-03-07/8PBKS8G400BV0005.jpg", // string，可选，分享图标
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

/******************** 界面 ********************/

// 设置标题及相关属性
function tmf_setTitle(titleStr) {
    TMFJSBridge.invoke("setTitle", {
        title: titleStr, // string，可选，标题
        titleColor: "#ff000000", // string，可选，标题颜色
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 选择列表
function tmf_actionSheet() {
    TMFJSBridge.invoke("actionSheet", {
        title: "请选择", // string，可选，标题
        buttons: ["A", "B", "C", "D"], // array，必选，按钮列表
        cancelButton: "取消" // string，必选，取消按钮
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            clickedButtonIndex: res.clickedButtonIndex, // integer，点击按钮的索引
        });
    });
}

// 警告框
function tmf_alert() {
    TMFJSBridge.invoke("alert", {
        title: "警告", // string，可选，标题
        message: "警告警告再次警告", // string，可选，信息
        okButton: "我知道了", // string，必选，确定按钮
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            clickedButtonIndex: res.clickedButtonIndex, // integer，点击按钮的索引
        });
    });
}

// 确认框
function tmf_confirm() {
    TMFJSBridge.invoke("confirm", {
        title: "嗯哼？", // string，可选，标题
        message: "选择取消还是确定你决定", // string，可选，信息
        okButton: "好的", // string，必选，确定按钮
        cancelButton: "不了", // string，必选，取消按钮
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            clickedButtonIndex: res.clickedButtonIndex, // integer，点击按钮的索引
        });
    });
}

// 设置右上角按钮
function tmf_customOptionMenu(color) {
    TMFJSBridge.invoke("customOptionMenu", {
        items: [
            {
                index: 0,
                title: "关闭网页（set）", // string，可选，标题
                titleColor: color, // string，可选，标题颜色
                action: function (res) {
                    alert(JSON.stringify(res));
                    tmf_closeContainer();
                }
            },
            {
                index: 1,
                title: "复制链接（set）", // string，可选，标题
                titleColor: color, // string，可选，标题颜色
                action: function (res) {
                    alert(JSON.stringify(res));
                }
            },
            {
                index: 2,
                title: "在浏览器打开（set）",
                titleColor: color,
                action: function (res) {
                    alert(JSON.stringify(res));
                }
            }
        ]
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 显示右上角按钮
function tmf_showOptionMenu() {
    TMFJSBridge.invoke("showOptionMenu", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 隐藏右上角按钮
function tmf_hideOptionMenu() {
    TMFJSBridge.invoke("hideOptionMenu", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 显示加载中
function tmf_showLoading() {
    TMFJSBridge.invoke("showLoading", {
        title: "", // string，可选，标题
        detail: "", // string，可选，内容
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 隐藏加载中
function tmf_hideLoading() {
    TMFJSBridge.invoke("hideLoading", {
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 弱提示
function tmf_showToast() {
    TMFJSBridge.invoke("showToast", {
        title: "", // string，可选，标题
        detail: "这是一条Toast提示！", // string，可选，内容
        duration: 2.0, // double，可选，toast 出现的时间，单位 s，默认为 2.0s
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

/******************** 工具类 ********************/

// 获取共享的 KV 数据
// iOS 为 NSUserDefaults
function tmf_getSharedStorage() {
    TMFJSBridge.invoke("getSharedStorage", {
        //key : 'key1',   // string，必选，KV 的 key
        keys: ["akey", "key_01", "key_02", "key_03"],
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            //value : res.value,  // any，KV 的 value
            value_01: res.values.key_01,
            value_02: res.values.key_02,
            value_03: res.values.key_03,
        });
    });
}

// 设置共享的 KV 数据
// iOS 为 NSUserDefaults
function tmf_setSharedStorage(avalue) {
    TMFJSBridge.invoke("setSharedStorage", {
        key: "key_01", // string，必选，KV 的 key
        value: "{\"jsonKey\":\"jsonValue\"}", // string，必选，KV 的 value
        values: {
            akey: avalue,
            key_02: "key_02",
            key_03: "key_03",
            key_04: "key_04",
        }
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 设置页面信息
function tmf_setPageInfo() {
    TMFJSBridge.invoke("setPageInfo", {
        reportKey: "home_page_1.0.0.1", // string，必选，上报标志，例如：页面ID和版本
    }, function (res) {
        tmf_logObject(res, 2);
    });
}

// 移除共享的 KV 数据
// iOS 为 NSUserDefaults
function tmf_removeSharedStorage() {
    TMFJSBridge.invoke("removeSharedStorage", {
        key: "key1", // string，必选，KV 的 key
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject();
    });
}

// 页面出现
function tmf_onContainerAppear() {
    document.addEventListener("containerAppear", function (e) {
        tmf_logObject("containerAppear: " + JSON.stringify(e.tmf), 2);
    }, false);
}

// 页面消失
function tmf_onContainerDisappear() {
    document.addEventListener("containerDisappear", function (e) {
        tmf_logObject("containerDisappear: " + JSON.stringify(e.tmf), 2);
    }, false);
}

// 上报埋点
function tmf_reportEvent() {
    TMFJSBridge.invoke("reportEvent", {
        event: "test_id", // string，必选，事件名
        params: { // dictionary，必选，上报的 KV 值
            key_01: "value_01",
            key_02: "value_02"
        },
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // string，错误码
        });
    });
}

// 网关接口调用（RPC）
function tmf_sendShark() {
    TMFJSBridge.invoke("sendShark", {
        apiName: "TMFEcho", // string，必选，Shark 命令字（API name）
        //cmdId   : 998,                                    // integer，可选，Shark 命令字（Cmd ID）
        headers: { "headers_key1": "headers_value1" }, // dictionary，可选，业务自定义的请求头部
        cookies: { "cookies_key1": "cookies_value1" }, // dictionary，可选，业务自定义的请求 Cookies
        queries: { "queries_key1": "queries_value1" }, // dictionary，可选，业务自定义的请求 Queries
        data: "test", // string，可选，业务自定义的请求数据
        timeout: 15000, // integer，可选，超时时间，单位 ms
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            error: res.error, // integer，业务的返回错误码，没有错误时为 undefined
            errorDescription: res.errorDescription, // string，业务的返回错误描述，没有错误时为 undefined
            httpResponseCode: res.httpResponseCode, // integer，业务返回的 HTTP 状态码
            headers: res.headers, // dictionary，业务的返回头部
            data: res.data, // string，业务的返回数据
        });
    });
}

/******************** 小程序 ********************/

// 打开小程序
function tmf_openTinyApp(toAppKey) {
    TMFJSBridge.invoke("openTinyApp", {
        appKey: toAppKey, // string，必选，小程序的 appKey
        /*
        params      : {             // dictionary，可选，支持传入多组自定义 KVs
            key1    : "value1",
            key2    : "value2",
        }
         */
    }, function (res) {
        tmf_logObject(res, 2);
        tmf_logObject({
            ret: res.ret,
        });
    });
}

//  加载页面
function tmf_onLoadPage() {

}

/**
 * 打开键盘测试页面
 * @param aUrl
 */
function tmf_openKeyboradPage(aUrl) {

    TMFJSBridge.invoke("OpenKeyboradPage", {
        url: aUrl, // string，必选，URL 地址
    }, function (res) {
    });
}
function test1() {
    alert(1);
}
function test2() {
    alert(2);
}
module.exports = {
    test1,
    test2,
    tmf_log,
    tmf_logObject,
    tmf_ready,
    tmf_getVersion,
    tmf_getBuild,
    tmf_getGUID,
    tmf_openContainer,
    tmf_getContainerStack,
    tmf_showContainerStack,
    tmf_closeContainer,
    tmf_closeContainers,
    tmf_isAppInstalled,
    tmf_openApp,
    tmf_onPageAppear,
    tmf_onPageDisappear,
    tmf_getNetworkType,
    tmf_getLocation,
    tmf_reportCurrentLocation,
    tmf_openLocation,
    tmf_updateShareData,
    tmf_shareWxTimeLine,
    tmf_shareWxFriend,
    tmf_shareQQFriend,
    tmf_shareSinaWeibo,
    tmf_shareAlipayFriend,
    tmf_shareAlipayTimeline,
    tmf_setTitle,
    tmf_actionSheet,
    tmf_alert,
    tmf_confirm,
    tmf_customOptionMenu,
    tmf_showOptionMenu,
    tmf_hideOptionMenu,
    tmf_showLoading,
    tmf_hideLoading,
    tmf_showToast,
    tmf_getSharedStorage,
    tmf_setSharedStorage,
    tmf_setPageInfo,
    tmf_removeSharedStorage,
    tmf_onContainerAppear,
    tmf_onContainerDisappear,
    tmf_reportEvent,
    tmf_sendShark,
    tmf_openTinyApp,
    tmf_openKeyboradPage
};

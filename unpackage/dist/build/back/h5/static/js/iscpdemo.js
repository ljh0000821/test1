function loadJS(src, callback) {
    let script = document.createElement("script");
    let head = document.getElementsByTagName("head")[0];
    script.src = src;
    head.appendChild(script);
    if (typeof callback === "function") {
        script.onload = script.onreadystatechange = function () {
            console.log(script.readyState, "script.readyState");
            console.log(wx, "wxxxxxxxxxxxxxxxxxxxxxx");
            console.log(wx.invoke, "wx.invoke");
            if (wx.invoke && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                callback();
            }
        };
    }
}
// loadJS("js/vconsole.min.js", function () {
// 	var vConsole = new VConsole();
// })

function initiscp() {
    wx.invoke("ext_ISCP_Init", {
        data: {
            "iscpIP": "211.160.23.26"
        }
    }, function (res) {
        console.log("ext_ISCP_Init ", res, res.err_msg);
    });
}

function connect() {
    wx.invoke("ext_ISCP_ConnectService", {
        data: {
            "ip": "211.160.23.26",
            "port": "20080",
            "user": "com.yr.oasgccpublic_user111",
            "appid": "com.yr.oasgccpublic",
            "iscpIP": "211.160.23.26"
        }
    }, function (res) {
        console.log("ext_ISCP_ConnectService ", res, res.err_msg);
    });
}

function getlocalport() {
    wx.invoke("ext_ISCP_GetLocalPort", {
        data: {
            "ip": "192.168.4.33",
            "port": "28080",
            "iscpIP": "211.160.23.26"
        }
    }, function (res) {
        console.log("ext_ISCP_GetLocalPort ", res, res.err_msg);

    });
}

function closeiscp() {
    console.log("closeiscp ");
    wx.invoke("ext_ISCP_Close", {
        data: {
            "iscpIP": "211.160.23.26"
        }
    },
        function (res) {
            console.log("ext_ISCP_Close ", res, res.err_msg);
        }
    );
}


console.log("load jweixin.js start");
console.log("开始加载微信sdk");
function initJS() {
    loadJS("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", function () {
        "use strict";
        console.log("load jweixin.js over");
        // wx.ready(function () {
        //     console.log("wx.config: ready");
        //     console.log("wx.ready完毕");
        //     wx.invoke("agentConfig", {
        //         // agentid: "1000556", // 必填，企业应用的agentid
        //         // corpid: "ww30af00ab78840f9f", // 必填，企业微信的corpid
        //         // timestamp: 1608692903, // 必填，生成签名的时间戳,int类型, 如 1539100800
        //         // nonceStr: "XKIvykvwOuAeIbl", // 必填，生成签名的随机串
        //         // signature: "ad0c077e6b5fbfe0c9e5394703d8262a3bc21fc3",// 必填，签名，见附录5

        //         agentid: "1000252", // 必填，企业应用的agentid
        //         corpid: "ww4d11a39991ebffdc", // 必填，企业微信的corpid
        //         corpsecret: "HR6RELYJQXEcYSsoPMstc8Q9NO1CQ88L1lSZ8VGDhp4",
        //         timestamp: 1608692903, // 必填，生成签名的时间戳,int类型, 如 1539100800
        //         nonceStr: "XKIvykvwOuAeIbl", // 必填，生成签名的随机串
        //         signature: "ad0c077e6b5fbfe0c9e5394703d8262a3bc21fc3",// 必填，签名，见附录5
        //     }, function (res) {
        //         console.log("wx.agent config: over", res);
        //         if (res.err_msg != "agentConfig:ok") {
        //             return;
        //         }
        //     });
        // });
        wx.ready(function () {
            try {
                console.log("wx.config: ready");
                // window.setTimeout(function () {
                wx.invoke("agentConfig", {
                    // agentid: '1000010', // 必填，企业应用的agentid
                    // corpid: 'ww4d11a39991ebffdc',  // 必填，企业微信的corpid
                    // timestamp: 1626832073, // 必填，生成签名的时间戳,int类型, 如 1539100800
                    // nonceStr: 'AMQGnmTMzhJetshY', // 必填，生成签名的随机串
                    // signature: 'fb9f560a9b4824f7db3525926994010de74ea055',// 必填，签名，见附录5
                    agentid: "1000252", // 必填，企业应用的agentid
                    corpid: "ww4d11a39991ebffdc", // 必填，企业微信的corpid
                    corpsecret: "HR6RELYJQXEcYSsoPMstc8Q9NO1CQ88L1lSZ8VGDhp4",
                    timestamp: 1608692903, // 必填，生成签名的时间戳,int类型, 如 1539100800
                    nonceStr: "XKIvykvwOuAeIbl", // 必填，生成签名的随机串
                    signature: "ad0c077e6b5fbfe0c9e5394703d8262a3bc21fc3",// 必填，签名，见附录5
                }, function (res) {
                    console.log("wx.agent config: over", res);
                });
                // window.uexOnload && window.uexOnload(0);
                // }, 2000);
            } catch (e) {
                console.log("报错了，重新加载");
                initJS();
            }

        });
        console.log("wx.config");
        // wx.config({
        //     beta: true,// 调用wx.invoke形式的接口值时，该值必须为true。
        //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     // appId: "ww30af00ab78840f9f", // 必填，政务微信的cropID 测试
        //     appId: "ww4d11a39991ebffdc",
        //     timestamp: "1608692903", // 必填，生成签名的时间戳
        //     nonceStr: "XKIvykvwOuAeIbl", // 必填，生成签名的随机串
        //     signature: "ad0c077e6b5fbfe0c9e5394703d8262a3bc21fc3",// 必填，签名，见附录1
        //     jsApiList: ["multiWindows_open", "multiWindows_close", "multiWindows_subscribe", "multiWindows_publish", "multiWindows_finish",
        //         "ext_ISCP_Init", "ext_ISCP_ConnectService", "ext_ISCP_Close",
        //         "ext_ISCP_GetLocalPort", "ext_ISCP_AnalyseUrl", "ext_ISCP_Status", "ext_ISCP_ResetConnect",
        //         "openEnterpriseApp", "ext_SGMap_init", "ext_SGMap_Operation", "ext_Popover_Open", "ext_Popover_Close", "ext_DataCache_Get", "ext_DataCache_Save",
        //         "ext_WeMeet_Join", "ext_WeMeet_Login", "ext_WeMeet_Init", "selectEnterpriseContact", "openChatWithMsg", "changeNaviColor", "getLocalResPath", "shareWechatMessage", "shareAppMessage", "ext_wxlog_setLogOpen",
        //         "ext_wxlog_getLogFile", "scanQRCode", "chooseImage", "previewImage", "openLocation", "ext_FormLoad_Init", "ext_FormLoad_Upload", "ext_FormLoad_CancelUpload", "ext_FormLoad_Download"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });
        wx.config({
            // beta: true,// 调用wx.invoke形式的接口值时，该值必须为true。
            // debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // appId: 'ww4d11a39991ebffdc', // 必填，政务微信的cropID
            // timestamp: '1626832073', // 必填，生成签名的时间戳
            // nonceStr: 'AMQGnmTMzhJetshY', // 必填，生成签名的随机串
            // signature: 'fb9f560a9b4824f7db3525926994010de74ea055',// 必填，签名，见附录1
            // jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            beta: true,// 调用wx.invoke形式的接口值时，该值必须为true。
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // appId: "ww30af00ab78840f9f", // 必填，政务微信的cropID 测试
            appId: "ww4d11a39991ebffdc",
            timestamp: "1608692903", // 必填，生成签名的时间戳
            nonceStr: "XKIvykvwOuAeIbl", // 必填，生成签名的随机串
            signature: "ad0c077e6b5fbfe0c9e5394703d8262a3bc21fc3",// 必填，签名，见附录1
            jsApiList: ["getLocation", "multiWindows_open", "multiWindows_close", "multiWindows_subscribe", "multiWindows_publish", "multiWindows_finish",
                "ext_ISCP_Init", "ext_ISCP_ConnectService", "ext_ISCP_Close",
                "ext_ISCP_GetLocalPort", "ext_ISCP_AnalyseUrl", "ext_ISCP_Status", "ext_ISCP_ResetConnect",
                "openEnterpriseApp", "ext_SGMap_init", "ext_SGMap_Operation", "ext_Popover_Open", "ext_Popover_Close", "ext_DataCache_Get", "ext_DataCache_Save",
                "ext_WeMeet_Join", "ext_WeMeet_Login", "ext_WeMeet_Init", "selectEnterpriseContact", "openChatWithMsg", "changeNaviColor", "getLocalResPath", "shareWechatMessage", "shareAppMessage", "ext_wxlog_setLogOpen",
                "ext_wxlog_getLogFile", "scanQRCode", "chooseImage", "previewImage", "openLocation", "ext_FormLoad_Init", "ext_FormLoad_Upload", "ext_FormLoad_CancelUpload", "ext_FormLoad_Download"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        console.log("微信加载完毕");
    });
}
initJS();

function reconnect() {
    console.log("ResetConnect ");
    wx.invoke("ext_ISCP_ResetConnect", {
        data: {
            "iscpIP": "211.160.23.26"
        }
    },
        function (res) {
            console.log("ext_ISCP_ResetConnect ", res, res.err_msg);
        });
}
function teststatus() {
    console.log("teststatus ");
    wx.invoke("ext_ISCP_GetLocalPort", {
        data: {
            "ip": "192.168.4.33",
            "port": "28080",
            "iscpIP": "211.160.23.26"
        }
    },
        function (res) {
            console.log("ext_ISCP_GetLocalPort ", res, res.err_msg);
        });
}

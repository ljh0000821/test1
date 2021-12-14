
//获取当前位置
export function getLocation() {
    return new Promise((resolve, reject) => {
        if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
            console.log("开始获取i国网定位");
            // wx.invoke("getLocation", {

            // }, function (res) {
            //     console.log(res, "igw地理位置信息6");
            //     let obj = {
            //         addressComponent: {},
            //         position: [res.longitude, res.latitude]
            //     };
            //     resolve(obj);
            // });
            setTimeout(() => {
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 8000, //超过10秒后停止定位，默认：5s
                });
                geolocation.getCurrentPosition((status, result) => {
                    if (status == "complete") {
                        console.log(result, "AMP地理位置信息");
                        let obj = {
                            addressComponent: result.addressComponent,
                            position: [result.position.R, result.position.Q],
                            type: "AMP"
                        };
                        resolve(obj);
                        return;
                    } else {
                        reject();
                    }
                });
            }, 800);
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                    // var gps_status = res.gps_status; //gps状态，-1：应用未获取GPS权限；
                    // 0：已获取GPS权限，GPS信号异常；
                    // 1：已获取GPS权限，GPS信号正常，AGPS信号异常；
                    // 2：已获取GPS权限，GPS信号异常，AGPS信号正常；
                    // 3：已获取GPS权限，GPS/AGPS信号正常
                    console.log(res, "igw地理位置信息");
                    let obj = {
                        addressComponent: {},
                        position: [res.longitude, res.latitude],
                        type: "igw"
                    };
                    resolve(obj);
                }
            });
            // TMFJSBridge.invoke("getLocation", {
            //     type: "wgs84", // string，必选，坐标类型，有效值：'wgs84' 表示真实坐标，'gcj02' 表示火星坐标
            // }, function (res) {
            //     let obj = {
            //         addressComponent: {},
            //         position: [res.longitude, res.latitude]
            //     };
            //     console.log(res, "TMF地理位置信息");
            //     resolve(obj);
            // });
            // uni.getLocation({
            //     type: "wgs84",
            //     success: function (res) {
            //         let obj = {
            //             addressComponent: {},
            //             position: [res.longitude, res.latitude],
            //         };
            //         console.log(res, "uni地理位置信息");
            //         resolve(obj);
            //     }
            // });
        } else {
            setTimeout(() => {
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000, //超过10秒后停止定位，默认：5s
                    buttonPosition: "RB", //定位按钮的停靠位置
                    // buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
                });
                geolocation.getCurrentPosition((status, result) => {
                    if (status == "complete") {
                        console.log(result, "定位result");
                        let obj = {
                            addressComponent: result.addressComponent,
                            position: [result.position.R, result.position.Q]
                        };
                        resolve(obj);
                    } else {
                        reject();
                    }
                });
            }, 800);
        }
    });
}
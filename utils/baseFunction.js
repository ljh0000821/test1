export default {
    install(Vue, options) {
        //返回
        Vue.prototype.$goBack = function (num = 1, isRefresh = false) {
            let canNavBack = getCurrentPages();
            if (canNavBack && canNavBack.length > 1) {
                // if (isRefresh) {
                //     let prevPage = canNavBack[canNavBack.length - (num + 1)]; //上一个页面
                //     if (prevPage.hasOwnProperty("isRefresh")) {
                //         prevPage.isRefresh = true;
                //     }
                // }
                uni.navigateBack({
                    delta: num
                });
            } else {
                for (let i = 0; i < num; i++) {
                    history.back();
                }
            }
        };
        //筛选一个对象中另一个对象有的键并返回一个新的对象
        Vue.prototype.$filterForm = function (obj, form) {
            let newObj = {};
            Object.keys(obj).forEach(item => {
                if (form.hasOwnProperty(item)) {
                    newObj[item] = obj[item];
                }
            });
            return newObj;
        };
    }
};
<script>
import store from "@/store/index.js";
import { getLocation } from "@/utils/igwFn";
import { usermoveSubmit } from "@/api/user";
import { getStore } from "@/utils/store";
export default {
    mounted() {
        console.log(this.$config, "this.$config");
        uni.getSystemInfo({
            success: function (res) {
                console.log(res, "设备信息");
                store.commit("setSystemInfo", res);
            }
        });
        this._getLocation();
    },
    methods: {
        //两分钟调一次定位 获取巡视轨迹
        _getLocation() {
            console.log("开始定位");
            getLocation().then((res) => {
                console.log(res,"定位信息");
                const center = res.position;
                store.commit("setUserMove", center);
                let token = getStore("token");
                if (token) {
                    usermoveSubmit({
                        track: center.join(",")
                    });
                }
                setTimeout(() => {
                    this._getLocation();
                }, 90000);
            });
        }
    }
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "./styles/common.scss";
page {
    // box-sizing: border-box;
    // padding-bottom: 32rpx;
    // overflow: scroll;
}
</style>

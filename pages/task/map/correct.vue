<template>
    <view>
        <custom-navbar title="纠正" iconLeft></custom-navbar>
        <view class="o-map">
            <efMap ref="efMap" class="amap-page-container" correct @correctMoveend="correctMoveend" />
        </view>
        <view class=" info-box">
            <view>
                <img src="../../../static/common/ic_drag.png" alt="">
                <text class="m-l-16">拖动地图至杆塔位置</text>
            </view>
            <view class="flex-between info-item">
                <view>
                    <img src="../../../static/common/ic_task_item_detail_area.png" alt="">
                    <text class="m-l-8">新坐标</text>
                </view>
                <text class="coordinate base-green-text">东经E: {{String(centerCoordinate.longitude).slice(0,11)}}，北纬N: {{String(centerCoordinate.latitude).slice(0,11)}}</text>
            </view>
            <view class="flex-between info-item">
                <view>
                    <img src="../../../static/common/afe_def_detail_twr.png" alt="">
                    <text class="m-l-8">杆塔</text>
                </view>
                <text class="coordinate">{{info.name}}</text>
            </view>
            <view class="flex-between info-item">
                <view>
                    <img src="../../../static/common/afe_def_detail_line.png" alt="">
                    <text class="m-l-8">所属线路</text>
                </view>
                <text class="coordinate">{{info.lineName}}</text>
            </view>
            <view class="flex-between info-item">
                <view>
                    <img src="../../../static/common/afe_def_detail_find_user.png" alt="">
                    <text class="m-l-8">更新人员</text>
                </view>
                <text class="coordinate">{{usrInfo.nick_name}}</text>
            </view>
            <view class="flex-between info-item">
                <view>
                    <img src="../../../static/common/afe_def_detail_find_date.png" alt="">
                    <text class="m-l-8">更新时间</text>
                </view>
                <text class="coordinate">{{nowTime}}</text>
            </view>
            <u-button class="btn" type="primary" :loading="loading" ripple @click="_twrsetSubmit">纠正</u-button>
        </view>
    </view>
</template>

<script>
import { getLocation } from "@/utils/igwFn";
import efMap from "@/components/ef-ui/ef-map/ef-map";
import { getStore } from "@/utils/store.js";
import { twrsetSubmit } from "@/api/invtwr/index";
import { getNowTime } from "@/utils/tools";
export default {
    components: {
        efMap
    },
    data() {
        return {
            info: {},
            centerCoordinate: {},
            usrInfo: {},
            loading: false
        };
    },
    onLoad(options) {
        this.info = JSON.parse(decodeURIComponent(options.info || {}));
        console.log(this.info, "info");
        this.usrInfo = getStore("userInfo");
        console.log(this.usrInfo, "usrInfo");
        this.nowTime = getNowTime();
    },
    mounted() {
        this._getLocation();
    },
    methods: {
        //获取当前坐标
        _getLocation() {
            getLocation().then((res) => {
                console.log(res, "坐标");
            });
        },
        //地图移动回调
        correctMoveend(e) {
            console.log(e, "地图移动回调");
            this.centerCoordinate = {
                longitude: e.R,
                latitude: e.Q
            };
        },
        //确认
        _twrsetSubmit() {
            this.loading = true;
            let params = {
                lineId: this.info.lineId,
                lineName: this.info.lineName,
                newZb:
                    this.centerCoordinate.longitude +
                    "," +
                    this.centerCoordinate.latitude,
                oprUser: this.usrInfo.user_id,
                twrCode: this.info.twrCode,
                twrId: this.info.id,
                state: "1"
            };
            console.log(params, "params");
            twrsetSubmit(params)
                .then(() => {
                    this.loading = false;
                    this.$u.toast("纠正成功，等待后台处理！");
                    setTimeout(() => {
                        this.$goBack();
                    }, 500);
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    },
    beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
page {
    background-color: #fff;
}
.o-map {
    width: 100%;
    height: 600rpx;
    // background-color: green;
    position: relative;
}
.center-img {
    position: absolute;
    left: calc(50% - 8px);
    top: calc(50% - 27px);
    width: 30rpx;
}
.info-box {
    background-color: #fff;
    font-size: 30rpx;
    padding: 24rpx;
    img {
        height: 24rpx;
    }
}
.coordinate {
    font-size: 24rpx;
}
.info-item {
    padding: 24rpx 0;
    border-bottom: 1px solid $line-gray;
}
.info-item:last-child {
    border-bottom: none;
}
.btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
.amap-page-container {
    // position: fixed;
    width: 100%;
    height: 100%;
}
</style>

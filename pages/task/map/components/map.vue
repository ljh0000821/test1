<template>
    <view class="map-content">
        <efMap ref="efMap" class="amap-page-container" :markers="taskInfo.invTwrVOList || []" @marker="markerBack" />
        <view class="task_bar flex" @click="toDetails">
            <image class="icon left_icon" src="../../../../static/task/index/time2.png"></image>
            <view class="flex1">
                <view class="flex align-center">
                    <text class="line_name">{{taskInfo.lineName}}</text>
                    <view class="line_bar"><text>{{taskInfo.twrCodes||taskInfo.twrCode}}</text></view>
                    <view class="gps-icon m-l-16">
                        <img src="../../../../static/common/ic_gps_status_bad.png" alt="">
                    </view>
                </view>
                <view class="flex-between times">
                    <view class="time_text flex1 text-ellipsis"><text>{{taskInfo.insContent}}</text></view>
                    <view class="gray-text"><text>{{planTime}}</text></view>
                </view>
            </view>
            <view class="warn tower_bar">
                <template v-if="type==0">
                    <view class="flex-between top">
                        <view class="flex-center">
                            <image class="icon" src="../../../../static/task/map/defect.png"></image>
                            <text class="defect">{{taskInfo.defs}}</text>
                        </view>
                        <view class="flex-center danger_bar">
                            <image class="icon" src="../../../../static/task/map/danger.png"></image>
                            <text class="danger">{{taskInfo.troExts+taskInfo.troTrees}}</text>
                        </view>
                    </view>
                </template>
                <view class="flex-end tower">
                    <image class="icon" src="@/static/common/ic_add_ins_tower.png"></image>
                    <text><text class="time_text">{{taskInfo.doTwrNum}}</text>/{{taskInfo.allTwrNum}}</text>
                </view>
            </view>
        </view>
        <view class="layer_top" @click="layerTop">
            <img src="../../../../static/common/ic_map_explain.png" alt="">
        </view>
        <u-popup v-model="actionShow" mode="bottom" class="u-popup">
            <TowerItemInfo ref="TowerItemInfo" :TowerItemInfo="TowerItemInfo" :type="type" :details="details" @down="actionDown" @toList="toList" />
        </u-popup>
        <u-popup v-model="layerTopShow" mode="right" length="60%">
            <LayerTop @LayerTopChange="LayerTopChange" :type="type" />
        </u-popup>
    </view>
</template>

<script>
import LayerTop from "./layerTop.vue";
import TowerItemInfo from "./TowerItemInfo";
import efMap from "@/components/ef-ui/ef-map/ef-map";
export default {
    components: {
        LayerTop,
        efMap,
        TowerItemInfo
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        taskId: {
            type: String,
            default: ""
        },
        details: {
            type: Object,
            default: () => {}
        },
        type: {} //0巡视 1检测 2检修 3验收
    },
    data() {
        return {
            taskInfo: {},
            latitude: 29.561111,
            longitude: 106.536532,
            layerTopShow: false,
            actionShow: false,
            TowerItemInfo: {}
        };
    },
    computed: {
        planTime() {
            if (!this.taskInfo.startPlanDate || !this.taskInfo.finishPlanDate) {
                return "";
            }
            let str =
                this.taskInfo.startPlanDate
                    .replace(/-/g, "/")
                    .replace("00:00:00", "")
                    .slice(5, 10) +
                "-" +
                this.taskInfo.finishPlanDate
                    .replace("00:00:00", "")
                    .replace(/-/g, "/")
                    .slice(5, 10);
            return str;
        }
    },
    watch: {
        details: {
            handler(nval) {
                this.taskInfo = nval;
            },
            deep: true
        }
    },
    methods: {
        layerTop() {
            this.layerTopShow = !this.layerTopShow;
        },
        actionDown() {
            this.actionShow = false;
        },
        toDetails() {
            if (this.type == 0) {
                uni.navigateTo({
                    url:
                        "pages/task/map/details?info=" +
                        encodeURIComponent(JSON.stringify(this.taskInfo))
                });
            } else if (this.type == 1) {
                uni.navigateTo({
                    url:
                        "pages/task/testing/details?info=" +
                        encodeURIComponent(JSON.stringify(this.details))
                });
            } else if (this.type == 2) {
                uni.navigateTo({
                    url:
                        "pages/task/overhaul/details?details=" +
                        encodeURIComponent(JSON.stringify(this.details))
                });
            }
        },
        //点击杆塔
        markerBack(e) {
            console.log(e, "e");
            this.TowerItemInfo = e;
            this.actionShow = true;
        },
        //跳转列表
        toList() {
            console.log(666);
            this.$emit("changActive", {
                index: 1
            });
        },
        LayerTopChange(data) {
            let type = data.name;
            if (type == "xcgj") {
                this.$refs.efMap.setTrajectory(data.value);
            } else if (type == "gtlx") {
                this.$refs.efMap.setPolyline(data.value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.map-content {
    width: 100%;
    height: 100%;
    position: relative;
}

.task_bar {
    margin: 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 16rpx 40rpx 36rpx 40rpx;
    position: absolute;
    width: calc(100% - 32rpx);
    top: 0;
    box-sizing: border-box;

    .line_name {
        font-size: 28rpx;
        font-weight: 700;
        color: #30495e;
        line-height: 40rpx;
    }

    .line_bar {
        background: #b499ff;
        border-radius: 14px;
        font-size: 20rpx;
        color: #ffffff;
        padding: 5rpx 10rpx;
        margin-left: 18rpx;
    }

    .icon {
        width: 68rpx;
        height: 68rpx;
        margin-right: 8rpx;
    }

    .left_icon {
        margin-right: 20rpx;
    }

    .times {
        margin-top: 22rpx;
    }

    .time_text {
        color: #05b2cc;
        font-size: 20rpx;
    }

    .time_t {
        font-size: 20rpx;
        color: #f2f2f2;
    }

    .warn {
        margin-left: 30rpx;
        color: #30495e;

        .top {
            align-items: center;
            height: 40rpx;
        }

        .tower {
            margin-top: 20rpx;
        }
    }
}

.tower_bar {
    font-size: 20rpx;

    .icon {
        width: 32rpx;
        height: 32rpx;
    }

    .defect {
        color: #f75f49;
    }

    .danger {
        color: #f7b500;
    }

    .danger_bar {
        margin-left: 18rpx;
    }
}

.layer_top {
    border-radius: 50%;
    position: absolute;
    top: 200rpx;
    right: 18rpx;
    img {
        width: 100rpx;
    }
}
.u-popup {
    /deep/ .u-drawer-bottom {
        background-color: transparent;
    }
}

.amap-page-container {
    position: absolute;
    width: 100%;
    height: 100%;
}
.gps-icon {
    img {
        height: 30rpx;
    }
}
</style>

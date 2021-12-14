<template>
    <view>
        <custom-navbar title="工作任务" iconLeft></custom-navbar>
        <view class="container">
            <view class="align-center">
                <img class="twor-img" src="../../../static/common/afe_def_detail_twr.png" alt="">
                <text class="m-l-16">{{info.twrCode}}</text>
            </view>
            <view class="action-group flex-around">
                <view v-for="(v,index) in meunList" :key="index">
                    <view class="flex-column" @click.stop="v.redirect()">
                        <image class="icon" :src="v.src"></image>
                        <text class="text">{{v.text}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="container flex-around register-group">
            <view class="register-item xsjl" @click="xsjl">
            </view>
            <template v-if="info.state>2">
                <view class="register-item ysdj" @click="ysdj">
                </view>
            </template>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            info: {},
            taskHaulItemId: "",
            meunList: [
                {
                    text: "现场勘察",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_xs.png"),
                    redirect: (item) => {
                        this.xs(item);
                    }
                },
                {
                    text: "新增缺陷",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_qx.png"),
                    redirect: () => {
                        this.qx();
                    }
                },
                {
                    text: "新增隐患",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_yh.png"),
                    redirect: () => {
                        this.yh();
                    }
                },
                {
                    text: "试验",
                    visibleArr: ["0", "1", "2", "3"],
                    src: require("@/static/common/ic_menu_map_correct.png"),
                    redirect: () => {}
                }
            ]
        };
    },
    onLoad(options) {
        this.info = JSON.parse(decodeURIComponent(options.info || {}));
        this.taskHaulItemId = options.taskHaulItemId;
        console.log(this.info, "info");
    },
    methods: {
        xs() {
            uni.navigateTo({
                url:
                    "pages/task/map/collection?taskType=2&twrGzrwdId=" +
                    this.info.id +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(this.info)) +
                    "&state=" +
                    this.info.state +
                    "&taskItemId=" +
                    this.taskHaulItemId
            });
        },
        qx() {
            uni.navigateTo({
                url:
                    "pages/task/defect/defect-add?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        },
        yh() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/addDanger?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        },
        //修饰记录登记
        xsjl() {
            uni.navigateTo({
                url:
                    "pages/task/overhaul/repairRecord?twrGzrwdId=" +
                    this.info.id +
                    "&state=" +
                    this.info.state
            });
        },
        //验收记录登记
        ysdj() {
            uni.navigateTo({
                url:
                    "pages/task/overhaul/register?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.twor-img {
    height: 26rpx;
}
.action-group {
    margin-top: 24rpx;
    .list {
        text-align: center;
    }

    .icon {
        width: 64rpx;
        height: 64rpx;
    }

    .text {
        font-size: 20rpx;
        color: #30495e;
        margin-top: 10rpx;
    }
}
.register-group {
    margin-top: 24rpx;
    padding: 32rpx 0;
}
.register-item {
    width: 300rpx;
    height: 100rpx;
    border-radius: 16rpx;
    overflow: hidden;

    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
}
.xsjl {
    background-image: url("../../../static/images/overhaul/xsjldj.png");
}
.ysdj {
    background-image: url("../../../static/images/overhaul/lALPD4d8s_cEFfRuzQEZ_281_110.png");
}
</style>

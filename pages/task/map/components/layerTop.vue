<template>
    <view class="layer_tops">
        <view class="title">图层</view>
        <view class="ul">
            <view class="flex-between li">
                <text>
                    行程轨迹
                </text>
                <u-checkbox-group @change="onChange('xcgj')">
                    <u-checkbox v-model="xcgj" shape="circle" active-color="#05b2cc"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="flex-between li">
                <text>
                    杆塔连线
                </text>
                <u-checkbox-group @change="onChange('gtlx')">
                    <u-checkbox v-model="gtlx" shape="circle" active-color="#05b2cc"></u-checkbox>
                </u-checkbox-group>
            </view>
            <!-- <view class="flex-between li">
                <text>
                    巡视外杆塔
                </text>
                <u-checkbox-group @change="onChange('xswgt')">
                    <u-checkbox v-model="xswgt" shape="circle" active-color="#05b2cc"></u-checkbox>
                </u-checkbox-group>
            </view> -->
        </view>
        <view class="title">图例</view>
        <view class="layer_ul">
            <view class="layer_ul_li align-center" v-for="(item,index) in splitList" :key="index">
                <image :src="item.src" mode="aspectFit"></image>
                <text>{{item.name}}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props:{
        type:{}
    },
    data() {
        return {
            xcgj: true,
            gtlx: true,
            xswgt: true,
            splitList: [
                {
                    name: "本巡视中已完成的杆塔",
                    src: require("@/static/common/ic_tower_finished.png")
                },
                {
                    name: "本巡视中未完成的杆塔",
                    src: require("@/static/common/ic_tower_unfinished.png")
                },
                {
                    name: "其它巡视中已完成的杆塔",
                    src: require("@/static/common/ic_tower_unfinished_o.png")
                },
                {
                    name: "其它巡视中未完成的杆塔",
                    src: require("@/static/common/ic_tower_finished_o.png")
                },
                {
                    name: "有缺陷杆塔",
                    src: require("../../../../static/task/map/warn.png")
                },
                {
                    name: "有隐患杆塔",
                    src: require("../../../../static/task/map/dangger.png")
                },
                {
                    name: "缺陷+隐患",
                    src: require("../../../../static/task/map/wran_dannger.png")
                },
                {
                    name: "靠近签到范围",
                    src: require("../../../../static/task/map/nofanwei.png")
                },
                {
                    name: "进入签到范围",
                    src: require("../../../../static/task/map/fanwei.png")
                }
            ]
        };
    },
    methods: {
        onChange(e) {
            console.log(this[e], "e");
            this.$emit("LayerTopChange", {
                name: e,
                value: this[e]
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.layer_tops {
    padding: 20rpx;
    .title {
        font-size: 24rpx;
        font-weight: 700;
        color: #30495e;
        line-height: 34rpx;
    }
    .ul {
        margin-top: 28rpx;
        margin-bottom: 26rpx;
        border-bottom: 1px solid #fbfbfd;
        .li {
            font-size: 20rpx;
            color: #30495e;
            line-height: 28rpx;
            padding: 14rpx 0;
            border-top: 1px solid #fbfbfd;
        }
    }
    .layer_ul {
        .layer_ul_li {
            margin-top: 54rpx;
            image {
                width: 51rpx;
                height: 56rpx;
                box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
                border-radius: 50%;
            }
            text {
                margin-left: 16rpx;
            }
        }
    }
}
</style>

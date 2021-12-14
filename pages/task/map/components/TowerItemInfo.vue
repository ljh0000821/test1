<template>
    <view class="meun">
        <view class="top flex-between">
            <view class="flex-center">
                <image class="tower_icon" src="@/static/common/ic_add_ins_tower.png"></image>
                <text class="tower_name">{{TowerItemInfo.lineName}}{{TowerItemInfo.name}}</text>
            </view>
            <template v-if="type==0">
                <view class="tower_bar flex">
                    <view class="flex-center">
                        <image class="icon" src="../../../../static/task/map/defect.png"></image>
                        <text class="defect m-l-8">{{defTroNum(TowerItemInfo.defs)}}</text>
                    </view>
                    <view class="flex-center danger_bar">
                        <image class="icon" src="../../../../static/task/map/danger.png"></image>
                        <text class="danger m-l-8">{{defTroNum(TowerItemInfo.troExts+TowerItemInfo.troTrees)}}</text>
                    </view>
                </view>
            </template>
        </view>
        <view class="flex1 action-box">
            <view class="meun-list flex-around">
                <view class="list" v-for="(item,index) in meunList" :key="index" v-if="item.visibleArr.indexOf(type)>-1" @click="item.redirect(item)">
                    <view>
                        <image class="icon" :src="item.src"></image>
                    </view>
                    <text class="text">{{item.text}}</text>
                </view>
            </view>
            <view class="flex-center arrow-bottom">
                <i class="iconfont icon-icon-arrow-bottom2" @click="actionDown"></i>
            </view>
        </view>
    </view>
</template>

<script>
const kindsArr = ["hwcw", "fbgc", "jcky", "jddz"];
export default {
    props: {
        TowerItemInfo: {},
        details: {
            type: Object,
            default: () => {}
        },
        type: {}
    },
    data() {
        return {
            meunList: [
                {
                    text: "巡视",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_xs.png"),
                    redirect: () => {
                        this.xs();
                    }
                },
                {
                    text: "检测",
                    visibleArr: ["0", "1"],
                    src: require("@/static/common/ic_menu_map_check.png"),
                    redirect: (item) => {
                        this.check(item);
                    }
                },
                {
                    text: "检修",
                    visibleArr: ["2"],
                    src: require("@/static/common/ic_menu_map_check.png"),
                    redirect: (item) => {
                        this.toOverhaul(item);
                    }
                },
                {
                    text: "纠正",
                    visibleArr: ["0", "1", "2", "3"],
                    src: require("@/static/common/ic_menu_map_correct.png"),
                    redirect: () => {
                        this.correct();
                    }
                },
                {
                    text: "隐患",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_yh.png"),
                    redirect: () => {
                        this.yh();
                    }
                },
                {
                    text: "缺陷",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_qx.png"),
                    redirect: () => {
                        this.qx();
                    }
                },
                {
                    text: "列表",
                    visibleArr: ["0", "1", "2", "3"],
                    src: require("@/static/common/ic_menu_map_list.png"),
                    redirect: (item) => {
                        this.list(item);
                    }
                }
            ]
        };
    },
    computed: {
        defTroNum() {
            return (num) => {
                return num > 0 ? num : 0;
            };
        }
    },
    methods: {
        actionDown() {
            this.$emit("down");
        },
        //跳转巡视
        xs() {
            if (this.details.itemState == "3") {
                this.$u.toast("任务已完成，无法操作");
                return;
            }
            uni.navigateTo({
                url:
                    "pages/task/map/collection?taskItemId=" +
                    this.details.id +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(this.TowerItemInfo))
            });
        },
        //跳转检测
        check(item) {
            console.log(this.TowerItemInfo, "item0000");
            if (this.type == 0) {
                uni.navigateTo({
                    url:
                        "pages/task/testing/kindsList?info=" +
                        encodeURIComponent(JSON.stringify(this.TowerItemInfo)) +
                        "&taskItemId=" +
                        this.details.id
                });
            } else if (this.type == 1) {
                let kinds = kindsArr[Number(this.details.testType) - 1];
                uni.navigateTo({
                    url:
                        "pages/task/testing/addTesting?kinds=" +
                        kinds +
                        "&taskItemId=" +
                        this.details.id +
                        "&info=" +
                        encodeURIComponent(JSON.stringify(this.TowerItemInfo)) +
                        "&taskType=1" +
                        "&type=" +
                        (this.TowerItemInfo.isNotes ||
                        this.TowerItemInfo.isTest ||
                        this.TowerItemInfo.isHaul
                            ? "details"
                            : "add")
                });
            }
        },
        //跳转检修
        toOverhaul() {
            uni.navigateTo({
                url:
                    "pages/task/overhaul/taskList?taskHaulItemId=" +
                    this.details.id +
                    "&twrId=" +
                    this.TowerItemInfo.id
            });
        },
        //跳转纠正
        correct() {
            if (this.details.itemState == "3") {
                this.$u.toast("任务已完成，无法操作");
                return;
            }
            uni.navigateTo({
                url:
                    "pages/task/map/correct?info=" +
                    encodeURIComponent(JSON.stringify(this.TowerItemInfo))
            });
        },
        //跳转隐患
        yh() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/addDanger?info=" +
                    encodeURIComponent(JSON.stringify(this.TowerItemInfo))
            });
        },
        //跳转缺陷
        qx() {
            uni.navigateTo({
                url:
                    "pages/task/defect/defect-add?info=" +
                    encodeURIComponent(JSON.stringify(this.TowerItemInfo))
            });
        },
        //跳转地图
        list() {
            this.$emit("toList");
            this.actionDown();
        }
    }
};
</script>

<style lang="scss" scoped>
.meun {
    position: fixed;
    bottom: 0;
    width: calc(100% - 32rpx);
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4px 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx 24rpx 0px 0px;
    padding: 28rpx 40rpx 22rpx 40rpx;

    .top {
        .tower_icon {
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            padding: 8rpx;
            box-shadow: 0 0 1px 2px #f2f2f2;
        }

        .tower_name {
            font-size: 28rpx;
            font-weight: 700;
            color: #30495e;
            margin-left: 8px;
        }
    }

    .lont {
        margin-top: 14rpx;
        border-bottom: 2rpx solid #979797;
        padding-bottom: 12rpx;

        .text {
            font-size: 20rpx;
            color: #30495e;
            line-height: 28rpx;
            text-align: center;
        }

        .relation {
            margin-left: 15rpx;
            padding: 5rpx 15rpx;
            background: rgba(0, 145, 255, 0.1);
            border-radius: 19rpx;
            color: #30495e;
            font-size: 20rpx;
            color: #30495e;
        }
    }

    .meun-list {
        margin-top: 44rpx;

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

    .arrow-bottom {
        margin-top: 32rpx;

        .iconfont {
            font-size: 42rpx;
            color: #97a7b1;
        }
    }
}
.action-box {
    border-radius: 16rpx 16rpx 0 0;
    background-color: #fff;
    margin: 0 16rpx;
    padding: 16rpx;
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
</style>

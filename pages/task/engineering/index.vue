<template>
    <view class="list-container">
        <custom-navbar title="工程验收" iconLeft></custom-navbar>
        <u-sticky bg-color="#dde4f2">
            <!-- 基本信息 -->
            <template>
                <view class="p-b-24" style="background:#dde4f2;">
                    <view class="testing-info">
                        <view class="align-center">
                            <text>{{tastInfo.lineName}}</text>
                            <view class="tower-group">{{tastInfo.section}}</view>
                        </view>
                        <view>{{tastInfo.engTypeName}}</view>
                        <view class="flex-between">
                            <text class="orange-text">计划完成日期：{{tastInfo.planEndTime&&tastInfo.planEndTime.slice(0,10)}}</text>
                            <view class="green-text" @click="toDetails">查看详情</view>
                        </view>
                    </view>
                </view>
            </template>
            <!-- tabs -->
            <template v-if="!isJGYS">
                <view class="tabs-group flex-between">
                    <view :class="[listObj[index+1].length==0?'tabs-item':'tabs-normal',{'tabs-active':item.type==activeCheckType}]" v-for="(item,index) in ysTypes" :key="item.type" @click="typesChange(index)">
                        <text>{{item.name}}</text>
                        <text>验收</text>
                    </view>
                </view>
            </template>
        </u-sticky>
        <!-- 只有竣工验收时显示 -->
        <template v-if="isJGYS">
            <view class="engineering-type">竣工验收</view>
        </template>
        <!-- 列表 -->
        <view class="container">
            <template v-if="activeCheckType&&listObj[activeCheckType].length>0">
                <view v-for="(item,index) in listObj[activeCheckType]" :key="index" class="ul" @click="toYS(item)">
                    <view class="flex-between list">
                        <view class="align-center">
                            <image class="icon" :src="towerIcon(item.isComplete)"></image>
                            <text class="title">{{item.twrCodes}}</text>
                        </view>
                        <view class="align-center">
                            <view>
                                <template v-if="!item.isComplete">
                                    <u-button :ref="'ysBtn'+index" size="mini" shape="circle" @tap="ysItem(index,item)">验收</u-button>
                                </template>
                                <template v-else>
                                    <text>已验收</text>
                                </template>
                            </view>
                            <u-icon class="m-l-8" name="arrow-right" color="#303133" size="28"></u-icon>
                        </view>
                    </view>
                </view>
            </template>
            <template v-else>
                <u-empty></u-empty>
            </template>
        </view>
        <view class="flex-around btn-group">
            <u-button class="ef-btn-normal btn-normal" shape="circle" ripple plain @click="toDefect">查看所有缺陷</u-button>
            <u-button class="ef-btn-normal btn-primary" shape="circle" ripple plain @click="toSummary">验收总结</u-button>
        </view>
    </view>
</template>

<script>
import { checkengmanagDetailH5, checkengtaskSubmit } from "@/api/engineering";
const towerImgs = [
    require("@/static/task/map/tour-tower.png"),
    require("@/static/task/map/tower.png")
];
const ysTypes = [
    {
        name: "深基坑",
        type: 1,
        disabled: true
    },
    {
        name: "基础转序",
        type: 2,
        disabled: true
    },
    {
        name: "杆塔转序",
        type: 3,
        disabled: true
    },
    {
        name: "竣工验收",
        type: 4,
        disabled: true
    }
];
export default {
    components: {},
    props: {},
    data() {
        return {
            ysTypes,
            taskId: "",
            tastInfo: {},
            checkEngTaskList: [], //缺陷
            listObj: {
                1: [],
                2: [],
                3: [],
                4: []
            },
            activeCheckType: ""
        };
    },
    computed: {
        towerIcon() {
            return (state) => {
                let src = state ? towerImgs[0] : towerImgs[1];
                return src;
            };
        },
        isComplete() {
            return (type, item) => {
                if (type == 0) {
                    return item.isNotes;
                }
                if (type == 1) {
                    return item.isTest;
                }
                if (type == 2) {
                    return item.isHaul;
                }
            };
        },
        isJGYS() {
            if (
                this.listObj[1].length == 0 &&
                this.listObj[2].length == 0 &&
                this.listObj[3].length == 0
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {},
    onLoad(options) {
        this.taskId = options.taskId;
    },
    onShow() {
        this._checkengmanagDetailH5();
    },
    methods: {
        //获取详情
        _checkengmanagDetailH5() {
            let params = {
                managId: this.taskId
            };
            checkengmanagDetailH5(params).then((res) => {
                console.log(res, "工程详情");
                let rel = res.data.data;
                this.tastInfo = rel;
                this.checkEngTaskList = rel.checkEngTaskList;
                rel.checkEngTaskDTOList.forEach((item) => {
                    if (this.listObj.hasOwnProperty(item.checkType)) {
                        if (!this.activeCheckType) {
                            this.activeCheckType = item.checkType;
                        }
                        this.listObj[item.checkType] = item.twrCodes
                            .split(",")
                            .map((v) => {
                                let obj = {
                                    ...item,
                                    twrCodes: v,
                                    // id: item.id,
                                    // twrCodesOver: item.twrCodesOver,
                                    isComplete: item.twrCodesOver
                                        .split(",")
                                        .some((j) => {
                                            return (
                                                j.replace(/[^0-9]/gi, "") ==
                                                v.replace(/[^0-9]/gi, "")
                                            );
                                        })
                                };
                                return obj;
                            });
                    }
                });
                console.log(this.listObj, "this.listObj");
            });
        },
        //检测-跳转详情
        toDetails() {
            console.log(this.tastInfo, "this.tastInfo");
            uni.navigateTo({
                url:
                    "pages/task/engineering/details?tastInfo=" +
                    encodeURIComponent(JSON.stringify(this.tastInfo))
            });
        },
        toYS(item) {
            console.log(item, "item");
            if (item.isComplete) return;
            uni.navigateTo({
                url:
                    "pages/task/engineering/checkBeforeAcceptance?twrInfo=" +
                    encodeURIComponent(JSON.stringify(item)) +
                    "&taskId=" +
                    this.taskId
            });
        },
        toSummary() {
            let list = this.listObj[this.activeCheckType];
            console.log(list, "list");
            if (list.length > 0 && list[0].taskState == 5) {
                this.$u.toast("此验收类型已完成总结");
                return;
            }
            let isCompleteAll = list.every((item) => {
                return item.isComplete;
            });
            if (isCompleteAll) {
                uni.navigateTo({
                    url:
                        "pages/task/engineering/summary?listObj=" +
                        encodeURIComponent(JSON.stringify(this.listObj)) +
                        "&activeCheckType=" +
                        this.activeCheckType +
                        "&taskId=" +
                        this.taskId
                });
            } else {
                this.$u.toast("您还有杆塔未验收，请先完成验收");
            }
        },
        toDefect() {
            let list = this.listObj[this.activeCheckType];
            let defList = list.length > 0 ? list[0].checkEngDefList : [];
            console.log(defList, "defList");
            uni.navigateTo({
                url:
                    "pages/task/engineering/defectList?defList=" +
                    encodeURIComponent(JSON.stringify(defList))
            });
        },
        //验收按钮点击
        ysItem(index, item) {
            console.log(item, "item");
            this.$nextTick(() => {
                this.$refs["ysBtn" + index][0].loading = true;
                let params = {
                    id: item.id,
                    twrCodesOver:
                        item.twrCodesOver +
                        (item.twrCodesOver && ",") +
                        item.twrCodes
                };
                checkengtaskSubmit([params]).then(() => {
                    this.$u.toast("验收成功");
                    item.isComplete = true;
                    this.listObj[this.activeCheckType] = this.listObj[
                        this.activeCheckType
                    ].map((v) => {
                        v.twrCodesOver =
                            v.twrCodesOver +
                            (v.twrCodesOver && ",") +
                            item.twrCodes;
                        return v;
                    });
                    this.$refs["ysBtn" + index][0].loading = false;
                });
            });
        },
        //验收类型切换
        typesChange(index) {
            if (this.listObj[index + 1].length == 0) return;
            this.activeCheckType = index + 1;
        }
    }
};
</script>

<style lang="scss" scoped>
.list-container {
    .searchs {
        background-color: #dde4f2;
        padding: 20rpx 16rpx;
    }
    .serch-btn {
        width: 72rpx;
        height: 56rpx;
        background: #ffffff;
        box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
        border-radius: 28rpx;
        margin-left: 34rpx;
        image {
            width: 40rpx;
            height: 40rpx;
        }
    }

    .container {
        // margin-top: 32rpx;
        .icon {
            width: 34px;
            height: 34px;
            // margin-right: 14rpx;
            position: relative;
            top: 6rpx;
        }
        .ul {
            padding: 20rpx 0;
            border-bottom: 1px solid #dde4f2;
            &:last-child {
                border: none;
            }
        }
        .list {
            align-items: center;
            // padding: 20rpx 0;
            // background-color: green;
            .title {
                font-size: 24rpx;
                color: #30495e;
                font-weight: 700;
            }

            .center-text {
                font-size: 20rpx;
                color: #30495e;
            }

            .list-right {
                width: 120rpx;

                image {
                    width: 12px;
                    height: 12px;
                }

                text {
                    font-size: 20rpx;
                    margin-left: 10rpx;
                }

                .defect {
                    color: #f75f49;
                }

                .danger {
                    color: #f7b500;
                }
            }
        }
    }
}
.lont {
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
    margin-top: 10rpx;
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
.complete-text {
    font-size: 20rpx;
    img {
        height: 22rpx;
    }
}
.testing-info {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx;
    box-sizing: border-box;
    overflow: hidden;
}
.tower-group {
    background-color: rgba(176, 154, 255, 1);
    border-radius: 24rpx;
    margin-left: 8rpx;
    color: #fff;
    font-size: 20rpx;
    padding: 0 8rpx;
}
.engineering-type {
    padding: 0 16rpx;
    margin-bottom: 16rpx;
}
.tabs-group {
    padding: 0 16rpx 16rpx;
    background-color: #dde4f2;
    .tabs-item {
        width: 24%;
        background-color: rgb(156, 156, 156);
        padding: 8rpx 26rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 40rpx;
    }
    .tabs-normal {
        width: 24%;
        padding: 8rpx 26rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 40rpx;
        background-color: #fff;
        color: $base-green;
        border: 1px solid $base-green;
    }
    .tabs-active {
        background-color: $base-green;
        color: #fff;
    }
}
</style>

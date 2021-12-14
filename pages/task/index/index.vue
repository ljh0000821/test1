<template>
    <view @click="toClose">
        <custom-navbar title="工作">
            <view slot="right" @click.stop="actionAlert=!actionAlert">
                <view class="add">
                    <!-- <uni-icons color="#304156" type="plusempty" size="22" style="font-weight: 800;" /> -->
                    <text class="add-icon">+</text>
                </view>
            </view>
        </custom-navbar>
        <transition name="fade">
            <view class="action-alert" v-show="actionAlert">
                <view>
                    <view class="li" @click.stop="inspection">新巡视</view>
                    <!-- <view class="li" @click.stop="inspection">新检测</view> -->
                </view>
            </view>
        </transition>
        <view class="container">
            <view class="task_list" v-for="(item,index) in taskList" :key="index">
                <view class="title_bar flex-between" @click="stretch(item,index)">
                    <view class="title_bar_left">
                        <image :src="item.src" />
                        <text class="name">{{item.title}}：<text class="name_number">{{item.total}}</text></text>
                    </view>
                    <view>
                        <uni-icons v-show="!item.show" type="more-filled" size="20" color="#6F757C" style="font-weight: 800;"></uni-icons>
                    </view>
                    <view class="flex title_bar_right">
                        <image src="@/static/task/index/arrowright.png" :class="{'active-icon':item.show}"></image>
                    </view>
                </view>
                <transition name="collapse">
                    <scroll-view v-if="item.show" scroll-y class="task-coentent" refresher-enabled @refresherrefresh="refresherrefresh" :upper-threshold="100" :lower-threshold="10" :refresher-triggered="triggered" @scrolltolower="scrolltolower">
                        <block v-for="(v,index) in item.dataList" :key="index">
                            <view class="task_item flex-between" :key="index" @click="taskItemGo(v,item)">
                                <view class="time-logo">
                                    <image :src="InspectionIcon[v.insType || '周期巡视']"></image>
                                </view>
                                <view class="flex1">
                                    <view class="main-title">
                                        <text>{{v.lineName}}</text>
                                        <!-- <template v-if="v.section||v.twrCodes"> -->
                                        <view class="tower">{{taskIndex==3?v.section:v.twrCodes}}</view>
                                        <!-- </template> -->
                                    </view>
                                    <view class="sub-title" v-if="item.type==0"><text>{{v.insType}}</text> </view>
                                    <view class="sub-title" v-if="item.type==3"><text>{{v.engTypeName}}</text> </view>
                                    <template v-if="item.type==1">
                                        <view class="sub-title"><text>{{v.testTypeName}}</text> </view>
                                        <view class="plan-time">计划完成时间：{{v.finishPlanDate&&v.finishPlanDate.slice(0,10)}}</view>
                                    </template>
                                    <template v-if="item.type==2">
                                        <view class="sub-title"><text>{{v.overHaulName}}</text> </view>
                                    </template>
                                </view>
                                <view>
                                    <!-- <view class="main-title"><text>{{$u.timeFormat(v.startPlanDate, 'yyyy-mm-dd')}}</text> </view> -->
                                    <view class="main-title"><text>{{v.startPlanDate.substring(0,10)}}</text> </view>
                                    <view v-if="item.type!=3" class="sub-title u-text-right"><text>{{v.doTwrNum}}/{{v.allTwrNum}}</text> </view>
                                </view>
                            </view>
                        </block>
                        <u-empty text="没有任务" v-if="item.dataList.length===0"></u-empty>
                        <u-loadmore v-if="item.dataList.length>10" :status="item.loadmoreStatus" :load-text="loadText" />
                    </scroll-view>
                </transition>
            </view>
        </view>
        <view class="flex-center bottoms">
            <!-- <view @click="totest">test1</view> -->
            <view class="flex-center bar-out">
                <text>缺陷</text>
                <view class="flex-center bar-in" @click="toDefect">
                    <image class="icon" src="@/static/task/index/defect.png"></image>
                    <text class="text">{{defAndTroNum.defNum||0}}</text>
                </view>
            </view>
            <view class="flex-center bar-out">
                <text>隐患</text>
                <view class="flex-center bar-in" @click="toDanger">
                    <image class="icon" src="@/static/task/index/danger.png"></image>
                    <text class="text danger-text">{{defAndTroNum.troNum||0}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { taskList } from "@/api/task/index";
const InspectionIcon = {
    周期巡视: "../../../static/task/index/time.png",
    特殊巡视: "../../../static/task/index/time2.png"
};
import { defAndTroNumH5 } from "@/api/history";
export default {
    data() {
        return {
            actionAlert: false,
            InspectionIcon,
            taskIndex: 0,
            taskList: [
                {
                    title: "巡视",
                    type: 0, //0巡视 1检测 2检修 3验收
                    src: "../../../static/task/index/ic_home_work_expand_ins.png",
                    dataList: [],
                    current: 1,
                    total: 0,
                    loadmoreStatus: "loadmore", //加载前数据
                    show: true,
                    api: "/blade-sd/taskitem/getTasks?taskType=1"
                },
                {
                    title: "检测",
                    type: 1, //0巡视 1检测 2检修 3验收
                    src: "../../../static/task/index/ic_home_work_expand_test.png",
                    dataList: [],
                    current: 1,
                    total: 0,
                    loadmoreStatus: "nomore", //加载前数据
                    show: false,
                    api: "/blade-sd/taskitem/getTasks?taskType=2"
                },
                {
                    title: "检修",
                    type: 2, //0巡视 1检测 2检修 3验收
                    src: "../../../static/task/index/ic_home_work_expand_overhaul.png",
                    dataList: [],
                    current: 1,
                    total: 0,
                    loadmoreStatus: "nomore", //加载前数据
                    show: false,
                    api: "/blade-sd/taskhaulitem/listH5"
                },
                {
                    title: "验收",
                    type: 3, //0巡视 1检测 2检修 3验收
                    src: "../../../static/task/index/ic_home_work_expand_check.png",
                    dataList: [],
                    current: 1,
                    total: 0,
                    loadmoreStatus: "nomore", //加载前数据
                    show: false,
                    api: "/blade-sd/checkengmanag/listH5"
                }
            ],
            triggered: false, //下拉刷新
            loadText: {
                loadmore: "上拉加载更多",
                loading: "正在加载",
                nomore: "没有更多任务了"
            },
            defAndTroNum: {}
        };
    },
    onLoad() {},
    onShow() {
        console.log("首页加载了");
        this.taskList.forEach((item) => {
            item.current = 1;
            item.total = 0;
        });
        this.getTaskList(true, 1);
        this.getTaskList(true, 2);
        this.getTaskList(true, 3);
        this.getTaskList(true, 4);
        this._defAndTroNumH5();
    },
    methods: {
        getTaskList(isRefresh, index) {
            const taskIndex = index ? index - 1 : this.taskIndex;
            const url = this.taskList[taskIndex].api;
            taskList(url, {
                size: 10,
                current: this.taskList[taskIndex].current
            }).then((res) => {
                const data = res.data.data.records || [];
                //如果刷新init的话
                if (isRefresh) {
                    this.taskList[taskIndex].dataList = data;
                } else {
                    this.taskList[taskIndex].dataList =
                        this.taskList[taskIndex].dataList.concat(data);
                }
                if (index == 0) {
                    console.log(res.data.data, "data==========", taskIndex);
                }
                this.taskList[taskIndex].total = res.data.data.total;
                this.taskList[taskIndex].loadmoreStatus =
                    data.length < res.data.data.size ? "nomore" : "loading";
                this.triggered = false;
            });
        },
        //跳转指导卡
        taskItemGo(v, item) {
            console.log(v, "v");
            console.log(item, "item");
            if (item.type == 0) {
                uni.navigateTo({
                    url:
                        "pages/task/work/work?id=" +
                        v.id +
                        "&taskId=" +
                        v.taskId +
                        "&type=" +
                        item.type
                });
            } else if (item.type == 1 || item.type == 2) {
                uni.navigateTo({
                    url:
                        "pages/task/map/index?id=" +
                        v.id +
                        "&taskId=" +
                        v.taskId +
                        "&type=" +
                        item.type
                });
            } else if (item.type == 3) {
                uni.navigateTo({
                    url: "pages/task/engineering/index?taskId=" + v.id
                });
            }
        },
        //跳转新建巡视任务
        inspection() {
            this.actionAlert = false;
            uni.navigateTo({
                url: "pages/task/inspection/index"
            });
        },
        //点击展开
        stretch(item, index) {
            console.log(item, "item外面");
            if (item.show && item.type == 0) {
                console.log("跳转了");
                uni.navigateTo({
                    url: "pages/task/inspection/kindsList"
                });
                return;
            }
            if (item.show) return;
            this.taskList.map((item) => (item.show = false));
            item.show = true;
            this.taskIndex = index;
        },
        //跳转到缺陷
        toDefect() {
            uni.navigateTo({
                url: "pages/task/defect/index"
            });
        },
        //跳转到隐患
        toDanger() {
            uni.navigateTo({
                url: "pages/task/hiddenDanger/index"
            });
        },
        //下拉刷新
        refresherrefresh() {
            if (this.triggered) return;
            this.triggered = true;
            this.taskList[this.taskIndex].current = 1;
            this.taskList[this.taskIndex].loadmoreStatus = "loading";
            this.getTaskList(true);
        },
        //滚动到底部
        scrolltolower() {
            if (this.taskList[this.taskIndex].loadmoreStatus === "nomore")
                return;
            this.taskList[this.taskIndex].current++;
            this.taskList[this.taskIndex].loadmoreStatus = "loading";
            this.getTaskList();
        },
        //关闭所有
        toClose() {
            if (this.actionAlert) this.actionAlert = false;
        },
        totest() {
            uni.navigateTo({
                url: "pages/test/test"
            });
        },
        //缺陷隐患数量
        _defAndTroNumH5() {
            defAndTroNumH5().then((res) => {
                console.log(res, "缺陷隐患数量");
                this.defAndTroNum = res.data.data;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.add {
    width: 40rpx;
    height: 40rpx;
    background: #ffffff;
    box-shadow: 0px 4px 16px 0px rgba(14, 23, 37, 0.08);
    border-radius: 50%;
    text-align: center;
    line-height: 40rpx;
    color: #304156;
}

$nav-height: 88rpx;

.action-alert {
    width: 232rpx;
    padding: 10rpx 0;
    background-color: #ffffff;
    position: fixed;
    top: $nav-height;
    right: 20rpx;
    z-index: 100;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);

    .li {
        padding: 16rpx 0;
        text-align: center;
        font-size: 24rpx;
        color: #30495e;
        letter-spacing: 2rpx;
    }
}

.container {
    margin: 20rpx 16rpx;
    padding: 0 34rpx;
    height: calc(100vh - 350rpx);
    overflow-y: hidden;
}

.task_list {
    .title_bar {
        border-bottom: 2rpx solid #dde4f2;
        padding: 34rpx 0;

        .title_bar_left {
            width: 312rpx;
            display: flex;
            align-items: center;
            image {
                width: 24rpx;
                height: 24rpx;
                margin-right: 6rpx;
            }
        }

        .title_bar_right {
            flex: 1;
            justify-content: flex-end;
            image {
                width: 38rpx;
                height: 38rpx;
                display: block;
                transition: 400ms;
            }
            .active-icon {
                transform: rotate(90deg);
            }
        }

        .name {
            font-size: 28rpx;
            font-weight: 700;
            color: #30495e;
            line-height: 40rpx;

            .name_number {
                font-size: 32rpx;
                color: #05b2cc;
            }
        }
    }

    &:last-child {
        .title_bar {
            margin-bottom: 0;
            border-bottom: 0;
        }
        .task-coentent {
            border-bottom: none;
            border-top: 2rpx solid #dde4f2;
        }
    }

    .task-coentent {
        height: calc(100vh - 814rpx);
        padding-top: 20rpx;
        border-bottom: 2rpx solid #dde4f2;
    }

    .task_item {
        padding-bottom: 20rpx;
        color: #30495e;
        font-weight: 500;
        .time-logo {
            width: 68rpx;
            height: 68rpx;
            margin-right: 16rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .line {
            font-size: 24rpx;
            line-height: 34rpx;
        }

        .time-title {
            font-size: 20rpx;
            line-height: 28rpx;
        }

        .main-title {
            // position: relative;
            display: flex;
            font-size: 24rpx;
            line-height: 34rpx;
            .tower {
                // max-width: 200px;
                background: rgba(176, 154, 255, 1);
                border-radius: 14rpx;
                color: #fff;
                padding: 2rpx 18rpx;
                display: inline-block;
                margin-left: 20rpx;
                font-size: 20rpx;
            }
        }

        .sub-title {
            font-size: 20rpx;
            line-height: 28rpx;
        }
    }
}

.bottoms {
    margin-top: 30rpx;

    .bar-out {
        margin: 0 22rpx;
    }

    .bar-in {
        width: 200rpx;
        height: 80rpx;
        background: #ffffff;
        box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
        border-radius: 40rpx;
        justify-content: initial;
        margin-left: 12rpx;
    }

    .icon {
        width: 44rpx;
        height: 44rpx;
        margin-left: 20rpx;
    }

    .text {
        margin-left: 49rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #f75f49;
    }

    .danger-text {
        color: #f7b500;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.collapse-leave,
.collapse-enter-active {
    max-height: calc(100vh - 814rpx);
    transition: all 0.5s ease-in-out;
}
.collapse-enter,
.collapse-leave-active {
    transition: all 0 ease-in-out;
    max-height: 0;
}
.add-icon {
    color: #304156;
    font-size: 44rpx;
    font-weight: 400;
}
.plan-time {
    font-size: 20rpx;
    color: red;
    margin-top: 6rpx;
}
</style>

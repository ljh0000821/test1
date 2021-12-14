<template>
    <view>
        <custom-navbar iconLeft>
            <view slot="left">
                <ef-tabs :data="tabsData" :current="tabIndex" @change="tabsChange" />
            </view>
        </custom-navbar>
        <view>
            <u-sticky bg-color="#dde4f2">
                <view style="padding:16rpx;background:#dde4f2">
                    <view class="flex-center searchs">
                        <u-search bg-color="#fff" search-icon="../../../static/task/map/serch-icon.png" class="search" placeholder="线路名称" shape="square" v-model="value" search-icon-color="#00B5D0" :show-action="false" @change="searchChange"></u-search>
                        <view class="flex-center time-box">
                            <view @click="dateShow">
                                <text v-if="!this.condition.startPlanDate||!this.condition.finishPlanDate">起始时间-结束时间</text>
                                <text v-else>{{this.condition.startPlanDate|sliceTime}}-{{this.condition.finishPlanDate|sliceTime}}</text>
                            </view>
                            <dateRange ref="dateRange" :showMutibleDate="show" @change="dateChange" @cancle="dateCancel" />
                        </view>
                    </view>
                </view>
            </u-sticky>
            <view class="container">
                <template v-if="listData.length>0">
                    <view v-for="(v,index) in listData" :key="index">
                        <view class="task_item flex-between" :key="index" @click="taskItemGo(v)">
                            <view class="time-logo">
                                <image :src="InspectionIcon[v.insType || '周期巡视']"></image>
                            </view>
                            <view class="flex1">
                                <view class="flex-between">
                                    <view class="main-title">
                                        <text>{{v.lineName}}</text>
                                        <view class="tower">{{v.twrCodes}}</view>
                                    </view>
                                    <view class="list-right flex-center">
                                        <view class="align-center">
                                            <image src="@/static/task/map/defect.png"></image>
                                            <text class="defect">{{v.defs}}</text>
                                        </view>
                                        <view class="align-center">
                                            <image style="margin-left: 20rpx;" src="@/static/task/map/danger.png"></image>
                                            <text class="danger">{{v.troExts+v.troTrees}}</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="flex-between m-t-8">
                                    <view class="green-text">{{v.insType}}</view>
                                    <view class="gray-text">{{$u.timeFormat(v.startPlanDate, 'yyyy-mm-dd')}}</view>
                                    <view class="sub-title u-text-right align-center">
                                        <img class="m-r-8" src="@/static/common/afe_def_detail_twr.png" alt="">
                                        <text class="green-text">{{v.doTwrNum}}</text><text>/{{v.allTwrNum}}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
                </template>
                <template v-if="listData.length==0">
                    <u-empty></u-empty>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
import efTabs from "@/components/ef-ui/ef-tabs/ef-tabs";
import { taskList } from "@/api/task/index";
import dateRange from "components/zxp-datepickerRange/zxp-datepickerRange.vue";
const InspectionIcon = {
    周期巡视: "../../../static/task/index/time.png",
    特殊巡视: "../../../static/task/index/time2.png"
};
export default {
    components: {
        efTabs,
        dateRange
    },
    data() {
        return {
            show: false,
            InspectionIcon,
            tabIndex: 0,
            tabsData: ["进行中", "未开始", "已完成"],
            value: "",
            listData: [],
            page: 1,
            totalPage: 0,
            status: "loadmore",
            condition: {
                state: 1, //1未开始 2进行中 3已完成
                lineName: "",
                startPlanDate: "",
                finishPlanDate: ""
            }
        };
    },
    onLoad() {
        this._taskList();
    },
    methods: {
        init() {
            this.page = 1;
            this.totalPage = 0;
            this.listData = [];
            this.status = "loadmore";
        },
        tabsChange(index) {
            this.tabIndex = index;
            this.condition.state = index + 1;
            this.init();
            this._taskList();
        },
        _taskList() {
            const url = "/blade-sd/taskitem/list?type=1";
            taskList(url, {
                size: 20,
                current: this.page,
                state: this.condition.state,
                lineName: this.condition.lineName,
                startPlanDate: this.condition.startPlanDate,
                finishPlanDate: this.condition.finishPlanDate
            }).then((res) => {
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                this.listData = [...this.listData, ...res.data.data.records];
                if (this.page >= this.totalPage) {
                    this.status = "nomore";
                } else {
                    this.page = this.page + 1;
                    this.status = "loadmore";
                }
            });
        },
        taskItemGo(v) {
            uni.navigateTo({
                url:
                    "pages/task/work/work?id=" +
                    v.id +
                    "&taskId=" +
                    v.taskId +
                    "&type=0"
            });
        },
        //搜索
        searchChange(e) {
            this.debounce(() => {
                this.condition.lineName = e;
                this.init();
                this._taskList();
            });
        },
        //防抖
        debounce(func, wait = 500) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                func();
            }, wait);
        },
        dateShow() {
            this.show = true;
        },
        dateChange(data) {
            this.show = false;
            this.condition.startPlanDate = data[0];
            this.condition.finishPlanDate = data[1];
            this.init();
            this._taskList();
        },
        dateCancel() {
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.searchs {
    background-color: #fff;
    padding: 20rpx 16rpx;
    border-radius: 16rpx;
}
.time-box {
    font-size: 24rpx;
    padding: 0 8rpx;
    border-left: 1px solid #dde4f2;
    color: $base-green;
}
.task_item {
    padding: 20rpx 0;
    color: #30495e;
    border-bottom: 1px solid #dde4f2;
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
        font-size: 24rpx;
        line-height: 34rpx;
        .tower {
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
        img {
            height: 24rpx;
        }
        font-size: 20rpx;
        line-height: 28rpx;
    }
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
</style>

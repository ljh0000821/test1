<template>
    <view>
        <custom-navbar title="接地电阻检测列表" iconLeft></custom-navbar>
        <view class="container">
            <u-sticky>
                <view class="tabs-group flex-around">
                    <ef-select-btn width="140rpx" type="lines" placeholder="路线" @change="linesChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" :data="dy_invtwrList" type="towers" :require="condition.lineId" errMessage="请先选择线路" placeholder="杆塔" @change="twrChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" :data="VoltageList" type="select" label="dictValue" id="dictKey" placeholder="电压等级" @change="voltageChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" type="time" multiple placeholder="检测时间" @change="timeChange"></ef-select-btn>
                </view>
            </u-sticky>
            <template v-if="listData.length>0">
                <view class="list-item" v-for="item in listData" :key="item.id" @click="toDetails(item)">
                    <view class="flex-between">
                        <view class="flex-start flex1">
                            <view class="list-item-icon flex-center">
                                <u-icon name="info"></u-icon>
                            </view>
                            <text class="list-item-status m-l-16">接地电阻测量</text>
                            <!-- <view class="m-l-16 gray-text ">
                                <img src="@/static/common/ic_add_ins_tower.png" alt="" srcset="">
                                <text>{{item.twrCode}}</text>
                            </view> -->
                            <!-- <text class="flex1 gray-text m-l-16 text-ellipsis">{{item.defReport}}</text> -->
                        </view>
                    </view>

                    <view class="flex-between">
                        <view class="flex-start flex1 m-t-16">
                            <img src="@/static/common/ic_add_ins_line.png" alt="" srcset="">
                            <text class="flex1 gray-text text-ellipsis">{{item.xlmc}}</text>
                        </view>
                        <view class="flex-start m-t-16">
                            <view class="m-l-16 gray-text ">
                                <img src="@/static/common/ic_add_ins_tower.png" alt="" srcset="">
                                <text>{{item.gth}}</text>
                            </view>
                            <view class="m-l-16 gray-text ">
                                <img src="@/static/common/ic_add_ins_date.png" alt="" srcset="">
                                <text>{{item.gzsj}}</text>
                            </view>

                        </view>
                    </view>
                </view>
                <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
            </template>
            <template v-if="listData.length===0">
                <u-empty></u-empty>
            </template>
        </view>
    </view>
</template>

<script>
import efSelectBtn from "@/components/ef-ui/ef-select-btn/ef-select-btn";
import { testRecordQuery } from "@/api/more";
import { invtwrList, towersPMS } from "@/api/invtwr";
export default {
    components: {
        efSelectBtn
    },
    data() {
        return {
            VoltageList: [], //电压等级
            dy_invtwrList: [], //杆塔列表
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            condition: {
                voltage: "", //电压等级
                lineId: "", //线路
                gth: "", //杆塔号
                startPlanDate: "",
                finishPlanDate: ""
            }
        };
    },
    mounted() {
        console.log("mounted");
        this.getVoltage();
        this._testRecordQuery();
    },
    methods: {
        //列表
        _testRecordQuery() {
            let params = {
                testType: 4,
                size: 20,
                current: this.page,
                lineId: this.condition.lineId,
                voltage: this.condition.voltage,
                gth: this.condition.gth,
                startPlanDate: this.condition.startPlanDate,
                finishPlanDate: this.condition.finishPlanDate
            };
            if (!params.startPlanDate || !params.finishPlanDate) {
                delete params.startPlanDate;
                delete params.finishPlanDate;
            }
            testRecordQuery(params).then((res) => {
                console.log(res, "接地电阻列表");
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                this.listData = [...this.listData, ...res.data.data.records];
                console.log(this.listData, "this.listData2");
                if (this.page >= this.totalPage) {
                    this.status = "nomore";
                } else {
                    this.page = this.page + 1;
                    this.status = "loadmore";
                }
            });
        },
        //触底加载更多
        loadMore() {
            console.log("加载更过");
            //避免多次触发
            if (
                this.status == "loading" ||
                this.status == "nomore" ||
                this.page >= this.totalPage + 1
            ) {
                return;
            }
            this._testRecordQuery();
        },
        //获取电压等级
        getVoltage() {
            this.$store.dispatch("getList", "voltage_level").then((res) => {
                console.log(res, "电压等级");
                this.VoltageList = res;
            });
        },
        //杆塔列表
        // getInvtwrList(id) {
        //     invtwrList({
        //         lineId: id
        //     }).then(({ data }) => {
        //         this.dy_invtwrList = data.data || [];
        //     });
        // },
        getInvtwrList(id) {
            towersPMS({
                line: id
            }).then(({ data }) => {
                this.dy_invtwrList = data.data.records || [];
            });
        },
        onReachBottom() {
            this.loadMore();
        },
        init() {
            this.page = 1;
            this.totalPage = 0;
            this.listData = [];
            this.status = "loadmore";
        },
        linesChange(data) {
            this.condition.lineId = data.psrId;
            this.getInvtwrList(data.psrId);
            this.init();
            this._testRecordQuery();
        },
        twrChange(data) {
            console.log(data, "杆塔data");
            this.condition.gth = data.twrCode;
            this.init();
            this._testRecordQuery();
        },
        voltageChange(data) {
            console.log(data,"电压data");
            this.condition.voltage = data.dictKey;
            this.init();
            this._testRecordQuery();
        },
        timeChange(data) {
            this.condition.startPlanDate = data[0];
            this.condition.finishPlanDate = data[1];
            console.log(
                this.condition.startPlanDate,
                "this.condition.startPlanDate"
            );
            this.init();
            this._testRecordQuery();
        },
        toDetails(item) {
            uni.navigateTo({
                url:
                    "pages/task/testing/addTesting?kinds=jddz" +
                    "&type=details" +
                    "&taskItemId=" +
                    this.taskItemId +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(item)) +
                    "&taskType=0"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 20rpx;
    margin-right: 8rpx;
}
.tabs-group {
    padding: 16rpx 0;
    background-color: #fff;
    // border-radius: 26rpx;
    // margin-top: -6rpx;
}
.list-box {
    padding: 8rpx;
}

.list-item {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 16rpx 0;
    font-size: 28rpx;
}

.list-item:first-child {
    border-top: none;
}

.right-tags {
    padding: 6rpx 20rpx;
    color: #fff;
    // background-color: #f7b500;
    border-radius: 26rpx;
    font-size: 26rpx;
}
.bg-orange {
    background-color: #f7b500;
}
.bg-blue {
    background-color: #05b2cc;
}
.bg-green {
    background-color: #00be27;
}
.list-item-icon {
    background-color: red;
    color: #fff;
    border-radius: 50%;
    width: 40rpx;
    height: 40rpx;
}

.list-item-status {
    font-weight: bold;
}

.gray-text {
    color: #9aa3aa;
    font-size: 26rpx;
}
</style>

<template>
    <view>
        <template v-if="!twrId">
            <u-sticky>
                <view class="tabs-group flex-around">
                    <ef-select-btn :data="QXZT" type="select" label="dictValue" id="dictKey" placeholder="状态" @change="stateChange"></ef-select-btn>
                    <ef-select-btn :data="dy_XSXL" type="lines" placeholder="路线" @change="linesChange"></ef-select-btn>
                    <ef-select-btn :data="defNature" type="select" label="dictValue" id="dictKey" placeholder="性质" @change="natureChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" type="time" multiple placeholder="发现时间" @change="timeChange"></ef-select-btn>
                    <view @click="sortChange">
                        <ef-select-btn width="160rpx" :placeholder="sortText"></ef-select-btn>
                    </view>
                </view>
            </u-sticky>
        </template>
        <view class="list-box">
            <template v-if="listData.length>0">
                <view class="list-item" v-for="item in listData" :key="item.id" @click="toDetails(item)">
                    <view class="flex-between">
                        <view class="flex-start flex1">
                            <view class="list-item-icon flex-center">
                                <u-icon name="info"></u-icon>
                            </view>
                            <text class="list-item-status m-l-16">{{item.defNature}}</text>
                            <view class="m-l-16 gray-text ">
                                <img src="../../../../static/common/ic_add_ins_tower.png" alt="" srcset="">
                                <text>{{item.twrCode}}</text>
                            </view>
                            <text class="flex1 gray-text m-l-16 text-ellipsis">{{item.defReport}}</text>
                        </view>
                        <view :class="['right-tags',item.defState==1?'bg-orange':item.defState==3?'bg-green':'bg-blue']">
                            {{item.stateName}}
                        </view>
                    </view>

                    <view class="flex-between">
                        <view class="flex-start flex1 m-t-16">
                            <img src="../../../../static/common/ic_add_ins_line.png" alt="" srcset="">
                            <text class="flex1 gray-text text-ellipsis">{{item.lineName}}</text>
                        </view>
                        <view class="flex-start m-t-16">
                            <view class="m-l-16 gray-text ">
                                <img src="../../../../static/common/ic_add_ins_date.png" alt="" srcset="">
                                <text>{{item.findDate}}</text>
                            </view>
                            <view class="m-l-16 gray-text ">
                                <img src="../../../../static/common/ic_add_ins_member.png" alt="" srcset="">
                                <text>{{item.findUserName|sliceName}}</text>
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
import { deflist } from "@/api/defect/index";
export default {
    props: {
        twrId: {
            type: String,
            default: ""
        }
    },
    components: {
        efSelectBtn
    },
    data() {
        return {
            sortText: "时间↓",
            sort: "",
            QXZT: [], //缺陷状态
            dy_XSXL: [], //线路
            defNature: [], //性质
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            condition: {
                defState: "", //状态
                defNature: "", //性质
                lineId: "", //线路
                findStartTime: "",
                findEndTime: ""
            }
        };
    },
    watch: {
        sort(nval) {
            this.sortText = nval ? "时间↑" : "时间↓";
        }
    },
    mounted() {
        console.log("mounted");
        this._getTypelist();
        this._getRiskLevel();
        this._deflist();
    },
    methods: {
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];
            console.log(this.listData, "this.listData");
            this._deflist();
        },
        //获取缺陷状态
        _getTypelist() {
            //线路
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     console.log(res, "线路");
            //     this.dy_XSXL = res.records || [];
            // });
            this.$store.dispatch("getList", "QXZT").then((res) => {
                console.log(res, "缺陷状态");
                this.QXZT = res.filter((item) => {
                    return item.dictValue != "保存";
                });
                console.log(this.QXZT, "this.QXZT");
            });
        },
        //风险等级
        _getRiskLevel() {
            this.$store.dispatch("getList", "defect_nature").then((res) => {
                console.log(res, "性质");
                this.defNature = res;
            });
        },
        //获取缺陷列表（分页）
        _deflist() {
            this.status = "loading";
            let data = {
                size: 20,
                current: this.page,
                defState: this.condition.defState,
                lineId: this.condition.lineId,
                defNature: this.condition.defNature,
                findStartTime: this.condition.findStartTime,
                findEndTime: this.condition.findEndTime,
                sort: this.sort,
                twrId: this.twrId
            };
            deflist(data).then((res) => {
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                let moreData = res.data.data.records.filter(
                    (item) => item.defState != 1
                );
                this.listData = [...this.listData, ...moreData];
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
            //避免多次触发
            if (
                this.status == "loading" ||
                this.status == "nomore" ||
                this.page >= this.totalPage + 1
            ) {
                return;
            }
            this._deflist();
        },
        init() {
            this.page = 1;
            this.totalPage = 0;
            this.listData = [];
            this.status = "loadmore";
        },
        //状态改变
        stateChange(data) {
            this.condition.defState = data.dictKey;
            this.init();
            this._deflist();
        },
        //线路改变
        linesChange(data) {
            this.condition.lineId = data.psrId;
            this.init();
            this._deflist();
        },
        //性质改变
        natureChange(data) {
            this.condition.defNature = data.dictValue;
            this.init();
            this._deflist();
        },
        //时间改变
        timeChange(data) {
            console.log(data[0], data[1], "时间");
            this.condition.findStartTime = data[0] + "";
            this.condition.findEndTime = data[1] + "";
            this.init();
            this._deflist();
        },
        //跳转详情页
        toDetails(item) {
            uni.navigateTo({
                url:
                    "pages/task/defect/details?id=" +
                    item.id +
                    "&state=" +
                    item.defState
            });
        },
        sortChange() {
            this.sort = this.sort ? "" : "1";
            this.init();
            this._deflist();
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

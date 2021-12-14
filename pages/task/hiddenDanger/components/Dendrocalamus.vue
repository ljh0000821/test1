<template>
    <view>
        <template v-if="!twrId">
            <u-sticky>
                <view class="tabs-group flex-around">
                    <ef-select-btn width="140rpx" :data="QXZT" type="select" label="dictValue" id="dictKey" placeholder="状态" @change="stateChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" :data="dy_XSXL" type="lines" placeholder="路线" @change="linesChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" :data="TroTypeLevel" type="select" label="dictValue" id="dictKey" placeholder="等级" @change="levelChange"></ef-select-btn>
                    <ef-select-btn width="140rpx" type="time" multiple placeholder="发现时间" @change="timeChange"></ef-select-btn>
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
                            <text class="list-item-status m-l-16">树竹</text>
                            <text class="flex1 gray-text m-l-16 text-ellipsis">{{item.lsSides+item.treeType|clearLineFeed}}</text>
                        </view>
                        <view :class="['right-tags',item.state==1||item.state==4?'bg-orange':item.state==7?'bg-green':'bg-blue']">
                            {{item.realState}}
                        </view>
                    </view>
                    <view class="flex-between">
                        <view class="flex-start flex1 m-t-16 flex-center">
                            <img src="../../../../static/common/ic_add_ins_line.png" alt="" srcset="">
                            <text class="flex1 gray-text text-ellipsis">{{item.lineName}}</text>
                        </view>
                        <view class="flex-start m-t-16">
                            <view class="m-l-16 gray-text flex-center">
                                <img style="height:25rpx" src="../../../../static/common/ic_add_ins_tower.png" alt="" srcset="">
                                <text>{{item.townameL}}</text>
                            </view>
                            <view class="m-l-16 gray-text flex-center">
                                <img src="../../../../static/common/ic_add_ins_date.png" alt="" srcset="">
                                <text>{{item.findDate}}</text>
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
import { trotreeList } from "@/api/hiddenDanger/index";
import { getList } from "@/utils/tools";
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
            QXZT: [], //缺陷状态
            dy_XSXL: [],
            TroTypeLevel: [], //隐患等级
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            condition: {
                defState: "", //状态
                lineId: "", //线路
                troTypeLevel: "", //隐患等级
                startTime: "",
                endTime: ""
            }
        };
    },
    mounted() {
        this._getTypelist();
        this._trotreeList();
    },
    methods: {
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];
            this._trotreeList();
        },
        //获取隐患状态
        _getTypelist() {
            //线路
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     console.log(res, "线路");
            //     this.dy_XSXL = res.records || [];
            // });
            //隐患等级
            this.$store.dispatch("getList", "getTroTypeLevel2").then((res) => {
                console.log(res, "隐患等级");
                this.TroTypeLevel = getList(res);
            });
            this.$store.dispatch("getList", "YHZT").then((res) => {
                console.log(res, "隐患状态");
                this.QXZT = res;
            });
        },
        //获取缺陷列表（分页）
        _trotreeList() {
            this.status = "loading";
            let data = {
                size: 20,
                current: this.page,
                state: this.condition.defState,
                lineId: this.condition.lineId,
                troTypeLevel: this.condition.troTypeLevel,
                startTime: this.condition.startTime,
                endTime: this.condition.endTime,
                twridL: this.twrId
            };
            trotreeList(data).then((res) => {
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
            this._trotreeList();
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
            this._trotreeList();
        },
        //线路改变
        linesChange(data) {
            console.log(data, "data线路");
            this.condition.lineId = data.psrId;
            this.init();
            this._trotreeList();
        },
        //等级改变
        levelChange(data) {
            console.log(data, "等级");
            this.condition.troTypeLevel = data.text;
            this.init();
            this._trotreeList();
        },
        //时间改变
        timeChange(data) {
            console.log(data[0], data[1], "时间");
            this.condition.startTime = data[0] + "";
            this.condition.endTime = data[1] + "";
            this.init();
            this._trotreeList();
        },
        //跳转详情
        toDetails(data) {
            console.log(data, "data");
            if (data.state != 1) {
                uni.navigateTo({
                    url: "pages/task/hiddenDanger/details?type=1&id=" + data.id
                });
            } else {
                uni.navigateTo({
                    url: "pages/task/hiddenDanger/addDanger?type=edit&activeTabs=1&id=" + data.id
                });
            }
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
    width: 100%;
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

.list-item-icon {
    background-color: #f7b500;
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

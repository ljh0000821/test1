<template>
    <view>
        <custom-navbar title="历史值" iconLeft></custom-navbar>
        <view class="container">
            <template v-if="listData.length>0">
                <!-- 红外测温历史值 -->
                <template v-if="kinds=='hwcw'">
                    <view>
                        <view class="record-item" v-for="(item,index) in listData" :key="index" @click="toDetails(item)">
                            <view>连接形式：{{item.ljxs}}</view>
                            <view class="flex-between">
                                <text>接头位置：{{item.jtwz}}</text>
                                <view class="details-btn">查看详情</view>
                            </view>
                            <view class="gray-text">
                                <text>测量人员：{{item.gzryName}}</text>
                                <text class="m-l-16">日期：{{item.gzsj}}</text>
                            </view>
                        </view>
                    </view>
                </template>
                <!-- 接地电阻历史值 -->
                <template v-if="kinds=='jddz'">
                    <view>
                        <view class="record-item" v-for="(item,index) in listData" :key="index" @click="toDetails(item)">
                            <view>电阻测量值A左：{{item.aleg}}</view>
                            <view class="flex-between">
                                <text>电阻测量值B右：{{item.bleg}}</text>
                                <view class="details-btn">查看详情</view>
                            </view>
                            <view class="gray-text">
                                <text>测量人员：{{item.gzryName}}</text>
                                <text class="m-l-16">日期：{{item.gzsj}}</text>
                            </view>
                        </view>
                    </view>
                </template>
                <!-- 覆冰观测历史值 -->
                <template v-if="kinds=='fbgc'">
                    <view>
                        <view class="record-item" v-for="(item,index) in listData" :key="index" @click="toDetails(item)">
                            <view>温度(℃)：{{item.wd}}</view>
                            <view class="flex-between">
                                <text>湿度%：{{item.sd}}</text>
                                <view class="details-btn">查看详情</view>
                            </view>
                            <view class="gray-text">
                                <text>测量人员：{{item.gzryName}}</text>
                                <text class="m-l-16">日期：{{item.gzsj}}</text>
                            </view>
                        </view>
                    </view>
                </template>
                <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
            </template>
            <template v-if="listData.length===0">
                <u-empty></u-empty>
            </template>
        </view>
        <HistoricalDetails ref="HistoricalDetails" />
    </view>
</template>

<script>
import HistoricalDetails from "./components/HistoricalDetails.vue";
import { getTestByItemIdPage } from "@/api/task/index";
import { taskitemGetTestByTestId } from "@/api/testing";
const kindsObj = {
    hwcw: 1,
    fbgc: 2,
    jcky: 3,
    jddz: 4
};
const fn = {
    getTestByItemIdPage: (data) => getTestByItemIdPage(data),
    taskitemGetTestByTestId: (data) => taskitemGetTestByTestId(data)
};
export default {
    components: {
        HistoricalDetails
    },
    data() {
        return {
            kinds: "",
            taskItemId: "",
            twrId: "",
            objId: "",
            taskType: "", //0巡视 1检测 2检修 3验收
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: []
        };
    },
    onLoad(options) {
        console.log(options, "options");
        this.kinds = options.kinds;
        this.taskItemId = options.taskItemId;
        this.twrId = options.twrId;
        this.objId = options.objId;
        this.taskType = options.taskType;
        this._getTestByItemIdPage();
    },
    methods: {
        toDetails(item) {
            // this.$refs.HistoricalDetails.open();
            uni.navigateTo({
                url:
                    "pages/task/testing/historicalDetails?kinds=" +
                    this.kinds +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(item))
            });
        },
        //获取列表
        _getTestByItemIdPage() {
            let params = {},
                name = "";
            if (this.taskType == 1) {
                params = {
                    isNow: 1,
                    size: 20,
                    current: this.page,
                    index: kindsObj[this.kinds], //1红外 2覆冰 3交叉跨越 4接地电阻
                    twrId: this.twrId
                };
                name = "getTestByItemIdPage";
            } else if (this.taskType == 0) {
                params = {
                    isNow: 1,
                    size: 20,
                    current: this.page,
                    id: this.objId, //信息里的objid
                    index: kindsObj[this.kinds]
                };
                name = "taskitemGetTestByTestId";
            }

            fn[name](params).then((res) => {
                console.log(res, "历史值列表");
                this.totalPage = res.data.data.test.pages;
                this.page = res.data.data.test.current;
                if (this.kinds != "jddz") {
                    this.listData = [
                        ...this.listData,
                        ...res.data.data.test.records
                    ];
                } else {
                    let newArr = [],
                        rel = res.data.data.test.records;
                    rel.forEach((item) => {
                        item.jddzcljlItems.forEach((v) => {
                            v.gzryName = item.gzryName;
                            v.gzsj = item.gzsj;
                            newArr.push(v);
                        });
                    });

                    this.listData = [...this.listData, ...newArr];
                }
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
            this._getTestByItemIdPage();
        },
        onReachBottom() {
            this.loadMore();
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    .record-item {
        padding: 16rpx 0;
        border-bottom: 1px solid $line-gray;
        &:last-child {
            border-bottom: none;
        }
    }
}

.details-btn {
    border: 1px solid $base-green;
    color: $base-green;
    border-radius: 20rpx;
    padding: 0 16rpx;
}
</style>

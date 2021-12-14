<template>
    <view class="kinds-box">
        <custom-navbar title="检测列表" iconLeft>
            <template v-slot:right>
                <view class="dropdown">
                    <u-dropdown>
                        <u-dropdown-item v-model="value" :title="activeOption.label" :options="options" @change="change">
                        </u-dropdown-item>
                    </u-dropdown>
                </view>
            </template>
        </custom-navbar>
        <view class="container main-box">
            <!-- <view @click="test">aaa</view> -->
            <u-sticky bg-color="#fff">
                <view class="tabs-group flex-around">
                    <ef-select-btn ref="lineBtn" width="180rpx" :data="dy_XSXL" type="lines" placeholder="路线" @change="linesChange"></ef-select-btn>
                    <ef-select-btn ref="timeBtn" width="180rpx" type="time" multiple placeholder="发现时间" @change="timeChange"></ef-select-btn>
                    <view @click="sortChange">
                        <ef-select-btn width="160rpx" :placeholder="sortText"></ef-select-btn>
                    </view>
                </view>
            </u-sticky>
            <view>
                <template v-if="listData.length>0">
                    <view class="list-item" v-for="(item,index) in listData" :key="index" @click="toDetails(item)">
                        <view>
                            <text>{{activeOption.label}}</text>
                        </view>
                        <view class="flex-between info-box">
                            <view class="align-center">
                                <img src="@/static/common/ic_add_ins_line.png" alt="">
                                <text class="m-l-8">{{item.xlmc}}</text>
                            </view>
                            <view class="flex">
                                <view class="align-center">
                                    <img src="@/static/common/ic_add_ins_tower.png" alt="">
                                    <text class="m-l-8">{{item.twrCode}}</text>
                                </view>
                                <view class="m-l-16 align-center">
                                    <img src="@/static/common/ic_add_ins_date.png" alt="">
                                    <text class="m-l-8">{{item.clsj}}</text>
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
import efSelectBtn from "@/components/ef-ui/ef-select-btn/ef-select-btn";
import { getTestByTwrIdPage } from "@/api/testing";
export default {
    components: {
        efSelectBtn
    },
    data() {
        return {
            taskItemId: "",
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            info: {},
            lineId: "",
            startTime: "",
            finishTime: "",
            sortText: "时间排序↓",
            sort: "",
            value: "hwcw",
            options: [
                {
                    label: "红外测温",
                    value: "hwcw",
                    typeNum: 1
                },
                {
                    label: "交叉跨越及对地距离测量",
                    value: "jcky",
                    typeNum: 3
                },
                {
                    label: "接地电阻测量",
                    value: "jddz",
                    typeNum: 4
                },
                {
                    label: "覆冰观测",
                    value: "fbgc",
                    typeNum: 2
                }
            ],
            activeOption: {
                label: "红外测温",
                value: "hwcw",
                typeNum: 1
            },
            dy_XSXL: [] //线路
        };
    },
    watch: {
        sort(nval) {
            this.sortText = nval ? "时间排序↑" : "时间排序↓";
        }
    },
    onLoad(options) {
        this.taskItemId = options.taskItemId;
        this.info = JSON.parse(decodeURIComponent(options.info));
        console.log(this.info, "this.info");
        this._getTypelist();
        this._getTestByTwrIdPage();
    },
    methods: {
        //获取缺陷状态
        _getTypelist() {
            //线路
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     console.log(res, "线路");
            //     this.dy_XSXL = res.records || [];
            // });
        },
        change(e) {
            this.activeOption = this.options.filter(
                (item) => item.value == e
            )[0];
            this.lineId = "";
            this.startTime = "";
            this.finishTime = "";
            this.sortText = "时间排序↓";
            this.sort = "";
            this.$refs.lineBtn.init();
            this.$refs.timeBtn.init();
            this.reload();
        },
        //线路改变
        linesChange(data) {
            this.lineId = data.psrId;
            this.reload();
        },
        //时间改变
        timeChange(data) {
            console.log(data, "时间data");
            let newData = JSON.parse(JSON.stringify(data));
            this.startTime = newData[0];
            this.finishTime = newData[1];
            this.reload();
        },
        listClick() {
            console.log(666);
        },
        //跳转详情
        toDetails(item) {
            uni.navigateTo({
                url:
                    "pages/task/testing/addTesting?kinds=" +
                    this.activeOption.value +
                    "&type=details" +
                    "&taskItemId=" +
                    this.taskItemId +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(item)) +
                    "&taskType=0"
            });
        },
        //检测列表
        _getTestByTwrIdPage() {
            let params = {
                current: this.page,
                index: this.activeOption.typeNum,
                size: 20,
                twrId: this.info.id,
                taskItemId: this.taskItemId,
                lineId: this.lineId,
                startTime: this.startTime,
                finishTime: this.finishTime,
                sort: this.sort
            };
            if (this.activeOption.value == "jcky") {
                delete params.twrId;
            }
            getTestByTwrIdPage(params).then((res) => {
                console.log(res, "杆塔检测列表");
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                this.listData = [...this.listData, ...res.data.data.records];
                console.log(this.listData, "this.listData");
                if (this.page >= this.totalPage) {
                    this.status = "nomore";
                } else {
                    this.page = this.page + 1;
                    this.status = "loadmore";
                }
            });
        },
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];

            this._getTestByTwrIdPage();
        },
        sortChange() {
            this.sort = this.sort ? "" : "1";
            this.reload();
        },
        test() {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2]; //上一个页面
            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
            // 上一个页面最后设置userdata
            if (prevPage.hasOwnProperty("isBack")) {
                prevPage.isBack = true;
            }
            uni.navigateBack({
                //返回
                delta: 1
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.kinds-box {
    position: relative;
}
.dropdown {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.main-box {
    margin-top: 16rpx;
}
/deep/.u-dropdown__menu__item {
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    padding-right: 16px;
}
.tabs-group {
    width: 100%;
    padding: 16rpx 0;
    background-color: #fff;
}
.list-item {
    border-top: 1px solid #dde4f2;
    padding: 16rpx 0;
}
.info-box {
    font-size: 24rpx;
    color: #97a4ae;
    margin-top: 16rpx;
    img {
        height: 24rpx;
    }
}
</style>

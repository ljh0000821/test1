<template>
    <view class="list-container">
        <u-sticky bg-color="#dde4f2">
            <template v-if="kinds!='3'&&type!='3'">
                <view class="flex-center searchs">
                    <u-search bg-color="#fff" search-icon="../../../static/task/map/serch-icon.png" class="search" placeholder="杆塔名称" shape="square" v-model="value" search-icon-color="#00B5D0" :show-action="false" @change="searchChange"></u-search>
                    <view class="serch-btn flex-center" @click="changeSort">
                        <image :src="sortIcon"></image>
                    </view>
                </view>
            </template>
            <!-- 检测,检修模块的 -->
            <template v-if="['1','2','3'].indexOf(type)>-1&&details.id">
                <view class="p-b-24" style="background:#dde4f2;">
                    <view class="testing-info">
                        <view class="align-center">
                            <text>{{details.lineName}}</text>
                            <view class="tower-group">{{details.twrCodes}}</view>
                        </view>
                        <!-- <view>{{details.testTypeName||details.overHaulName}}</view> -->
                        <view>{{typeName(type,details)}}</view>
                        <view class="flex-between">
                            <text class="orange-text">计划完成日期：{{details.finishPlanDate&&details.finishPlanDate.slice(0,10)}}</text>
                            <view class="green-text" @click="toDetails">查看详情</view>
                        </view>
                    </view>
                </view>
            </template>
            <!-- 工程验收tabs -->
            <!-- <template v-if="['3'].indexOf(type)>-1">
                <view>aaaa</view>
            </template> -->
        </u-sticky>
        <view class="container">
            <!-- 非交叉跨越列表 -->
            <template v-if="listShow.length>0">
                <template v-if="kinds!='3'">
                    <view v-for="(item,index) in listShow" :key="item.psrId" @click="toPath(item,index)" class="ul">
                        <view class="flex list">
                            <image class="icon" :src="towerIcon(isComplete(type,item))"></image>
                            <text class="title">{{item.name}}</text>
                            <view class="flex1 flex-center u-text-center">
                                <view v-if="isComplete(type,item)" class="flex-center complete-text m-l-32">
                                    <img class="m-r-8" src="@/static/common/afe_def_detail_find_date.png" alt="">
                                    <text class="m-r-8 gray-text">完成时间:{{showTime(item.overDate)}}</text>
                                </view>
                                <text class="center-text text-ellipsis flex1">{{item.modCode}}</text>
                            </view>
                            <view class="list-right flex-center">
                                <template v-if="type==0">
                                    <view class="align-center" @click="qx(item)">
                                        <image src="../../../../static/task/map/defect.png"></image>
                                        <text class="defect">{{defTroNum(item.defs)}}</text>
                                    </view>
                                    <view class="align-center" @click="yh(item)">
                                        <image style="margin-left: 20rpx;" src="../../../../static/task/map/danger.png"></image>
                                        <text class="danger">{{defTroNum(item.troExts+item.troTrees)}}</text>
                                    </view>
                                </template>
                            </view>
                        </view>
                        <template v-if="item.show">
                            <view class="meun-list flex-around">
                                <view v-for="(v,index) in meunList" :key="index" v-if="v.visibleArr.indexOf(type)>-1">
                                    <view class="flex-column" @click.stop="v.redirect(item)">
                                        <image class="icon" :src="v.src"></image>
                                        <text class="text">{{v.text}}</text>
                                    </view>
                                </view>
                            </view>
                        </template>
                    </view>
                </template>
                <!-- 交叉跨越列表 -->
                <template v-if="kinds=='3'">
                    <view v-for="(item) in listShow" :key="item.id" @click="check(item)" class="ul">
                        <view class="flex list">
                            <image class="icon" :src="towerIcon(isComplete(type,item))"></image>
                            <text class="title">{{item.twrL}}-{{item.twrR}}</text>
                            <view class="flex1 flex-center u-text-center">
                                <view class="flex1 text-ellipsis">
                                    <view v-if="isComplete(type,item)" class="flex-center complete-text">
                                        <img class="m-r-8" src="@/static/common/afe_def_detail_find_date.png" alt="">
                                        <text class="m-r-8 gray-text">完成时间:{{showTime(item.updateTime)}}</text>
                                    </view>
                                    <text class="center-text">跨越物:{{item.bkumc}}</text>
                                </view>
                            </view>
                            <view class="list-right flex-end" style="width:60rpx">
                                <u-icon name="arrow-right" size="20"></u-icon>
                            </view>
                        </view>
                    </view>
                </template>
            </template>
            <template v-if="listShow.length==0">
                <u-empty></u-empty>
            </template>
        </view>
    </view>
</template>

<script>
// import { taskitemDetail } from "@/api/task";
const towerImgs = [
    require("@/static/task/map/tour-tower.png"),
    require("@/static/task/map/tower.png")
];
const kindsArr = ["hwcw", "fbgc", "jcky", "jddz"];
export default {
    components: {},
    name: "towerList",
    props: {
        id: {
            type: String,
            default: ""
        },
        details: {
            type: Object,
            default: () => {}
        },
        type: {}
    },
    data() {
        return {
            kinds: "", //1红外 2覆冰 3交叉跨越 4接地电阻
            value: "",
            sortType: 0, //0降序 1升序
            meunList: [
                {
                    text: "巡视",
                    visibleArr: ["0"],
                    src: require("@/static/common/ic_menu_map_xs.png"),
                    redirect: (item) => {
                        this.xs(item);
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
                        this.overhaul(item);
                    }
                },
                {
                    text: "纠正",
                    visibleArr: ["0", "1", "2", "3"],
                    src: require("@/static/common/ic_menu_map_correct.png"),
                    redirect: (item) => {
                        this.correct(item);
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
                    text: "地图",
                    visibleArr: ["0", "1", "2", "3"],
                    src: require("@/static/common/ic_menu_map_list.png"),
                    redirect: (item) => {
                        this.map(item);
                    }
                }
            ],
            taskInfo: {},
            list: [],
            listShow: []
        };
    },
    computed: {
        sortIcon() {
            let str =
                this.sortType == 0
                    ? require("@/static/common/ic_order_desc.png")
                    : require("@/static/common/ic_order_asc.png");
            return str;
        },
        showTime() {
            return (time) => {
                if (!time) return "";
                return (
                    time.slice(5, 10).replace("-", "/") +
                    " " +
                    time.slice(11, 16)
                );
            };
        },
        towerIcon() {
            return (state) => {
                let src = state == 1 ? towerImgs[0] : towerImgs[1];
                return src;
            };
        },
        typeName() {
            return (type, details) => {
                if (type == 1) {
                    return details.testTypeName;
                }
                if (type == 2) {
                    return details.overHaulName;
                }
            };
        },
        isComplete() {
            return (type, item) => {
                if (type == 0) {
                    return item.isNotes == 1;
                }
                if (type == 1) {
                    return item.isTest == 1;
                }
                if (type == 2) {
                    return item.isHaul == 1;
                }
            };
        },
        defTroNum() {
            return (num) => {
                return num > 0 ? num : 0;
            };
        }
    },
    watch: {
        details: {
            handler(nval) {
                this.taskInfo = nval;
                console.log(this.taskInfo, "this.taskInfo=====");
                this.kinds = nval.testType;
                if (this.kinds !== "3") {
                    this.list = nval.invTwrVOList;
                } else {
                    this.list = nval.jckyZones;
                }
                let activeID = "";
                this.listShow.forEach((item) => {
                    if (item.show) {
                        activeID = item.id || item.psrId;
                    }
                });
                this.listShow = JSON.parse(
                    JSON.stringify(
                        this.list.map((item, index) => {
                            item.twrSort = index;
                            item.id = item.id || item.psrId;
                            if (item.id == activeID || item.psrId == activeID) {
                                item.show = true;
                            }
                            return item;
                        })
                    )
                );
            },
            deep: true
        }
    },
    created() {},
    methods: {
        //跳转巡视
        xs(item) {
            if (this.details.itemState == "3") {
                this.$u.toast("任务已完成，无法操作");
                return;
            }
            console.log(item, "item", this.details);
            uni.navigateTo({
                url:
                    "pages/task/map/collection?taskItemId=" +
                    this.taskInfo.id +
                    "&xslx=" +
                    this.details.insType +
                    "&orgId=" +
                    this.details.orgId +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(item))
            });
        },
        //跳转检测
        check(item) {
            if (this.type == 0) {
                uni.navigateTo({
                    url:
                        "pages/task/testing/kindsList?info=" +
                        encodeURIComponent(JSON.stringify(item)) +
                        "&taskItemId=" +
                        this.taskInfo.id
                });
            } else if (this.type == 1) {
                console.log(item, "检测item", this.details);
                let kinds = kindsArr[Number(this.details.testType) - 1];
                uni.navigateTo({
                    url:
                        "pages/task/testing/addTesting?kinds=" +
                        kinds +
                        "&taskItemId=" +
                        this.taskInfo.id +
                        "&orgId=" +
                        this.details.orgId +
                        "&info=" +
                        encodeURIComponent(JSON.stringify(item)) +
                        "&taskType=1" +
                        "&type=" +
                        (this.isComplete(this.type, item) ? "details" : "add")
                });
            }
        },
        //跳转检修
        overhaul(item) {
            uni.navigateTo({
                url:
                    "pages/task/overhaul/taskList?taskHaulItemId=" +
                    this.details.id +
                    "&twrId=" +
                    item.id
            });
        },
        //跳转纠正
        correct(item) {
            console.log(item, "item");
            if (this.details.itemState == "3") {
                this.$u.toast("任务已完成，无法操作");
                return;
            }
            uni.navigateTo({
                url:
                    "pages/task/map/correct?info=" +
                    encodeURIComponent(JSON.stringify(item))
            });
        },
        //跳转隐患
        yh(item = { id: "" }) {
            uni.navigateTo({
                url: "pages/task/hiddenDanger/index?twrId=" + item.id
            });
        },
        //跳转缺陷
        qx(item = { id: "" }) {
            uni.navigateTo({
                url: "pages/task/defect/index?twrId=" + item.id
            });
        },
        //跳转地图
        map(item) {
            console.log(item, "item");
            this.$emit("changActive", {
                index: 0,
                center: [item.lng, item.lat]
            });
        },
        //搜索
        searchChange(e) {
            this.debounce(() => {
                this.listShow = this.list.filter((item) => {
                    return item.name.indexOf(e) > -1;
                });
            });
        },
        //防抖
        debounce(func, wait = 500) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                func();
            }, wait);
        },
        toPath(item, index) {
            this.listShow.forEach((v, k) => {
                if (k == index) {
                    v.show = !item.show;
                } else {
                    v.show = false;
                }
            });
            this.$set(this.listShow, index, item);
        },
        //改变列表排序
        changeSort() {
            if (this.sortType == 0) {
                this.listShow = this.list.sort((a, b) => {
                    return b.twrSort - a.twrSort;
                });
                this.sortType = 1;
            } else {
                this.listShow = this.list.sort((a, b) => {
                    return a.twrSort - b.twrSort;
                });
                this.sortType = 0;
            }
        },
        //检测-跳转详情
        toDetails() {
            if (this.type == 1) {
                console.log("走着了");
                uni.navigateTo({
                    url:
                        "pages/task/testing/details?info=" +
                        encodeURIComponent(JSON.stringify(this.details))
                });
            } else if (this.type == 2) {
                uni.navigateTo({
                    url:
                        "pages/task/overhaul/details?details=" +
                        encodeURIComponent(JSON.stringify(this.details))
                });
            }
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
</style>

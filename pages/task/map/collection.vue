<template>
    <view>
        <custom-navbar :title="(taskType==0&&'采集')||(taskType==2&&'现场勘察')" iconLeft></custom-navbar>
        <template v-if="taskType==0">
            <u-sticky bg-color="#DDE4F2">
                <view class="flex-around action-group">
                    <view class="flex btn-item bg-green" @click="toJZ">
                        <img src="../../../static/common/ic_jz_sm.png" alt="">
                        <text class="m-l-8">纠正</text>
                    </view>
                    <view class="flex btn-item bg-blue" @click="toJC">
                        <img src="../../../static/common/ic_jc_sm.png" alt="">
                        <text class="m-l-8">检测</text>
                    </view>
                    <view class="flex btn-item bg-red" @click="toQX">
                        <img src="../../../static/common/ic_qx_sm.png" alt="">
                        <text class="m-l-8">缺陷</text>
                    </view>
                    <view class="flex btn-item bg-yellow" @click="toYH">
                        <img src="../../../static/common/ic_yh_sm.png" alt="">
                        <text class="m-l-8">隐患</text>
                    </view>
                </view>
            </u-sticky>
        </template>

        <view class="container collection">
            <view class="title">基础信息</view>
            <view class="li flex-between">
                <view class="li-title">线路</view>
                <view class="li-right-title">{{info.lineName}}</view>
            </view>
            <view class="li flex-between">
                <view class="li-title">杆塔</view>
                <view class="li-right-title">{{info.twrCode||info.name}}</view>
            </view>
            <template v-if="taskType==0">
                <view class="flex p-16">
                    <view @click="qx">缺陷：<text class="red-text">{{defTroNum(info.defs)}}条</text></view>
                    <view class="m-l-16" @click="yh">隐患：<text class="orange-text">{{defTroNum(info.troExts+info.troTrees)}}条</text></view>
                </view>
            </template>
        </view>
        <!-- 签到 -->
        <!-- <template v-if="taskType==0"> -->
        <SignIn ref="SignIn" :position="towerPotision" :taskItemId="taskItemId" :twrGzrwdId="twrGzrwdId" :info="info" :TaskNotesVOs="TaskNotesVOs" :taskType="taskType" @signChange="signChange" />
        <!-- </template> -->
        <!-- 巡视图片 -->
        <template>
            <view v-show="taskType==2||isSign>1" class="m-t-32">
                <PhotoForm ref="PhotoForm" :taskItemId="taskItemId" :xslx="xslx" :info="info" :TaskNotesVOs="TaskNotesVOs" :taskType="taskType" />
            </view>
        </template>
    </view>
</template>

<script>
import { findTwrsByItemIdH5 } from "@/api/task/index";
import { taskhaulitemGetkcxsys } from "@/api/overhaul";
import SignIn from "./components/SignIn";
import PhotoForm from "./components/PhotoForm";
export default {
    components: {
        SignIn,
        PhotoForm
    },
    data() {
        return {
            xslx: "",
            orgId: "",
            twrGzrwdId: "", //检修id
            state: "", //检修中任务状态1未开始 2进行中 3待验收 4已完成
            taskType: 0, //0巡视 1检测 2检修 3验收
            info: {},
            TaskNotesVOs: [],
            towerPotision: [],
            isSign: 0, //0未签到 1失败 2成功 3手动签到成功
            taskItemId: "" //子任务id
        };
    },
    computed: {
        defTroNum() {
            return (num) => {
                return num > 0 ? num : 0;
            };
        }
    },
    onLoad(options) {
        this.taskType = options.taskType || 0;
        this.xslx = options.xslx || "";
        this.orgId = options.orgId;
        this.info = options.info
            ? JSON.parse(decodeURIComponent(options.info))
            : {};
        console.log(this.info, "info112");
        this.towerPotision = [this.info.lng, this.info.lat];
        this.taskItemId = options.taskItemId;
        console.log(this.taskItemId, "this.taskItemId");
        this.state = options.state || "";
        this.twrGzrwdId = options.twrGzrwdId || "";
    },
    onShow() {
        if (this.taskType == 0) {
            this._findTwrsByItemIdH5();
        } else if (this.taskType == 2) {
            this._taskhaulitemGetkcxsys();
        }
    },
    methods: {
        //跳转纠正
        toJZ() {
            uni.navigateTo({
                url:
                    "pages/task/map/correct?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        },
        //跳转检测
        toJC() {
            uni.navigateTo({
                url:
                    "pages/task/testing/chooseType?taskItemId=" +
                    this.taskItemId +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(this.info)) +
                    "&orgId=" +
                    this.orgId
            });
        },
        //跳转缺陷
        toQX() {
            uni.navigateTo({
                url:
                    "pages/task/defect/defect-add?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        },
        //跳转隐患
        toYH() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/addDanger?info=" +
                    encodeURIComponent(JSON.stringify(this.info))
            });
        },
        //获取巡视详情
        _findTwrsByItemIdH5() {
            console.log("开始调了");
            let params = {
                taskItemId: this.taskItemId,
                twrId: this.info.id
            };
            findTwrsByItemIdH5(params)
                .then((res) => {
                    console.log(res, "巡视详情（杆塔）");
                    this.TaskNotesVOs = res.data.data.TaskNotesVOs;
                    // this.info = this.TaskNotesVOs[0].invTwr;
                })
                .catch((err) => {
                    this.TaskNotesVOs = null;
                });
        },
        //现场勘察详情
        _taskhaulitemGetkcxsys() {
            let params = {
                index: 1, //1勘测 2修试 3验收
                twrGzrwdId: this.twrGzrwdId
            };
            console.log(params, "params");
            taskhaulitemGetkcxsys(params)
                .then((res) => {
                    console.log(res, "检修-勘察详情");
                    // this.TaskNotesVOs = res.data.data.TYjDwyjXckcjlbVO;
                    if (res.data.data.TYjDwyjXckcjlbVO) {
                        this.TaskNotesVOs = res.data.data.TYjDwyjXckcjlbVO;
                    } else {
                        this.TaskNotesVOs = [res.data.data];
                    }
                    console.log(this.TaskNotesVOs, "this.TaskNotesVOs");
                })
                .catch(() => {
                    this.TaskNotesVOs = null;
                });
        },
        //签到状态改变
        signChange(num) {
            this.isSign = num;
        },
        //跳转隐患
        yh() {
            uni.navigateTo({
                url: "pages/task/hiddenDanger/index?twrId=" + this.info.id
            });
        },
        //跳转缺陷
        qx() {
            uni.navigateTo({
                url: "pages/task/defect/index?twrId=" + this.info.id
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.collection {
    margin-top: 8rpx;
    padding-bottom: 16rpx;
    .title {
        font-size: 28rpx;
        font-weight: 700;
        color: #30495e;
        line-height: 40rpx;
    }
    .li {
        padding: 16rpx 0;
        border-bottom: 1px solid $line-gray;
        &:last-child {
            border-bottom: none;
        }
        .li-title {
            font-size: 24rpx;
            color: #30495e;
            line-height: 34rpx;
        }
        .li-right-title {
            font-size: 24rpx;
            font-weight: 500;
            color: #30495e;
            line-height: 34rpx;
        }
    }
}
.action-group {
    padding: 4rpx 16rpx;
    background: #dde4f2;
    // margin-top: -2px;
    padding-bottom: 24rpx;
}

.btn-item {
    width: 160rpx;
    padding: 16rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    img {
        width: 36rpx;
    }
}
.bg-green {
    background-color: #00be26;
}
.bg-blue {
    background-color: #0091ff;
}
.bg-red {
    background-color: #f75f49;
}
.bg-yellow {
    background-color: #f7b500;
}
</style>

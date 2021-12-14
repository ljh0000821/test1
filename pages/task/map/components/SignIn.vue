<template>
    <view>
        <template v-if="isSign==-1">
            <view class="container flex-center sign red-text">！自动签到失败</view>
        </template>
        <template v-if="isSign==0">
            <view class="container flex-center sign">自动签到中...</view>
        </template>
        <template v-if="isSign==2">
            <view class="container sign">
                <view class="flex-between">
                    <view class="auto-sign">自动签到成功</view>
                    <view class="time">{{signInfo.updateTime}}</view>
                    <view class="around">签到范围：500m</view>
                </view>
            </view>
        </template>
        <template v-if="isSign==1||isSign==1.5">
            <view class="container sign">
                <view class="flex-between">
                    <view>
                        <view class="red-text">!自动签到失败</view>
                        <view><text class="gray-text">失败原因：</text><text class="red-text">{{isSign==1?'杆塔距离较远':'定位失败'}}</text></view>
                    </view>
                    <view class="around">签到范围：500m</view>
                </view>
                <view class="manual-btn flex-center" @click="toCheckIn">
                    <img src="@/static/common/ic_hand.png" alt="">
                    <text class="m-l-8">手动签到</text>
                </view>
            </view>
        </template>
        <template v-if="isSign==3">
            <view class="container sign">
                <view class="flex">
                    <view class="auto-sign">√已手动签到</view>
                    <view class="m-l-32">{{signInfo.updateTime}}</view>
                </view>
                <view class="flex1 flex-between m-t-8">
                    <view><text class="gray-text">手动签到方式：</text><text class="gray-text">{{signInfo.type}}</text></view>
                    <template v-if="signInfo.signPer==0">
                        <view class="view-btn" @click="previewImg">
                            <text class="m-l-8">查看图片</text>
                        </view>
                    </template>
                    <template v-if="signInfo.signPer==1">
                        <view>
                            扫描结果：<text class="green-text">{{signInfo.signCon}}</text>
                        </view>
                    </template>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
import { getLocation } from "@/utils/igwFn";
import { GetDistance } from "@/utils/tools";
import { getStore } from "@/utils/store.js";
import { tasknotesSubmit, tasksignSubmit } from "@/api/task/index";
import { tyjdwyjxckcjlbSubmit } from "@/api/overhaul";
import { BASE_IMG_URL } from "@/common/website";
export default {
    props: {
        position: {
            type: Array,
            default: () => []
        },
        TaskNotesVOs: {
            type: Array,
            default: () => []
        },
        taskItemId: {
            type: String,
            default: ""
        },
        info: {
            type: Object,
            default: () => {}
        },
        taskType: {
            // type: String,
            default: "0"
        },
        twrGzrwdId: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            TaskNotesVOsClone: [],
            isSign: 0, //0未签到 1失败 2成功 3手动签到成功
            signInfo: {} //签到信息
        };
    },
    watch: {
        TaskNotesVOs: {
            handler(nval) {
                console.log(nval, "TaskNotesVOs66666");
                if (nval == null) {
                    this.isSign = -1;
                    return;
                }
                if (nval.length == 0) {
                    console.log("0条");
                    //如果没有TaskNotesVOs就新建一条
                    if (this.taskType == 0) {
                        this._tasknotesSubmit();
                    } else if (this.taskType == 2) {
                        this._tyjdwyjxckcjlbSubmit();
                    }
                    return;
                } else {
                    // if (this.taskType == 2) {
                    //     //这是改的假的状态，需要弄要喊接口改勘察的签到
                    //     console.log("改假装");
                    //     this.isSign = -1;
                    //     return;
                    // }
                    // 改变签到状态
                    if (nval[0].isSign == 1) {
                        this.isSign = nval[0].taskSignVO.type == 0 ? 2 : 3;
                        this.$emit("signChange", this.isSign);
                        let imgArr = [];
                        nval[0].taskSignVO.signPics.forEach((item) => {
                            imgArr.push(
                                BASE_IMG_URL +
                                    "?fileName=" +
                                    +new Date() +
                                    "&picId=" +
                                    item.picId
                            );
                        });
                        this.signInfo = {
                            imgUrls: imgArr,
                            updateTime: nval[0].taskSignVO.updateTime,
                            type:
                                nval[0].taskSignVO.signPer == 0
                                    ? "拍照"
                                    : "扫描",
                            signPer: nval[0].taskSignVO.signPer,
                            signCon: nval[0].taskSignVO.signCon
                        };
                        console.log(this.signInfo, "this.signInfo");
                    }
                    // 有记录
                    this.TaskNotesVOsClone = nval;
                    //如果没签到则进行自动签到
                    if (nval[0].isSign != 1) {
                        this.automaticCheckIn();
                    }
                }
            },
            deep: true
        }
    },
    mounted() {},
    methods: {
        //检修创建
        _tyjdwyjxckcjlbSubmit() {
            // this.isSign = -1; //这是假的，勘察的签到接口还没弄，目前就先定为未签到，但可以进行拍照提交
            console.log("进入这里了");
            let params = {
                taskId: this.info.taskHaulId,
                taskItemId: this.info.taskHaulItemId,
                twrGzrwdId: this.twrGzrwdId, //杆塔子任务单ID
                twrId: this.info.twrId, //杆塔id
                lineId: this.info.lineId,
                lineName: this.info.lineName
            };
            console.log(params, "params");
            tyjdwyjxckcjlbSubmit(params).then((res) => {
                console.log(res, "检修返回值");
                this.TaskNotesVOsClone = [
                    {
                        objId: res.data.data
                    }
                ];
                this.automaticCheckIn();
            });
        },
        //巡视创建tasknotes
        _tasknotesSubmit() {
            let usrInfo = getStore("userInfo");
            let params = {
                // taskId: "",
                taskItemId: this.taskItemId,
                twrId: this.info.id,
                // twrCode: "",
                taskUser: usrInfo.user_id
            };
            console.log(params, "params");
            tasknotesSubmit(params).then((res) => {
                console.log(res, "创建tasknotes回调");
                this.TaskNotesVOsClone = [
                    {
                        id: res.data.data
                    }
                ];
                this.automaticCheckIn();
            });
        },
        //自动签到
        automaticCheckIn() {
            setTimeout(() => {
                this.isSign = 1.5;
            }, 8000);
            console.log("开始自动签到");
            //杆塔坐标
            let towerPosition = this.position;
            console.log(towerPosition, "towerPosition");
            // if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
            //     this.isSign = 1.5;
            //     return;
            // }
            //获取定位
            getLocation()
                .then((res) => {
                    console.log(res, "获取到的定位6666666666666666666");
                    let myPosition = res.position;
                    let distance = GetDistance(towerPosition, myPosition);
                    console.log(distance, "distance");
                    //如果在签到范围内
                    if (distance <= 1) {
                        this._tasksignSubmit()
                            .then(() => {
                                this.isSign = 2;
                                this.$emit("signChange", 2);
                            })
                            .catch((err) => {
                                this.isSign = 1.5;
                                console.log("获取定位失败了1");
                            });
                    } else {
                        this.isSign = 1;
                        this.$emit("signChange", 1);
                    }
                })
                .catch((err) => {
                    this.isSign = 1.5;
                    console.log("获取定位失败了2");
                });
        },
        //跳转手动签到
        toCheckIn() {
            let baseParams = {
                // ntId: this.TaskNotesVOsClone[0].id, //任务记录id
                taskItemId: this.taskItemId
                // twrId: this.info.id
            };
            if (this.taskType == 0) {
                baseParams.ntId = this.TaskNotesVOsClone[0].id;
                baseParams.twrId = this.info.id;
            } else if (this.taskType == 2) {
                baseParams.ntId = this.TaskNotesVOsClone[0].objId;
                baseParams.twrId = this.info.twrId;
            }
            console.log(baseParams, "baseParams");
            uni.navigateTo({
                url:
                    "pages/task/map/checkIn?baseParams=" +
                    encodeURIComponent(JSON.stringify(baseParams)) +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(this.info)) +
                    "&TaskNotesVOs=" +
                    encodeURIComponent(JSON.stringify(this.TaskNotesVOs))
            });
        },
        _tasksignSubmit(options = {}) {
            let params = {
                // ntId: this.TaskNotesVOsClone[0].id, //任务记录id
                taskItemId: this.taskItemId,
                twrId: this.info.id,
                type: options.type || 0, //0自动 1人工
                signPer: options.signPer, //人工签到方式0拍照，1扫描
                signPic: options.signPic, //签到文件id
                signRes: options.signRes //人工签到原因
            };
            if (this.taskType == 0) {
                params.ntId = this.TaskNotesVOsClone[0].id;
            } else if (this.taskType == 2) {
                params.ntId = this.TaskNotesVOsClone[0].objId;
            }
            return new Promise((resove, reject) => {
                tasksignSubmit(params)
                    .then(() => {
                        resove();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        //预览图片
        previewImg() {
            console.log("查看图片", this.signInfo);
            uni.previewImage({
                urls: this.signInfo.imgUrls
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sign {
    line-height: 34rpx;
    padding-bottom: 20rpx;
    align-items: center;
    margin-top: 32rpx;
    .auto-sign {
        font-size: 24rpx;
        color: #00be26;
    }
    .time {
        font-size: 24rpx;
        color: #30495e;
    }
    .around {
        font-size: 20rpx;
        color: #30495e;
        line-height: 28rpx;
    }
}
.manual-btn {
    color: #fff;
    background-color: $base-green;
    width: 200rpx;
    text-align: center;
    border-radius: 24rpx;
    padding: 10rpx;
    margin: 0 auto;
    margin-top: 24rpx;
    img {
        height: 30rpx;
    }
}
.view-btn {
    color: #fff;
    background-color: $base-green;
    width: 160rpx;
    text-align: center;
    border-radius: 24rpx;
    padding: 8rpx;
    font-size: 20rpx;
}
</style>
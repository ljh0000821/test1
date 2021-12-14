<template>
    <view>
        <custom-navbar title="手动签到" iconLeft></custom-navbar>
        <view class="container flex-between">
            <text class="reason-title">手动签到原因：</text>
            <efItem :data="reasonData" v-model="signResName" :modelId.sync="signRes" type="select" name="dictValue" id="dictKey" />
        </view>
        <view class="container" style="margin-top:24rpx;">
            <view>签到</view>
            <view class="flex-around action-group">
                <view class="action-box" @click="scan">
                    <img src="../../../static/common/ic_scan_big.png" alt="">
                    <text>扫描二维码</text>
                </view>
                <view class="action-box" @click="getPic">
                    <img src="../../../static/common/ic_photo_big.png" alt="">
                    <text>拍照证明</text>
                </view>
            </view>
            <view class="signCon-group" v-if="signCon">
                扫描结果:<text class="green-text">{{signCon}}</text>
            </view>
            <view>
                <chooseImage ref="chooseImage" type="none" waterMark :waterMarkText="waterMarkText" :sourceType="['camera']" @change="picChange" picType="1" />
            </view>
        </view>
        <u-button class="btn" type="primary" ripple :loading="loading" :disabled="sureDisabled" @click="signSure">完成</u-button>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import chooseImage from "@/components/choose-image/choose-image";
import { getLocation } from "@/utils/igwFn";
import { getNowTime } from "@/utils/tools";
import { tasksignSubmit } from "@/api/task/index";
export default {
    components: {
        efItem,
        chooseImage
    },
    data() {
        return {
            info: {},
            TaskNotesVOs: [],
            myPosition: [],
            loading: false,
            baseParams: {},
            signResName: "",
            signRes: "",
            reasonData: [],
            picArr: [],
            disabled: true,
            signCon: "" //签到说明
        };
    },
    computed: {
        sureDisabled() {
            if (this.signRes && (this.picArr.length > 0 || this.signCon)) {
                return false;
            } else {
                return true;
            }
        },
        waterMarkText() {
            console.log(this.info, "info");
            let obj = {
                lineName: this.info.lineName,
                towerName: this.info.name,
                position: this.myPosition,
                towerPosition: [this.info.lng, this.info.lat],
                bw: "", //部位
                voltageLevelName:
                    this.TaskNotesVOs.length > 0 &&
                    this.TaskNotesVOs[0]?.tdmSbTower.voltageLevelName //电压等级
            };
            return obj;
            // return `${this.info.lineName} ${this.info.name}\nE:${this.myPosition[0]}\nN:${this.myPosition[1]}\n`;
        }
    },
    onLoad(options) {
        this._getLocation();
        this.baseParams = JSON.parse(
            decodeURIComponent(options.baseParams || {})
        );
        this.info = JSON.parse(decodeURIComponent(options.info || {}));
        console.log(this.info, "info");
        this.TaskNotesVOs = JSON.parse(
            decodeURIComponent(options.TaskNotesVOs || {})
        );
        console.log(this.TaskNotesVOs, "TaskNotesVOs");
    },
    mounted() {
        this._getReason();
    },
    methods: {
        //获取签到原因
        _getReason() {
            this.$store.dispatch("getList", "sign_reason").then((res) => {
                this.reasonData = res;
            });
        },
        //拍照签到
        getPic() {
            this.$refs.chooseImage.getCamera();
        },
        //图片改变
        picChange(data) {
            this.picArr = data;
        },
        //签到
        async signSure() {
            if (!this.signRes) {
                this.$u.toast("请选择签到原因");
                return;
            }
            if (this.picArr.length == 0 && !this.signCon) {
                this.$u.toast("请扫描二维码签到或上传签到证明");
                return;
            }
            this.loading = true;
            let _self = this;
            let waterMark = {
                lineName: this.info.lineName,
                towerName: this.info.name,
                position: this.myPosition,
                towerPosition: [this.info.lng, this.info.lat],
                bw: "", //部位
                voltageLevelName:
                    _self.TaskNotesVOs.length > 0 &&
                    _self.TaskNotesVOs[0]?.tdmSbTower.voltageLevelName //电压等级
            };
            let waterMarkParams = {
                picName: "签到",
                posPic:100,
                longitude: waterMark.position[0],
                latitude: waterMark.position[1],
                timeNow: getNowTime()
            };
            let params = {
                ...this.baseParams,
                type: 1, //0自动 1人工
                signPer: this.signCon ? 1 : 0, //人工签到方式0拍照，1扫描
                signPic: await this.$refs.chooseImage.getIds(waterMarkParams), //签到文件id
                signRes: this.signRes, //人工签到原因
                signCon: this.signCon
            };
            tasksignSubmit(params)
                .then(() => {
                    this.$u.toast("签到成功");
                    this.loading = false;
                    this.$goBack();
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        //扫描二维码
        scan() {
            let _self = this;
            wx.scanQRCode({
                desc: "scanQRCode desc",
                needResult: 1, // 默认为0，扫描结果由i国网处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    console.log(res, "扫描成功回调");
                    _self.signCon = res.resultStr;
                },
                error: function (res) {
                    if (res.errMsg.indexOf("function_not_exist") > 0) {
                        alert("版本过低请升级");
                    }
                }
            });
        },
        //获取定位
        _getLocation() {
            getLocation().then((res) => {
                this.myPosition = res.position;
                console.log(this.myPosition, "this.myPosition");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.reason-title {
    width: 300rpx;
}
.action-group {
    margin: 32rpx 0;
}
.action-box {
    width: 240rpx;
    height: 180rpx;
    background-color: $base-green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 24rpx;
    color: #fff;
    img {
        width: 80rpx;
        height: 80rpx;
    }
}
.btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
.signCon-group {
    width: 70%;
    margin: 0 auto;
    text-align: center;
}
</style>

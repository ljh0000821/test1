<template>
    <view class="container sign_pross">
        <view class="flex-between">
            <view class="align-center">
                <img class="title-icon" src="@/static/common/afe_def_detail_photo.png" alt="">
                <text>拍照</text>
            </view>
            <view v-if="xslx==1" class="detail">每个部位至少<text>1</text>张</view>
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>杆号牌</view>
            <chooseImage ref="ghp" autoUpload :idsParamsAll="idsParamsAll('ghp')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.ghp" :images="imgGroup.ghp" customPreview @previewImg="(data)=>previewImg(data,'杆号牌')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>全塔</view>
            <chooseImage ref="qt" autoUpload :idsParamsAll="idsParamsAll('qt')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.qt" :images="imgGroup.qt" customPreview @previewImg="(data)=>previewImg(data,'全塔')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>塔头</view>
            <chooseImage ref="tt" autoUpload :idsParamsAll="idsParamsAll('tt')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.tt" :images="imgGroup.tt" customPreview @previewImg="(data)=>previewImg(data,'塔头')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>基础全景</view>
            <chooseImage ref="jcqj" autoUpload :idsParamsAll="idsParamsAll('jcqj')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.jcqj" :images="imgGroup.jcqj" customPreview @previewImg="(data)=>previewImg(data,'基础全景')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>警示牌</view>
            <chooseImage ref="jsp" autoUpload :idsParamsAll="idsParamsAll('jsp')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.jsp" :images="imgGroup.jsp" customPreview @previewImg="(data)=>previewImg(data,'警示牌')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>A塔腿</view>
            <chooseImage ref="att" autoUpload :idsParamsAll="idsParamsAll('att')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.att" :images="imgGroup.att" customPreview @previewImg="(data)=>previewImg(data,'A塔腿')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>B塔腿</view>
            <chooseImage ref="btt" autoUpload :idsParamsAll="idsParamsAll('btt')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.btt" :images="imgGroup.btt" customPreview @previewImg="(data)=>previewImg(data,'B塔腿')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>C塔腿</view>
            <chooseImage ref="ctt" autoUpload :idsParamsAll="idsParamsAll('ctt')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.ctt" :images="imgGroup.ctt" customPreview @previewImg="(data)=>previewImg(data,'C塔腿')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>D塔腿</view>
            <chooseImage ref="dtt" autoUpload :idsParamsAll="idsParamsAll('dtt')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.dtt" :images="imgGroup.dtt" customPreview @previewImg="(data)=>previewImg(data,'D塔腿')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>大号侧通道</view>
            <chooseImage ref="dhctd" autoUpload :idsParamsAll="idsParamsAll('dhctd')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.dhctd" :images="imgGroup.dhctd" customPreview @previewImg="(data)=>previewImg(data,'大号侧通道')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>小号侧通道</view>
            <chooseImage ref="xhctd" autoUpload :idsParamsAll="idsParamsAll('xhctd')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.xhctd" :images="imgGroup.xhctd" customPreview @previewImg="(data)=>previewImg(data,'小号侧通道')" />
        </view>
        <view class="li">
            <view class="text m-b-16"><span class="ditso"></span>附属设施：可视化装置</view>
            <chooseImage ref="kshzz" autoUpload :idsParamsAll="idsParamsAll('kshzz')" icon="camera" :sourceType="['album', 'camera']" picType="1" waterMark :waterMarkText="waterMarkText" :picArr.sync="imgForm.kshzz" :images="imgGroup.kshzz" customPreview @previewImg="(data)=>previewImg(data,'附属设施：可视化装置')" />
        </view>
        <template>
            <u-button class="going" type="primary" :loading="loading" ripple @click="formSure">完成</u-button>
        </template>
        <ImgPreview ref="ImgPreview" />
    </view>
</template>

<script>
let posPicArr = [
    "ghp",
    "qt",
    "tt",
    "jcqj",
    "jsp",
    "att",
    "btt",
    "ctt",
    "dtt",
    "dhctd",
    "xhctd",
    "kshzz"
];
let posPicEnum = {
    ghp: "杆号牌",
    qt: "全塔",
    tt: "塔头",
    jcqj: "基础全景",
    jsp: "警示牌",
    att: "A塔腿",
    btt: "B塔腿",
    ctt: "C塔腿",
    dtt: "D塔腿",
    dhctd: "大号侧通道",
    xhctd: "小号侧通道",
    kshzz: "附属设施：可视化装置"
};
import chooseImage from "@/components/choose-image/choose-image";
import ImgPreview from "./ImgPreview.vue";
import { getLocation } from "@/utils/igwFn";
import { tasknotesSubmit } from "@/api/task/index";
export default {
    components: {
        chooseImage,
        ImgPreview
    },
    props: {
        taskItemId: {
            type: String,
            default: ""
        },
        info: {
            type: Object,
            default: () => {}
        },
        TaskNotesVOs: {
            type: Array,
            default: () => []
        },
        taskType: {},
        xslx: {}
    },
    data() {
        return {
            posPicEnum,
            myPosition: [],
            type: "add",
            loading: false,
            imgGroup: {}, //按照拍摄部位分类的图片
            imgForm: {},
            idsParams: {}
        };
    },
    computed: {
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
        },
        idsParamsAll() {
            return (key) => {
                let params = JSON.parse(JSON.stringify(this.idsParams));
                params.posPic = posPicArr.indexOf(key) + 1;
                params.bw = this.posPicEnum[key];
                return params;
            };
        }
    },
    watch: {
        // taskType: {
        //     nval: {
        //         handler(nval) {
        //             console.log(nval, "taskType00000000000");
        //             if (nval == 0) {
        //                 this.idsParams = {
        //                     taskItemId: this.taskItemId,
        //                     twrId: this.info.id,
        //                     taskNotesId: this.TaskNotesVOs[0].id
        //                 };
        //             }
        //             if (nval == 2) {
        //                 this.idsParams = {
        //                     taskItemId: this.info.taskHaulItemId,
        //                     twrId: this.info.twrId,
        //                     taskNotesId: this.TaskNotesVOs[0].objId
        //                 };
        //             }
        //         },
        //         immediate: true,
        //         deep: true
        //     }
        // },
        TaskNotesVOs: {
            handler(nval) {
                console.log(nval, "TaskNotesVOs000000000000000");
                this.setTdsParams();
                let imgGroupClone = {};
                posPicArr.forEach((item) => {
                    imgGroupClone[item] = [];
                });
                this.imgGroup = imgGroupClone;
                console.log(nval, "nval照片");
                if (nval.length == 0) return;
                let listItem = [];
                if (this.taskType == 0) {
                    listItem = nval[0].taskPicVOList;
                } else if (this.taskType == 2) {
                    listItem = nval[0].taskPics;
                }
                if (listItem.length > 0) {
                    let taskPicVOList = listItem;
                    this.type = "details";
                    taskPicVOList.forEach((item) => {
                        if (item.posPic) {
                            this.imgGroup[posPicArr[item.posPic - 1]] &&
                                this.imgGroup[posPicArr[item.posPic - 1]].push(
                                    item
                                );
                        }
                    });
                }
            },
            deep: true
        }
    },
    created() {
        this._getLocation();
    },
    methods: {
        setTdsParams() {
            if (this.taskType == 0) {
                this.idsParams = {
                    taskItemId: this.taskItemId,
                    twrId: this.info.id,
                    taskNotesId: this.TaskNotesVOs[0].id
                };
            }
            if (this.taskType == 2) {
                this.idsParams = {
                    taskItemId: this.info.taskHaulItemId,
                    twrId: this.info.twrId,
                    taskNotesId: this.TaskNotesVOs[0].objId
                };
            }
        },
        async formSure() {
            if (this.xslx == 1) {
                let picFull = true;
                for (let item in this.imgForm) {
                    if (this.imgForm[item].length == 0) {
                        picFull = false;
                        break;
                    }
                }
                if (!picFull || Object.keys(this.imgForm).length != 12) {
                    this.$u.toast("每个部位至少拍摄一张照片");
                    return;
                }
            }
            // else {
            // let picEmpty = true;
            // for (let item in this.imgForm) {
            //     if (this.imgForm[item].length > 0) {
            //         picEmpty = false;
            //         break;
            //     }
            // }
            // if (picEmpty) {
            //     console.log(this.info, "为空可以拉去接口");
            this.loading = true;
            let params = {
                id: this.TaskNotesVOs.length > 0 ? this.TaskNotesVOs[0].id : "",
                twrId: this.info.id,
                state: 2,
                taskItemId: this.taskItemId
            };
            tasknotesSubmit(params)
                .then(() => {
                    this.loading = false;
                    this.$u.toast("已完成");
                    setTimeout(() => {
                        this.$goBack(1, true);
                    }, 500);
                })
                .catch((err) => {
                    this.loading = false;
                });
            //     return;
            // }
            // }
            // this.loading = true;
            // try {
            // let params = {};
            // if (this.taskType == 0) {
            //     params = {
            //         taskItemId: this.taskItemId,
            //         twrId: this.info.id,
            //         taskNotesId: this.TaskNotesVOs[0].id
            //     };
            // } else if (this.taskType == 2) {
            //     console.log(this.info, "info");
            //     params = {
            //         taskItemId: this.info.taskHaulItemId,
            //         twrId: this.info.twrId,
            //         taskNotesId: this.TaskNotesVOs[0].objId
            //     };
            // }
            // console.log(this.imgForm, "this.imgForm");
            // this.$u.toast("资源上传中，请稍后");
            // let keysArr = Object.getOwnPropertyNames(this.imgForm);
            // for (let key of keysArr) {
            //     let index = posPicArr.indexOf(key);
            //     let paramsItem = JSON.parse(JSON.stringify(params));
            //     if (index != -1) {
            //         console.log(key, "=================");
            //         paramsItem.posPic = posPicArr.indexOf(key) + 1;
            //         console.log(paramsItem, "paramsItem");
            //         let keyIds = key + "Ids";
            //         console.log(key, "key");
            //         keyIds = await this.$refs[key].getIds(paramsItem);
            //         console.log(keyIds, "Ids");
            //     }
            // }
            //
            // Object.getOwnPropertyNames(this.imgForm).forEach(
            //     async (key) => {
            //         let index = posPicArr.indexOf(key);
            //         let paramsItem = JSON.parse(JSON.stringify(params));
            //         if (index != -1) {
            //             console.log(key, "=================");
            //             paramsItem.posPic = posPicArr.indexOf(key) + 1;
            //             console.log(paramsItem, "paramsItem");
            //             let keyIds = key + "Ids";
            //             console.log(key, "key");
            //             keyIds = await this.$refs[key].getIds(paramsItem);
            //             console.log(keyIds, "Ids");
            //         }
            //     }
            // );
            // this.loading = false;
            // this.$u.toast("已完成");
            // setTimeout(() => {
            //     this.$goBack(1, true);
            // }, 500);
            // } catch (e) {
            //     this.loading = false;
            // }
        },
        //预览图片
        previewImg(data, position) {
            console.log(data.url, "预览的图片信息");
            this.$refs.ImgPreview.open({
                data: data,
                info: this.info,
                position: position
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
.sign_pross {
    margin-top: 32rpx;
    font-size: 28rpx;
    color: #30495e;
    padding-bottom: 60rpx;
    .detail {
        font-size: 20rpx;
        color: #30495e;
        line-height: 44rpx;
        text {
            color: #05b2cc;
            margin: 0 5rpx;
        }
    }
    .li {
        margin-top: 26rpx;
        border-bottom: 1px solid $line-gray;
        padding-bottom: 50rpx;
        .ditso {
            display: inline-block;
            vertical-align: super;
            width: 6rpx;
            height: 6rpx;
            border-radius: 50%;
            background-color: #30495e;
            margin-right: 4rpx;
        }
        .text {
            font-size: 24rpx;
            color: #30495e;
            line-height: 34rpx;
        }
        .list_img_li {
            width: 136rpx;
            height: 136rpx;
            border: 1px solid #7b909d;
            border-radius: 12px;
            margin-top: 12rpx;
        }
    }
}
.going {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
</style>
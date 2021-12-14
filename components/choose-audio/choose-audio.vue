<template>
    <view class="jsfun-record">
        <slot></slot>
        <view class="flex">
            <template v-if="srcList.length>0">
                <view class="src-box">
                    <view class="radio-box m-r-24 m-b-16" v-for="(item,index) in srcList" :key="item.url">
                        <u-image v-if="type==='add'||type==='edit'" class="del-btn" width="30rpx" height="30rpx" src="../../static/common/btn_photo_del.png" @click="delRecord(index,item)"></u-image>
                        <view class="flex1 flex-start" @click="playVoice(item)">
                            <view class="flex-center">
                                <ef-horn :playing="item.playing" />
                            </view>
                            <view>{{item.duration&&item.duration.toFixed(0)}}''</view>
                        </view>
                    </view>
                </view>
            </template>
            <template v-if="srcList.length==0&&type==='details'">无</template>
            <template v-if="recorderFile===null&&(type==='add'||type==='edit')">
                <view class="btn-box m-b-16">
                    <view class="box flex-center" @tap="showPicker">
                        <u-icon name="plus" size="40"></u-icon>
                    </view>
                </view>
            </template>
        </view>
        <u-popup v-model="maskShow" mode="bottom" border-radius="14" height="280px" @close="close">
            <view class="popup-box">
                <view class="flex-between btn-group">
                    <img src="@/static/images/audio/afe_ic_bottom_dialog_close.png" alt="" @click="closePopup">
                    <img v-if="actionNum==2" src="@/static/images/audio/afe_ic_bottom_dialog_confirm.png" alt="" @click="sureRadio">
                </view>
                <view class="time-box flex-center">
                    {{showRecordTime}}
                </view>
                <view class="gif-box flex-center">
                    <efAcousticWave ref="efAcousticWave" :isStart="isStart" />
                </view>
                <view class="action-btn-group flex-center">
                    <img v-if="actionNum==0" src="@/static/images/audio/afe_ic_audio_recorder_start.png" alt="开始录制" @click="changeAction(1)">
                    <img v-if="actionNum==1" src="@/static/images/audio/afe_ic_audio_recorder_stop.png" alt="暂停录制" @click="changeAction(2)">
                    <view v-if="actionNum==2" class="flex-around">
                        <img src="@/static/images/audio/afe_ic_audio_recorder_restart.png" alt="撤销" @click="radioInit">
                        <img v-if="!playing" class="m-l-40" src="@/static/images/audio/afe_ic_audio_recorder_play.png" alt="开始播放" @click="radioPlay">
                        <img v-if="playing" class="m-l-40" src="@/static/images/audio/stop.png" alt="暂停播放" @click="radioPause">
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
import { BASE_IMG_URL } from "@/common/website";
import { fileUpload } from "@/api/common/common";
import Recorder from "js-audio-recorder";
import efHorn from "../ef-ui/ef-horn/ef-horn";
import efAcousticWave from "../ef-ui/ef-acoustic-wave/ef-acoustic-wave";
import { getType } from "@/utils/tools";
const lamejs = require("lamejs");
const recorder = new Recorder({
    sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
    sampleRate: 48000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
});
const innerAudioContext = uni.createInnerAudioContext();
export default {
    name: "m-recorder",
    components: {
        efHorn,
        efAcousticWave
    },
    props: {
        type: {
            type: String,
            default: "add"
        },
        voicePath: {
            //默认地址
            type: String,
            default: ""
        },
        maxTime: {
            // 录音最大时长，单位秒
            type: Number,
            default: 15
        },
        minTime: {
            // 录音最大时长，单位毫秒
            type: Number,
            default: 3
        },
        picType: {
            type: String, //1表示任务类  2.缺陷类 3.隐患类 4.其他或者不传
            default: "2"
        },
        audioList: {}
    },
    data() {
        return {
            authorize: false,
            recorder, //录音器
            innerAudioContext, //播放器
            recorderFile: null, //录音文件
            maskShow: false,
            actionNum: 0, //0开始录制 1暂停录制 2可播放
            isStart: false, //是否在录制或播放
            playing: false, //是否在播放
            recordTime: 0, //录音时长
            recordTime1: 0, //播放录音倒计时
            timeObj: null, //计时id
            countdownObj: null, //倒计时id
            srcList: [] //展示播放的资源
        };
    },
    computed: {
        showRecordTime() {
            let strs = "";
            let m = Math.floor(this.recordTime / 60);
            if (m < 10) strs = "0" + m;
            let s = this.recordTime % 60;
            strs += s < 10 ? ":0" + s : ":" + s;
            return strs;
        }
    },
    watch: {
        actionNum(nval) {
            this.isStart = nval == 1 ? true : false;
        },
        audioList: {
            handler(nVal) {
                console.log(nVal, "音频nVal");
                if (this.srcList.length > 0) return;
                // let arr = [];
                getType(nVal) == "Array" &&
                    nVal.forEach((item) => {
                        let obj = {};
                        obj.id = item.id;
                        obj.url =
                            BASE_IMG_URL +
                            "?fileName=" +
                            item.picName +
                            "&picId=" +
                            item.picId;
                        obj.playing = false;
                        // 根据地址获取音频时长
                        let audio = new Audio(obj.url);
                        audio.addEventListener("loadedmetadata", () => {
                            obj.duration = audio.duration;
                            this.$nextTick(() => {
                                this.srcList.push(obj);
                            });
                        });
                    });
                // this.srcList = arr;
                console.log(this.srcList, "this.srcList");
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // 获取录音权限;
        wx.invoke("ext_VoiceRecord_Start");
        setTimeout(() => {
            wx.invoke("ext_VoiceRecord_Stop");
        }, 500);
    },
    mounted() {},
    methods: {
        //显示组件
        showPicker() {
            Recorder.getPermission().then(
                () => {
                    this.authorize = true;
                },
                (error) => {
                    // this.$u.toast("请先开启录音权限");
                    console.log(`${error.name} : ${error.message}`);
                }
            );
            setTimeout(() => {
                this.maskShow = true;
                this.$emit("show");
            }, 100);
        },
        // 关闭弹窗
        closePopup() {
            this.maskShow = false;
            // this.radioInit();
        },
        //改变按钮状态
        changeAction(num) {
            if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
                if (!this.authorize) {
                    this.$u.toast("请开启录音权限");
                    return;
                }
            }
            this.actionNum = num;
            //开始录制
            if (num == 1) {
                // if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
                //     wx.startRecord();
                //     this.timeObj = setInterval(() => {
                //         this.recordTime++;
                //     }, 1000);
                // } else {
                this.recorder.start();
                this.timeObj = setInterval(() => {
                    this.recordTime++;
                }, 1000);
                // }
            }
            //暂停录制
            if (num == 2) {
                // if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
                //     if (this.recordTime < 1) {
                //         this.$u.toast("录制时间必须大于1s");
                //         this.radioInit();
                //         return;
                //     }
                //     let _self = this;
                //     wx.stopRecord({
                //         success: function (res) {
                //             let localId = res.localId;
                //             console.log(localId, "localId");
                //             _self.recorderFile = localId;
                //             _self.recordTime1 = _self.recordTime;
                //             // this.recordTime = 0;
                //             clearInterval(_self.timeObj); //清除计时器
                //             console.log(
                //                 _self.recorderFile,
                //                 "_self.recorderFile"
                //             );
                //         }
                //     });
                // } else {
                this.recorder.stop();
                if (this.recordTime < 1) {
                    this.$u.toast("录制时间必须大于1s");
                    this.radioInit();
                    return;
                }
                console.log(this.recorder, "recorder");
                this.recorderFile = this.convertToMp3(this.recorder.getWAV());
                this.recordTime1 = this.recordTime;
                // this.recordTime = 0;
                clearInterval(this.timeObj); //清除计时器
                console.log(this.recorderFile, "this.recorderFile");
                // }
            }
        },
        //播放
        radioPlay() {
            this.isStart = true;
            if (this.recorderFile != null && !this.playing) {
                this.recorder.pausePlay();

                this.recordTime = this.recordTime1;
                this.countdownObj = setInterval(() => {
                    this.recordTime--;
                    if (this.recordTime == 0) {
                        this.radioPause();
                        this.recordTime = this.recordTime1;
                        return;
                    }
                }, 1000);

                this.recorder.play();
                this.playing = true;
            }
        },
        //结束播放
        radioPause() {
            this.isStart = false;
            this.recorder.pausePlay();
            this.playing = false;
            this.recordTime = this.recordTime1;
            clearInterval(this.countdownObj);
        },
        //初始化recorder
        radioInit() {
            this.recorderFile = null;
            this.isStart = false;
            this.actionNum = 0;
            this.recorder.pausePlay();
            this.playing = false;
            this.recordTime = 0;
            clearInterval(this.timeObj);
            clearInterval(this.countdownObj);
        },
        //确认按钮
        sureRadio() {
            // if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
            //     this.srcList.push({
            //         duration: this.recordTime,
            //         url: this.recorderFile,
            //         playing: false,
            //         needUpload: true
            //     });
            //     this.closePopup();
            //     console.log(this.srcList, "srcList");
            //     this.$emit("change", this.srcList);
            // } else {
            let url = URL.createObjectURL(this.recorderFile);
            console.log(url, "url");
            this.srcList.push({
                duration: this.recordTime,
                url: url,
                playing: false,
                needUpload: true
            });
            this.closePopup();
            console.log(this.srcList, "srcList");
            this.$emit("change", this.srcList);
            // }
        },
        //播放音频
        playVoice(item) {
            // if (String(process.env.PRODUCTION).indexOf("IGW") > -1) {
            //     console.log(item, "item");
            //     let music = uni.createInnerAudioContext(); //创建播放器对象
            //     music.src = item;
            //     music.play(); //执行播放
            //     music.onEnded(() => {
            //         //播放结束
            //         music = null;
            //     });
            // } else {
            // innerAudioContext.autoplay = true;kanle nice bang tian daqiu nice bang qweasdzxc
            console.log(item, "item");
            this.srcList.forEach((v) => {
                if (v.playing && v.url != item.url) {
                    innerAudioContext.destroy();
                    v.playing = false;
                }
            });
            innerAudioContext.src = item.url;
            if (!item.playing) {
                console.log("进这开始播放了");
                item.playing = true;
                // let newArr = this.srcList.map((v) => {
                //     if (v.id == item.id) {
                //         v = Object.assign(v, item);
                //     }
                //     return v;
                // });
                // this.srcList = newArr;
                console.log(item, "item", this.srcList);
                innerAudioContext.play();
            } else {
                innerAudioContext.stop();
                item.playing = false;
            }
            innerAudioContext.onPlay(() => {
                console.log("开始播放");
            });
            innerAudioContext.onEnded((res) => {
                console.log("播放完成");
                item.playing = false;
            });
            // }
        },
        //删除音频
        delRecord(index, item) {
            if (item.playing) {
                innerAudioContext.destroy();
            }
            this.srcList.splice(index, 1);
            this.$emit("change", this.srcList);
        },
        //获取音频id
        async getIds() {
            try {
                let idList = [];
                let file = [];
                this.srcList.forEach((item) => {
                    if (item.id) {
                        idList.push(item.id);
                    }
                    if (item.needUpload) {
                        file.push({
                            name: "fileupload",
                            uri: item.url
                        });
                    }
                });
                let idStr = idList.join(",");
                if (file.length > 0) {
                    console.log("有file");
                    console.log(file, "file");
                    const res = await fileUpload(file, {
                        type: 3,
                        picType: this.picType
                    });
                    console.log(res, "走着了");
                    idStr = idStr ? idStr + "," + res : res;
                }

                console.log(idStr, "音频idStr");
                return idStr;
            } catch (err) {
                throw Error();
            }
        },
        convertToMp3(wavDataView) {
            // 获取wav头信息
            const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
            const { channels, sampleRate } = wav;
            const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
            // 获取左右通道数据
            const result = recorder.getChannelData();
            const buffer = [];

            const leftData =
                result.left &&
                new Int16Array(
                    result.left.buffer,
                    0,
                    result.left.byteLength / 2
                );
            const rightData =
                result.right &&
                new Int16Array(
                    result.right.buffer,
                    0,
                    result.right.byteLength / 2
                );
            const remaining =
                leftData.length + (rightData ? rightData.length : 0);

            const maxSamples = 1152;
            for (let i = 0; i < remaining; i += maxSamples) {
                const left = leftData.subarray(i, i + maxSamples);
                let right = null;
                let mp3buf = null;

                if (channels === 2) {
                    right = rightData.subarray(i, i + maxSamples);
                    mp3buf = mp3enc.encodeBuffer(left, right);
                } else {
                    mp3buf = mp3enc.encodeBuffer(left);
                }

                if (mp3buf.length > 0) {
                    buffer.push(mp3buf);
                }
            }

            const enc = mp3enc.flush();

            if (enc.length > 0) {
                buffer.push(enc);
            }

            return new Blob(buffer, { type: "audio/mp3" });
        },
        close() {
            console.log("关闭了");
            this.radioInit();
        }
    }
};
</script>

<style lang="scss">
.btn-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.box {
    width: 80rpx;
    height: 80rpx;
    border: 1px solid #000;
    border-radius: 16rpx;
}
.src-box {
    display: flex;
    flex-direction: column;
}
.radio-box {
    width: 280rpx;
    height: 80rpx;
    border: 1px solid #000;
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    padding: 0 16rpx;
    position: relative;
}
.radio-box img {
    height: 30rpx;
}
.del-btn {
    width: 30rpx;
    position: absolute;
    right: -4px;
    top: -4px;
    z-index: 999;
}
.popup-box {
    height: 280px;
    overflow: hidden;
    padding: 16rpx 24rpx;
}
.time-box {
    margin: 40rpx 0 30rpx;
}
.gif-box {
    width: 100%;
    height: 220rpx;
    overflow: hidden;
}
.btn-group {
    img {
        height: 40rpx;
    }
}
.action-btn-group {
    width: 100%;
    margin-top: 32rpx;
    img {
        height: 80rpx;
    }
}
</style>

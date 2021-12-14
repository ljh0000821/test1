<template>
    <view class="map-content">
        <custom-navbar title="test" iconLeft></custom-navbar>

        <efDatePicker ref="efDatePicker" @onConfirm="onConfirm">
            aaa
        </efDatePicker>
        <button @click="showDate">show</button>
        <view>
            <view>图片：</view>
            <chooseImage ref="chooseImage" />
        </view>
        <view>
            <view>视频：</view>
            <chooseVideo ref="chooseVideo" />
        </view>
        <view>
            <chooseAudio ref="chooseAudio" />
            <view>音频：</view>
            <mRecorder ref="mRecorder" />
        </view>
        <u-button @click="getIds">图片ids</u-button>
        <u-button @click="vIds">视频ids</u-button>
        <u-button @click="rIds">音频ids</u-button>
        <view>
            <u-button @click="saomiao">扫描</u-button>
        </view>
        <date-range mode="date" :showMutibleDate="showMutibleDate" @change="dateSelected"></date-range>
        <view @click="dateModeAction">时间选择</view>
        <u-button @click="wxImg">微信选择图片</u-button>

        <video id="video" poster="封面图路径" :src="video_url" x5-playsinline="" playsinline="" webkit-playsinline preload="auto"></video>
        <view id="inputGroup1">

        </view>
        <button @click="setInput"> Button </button>
        <button @click="clickInput"> 触发input </button>
        <shotSelectVideo ref="shotSelectVideo" />
        <button @click="shotSelectVideo"> shotSelectVideo </button>
    </view>
</template>

<script>
import efDatePicker from "../../components/ef-ui/ef-date-picker/ef-date-picker.vue";
import chooseImage from "../../components/choose-image/choose-image";
import chooseVideo from "../../components/choose-video/choose-video";
import chooseAudio from "../../components/choose-audio/choose-audio";
import mRecorder from "../../components/m-recorder/m-recorder";
import dateRange from "components/zxp-datepickerRange/zxp-datepickerRange.vue";
import shotSelectVideo from "../../components/ef-ui/ef-shotSelect-video/ef-shotSelect-video.vue";
export default {
    components: {
        chooseImage,
        chooseVideo,
        chooseAudio,
        mRecorder,
        dateRange,
        efDatePicker,
        shotSelectVideo
    },
    data() {
        return {
            windowWidth: 0,
            windowHeight: 0,
            showMutibleDate: false,
            video_url: ""
        };
    },
    created() {
        let systemInfo = this.$store.state.systemInfo.systemInfo;
        this.windowWidth = systemInfo.windowWidth;
        this.windowHeight = systemInfo.windowHeight;
    },
    methods: {
        async getIds() {
            let str = await this.$refs.chooseImage.getIds();
            console.log(str, "ids");
        },
        async vIds() {
            let str = await this.$refs.chooseVideo.getIds();
            console.log(str, "ids");
        },
        async rIds() {
            let str = await this.$refs.chooseAudio.getIds();
            console.log(str, "ids");
        },
        saomiao() {
            console.log("扫描");
            uni.scanCode({
                success: function (res) {
                    console.log("条码类型：" + res.scanType);
                    console.log("条码内容：" + res.result);
                }
            });
        },
        dateSelected(e) {
            console.log(e, "时间");
            /*这里必须将值置为false，否则无法唤起下一次的弹框显示*/
            this.showMutibleDate = false;
        },
        dateModeAction() {
            this.viewMode = "date";
            this.showMutibleDate = true;
        },
        wxImg() {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log(res.localIds, "微信选择的图片");
                }
            });
        },
        chooseVideoInput(event) {
            let files = document.getElementById("filepicker").files[0];
            let url = URL.createObjectURL(files);
            this.video_url = url;
        },
        setInput() {
            let input = document.createElement("input");
            input.setAttribute("id", "oInput");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "audio/*");
            input.setAttribute("capture", "'microphone");
            input.onchange = (e) => {
                // let obj = {
                //     file: input.files[0],
                //     uri: e.srcElement.value
                // };
                console.log(e, "选择的录音");
            };
            let oGroup = document.getElementById("inputGroup1");
            oGroup.appendChild(input);
        },
        onConfirm(data) {
            console.log(data, "data");
        },
        showDate() {
            this.$refs.efDatePicker.show();
        },
        clickInput() {
            let oInput = document.getElementById("oInput");
            oInput.click();
        },
        shotSelectVideo() {
            let _self = this;
            this.$refs.shotSelectVideo.showModal({
                success(res) {
                    console.log(res, "选择完的obj");
                    _self.video_url = res.url;
                    let video = document.createElement("video");
                    // video.width = "200px";
                    // video.height = "100px";
                    // video.src = res.url;
                    let oGroup = document.getElementById("inputGroup1");
                    oGroup.appendChild(video);
                    video.src = res.url;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.map-content {
    width: 100%;
    height: 100%;
    position: absolute;
}
#inputGroup1 {
    // width: 0;
    // height: 0;
    // overflow: hidden;
}
</style>

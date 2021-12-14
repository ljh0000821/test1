<template>
    <view>
        <video poster="http://139.199.76.185:8080/upload/img/20180824/1535081115595.jpg" src="https://feiyongzhipin.oss-cn-beijing.aliyuncs.com/1535081125017.mp4" id="myVideo" @timeupdate="videoTimeUpdateEvent"></video>
    </view>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            vUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4",
            videoContext: {} // 用于绑定视频标签
        };
    },
    created() {
        // 创建视频实例指向视频控件
        this.videoContext = uni.createVideoContext("myVideo");
    },
    methods: {
        videoTimeUpdateEvent(e) {
            // 播放进度改变
            // e.detail.currentTime为每次触发时,视频的当前播放时间
            console.log(e,"eeeee");
            let durationTime = Number(e.detail.duration);
            console.log("视频总时长", durationTime);
        }
    }
};
</script>
<style scoped>
.slot-content {
    width: 500rpx;
}
</style>
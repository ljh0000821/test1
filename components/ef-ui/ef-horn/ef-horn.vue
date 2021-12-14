<template>
    <div class="born">
        <div class="wifi-symbol" v-if="playing">
            <div class="wifi-circle first"><img src="../../../static/common/afe_audio_play_01.png" alt="" srcset=""></div>
            <div class="wifi-circle second"><img src="../../../static/common/afe_audio_play_02.png" alt="" srcset=""></div>
            <div class="wifi-circle third"><img src="../../../static/common/afe_audio_play_03.png" alt="" srcset=""></div>
        </div>
        <div class="wifi-symbol" v-if="!playing">
            <div class="wifi-circle first"><img src="../../../static/common/afe_audio_play_01.png" alt="" srcset=""></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        playing: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
img {
    height: 40rpx;
}
.born {
    width: 62rpx;
    height: 40rpx;
    box-sizing: border-box;
    position: relative;
}
.wifi-symbol {
    box-sizing: border-box;
    overflow: hidden;
    /* transform: rotate(135deg); */
    /* background-color: pink; */
}
.wifi-circle {
    /* border: 5px solid #999999;
    border-radius: 50%; */
    position: absolute;
}

.first {
}

.second {
    animation: fadeInOut 1s infinite 0.6s;
}

.third {
    animation: fadeInOut 1s infinite 0.8s;
}

@keyframes fadeInOut {
    0% {
        opacity: 0; /*初始状态 透明度为0*/
    }
    100% {
        opacity: 1; /*结尾状态 透明度为1*/
    }
}
</style>

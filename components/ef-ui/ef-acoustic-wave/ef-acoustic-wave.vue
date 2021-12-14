<template>
    <view class="liner-box">
        <template v-if="!isStart">
            <view class="lines">
                <view class="stop-dot" v-for="(item,index) in 10" :key="index"></view>
            </view>
        </template>
        <template v-if="isStart">
            <view class="lines">
                <hr class="hr hr1">
                <hr class="hr hr2">
                <hr class="hr hr3">
                <hr class="hr hr4">
                <hr class="hr hr5">
                <hr class="hr hr6">
                <hr class="hr hr7">
                <hr class="hr hr8">
                <hr class="hr hr9">
                <hr class="hr hr10">
            </view>
        </template>
    </view>
</template>
<script>
export default {
    name: "efAcousticWave",
    props: {
        isStart: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    watch: {},
    methods: {}
};
</script>
<style scoped>
.liner-box {
    width: 100%;
    height: 100px;
}
.lines {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.stop-dot {
    background-color: #05b2cc;
    width: 3px;
    height: 2rpx;
    float: right;
    margin-left: 24rpx;
}
.hr {
    background-color: #05b2cc;
    width: 3px;
    height: 20rpx;
    float: right;
    margin-left: 24rpx;
    animation: liner 0.2s ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.hr1 {
    animation-delay: -2s;
}

.hr2 {
    animation-delay: -1.9s;
}

.hr3 {
    animation-delay: -1.8s;
}

.hr4 {
    animation-delay: -1.7s;
}

.hr5 {
    animation-delay: -1.6s;
}

.hr6 {
    animation-delay: -1.5s;
}

.hr7 {
    animation-delay: -1.4s;
}

.hr8 {
    animation-delay: -1.3s;
}

.hr9 {
    animation-delay: -1.2s;
}

.hr10 {
    animation-delay: -1.1s;
}

@keyframes liner {
    0% {
        transform: scaleY(1);
    }

    100% {
        transform: scaleY(6);
    }
}
</style>
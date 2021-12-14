<template>
    <view class="flex-between box">
        <view class="flex-start">
            <view class="blue-line"></view>
            <view class="m-l-16">{{title}}</view>
        </view>
        <view>
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.blue-line {
    width: 6rpx;
    height: 30rpx;
    background-color: #00b5d0;
    border-radius: 4rpx;
}
.box {
    padding:16rpx 0;
    color: #282626;
    // border-bottom: 1px solid #dde4f2;
}
</style>

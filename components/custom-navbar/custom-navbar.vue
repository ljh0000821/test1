<template>
    <view class="uni-navbar">
        <view class="uni-navbar__header">
            <view class="flex-center">
                <uni-icons v-if="iconLeft" @click="goback()" color="#30495E" type="arrowthinleft" size="24" style="font-weight: 800;z-index:9999" />
                <text class="uni-navbar__header_text">{{title}}</text>
                <slot name="left" />
            </view>
            <slot name="right" />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        iconLeft: {
            type: Boolean,
            default: false
        },
        backNum: {
            type: Number,
            default: 1
        },
    },
    data() {
        return {};
    },
    methods: {
        goback() {
            if (this.iconLeft) {
                // let canNavBack = getCurrentPages();
                // if (canNavBack && canNavBack.length > 1) {
                //     uni.navigateBack({
                //         delta: 1
                //     });
                // } else {
                //     history.back();
                // }
                this.$goBack(this.backNum);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$nav-height: 88rpx;
.uni-navbar {
    height: $nav-height;
}
.uni-navbar__header {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    width: 100%;
    height: $nav-height;
    line-height: $nav-height;
    font-size: 36rpx;
    padding: 0 28rpx;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #dde4f2;
    z-index: 1000;
}
.uni-navbar__header_text {
    font-weight: 700;
    color: #30495e;
    margin-left: 10rpx;
}
</style>

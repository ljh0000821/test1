<template>
    <view>
        <u-mask :show="show">
            <view class="content flex-center" @click.self="close">
                <view class="container-box">
                    <view class="flex-center sel-item" @click="toPath('create')">创建工单</view>
                    <view class="flex-center sel-item" @click="toPath('handle')">告警处理</view>
                    <view class="flex-around">
                        <u-button class="false-btn" type="primary" ripple @click="close">取消</u-button>
                    </view>
                </view>
            </view>
        </u-mask>
    </view>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        toPath(path) {
            uni.navigateTo({
                url: "pages/more/alarmManage/alarm?type="+path
            });
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
}
.container-box {
    width: 70%;
    background-color: #fff;
    border-radius: 8rpx;
    padding: 32rpx;
}
.close {
    font-size: 48rpx;
    margin-top: -8rpx;
}
.sure-btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
.false-btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: #dde4f2;
    font-size: 24rpx;
}
.sel-item {
    width: 100%;
    height: 80rpx;
    &:active {
        background-color:#dde4f2;
    }
}
</style>

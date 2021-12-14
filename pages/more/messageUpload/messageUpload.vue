<template>
    <view class="flex1">
        <custom-navbar title="消息上传" iconLeft></custom-navbar>
        <u-sticky bg-color="#dde4f2">
            <view class="top">
                <text class="bold">开始日期-结束日期</text>
                <text>重发全部失败消息</text>
            </view>
        </u-sticky>

        <view class="list-group">
            <view class="list-item border-bottom" v-for="(item,index) in 20" :key="index">
                <view class="list-left">
                    <text class="gray-text">2021-04-28 00:00:00</text>
                    <text class="m-t-16">新增-USER_MOVE-已发送-0</text>
                </view>
                <view>
                    <u-button size="mini" shape="circle">重发</u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>

<style scoped>
.top {
    padding: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #dde4f2;
}
.bold {
    font-weight: bold;
}
.list-group {
    background-color: #fff;
    flex: 1;
    padding: 0 16rpx;
}
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 0;
}
.list-left {
    display: flex;
    flex-direction: column;
}
.border-bottom {
    border-bottom: 1px solid #dde4f2;
}
.gray-text {
    color: #97a4ae;
}
</style>

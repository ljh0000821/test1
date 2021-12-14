<template>
    <view>
        <custom-navbar title="选择检测类型" iconLeft></custom-navbar>
        <view class="type-item" @click="toTesting('hwcw')">红外测温</view>
        <view class="type-item" @click="toTesting('jcky')">交叉跨越及对地距离测量</view>
        <view class="type-item" @click="toTesting('jddz')">接地电阻测量</view>
        <view class="type-item" @click="toTesting('fbgc')">覆冰观测</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orgId: ""
        };
    },
    onLoad(options) {
        this.orgId = options.orgId || "";
        this.info = options.info
            ? JSON.parse(decodeURIComponent(options.info || {}))
            : {};
        this.taskItemId = options.taskItemId;
    },
    methods: {
        toTesting(kinds) {
            uni.navigateTo({
                url:
                    "pages/task/testing/addTesting?kinds=" +
                    kinds +
                    "&taskItemId=" +
                    this.taskItemId +
                    "&orgId=" +
                    this.orgId +
                    "&info=" +
                    encodeURIComponent(JSON.stringify(this.info)) +
                    "&taskType=0" +
                    "&jckySelect=true"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.type-item {
    background-color: #fff;
    padding: 32rpx 40rpx;
    margin: 16rpx;
    border-radius: 16rpx;
}
</style>

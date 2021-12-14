<template>
    <view>
        <custom-navbar title="更多"></custom-navbar>
        <view class="block-group">
            <view class="block-item" @click="toPath('calculator')">
                <img class="block-img" src="../../../static/more/afe_ic_more_tree_tool.png" alt="">
                <text class="m-t-16">数线计算器</text>
            </view>
            <view class="block-item" @click="toPath('stress')">
                <img class="block-img" src="../../../static/more/afe_ic_more_tree_tool.png" alt="">
                <text class="m-t-16">应力计算器</text>
            </view>
            <!-- <view class="block-item" @click="toPath('messageUpload')">
                <img class="block-img" src="../../../static/more/afe_ic_more_message_upload.png" alt="">
                <text class="m-t-16">消息上传</text>
            </view> -->
            <view class="block-item" @click="toPath('guardWire')">
                <img class="block-img" src="../../../static/more/afe_fragment_more_protect_phone.png" alt="">
                <text class="m-t-16">三线维护</text>
            </view>
            <view class="block-item" @click="toPath('jjdz')">
                <img class="block-img" src="../../../static/more/afe_ic_more_account_table.png" alt="">
                <text class="m-t-16">接地电阻测量记录</text>
            </view>
            <view v-show="false" class="block-item" @click="toPath('gzp')">
                <img class="block-img" src="../../../static/more/afe_fragment_more_gzp.png" alt="">
                <text class="m-t-16">工作票管理</text>
            </view>
            <view class="block-item" @click="toPath('gjcl')">
                <img class="block-img" src="../../../static/more/afe_fragment_more_gj.png" alt="">
                <text class="m-t-16">告警处理</text>
            </view>
            <view class="block-item" style="background-color:transparent;">

            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        toPath(path) {
            switch (path) {
                case "calculator":
                    uni.navigateTo({
                        url: "pages/more/calculator/calculator"
                    });
                    return;
                case "stress":
                    uni.navigateTo({
                        url: "pages/more/stress/stress"
                    });
                    return;
                case "guardWire":
                    uni.navigateTo({
                        url: "pages/more/guardWire/guardWire"
                    });
                    return;
                case "messageUpload":
                    uni.navigateTo({
                        url: "pages/more/messageUpload/messageUpload"
                    });
                    return;
                case "jjdz":
                    uni.navigateTo({
                        url: "pages/more/jjdz/list"
                    });
                    return;
                case "gjcl": {
                    //告警处理
                    uni.navigateTo({
                        url: "pages/more/alarmManage/alarm"
                    });
                }
                default:
                    return;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.block-group {
    display: flex;
    flex-wrap: wrap;
    padding: 24rpx;
    justify-content: space-between;
}
.block-item {
    width: 225rpx;
    height: 225rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8rpx;
    margin-bottom: 16rpx;
}
.block-img {
    width: 68rpx;
    height: 68rpx;
}
</style>

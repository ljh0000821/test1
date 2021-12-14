<template>
    <view>
        <custom-navbar title="处理缺陷" iconLeft></custom-navbar>
        <view class="container">
            <HandleForm ref="HandleForm" :id="id" />
            <u-button class="ef-btn" type="primary" ripple :loading="loading" @click="submit">确认</u-button>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import HandleForm from "./components/HandleForm";
export default {
    components: {
        HandleForm
    },
    data() {
        return {
            loading: false,
            id: ""
        };
    },
    onLoad(options) {
        this.id = options.id;
    },
    onReady() {},
    methods: {
        submit() {
            this.loading = true;
            this.$refs.HandleForm.submit()
                .then(() => {
                    this.loading = false;
                    setTimeout(() => {
                        this.$goBack();
                    }, 500);
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.container {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx 15rpx 40rpx;
    box-sizing: border-box;
}
</style>

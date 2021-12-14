<template>
    <view>
        <custom-navbar title="意见反馈" iconLeft></custom-navbar>
        <view class="container">
            <u-input v-model="value" type="textarea" />
        </view>
        <view>
            <u-button class="btn" shape="circle" :loading="loading" @click="submit">提交</u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            loading: false
        };
    },
    methods: {
        submit() {
            if (!this.value) {
                this.$u.toast("内容不能为空");
                return;
            }
            this.$u.toast("提交成功");
            setTimeout(() => {
                this.$goBack();
            }, 800);
        }
    }
};
</script>

<style scoped>
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 64rpx;
    border-color: #05b2cc;
    background-color: #05b2cc;
    color: #fff;
}
</style>

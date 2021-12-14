<template>
    <view>
        <custom-navbar title="新缺陷" iconLeft></custom-navbar>
        <view class="container">
            <DefectForm ref="DefectForm" :baseData="baseData" />
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import DefectForm from "./components/DefectForm";
export default {
    components: {
        DefectForm
    },
    data() {
        return {
            baseData: {}
        };
    },
    onLoad(options) {
        this.baseData = options.info
            ? JSON.parse(decodeURIComponent(options.info || {}))
            : {};
    },
    onReady() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 20rpx;
}
</style>

<template>
    <view>
        <custom-navbar title="任务详情" iconLeft></custom-navbar>
        <view class="container">
            <u-collapse ref="collapseBaseInfoForm" event-type="close" arrow accordion>
                <u-collapse-item title="基本信息" open>
                    <view class="collapse-item">
                        <BaseInfoForm ref="BaseInfoForm" :info="info" @over="initCollapse('collapseBaseInfoForm')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <view class="container" style="margin-top:24rpx">
            <u-collapse ref="collapseDetailsForm" event-type="close" arrow accordion>
                <u-collapse-item title="任务详情" open>
                    <view class="collapse-item">
                        <DetailsForm ref="DetailsForm" :info="info" @over="initCollapse('collapseDetailsForm')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
    </view>
</template>

<script>
import BaseInfoForm from "./components/BaseInfoForm.vue";
import DetailsForm from "./components/DetailsForm.vue";
export default {
    components: {
        BaseInfoForm,
        DetailsForm
    },
    data() {
        return {
            info: {}
        };
    },
    onLoad(options) {
        this.info = JSON.parse(decodeURIComponent(options.info));
        console.log(this.info, "this.info66");
    },
    methods: {
        //重新计算折叠面板高度
        initCollapse(str) {
            this.$refs[str].init();
        }
    }
};
</script>

<style lang="scss" scoped>
.collapse-item {
    padding-bottom: 10px;
}
</style>

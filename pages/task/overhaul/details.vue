<template>
    <view>
        <custom-navbar title="任务详情" iconLeft></custom-navbar>
        <TopMeun @callback="callback" />
        <view class="container" style="margin-top:24rpx">
            <u-collapse ref="collapseDetailsForm" event-type="close" arrow accordion>
                <u-collapse-item title="基本信息" open>
                    <view class="collapse-item">
                        <DetailsForm ref="DetailsForm" :details="details" @over="initCollapse('collapseDetailsForm')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
    </view>
</template>

<script>
import DetailsForm from "./components/DetailsForm.vue";
import TopMeun from "./components/TopMeun.vue";
const toUrl = {
    0: "pages/task/overhaul/plan",
    1: "pages/task/overhaul/ticket",
    2: "pages/task/overhaul/taskItem"
};
export default {
    components: {
        DetailsForm,
        TopMeun
    },
    data() {
        return {
            details: {}
        };
    },
    onLoad(options) {
        this.details = JSON.parse(decodeURIComponent(options.details || {}));
    },
    methods: {
        //重新计算折叠面板高度
        initCollapse(str) {
            this.$refs[str].init();
        },
        callback(item) {
            toUrl[item.$index] &&
                uni.navigateTo({
                    url: toUrl[item.$index]
                });
        }
    }
};
</script>

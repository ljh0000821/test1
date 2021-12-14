<template>
    <view>
        <custom-navbar title="检修计划" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <u-form-item label="检修类别" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="工作内容" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="计划部门" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="工作负责人" prop="layDesc" label-width="200">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="计划开始日期" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="计划结束日期" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
                </u-form-item>
            </u-form>
        </view>
        <view class="container" style="margin-top:24rpx">
            <u-collapse ref="collapseDetailsForm" event-type="close" arrow accordion>
                <u-collapse-item title="现场反馈" open>
                    <view class="collapse-item">
                        <u-form :model="form" ref="uForm1" :error-type="['toast']">
                            <u-form-item prop="defPicVOList" label="任务照片" label-width="150" label-position="top">
                                <chooseImage ref="chooseImage" :images="form.defPicVOList" :type="type" />
                            </u-form-item>
                            <u-form-item prop="defVoiVOList" label="任务录音" label-width="150" label-position="top">
                                <chooseAudio ref="chooseAudio" :images="form.defVoiVOList" :type="type" />
                            </u-form-item>
                            <u-form-item prop="defVidVOList" label="任务视频" label-width="150" label-position="top">
                                <chooseVideo ref="chooseVideo" :videoList="form.defVidVOList" :type="type" />
                            </u-form-item>
                        </u-form>
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <u-button class="ef-btn-normal btn-primary" v-if="type==='add'" type="primary" shape="circle" ripple>提交</u-button>
    </view>
</template>

<script>
import chooseImage from "@/components/choose-image/choose-image";
import chooseAudio from "@/components/choose-audio/choose-audio";
import chooseVideo from "@/components/choose-video/choose-video";
export default {
    components: {
        chooseImage,
        chooseVideo,
        chooseAudio
    },
    data() {
        return {
            form: {

            },
            type: "add"
        };
    },
    methods: {
        //重新计算折叠面板高度
        initCollapse(str) {
            this.$refs[str].init();
        },
    },
};
</script>

<style lang="scss">
</style>

<template>
    <view>
        <custom-navbar title="新增缺陷" iconLeft></custom-navbar>
        <view class="container collection">
            <view class="title">基础信息</view>
            <view class="li flex-between">
                <view class="li-title">线路</view>
                <view class="li-right-title">{{twrInfo.lineName}}</view>
            </view>
            <view class="li flex-between">
                <view class="li-title">杆塔</view>
                <view class="li-right-title">{{twrInfo.twrCodes}}</view>
            </view>
            <view class="flex p-16">
                <view>缺陷：<text class="red-text">{{twrInfo.checkEngDefList.length}}条</text></view>
                <!-- <view class="m-l-16" @click="yh">隐患：<text class="orange-text">{{(twrInfo.troExts+twrInfo.troTrees)||0}}条</text></view> -->
            </view>
        </view>
        <view class="container" style="margin-top:24rpx">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <!-- <u-form-item label="验收班组" prop="cleTeam" label-width="150">
                    <efItem :data="formList.dy_findTeamName" v-model="form.cleTeamName" :modelId.sync="form.cleTeam" :type="type==='add'?'select':'label'" name="fullName" id="id" @change="classChange" />
                </u-form-item> -->
                <u-form-item label="验收人员" prop="findUserName" label-width="150">
                    <efItem v-model="form.findUserName" title="验收人员" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item label="验收时间" prop="cleDate" label-width="150">
                    <efItem v-model="form.findTime" type="label" />
                </u-form-item>
                <u-form-item label="验收文本" prop="layDesc" label-width="150">
                    <efItem v-model="form.cheText" title="验收文本" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item prop="defClePicVOList" label="缺陷照片" label-width="150" label-position="top">
                    <chooseImage ref="chooseImage" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defCleVoiVOList" label="缺陷录音" label-width="150" label-position="top">
                    <chooseAudio ref="chooseAudio" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defCleVidVOList" label="缺陷视频" label-width="150" label-position="top">
                    <chooseVideo ref="chooseVideo" :type="type" picType="1" />
                </u-form-item>
                <u-form-item label="缺陷分类标准" prop="cleUser" label-width="180">
                    <efItem :data="GCQXFL" v-model="form.defTypeName" :modelId.sync="form.defType" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item label="缺陷内容" prop="layDesc" label-width="150">
                    <efItem v-model="form.defContent" title="缺陷内容" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
            </u-form>
            <u-button class="ef-btn-normal btn-primary" :loading="loading" shape="circle" ripple plain @click="submit">提交</u-button>
        </view>
    </view>
</template>

<script>
import { checkengdefSubmit } from "@/api/engineering";
import { getNowTime } from "@/utils/tools";
export default {
    data() {
        return {
            loading: false,
            type: "add",
            GCQXFL: [],
            twrInfo: {},
            form: {},
            rules: {
                findUserName: [
                    {
                        required: true,
                        message: "请填写验收人员"
                    }
                ]
            }
        };
    },
    onLoad(options) {
        this.getGCQXFL();
        this.taskId = options.taskId;
        this.twrInfo = options.twrInfo
            ? JSON.parse(decodeURIComponent(options.twrInfo))
            : {};
        console.log(this.twrInfo, "this.twrInfo");
        this.form.findTime = getNowTime();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        getGCQXFL() {
            //工程缺陷分类
            this.$store.dispatch("getList", "GCQXFL").then((res) => {
                console.log(res, "工程缺陷分类");
                this.GCQXFL = res;
            });
        },
        async submit() {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    let params = {
                        ...this.form,
                        engTaskId: this.twrInfo.id,
                        managId: this.taskId,
                        twrCode: this.twrInfo.twrCodes,
                        pic: await this.$refs.chooseImage.getIds(),
                        voi: await this.$refs.chooseAudio.getIds(),
                        vid: await this.$refs.chooseVideo.getIds()
                    };
                    console.log(params, "params");
                    checkengdefSubmit(params)
                        .then(() => {
                            this.$u.toast("提交成功");
                            this.loading = false;
                            setTimeout(() => {
                                this.$goBack();
                            }, 500);
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    this.loading = false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.collection {
    margin-top: 8rpx;
    padding-bottom: 16rpx;
    .title {
        font-size: 28rpx;
        font-weight: 700;
        color: #30495e;
        line-height: 40rpx;
    }
    .li {
        padding: 16rpx 0;
        border-bottom: 1px solid $line-gray;
        &:last-child {
            border-bottom: none;
        }
        .li-title {
            font-size: 24rpx;
            color: #30495e;
            line-height: 34rpx;
        }
        .li-right-title {
            font-size: 24rpx;
            font-weight: 500;
            color: #30495e;
            line-height: 34rpx;
        }
    }
}
</style>

<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item prop="defPicVOList" label="任务照片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.taskPics" :type="actionType" picType="1" @change="sourceChange" />
            </u-form-item>
            <u-form-item prop="defVoiVOList" label="任务录音" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.taskVois" :type="actionType" picType="1" @change="sourceChange" />
            </u-form-item>
            <u-form-item prop="defVidVOList" label="任务视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.taskVids" :type="actionType" picType="1" @change="sourceChange" />
            </u-form-item>
            <u-form-item prop="insReport" label="工作总结" label-width="150" label-position="top">
                <view class="flex1">
                    <view v-if="actionType==='add'||actionType==='edit'?true:false">
                        <u-input :disabled="actionType==='add'||actionType==='edit'?false:true" :clearable="actionType==='add'||actionType==='edit'?true:false" border placeholder="请输入" v-model="form.insReport" type="textarea" />
                    </view>
                    <view class="f-s-24" v-if="actionType==='details'">
                        {{form.insReport}}
                    </view>
                </view>
            </u-form-item>
        </u-form>
        <u-button class="ef-btn-normal btn-primary" :loading="loading" v-if="actionType==='add'" shape="circle" ripple plain @click="submit">提交</u-button>
    </view>
</template>

<script>
import { taskitemUpdate } from "@/api/task";
export default {
    components: {},
    props: {
        type: {
            type: String,
            default: "add"
        },
        info: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            actionType: this.type,
            form: {
                insReport: ""
            },
            rules: {}
        };
    },
    watch: {
        form: {
            handler() {
                this.$emit("over");
            },
            deep: true
        },
        info: {
            handler(nval) {
                console.log(nval, "详情里面nval");
                this.form = nval;
                if (nval.itemState == 3) {
                    this.actionType = "details";
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {},
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        async submit() {
            this.loading = true;
            try {
                this.form.claPic = await this.$refs.chooseImage.getIds();
                this.form.claVoi = await this.$refs.chooseAudio.getIds();
                this.form.claVid = await this.$refs.chooseVideo.getIds();
                this.form.id = this.info.id;
                console.log(this.form, "form");
                taskitemUpdate(this.form).then(() => {
                    this.loading = false;
                    this.$u.toast("已提交");
                    setTimeout(() => {
                        this.$goBack(1,true);
                    }, 500);
                });
            } catch (err) {
                this.loading = false;
            }
        },
        sourceChange() {
            this.$emit("over");
        }
    }
};
</script>

<style lang="scss" scoped>
.custom-style {
    background-color: #05b2cc !important;
    color: #fff;
}
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 24rpx;
}
</style>

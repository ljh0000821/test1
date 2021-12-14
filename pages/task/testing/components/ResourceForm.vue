<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item prop="defPicVOList" label="检测照片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.taskPics" :type="type" picType="1" />
            </u-form-item>
            <u-form-item prop="defVoiVOList" label="音频" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.taskVois" :type="type" picType="1" />
            </u-form-item>
            <u-form-item prop="defVidVOList" label="检测视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.taskVids" :type="type" picType="1" />
            </u-form-item>
        </u-form>
        <!-- <button @click="getForm">getForm</button> -->
    </view>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "add"
        },
        needGet: {
            type: Boolean,
            default: true
        },
        details: {
            type: Object,
            default: () => {}
        },
        lastRecord: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            form: {},
        };
    },
    created() {},
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    watch: {
        lastRecord: {
            handler(nval) {
                this.form = nval;
            },
            deep: true
        }
    },
    methods: {
        async getForm() {
            try {
                let params = {
                    claPic: await this.$refs.chooseImage.getIds(),
                    claVoi: await this.$refs.chooseAudio.getIds(),
                    claVid: await this.$refs.chooseVideo.getIds()
                };
                console.log(params, "params");
                return params;
            } catch (err) {
                throw Error();
            }
        }
    }
};
</script>

<style scoped>
</style>

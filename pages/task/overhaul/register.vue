<template>
    <view>
        <custom-navbar title="检修任务验收" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <!-- <u-form-item prop="findWay" label="班组" label-width="150">
                    <efItem v-model="info.findWayName" type="label" name="dictValue" id="dictKey" />
                </u-form-item> -->
                <u-form-item prop="findWay" label="电压等级" label-width="150">
                    <efItem v-model="info.voltage" type="label" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item prop="findWay" label="线路名称" label-width="150">
                    <efItem v-model="info.lineName" type="label" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item prop="findWay" label="杆塔号" label-width="150">
                    <efItem v-model="info.twrCode" type="label" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item prop="defPicVOList" label="验收时照片" label-width="150" label-position="top">
                    <chooseImage ref="chooseImage" :images="form.taskPics" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defVoiVOList" label="验收时录音" label-width="150" label-position="top">
                    <chooseAudio ref="chooseAudio" :audioList="form.taskVois" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defVidVOList" label="验收时视频" label-width="150" label-position="top">
                    <chooseVideo ref="chooseVideo" :videoList="form.taskVids" :type="type" picType="1" />
                </u-form-item>
                <u-form-item label="验收报告填写" prop="accepReport" label-width="180">
                    <efItem v-model="form.accepReport" title="验收报告填写" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item label="是否合格" prop="isLay" label-width="150">
                    <view class="flex1 flex-end">
                        <template v-if="type==='add'">
                            <u-radio-group v-model="form.isQuali" active-color="#05b2cc">
                                <u-radio shape="circle" :name="1">是</u-radio>
                                <u-radio shape="circle" :name="0">否</u-radio>
                            </u-radio-group>
                        </template>
                        <template v-else>
                            <text style="font-size:24rpx">{{(form.isQuali==1&&'是')||(form.isQuali==0&&'否')||''}}</text>
                        </template>
                    </view>
                </u-form-item>
                <template v-if="form.isQuali==0">
                    <u-form-item label="遗留问题" prop="layDesc" label-width="150">
                        <efItem v-model="form.accepPro" title="遗留问题" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                    </u-form-item>
                </template>
                <u-form-item label="验收意见" prop="layDesc" label-width="150">
                    <efItem v-model="form.ysyj" title="验收意见" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
            </u-form>
            <u-button class="ef-btn-normal btn-primary" v-if="type==='add'" shape="circle" :loading="loading" ripple plain @click="submit">提交</u-button>
        </view>
    </view>
</template>

<script>
import { taskhaulitemGetkcxsys, tyjdwyjyxrzsbysjlSubmit } from "@/api/overhaul";
import { equlineDetail } from "@/api/common/common";
export default {
    props: {},
    data() {
        return {
            loading: false,
            type: "add",
            info: {},
            form: {
                isQuali: 1
            },
            rules: {
                accepReport: [
                    {
                        required: true,
                        message: "请填写验收报告"
                    }
                ]
            }
        };
    },
    onLoad(options) {
        this.info = JSON.parse(decodeURIComponent(options.info));
        console.log(this.info,"info");
        if (this.info.state == 4) {
            this.type = "details";
            // this._equlineDetail();
            this._taskhaulitemGetkcxsys();
        }
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        //验收修试记录
        _taskhaulitemGetkcxsys() {
            let params = {
                index: 3, //1勘测 2修试 3验收
                twrGzrwdId: this.info.id
            };
            taskhaulitemGetkcxsys(params).then((res) => {
                console.log(res, "验收记录详情");
                this.form = res.data.data;
            });
        },
        submit() {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    this.form.ysPic = await this.$refs.chooseImage.getIds();
                    this.form.ysVoi = await this.$refs.chooseAudio.getIds();
                    this.form.ysVid = await this.$refs.chooseVideo.getIds();
                    let params = {
                        ...this.form,
                        twrGzrwdId: this.info.id
                    };
                    tyjdwyjyxrzsbysjlSubmit(params).then((res) => {
                        this.$u.toast("提交成功");
                        setTimeout(() => {
                            this.$goBack(2,true);
                        }, 500);
                    });
                }
            });
        }
        //获取线路详情
        // _equlineDetail() {
        //     let params = {
        //         id: this.info.lineId
        //     };
        //     equlineDetail(params).then((res) => {
        //         console.log(res, "线路详情");
        //         this.info.voltage = res.data.data.voltage;
        //     });
        // }
    }
};
</script>

<style>
</style>

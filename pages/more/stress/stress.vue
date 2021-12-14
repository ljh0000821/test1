<template>
    <view>
        <custom-navbar title="应力计算器" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <u-form-item label="导线型号" prop="isLay" label-width="150">
                    <efItem type="combox" :data="dxList" placeholder="请输入选择" :isRightIcon="false" @change="dxChange" />
                </u-form-item>
                <u-form-item label="总截面积" prop="zjmmj" label-width="150">
                    <efItem type="label" v-model="form.zjmmj" unit="mm2" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="外径" prop="isLay" label-width="150">
                    <efItem type="label" v-model="form.waij" unit="d(mm)" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="线膨胀系数" prop="isLay" label-width="150">
                    <efItem type="label" v-model="form.xpzxs" unit="A(1/℃)" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="弹性系数" prop="isLay" label-width="150">
                    <efItem type="label" v-model="form.txxs" unit="E(N)" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="破断力" prop="isLay" label-width="150">
                    <efItem type="label" v-model="form.pdl" unit="Tp(N)" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="单位长度重量" prop="isLay" label-width="180">
                    <efItem type="label" v-model="form.dwcdzl" unit="W(kg/km)" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="风载体形系数" prop="isLay" label-width="180">
                    <efItem type="label" v-model="form.fztxs" unit="C" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="是否覆冰" prop="isLay" label-width="150">
                    <view class="flex1 flex-end">
                        <template v-if="type==='add'">
                            <u-radio-group v-model="form.isFB" active-color="#05b2cc">
                                <u-radio shape="circle" :name="1">是</u-radio>
                                <u-radio shape="circle" :name="0">否</u-radio>
                            </u-radio-group>
                        </template>
                        <template v-else>
                            <text style="font-size:24rpx">{{(form.isLay==2&&'是')||(form.isLay==1&&'否')||''}}</text>
                        </template>
                    </view>
                </u-form-item>
                <template v-if="form.isFB">
                    <u-form-item label="覆冰厚度" prop="isLay" label-width="150">
                        <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.fbhd" placeholder="请输入" unit="d(mm)" :isRightIcon="false" />
                    </u-form-item>
                </template>
                <u-form-item label="风速" prop="isLay" label-width="150">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.fs" placeholder="请输入" unit="m/s" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="风速不均与系数" label-width="220" prop="teamId">
                    <efItem :data="FSBJYXS" v-model="form.fsbjyxs" :type="type=='add'||type=='edit'?'select':'label'" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item label="安全系数" prop="isLay" label-width="150">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.aqxs" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="档距" prop="isLay" label-width="150">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.dj" placeholder="请输入" unit="m" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="高差" prop="isLay" label-width="150">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.gc" placeholder="请输入" unit="m" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="计算点距离小号侧的水平距离" prop="isLay" label-width="380">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.xhjl" placeholder="请输入" unit="m" :isRightIcon="false" />
                </u-form-item>
            </u-form>
            <u-button class="btn" type="primary" shape="circle" ripple @click="toComputed">计算</u-button>
        </view>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { pmcgwList } from "@/api/more/index";
export default {
    props: {
        type: {
            type: String,
            default: "add"
        }
    },
    components: {
        efItem
    },
    data() {
        return {
            dxList: [],
            FSBJYXS: [],
            form: {},
            formBase: {
                fbhd: 10,
                fs: 10,
                fsbjyxs: 1,
                aqxs: 2.5,
                dj: 400,
                gc: 10,
                xhjl: 10
            },
            rules: {
                zjmmj: [
                    {
                        required: true,
                        message: "请选择导线型号"
                    }
                ]
            }
        };
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
        this._FSBJYXS();
        this._pmcgwList();
        this.form = JSON.parse(JSON.stringify(this.formBase));
    },
    methods: {
        toComputed() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    let params = JSON.parse(JSON.stringify(this.form));
                    if (!params.isFB) {
                        delete params.fbhd;
                    }
                    console.log(params, "params");
                    uni.navigateTo({
                        url:
                            "pages/more/stress/result?params=" +
                            encodeURIComponent(JSON.stringify(params))
                    });
                }
            });
        },
        //获取导线型号
        _pmcgwList() {
            let params = {
                current: 1,
                size: 999999
            };
            pmcgwList(params).then((res) => {
                console.log(res, "导线型号");
                this.dxList = res.data.data.records.map((item) => {
                    item.label = item.dxxh;
                    item.value = item.id;
                    return item;
                });
                console.log(this.dxList, "this.dxList");
            });
        },
        dxChange(data) {
            console.log(data, "data");
            this.form = { ...data, ...this.formBase };
        },
        _FSBJYXS() {
            this.$store.dispatch("getList", "FSBJYXS").then((res) => {
                console.log(res, "风速不均与系数");
                this.FSBJYXS = res;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 24rpx;
    background-color: #05b2cc !important;
    color: #fff;
    margin-bottom: 40rpx;
}
</style>

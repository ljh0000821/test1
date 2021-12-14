<template>
    <view>
        <custom-navbar title="应力计算结果" iconLeft></custom-navbar>
        <view class="container">
            <u-form-item label="自重比截g1" prop="isLay" label-width="180">
                <efItem type="label" v-model="form.g1" unit="N/m.mm2" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="垂直比截g3" prop="g3" label-width="180">
                <efItem type="label" v-model="form.g3" unit="N/m.mm2" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="无冰风压比截g4" prop="isLay" label-width="240">
                <efItem type="label" v-model="form.g4" unit="N/m.mm2" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="无冰有风时综合比截g6" prop="isLay" label-width="300">
                <efItem type="label" v-model="form.g6" unit="N/m.mm2" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="年均气温应力" prop="isLay" label-width="180">
                <efItem type="label" v-model="form.s1" unit="MPa" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="年均气温导线应力" prop="isLay" label-width="240">
                <efItem type="label" v-model="form.result" unit="N/mm2" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="许用应力" prop="isLay" label-width="180">
                <efItem type="label" v-model="form.s2" unit="MPa" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="许用导线应力" prop="isLay" label-width="180">
                <efItem type="label" v-model="form.result2" unit="N/mm2" :isRightIcon="false" />
            </u-form-item>
        </view>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { stressCalcuation } from "@/api/more/index";
export default {
    components: {
        efItem
    },
    data() {
        return {
            form: {}
        };
    },
    filters: {
        capitalize(value) {
            return value.toFixed(6);
        }
    },
    onLoad(options) {
        let params = JSON.parse(decodeURIComponent(options.params));
        console.log(params, "params66");
        // this._stressCalcuation(params);
        this.getResult(params);
    },
    methods: {
        getResult(params) {
            let form = {};
            //总截面积
            let s = Number(params.zjmmj);
            //自重比载
            form.g1 = (9.8 * 466.8) / s / 1000;
            //冰厚度 (5 10 20mm)
            let b = Number(params.fbhd) || 0;
            //导线直径
            let d = Number(params.waij);
            //覆冰比载
            form.g2 = (27.708 * b * (b + d)) / s / 1000;
            //垂直比载
            form.g3 = form.g1 + form.g2;
            //风速不均与系数(1 0.86 0.75 0.70)
            let a = Number(params.fsbjyxs);
            //风载体形系数
            let c = Number(params.fztxs);
            //风速输入
            let v = Number(params.fs);
            //无冰风压比载  g4=0.6128aCdv*v/s/1000
            form.g4 = (((0.6128 * a * c * v * v) / s) * d) / 1000;
            //覆冰时风压比载 g5(b,v)=0.6128aC(d+2b)*v*v/s/1000
            form.g5 = (0.6125 * a * c * (2 * b + d) * v * v) / s / 1000;
            //几种风速下的比载 g6
            form.g6 = Math.sqrt(form.g1 * form.g1 + form.g4 * form.g4);
            //覆冰时综合比载g7
            form.g7 = Math.sqrt(form.g3 * form.g3 + form.g5 * form.g5);
            //安全系数输入
            let k = Number(params.aqxs);
            //破坏力
            let t = Number(params.pdl);
            //额定破断力系数
            let p = 0.95 * t;

            //年均气温应力
            form.s1 = (p * 0.25) / s;
            //许用应力
            form.s2 = p / s / k;
            //实际用的值在 s1 s2之间

            //x:计算点距离小号侧的水平距离；

            //σ0：计算气象条件下弧垂最低的应力
            //σx ： 任意一点的应力
            //		double std=58.028996;
            //		double std=s1;
            let std = Number(form.s2);
            //L：档距；
            let L = Number(params.dj);
            //h:高差；
            let h = Number(params.gc);
            //:计算点距离小号侧的水平距离；
            let X = Number(params.xhjl);
            //γ：计算气象条件下比载
            let r = Number(form.g6);
            let γ = Number(form.g7);
            //python计算公式
            form.result =
                std *
                Math.cosh(
                    (r * (L - 2 * X)) / (2 * std) -
                        Math.asinh(
                            h /
                                (((2 * std) / r) *
                                    Math.sinh((r * L) / (2 * std)))
                        )
                );
            form.result2 =
                std *
                Math.cosh(
                    (γ * (L - 2 * X)) / (2 * std) -
                        Math.asin(
                            h /
                                (((2 * std) / γ) *
                                    Math.sinh((γ * L) / (2 * std)))
                        )
                );
            this.form = form;
        },
        _stressCalcuation(params) {
            stressCalcuation(params).then((res) => {
                console.log(res, "应力计算结果");
            });
        }
    }
};
</script>

<style>
</style>

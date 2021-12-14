<template>
    <view>
        <custom-navbar title="历史详情" iconLeft></custom-navbar>
        <view class="container">
            <!-- 红外测温 -->
            <template v-if="kinds=='hwcw'">
                <u-form :model="form" ref="uForm" :error-type="['toast']">
                    <u-form-item label="连接形式" label-width="150" prop="lineName">
                        <efItem v-model="form.ljxs" type="label" />
                    </u-form-item>
                    <u-form-item label="接头位置" label-width="150" prop="lineName">
                        <efItem v-model="form.jtwz" type="label" />
                    </u-form-item>
                    <u-form-item label="环境温度(℃)" label-width="180" prop="lineName">
                        <efItem v-model="form.hjwd" type="label" />
                    </u-form-item>
                    <u-form-item label="异常接头位置" label-width="180" prop="lineName" :border-bottom="false">
                        <efItem v-model="form.ycjtwz" type="label" />
                    </u-form-item>
                </u-form>
            </template>
            <!-- 覆冰观测 -->
            <template v-if="kinds=='fbgc'">
                <u-form :model="form" ref="uForm" :error-type="['toast']">
                    <u-form-item label="温度(℃)" label-width="150" prop="lineName">
                        <efItem v-model="form.wd" type="label" />
                    </u-form-item>
                    <u-form-item label="湿度%" label-width="150" prop="lineName">
                        <efItem v-model="form.sd" type="label" />
                    </u-form-item>
                    <u-form-item label="风速m/s" label-width="150" prop="lineName">
                        <efItem v-model="form.fs" type="label" />
                    </u-form-item>
                    <u-form-item label="异常接头位置" label-width="180" prop="lineName">
                        <efItem v-model="form.ycjtwz" type="label" />
                    </u-form-item>
                    <u-form-item label="覆冰厚度mm" label-width="180" prop="lineName">
                        <efItem v-model="form.fbhd" type="label" />
                    </u-form-item>
                    <u-form-item label="覆冰类型" label-width="150" prop="lineName">
                        <efItem v-model="form.fblx" type="label" />
                    </u-form-item>
                    <u-form-item label="设计覆冰厚度mm" label-width="250" prop="lineName" :border-bottom="false">
                        <efItem v-model="form.sjfbhd" type="label" />
                    </u-form-item>
                </u-form>
            </template>
            <!-- 接地电阻 -->
            <template v-if="kinds=='jddz'">
                <u-form :model="form" ref="uForm" :error-type="['toast']">
                    <u-form-item label="电子测量值A（Ω）" label-width="250" prop="lineName">
                        <efItem v-model="form.aleg" type="label" />
                    </u-form-item>
                    <u-form-item label="电子测量值B（Ω）" label-width="250" prop="lineName">
                        <efItem v-model="form.bleg" type="label" />
                    </u-form-item>
                    <u-form-item label="电子测量值C（Ω）" label-width="250" prop="lineName">
                        <efItem v-model="form.cleg" type="label" />
                    </u-form-item>
                    <u-form-item label="电子测量值D（Ω）" label-width="270" prop="lineName">
                        <efItem v-model="form.dleg" type="label" />
                    </u-form-item>
                    <u-form-item label="计算后工频电阻值（Ω）" label-width="330" prop="lineName">
                        <efItem v-model="jshgpdzz" type="label" />
                    </u-form-item>
                    <u-form-item label="季节系数" label-width="150" prop="lineName">
                        <efItem v-model="form.jjxs" type="label" />
                    </u-form-item>
                    <u-form-item label="测量天气" label-width="250" prop="lineName" :border-bottom="false">
                        <efItem v-model="form.cltq" type="label" />
                    </u-form-item>
                </u-form>
            </template>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            kinds: "",
            form: {}
        };
    },
    computed: {
        jshgpdzz() {
            if (
                this.form.aleg &&
                this.form.bleg &&
                this.form.cleg &&
                this.form.dleg
            ) {
                return (
                    ((Number(this.form.aleg) +
                        Number(this.form.bleg) +
                        Number(this.form.cleg) +
                        Number(this.form.dleg)) /
                        4) *
                    Number(this.form.jjxs)
                ).toFixed(2);
            } else {
                return 0;
            }
        }
    },
    onLoad(options) {
        this.kinds = options.kinds;
        this.form = JSON.parse(decodeURIComponent(options.info));
    },
    methods: {}
};
</script>

<style>
</style>

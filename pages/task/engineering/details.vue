<template>
    <view>
        <custom-navbar title="工程管理" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <u-form-item label="工程名称" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.engName" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="工程概况" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.engSurvey" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="立项说明" prop="layDesc" label-width="150">
                    <efItem type="label" v-model="form.proDesc" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="线路名称" prop="layDesc" label-width="200">
                    <efItem type="label" v-model="form.lineName" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="电压等级" prop="layDesc" label-width="150" :border-bottom="false">
                    <efItem type="label" v-model="form.voltage" :isRightIcon="false" />
                </u-form-item>
            </u-form>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        };
    },
    onLoad(options) {
        this.form = JSON.parse(decodeURIComponent(options.tastInfo));
    },
    methods: {}
};
</script>

<style>
</style>

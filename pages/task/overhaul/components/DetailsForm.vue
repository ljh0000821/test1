<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="线路" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.lineName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="杆塔" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.twrCode" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="班组" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.teamName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="开始/结束时间" prop="layDesc" label-width="200">
                <efItem type="label" v-model="form.timeRange" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="检修方式" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.overHaulName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="负责人" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.insLeaderName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="检测人" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.planItemUserName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="人数" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.planItemUserNum" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="工作内容" prop="layDesc" label-width="150" :border-bottom="false">
                <efItem type="label" v-model="form.insContent" :isRightIcon="false" />
            </u-form-item>
        </u-form>
    </view>
</template>

<script>
export default {
    props: {
        details: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            form: {}
        };
    },
    watch: {
        details: {
            handler(nval) {
                this.form = nval;
                this.form.planItemUserNum =
                    this.form.planItemUserName.split(",").length;
                this.form.timeRange =
                    this.form.startPlanDate.slice(0, 10).replace(/-/g, ".") +
                    "~" +
                    this.form.finishPlanDate.slice(0, 10).replace(/-/g, ".");
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

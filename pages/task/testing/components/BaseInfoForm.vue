<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="线路" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.lineName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="杆塔" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.twrCodes" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="班组" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.teamName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="开始/结束时间" prop="layDesc" label-width="200">
                <efItem type="label" v-model="form.timeSection" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="检测方式" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.testTypeName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="负责人" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.itemLeaderName" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="检测人" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.taskItemNames" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="人数" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.taskItemNamesNum" :isRightIcon="false" />
            </u-form-item>
            <u-form-item label="工作内容" prop="layDesc" label-width="150">
                <efItem type="label" v-model="form.insContent" :isRightIcon="false" />
            </u-form-item>
        </u-form>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    props: {
        kinds: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
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
            form: {},
            rules: {}
        };
    },
    watch: {
        info: {
            handler(nval) {
                console.log(nval,"nval");
                this.form = nval;
                this.form.taskItemNamesNum =
                    nval.taskItemNames.split(",").length;
                this.form.timeSection =
                    nval.startPlanDate.slice(0, 10) +
                    "~" +
                    nval.finishPlanDate.slice(0, 10);
            },
            deep: true,
            immediate: true
        },
        form: {
            handler() {
                this.$emit("over");
            },
            deep: true
        }
    },
    created() {},
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {}
};
</script>

<style scoped>
</style>

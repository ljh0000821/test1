<template>
    <view>
        <custom-navbar title="任务详情" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <u-form-item label="线路" prop="cleOrg" label-width="150">
                    <efItem v-model="info.lineName" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="杆塔" prop="cleOrg" label-width="150">
                    <efItem v-model="info.twrCodes" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="班组" prop="cleOrg" label-width="150">
                    <efItem v-model="info.teamName" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="开始/结束时间" prop="cleOrg" label-width="200">
                    <efItem v-model="planTime" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="巡视类型" prop="cleOrg" label-width="150">
                    <efItem v-model="info.insContent" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="负责人" prop="cleOrg" label-width="150">
                    <efItem v-model="info.itemLeaderName" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="巡视人" prop="cleOrg" label-width="150">
                    <efItem v-model="info.taskItemNames" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="人数" prop="cleOrg" label-width="150">
                    <efItem v-model="info.taskItemNames.split(',').length" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="风险等级" prop="cleOrg" label-width="150">
                    <efItem v-model="info.riskLevelName" type="label" name="fullName" id="id" />
                </u-form-item>
                <u-form-item label="巡视类容" prop="cleOrg" label-width="150">
                    <efItem v-model="info.insContent" type="label" name="fullName" id="id" />
                </u-form-item>
            </u-form>
        </view>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    data() {
        return {
            info: {},
            planTime: "",
            form: {
                a: "aa"
            }
        };
    },
    watch: {
        info: {
            handler(nval) {
                let str = "";
                if (!nval.startPlanDate || !nval.finishPlanDate) {
                    str = "";
                } else {
                    str =
                        nval.startPlanDate
                            .replace(/-/g, ".")
                            .replace("00:00:00", "")
                            .slice(0, 10) +
                        "~" +
                        nval.finishPlanDate
                            .replace("00:00:00", "")
                            .replace(/-/g, ".")
                            .slice(0, 10);
                }
                this.planTime = str;
            },
            deep: true
        }
    },
    onLoad(option) {
        this.info = JSON.parse(decodeURIComponent(option.info));
        console.log(this.info, "info");
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {}
};
</script>

<style>
</style>

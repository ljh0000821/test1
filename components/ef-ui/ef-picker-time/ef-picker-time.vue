<template>
    <efDatePicker ref="efDatePicker" :endDate="endDate" @onConfirm="onConfirm" @onCancel="onCancel">
    </efDatePicker>
</template>
<script>
import efDatePicker from "../ef-date-picker/ef-date-picker.vue";
export default {
    components: {
        efDatePicker
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        endDate: {
            type: String,
            default: "2100-12-31"
        }
    },
    watch: {
        value(nval) {
            this.showModel = this.value;
            console.log(nval, "时间显示");
            if (nval) {
                console.log("进这了");
                this.$refs.efDatePicker.show();
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        onConfirm(data) {
            console.log(data, "日期选择");
            this.$emit("change", data.dateValue);
            this.$emit("cancel");
        },
        onCancel() {
            this.$emit("cancel");
        }
    }
};
</script>
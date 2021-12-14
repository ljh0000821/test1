<template>
    <u-keyboard mode="number" :mask-close-able="false" :tips="value" v-model="isShow" @cancel="cancel" @change="valChange" @backspace="backspace" @confirm="confirm"></u-keyboard>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: "",
            isShow: this.show
        };
    },
    watch: {
        show(nval) {
            this.isShow = nval;
        }
    },
    methods: {
        cancel() {
            this.isShow = false;
            this.value = "";
            this.$emit("update:show", false);
        },
        // 按键被点击(点击退格键不会触发此事件)
        valChange(val) {
            // 将每次按键的值拼接到value变量中，注意+=写法
            this.value += val;
            console.log(this.value);
        },
        // 退格键被点击
        backspace() {
            // 删除value的最后一个字符
            if (this.value.length)
                this.value = this.value.substr(0, this.value.length - 1);
            console.log(this.value);
        },
        confirm() {
            this.$emit("change", this.value);
            this.cancel();
        }
    }
};
</script>

<style>
</style>
<template>
    <u-modal v-model="showModel" mask-close-able title="巡视内容" show-cancel-button confirm-text="确定" @confirm="confirm" confirm-color="#333">
        <slot />
    </u-modal>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value() {
            this.showModel = this.value;
        }
    },
    data() {
        return {
            showModel: false,
            callback: () => { }
        };
    },
    methods: {
        show() {
            this.showModel = true;
        },
        confirm() {
            this.$emit("change", true);
        }
    }
};
</script>
<template>
    <view :class="value ? 'ef-radio-active' : 'ef-radio'" @click="toColick" :style="{width:size+'rpx',height:size+'rpx'}">

    </view>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 42 //rpx单位
        }
    },
    methods: {
        toColick() {
            this.$emit("input", !this.value);
        }
    }
};
</script>
<style scoped lang="scss">
$width: 42rpx;
.ef-radio-active {
    width: $width;
    height: $width;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid #05b2cc;
    position: relative;
    &::after {
        content: "";
        display: inline-block;
        width: 60%;
        height: 60%;
        background: #05b2cc;
        border-radius: 50%;
        margin-top: 20%;
        margin-left: 20%;
        position: absolute;
    }
}
.ef-radio {
    width: $width;
    height: $width;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid #30495e;
}
</style>
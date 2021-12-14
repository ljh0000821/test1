<template>
    <view class="">
        <u-mask :show="show" @click="show = false" class="flex-center">
            <view class="btn-box">
                <view class="btn-item border-b-gray" @click="setShot()">拍摄</view>
                <view class="btn-item" @click="setSelect()">从相册选择</view>
            </view>
        </u-mask>
    </view>
</template>

<script>
export default {
    data() {
        return {
            show: false
        };
    },
    created() {},
    methods: {
        showModal() {
            this.show = true;
        },
        //拍摄
        setShot() {
            this.show = false;
            this.$nextTick(() => {
                this.$emit("sourceTypeChange", "camera");
            });
        },
        setSelect() {
            this.show = false;
            this.$nextTick(() => {
                this.$emit("sourceTypeChange", "album");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-box {
    background-color: #fff;
    width: 70%;
    border-radius: 10rpx;
}
.btn-item {
    padding: 24rpx;
}
</style>

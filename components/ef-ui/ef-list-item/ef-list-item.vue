<template>
    <view class="ef-list-item-ul">
        <view class="ef-list-item-li" @click="toClick">
            <view class="flex-between">
                <view class="ef-list-item-title">{{leftname}}</view>
                <view class="ef-list-item-planhold">
                    <view class="flex-center">
                        {{rightName || placeholder}}
                        <slot name="right"></slot>
                        <view v-if="isRightIcon" class="sanjiao-down"></view>
                    </view>
                </view>
            </view>
            <view class="ef-list-item-planhold-content">
                <slot />
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "efListItem",
    props: {
        //左边文字
        leftname: {
            type: String,
            default: ""
        },
        //右边文字
        rightName: {
            type: String,
            default: ""
        },
        //右边icon
        isRightIcon: {
            type: [Boolean, String],
            default: true
        },
        placeholder: {
            type: String,
            default: "请选择"
        }
    },
    methods: {
        toClick(e) {
            this.$emit("click", e);
        }
    }
};
</script>
<style scoped lang="scss">
.ef-list-item-ul {
    .ef-list-item-li {
        padding: 32rpx 0;
        border-bottom: 1px solid #f1f1f1;
        position: relative;
        .ef-list-item-title {
            font-size: 28rpx;
            color: #30495e;
        }
        .ef-list-item-planhold {
            font-size: 20rpx;
            color: #97a4ae;
        }
        .ef-list-item-planhold-content {
            font-size: 20rpx;
            color: #b2bbc3;
        }
    }
}
//倒立三角形
.sanjiao-down {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #30495e;
    display: inline-block;
    position: relative;
    top: 3px;
    margin-left: 12rpx;
}
</style>
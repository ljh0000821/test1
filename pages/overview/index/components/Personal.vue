<template>
    <view>
        <text class="p-16">{{date}}</text>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="巡视统计" />
            <view class="overview-group">
                <view class="overview-item">
                    <text class="blue num-font">0基</text>
                    <text class="gray">未巡视</text>
                </view>
                <view class="overview-item">
                    <text class="orange num-font">0基</text>
                    <text class="gray">巡视中</text>
                </view>
                <view class="overview-item">
                    <text class="num-font">0基</text>
                    <text class="gray">杆塔数量</text>
                </view>
                <view class="overview-item">
                    <text class="num-font">0张</text>
                    <text class="gray">照片数量</text>
                </view>
            </view>
        </view>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="缺陷统计" />
            <view class="overview-group">
                <view class="overview-item">
                    <text class="red num-font">0条</text>
                    <text class="gray">未消缺</text>
                </view>
                <view class="overview-item">
                    <text class="orange num-font">0条</text>
                    <text class="gray">已消缺</text>
                </view>
                <view class="overview-item">
                    <text class="num-font">0条</text>
                    <text class="gray">缺陷总数</text>
                </view>
            </view>
        </view>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="隐患统计" />
            <view class="overview-group">
                <view class="overview-item">
                    <text class="red num-font">0条</text>
                    <text class="gray">未消除</text>
                </view>
                <view class="overview-item">
                    <text class="orange num-font">0条</text>
                    <text class="gray">已消除</text>
                </view>
                <view class="overview-item">
                    <text class="num-font">0条</text>
                    <text class="gray">隐患总数</text>
                </view>
            </view>
        </view>
         <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="隐患统计" />
            <view class="overview-group">
                <view class="overview-item">
                    <text class="red num-font">0条</text>
                    <text class="gray">未消除</text>
                </view>
                <view class="overview-item">
                    <text class="orange num-font">0条</text>
                    <text class="gray">已消除</text>
                </view>
                <view class="overview-item">
                    <text class="num-font">0条</text>
                    <text class="gray">隐患总数</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { dateFormat } from "@/utils/tools";
import viewHeader from "./viewHeader";
export default {
    components: {
        viewHeader
    },
    data() {
        return {
            date: dateFormat(new Date(), "YYYY-mm-dd")
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.m-t-24 {
    margin-top: 24rpx;
}
.overview-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 48rpx;
}
.num-font {
    font-size: 36rpx;
}
.blue {
    color: #2684ff;
}
.orange {
    color: #ffc836;
}
.red {
    color: #e11414;
}
.gray {
    color: #9d9d9d;
}
.overview-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 48rpx;
}
</style>

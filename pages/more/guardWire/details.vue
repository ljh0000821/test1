<template>
    <view>
        <custom-navbar title="三级护线详情" iconLeft></custom-navbar>
        <view class="container info-box">
            <view class="info-item border-b">
                <view class="flex-between">
                    <view class="flex1 text-ellipsis">线路名称：{{info.lineName||'--'}}</view>
                    <view>线路区段:{{info.range||'--'}}</view>
                </view>
                <view class="m-t-8">
                    行政区域：{{info.regionName||'--'}}
                </view>
                <view class="m-t-8">
                    区段特征：{{info.rengeFeature||'--'}}
                </view>
            </view>
            <view class="people-info-item border-b">
                <view>设备主人</view>
                <view class="m-t-8">
                    <text>{{info.equiName||'--'}}</text>
                    <text class="m-l-32 green-text" @click="callPhone(info.equiPhone)">{{info.equiPhone||'--'}}</text>
                </view>
            </view>
            <view class="people-info-item border-b">
                <view>属地责任人</view>
                <view class="m-t-8">
                    <text>{{info.terResUser||'--'}}</text>
                    <text class="m-l-32 green-text" @click="callPhone(info.terResPhone)">{{info.terResPhone||'--'}}</text>
                </view>
            </view>
            <view class="people-info-item">
                <view>护线员</view>
                <view class="m-t-8">
                    <text>{{info.guaName||'--'}}</text>
                    <text class="m-l-32 green-text" @click="callPhone(info.guaPhone1)">{{info.guaPhone1||'--'}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            info: {}
        };
    },
    onLoad: function (option) {
        this.info = JSON.parse(decodeURIComponent(option.info));
    },
    methods: {
        //拨打电话
        callPhone(phone) {
            window.location.href = "tel://" + phone;
        }
    }
};
</script>

<style lang="scss" scoped>
.info-item {
    padding: 16rpx 0;
}
.border-b {
    border-bottom: 1px solid #dde4f2;
}
.green-text {
    color: $base-green;
}
.people-info-item {
    padding: 16rpx 0;
}
</style>

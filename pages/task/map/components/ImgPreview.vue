<template>
    <view>
        <u-mask :show="show" :mask-click-able="false">
            <view class="content">
                <view class="nav align-center">
                    <!-- <text class="close" @click="close">×</text> -->
                    <uni-icons@click="close()" color="#30495E" type="arrowthinleft" size="24" style="font-weight: 800" />
                    <text class="m-l-16">照片详情</text>
                </view>
                <view class="container">
                    <view class="img-box" @click="previewImg">
                        <img :src="data.url" alt="">
                    </view>
                    <view class="info-group">
                        <view class="info-item align-center">
                            <img class="title-icon" src="@/static/common/ic_base_info.png" alt="">
                            <text class="m-l-8">照片信息</text>
                        </view>
                        <view class="flex-between info-item">
                            <text>拍摄部位</text>
                            <text>{{position}}</text>
                        </view>
                        <view class="flex-between info-item">
                            <text>所属杆塔</text>
                            <text>{{info.twrCode}}</text>
                        </view>
                        <view class="flex-between info-item">
                            <text>拍摄时间</text>
                            <text>{{data.createTime}}</text>
                        </view>
                        <view class="flex-between info-item">
                            <text>所属路线</text>
                            <text>{{info.lineName}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </u-mask>
    </view>
</template>

<script>
import { getLocation } from "@/utils/igwFn";
import { getStore } from "@/utils/store.js";
import { envmSaveOrUpdate } from "@/api/envm/index";
export default {
    props: {
        details: {}
    },
    components: {},
    data() {
        return {
            show: false,
            data: {},
            info: {},
            position: ""
        };
    },
    mounted() {},
    methods: {
        open(options) {
            this.show = true;
            this.data = options.data;
            this.info = options.info;
            this.position = options.position;
        },
        close() {
            this.show = false;
            this.data = {};
            this.info = {};
            this.position = "";
        },
        previewImg() {
            uni.previewImage({
                urls: [this.data.url]
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #dde4f2;
    padding: 24rpx;
}
.img-box {
    width: 100%;
    height: 360rpx;
    background-color: #dde4f2;
    border-radius: 16rpx;
    overflow: hidden;
    img{
        width:100%;
    }
}
.nav {
    font-size: 32rpx;
    margin: 24rpx 0;
}
.close {
    font-size: 48rpx;
    margin-top: -8rpx;
}

.info-item {
    padding: 16rpx 0;
    border-bottom: 1px solid $line-gray;
    &:last-child {
        border: none;
    }
    &:first-child {
        border: none;
    }
}
</style>

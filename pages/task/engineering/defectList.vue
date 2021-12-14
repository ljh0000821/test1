<template>
    <view>
        <custom-navbar title="工程缺陷" iconLeft></custom-navbar>
        <view class="container">
            <view class="list-box">
                <template v-if="listData.length>0">
                    <view class="list-item" v-for="item in listData" :key="item.id" @click="toDetails(item)">
                        <view class="flex-between">
                            <view class="flex-start flex1">
                                <view class="list-item-icon flex-center">
                                    <u-icon name="info"></u-icon>
                                </view>
                                <text class="list-item-status m-l-16">{{item.defNature}}</text>
                                <view class="m-l-16 gray-text ">
                                    <img src="@/static/common/ic_add_ins_tower.png" alt="" srcset="">
                                    <text>{{item.twrCode}}</text>
                                </view>
                                <text class="flex1 gray-text m-l-16 text-ellipsis">{{item.defReport}}</text>
                            </view>
                            <view :class="['right-tags',item.defState==1?'bg-orange':item.defState==3?'bg-green':'bg-blue']">
                                {{(item.defState==1&&'未消缺')||(item.defState==2&&'已消缺')}}
                            </view>
                        </view>

                        <view class="flex-between">
                            <view class="flex-start flex1 m-t-16">
                                <img src="@/static/common/ic_add_ins_line.png" alt="" srcset="">
                                <text class="flex1 gray-text text-ellipsis">{{item.lineName}}</text>
                            </view>
                            <view class="flex-start m-t-16">
                                <view class="m-l-16 gray-text ">
                                    <img src="@/static/common/ic_add_ins_date.png" alt="" srcset="">
                                    <text>{{item.createTime}}</text>
                                </view>
                                <view class="m-l-16 gray-text ">
                                    <img src="@/static/common/ic_add_ins_member.png" alt="" srcset="">
                                    <text>{{showName(item.findUserName)}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
                </template>

                <template v-if="listData.length===0">
                    <u-empty></u-empty>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: []
        };
    },
    computed: {
        showName() {
            return (name) => {
                let len = name.length;
                return len > 3 ? name.slice(0, 3) + "..." : name;
            };
        }
    },
    onLoad(options) {
        this.listData = options.defList
            ? JSON.parse(decodeURIComponent(options.defList))
            : {};
    },
    methods: {
        toDetails(){}
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 20rpx;
    margin-right: 8rpx;
}
.list-box {
    padding: 8rpx;
}

.list-item {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 16rpx 0;
    font-size: 28rpx;
}

.list-item:first-child {
    border-top: none;
}

.right-tags {
    padding: 6rpx 20rpx;
    color: #fff;
    // background-color: #f7b500;
    border-radius: 26rpx;
    font-size: 26rpx;
}
.bg-orange {
    background-color: #f7b500;
}
.bg-blue {
    background-color: #05b2cc;
}
.bg-green {
    background-color: #00be27;
}
.list-item-icon {
    background-color: red;
    color: #fff;
    border-radius: 50%;
    width: 40rpx;
    height: 40rpx;
}

.list-item-status {
    font-weight: bold;
}

.gray-text {
    color: #9aa3aa;
    font-size: 26rpx;
}
</style>

<template>
    <view>
        <custom-navbar title="我"></custom-navbar>
        <view class="flex info-group">
            <img class="info-img" src="@/static/my/ic_head_default.png" alt="">
            <view class="info-text">
                <text>{{userInfo.account}}</text>
                <text>{{userInfo.nick_name}}</text>
            </view>
        </view>
        <view class="list-group">
            <view class="list-item flex-between border-bottom" @click="msgList">
                <view class="flex-center">
                    <img class="list-img" src="@/static/my/ic_me_msg.png" alt="">
                    <text class="m-l-16">消息提醒</text>
                </view>
                <view v-show="unread > 0" class="unread">{{unread}}</view>
            </view>
            <!-- <view class="list-item flex-between border-bottom" @click="changeUser">
                <view class="flex-center">
                    <img class="list-img" src="@/static/my/ic_me_user.png" alt="">
                    <text class="m-l-16">切换账号</text>
                </view>
            </view> -->
            <view class="list-item flex-between" @click="toFeedBack">
                <view class="flex-center">
                    <img class="list-img" src="@/static/my/ic_me_back.png" alt="" @click="to">
                    <text class="m-l-16">意见反馈</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getStore } from "@/utils/store.js";
import { defOverdue } from "@/api/defect";
export default {
    data() {
        return {
            userInfo: {},
            unread: 0
        };
    },
    onShow() {
        this.userInfo = getStore("userInfo");
        //获取缺陷提醒数量
        defOverdue().then((res) => {
            this.unread = res.data.data.length
        });
    },
    methods: {
        changeUser() {
            uni.navigateTo({
                url: "pages/login/index"
            });
        },
        msgList() {
            uni.navigateTo({
                url: "pages/my/message/message"
            });
        },
        toFeedBack() {
            uni.navigateTo({
                url: "pages/my/feedback/feedback"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.unread {
    text-align: center;
    background: red;
    border-radius: 100%;
    padding: 0rpx 10rpx;
    font-size: 8rpx;
    color: white;
}
.info-group {
    background-color: #fff;
    padding: 24rpx 36rpx;
}
.info-img {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
}
.info-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rpx 0;
    margin-left: 24rpx;
}
.list-group {
    margin-top: 24rpx;
}
.list-item {
    background-color: #fff;
    padding: 24rpx;
    box-sizing: content-box;
}
.list-img {
    width: 32rpx;
}
.border-bottom {
    border-bottom: 1px solid #dde4f2;
}
</style>


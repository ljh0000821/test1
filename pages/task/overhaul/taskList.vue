<template>
    <view>
        <custom-navbar title="任务列表" iconLeft></custom-navbar>
        <view class="container">
            <template v-if="listData.length>0">
                <view class="flex task-item" v-for="(item,index) in listData" :key="index" @click="toTask(item)">
                    <view class="align-center flex1">
                        <img class="twor-img" src="../../../static/common/afe_def_detail_twr.png" alt="">
                        <text>{{item.twrCode}}</text>
                        <view class="flex1 gray-text m-l-16 text-ellipsis">{{item.jobContent}}</view>
                    </view>
                    <view class="flex align-center">
                        <text :class="[(item.state==1&&'gray-text')||(item.state==2&&'jxColor')||(item.state==3&&'orange-text')||(item.state==4&&'green-text')]">{{item.stateName}}</text>
                        <!-- <text class="green-text" style="color:#01DF01">进行中</text> -->
                        <!-- <text class="orange-text">待验收</text>
                    <text class="green-text">已完成</text> -->
                        <view class="m-l-8">
                            <u-icon name="arrow-right" color="#6E6E6E" size="24"></u-icon>
                        </view>
                    </view>
                </view>
            </template>
            <template v-if="listData.length==0">
                <u-empty></u-empty>
            </template>
        </view>
    </view>
</template>

<script>
import { taskhaulitemGetItemTwrInfo } from "@/api/overhaul";
export default {
    data() {
        return {
            taskHaulItemId: "",
            twrId: "",
            listData: []
        };
    },
    onLoad(options) {
        console.log(options, "options");
        this.taskHaulItemId = options.taskHaulItemId;
        this.twrId = options.twrId;
    },
    onShow() {
        this._taskhaulitemGetItemTwrInfo();
    },
    methods: {
        toTask(item) {
            uni.navigateTo({
                url:
                    "pages/task/overhaul/workTask?info=" +
                    encodeURIComponent(JSON.stringify(item)) +
                    "&taskHaulItemId=" +
                    this.taskHaulItemId
            });
        },
        //获取列表
        _taskhaulitemGetItemTwrInfo() {
            let params = {
                taskHaulItemId: this.taskHaulItemId,
                twrId: this.twrId
            };
            console.log(params, "params");
            taskhaulitemGetItemTwrInfo(params).then((res) => {
                console.log(res, "杆塔检修列表");
                this.listData = res.data.data;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.twor-img {
    height: 26rpx;
}
.task-item {
    padding: 24rpx 0;
    border-bottom: 1px solid $line-gray;
    &:last-child {
        border: none;
    }
}
.jxColor {
    color: #01df01;
}
</style>

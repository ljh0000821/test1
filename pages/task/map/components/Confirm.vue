<template>
    <view>
        <u-mask :show="show">
            <view class="content flex-center" @click.self="close">
                <view class="container-box">
                    <view class="flex-center">是否完成当前{{(type==0&&'巡视')||(type==1&&'检测')||(type==2&&'检修')||(type==3&&'验收')}}任务</view>
                    <view class="flex-around">
                        <u-button class="false-btn" type="primary" ripple @click="close">否</u-button>
                        <u-button class="sure-btn m-l-16" type="primary" ripple @click="_taskitemUpdate">是</u-button>
                    </view>
                </view>
            </view>
        </u-mask>
    </view>
</template>

<script>
import { taskitemUpdate } from "@/api/task/index";
import { taskhaulitemSubmit } from "@/api/overhaul";
const fn = {
    taskitemUpdate: (data) => taskitemUpdate(data),
    taskhaulitemSubmit: (data) => taskhaulitemSubmit(data)
};
export default {
    props: {
        type: {}, //0巡视 1检测 2检修 3验收
        details: {}
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        _taskitemUpdate() {
            console.log(this.details, "details");
            let isOk = true,
                fnName = "",
                stateName = "";
            if (this.type == 0) {
                fnName = "taskitemUpdate";
                stateName = "isNotes";
            }
            if (this.type == 1) {
                fnName = "taskitemUpdate";
                stateName = "isTest";
            }
            if (this.type == 2) {
                fnName = "taskhaulitemSubmit";
                stateName = "isHaul";
            }
            this.details.invTwrVOList.forEach((item) => {
                if (item[stateName] == 0) {
                    isOk = false;
                }
            });
            if (!isOk) {
                this.$u.toast("您还有任务未完成，请先完成任务");
                this.close();
                return;
            }
            let params = {
                id: this.details.id,
                itemState: 3
            };
            console.log(params, "params");
            fn[fnName](params).then(() => {
                this.$u.toast("已完成");
                this.$emit("complete");
                this.show = false;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
}
.container-box {
    width: 70%;
    background-color: #fff;
    border-radius: 8rpx;
    padding: 32rpx;
}
.nav {
    font-size: 32rpx;
    color: #fff;
    margin: 24rpx 0;
}
.close {
    font-size: 48rpx;
    margin-top: -8rpx;
}
.address-img {
    height: 50rpx;
}
.refresh-img {
    width: 32rpx;
}
.info-group {
    padding: 8rpx 0;
    border-bottom: 1px solid #dde4f2;
}
.info-item-group {
    padding: 24rpx 0;
}
.info-item {
    margin: 24rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.info-img {
    width: 64rpx;
}
.lr-box {
    width: 100rpx;
}
.r-box {
    width: 60rpx;
}
.input-box {
    height: 80rpx;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16rpx;
}
.sure-btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
.false-btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: #dde4f2;
    font-size: 24rpx;
}
</style>

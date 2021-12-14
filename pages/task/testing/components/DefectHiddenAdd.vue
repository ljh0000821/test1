<template>
    <u-mask :show="show" @click="show = false">
        <view class="warp">
            <view class="container" @tap.stop>
                <view class="m-t-24">是否为此杆塔添加缺陷或隐患？</view>
                <view>
                    <u-button class="ef-btn-normal btn-primary" shape="circle" ripple plain @click="toQX">添加缺陷</u-button>
                    <u-button class="ef-btn-normal btn-primary" shape="circle" ripple plain @click="toYH">添加隐患</u-button>
                    <u-button class="ef-btn-normal btn-normal" shape="circle" ripple plain @click="cancle">取消</u-button>
                </view>
            </view>
        </view>
    </u-mask>
</template>

<script>
export default {
    props: {
        details: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false
        };
    },
    mounted() {},
    methods: {
        showModal() {
            this.show = true;
        },
        cancle() {
            this.show = false;
        },
        toQX() {
            uni.navigateTo({
                url:
                    "pages/task/defect/defect-add?info=" +
                    encodeURIComponent(JSON.stringify(this.details))
            });
            this.cancle();
        },
        toYH() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/addDanger?info=" +
                    encodeURIComponent(JSON.stringify(this.details))
            });
            this.cancle();
        }
    }
};
</script>

<style scoped>
.container {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx 15rpx 40rpx;
    box-sizing: border-box;
}
.warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.rect {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>

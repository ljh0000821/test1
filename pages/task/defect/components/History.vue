<template>
    <view class="list-box">
        <template v-if="listData.length>0">
            <view class="list-item flex p-b-48" v-for="item in listData" :key="item.id">
                <view class="left-icon">
                    <u-icon name="checkmark-circle-fill" color="#05b2cc" size="46"></u-icon>
                </view>
                <view class="flex1  m-l-32">
                    <view class="flex1 flex-between m-b-16">
                        <text class="normal">{{item.realState}}</text>
                        <text class="normal">{{item.oprUserName}}</text>
                    </view>
                    <view class="m-b-16 normal flex">
                        <view>备注：</view>
                        <view class="flex1">{{item.opinions||'无'}}</view>
                    </view>
                    <view class="m-b-16"><text>{{item.updateTime}}</text></view>
                </view>
            </view>
            <u-loadmore v-show="listData.length>9" :status="status" icon-type="flower" bg-color="transperant" />
        </template>

        <template v-if="listData.length===0">
            <u-empty></u-empty>
        </template>
    </view>
</template>

<script>
import { historyListH } from "@/api/history/index";
export default {
    props: {
        id: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: []
        };
    },
    mounted() {
        this._historyListH();
    },
    methods: {
        //获取缺陷列表（分页）
        _historyListH() {
            this.status = "loading";
            let data = {
                size: 10,
                current: this.page,
                parentId: this.id,
                type: 3
            };
            historyListH(data).then((res) => {
                console.log(res, "历史记录");
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                this.listData = [...this.listData, ...res.data.data.records];
                this.$emit("over");
                if (this.page >= this.totalPage) {
                    this.status = "nomore";
                } else {
                    this.page = this.page + 1;
                    this.status = "loadmore";
                }
            });
        },
        //触底加载更多
        loadMore() {
            //避免多次触发
            if (
                this.status == "loading" ||
                this.status == "nomore" ||
                this.page >= this.totalPage + 1
            ) {
                return;
            }
            this._historyListH();
        }
    }
};
</script>

<style lang="scss" scoped>
.list-item {
    border-left: 1px solid #05b2cc;
    margin-left: 30rpx;
    padding-right: 28rpx;
    z-index: 9;
    position: relative;
}
.normal {
    font-size: 30rpx;
    color: #303133;
    // margin-bottom: 24rpx;
}
.bold {
    font-weight: bold;
}
.left-icon {
    position: absolute;
    left: -12px;
    top: -1px;
    z-index: 99;
    background-color: #fff;
}
</style>

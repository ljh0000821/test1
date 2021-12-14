<template>
    <view>
        <scroll-view class="list-box" scroll-y @scrolltolower="loadMore">
            <template v-if="listData.length>0">
                <view class="flex-between flex1 list-item" v-for="(item,index) in listData" :key="item.id" @click="toDetails(item)">
                    <view class="index-box">
                        {{index+1}}
                    </view>
                    <view class="flex1 flex-between content-item">
                        <view class="flex1 text-ellipsis">{{item.updateTime}} {{item.troStatusNode}}</view>
                        <u-icon name="arrow-right" color="#303133" size="28"></u-icon>
                    </view>
                </view>
                <u-loadmore v-show="listData.length>9" :status="status" icon-type="flower" bg-color="transperant" />
            </template>
            <template v-if="listData.length===0">
                <u-empty></u-empty>
            </template>
        </scroll-view>
    </view>
</template>

<script>
import request from "@/utils/request.js";
import { encodeData } from "@/utils/tools";
export default {
    props: {
        idName: {
            type: String,
            default: "troExtId"
        },
        id: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        actionType: {
            type: String,
            default: "add"
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
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];
            this._historyListH();
        },
        //获取缺陷列表（分页）
        _historyListH() {
            this.status = "loading";
            let data = {
                size: 10,
                current: this.page,
                troExtId: this.id,
                troTreeId: this.id
            };

            request({
                url:  this.url,
                method: "get",
                data
            }).then((res) => {
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
        },
        toDetails(data) {
            console.log(data, "data");
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/specialTour?id=" +
                    data.id +
                    "&actionType=details&details=" +
                    encodeData(data)
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.list-box {
    max-height: 500rpx;
}
.list-item {
    color: #303133;
    margin: 16rpx 0;
}
.index-box {
    width: 45rpx;
    height: 45rpx;
    background-color: #dde4f2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16rpx;
}
.content-item {
    background-color: #dde4f2;
    width: 100%;
    padding: 16rpx;
    border-radius: 10rpx;
}
</style>

<template>
    <view class="lines-box">
        <view class="title"><i class="iconfont icon-guanbi" @click="closed"></i>线路选择</view>
        <view class="container serach-container">
            <u-search bg-color="#fff" search-icon="/static/task/map/serch-icon.png" class="search" placeholder="线路名称" shape="square" v-model="lineNameSearch" search-icon-color="#00B5D0" :show-action="false" height="72.4" @change="inputChange"></u-search>
        </view>
        <view class="flex1 container" style="overflow: hidden;margin-bottom:16rpx;">
            <template v-if="listData.length>0">
                <scroll-view style="height:100%;background-color:#fff" scroll-y="true" @scrolltolower="loadMore">
                    <view class="line-group">
                        <view class="line-item" :style="{'color':activeValue==item.id?'#05b2cc':'#000'}" v-for="(item,index) in listData" :key="index" @click="change(item)">{{item.name}}</view>
                    </view>
                    <!-- <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" /> -->
                </scroll-view>
            </template>
            <template v-if="listData.length===0">
                <u-empty></u-empty>
            </template>
        </view>
    </view>
</template>
<script>
import { equlineList, listByZone } from "@/api/common/common";
export default {
    props: {
        // data: {
        //     type: Array,
        //     default: () => []
        // },
        activeValue: {},
        show: {
            type: Boolean,
            default: false
        }
    },
    name: "changeLines",
    data() {
        return {
            timeout: null,
            lineNameSearch: "",
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: []
        };
    },
    watch: {
        // show(nval) {
        //     if (!nval) return;
        //     this._equlineList();
        // }
    },
    mounted() {
        this._equlineList();
    },
    methods: {
        closed() {
            this.$emit("closed");
        },
        change(item) {
            this.$emit("change", item);
            this.closed();
        },
        //线路列表
        // _equlineList(isClear = false) {
        //     let params = {
        //         size: 20,
        //         current: this.page,
        //         lineNameSearch: this.lineNameSearch
        //     };
        //     equlineList(params).then((res) => {
        //         console.log(res, "线路");
        //         this.totalPage = res.data.data.pages;
        //         this.page = res.data.data.current;
        //         if (isClear) {
        //             this.listData = res.data.data.records;
        //         } else {
        //             this.listData = [
        //                 ...this.listData,
        //                 ...res.data.data.records
        //             ];
        //         }
        //         if (this.page >= this.totalPage) {
        //             this.status = "nomore";
        //         } else {
        //             this.page = this.page + 1;
        //             this.status = "loadmore";
        //         }
        //     });
        // },
        _equlineList() {
            let params = {
                current:1,
                size:-1,
                search: this.lineNameSearch
            };
            listByZone(params).then((res) => {
                this.listData = res.data.data;
            });
        },
        loadMore() {
            //避免多次触发
            if (
                this.status == "loading" ||
                this.status == "nomore" ||
                this.page >= this.totalPage + 1
            ) {
                return;
            }
            this._equlineList();
        },
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            // this.listData = [];
            this._equlineList(true);
        },
        inputChange() {
            this.debounce(this.reload);
        },
        //防抖
        debounce(func, wait = 500) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                func();
            }, wait);
        }
    }
};
</script>

<style lang="scss" scoped>
.lines-box {
    position: relative;
    background-color: #30495e;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
}
.title {
    font-size: 36rpx;
    color: #ffffff;
    line-height: 50rpx;
    padding-top: 50rpx;
    margin-bottom: 38rpx;
    margin-left: 28rpx;
    display: flex;
    align-items: center;
    .iconfont {
        margin-right: 20rpx;
        font-size: 26rpx;
    }
}
.serach-container {
    padding: 0;
    margin-top: 20rpx;
    margin-bottom: 32rpx;
}
.line-group {
    background-color: #fff;
}
.line-item {
    font-size: 14px;
    height: 90rpx;
    border-bottom: 1px solid #f4f4f4;
    text-align: left;
    color: #000;
    display: flex;
    align-items: center;
}
</style>

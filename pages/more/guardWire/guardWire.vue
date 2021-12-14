<template>
    <view>
        <custom-navbar title="三级护线" iconLeft></custom-navbar>
        <view class="container info-box">
            <u-sticky bg-color="#fff">
                <view class="search-box">
                    <u-search shape="round" v-model="search" @custom="custom"></u-search>
                </view>
            </u-sticky>
            <template v-if="listData.length>0">
                <view class="info-item border-b" v-for="(item,index) in listData" :key="index" @click="toDetails(item)">
                    <view class="flex-between">
                        <view class="flex1 text-ellipsis">线路名称：{{item.lineName||'--'}}</view>
                        <view>线路区段：{{item.range||'--'}}</view>
                    </view>
                    <view class="m-t-8">
                        行政区域：{{item.regionName||'--'}}
                    </view>
                    <view class="m-t-8">
                        区段特征：{{item.rengeFeature||'--'}}
                    </view>
                </view>
                <u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
            </template>
            <template v-if="listData.length==0">
                <u-empty></u-empty>
            </template>
        </view>
    </view>
</template>

<script>
import { depguardList } from "@/api/more/index";
export default {
    data() {
        return {
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            search: ""
        };
    },
    created() {
        this._depguardList();
    },
    methods: {
        toDetails(item) {
            uni.navigateTo({
                url:
                    "pages/more/guardWire/details?info=" +
                    encodeURIComponent(JSON.stringify(item))
            });
        },
        //获取人员列表
        _depguardList() {
            let params = {
                size: 20,
                current: this.page,
                search: this.search
            };
            depguardList(params).then((res) => {
                console.log(res, "人员列表");
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                this.listData = [...this.listData, ...res.data.data.records];
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
            this._depguardList();
        },
        onReachBottom() {
            this.loadMore();
        },
        custom(val) {
            // console.log(val, "val");
            // if (!val) {
            //     this.$u.toast("搜索值不能为空");
            //     return;
            // }
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];
            this._depguardList();
        }
    }
};
</script>

<style scoped>
.info-item {
    padding: 16rpx 0;
}
.border-b {
    border-bottom: 1px solid #dde4f2;
}
.search-box {
    background: #fff;
    padding: 8px 0;
}
</style>

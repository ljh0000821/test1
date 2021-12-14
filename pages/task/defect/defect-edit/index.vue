<template>
    <view>
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
                                <img src="../../../../static/common/ic_add_ins_tower.png" alt="" srcset="">
                                <text>{{item.twrCode}}</text>
                            </view>
                            <text class="flex1 gray-text m-l-16 text-ellipsis">{{item.defReport}}</text>
                        </view>
                        <view class="right-tags">
                            {{item.stateName}}
                        </view>
                    </view>

                    <view class="flex-between">
                        <view class="flex-start flex1 m-t-16">
                            <img src="../../../../static/common/ic_add_ins_line.png" alt="" srcset="">
                            <text class="flex1 gray-text text-ellipsis">{{item.lineName}}</text>
                        </view>
                        <view class="flex-start m-t-16">
                            <view class="m-l-16 gray-text ">
                                <img src="../../../../static/common/ic_add_ins_date.png" alt="" srcset="">
                                <text>{{item.findDate}}</text>
                            </view>
                            <view class="m-l-16 gray-text ">
                                <img src="../../../../static/common/ic_add_ins_member.png" alt="" srcset="">
                                <text>{{item.findUserName|sliceName}}</text>
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
</template>

<script>
import { deflist } from "@/api/defect/index";
export default {
    data() {
        return {
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: []
        };
    },
    mounted() {
        console.log(666);
        this._deflist();
    },
    methods: {
        reload() {
            this.page = 1;
            this.totalPage = 0;
            this.status = "loadmore";
            this.listData = [];
            this._deflist();
        },
        //获取缺陷列表（分页）
        _deflist() {
            this.status = "loading";
            let data = {
                size: 20,
                current: this.page,
                defState: 1
            };
            deflist(data).then((res) => {
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
            this._deflist();
        },
        //跳转详情页
        toDetails(item) {
            uni.navigateTo({
                url: "pages/task/defect/details?id=" + item.id + "&state=" + item.defState
            });
        }
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
    background-color: #f7b500;
    border-radius: 26rpx;
    font-size: 26rpx;
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

<template>
    <view class="towers-box">
        <view class="title"><i class="iconfont icon-guanbi" @click="closed"></i>杆塔选择</view>
        <view class="flex1" style="overflow: hidden;background-color:#fff;">
            <scroll-view style="height:100%;margin-top:16rpx" scroll-y="true">
                <template v-if="list.length>0">
                    <view class="ul">
                        <view class="li flex" v-for="(item,index) in list" :key="index">
                            <view class="radio">
                                <efRadio v-model="item.check" @input="e=>checkRadio(e,item)" v-if="multiple" />
                            </view>
                            <view class="flex list-right">
                                <view class="tower-list flex-center" @click="towerClick(item2,item)" :class="{active:activeListId.includes(item2.id)}" v-for="(item2,index2) in item" :key="index2">{{item2.twrCode}}</view>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-else>
                    <u-empty text="无杆塔数据"></u-empty>
                </template>
            </scroll-view>
        </view>
        <view class="btn">
            <u-button class="ef-btn" type="primary" ripple @click="sure">确认</u-button>
        </view>
        <!-- <view class="container">
            <template v-if="list.length>0">
                <view class="ul">
                    <view class="li flex" v-for="(item,index) in list" :key="index">
                        <view class="radio">
                            <efRadio v-model="item.check" @input="e=>checkRadio(e,item)" v-if="multiple" />
                        </view>
                        <view class="flex list-right">
                            <view class="tower-list flex-center" @click="towerClick(item2,item)" :class="{active:activeListId.includes(item2.id)}" v-for="(item2,index2) in item" :key="index2">{{item2.twrCode}}</view>
                        </view>
                    </view>
                </view>
            </template>
            <template v-else>
                <u-empty text="无杆塔数据"></u-empty>
            </template>
            <view class="btn">
                <u-button class="ef-btn" type="primary" ripple @click="sure">确认</u-button>
            </view>
        </view> -->
    </view>
</template>

<script>
import efRadio from "../ef-ui/ef-radio/ef-radio.vue";
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        activeArr: {
            type: Array,
            default: () => []
        },
        needClear: {
            type: Boolean,
            default: false
        }
    },
    name: "changeTowers",
    components: {
        efRadio
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                this.grouBy();
            }
        },
        activeArr: {
            handler(nval) {
                this.activeList = nval;
                // console.log(nval, "000000");
                // if (nval.length == 0) {
                //     this.$emit("change", this.activeList);
                // }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        activeListId() {
            return this.activeList.map((item) => item.id);
        }
    },
    data() {
        return {
            radio: true,
            radio2: false,
            list: [],
            activeList: []
        };
    },
    methods: {
        init() {
            this.activeList = [];
            this.grouBy();
        },
        closed() {
            this.$emit("closed");
        },
        //排序  10个一组
        grouBy() {
            let list = [];
            this.data.forEach((item, index) => {
                item.twrCode = item.name;
                item.id = item.psrId;
                item.twrSort = index;
                const i = Math.floor(index / 10);
                if (list[i]) {
                    list[i].push(item);
                } else {
                    list[i] = [item];
                }
            });
            this.list = list;
        },
        // 前面可以全选10个
        checkRadio(isCheck, item) {
            item.forEach((v) => {
                const index = this.activeList.findIndex((o) => o.id === v.id);
                if (isCheck) {
                    if (index === -1) {
                        this.activeList.push(v);
                    }
                } else {
                    this.activeList.splice(index, 1);
                }
            });
        },
        //单击选择  并把单选按钮 变成false
        towerClick(item, item1) {
            //单选
            if (!this.multiple) {
                if (
                    this.activeList.length == 1 &&
                    this.activeList[0].id == item.id &&
                    this.needClear
                ) {
                    this.activeList = [];
                } else {
                    this.activeList = [];
                    this.activeList.push(item);
                }
            } else {
                const index = this.activeList.findIndex(
                    (o) => o.id === item.id
                );
                if (index === -1) {
                    this.activeList.push(item);
                } else {
                    if (item1.check) item1.check = false;
                    this.activeList.splice(index, 1);
                }
            }
        },
        //确定选中
        sure() {
            this.$emit("change", this.activeList);
            this.closed();
        }
    }
};
</script>

<style lang="scss" scoped>
.towers-box {
    position: relative;
    background-color: #30495e;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
}
.container {
    padding: 40rpx 20rpx 100rpx 0rpx;
    margin: 0;
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
.ul {
    .li {
        .radio {
            width: 46rpx;
            height: 46rpx;
            margin: 0 34rpx;
            margin-top: 31rpx;
        }
        .tower-list {
            min-width: 104rpx;
            min-height: 104rpx;
            background-color: #dde4f2;
            border-radius: 24rpx;
            margin-bottom: 16rpx;
            font-size: 24rpx;
            color: #30495e;
            margin-right: 22rpx;
            transition: 0.3s;
            padding:0 8px;
            box-sizing: border-box;
            &:nth-child(5n) {
                // margin-right: 0;
            }
        }
        .active {
            background-color: #05b2cc;
            color: #fff;
        }
        .list-right {
            flex-wrap: wrap;
        }
    }
}
.btn {
    height: 50px;
    // position: fixed;
    // bottom: 0;
    // left: 0;
    width: 100%;
    background-color: #fff;
    .u-btn {
        margin-top: 10px;
    }
}
</style>

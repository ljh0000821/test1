<template>
    <view class="box">
        <view class="title"><i class="iconfont icon-guanbi" @click="closed"></i>人员选择</view>
        <view class="container">
            <scroll-view scroll-x>
                <view class="flex active-peope">
                    <view class="li" v-for="(item,index) in activeList.length" :key="index">
                        <image src="../../static/login/user_img.png"></image>
                    </view>
                </view>
            </scroll-view>
            <scroll-view class="scrolls" scroll-y @scroll="scroll" :scroll-top="scrollTop">
                <template v-if="listItem.length>0">
                    <efIndexList :scrollTop="scrollTop" :sticky="false" @select="select" :indexList="indexList" ref="_efIndexList">
                        <view v-for="(item, index) in listItem" :key="index">
                            <u-index-anchor :index="item.account.charAt(0)" :custom-style="{display: 'none'}" />
                            <view class="flex li" @click="toClick(item)">
                                <efRadio :size="26" :value="item.selected" />
                                <u-avatar :src="item.avatar" class="user-head" size="61"></u-avatar>
                                <view class="name">{{item.name}}</view>
                            </view>
                        </view>
                    </efIndexList>
                </template>
                <template v-if="listItem.length==0">
                    <u-empty></u-empty>
                </template>
            </scroll-view>
        </view>
        <view class="btn">
            <u-button class="ef-btn" type="primary" ripple @click="sure">确认</u-button>
        </view>
    </view>
</template>
<script>
import efIndexList from "../ef-ui/ef-index-list/ef-index-list.vue";
import efRadio from "../ef-ui/ef-radio/ef-radio.vue";
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        names: {
            type: String,
            default: ""
        },
        multiple: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: String,
            default: ""
        }
    },
    components: {
        efIndexList,
        efRadio
    },
    data() {
        return {
            scrollTop: 0,
            activeList: [],
            list: JSON.parse(JSON.stringify(this.data))
        };
    },
    computed: {
        indexList() {
            let listdata = [];
            this.data.forEach((item) => {
                const chars = item.account.charAt(0);
                if (!listdata.includes(chars)) {
                    listdata.push(chars);
                }
            });
            listdata = listdata.sort();
            return listdata;
        },
        listItem() {
            let listItems = [];
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            listItems = this.list.sort((v1, v2) => {
                if (v1.account < v2.account) return -1;
                else return 1;
            });
            return listItems;
        }
    },
    watch: {
        data(nVal) {
            console.log(nVal, "datanval");
        }
    },
    mounted() {
        if (!this.defaultValue) return;
        let idArr = this.defaultValue.split(",");
        this.list = this.list.map((item) => {
            if (idArr.indexOf(item.id) > -1) {
                item.selected = true;
                this.activeList.push(item);
            }
            return item;
        });
    },
    methods: {
        closed() {
            this.activeList = [];
            this.$emit("closed");
        },
        scroll(e) {
            this.scrollTop = e.target.scrollTop;
        },
        select(e, scrollTop) {
            this.scrollTop = scrollTop;
        },
        toClick(item) {
            const index = this.activeList.findIndex((o) => o.id === item.id);
            if (index === -1) {
                //如果是单选，清除activeList
                if (!this.multiple) {
                    this.activeList = [];
                }
                this.activeList.push(item);
                this.list = this.list.map((v) => {
                    let len = this.activeList.filter(
                        (o) => o.id === v.id
                    ).length;
                    if (len > 0) {
                        v.selected = true;
                    } else {
                        v.selected = false;
                    }
                    return v;
                });
            } else {
                this.activeList.splice(index, 1);
                this.list = this.list.map((v) => {
                    let len = this.activeList.filter(
                        (o) => o.id === v.id
                    ).length;
                    if (len > 0) {
                        v.selected = true;
                    } else {
                        v.selected = false;
                    }
                    return v;
                });
            }
            console.log(this.activeList, "this.activeList");
        },
        sure() {
            if (this.activeList.length === 0) return this.closed();
            if (this.multiple) {
                this.$emit("change", this.activeList);
                this.closed();
                return;
            }
            this.$emit("change", this.activeList[0]);
            this.closed();
        }
    }
};
</script>

<style lang="scss" scoped>
.box {
    background-color: #30495e;
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
.active-peope {
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    .li {
        background-color: #fff;
        padding: 10rpx;
        border-bottom: 1px solid #efefef;
        image {
            width: 61rpx;
            height: 61rpx;
            border-radius: 50%;
            background-color: #f2f2f2;
        }
    }
}
.scrolls {
    height: 79vh;
    padding-bottom: 30px;
    .li {
        border-bottom: 1px solid #efefef;
        align-items: center;
        padding: 15rpx 0;
        font-size: 24rpx;
        color: #30495e;
        background-color: #fff;
        .u-avatar {
            margin-left: 16rpx;
        }
        .name {
            margin-left: 16rpx;
        }
    }
}
.btn {
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .u-btn {
        margin-top: 10px;
    }
}
</style>

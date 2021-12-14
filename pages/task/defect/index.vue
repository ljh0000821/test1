<template>
    <view>
        <custom-navbar iconLeft>
            <view slot="left">
                <ef-tabs :data="tabsData" :current="tabIndex" @change="tabsChange" />
            </view>
            <view slot="right">
                <view class="add" @click="toAdd">
                    <!-- <uni-icons color="#304156" type="plusempty" size="22" style="font-weight: 800;" /> -->
                    <text class="add-icon">+</text>
                </view>
            </view>
        </custom-navbar>
        <view class="container">
            <list ref="list" v-if="tabIndex===0" :twrId="twrId" />
            <edit ref="edit" v-if="tabIndex===1" />
        </view>
    </view>
</template>

<script>
import list from "./defect-list/index";
import edit from "./defect-edit/index";
import efTabs from "@/components/ef-ui/ef-tabs/ef-tabs";
export default {
    components: {
        list,
        edit,
        efTabs
    },
    data() {
        return {
            tabIndex: 0,
            tabsData: ["缺陷列表", "编辑中"],
            twrId: ""
        };
    },
    onLoad(options) {
        if (options.twrId) {
            this.twrId = options.twrId || "";
            this.tabsData = ["缺陷列表"];
        }
    },
    onShow() {
        let type = this.tabIndex === 0 ? "list" : "edit";
        if (this.$refs[type]) {
            this.$refs[type].reload();
        }
    },
    onReady() {},
    methods: {
        tabsChange(index) {
            this.tabIndex = index;
        },
        //跳转创建缺陷
        toAdd() {
            uni.navigateTo({
                url: "pages/task/defect/defect-add"
            });
        }
    },
    onReachBottom() {
        if (this.tabIndex === 0) {
            this.$refs.list.loadMore();
        } else {
            this.$refs.edit.loadMore();
        }
    }
};
</script>

<style lang="scss" scoped>
.add {
    width: 40rpx;
    height: 40rpx;
    background: #ffffff;
    box-shadow: 0px 4px 16px 0px rgba(14, 23, 37, 0.08);
    border-radius: 50%;
    justify-content: center;
    text-align: center;
    line-height: 40rpx;
    color: #304156;
}

.main-box {
    padding: 16rpx 0;
}
.add-icon {
    color: #304156;
    font-size: 44rpx;
    font-weight: 400;
}
</style>

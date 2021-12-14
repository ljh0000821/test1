<template>
    <view>
        <custom-navbar iconLeft>
            <view slot="left">
                <ef-tabs ref="efTabs" :data="tabsData" :current="tabIndex" @change="tabsChange" />
            </view>
            <view slot="right">
                <view class="add" @click="toAdd">
                    <!-- <uni-icons color="#304156" type="plusempty" size="22" style="font-weight: 800;" /> -->
                    <text class="add-icon">+</text>
                </view>
            </view>
        </custom-navbar>
        <view class="container">
            <Force ref="Force" v-if="tabIndex==0" :twrId="twrId" />
            <Dendrocalamus ref="Dendrocalamus" v-if="tabIndex==1" :twrId="twrId" />
        </view>
    </view>
</template>

<script>
import Force from "./components/Force";
import Dendrocalamus from "./components/Dendrocalamus";
import efTabs from "@/components/ef-ui/ef-tabs/ef-tabs";
export default {
    components: {
        efTabs,
        Force,
        Dendrocalamus
    },
    data() {
        return {
            tabIndex: 0,
            tabsData: ["外力隐患", "树竹隐患"],
            twrId: ""
        };
    },
    onLoad(options) {
        console.log(options, "options");
        if (options.twrId) {
            this.twrId = options.twrId || "";
        }
        if (!options.active) return;
        this.tabIndex = options.active || 0;
    },
    onShow() {
        let type = this.tabIndex === 0 ? "Force" : "Dendrocalamus";
        if (this.$refs[type]) {
            this.$refs[type].reload();
        }
    },
    onReady() {
        // this.$refs.efTabs.meunChange(this.tabIndex);
    },
    methods: {
        tabsChange(index) {
            this.tabIndex = index;
        },
        //跳转创建隐患
        toAdd() {
            uni.navigateTo({
                url: "pages/task/hiddenDanger/addDanger"
            });
        }
    },
    onReachBottom() {
        if (this.tabIndex === 0) {
            this.$refs.Force.loadMore();
        } else {
            this.$refs.Dendrocalamus.loadMore();
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

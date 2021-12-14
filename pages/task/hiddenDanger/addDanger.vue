<template>
    <view>
        <custom-navbar title="添加隐患" iconLeft></custom-navbar>
        <view class="container">
            <template v-if="type==='add'">
                <u-form :model="form">
                    <u-form-item label="类型" label-width="150" prop="lineName" label-position="top">
                        <view class="flex">
                            <view :class="['btn',{'btn-active':activeTabs===0?true:false}]" @click="changTab(0)">外力隐患</view>
                            <view :class="['btn','m-l-16',{'btn-active':activeTabs===1?true:false}]" @click="changTab(1)">树竹隐患</view>
                        </view>
                    </u-form-item>
                </u-form>
            </template>
            <template v-if="activeTabs==0">
                <ForceForm ref="ForceForm" :type="type" :id="id" :needLoad="type=='edit'" :baseData="baseData" />
            </template>
            <template v-if="activeTabs==1">
                <DendrocalamusForm ref="DendrocalamusForm" :type="type" :id="id" :needLoad="type=='edit'" :baseData="baseData" />
            </template>
        </view>
    </view>
</template>

<script>
import ForceForm from "./components/ForceForm";
import DendrocalamusForm from "./components/DendrocalamusForm";
export default {
    components: {
        ForceForm,
        DendrocalamusForm
    },
    data() {
        return {
            id: "",
            type: "add",
            activeTabs: 0, //0外力 1树竹
            form: {},
            baseData: {}
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.activeTabs = options.activeTabs || 0;
        this.type = options.type || "add";
        this.baseData = options.info
            ? JSON.parse(decodeURIComponent(options.info || {}))
            : {};
    },
    methods: {
        //tab点击
        changTab(state) {
            this.activeTabs = state;
        }
    }
};
</script>

<style scoped>
.btn {
    padding: 0 36rpx;
    border-radius: 40rpx;
    border: 1px solid #000;
    text-align: center;
}
.btn-active {
    border: none;
    color: #fff;
    background-color: #05b2cc;
}
</style>

<template>
    <view>
        <custom-navbar title="审核隐患" iconLeft></custom-navbar>
        <view class="container flex1">
            <u-form :model="form" ref="uForm">
                <u-form-item label="审核结果" prop="state" label-width="150">
                    <view class="flex1 flex-end">
                        <view>
                            <u-button :class="['btn',{'btn-active':form.state==stateT?true:false}]" shape="circle" @click="changeState(stateT)">通过</u-button>
                        </view>
                        <view class="m-l-16">
                            <u-button :class="['btn',{'btn-active':form.state==stateF?true:false}]" shape="circle" @click="changeState(stateF)">驳回</u-button>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item label="审核意见" prop="opinon" label-width="150" label-position="top">
                    <u-input v-model="form.opinon" type="textarea" border />
                </u-form-item>
            </u-form>
            <u-button class="ef-btn" type="primary" ripple :loading="loading" @click="submit">确认</u-button>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { sendOption } from "@/utils/utils";
import { troexthSave, trotreehSave } from "@/api/hiddenDanger";
const fn = {
    troexthSave: (data) => troexthSave(data),
    trotreehSave: (data) => trotreehSave(data)
};
const stateObj = {
    ccsh: [3, 1], //隐患初次审核
    bzsh: [6, 4], //处理提交后班长审核
    zzsh: [7, 4] //专责审核
};
export default {
    components: {},
    data() {
        return {
            loading: false,
            id: "",
            form: {
                state: "", //3通过 1未通过
                opinon: "" //审核意见
            },
            stateT: "", //通过的状态
            stateF: "", //未通过的状态
            type: 0, //0外力 1树林
            stateObj: ""
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.type = options.type;
        this.stateObj = options.stateObj;
        this.form.state = stateObj[options.stateObj][0];
        this.stateT = stateObj[options.stateObj][0];
        this.stateF = stateObj[options.stateObj][1];
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        //改变状态
        changeState(num) {
            this.form.state = num;
        },
        submit() {
            this.loading = true;
            let text = this.form.state == this.stateT ? "已通过" : "未通过";
            let params = {
                parentId: this.id,
                state: this.form.state,
                opinon: sendOption(text, this.form.opinon)
            };
            console.log(params, "params");
            let name = this.type == 0 ? "troexthSave" : "trotreehSave";
            fn[name](params)
                .then(() => {
                    this.$refs.uToast.show({
                        title: "审核成功！"
                    });
                    this.loading = false;
                    setTimeout(() => {
                        this.$goBack();
                    }, 500);
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.container {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx 15rpx 40rpx;
    box-sizing: border-box;
}
.btn {
    width: 120rpx;
    height: 50rpx !important;
    border-radius: 30rpx;
    font-size: 24rpx !important;
    border-color: #05b2cc;
    color: #05b2cc;
}
.btn-active {
    color: #fff;
    background-color: #05b2cc;
}
</style>

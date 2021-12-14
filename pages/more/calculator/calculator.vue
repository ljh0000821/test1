<template>
    <view>
        <custom-navbar title="树线净空距离计算器" iconLeft></custom-navbar>
        <view class="main">
            <img class="calculator-img m-t-40" src="../../../static/more/img_tree_tool.png" alt="">
            <view class="input-group flex-between m-t-32">
                <text class="m-r-16 text-box">AC</text>
                <u-input :class="['flex1',{'bg-gray':(computed||(lenEnough&&!form.b))?true:false}]" v-model="form.b" :disabled="computed||(lenEnough&&!form.b)" :clearable="false" type="number" border-color="#000" border placeholder="" />
                <text class="m-l-16 text-box">m</text>
            </view>
            <view class="input-group flex-between m-t-40">
                <text class="m-r-16 text-box">BC</text>
                <u-input :class="['flex1',{'bg-gray':(computed||(lenEnough&&!form.a))?true:false}]" v-model="form.a" :disabled="computed||(lenEnough&&!form.a)" :clearable="false" type="number" border-color="#000" border placeholder="" />
                <text class="m-l-16 text-box">m</text>
            </view>
            <view class="input-group flex-between m-t-40">
                <text class="m-r-16 text-box">AB</text>
                <u-input :class="['flex1',{'bg-gray':(computed||(lenEnough&&!form.c))?true:false}]" v-model="form.c" :disabled="computed||(lenEnough&&!form.c)" :clearable="false" type="number" border-color="#000" border placeholder="" />
                <text class="m-l-16 text-box">m</text>
            </view>
            <view class="input-group flex-between m-t-40">
                <text class="m-r-16 text-box">∠1</text>
                <u-input :class="['flex1',{'bg-gray':(computed||(lenEnough&&!form.hornA))?true:false}]" v-model="form.hornA" :disabled="computed||(lenEnough&&!form.hornA)" :clearable="false" type="number" border-color="#000" border placeholder="" />
                <text class="m-l-16 text-box">°</text>
            </view>
            <view class="input-group flex-between m-t-40">
                <text class="m-r-16 text-box">∠2</text>
                <u-input :class="['flex1',{'bg-gray':(computed||(lenEnough&&!form.hornB))?true:false}]" v-model="form.hornB" :disabled="computed||(lenEnough&&!form.hornB)" :clearable="false" type="number" border-color="#000" border placeholder="" />
                <text class="m-l-16 text-box">°</text>
            </view>
            <template v-if="errText">
                <view class="err-text m-t-16">提示：{{errText}}</view>
            </template>
            <view class="btn-group m-t-40">
                <view class="red-btn" @click="init">清空</view>
                <view :class="['green-btn',{'bg-gray-btn':lenEnough&&!errText?false:true}]" @click="calcule">计算</view>
            </view>
        </view>
    </view>
</template>

<script>
import { getSin, getAngle } from "@/utils/tools";
export default {
    data() {
        return {
            errText: "",
            lenEnough: false, //form有值的属性个数 大于等于2个时禁用
            computed: false, //是否计算完成
            form: {
                b: null,
                a: null,
                c: null,
                hornA: null,
                hornB: null,
                hornC: 90
            }
        };
    },
    computed: {
        formhornA() {
            return this.form.hornA;
        },
        formhornB() {
            return this.form.hornB;
        }
    },
    watch: {
        formhornA() {
            if (this.form.hornA == null) return;
            this.form.hornB = 90 - this.form.hornA;
        },
        formhornB() {
            if (this.form.hornB == null) return;
            this.form.hornA = 90 - this.form.hornB;
        },
        form: {
            handler(nval) {
                //验证部分
                if (nval.hornA >= 90 || nval.hornB >= 90) {
                    this.errText = "∠1∠2必须为锐角";
                } else {
                    this.errText = "";
                }
                //计算是否达到条件个数
                let len = 0;
                for (let item in nval) {
                    this.form[item] && len++;
                }
                this.lenEnough =
                    len >= 3 && (this.form.b || this.form.c || this.form.a)
                        ? true
                        : false;
            },
            deep: true
        }
    },
    methods: {
        //清空
        init() {
            this.computed = false;
            this.form = {
                b: null,
                a: null,
                c: null,
                hornA: null,
                hornB: null,
                hornC: 90
            };
        },
        //计算
        calcule() {
            if (
                this.form.c &&
                (this.form.b >= this.form.c || this.form.a >= this.form.c)
            ) {
                this.errText = "AB应为最长边";
            }
            if (this.errText || !this.lenEnough || this.computed) return;
            if (this.form.hornA || this.form.hornB) {
                //有斜边
                if (this.form.c) {
                    this.form.a = getSin(this.form.hornA) * this.form.c;
                    this.form.b = getSin(this.form.hornB) * this.form.c;
                }
                //无斜边
                if (this.form.a) {
                    this.form.c = this.form.a / getSin(this.form.hornA);
                    this.form.b = getSin(this.form.hornB) * this.form.c;
                }
                if (this.form.b) {
                    this.form.c = this.form.b / getSin(this.form.hornB);
                    this.form.a = getSin(this.form.hornA) * this.form.c;
                }
            } else {
                //求边
                //无斜边
                if (this.form.c == null) {
                    this.form.c = Math.sqrt(
                        Math.pow(this.form.a, 2) + Math.pow(this.form.b, 2)
                    );
                }
                //有斜边
                if (this.form.b == null) {
                    this.form.b = Math.sqrt(
                        Math.pow(this.form.c, 2) - Math.pow(this.form.a, 2)
                    );
                }
                if (this.form.a == null) {
                    this.form.a = Math.sqrt(
                        Math.pow(this.form.c, 2) - Math.pow(this.form.b, 2)
                    );
                }
                //求角度
                this.form.hornA = getAngle(this.form.a / this.form.c);
                this.form.hornB = getAngle(this.form.b / this.form.c);
            }
            if (this.form.b >= this.form.c || this.form.a >= this.form.c) {
                this.errText = "AB应为最长边";
            }
            this.computed = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.calculator-img {
    width: 460rpx;
}
.input-item {
    width: 460rpx;
}
.text-box {
    width: 40rpx;
}
.btn-group {
    width: 460rpx;
    display: flex;
    justify-content: space-between;
}
.red-btn {
    border: 1px solid #f75f49;
    color: #f75f49;
    padding: 8rpx 64rpx;
    background-color: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
}
.green-btn {
    border: 1px solid #05b2cc;
    color: #fff;
    padding: 16rpx 64rpx;
    background-color: #05b2cc;
    border-radius: 40rpx;
}
.bg-gray-btn {
    background-color: gray;
    opacity: 0.1;
}
.bg-gray {
    background-color: rgba(207, 202, 202, 0.4);
}
.err-text {
    color: red;
}
</style>

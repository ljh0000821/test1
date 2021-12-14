<template>
    <view>
        <view class="flex-between">
            <view>电阻测量值：{{form.jddzcljlItems?form.jddzcljlItems.length:0}}条</view>
            <template v-if="type==='add'">
                <view class="green-text" @click="add">+新增</view>
            </template>
        </view>
        <view class="info-item" v-for="(item,index) in form.jddzcljlItems" :key="index">
            <view class="flex">
                <view class="info-text">A：{{item.aleg}}Ω</view>
                <view class="info-text">B：{{item.bleg}}Ω</view>
                <view class="info-text">C：{{item.cleg}}Ω</view>
                <view class="info-text">D：{{item.dleg}}Ω</view>
            </view>
        </view>
        <u-mask :show="show">
            <view class="flex1 add-box">
                <view class="uni-navbar">
                    <view class="uni-navbar__header">
                        <view class="flex-center">
                            <uni-icons @click="goback()" color="#30495E" type="arrowthinleft" size="24" style="font-weight: 800;" />
                            <text class="uni-navbar__header_text">电阻测量值</text>
                        </view>
                    </view>
                </view>
                <view class="container">
                    <u-form :model="formAdd" ref="uForm" :error-type="['toast']">
                        <u-form-item label="A腿(Ω)" prop="aleg" label-width="180">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.aleg" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="B腿(Ω)" prop="bleg" label-width="180" :border-bottom="false">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.bleg" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="C腿(Ω)" prop="cleg" label-width="260" :border-bottom="false">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.cleg" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="D腿(Ω)" prop="dleg" label-width="260" :border-bottom="false">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.dleg" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="季节系数" prop="jjxs" label-width="260" :border-bottom="false">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.jjxs" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="计算后工频电阻值(Ω)" prop="layDesc" label-width="280" :border-bottom="false">
                            <efItem type="label" v-model="formAdd.jshgpdzz" :isRightIcon="false" />
                        </u-form-item>
                    </u-form>
                    <u-button class="going" type="primary" ripple @click="submit">完成</u-button>
                </view>
            </view>
        </u-mask>
        <!-- <button @click="getForm('jddz')">getForm</button> -->
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    props: {
        type: {
            type: String,
            default: "add"
        },
        lastRecord: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false,
            form: {
                jddzcljlItems: []
            },
            formAdd: {
                aleg: "",
                bleg: "",
                cleg: "",
                dleg: "",
                jjxs: "1.6",
                jshgpdzz: ""
            },
            rules: {
                aleg: [
                    {
                        required: true,
                        message: "A腿(Ω)不能为空"
                    }
                ],
                bleg: [
                    {
                        required: true,
                        message: "B腿(Ω)不能为空"
                    }
                ],
                cleg: [
                    {
                        required: true,
                        message: "C腿(Ω)不能为空"
                    }
                ],
                dleg: [
                    {
                        required: true,
                        message: "D腿(Ω)不能为空"
                    }
                ],
                jjxs: [
                    {
                        required: true,
                        message: "季节系数不能为空"
                    }
                ]
            }
        };
    },
    watch: {
        formAdd: {
            handler(nval) {
                if (nval.aleg || nval.bleg || nval.cleg || nval.dleg) {
                    console.log(this.DzNum,"DzNum");
                    this.formAdd.jshgpdzz = (
                        ((Number(nval.aleg) +
                            Number(nval.bleg) +
                            Number(nval.cleg) +
                            Number(nval.dleg)) /
                            this.DzNum) *
                        Number(this.formAdd.jjxs)
                    ).toFixed(2);
                }
            },
            deep: true
        },
        lastRecord: {
            handler(nval) {
                this.form = nval;
            },
            deep: true
        }
    },
    computed: {
        DzNum() {
            let num = 0;
            if (this.formAdd.aleg) num += 1;
            if (this.formAdd.bleg) num += 1;
            if (this.formAdd.cleg) num += 1;
            if (this.formAdd.dleg) num += 1;
            return num;
        }
    },
    mounted() {
        // this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        add() {
            this.show = true;
        },
        goback() {
            this.formAdd = {
                aleg: "",
                bleg: "",
                cleg: "",
                dleg: "",
                jjxs: "1.6",
                jshgpdzz: ""
            };
            this.show = false;
        },
        submit() {
            if (
                !this.formAdd.aleg &&
                !this.formAdd.bleg &&
                !this.formAdd.cleg &&
                !this.formAdd.dleg
            ) {
                this.$u.toast("请填写电阻值");
                return;
            }
            // this.$refs.uForm.validate((valid) => {
            //     if (valid) {
            // this.formAdd.twrId = this.details.id;
            console.log(this.formAdd, "formAdd");
            console.log(this.form, "form");
            this.form.jddzcljlItems.push(this.formAdd);
            this.goback();
            //     }
            // });
        },
        getForm(kinds) {
            if (kinds == "jddz") {
                console.log(this.form, "电阻测量form");
                return this.form;
            } else {
                return {};
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.info-item {
    color: #97a4ae;
    font-size: 24rpx;
    margin-top: 16rpx;
}
.add-box {
    width: 100%;
    height: 100%;
    background-color: #dde4f2;
    font-family: PingFangSC-Medium, PingFang SC;
}
$nav-height: 88rpx;
.uni-navbar {
    height: $nav-height;
}
.uni-navbar__header {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    width: 100%;
    height: $nav-height;
    line-height: $nav-height;
    font-size: 36rpx;
    padding: 0 28rpx;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #dde4f2;
    z-index: 1000;
}
.uni-navbar__header_text {
    font-weight: 700;
    color: #30495e;
    margin-left: 10rpx;
}
.going {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
.info-text {
    width: 25%;
}
</style>

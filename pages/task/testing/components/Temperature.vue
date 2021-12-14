<template>
    <view>
        <view class="flex-between">
            <view>温度：{{form.hwcwwdjluItems?form.hwcwwdjluItems.length:0}}条</view>
            <template v-if="type==='add'">
                <view class="green-text" @click="add">+新增</view>
            </template>
        </view>
        <view class="info-item" v-for="(item,index) in form.hwcwwdjluItems" :key="index">
            <view class="flex-between">
                <view class="flex1 text-ellipsis">测温点：{{item.cwdlx}}</view>
                <view>导线温度：{{item.dxwd}}℃</view>
            </view>
            <view class="flex-between">
                <view>金属温度：{{item.jjwd}}℃</view>
                <view>金属与导线误差：{{item.dxjjwc}}℃</view>
            </view>
        </view>
        <u-mask :show="show">
            <view class="flex1 add-box">
                <view class="uni-navbar">
                    <view class="uni-navbar__header">
                        <view class="flex-center">
                            <uni-icons @click="goback()" color="#30495E" type="arrowthinleft" size="24" style="font-weight: 800;" />
                            <text class="uni-navbar__header_text">温度</text>
                        </view>
                    </view>
                </view>
                <view class="container">
                    <u-form :model="formAdd" ref="uForm" :error-type="['toast']">
                        <u-form-item label="测温点" label-width="150" prop="cwdlx">
                            <efItem :data="CWDWZ" v-model="formAdd.cwdlx" :type="type=='add'||type=='edit'?'select':'label'" name="dictValue" id="dictKey" />
                        </u-form-item>
                        <u-form-item label="导线温度(℃)" prop="dxwd" label-width="180">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.dxwd" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="金属温度(℃)" prop="jjwd" label-width="180" :border-bottom="false">
                            <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="formAdd.jjwd" placeholder="请输入" :isRightIcon="false" />
                        </u-form-item>
                        <u-form-item label="金属与导线温差(℃)" prop="dxjjwc" label-width="260" :border-bottom="false">
                            <efItem type="label" v-model="formAdd.dxjjwc" :isRightIcon="false" />
                        </u-form-item>
                    </u-form>
                    <u-button class="going" type="primary" ripple @click="submit">完成</u-button>
                </view>
            </view>
        </u-mask>
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
        details: {},
        lastRecord: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false,
            CWDWZ: [],
            form: {
                hwcwwdjluItems: []
            },
            formAdd: {
                cwdlx: "",
                dxwd: "",
                jjwd: "",
                dxjjwc: ""
            },
            rules: {
                cwdlx: [
                    {
                        required: true,
                        message: "请选择测温点"
                    }
                ],
                dxwd: [
                    {
                        required: true,
                        message: "请填写导线温度"
                    }
                ],
                jjwd: [
                    {
                        required: true,
                        message: "请填写金属温度"
                    }
                ]
            }
        };
    },
    computed: {
        dxwd() {
            return this.formAdd.dxwd;
        },
        dxjjwc() {
            return this.formAdd.jjwd;
        }
    },
    watch: {
        dxwd(nval) {
            console.log(nval, "nval导线温度");
            this.formAdd.dxjjwc = Math.abs(
                Number(this.formAdd.dxwd) - Number(this.formAdd.jjwd)
            );
        },
        dxjjwc(nval) {
            console.log(nval, "nval导线温度");
            this.formAdd.dxjjwc = Math.abs(
                Number(this.formAdd.dxwd) - Number(this.formAdd.jjwd)
            );
        },
        lastRecord: {
            handler(nval) {
                this.form = nval;
            },
            deep: true
        }
    },
    created() {
        this._getCWD();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        add() {
            this.show = true;
        },
        goback() {
            this.show = false;
            this.formAdd = {
                cwdlx: "",
                dxwd: 0,
                jjwd: 0,
                dxjjwc: 0
            };
        },
        //获取测温点
        _getCWD() {
            this.$store.dispatch("getList", "CWDWZ").then((res) => {
                console.log(res, "测温点");
                this.CWDWZ = res;
            });
        },
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    // this.formAdd.twrId = this.details.id;
                    console.log(this.form, "form");
                    this.form.hwcwwdjluItems.push(this.formAdd);
                    this.goback();
                }
            });
        },
        getForm(kinds) {
            if (kinds == "hwcw") {
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
</style>

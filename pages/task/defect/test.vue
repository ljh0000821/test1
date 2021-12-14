<template>
    <view>
        <custom-navbar title="新缺陷" iconLeft></custom-navbar>
        <view class="main-box">
            <u-cell-group :border="false">
                <u-cell-item icon="setting-fill" title="个人设置" :arrow="false">
                    <view slot="right-icon">
                        <u-input type="select" placeholder="请选择" input-align="right" />
                    </view>
                </u-cell-item>
                <u-cell-item icon="integral-fill" title="会员等级" value="新版本" :arrow="false"></u-cell-item>
            </u-cell-group>
        </view>
        <view class="main-box">
            <efListItem leftname="巡视线路" />
            <!-- <u-form :model="form" ref="uForm">
                <u-form-item prop="name" :border-bottom="false">
                    <u-cell-item icon="setting-fill" title="个人设置" :arrow="false" @click="showaa">
                        <view slot="right-icon">
                            <u-input v-model="form.name" placeholder="请选择" input-align="right" />
                        </view>
                        <u-picker mode="selector" :range="data" v-model="show" @confirm="confirm"></u-picker>
                    </u-cell-item>
                </u-form-item>
                <u-form-item label="简介" prop="intro">
                    <u-input v-model="form.intro" />
                </u-form-item>
            </u-form>
            <u-button @click="submit">提交</u-button> -->
            <view>
                图片：
                <choose-image />
            </view>
            <view>
                视频：
                <choose-video />
            </view>
            <view>
                音频：
                <m-recorder voicePath="" :maxTime="15" :minTime="3" @okClick="saveRecord">
                    <view class="centerwz">录制语音</view>
                </m-recorder>
            </view>

            <!-- field -->
            <!-- <view class="">
                <u-field @click="showAction" v-model="sex" :disabled="true" label="性别" placeholder="请选择性别" right-icon="arrow-down-fill">
                </u-field>
                <u-action-sheet @click="clickItem" :list="sexList" v-model="show"></u-action-sheet>
            </view> -->
            <efListItem leftname="巡视类型" @click="openShowList">
                <template v-slot:right>
                    <!-- {{form.test}} -->
                    <efActionSheet ref="_efActionSheet" :data="QXZT" v-model="form.test" @change="data=>form.id=data.text" label="dictValue" id="dictKey" />
                </template>
            </efListItem>
            {{form.test}}|{{form.id}}
        </view>
    </view>
</template>

<script>
import { efListItem, efActionSheet } from "@/components/ef-ui";
export default {
    components: {
        efListItem,
        efActionSheet
    },
    data() {
        return {
            QXZT: [],
            value: "",
            show: false,
            data1: [],
            test: 0,
            form: {
                id: "",
                test: "test",
                name: "",
                intro: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        // 可以单个或者同时写两个触发验证方式
                        trigger: ["change", "blur"]
                    }
                ],
                intro: [
                    {
                        required: true,
                        type: "email",
                        message: "简介不能少于5个字",
                        trigger: ["change", "blur"]
                    }
                ]
            },

            sex: "",
            sexList: [
                {
                    text: "男"
                },
                {
                    text: "女"
                },
                {
                    text: "保密"
                }
            ],
            list: [
                {
                    text: "一级风险",
                    oID: "1"
                },
                {
                    text: "二级风险",
                    oID: "12"
                },
                {
                    text: "三级风险",
                    oID: "123"
                }
            ]
        };
    },
    mounted() {
        this.data1 = this.list;
        this.$store.dispatch("getList", "QXZT").then((res) => {
            console.log(res, "缺陷状态");

            this.QXZT = res;
        });
    },
    methods: {
        //打开list列表
        openShowList() {
            this.$refs._efActionSheet.show();
        },
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log("验证通过");
                } else {
                    console.log("验证失败");
                }
            });
        },
        confirm(data) {
            console.log(data);
            this.$nextTick(() => {
                this.form.name = this.data[0];
            });
        },
        showaa() {
            this.show = true;
        },
        showAction() {
            this.show = true;
        },
        clickItem(index) {
            this.sex = this.sexList[index].text;
        }
    }
};
</script>

<style lang="scss" scoped>
.u-icon__icon .uicon-arrow-down-fill .u-iconfont {
    color: red !important;
}

.main-box {
    margin: 0 16rpx;
    padding: 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    box-sizing: border-box;
}
</style>

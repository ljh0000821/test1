<template>
    <view class="box">
        <view class="flex-around form-group">
            <view class="">
                <u-form :model="form" ref="uForm" :error-type="['toast']">
                    <u-form-item prop="name" :border-bottom="false">
                        <u-input v-model="form.name" :clearable="false" placeholder="输入姓名" />
                    </u-form-item>
                    <u-form-item prop="phone" :border-bottom="false">
                        <u-input v-model="form.phone" :clearable="false" placeholder="输入手机号" />
                    </u-form-item>
                </u-form>
            </view>
            <view>
                <u-button shape="circle" type="success" @click="add">添加</u-button>
            </view>
        </view>
        <view>
            <view class="flex-around" v-for="(item,index) in list" :key="index">
                <view>{{item.name}}</view>
                <view>{{item.phone}}</view>
                <view>
                    <u-icon name="minus-circle" color="red" size="40" @click="delItem(index)"></u-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: "",
                phone: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请填写姓名"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请填写手机号"
                    },
                    {
                        type: "number",
                        message: "手机号只能为数字",
                        trigger: "change"
                    }
                ]
            },
            list: []
        };
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        init() {
            this.form.name = "";
            this.form.phone = "";
            this.list = [];
        },
        add() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log(this.form, "form");
                    this.list.push(this.form);
                    this.form = {
                        name: "",
                        phone: ""
                    };
                } else {
                    console.log("验证失败");
                }
            });
        },
        delItem(index) {
            this.list.splice(index, 1);
        },
        sure() {
            if (this.list.length === 0) {
                if (this.form.name != "" && this.form.phone != "") {
                    this.list.push(this.form);
                    this.form = {
                        name: "",
                        phone: ""
                    };
                } else {
                    this.init();
                    return;
                }
            }
            let str = "";
            this.list.forEach((item, index) => {
                str += `${item.name}:${item.phone}${
                    index + 1 != this.list.length ? "," : ""
                }`;
            });
            console.log(str, "str");
            this.$emit("change", str);
            this.init();
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/.u-input__input {
    padding-left: 16rpx;
}
</style>

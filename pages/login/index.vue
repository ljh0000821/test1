<template>
    <view class="login">
        <view class="welcome"><text>欢迎您！</text></view>
        <image class="user_img" src="../../static/login/user_img.png"></image>
        <view class="login_bar" v-show="!autoLogin">
            <view class="area">
                <text class="labe">账号</text>
                <view class="input">
                    <u-input v-model="form.username" type="text" height="50" placeholder="请输入账号" />
                </view>
            </view>
            <view class="area">
                <text class="labe">密码</text>
                <view class="input">
                    <u-input v-model="form.password" type="password" height="50" password-icon placeholder="请输入密码" />
                </view>
            </view>
            <view class="check">
                <u-checkbox v-model="check" @change="check=!check" active-color="#05B2CC" size="24">记住密码</u-checkbox>
            </view>
            <u-button class="login_btn" type="primary" ripple @click="login" :loading="loading">登录</u-button>
            <view class="flex-between forget">
                <image src="../../static/login/xz_left.png" mode="aspectFit"></image>
                <text class="forget_text"></text>
                <image src="../../static/login/xz_right.png" mode="aspectFit"></image>
            </view>
        </view>
    </view>
</template>

<script>
import { tmf_ready } from "@/common/demo.js";
import { Base64 } from "@/utils/tools";
import { setCookie, getCookie, getCookieA, delCookie } from "@/utils/cookies";
import { removeStore } from "@/utils/store.js";
import { accountLogin } from "@/api/user";
import JSEncrypt from "@/js_sdk/jsencrypt-Rsa/jsencrypt/jsencrypt.min.js";
const publicKey =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDr+ES+aJ52VgpNtkMH7E3G7yrq+77Hi23oWzh/9j3QElEE5G9XH2fBHcK4rDvr2uUcFcdL9aqdFSWJrBMpY8g+hAJER9vKI8oGXrtS5yKJqme2w85/igKhHOiV39TN8R2id+lTDWQzKO3W/f3rr0IzE50A8bCPEi0F5tyByBozSwIDAQAB";
const encryptedData = (data) => {
    let encryptor = new JSEncrypt();
    // 设置公钥
    encryptor.setPublicKey(publicKey);
    // 加密数据
    return encryptor.encrypt(data);
};
export default {
    data() {
        return {
            check: false,
            autoLogin: false,
            form: {
                tenantId: "000000",
                username: "",
                password: "",
                grant_type: "password",
                scope: "all",
                type: "account"
            },
            loading: false
        };
    },
    created() {
        console.log("登录页");
        console.log(document.cookie,"document.cookie6666");
        // // 在页面加载时从cookie获取登录信息
        // let username = getCookie("username");
        // let base64 = new Base64();
        // let password = base64.decode(getCookie("password"));
        // // 如果存在赋值给表单，并且将记住密码勾选
        // if (username) {
        //     this.form.username = username;
        //     this.form.password = password;
        //     this.check = true;
        // }
    },
    mounted() {
        this.emptyInfo();
        // uap.ready(function () {
        //     //页面加载完的直接调用的方法
        //     console.log("jweixin加载完成");
        // });
        // if (process.env.PRODUCTION != "IGWPRO") {
        //     this.form.username = "wangys001";
        //     this.form.password = "cqsd123456!";
        // }

        //智能运检免登录
        let username =
            getCookieA("zhyj_Code") || uni.getStorageSync("efuserName");
        if (uni.getStorageSync("efuserName") == "") {
            uni.setStorageSync("efuserName", username);
        }
        let iscName = getCookieA("isc_name") || uni.getStorageSync("efiscName");
        if (uni.getStorageSync("efiscName") == "") {
            uni.setStorageSync("efiscName", iscName);
        }
        // let username = getCookieA("zhyj_Code");
        // let iscName = getCookieA("isc_name");
        console.log(username, "username");
        console.log(iscName, "iscName");
        delCookie();
        if (username != "") {
            this.autoLogin = true;
            //根据用户名进行免登录
            this.$store
                .dispatch("accountLogin", {
                    account: username,
                    name: iscName
                })
                .then(() => {
                    removeStore("guidanceIds");
                    uni.switchTab({
                        url: "../task/index/index"
                    });
                })
                .catch(() => {
                    this.autoLogin = false;
                });
        }
    },
    methods: {
        emptyInfo() {
            removeStore("token", true);
            removeStore("userInfo", true);
        },
        login() {
            if (!this.form.username || !this.form.password) {
                this.$u.toast("请输入用户名和密码！");
                return;
            }
            this.loading = true;
            this.$store
                .dispatch("login", {
                    ...this.form,
                    password: encryptedData(this.form.password)
                })
                .then(() => {
                    this.loading = false;
                    this.setUserInfo();
                    delCookie();
                    removeStore("guidanceIds");
                    uni.switchTab({
                        url: "../task/index/index"
                    });
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        setUserInfo() {
            // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
            // 如果没有勾选，储存的信息为空
            if (this.check) {
                let base64 = new Base64();
                setCookie("username", this.form.username);
                setCookie("password", base64.encode(this.form.password));
            } else {
                setCookie("username", "");
                setCookie("password", "");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 1334rpx;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background: url(../../static/login/bg_img.png) no-repeat;
    background-size: 100% 100%;
    background-position-y: -170rpx;
}
.welcome {
    position: fixed;
    top: 148rpx;
    width: 100%;
    left: 0;
    font-size: 60rpx;
    font-family: PingFang SC;
    font-weight: 800;
    color: #ffffff;
    text-align: center;
}

.user_img {
    position: fixed;
    width: 152rpx;
    height: 152rpx;
    top: 258rpx;
    right: 90rpx;
}

.login_bar {
    width: 100%;
    position: fixed;
    // bottom: 216rpx;
    top: 36%;
    padding: 0 166rpx;
    .area {
        margin-top: 66rpx;
        font-size: 30rpx;

        .labe {
            font-weight: 600;
            font-family: PingFang SC;
        }
    }

    .input {
        background-color: rgba(221, 228, 242, 0.7);
        border-radius: 5rpx;
        margin-top: 28rpx;
        border-bottom: 2rpx solid #999;
    }

    .login_btn {
        margin-top: 78rpx;
        background-color: $uni-color-primary;
    }

    .check {
        margin-top: 10rpx;
    }
}

.forget {
    margin-top: 24rpx;

    image {
        width: 170rpx;
        height: 10rpx;
    }

    .forget_text {
        width: 80rpx;
        text-align: center;
        margin: 0 20rpx;
    }
}
</style>

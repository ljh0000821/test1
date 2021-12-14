<template>
    <view>
        <u-mask :show="show" :mask-click-able="false">
            <view class="content">
                <view class="nav align-center">
                    <text class="close" @click="close">×</text>
                    <text class="m-l-16">环境</text>
                </view>
                <view class="container">
                    <view class="info-group flex-between">
                        <view class="align-center">
                            <img class="address-img" src="@/static/common/ic_city_tag.png" alt="">
                            <text>{{form.province||''}} {{form.reportTime||''}}</text>
                        </view>
                        <img class="refresh-img" src="@/static/common/ic_refresh.png" alt="" @click="getWeather">
                    </view>
                    <view class="info-item-group">
                        <view class="info-item">
                            <view class="flex-column lr-box">
                                <img class="info-img" src="@/static/common/ic_env_weather.png" alt="">
                                <text class="m-t-8">天气</text>
                            </view>
                            <view class="input-box flex1">
                                <efItem :data="weathers" name="dictValue" id="dictKey" v-model="form.weather" type="select" :fontColor="'#00B5D0'" :isRightIcon="false" textCenter />
                            </view>
                            <view class="r-box m-l-16"></view>
                        </view>
                        <view class="info-item">
                            <view class="flex-column lr-box">
                                <img class="info-img" src="@/static/common/ic_env_temp.png" alt="">
                                <text class="m-t-8">温度</text>
                            </view>
                            <view class="input-box flex1">
                                <efItem type="number" v-model="form.temperature" :fontColor="'#FF8B44'" :isRightIcon="false" placeholder="请输入" textCenter />
                            </view>
                            <view class="r-box m-l-16">℃</view>
                        </view>
                        <view class="info-item">
                            <view class="flex-column lr-box">
                                <img class="info-img" src="@/static/common/ic_env_hum.png" alt="">
                                <text class="m-t-8">湿度</text>
                            </view>
                            <view class="input-box flex1">
                                <efItem type="number" v-model="form.humidity" :fontColor="'#7243FF'" :isRightIcon="false" placeholder="请输入" textCenter />
                            </view>
                            <view class="r-box m-l-16">%</view>
                        </view>
                        <view class="info-item">
                            <view class="flex-column lr-box">
                                <img class="info-img" src="@/static/common/ic_env_wind.png" alt="">
                                <text class="m-t-8">风速</text>
                            </view>
                            <view class="input-box flex1">
                                <efItem type="number" v-model="form.windPower" :fontColor="'#0094FF'" :isRightIcon="false" placeholder="请输入" textCenter />
                            </view>
                            <view class="r-box m-l-16">级</view>
                        </view>
                    </view>
                </view>
                <u-button class="btn" :loading="loading" type="primary" ripple @click="_envmSaveOrUpdate">确定</u-button>
            </view>
        </u-mask>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { getLocation } from "@/utils/igwFn";
import { getStore } from "@/utils/store.js";
import { envmSaveOrUpdate } from "@/api/envm/index";
export default {
    props: {
        details: {}
    },
    components: {
        efItem
    },
    data() {
        return {
            weathers: [],
            form: {
                province:"",
                temperature:"",
                reportTime:"",
                weather:"",
                windPower:"",
                humidity:""
            },
            show: false,
            loading: false
        };
    },
    mounted() {
        this.getWeather();
        this.getTypes();
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        getWeather() {
            // getLocation().then((res) => {
            //     console.log(res, "定位天气");
            //     let weather = new AMap.Weather();
            //     weather.getLive(res.addressComponent.adcode, (err, data) => {
            //         console.log(err, "err");
            //         console.log(data, "data");
            //         this.form = data;
            //     });
            // });
            uni.request({
                url: "http://wthrcdn.etouch.cn/weather_mini?city=重庆",
                method: "GET",
                success: (res) => {
                    let rel = res.data.data;
                    this.form.temperature = rel.wendu;
                    this.form.province = rel.city;

                    if (rel.forecast.length > 0) {
                        this.form.reportTime = rel.forecast[0].date;
                        this.form.weather = rel.forecast[0].type;
                        this.form.windPower = rel.forecast[0].fengli.replace(
                            /[^0-9]/gi,
                            ""
                        );
                    }
                },
                fail: () => {
                    this.openmsg("警告", "天气接口获取失败");
                },
                complete: () => {}
            });
        },
        getTypes() {
            this.$store.dispatch("getList", "weather").then((res) => {
                this.weathers = res;
            });
        },
        _envmSaveOrUpdate() {
            this.loading = true;
            let usrInfo = getStore("userInfo");
            let params = {
                humidity: this.form.humidity,
                notesDate: this.form.reportTime,
                notesUser: usrInfo.user_id, //记录人员id
                taskId: this.details.taskId, //任务编码
                taskItemId: this.details.id, //子任务编码
                temperature: this.form.temperature, //温度
                weather: this.form.weather,
                wind: this.form.windPower
            };
            envmSaveOrUpdate(params)
                .then(() => {
                    this.$u.toast("已保存");
                    this.loading = false;
                    this.show = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #30495e;
    padding: 24rpx;
}
.nav {
    font-size: 32rpx;
    color: #fff;
    margin: 24rpx 0;
}
.close {
    font-size: 48rpx;
    margin-top: -8rpx;
}
.address-img {
    height: 50rpx;
}
.refresh-img {
    width: 32rpx;
}
.info-group {
    padding: 8rpx 0;
    border-bottom: 1px solid #dde4f2;
}
.info-item-group {
    padding: 24rpx 0;
}
.info-item {
    margin: 24rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.info-img {
    width: 64rpx;
}
.lr-box {
    width: 100rpx;
}
.r-box {
    width: 60rpx;
}
.input-box {
    height: 80rpx;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16rpx;
}
.btn {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: $base-green;
    font-size: 24rpx;
}
</style>

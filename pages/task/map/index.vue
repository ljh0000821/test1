<template>
    <view>
        <custom-navbar iconLeft :backNum="backNum">
            <template v-if="details.testType!='3'">
                <view slot="left" class="meun-content flex-center">
                    <view class="meun" v-for="(item,index) in ['地图','列表']" :key="index" :class="{active:index==active}" @click="meunChange({index})">{{item}}</view>
                    <view class="bottom-silde" :style="{'margin-left':active*88 + 'rpx'}"></view>
                </view>
            </template>
            <template v-if="details.testType=='3'">
                <view slot="left" class="meun-content flex-center">
                    交叉跨越检测
                </view>
            </template>
            <template v-slot:right v-if="['0','1','2'].indexOf(details.itemState)>-1">
                <view class="top-right-content">
                    <view class="flex-column m-l-24" @click="toWeather">
                        <img style="margin-top:16rpx;" src="@/static/common/btn_weather_note.png" alt="">
                        <view style="margin-top:-30rpx;">天气</view>
                    </view>
                    <template v-if="['0','1','2'].indexOf(type)>-1">
                        <view class="flex-column m-l-24" @click="showConfirm">
                            <img style="margin-top:16rpx;" src="@/static/common/sure.png" alt="">
                            <view style="margin-top:-30rpx;">完成</view>
                        </view>
                    </template>
                </view>
            </template>
        </custom-navbar>
        <view class="content">
            <Map ref="_Map" v-show="active==0" :id="id" :taskId="taskId" :type="type" :details="details" @changActive="meunChange" />
            <TowerList v-show="active==1" @changActive="meunChange" :id="id" :taskId="taskId" :type="type" :details="details" />
        </view>
        <template v-if="JSON.stringify(details)!='{}'&&details.itemState!='3'">
            <Weather ref="Weather" :details="details" />
            <Confirm ref="Confirm" :details="details" :type="type" @complete="changeState" />
        </template>
    </view>
</template>

<script>
import TowerList from "./components/towerList.vue";
import Map from "./components/map.vue";
import Weather from "./components/Weathe";
import Confirm from "./components/Confirm";
import { taskitemDetail } from "@/api/task";
import { taskhaulitemDetail } from "@/api/overhaul/index";
export default {
    components: {
        TowerList,
        Map,
        Weather,
        Confirm
    },
    data() {
        return {
            backNum: 1,
            id: "",
            taskId: "",
            type: 0, //0巡视 1检测 2检修 3验收
            active: 1,
            details: {}
        };
    },
    watch: {
        type(nval) {
            this.backNum = nval == 0 ? 2 : 1;
        }
    },
    onLoad(options) {
        console.log(options, "options");
        this.id = options.id;
        this.taskId = options.taskId;
        this.type = options.type;
    },
    onShow() {
        this.getDetails();
    },
    methods: {
        getDetails() {
            if (["0", "1"].indexOf(this.type) > -1) {
                this._taskitemDetail();
            }
            if (["2"].indexOf(this.type) > -1) {
                this._taskhaulitemDetail();
            }
        },
        meunChange(obj) {
            console.log(obj, "obj");
            this.active = obj.index;
            obj.center && this.$refs._Map.$refs.efMap.toLocal(obj.center);
        },
        //跳转天气
        toWeather() {
            this.$refs.Weather.open();
        },
        //完成提示
        showConfirm() {
            this.$refs.Confirm.open();
        },
        //获取巡视任务详情
        _taskitemDetail() {
            taskitemDetail({ id: this.id }).then((res) => {
                let invTwrVOList = res.data.data.invTwrVOList;
                invTwrVOList.map((item) => {
                    item.id = item.psrId;
                });
                this.details = res.data.data;
            });
        },
        //检修详情
        _taskhaulitemDetail() {
            taskhaulitemDetail({ id: this.id }).then((res) => {
                this.details = res.data.data;
            });
        },
        changeState() {
            this.details.itemState = 3;
        }
    }
};
</script>

<style lang="scss" scoped>
.meun-content {
    position: relative;
    height: 60rpx;
    margin-right: 10rpx;
    .meun {
        width: 80rpx;
        color: #30495e;
        font-size: 28rpx;
        margin-right: 10rpx;
        font-weight: 700;
        text-align: center;
    }
    .active {
        font-size: 36rpx;
    }
    .bottom-silde {
        width: 24rpx;
        height: 3rpx;
        background: #30495e;
        border-radius: 1rpx;
        position: absolute;
        bottom: 0;
        left: 28rpx;
        transition: 500ms;
    }
}
.content {
    height: calc(100vh - 88rpx);
    position: relative;
}
.top-right {
    width: 300rpx;
    height: 60rpx;
    background-color: green;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2000;
}
.top-right-content {
    // width: 100%;
    // height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20rpx;
    z-index: 2000;
    img {
        width: 30rpx;
        height: 30rpx;
        background-color: #fff;
        border-radius: 50%;
    }
}
</style>

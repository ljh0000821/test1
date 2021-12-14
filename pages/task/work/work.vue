<template>
    <view>
        <custom-navbar title="作业指导卡" iconLeft></custom-navbar>
        <view class="container">
            <view class="title">一、线路本体</view>
            <view>
                1.基础与地面。回填土下沉或缺土、水淹、冻胀、堆积杂物等<br />
                2.杆塔基础。破损、酥松、裂纹、漏筋、基础下沉、保护帽破损、边坡保护不够等<br />
                3.杆塔。杆塔倾斜、主材弯曲、地线支架变形、塔材、螺栓丢失、严重锈蚀、脚钉缺失、爬梯变形、土埋塔脚等;混凝土杆未封顶、破损、裂纹等<br />
                4.接地装置。断裂、严重锈蚀、螺栓松脱、接地带丢失、接地带外露、接地带连接部位有雷电烧痕等<br />
                5.拉线及基础。拉线金具等被拆卸、拉线棒严重锈蚀或蚀损、拉线松弛、断股、严重锈蚀、基础回填土下沉或缺土等<br />
                6.绝缘子。伞裙破损、严重污秽、有放电痕迹、弹簧销缺损、钢帽裂纹、断裂、钢脚严重锈蚀或蚀损、绝缘子串顺线路方向倾角大于7.5°或300mm<br />
                7.导线、地线、引流线、屏蔽线、OPGW。散股、断股、损伤、断线、放电烧伤、导线接头部位过热、悬挂漂浮物、弧垂过大或过小、严重锈蚀、有电晕现象、导线缠绕(混线)、覆冰、舞动、风偏过大、对交叉跨越物距离不够等<br />
                8.拉线金具。线夹断裂、裂纹、磨损、销钉脱落或严重锈蚀;均压环、屏蔽环烧伤、螺栓松动;防振锤跑位、脱落、严重锈蚀、阻尼线变形、烧伤;间隔棒松脱、变形或离位;各种连板、连接环、调整板损伤裂纹等<br />
            </view>
            <view class="title">二、附属设施</view>
            <view>
                1.防雷装置。避雷器动作异常、计数器失效、破损、变形、引线松脱;放电间隙变化、烧伤等<br />
                2.防鸟装置。固定式:破损、变形、螺栓松脱;活动式:动作失灵、褪色、破损;电子、光波、声响式:供电装置失效或功能失效、损坏等<br />
                3.各种监测装置。缺失、损坏、功能失效等<br />
                4.杆号、警告、防护、指示、相位等标识。缺失、损坏、字迹或颜色不清、严重锈蚀等<br />
                5.航空警示器材。高塔警示灯、跨江线彩球缺失、损坏、失灵<br />
                6.防舞防冰装置。缺失、损坏等<br />
                7. ADSS光缆。损坏、断裂、驰度变化等<br />
            </view>
            <u-button class="going" type="primary" ripple v-if="times>0">开始巡视({{times}}s)</u-button>
            <u-button class="going" type="primary" ripple v-else @click="going" style="background-color:#05B2CC;">开始巡视</u-button>
        </view>

    </view>
</template>

<script>
import { setStore, getStore } from "@/utils/store.js";
export default {
    data() {
        return {
            times: 1,
            id: "",
            taskId: "",
            type: ""
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.taskId = options.taskId;
        this.type = options.type;
        this.getInfo(this.id);
        this.changeTimes();
    },
    methods: {
        going() {
            uni.navigateTo({
                url:
                    "pages/task/map/index?id=" +
                    this.id +
                    "&taskId=" +
                    this.taskId +
                    "&type=" +
                    this.type
            });
            let str = getStore("guidanceIds") || "";
            let ids = str.split(",");
            if (ids.indexOf(this.id) == -1) {
                ids.push(this.id);
                setStore("guidanceIds", ids.join(","));
            }
        },
        changeTimes() {
            setTimeout(() => {
                this.times--;
                if (this.times > 0) this.changeTimes();
            }, 1000);
        },
        getInfo(id) {
            let str = getStore("guidanceIds") || "";
            let ids = str.split(",");
            if (ids.indexOf(id) > -1) {
                uni.navigateTo({
                    url:
                        "pages/task/map/index?id=" +
                        this.id +
                        "&taskId=" +
                        this.taskId +
                        "&type=" +
                        this.type
                });
                return;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin: 28rpx 16rpx;
    height: 88vh;
    overflow-y: auto;
    font-size: 24rpx;
    font-weight: 500;
    color: #30495e;
    line-height: 19px;
    .title {
        margin: 10rpx 0;
        font-weight: 700;
    }
}
.going {
    width: 200rpx;
    height: 60rpx;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 50rpx;
    background-color: #6d7278;
    font-size: 24rpx;
}
</style>

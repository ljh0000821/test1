<template>
    <view>
        <view :style="{'width':width,}" :class="['flex-center','select-btn',{'active-btn':text?true:false}]" @click="openShowList">
            <view class="flex1 text-center text-ellipsis flex-center ">
                <template>
                    <view class="flex1 text-ellipsis">{{text||placeholder}}</view>
                    <template v-if="type==='select'">
                        <u-action-sheet style="color:#000" :list="data" :activeValue="activeValue" v-model="show" :cancel-btn="false" safe-area-inset-bottom @click="change"></u-action-sheet>
                    </template>
                    <template v-if="type==='lines'">
                        <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                            <baseLines @closed="show=false" :data="data" :activeValue="activeValue" @change="change" />
                        </u-popup>
                    </template>
                    <template v-if="type==='time'&&!multiple">
                        <efPpickerTime :multiple="multiple" v-model="show" @change="change" />
                    </template>
                    <template v-if="type==='time'&&multiple">
                        <date-range mode="date" :showMutibleDate="show" @change="change" @cancle="cancle"></date-range>
                    </template>
                    <template v-if="type==='towers'">
                        <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                            <baseTowers @closed="show=false" :data="data" :activeArr="activeArr" needClear @change="change" />
                        </u-popup>
                    </template>
                    <!-- <view v-if="activeType==='towers'">
                        <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                            <baseTowers ref="towers" @closed="show=false" :multiple="multiple" :data="data" @change="change" />
                        </u-popup>
                    </view> -->
                </template>
                <!-- <template v-else>
                    <view class="flex1 text-ellipsis">{{placeholder}}</view>
                </template> -->
            </view>
        </view>
    </view>
</template>

<script>
import baseLines from "@/components/base/baseLines.vue";
import efPpickerTime from "../ef-picker-time/ef-picker-time.vue";
import baseTowers from "../../base/baseTowers.vue";
import dateRange from "components/zxp-datepickerRange/zxp-datepickerRange.vue";
export default {
    name: "ef-select-btn",
    components: {
        baseTowers,
        baseLines,
        efPpickerTime,
        dateRange
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: "label"
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        label: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: "id"
        },
        width: {
            type: String,
            default: "100rpx"
        },
        //是否开启多选
        multiple: {
            type: Boolean,
            default: false
        },
        require: {
            default: ""
        },
        errMessage: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            text: "",
            value: "",
            show: false,
            clickData: null,
            activeValue: "",
            activeArr: []
        };
    },
    watch: {
        show(nval) {
            if (nval && this.type === "select") {
                this.data.map((item) => {
                    if (!item.text && this.label) {
                        item.text = item[this.label];
                    }
                    return item;
                });
            }
        }
    },
    methods: {
        init() {
            this.text = "";
            this.clickData = null;
        },
        //打开list列表
        openShowList() {
            if (!this.require && this.errMessage) {
                return this.$u.toast(this.errMessage);
            }
            this.show = true;
        },
        change(data) {
            if (
                this.clickData == data ||
                (this.type == "towers" && data.length == 0)
            ) {
                this.clickData = null;
                this.text = "";
                this.activeValue = "";
                this.$emit("change", {});
                this.show = false;
                return;
            }
            this.clickData = data;
            this.show = false;
            switch (this.type) {
                case "select":
                    this.text = this.data[data].text;
                    this.activeValue = this.data[data][this.id];
                    this.$emit("change", this.data[data]);
                    return;
                case "lines":
                    data.id = data.psrId;
                    this.activeValue = data.id;
                    this.text = data.name;
                    this.$emit("change", data);
                    return;
                case "towers":
                    if (data.length === 0) {
                        this.$emit("change", {});
                        return;
                    }
                    this.activeArr = data;
                    this.text = data[0].twrCode;
                    this.$emit("change", data[0]);
                    return;
                case "time":
                    if (this.multiple) {
                        this.text = data[0]
                            ? data[0].slice(0, 10) + "-" + data[1].slice(0, 10)
                            : "";
                    } else {
                        this.text = data;
                    }
                    this.$emit("change", data);
                    return;
                default:
                    return;
            }
        },
        cancle() {
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.select-btn {
    // width: 130rpx;
    height: 50rpx;
    border: 1px solid #33485b;
    border-radius: 26rpx;
    padding: 0 16rpx;
    font-size: 26rpx;
}

.active-btn {
    border: none;
    background-color: #05b2cc;
    color: #fff;
}
// .u-popup {
//     /deep/ .uni-scroll-view,
//     .uni-scroll-view-content {
//         background-color: #30495e;
//     }
// }
</style>

<template>
    <view class="list-item" :class="{position:position}">
        <view class="list-item-li" :style="{'justify-content':textCenter?'center':'flex-end'}" @click="showModal">
            <slot name="right"></slot>
            <view :class="['lable','flex1',{'text-ellipsis':unit?true:false}]" :style="{'color':fontColor?fontColor:'#30495e'}" v-if="isRightLabel" @click.stop="showWrite">
                <template v-if="(type!=='time'||(type=='time'&&multiple))&&value">{{value}}</template>
                <template v-if="type=='time'&&!multiple">{{value|sliceTime}}</template>
                <text v-show="!value&&type!='label'&&type!='combox'" class="planhold">{{placeholder}}</text>
            </view>
            <!-- 单位 -->
            <template v-if="unit">
                <view class="unit">{{unit}}</view>
            </template>
            <!-- 三角 -->
            <view class="p-16" v-if="isRightIcon&&type!=='label'">
                <view class="sanjiao-down"></view>
            </view>
        </view>
        <view v-if="activeType==='lines'">
            <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                <baseLines @closed="show=false" :show="show" :data="data" :activeValue="activeValue" @change="change" />
            </u-popup>
        </view>
        <view v-if="activeType==='people'">
            <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                <basePeople @closed="show=false" :data="data" :activeValue="activeValue" :defaultValue="defaultValue" @change="change" :multiple="multiple" />
            </u-popup>
        </view>
        <view v-if="activeType==='towers'">
            <u-popup v-model="show" mode="bottom" length="100%" class="u-popup">
                <baseTowers ref="towers" @closed="show=false" :multiple="multiple" :data="data" @change="change" />
            </u-popup>
        </view>
        <view v-if="activeType==='select'">
            <u-action-sheet style="color:#000" :list="data" :id="id" :activeValue="activeValue" :multiple="multiple" v-model="show" :cancel-btn="false" safe-area-inset-bottom @click="change"></u-action-sheet>
        </view>
        <template v-if="type==='time'&&!multiple">
            <efPpickerTime v-model="show" :endDate="endTime" @change="change" @cancel="cancel" />
        </template>
        <template v-if="type==='time'&&multiple">
            <date-range mode="date" :endTime="endTime" :showMutibleDate="show" @change="change" @cancle="cancel"></date-range>
        </template>
        <view v-if="activeType==='textarea'">
            <u-modal v-model="show" mask-close-able :title="title" show-cancel-button confirm-text="确定" @confirm="change" @cancel="cancel" confirm-color="#333">
                <view class="slot-content">
                    <u-input placeholder="请输入" v-model="content" type="textarea" />
                </view>
            </u-modal>
        </view>
        <view v-if="activeType==='lxr'">
            <u-modal v-model="show" mask-close-able :title="title" show-cancel-button confirm-text="确定" @confirm="$refs.efLxr.sure" @cancel="$refs.efLxr.init()" confirm-color="#333">
                <view class="slot-content">
                    <efLxr ref="efLxr" @change="change" />
                </view>
            </u-modal>
        </view>
        <view v-if="type==='selectLinkage'">
            <u-select v-model="show" mode="mutil-column-auto" :title="title" :value-name="id" :label-name="name" :child-name="childName" :list="data" @confirm="change"></u-select>
        </view>
        <view v-if="type==='number'">
            <baseKeyBoard ref="baseKeyBoard" :show.sync="show" @change="change" />
        </view>
        <!-- combox选择 -->
        <template v-if="type==='combox'">
            <view @click="showModal">
                <combox ref="combox" :candidates="data" :placeholder="placeholder" @change="change" />
            </view>
        </template>
    </view>
</template>
<script>
import baseLines from "../../base/baseLines.vue";
import basePeople from "../../base/basePeople.vue";
import baseTowers from "../../base/baseTowers.vue";
import baseKeyBoard from "../../base/baseKeyBoard.vue";
import efPpickerTime from "../ef-picker-time/ef-picker-time.vue";
import efLxr from "../ef-lxr/ef-lxr.vue";
import combox from "../../uni-combox/uni-combox.vue";
import dateRange from "components/zxp-datepickerRange/zxp-datepickerRange.vue";
import { compareDate } from "@/utils/tools";
export default {
    components: {
        baseLines,
        basePeople,
        baseTowers,
        efPpickerTime,
        efLxr,
        baseKeyBoard,
        combox,
        dateRange
    },
    props: {
        value: {
            default: ""
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        isRightIcon: {
            type: Boolean,
            default: true
        },
        isRightLabel: {
            type: Boolean,
            default: true
        },
        fontColor: {
            type: String,
            default: ""
        },
        textCenter: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "label"
        },
        //接受的数据
        data: {
            type: Array,
            default: () => []
        },
        name: {
            type: String,
            default: "name"
        },
        id: {
            type: String,
            default: "id"
        },
        childName: {
            type: String,
            default: "children"
        },
        //是否开启多选
        multiple: {
            type: Boolean,
            default: false
        },
        //如果父组件 label-position为"top"  想和u-form-item 在同一水平上 需要把此组件position设为true
        position: {
            type: Boolean,
            default: false
        },
        require: {
            default: ""
        },
        errMessage: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        canWrite: {
            type: Boolean,
            default: false
        },
        defaultValue: {},
        unit: {
            type: String,
            default: ""
        },
        endTime: {
            type: String,
            default: "2100-12-31"
        }
    },
    data() {
        return {
            show: false,
            content: "",
            activeType: "",
            activeValue: ""
        };
    },
    watch: {
        show(nval) {
            if (!this.name) {
                return;
            }
            if (nval && this.activeType === "select") {
                this.data.map((item) => {
                    if (!item.text && this.name) {
                        item.text = item[this.name];
                    }
                    return item;
                });
            }
        }
    },
    methods: {
        init() {
            console.log("进这了");
            this.$refs[this.activeType]?.init();
        },
        //打开
        showModal() {
            if (this.activeType != this.type) {
                this.activeType = this.type;
            }
            console.log(this.activeType, "this.activeType");
            if (!this.require && this.errMessage) {
                return this.$u.toast(this.errMessage);
            }
            this.show = true;
        },
        //打开输入框
        showWrite() {
            if (!this.canWrite) return this.showModal();
            this.activeType = "textarea";
            if (!this.require && this.errMessage)
                return this.$u.toast(this.errMessage);
            this.show = true;
        },
        change(data) {
            this.show = false;
            switch (this.activeType) {
                case "select":
                    if (!this.multiple) {
                        console.log(data, "======");
                        this.$emit("update:modelId", this.data[data][this.id]);
                        this.$emit("change", this.data[data]);
                        this.activeValue = this.data[data][this.id];
                        this.$emit(
                            "input",
                            this.data[data][this.name],
                            this.data[data][this.id] + ""
                        );
                    } else {
                        let ids = [],
                            dataArr = [],
                            names = [];
                        this.data.forEach((item, index) => {
                            if (data.indexOf(index) > -1) {
                                ids.push(item[this.id]);
                                dataArr.push(item);
                                names.push(item[this.name]);
                            }
                        });
                        console.log(this.data, "this.data");
                        console.log(ids, "ids");
                        console.log(dataArr, "dataArr");
                        console.log(names, "names");
                        this.$emit("update:modelId", ids.toString());
                        this.$emit("change", dataArr);
                        this.$emit(
                            "input",
                            names.toString(),
                            ids.toString() + ""
                        );
                    }
                    return;
                case "time":
                    this.timeStr = "";
                    if (this.multiple) {
                        this.timeStr = data[0]
                            ? data[0].slice(0, 10).replace(/-/g, "/") +
                              "-" +
                              data[1].slice(0, 10).replace(/-/g, "/")
                            : "";
                    } else {
                        this.timeStr = data;
                    }
                    this.$emit("input", this.timeStr);
                    this.$emit("change", data);
                    return;
                case "textarea":
                    this.$emit("change", this.data);
                    this.$emit("input", this.content);
                    return this.cancel();
                case "lxr":
                    this.$emit("input", data);
                    return;
                case "number":
                    this.$emit("input", String(data));
                    return;
                case "combox":
                    this.$emit("change", data);
                    return;
                case "selectLinkage":
                    this.data.forEach((item) => {
                        if (item.fstPlt == data[0].label) {
                            item.data.forEach((v) => {
                                if (v.id == data[1].value) {
                                    data.push(v.unit);
                                }
                            });
                        }
                    });
                    this.$emit("input", data[1].label);
                    this.$emit("update:modelId", data[1].value);
                    this.$emit("change", data);
                    return;
                case "people":
                    if (this.multiple) {
                        this.$emit(
                            "update:modelId",
                            data.map((item) => item[this.id]).join(",")
                        );
                        return this.$emit(
                            "input",
                            data.map((item) => item[this.name]).join(","),
                            data.map((item) => item[this.id]).join(",")
                        );
                    }
                    this.$emit("update:modelId", data[this.id]);
                    return this.$emit("input", data[this.name], data[this.id]);
                case "towers":
                    if (this.multiple) {
                        return this.$emit("input", data);
                    } else {
                        if (data.length === 0) return;
                        this.$emit("update:modelId", data[0][this.id]);
                        this.$emit("input", data[0][this.name]);
                        this.$emit("change", data[0]);
                        return;
                    }
                case "lines":
                    this.$emit("change", data);
                    this.$emit("update:modelId", data.psrId);
                    return this.$emit("input", data[this.name], data[this.id]);
                default:
                    this.$emit("update:modelId", data[this.id]);
                    return this.$emit("input", data[this.name], data[this.id]);
            }
        },
        //模态框取消
        cancel() {
            this.show = false;
            this.content = "";
        }
    }
};
</script>
<style scoped lang="scss">
.list-item {
    width: 100%;
    position: relative;
    .list-item-li {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        z-index: 99;
    }
    .lable {
        padding-left: 16rpx;
        font-size: 24rpx;
        color: #30495e;
        // margin-right: 10px;
        text-align: right;
        line-height: 16px;
    }
    .planhold {
        font-size: 28rpx;
        color: rgb(192, 196, 204);
    }
}
.position {
    width: 100%;
    position: absolute;
    top: 20rpx;
}
//倒立三角形
.sanjiao-down {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #30495e;
    display: inline-block;
    position: relative;
    top: 3px;
    margin-left: 12rpx;
}
// .u-popup {
//     /deep/ .uni-scroll-view,
//     .uni-scroll-view-content {
//         background-color: #30495e;
//     }
// }
.slot-content {
    padding: 20rpx;
    box-sizing: border-box;
    margin: 20rpx 0;
    /deep/ .u-input {
        border: 1px solid #999;
        border-radius: 10rpx;
        .uni-textarea-textarea {
            padding: 0 20rpx;
            box-sizing: border-box;
        }
        .uni-textarea-placeholder {
            padding: 0 20rpx;
            box-sizing: border-box;
        }
    }
}
.p-16 {
    padding: 10rpx 0 10rpx 10rpx;
}
.unit {
    color: #97a4ae;
    margin-left: 8rpx;
    font-size: 24rpx;
}
</style>
<template>
    <view>
        <custom-navbar :title="testingTtile" iconLeft></custom-navbar>
        <view class="info-box">
            <baseHeader title="线路信息" bgColor="#000" />
            <view class="container">
                <LineForm ref="LineForm" :kinds="kinds" :type="type" :taskType="taskType" :details="details" :taskItemId="taskItemId" :lastRecord="lastRecord" :jckySelect="jckySelect" />
            </view>
            <baseHeader title="测量值" bgColor="#000">
                <template v-if="type=='details'&&kinds!='jcky'">
                    <u-button shape="circle" size="mini" @click="toHistorical">查看历史值</u-button>
                </template>
            </baseHeader>
            <template>
                <view v-show="kinds!=='jddz'" class="container">
                    <MeasureForm ref="MeasureForm" :kinds="kinds" :type="type" :lastRecord="lastRecord" />
                </view>
            </template>
            <!-- 温度 -->
            <template>
                <view v-show="kinds==='hwcw'" class="container" style="margin-top:24rpx;">
                    <Temperature ref="Temperature" :type="type" :details="details" :lastRecord="lastRecord" />
                </view>
            </template>
            <!-- 电阻测量值 -->
            <template>
                <view v-show="kinds==='jddz'" class="container">
                    <ResistanceForm ref="ResistanceForm" :type="type" :details="details" :lastRecord="lastRecord" />
                </view>
            </template>
            <!-- 其他值 -->
            <template>
                <view v-show="kinds==='jddz'" class="container" style="margin-top:24rpx;">
                    <OtherForm ref="OtherForm" :type="type" :kinds="kinds" :lastRecord="lastRecord" />
                </view>
            </template>
            <!-- 视频图片 -->
            <view class="container" style="margin-top:24rpx;">
                <ResourceForm ref="ResourceForm" :type="type" :lastRecord="lastRecord" />
            </view>
            <baseHeader title="人员信息" bgColor="#000" />
            <view class="container">
                <PersonForm ref="PersonForm" :type="type" :lastRecord="lastRecord" :details="details">
                    <u-button class="ef-btn-normal btn-primary" :loading="loading" v-if="type==='add'" shape="circle" ripple plain @click="submit">提交</u-button>
                </PersonForm>
            </view>
        </view>
    </view>
</template>

<script>
const title = {
    hwcw: "红外测温",
    jcky: "交叉跨越及对地距离测量",
    jddz: "接地电阻测量",
    fbgc: "覆冰观测"
};
const fn = {
    hwcw: (data) => tyjjcdlwhcwjlSubmit(data),
    jcky: (data) => tyjjcjckyjddjlcljlSubmit(data),
    jddz: (data) => tyjjcjddzcljlSubmit(data),
    fbgc: (data) => tyjjcdxblxfbgcjlSubmit(data)
};
import baseHeader from "@/components/base/baseHeader";
import ResourceForm from "./components/ResourceForm";
import PersonForm from "./components/PersonForm";
import LineForm from "./components/LineForm";
import MeasureForm from "./components/MeasureForm";
import Temperature from "./components/Temperature";
import OtherForm from "./components/OtherForm";
import ResistanceForm from "./components/ResistanceForm";
import { getTestByItemId, getTestByItemIdPage } from "@/api/task/index";
import { taskitemGetTestByTestId } from "@/api/testing";
import {
    tyjjcdlwhcwjlSubmit,
    tyjjcdxblxfbgcjlSubmit,
    tyjjcjddzcljlSubmit,
    tyjjcjckyjddjlcljlSubmit
} from "@/api/testing/index";
const kindsObj = {
    hwcw: 1,
    fbgc: 2,
    jcky: 3,
    jddz: 4
};
const apiFn = {
    getTestByItemIdPage: (data) => getTestByItemIdPage(data),
    taskitemGetTestByTestId: (data) => taskitemGetTestByTestId(data)
};
export default {
    components: {
        baseHeader,
        PersonForm,
        LineForm,
        ResourceForm,
        MeasureForm,
        Temperature,
        OtherForm,
        ResistanceForm
    },
    data() {
        return {
            jckySelect: "false",
            orgId: "",
            taskType: "", //0巡视 1检测 2检修 3验收
            loading: false,
            taskItemId: "",
            type: "add", //展示类型
            kinds: "", //检测类型
            info: {},
            details: {},
            records: [],
            lastRecord: {}
        };
    },
    computed: {
        testingTtile() {
            return title[this.kinds];
        }
    },
    onLoad(options) {
        console.log(options, "options--");
        this.taskItemId = options.taskItemId;
        this.type = options.type || "add";
        this.kinds = options.kinds;
        this.orgId = options.orgId || "";
        this.taskType = options.taskType;
        this.jckySelect = options.jckySelect || "false";
        this.info = JSON.parse(decodeURIComponent(options.info));
        console.log(this.info, "info66");
        console.log(this.info, "info");
        // if (this.type == "add" || this.taskType == 1) {
        //     // this._getTestByItemId();
        //     this._getTestByItemIdPage();
        // } else if (this.taskType == 0) {
        //     this._taskitemGetTestByTestId();
        // }
        this.getDetails();
    },
    methods: {
        toHistorical() {
            uni.navigateTo({
                url:
                    "pages/task/testing/historical?kinds=" +
                    this.kinds +
                    "&taskItemId=" +
                    this.taskItemId +
                    "&twrId=" +
                    this.info.id +
                    "&taskType=" +
                    this.taskType +
                    "&objId=" +
                    this.info.objId
            });
        },
        getDetails() {
            if (this.type == "add") {
                this.details = this.info;
                if (this.kinds == "jcky") {
                    this.details.jkqj =
                        this.details.twrL +
                        "-" +
                        this.details.twrL +
                        " " +
                        this.details.bkumc;
                }
                return;
            }
            let params = {},
                name = "";
            console.log("==========");
            if (this.taskType == 1) {
                params = {
                    index: String(kindsObj[this.kinds]),
                    twrId: this.info.id,
                    taskItemId: this.taskItemId
                };
                name = "getTestByItemIdPage";
            } else if (this.taskType == 0) {
                params = {
                    id: this.info.objId, //信息里的objid
                    index: String(kindsObj[this.kinds])
                };
                name = "taskitemGetTestByTestId";
            }
            apiFn[name](params).then((res) => {
                console.log(res, "检测当前值");
                if (this.kinds == "jcky") {
                    this.details = res.data.data.jckyZone
                        ? res.data.data.jckyZone
                        : this.details;
                    this.details.jkqj =
                        this.details.twrL +
                        "-" +
                        this.details.twrL +
                        " " +
                        this.details.bkumc;
                } else {
                    this.details = res.data.data.invTwr
                        ? res.data.data.invTwr
                        : this.details;
                }
                if (this.details.isTest == 0) return;
                let test = res.data.data.test.records
                    ? res.data.data.test.records
                    : [];
                this.type = "details";
                this.records = test.sort((a, b) => {
                    return (
                        new Date(b.gzsj).getTime() - new Date(a.gzsj).getTime()
                    );
                });
                this.lastRecord = this.records[0];
                console.log(this.lastRecord, "this.lastRecord");
            });
        },
        //巡视里获取任务详情
        // _taskitemGetTestByTestId() {
        //     let params = {
        //         id: this.info.objId, //信息里的objid
        //         index: kindsObj[this.kinds]
        //     };
        //     taskitemGetTestByTestId(params).then((res) => {
        //         console.log(res, "检测当前值");
        //         if (this.kinds == "jcky") {
        //             this.details = res.data.data.jckyZone
        //                 ? res.data.data.jckyZone
        //                 : this.details;
        //             this.details.jkqj =
        //                 this.details.twrL +
        //                 "-" +
        //                 this.details.twrL +
        //                 " " +
        //                 this.details.bkumc;
        //         } else {
        //             this.details = res.data.data.invTwr
        //                 ? res.data.data.invTwr
        //                 : this.details;
        //         }
        //         if (this.details.isTest == 0) return;
        //         let test = res.data.data.test.records
        //             ? res.data.data.test.records
        //             : [];
        //         this.type = "details";
        //         this.records = test.sort((a, b) => {
        //             return (
        //                 new Date(b.gzsj).getTime() - new Date(a.gzsj).getTime()
        //             );
        //         });
        //         this.lastRecord = this.records[0];
        //         console.log(this.lastRecord, "this.lastRecord");
        //     });
        // },
        //获取任务详情
        // _getTestByItemId() {
        //     let params = {
        //         // isNow: 1,//不传为当前
        //         twrId: this.info.id,
        //         taskItemId: this.taskItemId
        //     };
        //     getTestByItemId(params).then((res) => {
        //         console.log(res, "详情");
        //         if (this.kinds == "jcky") {
        //             this.details = res.data.data.jckyZone
        //                 ? res.data.data.jckyZone
        //                 : this.details;
        //             this.details.jkqj =
        //                 this.details.twrL +
        //                 "-" +
        //                 this.details.twrL +
        //                 " " +
        //                 this.details.bkumc;
        //         } else {
        //             this.details = res.data.data.invTwr
        //                 ? res.data.data.invTwr
        //                 : this.details;
        //         }
        //         if (this.details.isTest == 0) return;
        //         let test = res.data.data.test ? res.data.data.test : [];
        //         this.type = "details";
        //         this.records = test.sort((a, b) => {
        //             return (
        //                 new Date(b.gzsj).getTime() - new Date(a.gzsj).getTime()
        //             );
        //         });
        //         this.lastRecord = this.records[0];
        //         console.log(this.lastRecord, "this.lastRecord");
        //     });
        // },
        //检测获取任务详情
        // _getTestByItemIdPage() {
        //     let params = {
        //         index: kindsObj[this.kinds],
        //         twrId: this.info.id,
        //         taskItemId: this.taskItemId
        //     };
        //     getTestByItemIdPage(params).then((res) => {
        //         console.log(res, "检测当前值");
        //         if (this.kinds == "jcky") {
        //             this.details = res.data.data.jckyZone
        //                 ? res.data.data.jckyZone
        //                 : this.details;
        //             this.details.jkqj =
        //                 this.details.twrL +
        //                 "-" +
        //                 this.details.twrL +
        //                 " " +
        //                 this.details.bkumc;
        //         } else {
        //             this.details = res.data.data.invTwr
        //                 ? res.data.data.invTwr
        //                 : this.details;
        //         }
        //         if (this.details.isTest == 0) return;
        //         let test = res.data.data.test.records
        //             ? res.data.data.test.records
        //             : [];
        //         this.type = "details";
        //         this.records = test.sort((a, b) => {
        //             return (
        //                 new Date(b.gzsj).getTime() - new Date(a.gzsj).getTime()
        //             );
        //         });
        //         this.lastRecord = this.records[0];
        //         console.log(this.lastRecord, "this.lastRecord");
        //     });
        // },
        async submit() {
            this.loading = true;
            try {
                let params = {
                    ...(await this.$refs.LineForm.getForm()),
                    ...(await this.$refs.MeasureForm.getForm()),
                    ...this.$refs.Temperature.getForm(this.kinds),
                    ...this.$refs.ResistanceForm.getForm(this.kinds),
                    ...(await this.$refs.OtherForm.getForm()),
                    ...(await this.$refs.PersonForm.getForm()),
                    ...(await this.$refs.ResourceForm.getForm()),
                    ywdwid: this.orgId
                };
                console.log(params, "提交params");
                fn[this.kinds](params).then(() => {
                    this.$u.toast("提交成功");
                    this.loading = false;
                    setTimeout(() => {
                        this.$goBack(1, true);
                    }, 500);
                });
            } catch (err) {
                this.loading = false;
                return;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

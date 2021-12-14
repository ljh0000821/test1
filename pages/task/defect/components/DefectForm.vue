<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="线路" label-width="150" prop="lineName">
                <efItem :data="dy_XSXL" v-model="form.lineName" :modelId.sync="form.lineId" @input="lineChange" :type="type==='add'||type==='edit'?'lines':'label'" />
            </u-form-item>
            <u-form-item label="杆塔" label-width="150" label-position="top" prop="twrCode">
                <view class="flex1">
                    <efItem :data="dy_invtwrList" :require="form.lineName" errMessage="请先选择线路" v-model="form.twrCode" :modelId.sync="form.twrId" @change="e=>towerChange(e)" :type="type==='add'||type==='edit'?'towers':'label'" position name="twrCode" id="id" />
                </view>
            </u-form-item>
            <u-form-item label="电压等级" label-width="150" prop="voltage">
                <efItem v-model="form.voltage" :isRightIcon="false" placeholder="" />
            </u-form-item>
            <u-form-item label="杆塔型号" label-width="150" prop="modCode">
                <efItem v-model="form.modCode" :isRightIcon="false" placeholder="" />
            </u-form-item>
            <u-form-item label="部件" label-width="150" prop="defType">
                <efItem :data="formList.dy_defType" v-model="form.defType" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" @change="(data)=>onChange('defType',data)" />
            </u-form-item>
            <u-form-item prop="location" label="大小号侧" label-width="150" v-if="form.defType && !['基础','附属设施','接地装置','杆塔'].includes(form.defType)">
                <efItem :data="formList.dy_location" v-model="form.locationName" :modelId.sync="form.location" :type="type==='add'||type==='edit'?'select':'label'" name="dictValue" id="dictKey" />
            </u-form-item>
            <u-form-item prop="phase" label="相别" label-width="150" v-if="form.defType && !['基础','附属设施','接地装置','杆塔'].includes(form.defType)">
                <efItem :data="formList.dy_phase" v-model="form.phaseName" :modelId.sync="form.phase" :type="type==='add'||type==='edit'?'select':'label'" name="dictValue" id="dictKey" />
            </u-form-item>
            <u-form-item prop="partsKinds" label="部件种类" label-width="150">
                <efItem :data="formList.dy_partsKinds" :require="form.defType" errMessage="请先选择部件" v-model="form.partsKinds" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" @change="(data)=>onChange('partsKinds',data)" />
            </u-form-item>
            <u-form-item prop="defPos" label="部位" label-width="150">
                <efItem :data="formList.dy_defPos" :require="form.partsKinds" errMessage="请先选择部件种类" v-model="form.defPos" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" @change="(data)=>onChange('defPos',data)" />
            </u-form-item>
            <u-form-item prop="defDesc" label="缺陷描述" label-width="150">
                <efItem :data="formList.dy_defDesc" :require="form.defPos" errMessage="请先选择部位" v-model="form.defDesc" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" @change="(data)=>onChange('defDesc',data)" />
            </u-form-item>
            <u-form-item prop="sortBasis" label="分类依据" label-width="150">
                <efItem :data="formList.dy_sortBasis" :require="form.defDesc" errMessage="请先选择缺陷描述" v-model="form.sortBasis" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" @change="(data)=>onChange('sortBasis',data)" />
            </u-form-item>
            <u-form-item prop="defNature" label="缺陷性质" label-width="150">
                <efItem :data="formList.dy_defNature" :require="form.sortBasis" errMessage="请先选择分类依据" v-model="form.defNature" :type="type==='add'||type==='edit'?'select':'label'" name="text" id="id" />
            </u-form-item>
            <u-form-item prop="findWay" label="发现方式" label-width="150">
                <efItem :data="formList.dy_findWay" :modelId.sync="form.findWay" v-model="form.findWayName" :type="type==='add'||type==='edit'?'select':'label'" name="dictValue" id="dictKey" />
            </u-form-item>
            <u-form-item prop="findDate" label="发现日期" label-width="150">
                <efItem v-model="form.findDate" :endTime="$store.state.nowDate" :type="type==='add'||type==='edit'?'time':'label'" />
            </u-form-item>
            <u-form-item prop="findTeamName" label="发现班组" label-width="150">
                <efItem :data="formList.dy_findTeamName" v-model="form.findTeamName" :modelId.sync="form.findTeamId" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="classChange" />
            </u-form-item>
            <u-form-item label="发现单位" label-width="150">
                <efItem :data="dy_YWDW" v-model="form.orgName" :modelId.sync="form.orgId" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" />
            </u-form-item>
            <u-form-item prop="findUserName" label="发现人" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.findUserName" :modelId.sync="form.findUserId" multiple :type="type==='add'||type==='edit'?'people':'label'" />
            </u-form-item>
            <u-form-item prop="plCleorg" label="计划消缺单位" label-width="180">
                <efItem :data="formList.dy_plCleorg" :modelId.sync="form.plCleorg" v-model="form.jhxqdw" :type="type==='add'||type==='edit'?'select':'label'" name="dictValue" id="dictKey" />
            </u-form-item>
            <u-form-item prop="clePro" label="处理意见" label-width="150">
                <efItem :data="dy_QXCLYJ" v-model="form.clePro" name="dictValue" id="dictKey" title="处理意见" :canWrite="type==='add'||type==='edit'?true:false" :type="type==='add'||type==='edit'?'select':'label'" placeholder="请输入或选择" />
            </u-form-item>
            <u-form-item prop="defReport" label="缺陷简报" label-width="150" label-position="top">
                <view class="flex1">
                    <efItem :isRightIcon="false" :placeholder="''" position :isRightLabel="false">
                        <template v-slot:right v-if="type==='add'||type==='edit'">
                            <view class="flex1">
                                <u-button class="custom-style" size="mini" style="float:right" @click="generateDefReport">生成</u-button>
                            </view>
                        </template>
                    </efItem>
                    <view v-if="type==='add'||type==='edit'?true:false">
                        <u-input :disabled="type==='add'||type==='edit'?false:true" :clearable="type==='add'||type==='edit'?true:false" border placeholder="请输入或生成" v-model="form.defReport" type="textarea" />
                    </view>
                    <view class="f-s-24" v-if="type==='details'">
                        {{form.defReport}}
                    </view>
                </view>
            </u-form-item>
            <u-form-item prop="defPicVOList" label="图片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.defPicVOList" :type="type" />
            </u-form-item>
            <u-form-item prop="defVoiVOList" label="音频" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.defVoiVOList" :type="type" />
            </u-form-item>
            <u-form-item prop="defVidVOList" label="视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.defVidVOList" :type="type" />
            </u-form-item>
        </u-form>
        <u-button v-permission="['user','teamLeader','zhuanze']" class="btn custom-style" v-if="type==='add'" type="primary" shape="circle" ripple :loading="submitLoading" @click="save(2)">提交</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" class="btn btn-plain" v-if="type==='add'" shape="circle" ripple plain :loading="saveLoading" @click="save(1)">保存</u-button>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { dictMixins } from "@/mixins/dict-mixins";
import { defclaDetail, defSaveOrUpdate } from "@/api/defect";
import { invtwrDetail, towersPMS } from "@/api/invtwr";
const sortArr = [
    "defType",
    "partsKinds",
    "defPos",
    "defDesc",
    "sortBasis",
    "defNature"
];
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "add"
        },
        details: {
            type: Object,
            default: () => {}
        },
        baseData: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        // efItem,
        // chooseImage,
        // chooseVideo,
        // chooseAudio
    },
    mixins: [dictMixins],
    data() {
        return {
            submitLoading: false,
            saveLoading: false,
            companyName: "国网重庆检修分公司",
            dy_XSXL: [], //巡视线路
            dy_QXCLYJ: [], //缺陷处理意见
            dy_YWDW: [], //运营单位
            formList: {
                dy_defType: [], //部件
                dy_location: [], //大小号侧
                dy_phase: [], //相别
                dy_partsKinds: [], //部件种类
                dy_defPos: [], //部位
                dy_defDesc: [], //缺陷描述
                dy_sortBasis: [], //分类依据
                dy_defNature: [], //缺陷性质
                dy_findWay: [], //发现方式
                dy_findTeamName: [], //发现班组
                dy_plCleorg: [] //计划消缺单位
            },
            form: {
                insTypeName: "特殊巡视",
                orgName: "",
                teamName: "",
                lineName: "", //线路
                lineId: "",
                twrCode: "", //塔杆
                modCode: "", //杆塔型号
                voltage: "", //电压等级
                defType: "", //部件
                location: "", //大小号侧
                phase: "", //相别
                partsKinds: "", //部件种类
                defPos: "", //部位

                defDesc: "", //缺陷描述
                sortBasis: "", //分类依据
                defNature: "", //缺陷性质
                findWay: "", //发现方式
                findDate: "", //发现日期
                findTeamName: "", //发现班主
                findUserName: "", //发现人
                plCleorg: "", //计划消缺单位
                clePro: "", //处理意见
                defReport: "", //缺陷简报
                defPicVOList: "", //缺陷图片
                defVidVOList: "", //缺陷视频
                defVoiVOList: "" //缺陷音频
            },
            rules: {
                lineName: [
                    {
                        required: true,
                        message: "请选择线路"
                    }
                ],
                twrCode: [
                    {
                        required: true,
                        message: "请选择杆塔"
                    }
                ],
                defType: [
                    {
                        required: true,
                        message: "请选择部件"
                    }
                ],
                location: [
                    {
                        required: true,
                        message: "请选择大小号侧"
                    }
                ],
                phase: [
                    {
                        required: true,
                        message: "请选择相别"
                    }
                ],
                partsKinds: [
                    {
                        required: true,
                        message: "请选择部件种类"
                    }
                ],
                defPos: [
                    {
                        required: true,
                        message: "请选择部位"
                    }
                ],
                defDesc: [
                    {
                        required: true,
                        message: "请选择缺陷描述"
                    }
                ],
                sortBasis: [
                    {
                        required: true,
                        message: "请选择分类依据"
                    }
                ],
                defNature: [
                    {
                        required: true,
                        message: "请选择缺陷性质"
                    }
                ],
                findWay: [
                    {
                        required: true,
                        message: "请选择发现方式"
                    }
                ],
                findDate: [
                    {
                        required: true,
                        message: "请选择发现日期"
                    }
                ],
                findTeamName: [
                    {
                        required: true,
                        message: "请选择发现班组"
                    }
                ],
                findUserName: [
                    {
                        required: true,
                        message: "请选择发现人"
                    }
                ],
                plCleorg: [
                    {
                        required: true,
                        message: "请选择计划消缺单位"
                    }
                ],
                clePro: [
                    {
                        required: true,
                        message: "请填写处理意见"
                    }
                ],
                defReport: [
                    {
                        required: true,
                        message: "请填写缺陷简报"
                    }
                ]
            },
            taskItemList: {
                equList: [],
                planItemUserName: [],
                time: ""
            },
            dy_risk_level: []
        };
    },
    created() {
        this.getTypelist();
        this._defclaDetail();
        this.setBaseData(this.baseData);
        console.log(this.baseData, "basedata");
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    watch: {
        details: {
            handler(nval) {
                console.log(nval, "缺陷详情defe");
                sortArr.forEach((item) => {
                    nval[item] = nval[item] ? nval[item] : "空";
                });
                this.form = nval;
                if (this.type === "add" || this.type === "edit") {
                    this.getInvtwrList();
                    this.onChange("defType", false);
                    this.onChange("partsKinds", false);
                    this.onChange("defPos", false);
                    this.onChange("defDesc", false);
                    this.onChange("sortBasis", false);
                }
            },
            deep: true
        },
        form: {
            handler() {
                this.$emit("over");
            },
            deep: true
        }
    },
    methods: {
        setBaseData(data = {}) {
            //线路
            if (data.line && data.lineName) {
                this.form.lineId = data.line;
                this.form.lineName = data.lineName;
                this.lineChange();
            } else {
                return;
            }
            //杆塔
            if (
                (data.twrId || data.id) &&
                (data.twrcode || data.twrCode || data.name)
            ) {
                this.form.twrId = data.twrId || data.id;
                this.form.twrCode = data.twrcode || data.twrCode || data.name;
                this.towerChange();
            }
        },
        getTypelist() {
            if (this.type == "details") return;
            //线路
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     this.dy_XSXL = res.records || [];
            // });
            //大小号侧
            this.$store.dispatch("getList", "LOCATION").then((res) => {
                console.log(res, "大小号侧");
                this.formList.dy_location = res;
            });
            //相别
            this.$store.dispatch("getList", "phase").then((res) => {
                console.log(res, "相别");
                this.formList.dy_phase = res;
            });
            //风险等级
            this.$store.dispatch("getList", "risk_level").then((res) => {
                console.log(res, "风险等级");
                this.dy_risk_level = res.map((item) => {
                    return { ...item, text: item.dictValue };
                });
            });
            //班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.formList.dy_findTeamName = res || [];
                const list = res || [];
                if (this.type === "add" && list.length == 1) {
                    this.form.findTeamId = list[0].id;
                    this.form.findTeamName = list[0].fullName;
                }
                this.selectTeamUserList(this.form.findTeamId); //查询班组人员
            });
            //运维单位==公司
            this.$store.dispatch("getList", "YWDW").then((res) => {
                console.log(res, "运维单位");
                this.dy_YWDW = res || [];
                if (this.type === "add" && res.length === 1) {
                    this.form.orgName = res[0].fullName;
                    this.form.orgId = res[0].id;
                }
            });
            //发现方式
            this.$store.dispatch("getList", "find_way").then((res) => {
                console.log(res, "发现方式");
                this.formList.dy_findWay = res || [];
            });
            //计划消缺单位
            this.$store.dispatch("getList", "JHXQDW").then((res) => {
                console.log(res, "计划消缺单位");
                this.formList.dy_plCleorg = res || [];
            });
            //缺陷处理意见
            this.$store.dispatch("getList", "QXCLYJ").then((res) => {
                console.log(res, "缺陷处理意见");
                this.dy_QXCLYJ = res || [];
            });
        },
        //获取部件等
        _defclaDetail() {
            defclaDetail().then((res) => {
                console.log(res, "部件");
                this.formList.dy_defType = res.data.data.map((item) => {
                    let obj = {
                        text: item,
                        id: item
                    };
                    return obj;
                });
            });
        },
        //点击杆塔删除
        towerClick(item) {
            const index = this.taskItemList.equList.findIndex(
                (o) => o.id === item.id
            );
            this.taskItemList.equList.splice(index, 1);
        },
        //时间改变
        changeTime(e) {
            this.taskItemList.time = e[0] + "-" + e[1];
            this.taskItemList.startPlanDate = this.$u.timeFormat(
                new Date(e[0]),
                "yyyy-mm-dd hh:MM:ss"
            );
            this.taskItemList.finishPlanDate = this.$u.timeFormat(
                new Date(e[1]),
                "yyyy-mm-dd hh:MM:ss"
            );
        },
        //部位等发生改变
        onChange(key, clear = true) {
            this.$nextTick(() => {
                let params = {};
                let index = sortArr.indexOf(key);
                if (index > -1) {
                    sortArr.forEach((item, num) => {
                        if (num <= index) {
                            params[item] = this.form[item];
                        } else {
                            if (clear) {
                                this.form[item] = "";
                            }
                        }
                    });
                }
                console.log(params, "params");
                defclaDetail(params).then((res) => {
                    let rel = res.data.data;
                    if (index < sortArr.length) {
                        if (rel.length === 1 && !rel[0]) {
                            rel = ["空"];
                        }
                        this.formList["dy_" + sortArr[index + 1]] = rel.map(
                            (item) => {
                                let obj = {
                                    text: item,
                                    id: item
                                };
                                return obj;
                            }
                        );
                    }
                });
            });
        },
        //保存
        save(state) {
            return new Promise((resolve) => {
                console.log(this.form, "form");
                this.$refs.uForm.validate(async (valid) => {
                    let loadStr = state == 2 ? "submitLoading" : "saveLoading";
                    if (valid) {
                        this[loadStr] = true;
                        this.form.defSource = "2";
                        this.form.defState = state;
                        this.form.defPic =
                            await this.$refs.chooseImage.getIds();
                        this.form.defVoi =
                            await this.$refs.chooseAudio.getIds();
                        this.form.defVid =
                            await this.$refs.chooseVideo.getIds();
                        defSaveOrUpdate(this.form).then(() => {
                            this.$refs.uToast.show({
                                title: `${
                                    (state === 1 && "保存") ||
                                    (state === 2 && "添加")
                                }成功！`
                            });
                            this[loadStr] = false;
                            setTimeout(() => {
                                this.$goBack();
                            }, 500);
                        });
                        resolve();
                    } else {
                        this[loadStr] = false;
                        console.log("验证失败");
                    }
                });
            });
        },
        //选择线路
        lineChange() {
            //清空杆塔信息
            this.form.twrCode = "";
            this.form.twrId = "";
            this.form.voltage = "";
            this.form.modCode = "";
            this.getInvtwrList();
        },
        //选择杆塔
        towerChange(e) {
            console.log(e, "e");
            // this.form.modCode = e.modCode; //杆塔型号
            // this.form.voltage = e.voltage; //电压等级
            let data = {
                line: this.form.lineId,
                psrId: this.form.twrId
            };
            console.log(data, "杆塔data");
            towersPMS(data).then((res) => {
                console.log(res, "杆塔详情");
                let rel =
                    res.data.data.records.length == 1
                        ? res.data.data.records[0]
                        : [];
                this.form.modCode = rel.modCode; //杆塔型号
                this.form.voltage = rel.voltageLevelName; //电压等级
            });
        },
        //选择班组
        classChange(data) {
            console.log(data, "班组");
            this.selectTeamUserList(data.id); //查询班组人员
        },
        //验证部分表单
        validateSome(arr) {
            return new Promise((resolve, reject) => {
                try {
                    arr.forEach((item) => {
                        if (
                            this.form.hasOwnProperty(item) &&
                            !this.form[item]
                        ) {
                            this.$refs.uToast.show({
                                title: this.rules[item][0].message
                            });
                            throw Error();
                        }
                    });
                    resolve();
                } catch (err) {
                    reject();
                    return;
                }
            });
        },
        //生成简报
        generateDefReport() {
            let validateArr = [
                "lineName",
                "twrCode",
                "defType",
                "partsKinds",
                "defPos",
                "defDesc"
            ];
            this.validateSome(validateArr).then(() => {
                const {
                    lineName,
                    twrCode,
                    defType,
                    partsKinds,
                    defPos,
                    defDesc,
                    voltage
                } = this.form;
                const data = `${
                    voltage || ""
                }${lineName}${twrCode}杆塔${defType}${partsKinds}${defPos}${defDesc}`;
                console.log(data, "data简报");
                this.form.defReport = data;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 20rpx;
}

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
.tower {
    flex-wrap: wrap;
    .tower-list {
        width: 20%;
        position: relative;
        padding-top: 20px;
        padding-left: 10px;
        margin-top: 10px;
        color: #333;
        .uni-icons {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .clear {
        width: 100%;
        color: red;
        margin-top: 10px;
    }
}
.custom-style {
    background-color: #05b2cc !important;
    color: #fff;
}
.f-s-24 {
    font-size: 24rpx;
}
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 24rpx;
}
.btn-plain {
    // border-color: #05b2cc;
    color: #05b2cc;
}
</style>

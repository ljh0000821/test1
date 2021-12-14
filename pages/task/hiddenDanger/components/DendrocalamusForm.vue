<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="运维班组" label-width="150" prop="teamId">
                <efItem :data="formList.dy_findTeamName" v-model="form.teamName" :modelId.sync="form.teamId" :type="type=='add'||type=='edit'?'select':'label'" name="fullName" id="id" @change="classChange" />
            </u-form-item>
            <u-form-item label="线路名称" label-width="150" prop="lineName">
                <efItem :data="formList.dy_XSXL" v-model="form.lineName" @input="lineChange" :type="type=='add'||type=='edit'?'lines':'label'" :modelId.sync="form.lineId" />
            </u-form-item>
            <u-form-item label="杆塔号" label-width="150" prop="twridL">
                <efItem :data="dy_invtwrList" :require="form.lineName" errMessage="请先选择线路" v-model="form.townameL" :modelId.sync="form.twridL" @input="e=>towerChange(e)" :type="type=='add'||type=='edit'?'towers':'label'" name="twrCode" id="id" />
            </u-form-item>
            <u-form-item label="电压等级" label-width="150" prop="voltage">
                <efItem v-model="form.voltage" :isRightIcon="false" placeholder="" />
            </u-form-item>
            <u-form-item prop="location" label="大小号侧" label-width="150">
                <efItem :data="formList.dy_location" v-model="form.lsSidesName" :modelId.sync="form.lsSides" :type="type=='add'||type=='edit'?'select':'label'" name="dictValue" id="dictKey" />
            </u-form-item>
            <u-form-item prop="alineLen" label="顺线路距离（m）" label-width="240">
                <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.alineLen" placeholder="请输入" :isRightIcon="false" />
                <!-- <u-input v-model="form.alineLen" :disabled="type!=='add'&&type!=='edit'" type="number" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" /> -->
            </u-form-item>
            <u-form-item prop="wllen" label="水平距离（m）" label-width="240">
                <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.wllen" placeholder="请输入" :isRightIcon="false" />
                <!-- <u-input v-model="form.wllen" :disabled="type!=='add'&&type!=='edit'" type="number" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" /> -->
            </u-form-item>
            <u-form-item prop="mwlen" label="垂直距离（m）" label-width="240">
                <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.mwlen" placeholder="请输入" :isRightIcon="false" />
                <!-- <u-input v-model="form.mwlen" :disabled="type!=='add'&&type!=='edit'" type="number" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" /> -->
            </u-form-item>
            <u-form-item label="净空距离（m）" label-width="240">
                <view class="flex1 flex-end">{{melen}}</view>
            </u-form-item>
            <u-form-item prop="fstPlt" label="树种分类" label-width="240">
                <efItem :data="formList.dy_basetreeList" multiple v-model="form.fstPlt" :type="type=='add'||type=='edit'?'select':'label'" name="secPlt" id="id" childName="data" @change="fstPltChange" />
            </u-form-item>
            <u-form-item prop="troBody" label="树种" label-width="240">
                <efItem :data="formList.treeData" multiple v-model="form.treeType" :type="type=='add'||type=='edit'?'select':'label'" name="secPlt" id="id" childName="data" @change="treeChange" />
            </u-form-item>
            <u-form-item prop="troBody" :label="unit" label-width="240">
                <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.treeNum" placeholder="请输入" :isRightIcon="false" />
                <!-- <u-input v-model="form.treeNum" :disabled="type!=='add'&&type!=='edit'" type="number" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" /> -->
            </u-form-item>
            <u-form-item label="隐患分类" label-width="150" prop="troType">
                <efItem :data="formList.dy_troclaGetType" v-model="form.troType" :type="type=='add'||type=='edit'?'select':'label'" name="text" id="id" @change="typeChange" />
            </u-form-item>
            <u-form-item label="分类依据" label-width="150" prop="troTypeId">
                <efItem :data="formList.dy_troclaGetBasis" :require="form.troType" errMessage="请先选择隐患分类" v-model="form.troTypeBasis" :modelId.sync="form.troTypeId" :type="type=='add'||type=='edit'?'select':'label'" name="troTypeBasis" id="id" @change="troTypeIdChange" />
            </u-form-item>
            <u-form-item label="隐患分级" label-width="150" prop="troTypeLevel">
                <efItem v-model="form.troTypeLevel" :isRightIcon="false" placeholder="" />
            </u-form-item>
            <u-form-item prop="findDate" label="发现时间" label-width="150">
                <efItem v-model="form.findDate" :endTime="$store.state.nowDate" :type="type=='add'||type=='edit'?'time':'label'" />
            </u-form-item>
            <u-form-item prop="findUserName" label="发现人员" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.findUserName" :modelId.sync="form.findUserId" :type="type=='add'||type=='edit'?'people':'label'" />
            </u-form-item>
            <u-form-item prop="troPics" label="拍照" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.troPics" :type="type" picType="3" />
            </u-form-item>
            <u-form-item prop="defPicROList" label="录音" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.troVois" :type="type" picType="3" />
            </u-form-item>
            <u-form-item prop="troVids" label="视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.troVids" :type="type" picType="3" />
            </u-form-item>
        </u-form>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="type==='add'||type==='edit'" class="btn custom-style" type="primary" shape="circle" ripple :loading="submitLoading" @click="save(2)">提交</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="type==='add'||type==='edit'" class="btn btn-plain" shape="circle" ripple plain :loading="saveLoading" @click="save(1)">保存</u-button>
        <u-button v-permission="'teamLeader'" v-if="['2'].includes(state)" class="btn custom-style" type="primary" shape="circle" ripple @click="toExamine()">审核</u-button>
        <view class="flex-around" v-if="['3'].includes(state)">
            <u-button class="btn btn-plain" shape="circle" ripple plain @click="toHandle">处理</u-button>
            <u-button class="btn custom-style" type="primary" shape="circle" ripple @click="toTour">维护</u-button>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { dictMixins } from "@/mixins/dict-mixins";
import { invtwrDetail, towersPMS } from "@/api/invtwr";
import {
    troclaGetType,
    troclaGetBasis,
    trotreeSubmit,
    trotreeDetail
} from "@/api/hiddenDanger";
import { getNowTime, groupArr } from "@/utils/tools";
import { getStore } from "@/utils/store.js";
import chooseImage from "@/components/choose-image/choose-image";
import chooseVideo from "@/components/choose-video/choose-video";
// import mRecorder from "@/components/m-recorder/m-recorder";
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        //是否需要加载详情
        needLoad: {
            type: Boolean,
            default: false
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
        efItem,
        chooseImage,
        chooseVideo
        // mRecorder
    },
    mixins: [dictMixins],
    data() {
        return {
            unit: "数量",
            submitLoading: false,
            saveLoading: false,
            state: 0,
            // dy_teamUserList: [], //人员列表
            dy_invtwrList: [], //杆塔
            formList: {
                dy_XSXL: [], //线路
                dy_locationL: [], //大小号侧
                dy_risk_level: [], //风险等级
                dy_findTeamName: [], //班组
                dy_troclaGetType: [], //隐患分类
                dy_troclaGetBasis: [], //分类依据
                treeData: [] //树种
            },
            form: {
                teamId: "", //班组id
                lineName: "", //线路
                twridL: "", //杆塔号
                modCode: "", //杆塔型号
                voltage: "", //电压等级
                lsSides: "", //大小号侧
                alineLen: 0, //顺线路距离
                wllen: 0, //水平距离
                mwlen: 0, //垂直距离
                fstPlt: "",
                treeType: "", //树种
                treeNum: "", //树种数量
                troType: "", //隐患分类
                troTypeId: "", //分类依据
                troTypeLevel: "", //隐患分级
                findDate: "", //发现时间
                findUserName: "",
                findUserId: ""
            },
            rules: {
                lineName: [
                    {
                        required: true,
                        message: "请选择线路"
                    }
                ],
                twridL: [
                    {
                        required: true,
                        message: "请选择杆塔"
                    }
                ]
            }
        };
    },
    watch: {
        form: {
            handler() {
                this.$emit("over");
            },
            deep: true
        }
    },
    created() {
        this.getTypelist();
        if (this.needLoad) {
            this._trotreeDetail();
        }
        this.setBaseData(this.baseData);
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
        if (this.type === "add") {
            this.form.findDate = getNowTime();
            let usrInfo = getStore("userInfo");
            this.form.findUserName = usrInfo.nick_name;
            this.form.findUserId = usrInfo.user_id;
            console.log(usrInfo, "usrInfo");
        }
    },
    computed: {
        melen() {
            const { mwlen, wllen } = this.form;
            let num = "";
            if (mwlen && wllen) {
                num = Math.sqrt(mwlen * mwlen + wllen * wllen);
                if (String(num).length > 5) num = num.toFixed(2);
            }
            return num;
        }
    },
    methods: {
        setBaseData(data) {
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
                this.form.twridL = data.twrId || data.id;
                this.form.townameL = data.twrcode || data.twrCode || data.name;
                this.towerChange();
            }
        },
        reload() {
            this._trotreeDetail();
        },
        getTypelist() {
            if (this.type == "details") return;
            this.$store.dispatch("getList", "YXCJ").then((res) => {
                const list = res || [];
                list.length > 0 &&
                    ((this.form.workId = list[0].id),
                    (this.form.workName = list[0].deptName));
            });
            this.$store.dispatch("getList", "YWDW").then((res) => {
                const list = res || [];
                list.length > 0 &&
                    ((this.form.orgId = list[0].id),
                    (this.form.orgName = list[0].deptName));
            });
            //树种
            this.$store.dispatch("getList", "basetreeList").then((res) => {
                console.log(res, "树种res");
                let arr = groupArr(res.records, "fstPlt", "id");
                arr = arr.map((item) => {
                    item.secPlt = item.fstPlt;
                    return item;
                });
                console.log(arr, "树种");
                this.formList.dy_basetreeList = arr || [];
                arr.forEach((item) => {
                    this.formList.treeData.push(...item.data);
                });
            });
            //线路
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     console.log(res, "线路");
            //     this.formList.dy_XSXL = res.records || [];
            // });
            //大小号侧
            this.$store.dispatch("getList", "LOCATION").then((res) => {
                console.log(res, "大小号侧");
                this.formList.dy_location = res;
            });
            //风险等级
            this.$store.dispatch("getList", "risk_level").then((res) => {
                console.log(res, "风险等级");
                this.formList.dy_risk_level = res.map((item) => {
                    return { ...item, text: item.dictValue };
                });
            });
            //班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.formList.dy_findTeamName = res || [];
                const list = res || [];

                if (this.type === "add" && list.length == 1) {
                    console.log(this.type, "type");
                    this.form.teamId = list[0].id;
                    this.form.teamName = list[0].fullName;
                }
                this.selectTeamUserList(this.form.teamId); //查询班组人员
            });
            this._troclaGetType();
        },
        //选择线路
        lineChange() {
            //清空杆塔信息
            this.form.townameL = "";
            this.form.twridL = "";
            this.form.townameT = "";
            this.form.twridT = "";
            this.form.voltage = "";
            this.form.modCode = "";
            this.getInvtwrList();
        },
        //选择杆塔
        towerChange() {
            // let data = {
            //     id: this.form.twridL
            // };
            // console.log(data, "data");
            // invtwrDetail(data).then((res) => {
            //     console.log(res, "杆塔详情");
            //     let rel = res.data.data;
            //     this.form.modCode = rel.modCode; //杆塔型号
            //     this.form.voltage = rel.voltage; //电压等级
            // });
            let data = {
                line: this.form.lineId,
                psrId: this.form.twridL
            };
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
        //结束杆塔选择
        towerChange2(e) {
            console.log(this.form.twridL, "twridL");
            console.log(this.dy_invtwrList, "dy_invtwrList");
            let sortL = "";
            this.dy_invtwrList.forEach((item) => {
                if (item.id == this.form.twridL) {
                    sortL = item.twrSort;
                }
            });
            console.log(sortL, "sortL");
            console.log(e.twrSort, "etwrSort");
            if (e.twrSort < sortL) {
                this.$refs.uToast.show({
                    title: "结束杆塔不能小于起始杆塔"
                });
                this.form.townameT = "";
                this.form.twridT = "";
            }
        },
        //树种改变
        treeChange(data) {
            console.log(data, "树的data");
            if (data.length === 0) return;
            // this.unit = "数量" + "(" + data[2] + ")";
            // this.form.fstPlt = data[0].label;
        },
        //隐患分类
        _troclaGetType() {
            troclaGetType({ type: "2" }).then((res) => {
                console.log(res, "隐患分类");
                let rel = res.data.data;
                if (rel.length === 1 && !rel[0]) {
                    rel = ["空"];
                }
                this.formList.dy_troclaGetType = rel.map((item) => {
                    let obj = {
                        text: item,
                        id: item
                    };
                    return obj;
                });
            });
        },
        //隐患分类依据和分级
        _troclaGetBasis(text) {
            let params = {
                troType: text
            };
            troclaGetBasis(params).then((res) => {
                console.log(res, "隐患分类依据和分级");
                this.formList.dy_troclaGetBasis = res.data.data;
            });
        },
        //隐患分类改变
        typeChange(data) {
            console.log(data, "data");
            this.formList.dy_troclaGetBasis = [];
            this.form.troTypeBasis = "";
            this.form.troTypeId = "";
            this.form.troTypeLevel = "";
            this._troclaGetBasis(data.text);
        },
        //选择班组
        classChange(data) {
            console.log(data, "班组");
            this.selectTeamUserList(data.id); //查询班组人员
        },
        //分类依据改变
        troTypeIdChange(data) {
            console.log(data, "edata");
            this.form.troTypeLevel = data.troTypeLevel;
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
        //保存1提交2
        save(state) {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    let loadStr = state == 2 ? "submitLoading" : "saveLoading";
                    this[loadStr] = true;
                    this.form.state = state;
                    this.form.troPic = await this.$refs.chooseImage.getIds();
                    this.form.troVid = await this.$refs.chooseVideo.getIds();
                    this.form.troVoi = await this.$refs.chooseAudio.getIds();
                    trotreeSubmit(this.form)
                        .then(() => {
                            this.$refs.uToast.show({
                                title: `${
                                    (state === 1 && "保存") ||
                                    (state === 2 && "添加")
                                }成功！`
                            });
                            this[loadStr] = false;
                            setTimeout(() => {
                                uni.navigateTo({
                                    url: "pages/task/hiddenDanger/index?active=1"
                                });
                            }, 500);
                        })
                        .catch(() => {
                            this[loadStr] = false;
                        });
                } else {
                    console.log("验证失败");
                }
            });
        },
        //详情
        _trotreeDetail() {
            if (!this.id) return;
            trotreeDetail({
                id: this.id
            }).then((res) => {
                console.log(res, "onshow详情");
                this.form = res.data.data;
                this.state = this.form.state;
                this.$emit("loadend", res.data.data);
                this.getInvtwrList(); //拉取杆塔列表
                this._troclaGetBasis(this.form.troType);
            });
        },
        //跳转审核
        toExamine() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/examine?id=" +
                    this.id +
                    "&stateObj=ccsh&type=1"
            });
        },
        //跳转处理
        toHandle() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/handle?id=" +
                    this.id +
                    "&tag=1&teamId=" +
                    this.form.teamId
            });
        },
        //跳转维护
        toTour() {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/specialTour?id=" +
                    this.id +
                    "&teamId=" +
                    this.form.teamId +
                    "&teamName=" +
                    this.form.teamName +
                    "&type=1"
            });
        },
        fstPltChange(data) {
            console.log(data, "树种分类变化");
            this.formList.treeData = [];
            data.forEach((item) => {
                this.formList.treeData.push(...item.data);
            });
            console.log(this.formList.treeData, "this.formList.treeData");
        }
    }
};
</script>

<style lang="scss" scoped>
.f-s-24 {
    font-size: 24rpx;
}
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 24rpx;
}
.btn-plain {
    border-color: #05b2cc;
    color: #05b2cc;
}
.custom-style {
    background-color: #05b2cc !important;
    color: #fff;
}
</style>

<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <template v-if="kinds==='hwcw'||kinds==='jcky'">
                <u-form-item label="处理情况" prop="cleDate" label-width="150">
                    <efItem v-model="fakeSituation" type="label" />
                </u-form-item>
            </template>
            <u-form-item label="线路" prop="cleDate" label-width="150">
                <efItem v-model="form.xlmc" type="label" />
            </u-form-item>
            <!-- 红外测温 -->
            <!-- <template v-if="kinds==='hwcw'">
                <u-form-item label="档段" prop="dd" label-width="150">
                    <efItem :data="formList.dy_findTeamName" v-model="form.dd" :modelId.sync="form.cleTeam" :type="type==='add'?'select':'label'" name="fullName" id="id" @change="classChange" />
                </u-form-item>
            </template> -->
            <!-- 红外测温结束 -->
            <!-- 交叉跨越 -->
            <template v-if="kinds==='jcky'">
                <u-form-item v-if="jckySelect=='false'" label="交跨区间" prop="cleTeam" label-width="150">
                    <efItem v-model="form.jkqj" type="label" name="dictValue" id="dictKey" />
                </u-form-item>
                <u-form-item v-if="jckySelect=='true'" label="交跨区间" prop="gtid" label-width="150">
                    <efItem :data="formList.JCKYQD" v-model="form.gtName" :modelId.sync="form.gtid" type="select" name="dictValue" id="dictKey" @change="jkChange" />
                </u-form-item>
            </template>
            <!-- 交叉跨越结束 -->
            <!-- 接地电阻 -->
            <template v-if="kinds==='jddz'">
                <u-form-item label="接地形式" prop="jdxs" label-width="150">
                    <efItem :data="formList.DZJDXS" v-model="form.jdxs" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
                <u-form-item label="电阻设计值" prop="dzsjz" label-width="150">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.dzsjz" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
            </template>
            <!-- 接地电阻结束 -->
            <!-- 覆冰观测 -->
            <template v-if="kinds==='fbgc'">
                <u-form-item label="测量位置" prop="testLoca" label-width="150">
                    <efItem :data="formList.FBGCWZ" v-model="form.testLoca" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
            </template>
            <!-- 覆冰观测结束 -->
            <template v-if="kinds!=='jcky'">
                <u-form-item label="杆塔号" prop="cleDate" label-width="150">
                    <efItem v-model="form.twrCode" type="label" />
                </u-form-item>
                <u-form-item label="杆塔型号" prop="cleDate" label-width="150">
                    <efItem v-model="form.gtxh" type="label" />
                </u-form-item>
            </template>
            <u-form-item label="处理时间" prop="cleDate" label-width="150">
                <efItem v-model="form.clsj" type="label" />
            </u-form-item>
        </u-form>
        <!-- <button @click="getForm">getForm</button> -->
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { getNowTime } from "@/utils/tools";
import { dictMixins } from "@/mixins/dict-mixins";
import { defSaveOrUpdate, defFindByDef } from "@/api/defect";
import { jckyzoneList } from "@/api/jckyzone";
import { getStore } from "@/utils/store.js";
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    mixins: [dictMixins],
    props: {
        taskItemId: {
            type: String,
            default: ""
        },
        kinds: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "add"
        },
        taskType: {
            type: String,
            default: ""
        },
        details: {
            type: Object,
            default: () => {}
        },
        lastRecord: {
            type: Object,
            default: () => {}
        },
        jckySelect: {
            type: String,
            default: "false"
        }
    },
    data() {
        return {
            formList: {
                DZJDXS: [],
                FBGCWZ: [],
                JCKYQD: []
            },
            form: {},
            rules: {
                dd: [
                    {
                        required: true,
                        message: "请选择档段"
                    }
                ],
                testLoca: [
                    {
                        required: true,
                        message: "请选择测量位置"
                    }
                ],
                jdxs: [
                    {
                        required: true,
                        message: "请选择接地形式"
                    }
                ],
                dzsjz: [
                    {
                        required: true,
                        message: "请填写电阻设计值"
                    }
                ]
            }
        };
    },
    created() {
        console.log(this.type, "this.type");
        if (this.type != "details") {
            this.getTypelist();
        }
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    watch: {
        details: {
            handler(nval) {
                console.log(nval, "线路详情66666", this.jckySelect);
                if (this.type != "details") {
                    nval.twrCode = nval.name;
                    this.form = nval;
                    if (this.kinds != "jcky") {
                        this.form.gtid = nval.id;
                    }
                    if (this.kinds == "hwcw") {
                        this.form.dd = nval.twrCode;
                    }
                    // if (this.kinds == "jcky") {
                    //     this.form.jkgth = nval.twrCode;
                    // }
                    this.form.gtxh = nval.modCode;
                    this.form.xlmc = nval.lineName;
                    this.form.xlid = nval.line;
                    this.form.ywdwid = nval.orgId;
                    this.form.ywdw = nval.orgName;
                    this.form.clsj = getNowTime();
                }
                if (nval.jkqj) {
                    this.form.jkqj = nval.jkqj;
                }
                this.$emit("over");
            },
            deep: true,
            immediate: true
        },
        lastRecord: {
            handler(nval) {
                console.log(nval, "0000000");
                // this.form.clsj = nval.gzsj;
                // this.form.testLoca = nval.testLoca;
                // this.form.jdxs = nval.jdxs;
                // this.form.dzsjz = nval.dzsjz;
                this.form = { ...this.form, ...nval };
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        fakeSituation() {
            return this.kinds != "jcky" ? "良好" : "待处理";
        }
    },
    methods: {
        getTypelist() {
            if (this.type == "details") return;
            if (this.kinds == "jddz") {
                //电阻接地形式
                this.$store.dispatch("getList", "DZJDXS").then((res) => {
                    console.log(res, "电阻接地形式");
                    this.formList.DZJDXS = res;
                });
            } else if (this.kinds == "fbgc") {
                //覆冰观测位置
                this.$store.dispatch("getList", "FBGCWZ").then((res) => {
                    console.log(res, "覆冰观测位置");
                    this.formList.FBGCWZ = res;
                });
            } else if (this.kinds == "jcky") {
                this._jckyzoneList();
            }
        },
        getForm() {
            return new Promise((resolve, reject) => {
                this.$refs.uForm.validate((valid) => {
                    if (valid) {
                        if (
                            this.kinds == "jcky" &&
                            this.jckySelect == "true" &&
                            !this.form.gtid
                        ) {
                            this.$u.toast("请选择交跨区间");
                            reject();
                            return;
                        }
                        let params = {
                            clsj: this.form.clsj,
                            gtid: this.form.gtid,
                            gtxh: this.form.gtxh,
                            xlmc: this.form.xlmc,
                            xlid: this.form.xlid,
                            ywdwid: this.form.ywdwid,
                            ywdw: this.form.ywdw,
                            taskItemId: this.taskItemId,
                            gth: this.form.twrCode
                        };
                        if (this.kinds === "hwcw") {
                            params.dd = this.form.dd;
                        }
                        if (this.kinds === "fbgc") {
                            params.testLoca = this.form.testLoca;
                        }
                        if (this.kinds === "jddz") {
                            params.jdxs = this.form.jdxs;
                            params.dzsjz = this.form.dzsjz;
                        }
                        if (
                            this.kinds === "jcky" &&
                            this.jckySelect == "false"
                        ) {
                            params.gtid = this.form.id;
                        } else {
                            params.jkgth = this.form.jkgth;
                        }
                        console.log(params, "params线路信息");
                        resolve(params);
                    } else {
                        reject();
                    }
                });
            });
        },
        //选择班组
        classChange(data) {},
        //交叉跨越区段
        _jckyzoneList() {
            let params = {
                lineId: this.details.lineId || this.form.xlid
            };
            jckyzoneList(params).then((res) => {
                this.formList.JCKYQD = res.data.data.map((item) => {
                    let obj = {
                        dictValue:
                            item.twrL + "-" + item.twrR + " " + item.bkumc,
                        dictKey: item.id,
                        jkgth: item.twrL + "-" + item.twrR
                    };
                    return obj;
                });
                console.log(this.formList.JCKYQD, "this.formList.JCKYQD");
            });
        },
        jkChange(data) {
            console.log(data, "data");
            this.form.jkgth = data.jkgth;
        }
    }
};
</script>

<style scoped>
.container {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx 15rpx 40rpx;
    box-sizing: border-box;
}
</style>

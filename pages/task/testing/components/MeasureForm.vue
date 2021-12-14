<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <!-- 红外测温 -->
            <template v-if="kinds==='hwcw'">
                <u-form-item label="连接形式" prop="ljxs" label-width="150" :border-bottom="false">
                    <efItem :data="formList.LJXS" v-model="form.ljxs" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="接头位置" prop="jtwz" label-width="150" :border-bottom="false">
                    <efItem v-model="form.jtwz" title="接头位置" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="环境温度(℃)" prop="hjwd" label-width="180" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.hjwd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：28℃，历史值：无</view>
                <u-form-item label="异常接头位置" prop="ycjtwz" label-width="180" :border-bottom="false">
                    <efItem :data="formList.YCJTWZ" v-model="form.ycjtwz" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
                <view class="gray-text">标准值：无，历史值：无</view>
            </template>
            <!-- 交叉跨越及对地距离测量 -->
            <template v-if="kinds==='jcky'">
                <u-form-item label="被跨越物名称" prop="bkywmc" label-width="180">
                    <efItem v-model="form.bkywmc" title="被跨越物名称" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item label="交叉点到最近杆塔距离(m)" prop="jcddzjtjl" label-width="350" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.jcddzjtjl" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="测量时温度(℃)" prop="clswd" label-width="200">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.clswd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="被跨越物距离(m)" prop="dbkywdjlclz" label-width="330" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.dbkywdjlclz" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="换算至最大弧垂(m)" prop="hszzdhc" label-width="330" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.hszzdhc" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="最小安全距离(m)" prop="minSafeDistance" label-width="330" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.minSafeDistance" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="测量仪器" prop="clyq" label-width="150">
                    <efItem v-model="form.clyq" title="测量仪器" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item label="顺线路距离(m)" prop="alineLen" label-width="300">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.alineLen" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="实测垂直距离(m)" prop="actVerDistance" label-width="300" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.actVerDistance" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
            </template>
            <!-- 覆冰观测 -->
            <template v-if="kinds==='fbgc'">
                <u-form-item label="温度(℃)" prop="wd" label-width="150" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.wd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：20℃，历史值：无</view>
                <u-form-item label="湿度%" prop="sd" label-width="150" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.sd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：1-10，历史值：无</view>
                <u-form-item label="风速m/s" prop="fs" label-width="150" :border-bottom="false">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.fs" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：1-10，历史值：无</view>
                <u-form-item label="异常接头位置" prop="ycjtwz" label-width="180" :border-bottom="false">
                    <efItem :data="formList.YCJTWZ" v-model="form.ycjtwz" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
                <view class="border-b-gray gray-text">标准值：无，历史值：无</view>
                <u-form-item label="覆冰厚度mm" prop="fbhd" label-width="180">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.fbhd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
                <u-form-item label="覆冰类型" prop="fblx" label-width="180" :border-bottom="false">
                    <efItem :data="formList.FBLX" v-model="form.fblx" :type="type==='add'?'select':'label'" name="dictValue" id="dictKey" @change="classChange" />
                </u-form-item>
                <u-form-item label="设计覆冰厚度mm" prop="sjfbhd" label-width="240">
                    <efItem :type="type=='add'||type=='edit'?'number':'label'" v-model="form.sjfbhd" placeholder="请输入" :isRightIcon="false" />
                </u-form-item>
            </template>
        </u-form>
        <!-- <button @click="getForm">getForm</button> -->
    </view>
</template>

<script>
import { getNowTime } from "@/utils/tools";
import { dictMixins } from "@/mixins/dict-mixins";
import { defSaveOrUpdate, defFindByDef } from "@/api/defect";
import { getStore } from "@/utils/store.js";
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    mixins: [dictMixins],
    props: {
        kinds: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "add"
        },
        needGet: {
            type: Boolean,
            default: true
        },
        details: {
            type: Object,
            default: () => {}
        },
        lastRecord: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            zxaqjl: 10,
            formList: {
                LJXS: [],
                YCJTWZ: [],
                FBLX: []
            },
            form: {},
            rules: {
                ljxs: [
                    {
                        required: true,
                        message: "请选择连接形式"
                    }
                ],
                jtwz: [
                    {
                        required: true,
                        message: "请填写接头位置"
                    }
                ],
                hjwd: [
                    {
                        required: true,
                        message: "请填写环境温度"
                    }
                ],
                // ycjtwz: [
                //     {
                //         required: true,
                //         message: "请选择异常接头位置"
                //     }
                // ],
                layDesc: [
                    {
                        required: true,
                        message: "请选择layDesc"
                    }
                ],
                wd: [
                    {
                        required: true,
                        message: "温度(℃)不能为空"
                    }
                ],
                sd: [
                    {
                        required: true,
                        message: "湿度%不能为空"
                    }
                ],
                fs: [
                    {
                        required: true,
                        message: "风速m/s不能为空"
                    }
                ],
                fbhd: [
                    {
                        required: true,
                        message: "覆冰厚度mm不能为空"
                    }
                ],
                fblx: [
                    {
                        required: true,
                        message: "覆冰类型不能为空"
                    }
                ],
                sjfbhd: [
                    {
                        required: true,
                        message: "设计覆冰厚度mm不能为空"
                    }
                ],
                bkywmc: [
                    {
                        required: true,
                        message: "被跨越物名称不能为空"
                    }
                ],
                jcddzjtjl: [
                    {
                        required: true,
                        message: "交叉点到最近杆塔距离(m)不能为空"
                    }
                ],
                // clswd: [
                //     {
                //         required: true,
                //         message: "测量时温度(℃)不能为空"
                //     }
                // ],
                // dbkywdjlclz: [
                //     {
                //         required: true,
                //         message: "被跨越物距离(m)不能为空"
                //     }
                // ],
                // hszzdhc: [
                //     {
                //         required: true,
                //         message: "换算至最大弧垂(m)不能为空"
                //     }
                // ],
                minSafeDistance: [
                    {
                        required: true,
                        message: "最小安全距离(m)不能为空"
                    }
                ],
                clyq: [
                    {
                        required: true,
                        message: "测量仪器不能为空"
                    }
                ],
                alineLen: [
                    {
                        required: true,
                        message: "顺线路距离(m)不能为空"
                    }
                ],
                actVerDistance: [
                    {
                        required: true,
                        message: "实测垂直距离(m)不能为空"
                    }
                ]
            }
        };
    },
    created() {
        this.getTypelist();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    watch: {
        lastRecord: {
            handler(nval) {
                console.log(nval, "==========");
                this.form = nval;
            },
            deep: true
        }
    },
    methods: {
        getTypelist() {
            if (this.type == "details") return;
            if (this.kinds === "hwcw") {
                //连接形式
                this.$store.dispatch("getList", "LJXS").then((res) => {
                    console.log(res, "连接形式");
                    this.formList.LJXS = res;
                });
            }
            if (this.kinds === "fbgc") {
                //覆冰类型
                this.$store.dispatch("getList", "FBLX").then((res) => {
                    console.log(res, "覆冰类型");
                    this.formList.FBLX = res;
                });
            }
            if (this.kinds === "hwcw" || this.kinds === "fbgc") {
                //异常接头位置
                this.$store.dispatch("getList", "YCJTWZ").then((res) => {
                    console.log(res, "异常接头位置");
                    this.formList.YCJTWZ = res;
                });
            }
        },
        getForm() {
            console.log(this.kinds, "this.kinds");
            if (this.kinds == "jddz") {
                return {};
            }
            return new Promise((resolve, reject) => {
                this.$refs.uForm.validate((valid) => {
                    if (valid) {
                        console.log(this.form, "测量信息");
                        resolve(this.form);
                    } else {
                        reject();
                    }
                });
            });
        },
        //选择班组
        classChange(data) {}
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

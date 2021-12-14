<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="工作时间" prop="gzsj" label-width="150">
                <efItem v-model="form.gzsj" type="label" />
            </u-form-item>
            <u-form-item label="工作班组" prop="gzbzid" label-width="150">
                <efItem :data="formList.dy_findTeamName" v-model="form.gzbz" :modelId.sync="form.gzbzid" :type="type==='add'?'select':'label'" name="fullName" id="id" @change="classChange" />
            </u-form-item>
            <u-form-item label="工作负责人" prop="gzfzrid" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.gzfzr" :modelId.sync="form.gzfzrid" :defaultValue="form.gzfzrid" :require="form.gzbz" errMessage="请先选择工作班组" :type="type==='add'?'people':'label'" />
            </u-form-item>
            <u-form-item label="工作人员" prop="gzry" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.gzryName" :modelId.sync="form.gzry" :require="form.gzbz" errMessage="请先选择工作班组" multiple :type="type==='add'?'people':'label'" />
            </u-form-item>
            <u-form-item label="备注" prop="bz" label-width="150">
                <efItem v-model="form.bz" title="备注" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
            </u-form-item>
            <u-form-item label="结论" prop="jl" label-width="150">
                <view class="flex1 flex-end">
                    <template v-if="type==='add'">
                        <u-radio-group v-model="form.jl" active-color="#05b2cc">
                            <u-radio shape="circle" :name="'合格'"><text class="green-text">合格</text></u-radio>
                            <u-radio shape="circle" :name="'不合格'"><text class="orange-text">不合格</text></u-radio>
                            <u-radio shape="circle" :name="'异常'"><text class="red-text">异常</text></u-radio>
                        </u-radio-group>
                    </template>
                    <template v-else>
                        <text style="font-size:24rpx">{{form.jl}}</text>
                    </template>
                </view>
            </u-form-item>
        </u-form>
        <!-- <button @click="getForm">getForm</button> -->
        <DefectHiddenAdd ref="DefectHiddenAdd" :details="details"/>
        <slot></slot>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { getNowTime } from "@/utils/tools";
import { dictMixins } from "@/mixins/dict-mixins";
import { defSaveOrUpdate, defFindByDef } from "@/api/defect";
import { getStore } from "@/utils/store.js";
import efItem from "@/components/ef-ui/ef-item/ef-item";
import DefectHiddenAdd from "./DefectHiddenAdd";
export default {
    components: {
        efItem,
        DefectHiddenAdd
    },
    mixins: [dictMixins],
    props: {
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
            formList: {
                dy_findTeamName: [] //班组
            },
            form: {
                gzbzid: "", //消缺班组
                gzbz: "",
                gzry: "",
                gzsj: "", //工作时间
                gzfzrid: "", //负责人
                gzfzr: "",
                jl: "", //是否延期 2是 1否
                bz: "" //备注
            },
            rules: {
                gzfzrid: [
                    {
                        required: true,
                        message: "请选择负责人"
                    }
                ],
                jl: [
                    {
                        required: true,
                        message: "请选择结论"
                    }
                ]
            }
        };
    },
    created() {
        if (this.type == "add") {
            this.form.gzsj = getNowTime();
            this.getTypelist();
            let userInfo = getStore("userInfo");
            this.form.gzfzr = userInfo.nick_name;
            this.form.gzfzrid = userInfo.user_id;
            this.form.gzryName = userInfo.nick_name;
            this.form.gzry = userInfo.user_id;
        }
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    computed: {
        formJL() {
            return this.form.jl;
        }
    },
    watch: {
        lastRecord: {
            handler(nval) {
                console.log(nval, "==========66");
                this.form = nval;
            },
            deep: true
        },
        formJL: {
            handler(nval) {
                console.log(nval, "formJL");
                if (nval == "不合格" && this.type == "add") {
                    console.log(this.lastRecord,"lastRecord000");
                    this.$refs.DefectHiddenAdd.showModal();
                }
            }
        }
    },
    methods: {
        getTypelist() {
            if (this.type == "details") return;
            //班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.formList.dy_findTeamName = res || [];
                const list = res || [];
                if (list.length == 1 && !this.form.gzbzid && !this.form.gzbz) {
                    this.form.gzbzid = list[0].id;
                    this.form.gzbz = list[0].fullName;
                    this.selectTeamUserList(this.form.gzbzid); //查询班组人员
                }
            });
        },
        getForm() {
            return new Promise((resolve, reject) => {
                this.$refs.uForm.validate((valid) => {
                    if (valid) {
                        console.log(this.form, "form");
                        resolve(this.form);
                    } else {
                        reject();
                    }
                });
            });
        },
        //选择班组
        classChange(data) {
            console.log(data, "班组");
            this.selectTeamUserList(data.id); //查询班组人员
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

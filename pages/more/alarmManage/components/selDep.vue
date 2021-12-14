<template>
    <view>
        <u-modal ref="uModal" v-model="modalShow" :title="title" show-cancel-button async-close @confirm="confirm" @cancel="cancel">
            <view>
                <view class="sure-group">
                    <u-form :model="form" ref="uForm" :error-type="['toast']">
                        <template v-if="modalShow">
                            <u-form-item prop="orgId" label="单位" label-width="150">
                                <efItem :data="dy_DW" v-model="form.orgName" :modelId.sync="form.orgId" type="select" name="fullName" id="id" @change="dwChange" />
                            </u-form-item>
                            <u-form-item prop="workId" label="车间" label-width="150">
                                <efItem :data="dy_CJ" v-model="form.workName" :modelId.sync="form.workId" :require="form.orgId" errMessage="请先选择单位" type="select" name="fullName" id="id" @change="cjChange" />
                            </u-form-item>
                            <u-form-item prop="whbz" label="班组" label-width="150">
                                <efItem :data="dy_BZ" :require="form.workId" errMessage="请先选择车间" v-model="form.whbzmc" :modelId.sync="form.whbz" type="select" name="fullName" id="id" @change="bzChange" />
                            </u-form-item>
                        </template>
                    </u-form>
                </view>
            </view>
        </u-modal>
    </view>
</template>
<script>
import { getStore } from "@/utils/store.js";
export default {
    props: {
        title: {
            type: String,
            default: "修改班组"
        }
    },
    data() {
        return {
            modalShow: false,
            dy_DW: [], //单位
            dy_CJ: [], //车间
            dy_BZ: [], //班组
            form: {
                orgName: "",
                orgId: "",
                whbzmc: "",
                whbz: "",
                workName: "",
                workId: ""
            },
            rules: {
                orgId: [
                    {
                        required: true,
                        message: "请选择单位"
                    }
                ],
                workId: [
                    {
                        required: true,
                        message: "请选择车间"
                    }
                ],
                whbz: [
                    {
                        required: true,
                        message: "请选择班组"
                    }
                ]
            }
        };
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
        this._getTypeList();
    },
    methods: {
        open() {
            this.modalShow = true;
        },
        close() {
            this.modalShow = false;
            this.$refs.uModal.clearLoading();
        },
        dwChange(data) {
            this.dy_CJ = data.children || [];
            this.form.workId = "";
            this.form.workName = "";
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        cjChange(data) {
            this.dy_BZ = data.children || [];
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        bzChange(data) {
            this.form = { ...this.form };
        },
        //模态框确认
        confirm() {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    //TODO 修改班组
                    this.$emit("bzConfirm", {
                        teamId: this.form.whbz,
                        teamName: this.form.whbzmc,
                        orgId: this.form.orgId,
                        orgName: this.form.orgName
                    });
                } else {
                    this.$refs.uModal.clearLoading();
                }
            });
        },
        cancel() {
            // this.dy_CJ = []; //车间
            // this.dy_BZ = []; //班组
            // this.form.orgId = "";
            // this.form.orgName = "";
            // this.form.workId = "";
            // this.form.workName = "";
            // this.form.whbz = "";
            // this.form.whbzmc = "";
            this.modalShow = false;
        },
        _getTypeList() {
            //获取当前公司、单位、班组
            //班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                const list = res || [];
                if (list.length == 1) {
                    this.form.whbz = list[0].id;
                    this.form.whbzmc = list[0].fullName;
                }
            });
            //车间
            this.$store.dispatch("getList", "YXCJ").then((res) => {
                const list = res || [];
                if (list.length === 1) {
                    this.form.workName = res[0].fullName;
                    this.form.workId = res[0].id;
                }
            });
            //公司
            this.$store.dispatch("getList", "YWDW").then((res) => {
                const list = res || [];
                if (list.length === 1) {
                    this.form.orgName = res[0].fullName;
                    this.form.orgId = res[0].id;
                }
            });
            this.$store.dispatch("getList", "deptList").then((res) => {
                let that = this;
                if (res.length > 0) {
                    this.dy_DW = res[0].children;
                    //填充车间、班组列表
                    orgloop: for (let org of that.dy_DW) {
                        if (org.id === that.form.orgId) {
                            that.dy_CJ = org.children;
                            for (let work of that.dy_CJ) {
                                if (work.id === that.form.workId) {
                                    that.dy_BZ = work.children;
                                    break orgloop;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sure-group {
    padding: 0 24rpx;
}
</style>
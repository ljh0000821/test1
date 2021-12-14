<template>
    <view>
        <custom-navbar title="验收总结" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <!-- <u-form-item prop="findTeamName" label="验收班组" label-width="150">
                    <efItem :data="YSBZ" v-model="form.findTeamName" :modelId.sync="form.findTeamId" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="classChange" />
                </u-form-item>
                <u-form-item prop="checkUser" label="验收人员" label-width="150">
                    <efItem :data="YSRY" v-model="form.checkUserName" :modelId.sync="form.checkUser" :require="form.findTeamName" errMessage="请先选择班组" multiple :type="type==='add'||type==='edit'?'people':'label'" />
                </u-form-item> -->
                <u-form-item label="验收人员" prop="checkUser" label-width="150">
                    <efItem v-model="form.checkUser" title="验收人员" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <u-form-item label="验收时间" prop="cleDate" label-width="150">
                    <efItem v-model="form.chechTime" type="label" />
                </u-form-item>
                <u-form-item prop="checkType" label="验收过程" label-width="150">
                    <efItem :data="YSGCLB" v-model="form.checkTypeName" :modelId.sync="form.checkType" name="dictValue" id="dictKey" :type="type==='add'||type==='edit'?'select':'label'" @change="change" />
                </u-form-item>
                <u-form-item label="验收总结" prop="cheSum" label-width="150">
                    <efItem v-model="form.cheSum" title="验收总结" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
            </u-form>
            <u-button class="ef-btn-normal btn-primary" :loading="loading" shape="circle" ripple plain @click="submit">提交</u-button>
        </view>
    </view>
</template>

<script>
import { checkengtaskSubmit } from "@/api/engineering";
import { getNowTime } from "@/utils/tools";
import { selectTeamUserList } from "@/api/dictionary";
import { getStore } from "@/utils/store.js";
export default {
    data() {
        return {
            type: "add",
            taskId: "",
            listObj: {},
            activeList: [],
            loading: false,
            YSBZ: [],
            YSRY: [],
            YSGCLB: [], //验收过程类别
            form: {
                checkUser: "",
                checkType: "",
                checkTypeName: ""
            },
            rules: {
                checkUser: [
                    {
                        required: true,
                        message: "请填写验收人员"
                    }
                ],
                checkType: [
                    {
                        required: true,
                        message: "请选择验收过程"
                    }
                ],
                cheSum: [
                    {
                        required: true,
                        message: "请填写验收总结"
                    }
                ]
            }
        };
    },
    onLoad(options) {
        this.listObj = options.listObj
            ? JSON.parse(decodeURIComponent(options.listObj))
            : {};
        this.taskId = options.taskId;
        this.activeCheckType = options.activeCheckType;
        this.form.chechTime = getNowTime();
        let usrInfo = getStore("userInfo");
        this.form.checkUser = usrInfo.nick_name;
        this.getYSGCLBL();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        submit() {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    console.log(this.form, "form");
                    let params = {
                        ...this.form,
                        id: this.activeList[0].id,
                        managId: this.taskId,
                        taskState: 5
                    };
                    this.loading = true;
                    checkengtaskSubmit([params]).then(() => {
                        this.$u.toast("提交成功");
                        this.loading = false;
                        setTimeout(() => {
                            this.$goBack();
                        }, 500);
                    });
                }
            });
        },
        //获取班组
        getClass() {
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.YSBZ = res || [];
                const list = res || [];
                if (this.type === "add" && list.length == 1) {
                    this.form.findTeamId = list[0].id;
                    this.form.findTeamName = list[0].fullName;
                }
                this.selectTeamUserList(this.form.findTeamId); //查询班组人员
            });
        },
        //查询班组查人员列表
        selectTeamUserList(id) {
            selectTeamUserList({
                deptId: id || this.form.teamId
            }).then(({ data }) => {
                this.YSRY = data.data.records || [];
            });
        },
        //选择班组
        classChange(data) {
            console.log(data, "班组");
            this.selectTeamUserList(data.id); //查询班组人员
        },
        getYSGCLBL() {
            //验收过程类别
            this.$store.dispatch("getList", "YSGCLB").then((res) => {
                console.log(res, "验收过程类别");
                console.log(
                    res[this.activeCheckType - 1],
                    "res[this.activeCheckType]",
                    this.activeCheckType
                );
                this.YSGCLB = res.filter((item) => {
                    let data = this.listObj[item.dictKey];
                    if (data.length > 0) {
                        return item;
                    }
                });
                console.log(this.YSGCLB, "this.YSGCLB");
                if (this.YSGCLB.length > 0) {
                    this.YSGCLB.forEach((item) => {
                        if (item.dictKey == this.activeCheckType) {
                            this.activeList = this.listObj[item.dictKey];
                            this.form.checkType = item.dictKey;
                            this.form.checkTypeName = item.dictValue;
                        }
                    });
                }
            });
        },
        change(data) {
            console.log(data, "data");
            this.activeList = this.listObj[data.dictKey];
        }
    }
};
</script>

<style>
</style>

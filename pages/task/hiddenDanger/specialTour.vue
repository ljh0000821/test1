<template>
    <view>
        <custom-navbar title="特巡记录" iconLeft></custom-navbar>
        <view class="container flex1">
            <u-form :model="form" ref="uForm">
                <u-form-item prop="troUser" label="现场维护人员" label-width="180">
                    <efItem :data="dy_teamUserList" v-model="form.troUserName" :modelId.sync="form.troUser" multiple :type="actionType=='add'?'people':'label'" />
                </u-form-item>
                <template v-if="type==0">
                    <u-form-item label="开始时间" prop="startTime" label-width="150">
                        <efItem v-model="form.startTime" :type="actionType=='add'?'time':'label'" />
                    </u-form-item>
                    <u-form-item label="结束时间" prop="endTime" label-width="150">
                        <efItem v-model="form.endTime" :type="actionType=='add'?'time':'label'" />
                    </u-form-item>
                </template>
                <template v-if="type==1">
                    <u-form-item label="维护时间" prop="troDate" label-width="150">
                        <efItem v-model="form.troDate" :type="actionType=='add'?'time':'label'" />
                    </u-form-item>
                </template>
                <u-form-item prop="troStatusNode" label="现场情况" label-width="150">
                    <efItem v-model="form.troStatusNode" title="现场情况" :isRightIcon="false" :type="actionType=='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
                <template v-if="type==0">
                    <u-form-item prop="instrument" label="使用仪器" label-width="150">
                        <efItem v-model="form.instrument" title="使用仪器" :isRightIcon="false" :type="actionType=='add'?'textarea':'label'" placeholder="请输入" />
                    </u-form-item>
                    <u-form-item prop="objective" label="目的" label-width="150">
                        <efItem v-model="form.objective" title="目的" :isRightIcon="false" :type="actionType=='add'?'textarea':'label'" placeholder="请输入" />
                    </u-form-item>
                    <u-form-item prop="conclusion" label="结论" label-width="150">
                        <efItem v-model="form.conclusion" title="结论" :isRightIcon="false" :type="actionType=='add'?'textarea':'label'" placeholder="请输入" />
                    </u-form-item>
                    <u-form-item prop="measures" label="需采取措施" label-width="150">
                        <efItem v-model="form.measures" title="需采取措施" :isRightIcon="false" :type="actionType=='add'?'textarea':'label'" placeholder="请输入" />
                    </u-form-item>
                </template>
                <u-form-item label="隐患照片" label-width="150" label-position="top">
                    <chooseImage ref="chooseImage" :images="form.troPics" :type="actionType" picType="3" />
                </u-form-item>
                <u-form-item label="隐患录音" label-width="150" label-position="top">
                    <chooseAudio ref="chooseAudio" :audioList="form.troVois" :type="actionType" picType="3" />
                </u-form-item>
                <u-form-item label="隐患视频" label-width="150" label-position="top">
                    <chooseVideo ref="chooseVideo" :videoList="form.troVids" :type="actionType" picType="3" />
                </u-form-item>
            </u-form>
            <template v-if="actionType=='add'">
                <u-button class="ef-btn" type="primary" :loading="loading" ripple @click="submit">确认</u-button>
            </template>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { getNowTime } from "@/utils/tools";
import { getStore } from "@/utils/store.js";
import { troextmSubmit, trotreemSubmit } from "@/api/hiddenDanger";
import { selectTeamUserList } from "@/api/dictionary";
import { getTime, decodeData } from "@/utils/tools";
const fn = {
    troextmSubmit: (data) => troextmSubmit(data),
    trotreemSubmit: (data) => trotreemSubmit(data)
};
export default {
    components: {
        efItem
    },
    data() {
        return {
            loading: false,
            type: "", //0外力 1树林
            actionType: "add",
            id: "",
            details: {},
            loadingSure: false,
            loadingSave: false,
            form: {
                teamName: "",
                teamId: "",
                troUser: "", //现场维护人员
                startTime: "", //开始时间
                endTime: "", //结束
                troDate: "", //维护时间
                troStatusNode: "" //现场情况
            },
            rules: {
                troUser: [
                    {
                        required: true,
                        message: "请选择维护人员"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: "请选择开始时间"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "请选择结束时间"
                    }
                ],
                troDate: [
                    {
                        required: true,
                        message: "请选择维护时间"
                    }
                ],
                troStatusNode: [
                    {
                        required: true,
                        message: "请填写现场情况"
                    }
                ]
            },
            dy_teamUserList: []
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.type = options.type;
        this.actionType = options.actionType || "add";
        this.form.teamName = options.teamName;
        this.form.teamId = options.teamId;
        if (options.details && this.actionType == "details") {
            console.log(decodeData(options.details), "options.details");
            this.form = decodeData(options.details);
        }
        this._selectTeamUserList();
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
        this.form.startTime = getNowTime();
        this.form.endTime = getNowTime();
        this.form.troDate = getNowTime();
        let usrInfo = getStore("userInfo");
        this.form.troUserName = usrInfo.nick_name;
        this.form.troUser = usrInfo.user_id;
    },
    computed: {
        status() {
            return this.form.state || "";
        }
    },
    methods: {
        //查询班组查人员列表
        _selectTeamUserList() {
            selectTeamUserList({
                deptId: this.form.teamId
            }).then(({ data }) => {
                this.dy_teamUserList = data.data.records || [];
            });
        },
        submit(state) {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    if (
                        getTime(this.form.startTime) >
                        getTime(this.form.endTime)
                    ) {
                        this.$refs.uToast.show({
                            title: "结束时间不能小于开始时间！"
                        });
                        return;
                    }
                    if (state == 5) {
                        this.loadingSure = true;
                    } else {
                        this.loadingSave = true;
                    }
                    let params = {
                        ...this.form
                    };
                    let str = "";
                    if (this.type == 0) {
                        params.troExtId = this.id;
                        str = "troextmSubmit";
                    }
                    if (this.type == 1) {
                        params.troTreeId = this.id;
                        str = "trotreemSubmit";
                    }
                    this.loading = true;
                    console.log(params, "params");
                    try {
                        params.troPic = await this.$refs.chooseImage.getIds();
                        params.troVoi = await this.$refs.chooseAudio.getIds();
                        params.troVid = await this.$refs.chooseVideo.getIds();
                    } catch (err) {
                        this.loading = false;
                        return;
                    }
                    fn[str](params)
                        .then(() => {
                            this.loading = false;
                            this.$refs.uToast.show({
                                title: "维护成功！"
                            });
                            setTimeout(() => {
                                this.$goBack();
                            }, 500);
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
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
.btn {
    width: 120rpx;
    height: 50rpx !important;
    border-radius: 30rpx;
    font-size: 24rpx !important;
    border-color: #05b2cc;
    color: #05b2cc;
}
.btn-active {
    color: #fff;
    background-color: #05b2cc;
}
</style>

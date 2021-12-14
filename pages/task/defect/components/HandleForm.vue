<template>
    <view>
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="消缺单位" prop="cleOrg" label-width="150">
                <efItem :data="formList.dy_YWDW" :modelId.sync="form.cleOrg" v-model="form.cleOrgName" :type="type==='add'?'select':'label'" name="fullName" id="id" />
            </u-form-item>
            <u-form-item label="消缺班组" prop="cleTeam" label-width="150">
                <efItem :data="formList.dy_findTeamName" v-model="form.cleTeamName" :modelId.sync="form.cleTeam" :type="type==='add'?'select':'label'" name="fullName" id="id" @change="classChange" />
            </u-form-item>
            <u-form-item label="消缺人" prop="cleUser" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.cleUserName" :modelId.sync="form.cleUser" :defaultValue="form.cleUser" multiple :type="type==='add'?'people':'label'" />
            </u-form-item>
            <u-form-item label="消缺时间" prop="cleDate" label-width="150">
                <efItem v-model="form.cleDate" :endTime="$store.state.nowDate" :type="type==='add'?'time':'label'" />
            </u-form-item>
            <u-form-item label="工作负责人" prop="workLeader" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.workLeaderName" :modelId.sync="form.workLeader" :defaultValue="form.workLeader" :type="type==='add'?'people':'label'" />
            </u-form-item>
            <u-form-item label="是否延期" prop="isLay" label-width="150">
                <view class="flex1 flex-end">
                    <template v-if="type==='add'">
                        <u-radio-group v-model="form.isLay" active-color="#05b2cc">
                            <u-radio shape="circle" :name="2">是</u-radio>
                            <u-radio shape="circle" :name="1">否</u-radio>
                        </u-radio-group>
                    </template>
                    <template v-else>
                        <text style="font-size:24rpx">{{(form.isLay==2&&'是')||(form.isLay==1&&'否')||''}}</text>
                    </template>
                </view>
            </u-form-item>
            <template v-if="form.isLay==2">
                <u-form-item label="延期说明" prop="layDesc" label-width="150">
                    <efItem v-model="form.layDesc" title="延期说明" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
                </u-form-item>
            </template>
            <u-form-item label="处理结果" prop="cleDesc" label-width="150">
                <efItem v-model="form.cleDesc" title="处理结果" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
            </u-form-item>
            <u-form-item label="遗留问题" prop="cleContent" label-width="150">
                <efItem v-model="form.cleContent" title="遗留问题" :isRightIcon="false" :type="type==='add'?'textarea':'label'" placeholder="请输入" />
            </u-form-item>
            <u-form-item prop="defClePicVOList" label="拍照" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.defClePicVOList" :type="type" />
            </u-form-item>
            <u-form-item prop="defCleVoiVOList" label="录音" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.defCleVoiVOList" :type="type" />
            </u-form-item>
            <u-form-item prop="defCleVidVOList" label="视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.defCleVidVOList" :type="type" />
            </u-form-item>
        </u-form>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { dictMixins } from "@/mixins/dict-mixins";
import { defSaveOrUpdate, defFindByDef } from "@/api/defect";
import { getStore } from "@/utils/store.js";
import efItem from "@/components/ef-ui/ef-item/ef-item";
import chooseImage from "@/components/choose-image/choose-image";
import chooseVideo from "@/components/choose-video/choose-video";
import mRecorder from "@/components/m-recorder/m-recorder";
export default {
    components: {
        efItem,
        chooseImage,
        chooseVideo,
        mRecorder
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
        }
    },
    data() {
        return {
            formList: {
                dy_findTeamName: [], //班组
                dy_plCleorg: [] //消缺单位
            },
            form: {
                cleOrgName: "", //消缺单位
                cleOrg: "",
                cleTeam: "", //消缺班组
                cleTeamName: "",
                cleUser: "", //消缺人
                cleUserName: "",
                cleDate: "", //消缺时间
                workLeader: "", //负责人
                workLeaderName: "",
                isLay: 1, //是否延期 2是 1否
                layDesc: "", //延期说明
                cleDesc: "", //处理结果
                cleContent: "" //遗留问题
            },
            rules: {
                cleOrg: [
                    {
                        required: true,
                        message: "请选择消缺单位"
                    }
                ],
                cleUser: [
                    {
                        required: true,
                        message: "请选择消缺人"
                    }
                ],
                cleDate: [
                    {
                        required: true,
                        message: "请选择消缺时间"
                    }
                ],
                workLeader: [
                    {
                        required: true,
                        message: "请选择负责人"
                    }
                ],
                isLay: [
                    {
                        required: true,
                        message: "请选择是否延期"
                    }
                ]
            }
        };
    },
    created() {
        this._defFindByDef();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    watch: {
        details: {
            handler(nval) {
                console.log(nval, "缺陷详情处理");
                if (!this.needGet) {
                    this.form = nval;
                    if (!this.form.cleUserName && !this.form.cleUser) {
                        let userInfo = getStore("userInfo");
                        this.form.cleUserName = userInfo.nick_name;
                        this.form.cleUser = userInfo.user_id;
                    }
                    this.getTypelist();
                }
            },
            deep: true,
            immediate: true
        },
        form: {
            handler(nval) {
                console.log(nval, "handle的form");
                setTimeout(() => {
                    this.$emit("over");
                }, 300);
            },
            deep: true
        }
    },
    methods: {
        getTypelist() {
            if (this.type == "details") return;
            //运维单位==公司
            this.$store.dispatch("getList", "YWDW").then((res) => {
                console.log(res, "运维单位");
                this.formList.dy_YWDW = res || [];
                if (
                    res.length === 1 &&
                    !this.form.cleOrg &&
                    !this.form.cleOrgName
                ) {
                    this.form.cleOrgName = res[0].fullName;
                    this.form.cleOrg = res[0].id;
                }
            });
            //班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.formList.dy_findTeamName = res || [];
                const list = res || [];
                if (
                    list.length == 1 &&
                    !this.form.cleTeam &&
                    !this.form.cleTeamName
                ) {
                    this.form.cleTeam = list[0].id;
                    this.form.cleTeamName = list[0].fullName;
                    this.selectTeamUserList(this.form.cleTeam); //查询班组人员
                }
            });
            //计划消缺单位
            this.$store.dispatch("getList", "JHXQDW").then((res) => {
                console.log(res, "计划消缺单位");
                this.formList.dy_plCleorg = res || [];
            });
        },
        submit() {
            return new Promise((resolve, reject) => {
                this.$refs.uForm.validate(async (valid) => {
                    if (valid) {
                        console.log(this.form, "form");
                        this.form.defState = "3";
                        // this.form.cleDate =
                        //     this.form.cleDate.replace(/\//g, "-") + " 00:00:00";
                        this.form.clePic =
                            await this.$refs.chooseImage.getIds();
                        this.form.cleVid =
                            await this.$refs.chooseVideo.getIds();
                        this.form.cleVoi =
                            await this.$refs.chooseAudio.getIds();
                        defSaveOrUpdate(this.form).then(() => {
                            this.$refs.uToast.show({
                                title: "处理成功！"
                            });
                            resolve();
                        });
                    } else {
                        reject();
                    }
                });
            });
        },
        //缺陷详情
        _defFindByDef() {
            if (!this.needGet) return;
            defFindByDef(this.id).then((res) => {
                console.log(res, "详情");
                this.form = res.data.data;
                if (!this.form.cleUserName && !this.form.cleUser) {
                    let userInfo = getStore("userInfo");
                    this.form.cleUserName = userInfo.nick_name;
                    this.form.cleUser = userInfo.user_id;
                }
                this.getTypelist();
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

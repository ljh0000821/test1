<template>
    <view>
        <u-form :model="form" ref="uForm">
            <template v-if="tag==0">
                <u-form-item prop="claUsers" label="处理人员" label-width="150">
                    <efItem :data="dy_teamUserList" v-model="form.troClaUsers" :modelId.sync="form.claUsers" multiple :type="type==='add'||type==='edit'?'people':'label'" />
                </u-form-item>
            </template>
            <template v-if="tag==1">
                <u-form-item prop="claUsers" label="处理人员" label-width="150">
                    <efItem :data="dy_teamUserList" v-model="form.troClaUsers" :modelId.sync="form.claUserIds" multiple :type="type==='add'||type==='edit'?'people':'label'" />
                </u-form-item>
            </template>
            <u-form-item label="处理时间" prop="claTime" label-width="150">
                <efItem v-model="form.claTime" :endTime="$store.state.nowDate" :type="type==='add'||type==='edit'?'time':'label'" />
            </u-form-item>
            <view class="title">处理前</view>
            <u-form-item label="隐患处理前照片" label-position="top">
                <chooseImage ref="beforeImage" :images="form.claPicBefs" :type="type" picType="3" />
            </u-form-item>
            <u-form-item label="隐患处理前录音" label-position="top">
                <chooseAudio ref="beforeAudio" :audioList="form.claVoiBefs" :type="type" picType="3" />
            </u-form-item>
            <u-form-item label="隐患处理前视频" label-position="top">
                <chooseVideo ref="beforeVideo" :videoList="form.claVidBefs" :type="type" picType="3" />
            </u-form-item>
            <view class="title">处理后</view>
            <u-form-item label="隐患处理后照片" label-position="top">
                <chooseImage ref="afterImage" :images="form.claPics" :type="type" picType="3" />
            </u-form-item>
            <u-form-item label="隐患处理后录音" label-position="top">
                <chooseAudio ref="afterAudio" :audioList="form.claVois" :type="type" picType="3" />
            </u-form-item>
            <u-form-item label="隐患处理后视频" label-position="top">
                <chooseVideo ref="afterVideo" :videoList="form.claVids" :type="type" picType="3" />
            </u-form-item>
            <template v-if="tag==1">
                <u-form-item prop="claWllen" label="水平距离（m）" label-width="240">
                    <u-input v-model="form.claWllen" type="number" :disabled="type!=='add'&&type!=='edit'" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" />
                </u-form-item>
                <u-form-item prop="claMwlen" label="垂直距离（m）" label-width="240">
                    <u-input v-model="form.claMwlen" type="number" :disabled="type!=='add'&&type!=='edit'" input-align="right" :placeholder="type==='add'||type==='edit'?'请输入':''" />
                </u-form-item>
                <u-form-item label="净空距离（m）" label-width="240">
                    <view class="flex1 flex-end">{{claMelen}}</view>
                </u-form-item>
            </template>
            <u-form-item prop="claMonitorOpinions" label="备注" label-width="150" label-position="top">
                <view class="flex1">
                    <view v-if="type==='add'||type==='edit'?true:false">
                        <u-input border placeholder="请输入" v-model="form.claMonitorOpinions" type="textarea" />
                    </view>
                    <view class="f-s-24" v-if="type==='details'">
                        {{form.claMonitorOpinions}}
                    </view>
                </view>
            </u-form-item>
        </u-form>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="type==='add'||type==='edit'" class="btn custom-style" shape="circle" :loading="loadingSure" ripple @click="submit(5)">确定</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="type==='add'||type==='edit'" class="btn btn-plain" shape="circle" :loading="loadingSave" ripple plain @click="submit(4)">保存</u-button>
        <u-button v-permission="'teamLeader'" v-if="['5'].includes(status)" class="btn custom-style" shape="circle" ripple @click="toExamine('bzsh')">审核</u-button>
        <u-button v-permission="'zhuanze'" v-if="['6'].includes(status)" class="btn custom-style" shape="circle" ripple @click="toExamine('zzsh')">审核</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="status==4&&type=='details'" class="btn custom-style" type="primary" shape="circle" ripple @click="toHandle">编辑</u-button>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
import { getNowTime } from "@/utils/tools";
import { getStore } from "@/utils/store.js";
import {
    troextSubmit,
    trotreeSubmit,
    troextDetail,
    trotreeDetail
} from "@/api/hiddenDanger";
import { selectTeamUserList } from "@/api/dictionary";
const Fn = {
    troextDetail: (data) => troextDetail(data),
    trotreeDetail: (data) => trotreeDetail(data)
};
const submitFn = {
    troextSubmit: (data) => troextSubmit(data),
    trotreeSubmit: (data) => trotreeSubmit(data)
};
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
        tag: {
            default: 0 //0外力 1树林
        },
        teamId: {
            type: String,
            default: ""
        },
        details: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        efItem
    },
    data() {
        return {
            loadingSure: false,
            loadingSave: false,
            form: {
                claUsers: "", //审核人员
                claUserIds: "",
                claTime: "", //审核时间
                claMonitorOpinions: "" //班长处理意见
            },
            rules: {
                claUsers: [
                    {
                        required: this.tag == 0 ? true : false,
                        message: "请选择处理人员"
                    }
                ],
                claUserIds: [
                    {
                        required: this.tag == 1 ? true : false,
                        message: "请选择处理人员"
                    }
                ],
                claTime: [
                    {
                        required: true,
                        message: "请选择处理时间"
                    }
                ]
            },
            dy_teamUserList: []
        };
    },
    created() {
        console.log(this.type, "type");
        if (this.type == "edit") {
            this._troextDetail();
        }
        this._selectTeamUserList();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
        if (this.type === "add") {
            this.form.claTime = getNowTime();
            let usrInfo = getStore("userInfo");
            this.form.troClaUsers = usrInfo.nick_name;
            this.form.claUsers = usrInfo.user_id;
        }
    },
    watch: {
        details: {
            handler(nval) {
                console.log(nval, "nval,data66");
                this.form = nval;
                this.$emit("over");
            },
            deep: true
        }
    },
    computed: {
        status() {
            return this.form.state || "";
        },
        claMelen() {
            const { claWllen, claMwlen } = this.form;
            let num = "";
            if (claWllen && claMwlen) {
                num = Math.sqrt(claWllen * claWllen + claMwlen * claMwlen);
                if (String(num).length > 5) num = num.toFixed(2);
                this.$set(this.form, "claMelen", num);
            }
            return num;
        }
    },
    methods: {
        //查询班组查人员列表
        _selectTeamUserList() {
            selectTeamUserList({
                deptId: this.teamId
            }).then(({ data }) => {
                this.dy_teamUserList = data.data.records || [];
            });
        },
        submit(state) {
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    if (state == 5) {
                        this.loadingSure = true;
                    } else {
                        this.loadingSave = true;
                    }
                    let params = {
                        ...this.form,
                        id: this.id,
                        state: state
                    };
                    delete params.troClaUsers;
                    let str = this.tag == 0 ? "troextSubmit" : "trotreeSubmit";
                    try {
                        params.claPicBef =
                            await this.$refs.beforeImage.getIds();
                        params.claVoiBef =
                            await this.$refs.beforeAudio.getIds();
                        params.claVidBef =
                            await this.$refs.beforeVideo.getIds();
                        params.claPic = await this.$refs.afterImage.getIds();
                        params.claVoi = await this.$refs.afterAudio.getIds();
                        params.claVid = await this.$refs.afterVideo.getIds();
                    } catch (err) {
                        this.loadingSure = false;
                        this.loadingSave = false;
                        return;
                    }
                    submitFn[str](params)
                        .then(() => {
                            this.loadingSure = false;
                            this.loadingSave = false;
                            this.$refs.uToast.show({
                                title: "处理成功！"
                            });
                            setTimeout(() => {
                                this.$goBack();
                            }, 500);
                        })
                        .catch(() => {
                            this.loadingSure = false;
                            this.loadingSave = false;
                        });
                }
            });
        },
        //跳转审核
        toExamine(state) {
            uni.navigateTo({
                url:
                    "pages/task/hiddenDanger/examine?id=" +
                    this.id +
                    "&stateObj=" +
                    state +
                    "&type=" +
                    this.tag
            });
        },
        //跳转编辑
        toHandle() {
            uni.navigateTo({
                url: "pages/task/hiddenDanger/handle?id=" + this.id + "&type=edit&tag=" + this.tag
            });
        },
        //隐患详情
        _troextDetail() {
            if (!this.id) return;
            let params = {
                id: this.id
            };
            let str = this.tag == 0 ? "troextDetail" : "trotreeDetail";
            Fn[str](params).then((res) => {
                console.log(res, "隐患详情===");
                this.form = res.data.data;
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
.title {
    font-size: 32rpx;
    font-weight: bold;
    margin-top: 32rpx;
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

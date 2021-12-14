<template>
    <view>
        <custom-navbar title="修试记录录入" iconLeft></custom-navbar>
        <view class="container">
            <u-form :model="form" ref="uForm" :error-type="['toast']">
                <u-form-item prop="gzbz" label="处理班组" label-width="150">
                    <efItem :data="dy_Class" v-model="form.gzbzmc" :modelId.sync="form.gzbz" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="classChange" />
                </u-form-item>
                <u-form-item prop="gzry" label="处理人" label-width="150">
                    <efItem :data="dy_teamUserList" v-model="form.gzryName" :modelId.sync="form.gzry" multiple :type="type==='add'||type==='edit'?'people':'label'" />
                </u-form-item>
                <u-form-item prop="troReport" label="处理意见" label-width="150" label-position="top">
                    <view class="flex1">
                        <u-input border :placeholder="type==='details'?'':'请输入'" :disabled="type==='details'?true:false" v-model="form.ysyj" type="textarea" />
                    </view>
                </u-form-item>
                <u-form-item prop="troReport" label="遗留问题" label-width="150" label-position="top">
                    <view class="flex1">
                        <u-input border :placeholder="type==='details'?'':'请输入'" :disabled="type==='details'?true:false" v-model="form.ylwt" type="textarea" />
                    </view>
                </u-form-item>
                <u-form-item prop="defPicVOList" label="修试照片" label-width="150" label-position="top">
                    <chooseImage ref="chooseImage" :images="form.taskPics" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defVoiVOList" label="修试录音" label-width="150" label-position="top">
                    <chooseAudio ref="chooseAudio" :audioList="form.taskVois" :type="type" picType="1" />
                </u-form-item>
                <u-form-item prop="defVidVOList" label="修试视频" label-width="150" label-position="top">
                    <chooseVideo ref="chooseVideo" :videoList="form.taskVids" :type="type" picType="1" />
                </u-form-item>
            </u-form>
            <view class="flex-around btn-group">
                <u-button class="ef-btn-normal btn-normal" v-if="type==='add'" :loading="loading1" shape="circle" ripple plain @click="submit(1)">保存</u-button>
                <u-button class="ef-btn-normal btn-primary" v-if="type==='add'" :loading="loading2" shape="circle" ripple plain @click="modalShow=true">发起验收</u-button>
            </view>
        </view>
        <u-modal ref="uModal" v-model="modalShow" title="发起验收" show-cancel-button async-close @confirm="confirm" @cancel="cancel">
            <view class="slot-content">
                <view class="flex-center tips-text">请再次确认信息</view>
                <view class="sure-group">
                    <u-form :model="form" ref="uForm2" :error-type="['toast']">
                        <template v-if="modalShow">
                            <u-form-item prop="orgId" label="验收单位" label-width="150">
                                <efItem :data="dy_DW" v-model="form.orgName" :modelId.sync="form.orgId" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="dwChange" />
                            </u-form-item>
                            <u-form-item prop="workId" label="验收车间" label-width="150">
                                <efItem :data="dy_CJ" v-model="form.workName" :modelId.sync="form.workId" :require="form.orgId" errMessage="请先选择单位" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="cjChange" />
                            </u-form-item>
                            <u-form-item prop="whbz" label="验收班组" label-width="150">
                                <efItem :data="dy_BZ" :require="form.workId" errMessage="请先选择车间" v-model="form.whbzmc" :modelId.sync="form.whbz" :type="type==='add'||type==='edit'?'select':'label'" name="fullName" id="id" @change="bzChange" />
                            </u-form-item>
                        </template>
                    </u-form>
                </view>
            </view>
        </u-modal>
    </view>
</template>

<script>
import { dictMixins } from "@/mixins/dict-mixins";
import { getStore } from "@/utils/store.js";
import { tyjdwyjxsjlSubmit, taskhaulitemGetkcxsys } from "@/api/overhaul";
export default {
    props: {},
    mixins: [dictMixins],
    data() {
        return {
            type: "add",
            modalShow: false,
            loading1: false,
            loading2: false,
            twrGzrwdId: "",
            deptList: [], //单位=》车间=》班组 树
            dy_DW: [], //单位
            dy_CJ: [], //车间
            dy_BZ: [], //班组
            dy_Class: [], //班组
            form: {
                gzbzmc: "",
                gzbz: "",
                gzryName: "",
                gzry: "",
                ysyj: "",
                ylwt: "",
                orgName: "",
                orgId: "",
                whbzmc: "",
                whbz: "",
                workName: "",
                workId: "",
                taskPics: [],
                taskVids: [],
                taskVois: []
            },
            rules: {
                gzbz: [
                    {
                        required: true,
                        message: "请选择班组"
                    }
                ],
                gzry: [
                    {
                        required: true,
                        message: "请选择处理人员"
                    }
                ]
            },
            rules2: {
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
    onLoad(options) {
        this.twrGzrwdId = options.twrGzrwdId;
        if (options.state > 2) {
            this.type = "details";
        }
        this._taskhaulitemGetkcxsys();
        this._getClass();
        this._getTypeList();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
        this.$refs.uForm2.setRules(this.rules2);
    },
    methods: {
        //获取班组及班组人员
        _getClass() {
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                console.log(res, "班组");
                this.dy_Class = res || [];
                const list = res || [];
                if (this.type == "add" && list.length == 1) {
                    this.form.gzbz = list[0].id;
                    this.form.gzbzmc = list[0].fullName;
                }
                this.selectTeamUserList(this.form.gzbz); //查询班组人员
            });
        },
        submit(type) {
            //1保存，2发起验收
            this.$refs.uForm.validate(async (valid) => {
                if (valid) {
                    this["loading" + type] = true;
                    this.form.xsjlPic = await this.$refs.chooseImage.getIds();
                    this.form.xsjlVoi = await this.$refs.chooseAudio.getIds();
                    this.form.xsjlVid = await this.$refs.chooseVideo.getIds();
                    let params = {
                        ...this.form,
                        type: type,
                        twrGzrwdId: this.twrGzrwdId
                    };
                    console.log(params, "params");
                    tyjdwyjxsjlSubmit(params).then(() => {
                        this.$u.toast(
                            `${
                                (type == 1 && "保存") ||
                                (type == 2 && "发起验收")
                            }成功`
                        );
                        if (type == 2) {
                            this.cancel();
                            this.$refs.uModal.clearLoading();
                        }
                        setTimeout(() => {
                            this.$goBack(type);
                        }, 500);
                    });
                }
            });
        },
        //选择班组
        classChange() {
            this.selectTeamUserList(this.form.gzbz); //查询班组人员
        },
        //模态框确认
        confirm() {
            this.$refs.uForm2.validate(async (valid) => {
                if (valid) {
                    this.submit(2);
                    // setTimeout(() => {
                    //     this.cancel();
                    //     this.$refs.uModal.clearLoading();
                    // }, 3000);
                } else {
                    this.$refs.uModal.clearLoading();
                }
            });
        },
        cancel() {
            this.modalShow = false;
            this.dy_CJ = []; //车间
            this.dy_BZ = []; //班组
            this.form.orgId = "";
            this.form.orgName = "";
            this.form.workId = "";
            this.form.workName = "";
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        _getTypeList() {
            if (this.type == "details") return;
            //运维单位==公司
            this.$store.dispatch("getList", "YWDW").then((res) => {
                console.log(res, "运维单位");
                // this.dy_YWDW = res || [];
                // if (this.type === "add" && res.length === 1) {
                //     this.form.orgName = res[0].fullName;
                //     this.form.orgId = res[0].id;
                // }
            });
            //运维车间
            this.$store.dispatch("getList", "YXCJ").then((res) => {
                console.log(res, "运维车间");
                // this.dy_YWDW = res || [];
                // if (this.type === "add" && res.length === 1) {
                //     this.form.orgName = res[0].fullName;
                //     this.form.orgId = res[0].id;
                // }
            });
            this.$store.dispatch("getList", "deptList").then((res) => {
                console.log(res, "deptList");
                if (res.length > 0) {
                    this.deptList = res[0];
                    this.dy_DW = res[0].children;
                }
            });
        },
        dwChange(data) {
            console.log(data, "data");
            this.dy_CJ = data.children || [];
            this.form.workId = "";
            this.form.workName = "";
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        cjChange(data) {
            console.log(data, "车间data");
            this.dy_BZ = data.children || [];
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        bzChange(data) {
            console.log(data, "班组data");
            this.form = {...this.form};
        },
        //获取修试记录
        _taskhaulitemGetkcxsys() {
            let params = {
                index: 2, //1勘测 2修试 3验收
                twrGzrwdId: this.twrGzrwdId
            };
            taskhaulitemGetkcxsys(params).then((res) => {
                console.log(res, "修饰记录详情");
                let rel = res.data.data;
                if (
                    this.type == "add" &&
                    this.dy_Class.length == 1 &&
                    !rel.gzbz &&
                    !rel.gzbzmc
                ) {
                    rel.gzbz = this.dy_Class[0].id;
                    rel.gzbzmc = this.dy_Class[0].fullName;
                }
                this.form = this.$filterForm(rel, this.form);
                if (this.type == "add" && !rel.gzryName && !rel.gzry) {
                    let usrInfo = getStore("userInfo");
                    this.form.gzryName = usrInfo.nick_name;
                    this.form.gzry = usrInfo.user_id;
                }
            });
        }
    }
};
</script>

<style scoped>
.btn-group {
    margin: 24rpx 0;
}
.tips-text {
    font-size: 20rpx;
    color: gray;
    margin: 16rpx 0;
}
.sure-group {
    padding: 0 24rpx;
}
</style>

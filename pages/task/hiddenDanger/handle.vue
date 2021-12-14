<template>
    <view>
        <custom-navbar title="处理隐患" iconLeft></custom-navbar>
        <view class="container flex1">
            <HandleForm ref="HandleForm" :id="id" :type="type" :tag="tag" :teamId="teamId" />
        </view>
    </view>
</template>

<script>
import { getNowTime } from "@/utils/tools";
import { getStore } from "@/utils/store.js";
import { troextSubmit } from "@/api/hiddenDanger";
import { selectTeamUserList } from "@/api/dictionary";
import HandleForm from "./components/HandleForm";
export default {
    components: {
        HandleForm
    },
    data() {
        return {
            type: "add",
            tag: 0, //0外力 1隐患
            teamId: "",
            loadingSure: false,
            loadingSave: false,
            id: "",
            form: {
                claUsers: "", //审核人员
                claTime: "", //审核时间
                claMonitorOpinions: "" //班长处理意见
            },
            rules: {
                claUsers: [
                    {
                        required: true,
                        message: "请选择处理人员"
                    }
                ],
                claTime: [
                    {
                        required: true,
                        message: "请选择处理时间"
                    }
                ]
            }
            // dy_teamUserList: []
        };
    },
    onLoad(options) {
        console.log(options, "options");
        this.type = options.type || "add";
        this.id = options.id;
        this.tag = options.tag;
        this.teamId = options.teamId;
        // this._selectTeamUserList();
    },
    onReady() {
        if (this.type === "add") {
            this.form.claTime = getNowTime();
            let usrInfo = getStore("userInfo");
            this.form.troClaUsers = usrInfo.nick_name;
            this.form.claUsers = usrInfo.user_id;
        }
    },
    methods: {
        //查询班组查人员列表
        // _selectTeamUserList() {
        //     selectTeamUserList({
        //         deptId: this.form.teamId
        //     }).then(({ data }) => {
        //         this.dy_teamUserList = data.data.records || [];
        //     });
        // },
        submit(state) {
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
            console.log(params, "params");
            troextSubmit(params)
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

<template>
    <view>
        <custom-navbar :title="['0','1'].includes(status)?'编辑缺陷':'缺陷详情'" iconLeft></custom-navbar>
        <view class="container">
            <u-collapse arrow accordion>
                <u-collapse-item ref="collapseDefectForm" open title="缺陷详情">
                    <view class="collapse-item">
                        <DefectForm ref="DefectForm" :id="id" :type="['0','1'].includes(status)?'edit':'details'" :details="details" @over="initCollapse('collapseDefectForm')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="['0','1'].includes(status)" class="btn btn-plain" shape="circle" ripple plain :loading="saveLoading" @click="save(1)">保存</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="['0','1'].includes(status)" class="btn custom-style" type="primary" shape="circle" ripple :loading="submitLoading" @click="save(2)">提交</u-button>
        <u-button v-permission="'teamLeader'" v-if="status==2" class="btn custom-style" type="primary" shape="circle" ripple @click="toExamine">审核</u-button>
        <u-button v-permission="['user','teamLeader','zhuanze']" v-if="status==4" class="btn custom-style" type="primary" shape="circle" ripple @click="toHandle">处理</u-button>
        <template v-if="status==3">
            <view class="container" style="margin-top:30rpx">
                <u-collapse ref="collapseHandleForm" event-type="close" arrow accordion>
                    <u-collapse-item title="消缺信息">
                        <view class="collapse-item">
                            <HandleForm ref="HandleForm" :id="id" :needGet="false" :details="details" type="details" @over="initCollapse('collapseHandleForm')" />
                        </view>
                    </u-collapse-item>
                </u-collapse>
            </view>
        </template>
        <view class="container" style="margin-top:30rpx">
            <u-collapse ref="collapseHistory" event-type="close" arrow accordion>
                <u-collapse-item title="流程流转记录">
                    <view class="collapse-item">
                        <History ref="History" :id="id" url="/blade-sd/history/listH" @over="initCollapse('collapseHistory')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
    </view>
</template>

<script>
import DefectForm from "./components/DefectForm";
import History from "@/components/base/baseHistory";
import HandleForm from "./components/HandleForm";
import { defFindByDef } from "@/api/defect";
export default {
    components: {
        DefectForm,
        History,
        HandleForm
    },
    data() {
        return {
            submitLoading: false,
            saveLoading: false,
            id: "",
            details: {},
            state: null
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.state = options.state;
    },
    onShow() {
        console.log("onshow了");
        this._defFindByDef();
    },
    computed: {
        status() {
            if (this.details.defState) {
                return this.details.defState;
            } else {
                return this.state;
            }
        }
    },
    methods: {
        //跳转审核
        toExamine() {
            uni.navigateTo({
                url: "pages/task/defect/defectExamine?id=" + this.id
            });
        },
        //跳转处理
        toHandle() {
            uni.navigateTo({
                url: "pages/task/defect/defectHandle?id=" + this.id
            });
        },
        //缺陷详情
        _defFindByDef() {
            defFindByDef(this.id).then((res) => {
                this.details = res.data.data;
                console.log(this.details, "onshow详情");
            });
        },
        //缺陷编辑的保存提交
        save(state) {
            this.$u.toast(`${state == 2 ? "提交" : "保存"}中...`);
            let loadStr = state == 2 ? "submitLoading" : "saveLoading";
            console.log(loadStr, "loadStr");
            this[loadStr] = true;
            this.$refs.DefectForm.save(state).then(() => {
                this[loadStr] = false;
            });
        },
        //重新计算折叠面板高度
        initCollapse(str) {
            this.$refs[str].init();
        }
    },
    onReachBottom() {
        this.$refs.History.loadMore();
    }
};
</script>

<style scoped>
.collapse-item {
    padding-bottom: 10px;
}
.container {
    margin: 0 16rpx;
    background: #ffffff;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 24rpx;
    padding: 15rpx 40rpx 15rpx 40rpx;
    box-sizing: border-box;
}
/* .btn {
    width: 200rpx;
    height: 60rpx !important;
    box-shadow: 0px 4rpx 16rpx 0px rgba(14, 23, 37, 0.08);
    border-radius: 30rpx;
    margin-top: 30rpx;
    background-color: #05b2cc !important;
    font-size: 24rpx !important;
} */
.custom-style {
    background-color: #05b2cc !important;
    color: #fff;
}
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 30rpx;
}
.btn-plain {
    border: 1px solid #05b2cc;
    color: #05b2cc;
}
</style>

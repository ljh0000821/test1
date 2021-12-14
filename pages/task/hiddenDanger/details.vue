<template>
    <view>
        <custom-navbar :title="(type==1?'树林':'外力')+'隐患详情'" iconLeft></custom-navbar>
        <view class="container">
            <u-collapse arrow accordion>
                <u-collapse-item ref="collapseDefectForm" open title="隐患详情">
                    <view class="collapse-item">
                        <ForceForm v-if="type==0" ref="ForceForm" :id="id" needLoad type="details" @over="initCollapse('collapseDefectForm')" @loadend="loadend" />
                        <DendrocalamusForm v-if="type==1" ref="DendrocalamusForm" :id="id" needLoad type="details" @over="initCollapse('collapseDefectForm')" @loadend="loadend" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <view v-show="status>3" class="container" style="margin-top:30rpx">
            <u-collapse ref="collapseHandleForm" event-type="close" arrow accordion>
                <u-collapse-item title="隐患处理信息">
                    <view class="collapse-item">
                        <HandleForm ref="HandleForm" :id="id" :details="details" type="details" :tag="type" @over="initCollapse('collapseHandleForm')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <template v-if="status==3">
            <view class="container" style="margin-top:30rpx">
                <u-collapse ref="maintainCollapse" event-type="close" arrow accordion>
                    <u-collapse-item title="特巡记录">
                        <view class="collapse-item">
                            <MaintainRecord ref="MaintainRecord" :id="id" :url="recordUrl" actionType="details" @over="initCollapse('maintainCollapse')" />
                        </view>
                    </u-collapse-item>
                </u-collapse>
            </view>
        </template>
        <view class="container" style="margin-top:30rpx">
            <u-collapse ref="collapseHistory" event-type="close" arrow accordion>
                <u-collapse-item title="流程流转记录">
                    <view class="collapse-item">
                        <History ref="History" :id="id" :url="url" @over="initCollapse('collapseHistory')" />
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
    </view>
</template>

<script>
import ForceForm from "./components/ForceForm";
import DendrocalamusForm from "./components/DendrocalamusForm";
import History from "@/components/base/baseHistory";
import HandleForm from "./components/HandleForm";
import MaintainRecord from "@/components/base/MaintainRecord";
export default {
    components: {
        ForceForm,
        DendrocalamusForm,
        History,
        HandleForm,
        MaintainRecord
    },
    data() {
        return {
            type: 0, //0外力 1树林
            id: "",
            url: "", //历史url
            recordUrl: "", //维护记录url
            details: {},
            state: null
        };
    },
    onLoad(options) {
        this.type = options.type;
        this.id = options.id;
        this.state = options.state;
        this.url =
            this.type == 0
                ? "/blade-sd/troexth/list"
                : "/blade-sd/trotreeh/list";
        this.recordUrl =
            this.type == 0
                ? "/blade-sd/troextm/list"
                : "/blade-sd/trotreem/list";
    },
    onShow() {
        let str = this.type == 0 ? "ForceForm" : "DendrocalamusForm";
        let oRefs = this.$refs[str];
        oRefs && oRefs.reload();
        this.$refs.History && this.$refs.History.reload();
        this.$refs.MaintainRecord && this.$refs.MaintainRecord.reload();
    },
    computed: {
        status() {
            if (this.details.state) {
                return this.details.state;
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

        //缺陷编辑的保存提交
        save(state) {
            this.$refs.DefectForm.save(state).then(() => {
                setTimeout(() => {
                    this.$goBack();
                }, 500);
            });
        },
        //返回回来的详情
        loadend(data) {
            console.log(data, "data22");
            this.details = data;
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
</style>

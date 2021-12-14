<!-- 巡视模块 -->
<template>
    <view>
        <custom-navbar title="新巡视" iconLeft></custom-navbar>
        <view class="container">
            <view>
                <u-form ref="uForm">
                    <u-form-item label="巡视线路" label-width="150">
                        <efItem :data="dy_XSXL" v-model="form.lineName" @change="lineChange" type="lines" />
                    </u-form-item>
                    <u-form-item label="巡视杆塔" label-width="150" label-position="top" :rules="{required:true,prop:'equList',message:'请输入巡视杆塔'}">
                        <view class="flex1">
                            <efItem ref="towers" :data="dy_invtwrList" multiple @input="e=>taskItemList.equList=e" :isRightLabel="taskItemList.equList.length==0" type="towers" position :require="form.lineName" errMessage="请先选择线路" />
                            <view class="tower flex" v-if="taskItemList.equList.length>0">
                                <view class="tower-list" v-for="(item,index) in taskItemList.equList" :key="index">{{item.twrCode}}
                                    <view @click.stop="towerClick(item)">
                                        <uni-icons color="red" type="close" size="22" />
                                    </view>
                                </view>
                                <view class="clear flex-center" @click.stop="clearTower">
                                    <view>清空</view>
                                </view>
                            </view>
                        </view>
                    </u-form-item>
                    <u-form-item label="巡视类型" label-width="150">
                        <efItem v-model="form.insType" :isRightIcon="false" />
                    </u-form-item>
                    <u-form-item label="运维单位" label-width="150">
                        <efItem v-model="form.orgName" :isRightIcon="false" />
                    </u-form-item>
                    <u-form-item label="巡视班组" label-width="150">
                        <efItem v-model="form.teamName" :isRightIcon="false" />
                    </u-form-item>
                    <u-form-item label="风险等级" label-width="150" :rules="{required:true,prop:'riskLevel',message:'请输入风险等级'}">
                        <efItem :data="dy_risk_level" v-model="taskItemList.riskLevelName" :modelId.sync="taskItemList.riskLevel" type="select" name="dictValue" id="dictKey" />
                    </u-form-item>
                    <u-form-item label="负责人" label-width="150" :rules="{required:true,prop:'itemLeaderName',message:'请输入负责人'}">
                        <efItem :data="dy_teamUserList" v-model="taskItemList.itemLeaderName" :modelId.sync="taskItemList.itemLeader" type="people" :multiple="false" />
                    </u-form-item>
                    <u-form-item label="任务时间" label-width="150" :rules="{required:true,prop:'time',message:'请输入任务时间'}">
                        <efItem v-model="taskItemList.time" @change="e=>([taskItemList.startPlanDate,taskItemList.finishPlanDate]=e)" :multiple="true" type="time" />
                    </u-form-item>
                    <u-form-item label="巡视内容" label-width="150" :rules="{required:true,prop:'insContent',message:'请输入巡视内容'}">
                        <efItem v-model="taskItemList.insContent" title="巡视内容" :isRightIcon="false" type="textarea" />
                    </u-form-item>
                    <u-form-item label="巡视人员" label-width="150" :rules="{required:true,prop:'findUserName',message:'请输入巡视人员'}">
                        <efItem :data="dy_teamUserList" v-model="taskItemList.findUserName" :modelId.sync="taskItemList.planItemUser" multiple type="people" />
                    </u-form-item>
                </u-form>
            </view>
            <u-button class="ef-btn" type="primary" :loading="loading" ripple @click="save">完成</u-button>
        </view>
    </view>
</template>

<script>
import efItem from "../../../components/ef-ui/ef-item/ef-item";
import { dictMixins } from "../../../mixins/dict-mixins";
import { taskSave } from "../../../api/task";
export default {
    components: {
        efItem
    },
    mixins: [dictMixins],
    data() {
        return {
            loading: false,
            dy_XSXL: [],
            form: {
                insType: "特殊巡视",
                orgName: "",
                teamName: ""
            },
            taskItemList: {
                equList: [],
                time: ""
            },
            dy_risk_level: []
        };
    },
    onLoad() {
        this.getTypelist();
    },
    methods: {
        getTypelist() {
            // this.$store.dispatch("getList", "XSXL").then((res) => {
            //     this.dy_XSXL = res.records || [];
            // });
            this.$store.dispatch("getList", "risk_level").then((res) => {
                this.dy_risk_level = res.map((item) => {
                    return { ...item, text: item.dictValue };
                });
            });
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                const list = res || [];
                if (list.length == 1) {
                    this.form.teamId = list[0].id;
                    this.form.teamName = list[0].fullName;
                    this.selectTeamUserList(); //查询班组人员
                }
            });
            this.$store.dispatch("getList", "YWDW").then((res) => {
                const list = res || [];
                if (list.length == 1) {
                    this.form.orgId = list[0].id;
                    this.form.orgName = list[0].fullName;
                }
            });
            this.$store.dispatch("getList", "YXCJ").then((res) => {
                const list = res || [];
                if (list.length == 1) {
                    this.form.workId = list[0].id;
                    this.form.workName = list[0].fullName;
                }
            });
        },
        //杆塔改变
        lineChange(data) {
            this.form.lineId = data.psrId;
            //查询杆塔列表
            this.getInvtwrList();
            this.clearTower();
        },
        //点击杆塔删除
        towerClick(item) {
            const index = this.taskItemList.equList.findIndex(
                (o) => o.id === item.id
            );
            this.taskItemList.equList.splice(index, 1);
        },
        //清除
        clearTower() {
            this.taskItemList.equList = [];
            this.$refs.towers.init();
        },
        //保存
        async save() {
            if (!this.form.lineName) return this.$u.toast("请输入线路名称");
            // this.$refs.uForm.validate(async (valid) => {
            //     if (valid) {
            // this.loading = true;
            await this.$pu.validate(this.taskItemList, this.$refs.uForm);
            //重组数据
            const taskItemList = [
                {
                    planItemUser: this.taskItemList.planItemUser,
                    itemLeader: this.taskItemList.itemLeader,
                    activeList: JSON.stringify(
                        this.taskItemList.equList.map((o) => {
                            const { id, twrSort, twrCode } = o;
                            return { id, twrSort, twrCode };
                        })
                    ),
                    insContent: this.taskItemList.insContent,
                    riskLevel: this.taskItemList.riskLevel,
                    teamNum: this.taskItemList.planItemUser.split(",").length,
                    startPlanDate: this.taskItemList.startPlanDate,
                    finishPlanDate: this.taskItemList.finishPlanDate,
                    equList: this.taskItemList.equList
                        .map((item) => item.id)
                        .toString(),
                    twrCount: Array.isArray(this.taskItemList.equList)
                        ? this.taskItemList.equList.length
                        : 0
                }
            ];
            console.log(this.taskItemList, "taskItemList");
            // let params = {
            //     ...this.form,
            //     insType: 2,
            //     state: 1,
            //     taskItemList: taskItemList,
            //     type: 1
            // };
            // console.log(params, "params");
            taskSave({
                ...this.form,
                startPlanDate: this.taskItemList.startPlanDate,
                finishPlanDate: this.taskItemList.finishPlanDate,
                insType: 2,
                state: 1,
                taskItemList: taskItemList,
                type: 1
            })
                .then(() => {
                    // this.loading = false;
                    this.$goBack();
                })
                .catch(() => {
                    // this.loading = false;
                });
            //     }
            // });
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 20rpx;
}

.slot-content {
    padding: 20rpx;
    box-sizing: border-box;
    margin: 20rpx 0;
    /deep/ .u-input {
        border: 1px solid #999;
        border-radius: 10rpx;
        .uni-textarea-textarea {
            padding: 0 20rpx;
            box-sizing: border-box;
        }
        .uni-textarea-placeholder {
            padding: 0 20rpx;
            box-sizing: border-box;
        }
    }
}
.tower {
    flex-wrap: wrap;
    .tower-list {
        width: 20%;
        position: relative;
        padding-top: 20px;
        padding-left: 10px;
        margin-top: 10px;
        color: #333;
        .uni-icons {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .clear {
        width: 100%;
        color: red;
        margin-top: 10px;
    }
}
</style>

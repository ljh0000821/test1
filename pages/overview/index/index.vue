<template>
    <view>
        <custom-navbar title="总览"></custom-navbar>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="任务总览">
                <view class="flex">
                    <view :class="['btn',{'btn-active':activeTabs===0?true:false}]" @click="changTab(0)">任务数</view>
                    <view :class="['btn','m-l-16',{'btn-active':activeTabs===1?true:false}]" @click="changTab(1)">状态</view>
                </view>
            </viewHeader>
            <view v-if="activeTabs===0" class="charts-box" style="height:250rpx">
                <qiun-data-charts
                    type="ring"
                    :opts="optsRing"
                    :localdata="lDRwzl"
                    background="none"
                    :ontap="false"
                    :animation="false"
                    :tapLegend="false" />
            </view>
            <view v-else style="height:300rpx">
                <view class="th-1">
                    <view class="td-1" v-for="(item, index) in tdList" :key="index">
                        {{item}}
                    </view>
                </view>
                <scroll-view class="scroll-y" scroll-y="true">
                    <view class="tr-1" v-for="(item, index1) in dataStatus" :key="index1">
                        <view class="td-1 text-ellipsis" v-for="(itemTd, index2) in item" :key="index2">
                            {{itemTd}}
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="巡视情况"/>
            <view class="charts-box">
                <qiun-data-charts 
                    type="bar"
                    :opts="optsBar"
                    :localdata="lDXsqk"
                    background="none"
                    :ontap="false"
                    :animation="false"
                    :tapLegend="false" />
            </view>
        </view>
        <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="隐患统计"/>
            <view class="charts-box">
                <qiun-data-charts 
                    type="column"
                    :opts="optsCol"
                    :localdata="lDYh"
                    background="none"
                    :ontap="false"
                    :animation="false"
                    :tapLegend="false" />
            </view>
        </view>
         <view class="m-t-24 container">
            <viewHeader ref="viewHeader" title="缺陷统计"/>
            <view class="charts-box">
                <view class="flex-end qx-num">
                    <text style="margin-right:30rpx">缺陷总数:{{qxCount}}</text>
                    <text>消缺总数:{{xqCount}}</text>
                </view>
                <qiun-data-charts 
                    type="column"
                    :opts="optsCol"
                    :localdata="lDQx"
                    background="none"
                    :ontap="false"
                    :animation="false"
                    :tapLegend="false" />
            </view>
        </view>
    </view>
</template>

<script>
import viewHeader from "./components/viewHeader";
import { notRealTimeData } from "@/api/history/index";
import { getStore } from "@/utils/store.js";
export default {
    components: {
        viewHeader
    },
    data() {
        return {
            qxCount: 0, //缺陷总数
            xqCount: 0, //消缺总数
            activeTabs: 0, //0:任务数， 1：状态
            activeTabs1: 0, //0:缺陷， 1：隐患
            tdList: ["序号", "任务名称", "待编辑", "待审核", "开展中"],
            dataStatus: [],
            optsRing: {
                "dataPointShape": false,
                "dataLabel": false,
                "tapLegend": false,
                "title": {
                    "name": "100",
                },
                "subtitle": {
                    "name": "任务数",
                }
            },
            optsBar: {
                "color": [
                    "#62c88d",
                    "#00b5d0",
                ],
            },
            optsCol: {
               "color": [
                    "#dde4f2",
                    "#62c88d",
                ],
            },
            lDRwzl: [],
            lDXsqk:[],
            lDQx:[],
            lDYh:[]
        };
    },
    methods: {
        changTab(state) {
            this.activeTabs = state;
        },
        changTab1(state) {
            this.activeTabs1 = state;
        },
        _getData() {
            notRealTimeData().then((res) => {
                const {taskView, todoTask, twrView, tourSituation, defandtro} = res.data.data;
                const {taskCount, taskStatus} = taskView;
                const {notstatecount, doingcount, overcount} = taskStatus;
                const taskTotal = notstatecount + doingcount + overcount;
                //任务总览
                const notPer = taskTotal != 0 ? Math.round(notstatecount / taskTotal * 100) : 0;
                const doingPer = taskTotal != 0 ? Math.round(doingcount / taskTotal * 100) : 0;
                const overPer = taskTotal != 0 ? Math.round(overcount / taskTotal * 100) : 0;
                this.lDRwzl = [
                    {value: notstatecount, text: `未完成：${notstatecount}（${notPer}%）`},
                    {value: doingcount, text: `进行中：${doingcount}（${doingPer}%）`},
                    {value: overcount, text: `已完成：${overcount}（${overPer}%）`}
                ];
                this.optsRing.title.name = taskTotal;
                //=>任务状态
                let statusList = [];
                todoTask.forEach(function(item, index) {
                    //organization待编辑，notreviewed待审核，reviewed已审核
                    const {organization, notreviewed, reviewed} = item.data;
                    statusList.push([index + 1,item.taskName,organization || 0,notreviewed || 0,reviewed || 0]);
                });
                this.dataStatus = statusList
                //巡视情况
                var tourList = [];
                tourSituation.forEach(function(item, index) {
                    const {tomonth, today} = item.data
                    tourList.push({value:today, text:item.patrolName, group:"本日"})
                    tourList.push({value:tomonth, text:item.patrolName, group:"本月"})
                })
                this.lDXsqk = tourList
                //隐患
                const {def, defteam, troExt, troTree} = defandtro
                var yhList = [];
                yhList.push({value: troExt.data.doing + troExt.data.notdo, text: troExt.taskName, group:"未处理"})
                yhList.push({value: troExt.data.done, text: troExt.taskName, group:"已处理"})
                yhList.push({value: troTree.data.doing + troTree.data.notdo, text: troTree.taskName, group:"未处理"})
                yhList.push({value: troTree.data.done, text: troTree.taskName, group:"已处理"})
                this.lDYh = yhList
                //缺陷
                const roleName = getStore("userInfo").role_name;
                var qxList = [];
                var _qxCount = 0
                var _xqCount = 0
                if (roleName === "user" || roleName === "teamLeader") {
                    //按一般、严重、危及类型统计
                    defteam.forEach(function(item, index) {
                        const {alldef, nature, overdef} = item
                        qxList.push({value: overdef, text: nature, group:"已消缺"})
                        qxList.push({value: alldef-overdef, text: nature, group:"未消缺"})
                        //_qxCount += alldef-overdef
                        _qxCount += alldef
                        _xqCount += overdef
                    })
                } else {
                    //按班组纬度统计
                    def.forEach(function(item, index) {
                        const {alldef, deptName, done} = item
                        const showName = deptName.substr(deptName.length - 2)
                        qxList.push({value: done||0, text: showName, group:"已消缺"})
                        qxList.push({value: alldef-done||0, text: showName, group:"未消缺"})
                        // _qxCount += alldef-done
                        _qxCount += alldef||0
                        _xqCount += done||0
                    })
                }
                this.lDQx = qxList
                this.qxCount = _qxCount
                this.xqCount = _xqCount
            });
        }
    },
    onShow() {
        this._getData();
    }
};
</script>

<style lang="scss" scoped>
.m-t-24 {
    margin-bottom: 24rpx;
}
.btn {
    min-width: 93rpx;
    color: #00b5d0;
    font-size: 24rpx;
    border-radius: 40rpx;
    border: 2rpx solid #00b5d0;
    text-align: center;
}
.btn-active {
    border: none;
    color: #fff;
    background-color: #00b5d0;
}
.charts-box {
    width: 100%;
}
.scroll-y {
    max-height: 230rpx;
}
.th-1 {
    color: #666666;
    background-color: #e0e0ea;
}
.td-1 {
    &:first-child {
        width: 10%;
    }
    &:nth-child(2) {
        width: 24%;
    }
    text-align: center;
    line-height: 40rpx; 
    color: #333333;
    font-size: 20rpx;
    display: inline-block;
    vertical-align: bottom;
    width: 22%;
    border: 0.5px solid #cdcdcd;
}
.qx-num {
    font-size: 24rpx;
}
</style>

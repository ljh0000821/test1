<template>
	<view>
		<custom-navbar title="告警处理" iconLeft></custom-navbar>
		<view class="container">
			<u-sticky>
				<view class="tabs-group flex-around">
                    <ef-select-btn width="140rpx" :data="dy_XSXL" type="lines" placeholder="路线" @change="linesChange"/>
                    <ef-select-btn width="140rpx" :data="dy_invtwrList" type="towers" :require="condition.lineId" errMessage="请先选择线路" placeholder="杆塔" @change="twrChange"/>
					<ef-select-btn width="140rpx" type="time" multiple placeholder="告警时间" @change="timeChange"/>
                    <ef-select-btn width="140rpx" :data="gjState" type="select" label="dictValue" id="dictKey" placeholder="状态" @change="stateChange"/>
				</view>
			</u-sticky>	
			<view class="list-box">
				<template v-if="listData.length>0">
					<view class="list-item" v-for="item in listData" :key="item.id" @click="toDetails(item)">
						<view class="flex-between">
							<view class="flex-start flex1">
								<!-- <view class="list-item-icon flex-center">
									<u-icon name="info"></u-icon>
								</view> -->
								<text class="list-item-status">{{item.alarmFrom}}</text>
								<view class="m-l-16 gray-text ">
									<img src="../../../static/common/ic_add_ins_tower.png" alt="" srcset="">
									<text>{{item.towerCode}}</text>
								</view>
								<text class="flex1 gray-text m-l-16 text-ellipsis">{{item.position}}</text>
							</view>
							<view :class="['right-tags',item.state==1?'bg-orange':item.state==2?'bg-green':'bg-blue']">
								{{item.stateName}}
							</view>
						</view>

						<view class="flex-between">
							<view class="flex-start flex1 m-t-16">
								<img src="../../../static/common/ic_add_ins_line.png" alt="" srcset="">
								<text class="gray-text" style="margin-right:20rpx">{{item.lineName}}</text>
								<img src="../../../static/common/ic_add_ins_date.png" alt="" srcset="">
								<text class="gray-text">{{item.alarmTime}}</text>
							</view>
							<view class="flex-start m-t-16" v-show="item.state!=2">
								<button class="mini-btn" type="primary" size="mini" @click.stop="createOrder(item.id)">处理</button>
                                <button class="mini-btn" type="primary" plain="true" size="mini" @click.stop="updateOrder(item)">修改</button>
								<!-- <view class="m-l-16 gray-text ">
									<img src="../../../static/common/ic_add_ins_date.png" alt="" srcset="">
									<text>{{item.findDate}}</text>
								</view> -->
								<!-- <view class="m-l-16 gray-text ">
									<img src="../../../static/common/ic_add_ins_member.png" alt="" srcset="">
									<text>{{item.findUserName|sliceName}}</text>
								</view> -->
							</view>
						</view>
					</view>
					<u-loadmore v-show="listData.length>19" :status="status" icon-type="flower" bg-color="transperant" />
				</template>

				<template v-if="listData.length===0">
					<u-empty></u-empty>
				</template>
			</view>
		</view>
        <sel-dep title="修改告警处理班组" ref="selDep" @bzConfirm="bzUpdate"/>
	</view>
</template>

<script>
import selDep from "./components/selDep.vue";
import efSelectBtn from "@/components/ef-ui/ef-select-btn/ef-select-btn";
import { alertList, alertHandle} from "@/api/more/index";
import { towersPMS } from "@/api/invtwr";
export default {
    components: {
        efSelectBtn,
        selDep
    },
	onLoad(options) {
        this.type = options.type;
    },
    data() {
        return {
			// type: "create", //create, handle
            // sortText: "时间↓",
            // sort: "",
            gjState: [
                {
                    dictValue: "未开始",
                    dictKey: "0"
                },
                {
                    dictValue: "进行中",
                    dictKey: "1"
                },
                {
                    dictValue: "已处理",
                    dictKey: "2"
                }
            ], //告警状态
            dy_XSXL: [], //线路
            dy_invtwrList: [], //杆塔列表
            page: 1,
            totalPage: 0,
            status: "loadmore",
            listData: [],
            clickItem: {},
            condition: {
                state: "", //状态
                towerId: "", //杆塔
                lineId: "", //线路
                startTime: "",
                endTime: ""
            }
        };
    },
    watch: {
        // sort(nval) {
        //     this.sortText = nval ? "时间↑" : "时间↓";
        // }
    },
    mounted() {
        this._getTypelist();
        this._getRiskLevel();
        this._deflist();
    },
    methods: {
		// 创建工单
		createOrder(id) {
            let that = this;
            uni.navigateTo({
				url: "pages/more/alarmManage/addHandle/addHandle?id=" + id,
                events: {
                    addDataSuc: function() {
                        that.refreshData();
                    }
                }
			});
		},
        //=========
        dwChange(data) {
            this.dy_CJ = data.children || [];
            this.form.workId = "";
            this.form.workName = "";
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        cjChange(data) {
            this.dy_BZ = data.children || [];
            this.form.whbz = "";
            this.form.whbzmc = "";
        },
        bzChange(data) {
            this.form = {...this.form};
        },
        //============
        updateOrder(item) {
            this.clickItem = item;
            //修改处理班组
            this.$refs.selDep.open();
        },
        bzUpdate(data) {
            data.id = this.clickItem.id;
            data.state = this.clickItem.state;
            //修改报警班组
            alertHandle(data).then((res) => {
                this.$refs.selDep.close();
                this.refreshData();
            });
        },
        //杆塔列表
        // getInvtwrList(id) {
        //     invtwrList({
        //         lineId: id
        //     }).then(({ data }) => {
        //         this.dy_invtwrList = data.data || [];
        //     });
        // },
        getInvtwrList(id) {
            towersPMS({
                line: id
            }).then(({ data }) => {
                this.dy_invtwrList = data.data.records || [];
            });
        },
        //获取缺陷状态
        _getTypelist() {
            //线路
            this.$store.dispatch("getList", "XSXL").then((res) => {
                this.dy_XSXL = res.records || [];
            });
        },
        //风险等级
        _getRiskLevel() {
            this.$store.dispatch("getList", "defect_nature").then((res) => {
                this.defNature = res;
            });
        },
        //获取缺陷列表（分页）
        _deflist() {
            this.status = "loading";
            let data = {
                size: 20,
                current: this.page,
                state: this.condition.state,
                lineId: this.condition.lineId,
                towerId: this.condition.towerId,
                startTime: this.condition.startTime,
                endTime: this.condition.endTime
            };
            alertList(data).then((res) => {
                this.totalPage = res.data.data.pages;
                this.page = res.data.data.current;
                let moreData = res.data.data.records.filter(
                    (item) => item.defState != 1
                );
                this.listData = [...this.listData, ...moreData];
                if (this.page >= this.totalPage) {
                    this.status = "nomore";
                } else {
                    this.page = this.page + 1;
                    this.status = "loadmore";
                }
            });
        },
        //触底加载更多
        loadMore() {
            //避免多次触发
            if (
                this.status == "loading" ||
                this.status == "nomore" ||
                this.page >= this.totalPage + 1
            ) {
                return;
            }
            this._deflist();
        },
        init() {
            this.page = 1;
            this.totalPage = 0;
            this.listData = [];
            this.status = "loadmore";
        },
        refreshData() {
            this.init();
            this._deflist();
        },
        //状态改变
        stateChange(data) {
            this.condition.state = data.dictKey;
            this.refreshData();
        },
        //杆塔改变
        twrChange(data) {
            this.condition.towerId = data.psrId;
            this.refreshData();
        },
        //线路改变
        linesChange(data) {
            this.condition.lineId = data.id;
            this.getInvtwrList(data.id);
            this.refreshData();
        },
        //时间改变
        timeChange(data) {
            this.condition.startTime = data[0];
            this.condition.endTime = data[1];
            this.init();
            this._deflist();
        },
        //跳转详情页
        toDetails(item) {
            uni.navigateTo({
                url: "pages/more/alarmManage/orderDetail/orderDetail?id=" + item.id
            });
        }
        // sortChange() {
        //     this.sort = this.sort ? "" : "1";
        //     this.init();
        //     this._deflist();
        // }
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 20rpx;
    margin-right: 8rpx;
}
.tabs-group {
    padding: 16rpx 0;
    background-color: #fff;
    // border-radius: 26rpx;
    // margin-top: -6rpx;
}
.list-box {
    padding: 8rpx;
}

.list-item {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 16rpx 0;
    font-size: 28rpx;
}

.list-item:first-child {
    border-top: none;
}

.right-tags {
    padding: 6rpx 20rpx;
    color: #fff;
    // background-color: #f7b500;
    border-radius: 26rpx;
    font-size: 26rpx;
}
.bg-orange {
    background-color: #f7b500;
}
.bg-blue {
    background-color: #05b2cc;
}
.bg-green {
    background-color: #00be27;
}
.list-item-icon {
    background-color: red;
    color: #fff;
    border-radius: 50%;
    width: 40rpx;
    height: 40rpx;
}

.list-item-status {
    font-weight: bold;
}

.gray-text {
    color: #9aa3aa;
    font-size: 26rpx;
}
.mini-btn {
    height: 50rpx;
    line-height: 50rpx;
    padding: 0rpx 15rpx;
    margin-left: 10rpx;
}
</style>

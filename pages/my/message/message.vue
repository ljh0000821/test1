<template>
	<view>
		<custom-navbar title="消息提醒" iconLeft></custom-navbar>
        <view class="container">
			<view v-if="false" class="flex-between top-line">
				<view>未读信息：3 条</view>
				<view>所有标记为已读</view>
			</view>
			<template v-if="listData.length>0">
                <view class="flex-between task-item" v-for="(item,index) in listData" :key="index">
                    <view class="align-center flex1">
						<view class="align-center img-block">
                        	<img class="msg-img" src="../../../static/my/ic_msg_list.png">
							<view v-if="false" class="red-dot"></view>
						</view>
						<view class="msg-info">
							<text>缺陷{{item.overdue}}</text><br>
							<text class="txt-time">时间：{{item.createTime}}</text>
						</view>
                    </view>
                    <view class="btn-detail">
                        <view @click="_showDetail(item)">查看详情</view>
                    </view>
                </view>
            </template>
            <template v-if="listData.length==0">
                <u-empty></u-empty>
            </template>
        </view>
		<u-popup v-model="showDetail" mode="center">
			<view class="pop-content">
				<view>超期提醒</view>
				<!-- <view>时间：{{detailData.createTime}}</view> -->
				<view>缺陷编号：{{detailData.defNum}}</view>
				<view>缺陷状态：{{detailData.stateName}}</view>
				<view>发现日期：{{detailData.findDate}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { defOverdue } from "@/api/defect";
	export default {
		data() {
			return {
				showDetail: false,
				listData: [],
				detailData: {}
			}
		},
		mounted: function () {
			defOverdue().then((res) => {
				this.listData = res.data.data
			});
		},
		methods: {
			_showDetail(item) {
				this.detailData = item
				this.showDetail = true
			}
		}
	}
</script>

<style lang="scss" scoped>
.pop-content {
	:first-child {
		font-size: 30rpx;
	}
	padding: 20rpx;
	color: #30495e
}
.top-line {
	border-bottom: 1px solid $line-gray;
	height: 80rpx;
	line-height: 80rpx;
	color: #30495e;
}
.btn-detail {
	align-self: flex-start;
	view {
		border-radius: 20rpx;
    	padding: 0rpx 20rpx;
		background-color: #c0affe;
		font-size: 10rpx;
		color: white;
	}
}
.msg-info {
	margin-left: 20rpx;
	line-height: 35rpx;
	color: #30495e
}
.txt-time {
	font-size: 10rpx;
}
.img-block {
	position: relative;
}
.msg-img {
	width: 72rpx;
	height: 72rpx;
}
.red-dot {
	position: absolute;
	right: 0;
	top: 0;
	width: 15rpx;
	height: 15rpx;
	border-radius: 100%;
	background-color: red;
}
.task-item {
    padding: 24rpx 0;
    border-bottom: 1px solid $line-gray;
    &:last-child {
        border: none;
    }
}
</style>

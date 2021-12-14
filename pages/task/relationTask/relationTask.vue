<template>
	<view>
		<custom-navbar title="关联任务" iconLeft></custom-navbar>
		<view class="container">
			<view class="title flex"><image src="../../../static/task/relationTask/tower.png"></image> #002</view>
			<view class="task_item flex-between" v-for="(item,index) in 5" :key="index">
				<view class="time-logo">
					<image src="../../../static/task/index/time.png"></image>
				</view>
				<view class="flex1">
					<view class="main-title"><text>尔王庄岁21线</text> </view>
					<view class="sub-title behavior"><text>检测</text> </view>
				</view>
				<view>
					<view class="main-title"><text>7/05-07/21</text> </view>
					<view class="sub-title u-text-right"><text>#001-#040</text> </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	};
</script>

<style lang="scss" scoped>
	.container{
		margin: 28rpx 16rpx;
		overflow-y: auto;
		.title{
			font-size: 28rpx;
			font-weight: 500;
			color: #05B2CC;
			line-height: 40rpx;
			align-items: center;
			image{
				width: 20rpx;
				height: 20rpx;
			}
		}
		.task_item{
			padding: 20rpx 0;
			color: #30495E;
			font-weight: 500;
			border-bottom: 2rpx solid #979797;
			.time-logo{
				width: 68rpx;
				height: 68rpx;
				margin-right: 16rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.line{
				font-size: 24rpx;
				line-height: 34rpx;
			}
			.time-title{
				font-size: 20rpx;
				line-height: 28rpx;
			}
			.main-title{
				font-size: 24rpx;
				line-height: 34rpx;
			}
			.sub-title{
				font-size: 20rpx;
				line-height: 28rpx;
			}
			.behavior{
				color: #05B2CC;
			}
		}
	}
</style>

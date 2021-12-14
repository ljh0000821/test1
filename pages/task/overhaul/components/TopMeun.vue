<template>
	<view class="container flex-around top-meun">
		<view class="text-center" v-for="(item,index) in list" :key="index" @click="call(item,index)">
			<image :src="item.icon"></image>
			<view><text>{{item.name}}</text></view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: ()=>[
					{name:"检修计划",icon:"/static/common/ic_menu_map_xs.png"},
					{name:"工作票",icon:"/static/common/ic_menu_map_correct.png"},
					{name:"工作任务单",icon:"/static/common/ic_menu_map_check.png"},
					{name:"实验报告",icon:"/static/common/ic_menu_map_yh.png"}
				]
			},
		},
		methods: {
			call(item,$index) {
				this.$emit("callback",{...item,$index});
			}
		},
	};
</script>

<style lang="scss">
	.top-meun{
        padding:16rpx 0;
		image{
			width: 35px;
			height: 35px;
		}
	}
</style>


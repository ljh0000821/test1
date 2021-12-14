<template>
  <view>
	<custom-navbar title="工单详情" iconLeft/>
	<view class="container">
		<u-form :model="form" ref="uForm">
            <u-form-item label="所属单位" label-width="150" prop="orgName">
                <efItem v-model="form.orgName" />
            </u-form-item>
			<u-form-item label="电压等级" label-width="150" prop="voltageLevelName">
                <efItem v-model="form.voltageLevelName" />
            </u-form-item>
			<u-form-item label="线路名称" label-width="150" prop="lineName">
                <efItem v-model="form.lineName" />
            </u-form-item>
			<u-form-item label="杆塔名称" label-width="150" prop="towerCode">
                <efItem v-model="form.towerCode" />
            </u-form-item>
			<u-form-item label="监拍朝向" label-width="150" prop="position">
                <efItem v-model="form.position" />
            </u-form-item>
			<u-form-item label="告警时间" label-width="150" prop="alarmTime">
                <efItem v-model="form.alarmTime" />
            </u-form-item>
			<u-form-item label="告警原因" label-width="150" prop="alarmDescribe">
                <efItem v-model="form.alarmDescribe" />
            </u-form-item>
			<u-form-item label="告警状态" label-width="150" prop="stateName">
                <efItem v-model="form.stateName" />
            </u-form-item>
			<u-form-item label="告警来源" label-width="150" prop="alarmFrom">
                <efItem v-model="form.alarmFrom" />
            </u-form-item>
		</u-form>
	</view>
  </view>
</template>

<script>
import { alertOrder } from "@/api/more/index";
export default {
	data() {
		return {
			test: [],
			form: {
				voltageLevelName: "", //电压等级
				orgName: "", //所属单位
				lineName: "", //线路名称
				towerCode: "",
				position: "", //监拍朝向
				alarmDescribe: "", //告警原因
				stateName: "", //告警状态
				alarmFrom: "", //告警来源
				alarmTime: "" //告警时间
			},
			rules: {
				
			}
		};
  	},
  	methods: {
		_getOrderDetail(id) {
			let data = {
            	id: id
			};
			alertOrder(data).then((res) => {
				this.form = res.data.data
            });
		}
	},
	onLoad(options) {
		this._getOrderDetail(options.id);
	}
};
</script>

<style>
</style>

<template>
  <view>
	<custom-navbar title="处理工单" iconLeft/>
	<view class="container">
		<u-form :model="form" ref="uForm">
			<u-form-item label="抓拍图片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="alarmPics" type="detail" />
            </u-form-item>
			<u-form-item label="监拍点信息" label-width="150">
                <efItem v-model="posInfo" />
            </u-form-item>
			<u-form-item label="告警时间" label-width="150">
                <efItem v-model="alarmTime" />
            </u-form-item>
            <u-form-item prop="misstate" label="是否误报" label-width="150">
                <efItem :data="formList.dy_sfwb" v-model="form.misstateName" :modelId.sync="form.misstate" type="select" name="name" id="id" />
            </u-form-item>
			<u-form-item prop="state" label="处理状态" label-width="150">
                <efItem :data="formList.dy_gjzt" v-model="form.stateName" :modelId.sync="form.state" type="select" name="name" id="id" />
            </u-form-item>
			<u-form-item prop="tourContent" label="处理措施" label-width="150">
                <efItem v-model="form.tourContent" name="dictValue" id="dictKey" title="处理措施" :canWrite="true" type="'select" placeholder="请输入或选择" />
            </u-form-item>
			<u-form-item prop="tourPic" label="图片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.tourPic" :type="type" />
            </u-form-item>
            <u-form-item prop="tourVoi" label="音频" label-width="150" label-position="top">
                <chooseAudio ref="chooseAudio" :audioList="form.tourVoi" :type="type" />
            </u-form-item>
            <u-form-item prop="tourVid" label="视频" label-width="150" label-position="top">
                <chooseVideo ref="chooseVideo" :videoList="form.tourVid" :type="type" />
            </u-form-item>
		</u-form>
		<u-button v-permission="['user','teamLeader','zhuanze']" class="btn custom-style" type="primary" shape="circle" ripple :loading="submitLoading" @click="submit()">提交</u-button>
	</view>
  </view>
</template>

<script>
import { alertHandle, alertOrder } from "@/api/more/index";
import { dictMixins } from "@/mixins/dict-mixins";
export default {
	mixins: [dictMixins],
	data() {
		return {
			submitLoading: false,
			alarmId: "", //告警id
			type: "add",
			test01: [],
			alarmPics: [
				// {
				// 	picId: "49e0cd23b23f4b38bf218b6ff6d0ffe9"
				// }
			],
			posInfo: "", //监拍点信息
			alarmTime: "",
			form: {
				tourContent: "",
				misstateName: "自动告警",
				misstate: "1", //是否误报
				state: "2", //告警状态
				stateName: "已处理",
				// finishDate: "", //需求完成时间
				tourPic: "", //图片
                tourVid: "", //视频
                tourVoi: "" //音频
			},
			formList: {
				dy_sfwb: [
					{
						id: "1",
						name: "自动告警"
					},
					{
						id: "2",
						name: "误报"
					}
				],
				dy_gjzt: [
					{
						name: "进行中",
						id: "1"
					},
					{
						name: "已处理",
						id: "2"
					}
				]
			},
			rules: {	
			}
		};
  	},
	onLoad(options) {
		this.alarmId = options.id
		this._getOrderDetail(options.id);
	},
  	methods: {
		_getOrderDetail(id) {
			let data = {
            	id: id
			};
			alertOrder(data).then((res) => {
				let {alarmPic, towerName, position, alarmTime} = res.data.data
				this.posInfo = (towerName||"") + "-" + (position||"")
				this.alarmPics = alarmPic
				this.alarmTime = alarmTime
            });
		},
		async submit() {
            this.form.tourPic = await this.$refs.chooseImage.getIds();
            this.form.tourVoi = await this.$refs.chooseAudio.getIds();
            this.form.tourVid = await this.$refs.chooseVideo.getIds();
			this.form.id = this.alarmId
            alertHandle(this.form).then((res) => {
				this.getOpenerEventChannel().emit('addDataSuc')
				this.$goBack();
            });
		}
	},
};
</script>

<style lang="scss" scoped>
.btn {
    width: 200rpx;
    height: 60rpx !important;
    margin-top: 24rpx;
}
.custom-style {
    background-color: #05b2cc !important;
    color: #fff;
}
</style>


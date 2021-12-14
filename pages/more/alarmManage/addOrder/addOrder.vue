<template>
  <view>
	<custom-navbar title="创建工单" iconLeft/>
	<view class="container">
		<u-form :model="form" ref="uForm">
            <u-form-item label="工单名称" label-width="150" prop="lineName">
				<efItem :data="test01" v-model="form.gdmc" name="dictValue" id="dictKey" title="工单名称" :canWrite="type==='add'||type==='edit'?true:false" :type="type==='add'||type==='edit'?'select':'label'" placeholder="请输入或选择" />
            </u-form-item>
			<u-form-item prop="findUserName" label="责任人" label-width="150">
                <efItem :data="dy_teamUserList" v-model="form.zrr" :modelId.sync="form.zrrId" :type="type==='add'||type==='edit'?'people':'label'" />
            </u-form-item>
			<u-form-item prop="finishDate" label="需求完成" label-width="150">
                <efItem v-model="form.finishDate" :endTime="$store.state.nowDate" :type="type==='add'||type==='edit'?'time':'label'" />
            </u-form-item>
			<u-form-item prop="gdsm" label="工单说明" label-width="150">
                <efItem v-model="form.gdsm" name="dictValue" id="dictKey" title="工单说明" :canWrite="type==='add'||type==='edit'?true:false" :type="type==='add'||type==='edit'?'select':'label'" placeholder="请输入或选择" />
            </u-form-item>
			<u-form-item prop="defPicVOList" label="图片" label-width="150" label-position="top">
                <chooseImage ref="chooseImage" :images="form.defPicVOList" :type="type" />
            </u-form-item>
		</u-form>
		<u-button v-permission="['user','teamLeader','zhuanze']" class="btn custom-style" v-if="type==='add'" type="primary" shape="circle" ripple :loading="submitLoading" @click="submit()">提交</u-button>
	</view>
	<u-toast ref="uToast" />
  </view>
</template>

<script>
import { alertOrder } from "@/api/more/index";
import { dictMixins } from "@/mixins/dict-mixins";
export default {
	mixins: [dictMixins],
	data() {
		return {
			submitLoading: false,
			type: "add",
			test01: [],
			form: {
				lineName: "aaaa",
				gdmc: "", //工单名称
				zrr: "", //责任人
				zrrId: "",
				gdsm: "", //工单说明
				finishDate: "", //需求完成时间
				defPicVOList: "", //图片
                defVidVOList: "", //视频
                defVoiVOList: "" //音频
			},
			rules: {
				
			}
		};
  	},
	created() {
    	this.getTypelist();
	},
  	methods: {
		submit() {
			return new Promise((resolve) => {
                this.$refs.uForm.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        this.form.defSource = "2";
                        this.form.defState = state;
                        this.form.defPic =
                            await this.$refs.chooseImage.getIds();
                        this.form.defVoi =
                            await this.$refs.chooseAudio.getIds();
                        this.form.defVid =
                            await this.$refs.chooseVideo.getIds();
                        defSaveOrUpdate(this.form).then(() => {
                            this.$refs.uToast.show({
                                title: '提交成功！'
                            });
                            this.submitLoading = false;
                            setTimeout(() => {
                                this.$goBack();
                            }, 500);
                        });
                        resolve();
                    } else {
                        this.submitLoading = false;
                    }
                });
            });
		},
		getTypelist() {
			//班组
            this.$store.dispatch("getList", "YSBZ").then((res) => {
                const list = res || [];
                if (this.type === "add" && list.length == 1) {
                    // this.form.findTeamId = list[0].id;
                    // this.form.findTeamName = list[0].fullName;
					this.selectTeamUserList(list[0].id); //查询班组人员
                }
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

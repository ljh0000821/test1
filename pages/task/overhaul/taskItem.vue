<template>
	<view>
		<custom-navbar title="工作任务单" iconLeft></custom-navbar>
		<view class="container">
		    <u-form :model="form" ref="uForm" :error-type="['toast']">
		        <u-form-item label="编制日期" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="编制单位" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="编号" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="工作内容" prop="layDesc" label-width="200">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="停电范围" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
				<u-form-item label="工作地点" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
		        <u-form-item label="计划开始日期" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
				<u-form-item label="计划结束日期" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="所属地市" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="任务安排人" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="批准停电开始日期" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="批准停电结束日期" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="任务单附件" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="所属地市" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="任务清单" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
		    </u-form>
		</view>
		<u-button class="ef-btn-normal btn-primary" type="primary" shape="circle" ripple>提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					
				}
			};
		}
	}
</script>

<style lang="scss">

</style>

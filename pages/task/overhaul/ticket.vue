<template>
	<view>
		<custom-navbar title="工作票" iconLeft></custom-navbar>
		<view class="container">
		    <u-form :model="form" ref="uForm" :error-type="['toast']">
		        <u-form-item label="票类型" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="票状态" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="工作内容" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="制票部门" prop="layDesc" label-width="200">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
		        <u-form-item label="工作负责人" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
				<u-form-item label="计划开始日期" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
		        <u-form-item label="计划结束日期" prop="layDesc" label-width="150">
		            <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
		        </u-form-item>
				<u-form-item label="票号" prop="layDesc" label-width="150">
				    <efItem type="label" v-model="form.layDesc" :isRightIcon="false" />
				</u-form-item>
				<u-form-item label="工作票照片" prop="layDesc" label-width="150">
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

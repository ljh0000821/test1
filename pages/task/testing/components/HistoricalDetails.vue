<template>
    <view>
        <u-mask :show="show" :mask-click-able="false">
            <view class="content">
                <view class="nav align-center">
                    <uni-icons@click="close()" color="#30495E" type="arrowthinleft" size="24" style="font-weight: 800" />
                    <text class="m-l-16">历史详情</text>
                </view>
                <view class="content-box">
                    <view class="container">
                        <!-- 红外测温 -->
                        <template>
                            <u-form :model="form" ref="uForm" :error-type="['toast']">
                                <u-form-item label="连接形式" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="接头位置" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="环境温度(℃)" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="异常接头位置" label-width="180" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                            </u-form>
                        </template>
                        <!-- 覆冰观测 -->
                        <template>
                            <u-form :model="form" ref="uForm" :error-type="['toast']">
                                <u-form-item label="温度(℃)" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="湿度%" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="风速m/s" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="异常接头位置" label-width="180" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="覆冰厚度mm" label-width="180" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="覆冰类型" label-width="150" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                                <u-form-item label="设计覆冰厚度mm" label-width="250" prop="lineName">
                                    <efItem v-model="form.lineName" type="label" />
                                </u-form-item>
                            </u-form>
                        </template>
                    </view>
                </view>
            </view>
        </u-mask>
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    props: {
        details: {}
    },
    data() {
        return {
            show: false,
            form: {}
        };
    },
    mounted() {},
    methods: {
        open(options) {
            this.show = true;
        },
        close() {
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #dde4f2;
    padding: 24rpx;
}
.nav {
    font-size: 32rpx;
    margin: 16rpx 0;
}
.close {
    font-size: 48rpx;
    margin-top: -8rpx;
}
.content-box {
    display: flex;
    height: calc(100% - 80rpx);
    background-color: green;
}
</style>

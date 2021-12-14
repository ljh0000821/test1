<template>
    <view>
        其他值（*）
        <u-form :model="form" ref="uForm" :error-type="['toast']">
            <u-form-item label="测量天气" prop="cltq" label-width="150" :border-bottom="false">
                <efItem :data="weather" :type="type=='add'||type=='edit'?'select':'label'" v-model="form.cltq" placeholder="请选择" name="dictValue" id="dictKey" />
            </u-form-item>
        </u-form>
        <!-- <button @click="getForm()">getForm</button> -->
    </view>
</template>

<script>
import efItem from "@/components/ef-ui/ef-item/ef-item";
export default {
    components: {
        efItem
    },
    props: {
        kinds: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "add"
        },
        needGet: {
            type: Boolean,
            default: true
        },
        details: {
            type: Object,
            default: () => {}
        },
        lastRecord: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            weather: [],
            form: {},
            rules: {
                cltq: [
                    {
                        required: true,
                        message: "测量天气不能为空"
                    }
                ]
            }
        };
    },
    watch: {
        lastRecord: {
            handler(nval) {
                this.form = nval;
            },
            deep: true
        }
    },
    created() {
        this.getTypelist();
    },
    mounted() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        getTypelist() {
            if (this.type == "details") return;
            if (this.kinds === "jddz") {
                //天气
                this.$store.dispatch("getList", "weather").then((res) => {
                    console.log(res, "天气");
                    this.weather = res;
                });
            }
        },
        getForm() {
            if (this.kinds != "jddz") return {};
            return new Promise((resolve, reject) => {
                this.$refs.uForm.validate((valid) => {
                    if (valid) {
                        console.log(this.form, "form");
                        resolve(this.form);
                    } else {
                        reject();
                    }
                });
            });
        }
    }
};
</script>

<style scoped>
</style>

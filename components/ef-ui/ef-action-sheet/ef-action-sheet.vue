<template>
    <view>
        <template v-if="showLabel">
            <view>{{activeObj[label]||placeholder}}</view>
        </template>
        <u-action-sheet style="color:#000" v-if="list.length>0" :list="list" v-model="showList" :cancel-btn="false" safe-area-inset-bottom @click="activeChange"></u-action-sheet>
    </view>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        label: {
            type: String,
            default: ""
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        value: {
            default: null
        },
        id: {
            type: String,
            default: "id"
        }
    },
    data() {
        return {
            activeObj: {},
            list: this.data,
            showList: false,
            callback: () => { }
        };
    },
    watch: {
        // data: {
        //     handler(nVal) {
        //         console.log(nVal, "datanVal");
        //         this.list = nVal;
        //     },
        //     deep: true
        // }
    },
    methods: {
        show(option = {}) {
            if (this.data.length === 0) {
                this.list = option.list || [];
            }
            if ("callback" in option) {
                this.callback = option.callback;
            }
            this.list.map((item) => {
                if (!item.text && this.label) {
                    item.text = item[this.label];
                }
                return item;
            });
            console.log("打开", this.list);
            this.showList = true;
        },
        activeChange(index) {
            this.activeObj = this.list[index];
            this.callback(index, this.list[index]);
            if (this.id && this.id in this.list[index]) {
                this.$emit("input", this.list[index][this.id] + "");
            }
            this.$emit("change", this.list[index]);
        }
    }
};
</script>
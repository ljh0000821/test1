<template>
    <view class="">
        <u-mask :show="show" @click="show = false" class="flex-center">
            <view class="btn-box">
                <view class="btn-item border-b-gray" @click="setShot()">拍摄</view>
                <view class="btn-item" @click="setSelect()">从相册选择</view>
            </view>
        </u-mask>
        <view id="inputGroup">
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            show: false,
            success: () => {}
        };
    },
    created() {},
    methods: {
        showModal(options) {
            this.show = true;
            this.success = options.success;
        },
        //拍摄
        setShot() {
            let input = "";
            if (!document.getElementById("oShot")) {
                input = document.createElement("input");
            } else {
                input = document.getElementById("oShot");
            }
            input.setAttribute("id", "oShot");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "video/mp4");
            input.setAttribute("capture", "user");
            input.onchange = (e) => {
                console.log(input.files[0].size, "input.files[0].size");
                console.log(input.files[0].name, "input.files[0].name");
                console.log(input.files[0].type, "input.files[0].type");
                if (
                    !input.files[0] ||
                    (input.files[0].type != "video/mp4" &&
                        input.files[0].name == "/")
                ) {
                    return;
                }
                let obj = {
                    file: input.files[0],
                    url: URL.createObjectURL(input.files[0])
                };
                console.log(obj, "拍摄的视频");
                this.success(obj);
            };
            let oGroup = document.getElementById("inputGroup");
            oGroup.appendChild(input);
            input.click();
        },
        setSelect() {
            let input = "";
            if (!document.getElementById("oSelect")) {
                input = document.createElement("input");
            } else {
                input = document.getElementById("oSelect");
            }
            input.setAttribute("id", "oSelect");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "video/*");
            input.onchange = (e) => {
                console.log(input.files, "input.files");
                console.log(input.files[0].size, "input.files[0].size");
                console.log(input.files[0].name, "input.files[0].name");
                console.log(input.files[0].type, "input.files[0].type");
                if (input.files[0].type != "video/mp4") {
                    this.$u.toast("格式错误，请上传MP4文件的格式");
                    return;
                }
                if (
                    !input.files[0] ||
                    (input.files[0].type != "video/mp4" &&
                        input.files[0].name == "/")
                ) {
                    return;
                }
                let obj = {
                    file: input.files[0],
                    url: URL.createObjectURL(input.files[0])
                };
                console.log(obj, "选择的视频");
                this.success(obj);
            };
            let oGroup = document.getElementById("inputGroup");
            oGroup.appendChild(input);
            input.click();
        }
    }
};
</script>

<style lang="scss" scoped>
#inputGroup {
    width: 0;
    height: 0;
    overflow: hidden;
}
.btn-box {
    background-color: #fff;
    width: 70%;
    border-radius: 10rpx;
}
.btn-item {
    padding: 24rpx;
}
</style>

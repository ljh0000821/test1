<template>
    <view class="flex1 flex flex-wrap">
        <template v-if="imgList.length>0">
            <view class="img-group" v-for="(item,index) in imgList" :key="item.url">
                <view class="img-item" v-show="item.url">
                    <u-image v-if="type==='add'||type==='edit'||type==='none'" class="del-btn" width="30rpx" height="30rpx" src="../../static/common/btn_photo_del.png" @click="delImg(index)"></u-image>
                    <img :src="item.url" @click="previewImg(item)">
                </view>
            </view>
        </template>
        <template v-if="imgList.length==0&&type==='details'">无</template>
        <template v-if="(type==='add'||type==='edit')&&imgList.length<max">
            <view class="box flex-center" @click="getCameraPre">
                <u-icon v-if="icon==='plus'" :name="icon" size="40" :color="color"></u-icon>
                <image v-if="icon==='camera'" class="camera-icon" src="../../static/common/btn_take_photo_list.png" alt="" srcset="" />
            </view>
        </template>
        <view style="width:100px;position: absolute;top: -999999px;overflow: hidden;">
            <view>
                <canvas :style="{'width':w,'height': h}" canvas-id="firstCanvas"></canvas>
            </view>
        </view>
        <chooseImage2 ref="chooseImage2" @sourceTypeChange="sourceTypeChange" />
    </view>
</template>
<script>
import { BASE_IMG_URL } from "@/common/website";
import { fileUpload, fileRemovePic, fileFileUp } from "@/api/common/common";
import { getNowTime, getType, isIos } from "@/utils/tools";
import chooseImage2 from "./choose-image2.vue";
const Fn = {
    fileUpload: (params, data) => fileUpload(params, data),
    fileFileUp: (params, data) => fileFileUp(params, data)
};
let timer = null;
export default {
    name: "choose-image",
    components: {
        chooseImage2
    },
    props: {
        type: {
            type: String,
            default: "add"
        },
        icon: {
            type: String,
            default: "plus"
        },
        color: {
            type: String,
            default: "#000"
        },
        max: {
            type: Number,
            default: 6
        },
        sourceType: {
            type: Array,
            default: () => ["album", "camera"]
        },
        images: {
            // type: Array,
            // default: () => []
        },
        picType: {
            type: String, //1表示任务类  2.缺陷类 3.隐患类 4.其他或者不传
            default: "2"
        },
        customPreview: {
            type: Boolean,
            default: false
        },
        waterMark: {
            type: Boolean,
            default: false
        },
        waterMarkText: {
            type: Object,
            default: () => {}
        },
        //上传参数
        idsParamsAll: {
            type: Object,
            default: () => {}
        },
        autoUpload: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            w: "200px",
            h: "200px",
            imgList: [],
            file: [],
            uploading: false
        };
    },
    watch: {
        images: {
            handler(nVal) {
                if (this.imgList.length > 0) return;
                console.log(nVal, "图片nVal");
                let arr = [];
                getType(nVal) == "Array" &&
                    nVal.forEach((item) => {
                        if (!item) return;
                        item.url =
                            BASE_IMG_URL +
                            "?fileName=" +
                            +new Date() +
                            "&picId=" +
                            item.picId;
                        arr.push(item);
                    });
                this.imgList = arr;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        getCameraPre() {
            if (this.uploading) {
                return this.$u.toast("正在上传图片，请稍后再试");
            }
            if (this.waterMark) {
                this.$refs.chooseImage2.showModal();
            } else {
                this.getCamera();
            }
        },
        sourceTypeChange(type) {
            this.sourceType.splice(0, this.sourceType.length, type);
            this.getCamera();
        },
        //选择图片
        getCamera() {
            console.log("选择照片");
            let that = this;
            let isios = isIos();
            console.log(isios, "isios");
            if (
                !isios &&
                (process.env.PRODUCTION == "IGWTEST" ||
                    process.env.PRODUCTION == "IGWPRO")
            ) {
                console.log("wxchooseimg");
                wx.chooseImage({
                    count: this.waterMark ? 1 : that.max, // 默认9
                    sizeType: ["compressed"],
                    // sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: that.sourceType, // 可以指定来源是相册还是相机，默认二者都有
                    quality: 0.3,
                    success: function (res) {
                        console.log(res, "微信选择的图片");
                        that.addImg(res.localIds);
                        // if (
                        //     that.sourceType.length == 1 &&
                        //     that.sourceType[0] == "camera"
                        // ) {
                        //     console.log("开始下载图片");
                        //     that.downloadIamge(res.localIds, "测试图片名称");
                        // }
                    },
                    fail: (err) => {
                        console.log(err, "图片选取失败");
                    }
                });
            } else {
                console.log("unichooseimg");
                uni.chooseImage({
                    count: this.waterMark ? 1 : that.max, //默认6
                    sourceType: that.sourceType,
                    success(res) {
                        console.log(res, "选取的信息");
                        that.addImg(res.tempFilePaths);
                        // if (
                        //     that.sourceType.length == 1 &&
                        //     that.sourceType[0] == "camera"
                        // ) {
                        //     console.log("开始下载图片");
                        //     that.downloadIamge(
                        //         res.tempFilePaths[0],
                        //         "测试图片名称"
                        //     );
                        // }
                    },
                    fail: (err) => {
                        console.log(err, "图片选取失败");
                    }
                });
            }
        },
        //添加图片
        addImg(data) {
            if (data.length == 0) {
                return;
            }
            let that = this;
            data.forEach(async (item) => {
                let newUrl = item;
                if (!this.autoUpload) {
                    that.imgList.push({
                        url: newUrl,
                        createTime: getNowTime(),
                        blobFile: null,
                        needUpload: true
                    });
                } else {
                    that.imgList.push({
                        url: "",
                        readyUrl: newUrl,
                        createTime: getNowTime(),
                        blobFile: null,
                        needUpload: true
                    });
                }
                // if (that.waterMark) {
                //     let position =
                //         (that.sourceType[0] == "camera" &&
                //             that.waterMarkText.position) ||
                //         (that.sourceType[0] == "album" &&
                //             that.waterMarkText.towerPosition) ||
                //         [];
                //     that.getImgWaterMark({
                //         url: item,
                //         text:
                //             `${that.waterMarkText.lineName} ${that.waterMarkText.towerName}\nE:${position[0]}\nN:${position[1]}\n` +
                //             getNowTime()
                //         // text: that.waterMarkText + getNowTime()
                //     }).then((res) => {
                //         that.imgList.forEach((v) => {
                //             if (v.url == item) {
                //                 v.url = res;
                //                 that.changeFile();
                //             }
                //         });
                //     });
                // }
            });
            // console.log(that.imgList, "this.imgList");
            that.changeFile();
            that.$emit("change", that.imgList);
            that.$emit("update:picArr", that.imgList);
        },
        //删除图片
        delImg(index) {
            let params = {
                // ...this.idsParamsAll,
                id: this.imgList[index].id,
                type: "1" //1图片 2视频 3音频
                // picType: this.picType
            };
            fileRemovePic(params)
                .then((res) => {
                    this.imgList.splice(index, 1);
                    this.changeFile();
                    this.$emit("change", this.imgList);
                    this.$emit("update:picArr", this.imgList);
                })
                .catch((err) => {
                    this.$u.toast("删除失败");
                });
        },
        //预览图片
        previewImg(item) {
            if (this.customPreview) {
                this.$emit("previewImg", item);
                return;
            }
            uni.previewImage({
                urls: [item.url]
            });
            console.log(item.url, "预览的图片路径");
            // wx.previewImage({
            //     current: item.url, // 当前显示图片的http链接
            //     urls: [item.url], // 需要预览的图片http链接列表
            //     hidePreviewMenuList: [] //
            // });
        },
        //更改file
        changeFile() {
            // console.log("更改file");
            let file = [];
            this.imgList.forEach((item) => {
                if (item.needUpload) {
                    file.push({
                        name: this.waterMark ? "file" : "fileupload",
                        uri: item.url || item.readyUrl
                    });
                }
            });
            this.file = file;
            if (this.autoUpload) {
                console.log(this.idsParamsAll, "idsParamsAll");
                let position =
                    (this.sourceType[0] == "camera" &&
                        this.waterMarkText.position) ||
                    (this.sourceType[0] == "album" &&
                        this.waterMarkText.towerPosition) ||
                    [];
                let params = {
                    picName: `${this.idsParamsAll.bw}`,
                    longitude: position[0],
                    latitude: position[1],
                    timeNow: getNowTime(),
                    ...this.idsParamsAll
                };
                this.getIds(params);
            }
        },
        //获取图片id
        async getIds(params) {
            try {
                console.log("进入获取ids");
                let idList = [];
                this.imgList.forEach((item) => {
                    if (item.id) {
                        idList.push(item.id);
                    }
                });
                let idStr = idList.join(",");
                let res = "";
                // console.log(this.file, "this.file");
                if (this.file.length > 0) {
                    this.uploading = true;
                    timer && clearTimeout(timer);
                    timer = setTimeout(() => {
                        uni.showLoading({
                            title: "图片上传中"
                        });
                    }, 600);
                    // console.log(this.file, "file");
                    // if (
                    //     process.env.PRODUCTION == "IGWTEST" ||
                    //     process.env.PRODUCTION == "IGWPRO"
                    // ) {
                    //     res = await this.uploadImg(this.file, params);
                    // } else {
                    // console.log(this.file, "this.file");
                    let fileArr = [];
                    let isios = isIos();
                    if (
                        !isios &&
                        String(process.env.PRODUCTION).indexOf("IGW") > -1
                    ) {
                        for (const v of this.file) {
                            let obj = {
                                name: this.waterMark ? "file" : "fileupload",
                                uri: await this.getUploadUrl(v.uri)
                            };
                            // console.log(v, "vvvvvvvvv");
                            fileArr.push(obj);
                        }
                    } else {
                        fileArr = this.file;
                    }
                    // this.file.forEach(async (v, index) => {
                    //     let obj = {
                    //         name: "fileupload",
                    //         uri: await this.getUploadUrl(v.uri)
                    //     };
                    //     console.log(index, "index");
                    //     fileArr.push(obj);
                    // });
                    // console.log(fileArr, "fileArr");
                    let fnStr = this.waterMark ? "fileFileUp" : "fileUpload";
                    res = await Fn[fnStr](fileArr, {
                        type: 1, //1图片 2视频 3音频
                        picType: this.picType,
                        ...params
                    });
                    //自动上传的时候都只有一张，切上传一张
                    if (this.autoUpload) {
                        this.imgList.forEach((item) => {
                            if (item.needUpload) {
                                item.needUpload = false;
                                item.id = res;
                                item.url = item.readyUrl;
                            }
                        });
                    }
                    this.uploading = false;
                    timer && clearTimeout(timer);
                    uni.hideLoading();
                    // }
                    idStr = idStr ? idStr + "," + res : res;
                }
                // console.log(idStr, "图片idStr");
                return idStr;
            } catch (err) {
                this.$u.toast("上传失败");
                console.log(err, "上传图片错误");
                this.uploading = false;
                timer && clearTimeout(timer);
                uni.hideLoading();
                throw Error();
            }
        },
        //wx拍摄选择图片后通过返回的id获取本地路径
        getUploadUrl(uri) {
            return new Promise((resolve, reject) => {
                wx.getLocalImgData({
                    localId: uri, // 图片的localID
                    success: function (res) {
                        // console.log(res, "本地图片res");
                        let uploadUrl = res.localData;
                        // console.log(uploadUrl, "uploadUrl", uri);
                        resolve(uploadUrl);
                    }
                });
            });
        },
        // uploadImg(file, params) {
        //     return new Promise((resolve) => {
        //         let obj = {
        //             type: 1, //1图片 2视频 3音频
        //             picType: this.picType,
        //             ...params
        //         };
        //         let arr = [];
        //         file.forEach((item) => {
        //             arr.push(fileUpload([item], obj));
        //         });
        //         Promise.all(arr).then((res) => {
        //             resolve(res.join(","));
        //         });
        //     });
        // },
        //图片水印
        getImgWaterMark(options) {
            return new Promise((resolve, reject) => {
                let that = this;
                uni.getImageInfo({
                    src: options.url,
                    success: (ress) => {
                        console.log(ress, "图片getres");
                        that.w = ress.width / 3 + "px";
                        that.h = ress.height / 3 + "px";
                        setTimeout(() => {
                            let ctx =
                                uni.createCanvasContext(
                                    "firstCanvas"
                                ); /** 创建画布 */
                            //将图片src放到cancas内，宽高为图片大小
                            ctx.drawImage(
                                options.url,
                                0,
                                0,
                                ress.width / 3,
                                ress.height / 3
                            );
                            ctx.setFontSize(30);
                            ctx.setFillStyle("#fff");
                            ctx.setTextAlign("right");
                            let textArr = options.text.split("\n").reverse();
                            let textToWidth = ress.width / 3 - 12;
                            textArr.forEach((item, index) => {
                                let textToHeight =
                                    ress.height / 3 - 12 - 42 * index;
                                ctx.fillText(item, textToWidth, textToHeight);
                            });
                            console.log("开始画了");
                            ctx.draw(true, () => {
                                console.log(66666666);
                                setTimeout(() => {
                                    uni.canvasToTempFilePath({
                                        canvasId: "firstCanvas",
                                        destWidth: parseInt(that.w),
                                        destHeight: parseInt(that.h),
                                        success: (res1) => {
                                            console.log(res1, "画好的res1");
                                            console.log(
                                                res1.tempFilePath,
                                                "tempFilePath"
                                            );
                                            resolve(res1.tempFilePath);
                                        },
                                        fail: (err) => {
                                            console.log(err, "画的err");
                                            reject(err);
                                        }
                                    });
                                }, 100);
                            });
                        }, 100);
                    },
                    fail(err) {
                        console.log("图片选择fail", err);
                    }
                });
            });
        },
        //下载图片
        downloadIamge(url, name) {
            let image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function () {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let url = canvas.toDataURL("image/png");

                // 生成一个a元素
                let a = document.createElement("a");
                // 创建一个单击事件
                let event = new MouseEvent("click");

                // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                a.download = name || "下载图片名称";
                // 将生成的URL设置为a.href属性
                a.href = url;

                // 触发a的单击事件
                a.dispatchEvent(event);
            };

            image.src = url;
        }
    }
};
</script>

<style lang="scss" scoped>
.box {
    width: 134rpx;
    height: 134rpx;
    border: 1px solid #000;
    border-radius: 16rpx;
}
.del-btn {
    width: 30rpx;
    position: absolute;
    right: -4px;
    top: -4px;
}
.img-item {
    width: 134rpx;
    height: 134rpx;
    margin-right: 32rpx;
    margin-bottom: 24rpx;
    position: relative;
}
.img-item img {
    width: 134rpx;
    height: 134rpx;
    border-radius: 16rpx;
}
.camera-icon {
    width: 40rpx;
    height: 40rpx;
}
</style>

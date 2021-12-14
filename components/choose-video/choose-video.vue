<template>
    <view class="flex flex-wrap">
        <template v-if="srcList.length>0">
            <view class="img-group" v-for="(item,index) in srcList" :key="item.resource">
                <!-- <video autoplay :src="item.resource" :id="'oVideo'+item.resource" @play="playVedio()" @fullscreenchange="fullscreenchange" @loadedmetadata="loadedmetadata(index)"></video> -->
                <video class="video-none" :src="item.resource" :id="'oVideo'+item.resource" @play="playVedio()" @fullscreenchange="fullscreenchange" @loadedmetadata="loadedmetadata(index)"></video>
                <view class="img-item">
                    <u-image v-if="type==='add'||type==='edit'" class="del-btn" width="30rpx" height="30rpx" src="../../static/common/btn_photo_del.png" @click="delItem(index)"></u-image>
                    <u-image mode="aspectFill" width="134rpx" height="134rpx" border-radius="16rpx" :src="item.previewUrl"></u-image>
                    <view class="full-box" @click="previewVideo(item.resource)">
                        <view class="flex1 flex-center" style="height:100%;">
                            <u-image width="50rpx" height="50rpx" src="../../static/common/ic_def_add_video_item_play.png"></u-image>
                        </view>
                    </view>
                </view>
            </view>
        </template>
        <template v-if="srcList.length==0&&type==='details'">无</template>
        <template v-if="(type==='add'||type==='edit')&&srcList.length<max">
            <view class="box flex-center" @click="getCamera">
                <u-icon v-if="icon==='plus'" :name="icon" size="40" :color="color"></u-icon>
                <u-image v-if="icon==='camera'" width="40rpx" height="40rpx" src="../../static/common/btn_take_photo_list.png" alt="" srcset=""></u-image>
            </view>
        </template>
        <shotSelectVideo ref="shotSelectVideo" />
    </view>
</template>
<script>
import { BASE_IMG_URL } from "@/common/website";
import { fileUpload } from "@/api/common/common";
import { getType } from "@/utils/tools";
import shotSelectVideo from "@/components/ef-ui/ef-shotSelect-video/ef-shotSelect-video.vue";
export default {
    name: "choose-video",
    components: {
        shotSelectVideo
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
        urls: {
            type: Array,
            default: () => []
        },
        picType: {
            type: String, //1表示任务类  2.缺陷类 3.隐患类 4.其他或者不传
            default: "2"
        },
        videoList: {},
        sourceType: {
            type: Array,
            default: () => ["album", "camera"]
        }
    },
    data() {
        return {
            file: [],
            srcList: [],
            videoContext: null
        };
    },
    watch: {
        videoList: {
            handler(nVal = []) {
                console.log(nVal, "视频nVal");
                if (this.srcList.length > 0) return;
                let arr = [];
                getType(nVal) == "Array" &&
                    nVal.forEach((item) => {
                        if (!item) return;
                        item.resource =
                            BASE_IMG_URL +
                            "?fileName=" +
                            item.picName +
                            "&picId=" +
                            item.picId;
                        item.previewUrl = "";
                        arr.push(item);
                    });
                this.srcList = arr;
                console.log(this.srcList, "this.srcList");
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {},
    methods: {
        //添加视频
        getCamera() {
            if (
                process.env.PRODUCTION == "IGWTEST" ||
                process.env.PRODUCTION == "IGWPRO"
            ) {
                // let _self = this;
                // wx.invoke(
                //     "chooseVideo",
                //     {
                //         sourceType: _self.sourceType // 可以指定来源是相册还是相机，默认二者都有
                //     },
                //     function (res) {
                //         let localIds =
                //             typeof res.localIds == "object"
                //                 ? res.localIds
                //                 : JSON.parse(res.localIds); // 返回生成视频的本地ID，需要typeof判断兼容各个终端
                //         console.log(res, "视频res.localIds");
                //         wx.invoke(
                //             "getLocalResPath",
                //             { localId: localIds[0] },
                //             function (rel) {
                //                 console.log(rel, "igw视频返回的路劲");
                //                 // let obj = {
                //                 //     resource: rel.localResPath,
                //                 //     previewUrl: res.thumbnail,
                //                 //     needUpload: true
                //                 // };
                //                 // _self.srcList.push(obj);
                //                 // _self.changeFile();
                //                 // _self.$emit("change", _self.srcList);
                //             }
                //         );
                //     }
                // );

                let _self = this;
                this.$refs.shotSelectVideo.showModal({
                    success(res) {
                        console.log(res, "选择完的obj");
                        let obj = {
                            resource: res.url,
                            previewUrl: "",
                            needUpload: true
                        };
                        console.log(obj, "obj");
                        _self.srcList.push(obj);
                        _self.changeFile();
                        _self.$emit("change", _self.srcList);
                    }
                });
            } else {
                uni.chooseVideo({
                    sourceType: this.sourceType,
                    success: (res) => {
                        let obj = {
                            resource: res.tempFilePath,
                            previewUrl: "",
                            needUpload: true
                        };
                        console.log(obj, "obj");
                        this.srcList.push(obj);
                        this.changeFile();
                        this.$emit("change", this.srcList);
                    }
                });
            }
        },
        loadedmetadata(index) {
            this.getVideoBase64(this.srcList[index].resource).then((res) => {
                this.srcList[index].previewUrl = res;
                this.srcList = [...this.srcList];
            });
        },
        //删除项
        delItem(index) {
            this.srcList.splice(index, 1);
            this.changeFile();
            this.$emit("change", this.srcList);
        },
        getVideoBase64(url) {
            return new Promise(function (resolve) {
                let dataURL = "";
                let video = document.createElement("video");
                video.setAttribute("crossOrigin", "anonymous"); //处理跨域
                video.setAttribute("width", 400);
                video.setAttribute("height", 240);
                video.currentTime = 1;
                video.setAttribute("src", url);
                video.addEventListener("loadeddata", function () {
                    let canvas = document.createElement("canvas"),
                        width = video.width, //canvas的尺寸和图片一样
                        height = video.height;
                    canvas.width = width;
                    canvas.height = height;
                    canvas
                        .getContext("2d")
                        .drawImage(video, 0, 0, width, height); //绘制canvas
                    dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
                    resolve(dataURL);
                });
            });
        },
        //全屏预览视频
        previewVideo(url) {
            console.log(url, "视频播放url");
            // if (
            //     process.env.PRODUCTION == "IGWTEST" ||
            //     process.env.PRODUCTION == "IGWPRO"
            // ) {
            //     console.log("进入预览了");
            //     // console.log(wx, "wx打印", wx.createVideoContext);
            //     // this.videoContext = wx.createVideoContext("oVideo" + url, this);
            //     // console.log("视频播放url222");
            //     // this.videoContext.play();
            //     // wx.previewFile({
            //     //     url: url, // 需要预览文件的地址(必填，可以使用相对路径)
            //     //     size: 1048576, // 需要预览文件的字节大小(必填)
            //     //     hidePreviewMenuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            //     // });
            //     // wx.previewMedia({
            //     //     sources: [
            //     //         {
            //     //             url: url,
            //     //             type: "video"
            //     //         }
            //     //     ]
            //     // });
            // } else {
            this.videoContext = uni.createVideoContext("oVideo" + url);
            this.videoContext.requestFullScreen();
            this.videoContext.play();
            // }
        },
        //视频开始播放
        playVedio() {
            console.log("开始播放");
        },
        //进入退出全屏触发
        fullscreenchange(e) {
            console.log(e, "e");
            if (!e.detail.fullScreen) {
                this.videoContext.pause();
            }
        },
        //更改file
        changeFile() {
            let file = [];
            this.srcList.forEach((item) => {
                if (item.needUpload) {
                    file.push({
                        name: "fileupload",
                        uri: item.resource
                    });
                }
            });
            this.file = file;
        },
        //获取视频id
        async getIds() {
            try {
                let idList = [];
                this.srcList.forEach((item) => {
                    if (item.id) {
                        idList.push(item.id);
                    }
                });
                let idStr = idList.join(",");
                if (this.file.length > 0) {
                    console.log("有file");
                    console.log(this.file, "file");
                    const res = await fileUpload(this.file, {
                        type: 2,
                        picType: this.picType
                    });
                    console.log(res, "走着了");
                    idStr = idStr ? idStr + "," + res : res;
                }
                console.log(idStr, "idStr");
                return idStr;
            } catch (err) {
                throw Error();
            }
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
    z-index: 999;
}
.img-item {
    margin-right: 32rpx;
    position: relative;
    margin-bottom: 24rpx;
}
.img-item img {
    width: 134rpx;
    height: 134rpx;
    border-radius: 16rpx;
}
.video-none {
    position: absolute;
    clip: rect(0px 0px 0px 0px);
}
.full-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

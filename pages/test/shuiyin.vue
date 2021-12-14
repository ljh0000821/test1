<template>
    <view>
        <!-- <image mode="widthFix" :src="src" @click="preview"></image> -->
        <button type="primary" @tap="takePhoto">拍照{{imgList.length}}</button>
        <template v-if="imgList.length>0">
            <view v-for="(item,index) in imgList" :key='index'>
                <image mode="widthFix" :src="item.url" @click="preview(item.url)"></image>
            </view>
        </template>

        <view style="position: absolute;top: -999999px;">
            <view>
                <canvas :style="{'width':w,'height': h}" canvas-id="firstCanvas"></canvas>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            src: "",
            w: "200px",
            h: "200px",
            imgList: []
        };
    },
    methods: {
        preview(url) {
            uni.previewImage({
                urls: [url],
                current: 0
            });
        },
        takePhoto() {
            let that = this;
            uni.chooseImage({
                count: 9,
                success(res) {
                    // that.src = res.tempFilePaths[0];
                    res.tempFilePaths.forEach(async (item) => {
                        let newUrl = await that.getImgWaterMark({
                            url: item,
                            text: "扶风线 #001\nE:106.123213\nN29.123435\n2020-02-02 00:00:00"
                        });
                        console.log(newUrl, "newUrl");
                        // that.src = newUrl;
                        that.imgList.push({
                            url: newUrl,
                            name: "66"
                        });
                    });
                    console.log(that.imgList, "this.imgList");
                }
            });
        },
        getImgWaterMark(options) {
            return new Promise((resolve, reject) => {
                let that = this;
                uni.getImageInfo({
                    src: options.url,
                    success: (ress) => {
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
                            ctx.draw(true, () => {
                                setTimeout(() => {
                                    uni.canvasToTempFilePath({
                                        canvasId: "firstCanvas",
                                        destWidth: parseInt(that.w),
                                        destHeight: parseInt(that.h),
                                        success: (res1) => {
                                            resolve(res1.tempFilePath);
                                        },
                                        fail: (err) => {
                                            reject(err);
                                        }
                                    });
                                }, 100);
                            });
                        }, 100);
                    }
                });
            });
        }
    }
};
</script>

<style>
</style>
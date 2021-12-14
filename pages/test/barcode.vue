<template>
    <div class="msgbox">
        <button class="sweep" @click="start">开始</button>
        <button class="sweep" @click="end">结束</button>
        <button class="sweep" @click="get">获取</button>
    </div>
</template>
<script>
import HZRecorder from "./test";
import Recorder from "js-audio-recorder";
const lamejs = require("lamejs");
const recorder = new Recorder({
    sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
    sampleRate: 48000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
});
export default {
    data() {
        return {
            record: null
        };
    },
    mounted() {
        HZRecorder.get((res) => {
            this.record = res;
            console.log(this.record, "this.record");
        });
    },
    methods: {
        start() {
            console.log(HZRecorder, "HZRecorder");
            // HZRecorder.start();
            this.record.start();
        },
        end() {
            this.record.end();
        },
        get() {
            let res = this.record.getBlob();
            console.log(res, "res");
            // let innerAudioContext = uni.createInnerAudioContext();
            // innerAudioContext.src = res;
            // innerAudioContext.play();
        },
        convertToMp3(wavDataView) {
            // 获取wav头信息
            const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
            const { channels, sampleRate } = wav;
            const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
            // 获取左右通道数据
            const result = recorder.getChannelData();
            const buffer = [];

            const leftData =
                result.left &&
                new Int16Array(
                    result.left.buffer,
                    0,
                    result.left.byteLength / 2
                );
            const rightData =
                result.right &&
                new Int16Array(
                    result.right.buffer,
                    0,
                    result.right.byteLength / 2
                );
            const remaining =
                leftData.length + (rightData ? rightData.length : 0);

            const maxSamples = 1152;
            for (let i = 0; i < remaining; i += maxSamples) {
                const left = leftData.subarray(i, i + maxSamples);
                let right = null;
                let mp3buf = null;

                if (channels === 2) {
                    right = rightData.subarray(i, i + maxSamples);
                    mp3buf = mp3enc.encodeBuffer(left, right);
                } else {
                    mp3buf = mp3enc.encodeBuffer(left);
                }

                if (mp3buf.length > 0) {
                    buffer.push(mp3buf);
                }
            }

            const enc = mp3enc.flush();

            if (enc.length > 0) {
                buffer.push(enc);
            }

            return new Blob(buffer, { type: "audio/mp3" });
        }
    }
};
</script>
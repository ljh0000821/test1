import efItem from "../components/ef-ui/ef-item/ef-item.vue";
import chooseImage from "../components/choose-image/choose-image.vue";
import chooseAudio from "../components/choose-audio/choose-audio.vue";
import chooseVideo from "../components/choose-video/choose-video.vue";

let useObject = {
    efItem,
    chooseImage,
    chooseAudio,
    chooseVideo
};

const Loading = {
    install(Vue) {
        for (let x in useObject) {
            Vue.component(x, useObject[x]);
        }
    }

};
export default Loading;
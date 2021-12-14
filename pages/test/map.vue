<template>
    <div id="app">
        <custom-navbar title="test" iconLeft></custom-navbar>
        <efMap class="amap-page-container" :markers="data" />
    </div>
</template>
    
<script>
import efMap from "@/components/ef-ui/ef-map/ef-map";
export default {
    name: "AmapPage",
    components: {
        efMap
    },
    data() {
        return {
            data: [
                {
                    twrCode: "#249",
                    lng: 106.536532,
                    lat: 29.565085
                },
                {
                    twrCode: "#250",
                    lng: 106.536532,
                    lat: 29.583296,
                },
                {
                    twrCode: "#251",
                    lng: 106.536532,
                    lat: 29.604846,
                }
            ],
        };
    }
};
</script>
    
<style lang="scss" scoped>
.amap-page-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
}
</style>
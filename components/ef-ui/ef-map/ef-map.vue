<template>
    <div>
        <el-amap ref="map" class="amap-box" :vid="'amap-vue'" :center="initCenter" :zoom="15" :events="MapEvents">
            <!-- 当前位置 -->
            <el-amap-marker vid="component-marker" :position="center" :offset="[-15,-15]" :zIndex="1000" :angle="direction">
                <image src="@/static/common/ic_map_me.png" class="icon" mode="aspectFit"></image>
            </el-amap-marker>
            <!-- 画杆塔 -->
            <el-amap-marker v-for="(item,index) in circleMarker" :position="[item.lng,item.lat]" :key="index" :offset="[-17,-45]">
                <div class="twrCode">{{item.twrCode}}</div>
                <image :src="item.isNotes==1||item.isTest==1||item.isHaul==1 ? towerActive : towerNo" class="icon-tower" mode="aspectFit" @click="marker(item)"></image>
                <!-- <div class="dots flex-between" style="background:#fff" v-if="item.defs && (item.troExts || item.troTrees)">
                    <div class="dots1"></div>
                    <div class="dots2"></div>
                </div> -->
                <div class="double-dots" v-if="item.defs>0 && (item.troExts || item.troTrees)>0"></div>
                <div class="dots" v-else :style="{'background-color':getBack(item)}"></div>
            </el-amap-marker>
            <!-- 画杆塔线路 -->
            <el-amap-polyline vid="polyline" :visible="isPolyline" :editable="false" :path="polylineArray" :strokeWeight="2" strokeColor="#000"></el-amap-polyline>
            <!-- 当前位置范围 距离杆塔500范围内显示 -->
            <el-amap-circle :visible="circleVisible" :center="markersCenter" :radius="distance" :offset="[-distance/2,-distance/2-20]" :fillOpacity="0.5" :fillColor="newDistance <= distance ? '#FEAAA8' : '#AAAAAA'" :strokeOpacity="0"></el-amap-circle>
            <!-- 纠正 -->
            <el-amap-marker :visible="correct" ref="jiuzhengs" vid="jiuzheng" :position="moveCenter" :offset="[-15,-25]" animation="AMAP_ANIMATION_DROP">
                <image src="@/static/common/ic_map_sel.png" class="icon" mode="aspectFit"></image>
            </el-amap-marker>
            <el-amap-polyline :visible="isTrajectory" :path="usermove" :strokeWeight="2" strokeColor="#00B5D0" strokeStyle="dashed" :strokeDasharray="[2,2]"></el-amap-polyline>
        </el-amap>
        <view class="btn-group">
            <view class="btn-group-in">
                <img src="@/static/common/ic_map_zoom_in.png" alt="" @click="enlarge">
                <img src="@/static/common/ic_map_zoom_out.png" alt="" @click="narrow">
                <img src="@/static/common/ic_map_local.png" alt="" @click="toLocal()">
            </view>
        </view>
    </div>
</template>
<script>
export default {
    props: {
        markers: {
            type: Array,
            default: () => []
        },
        //是否开启纠正
        correct: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            initCenter: [106.55, 29.57], //地图初始坐标
            center: [106.55, 29.57], //现在为止
            moveCenter: [106.55, 29.57],
            circleMarker: [], //杆塔标记坐标集合
            polylineArray: [], //杆塔线路坐标集合
            map: null, //map对象
            markersCenter: [0, 0], //杆塔范围坐标
            distance: 200, //杆塔签到范围
            newDistance: 0,
            circleVisible: false, //是否显示杆塔签到范围
            MapEvents: {
                //地图初始化事件
                complete: () => {
                    this.map = this.$refs.map.$$getInstance();
                    this.jiuzheng = this.$refs.jiuzhengs.$$getInstance();
                    this.$emit("correctMoveend", this.map.getCenter());
                },
                mapmove: () => {
                    if (!this.correct) return;
                    const c = this.map.getCenter();
                    this.moveCenter = [c.lng, c.lat];
                },
                //地图平移事件结束
                moveend: () => {
                    if (!this.correct) return;
                    this.jiuzheng &&
                        this.jiuzheng.setAnimation("AMAP_ANIMATION_DROP");
                    this.$emit("correctMoveend", this.map.getCenter());
                }
            },
            jiuzheng: null, //纠正实例
            isTrajectory: true, //巡视轨迹是否可见
            isPolyline: true, //杆塔线路是否可见
            towerActive: require("@/static/common/ic_tower_finished.png"),
            towerNo: require("@/static/common/ic_tower_unfinished.png"),
            direction: 360 //罗盘
        };
    },
    computed: {
        //巡视轨迹
        usermove() {
            return this.$store.state.user.usermove;
        }
    },
    watch: {
        markers: {
            handler(nval) {
                let polylineArray = [],
                    newMarks = [];
                newMarks = this.markers.map((item) => {
                    item.lng = item.longitude;
                    item.lat = item.latitude;
                    polylineArray.push([item.lng, item.lat]);
                    return item;
                });
                this.circleMarker = newMarks;
                this.polylineArray = polylineArray;
            },
            immediate: true
        },
        //巡视轨迹变化时
        usermove(newVal) {
            let ins = newVal.length;
            if (ins > 0) {
                this.center = newVal[ins - 1];
                !this.correct && this.getDis();
            }
        }
    },
    mounted() {
        if (this.usermove.length > 0) {
            let center = this.usermove[this.usermove.length - 1];
            this.initCenter = center;
            this.center = center;
            this.moveCenter = center;
        }
        uni.onCompassChange(this.onCompassChange);
    },
    destroyed() {
        uni.onCompassChange(this.onCompassChange);
    },
    methods: {
        onCompassChange(res) {
            this.direction = res.direction;
        },
        // 地图放大
        enlarge() {
            let zoom = this.map.getZoom();
            this.map.setZoom(++zoom);
        },
        // 地图缩小
        narrow() {
            let zoom = this.map.getZoom();
            this.map.setZoom(--zoom);
        },
        // 移动到当前位置
        toLocal(center) {
            let location = center || this.center;
            // 这句代码很有技巧性  因为刚开始地图被隐藏了  没有视图 所有地图没有被初始化；但是从列表杆塔跳转过来 此时没法获取map实例  所以直接把默认中心坐标定位到传过来的坐标
            if (!this.map) return (this.initCenter = location);
            this.map.setCenter(location);
        },
        // 点击杆塔回传
        marker(e) {
            this.$emit("marker", e);
        },
        // 获取纠正当前坐标
        getMoveCenter() {
            return this.moveCenter;
        },
        // 改变巡视轨迹是否可见
        setTrajectory(isTrajectory = false) {
            this.isTrajectory = isTrajectory;
        },
        // 杆塔线路是否可见
        setPolyline(isPolyline = false) {
            this.isPolyline = isPolyline;
        },
        getBack(item) {
            if (item.defs > 0) {
                return "#FF503C";
            }
            if (item.troExts > 0 || item.troTrees > 0) {
                return "#FFB200";
            }
            return "#333";
        },
        // 计算点和线路上的杆塔最短距离 并且返回杆塔坐标
        getDis() {
            let markers = this.markers;
            let index = 0,
                len = markers.length;
            if (markers.length === 0) return;
            if (markers.length > 10) {
                [index, len] = this.disDetails(markers);
            }
            // eslint-disable-next-line no-undef
            let distance = AMap.GeometryUtil.distance,
                dis = distance(this.center, [
                    markers[index].lng,
                    markers[index].lat
                ]);
            let location = [markers[index].lng, markers[index].lat];
            for (; index < len; index++) {
                let item = markers[index];
                let disItem = distance(this.center, [item.lng, item.lat]);
                if (dis > disItem) {
                    dis = disItem;
                    location = [item.lng, item.lat];
                }
            }
            this.circleVisible = dis < this.distance + 100;
            if (this.circleVisible) {
                this.newDistance = dis;
                this.markersCenter = location;
            }
        },
        // 如果杆塔大于10个  优化计算算法
        disDetails(markers) {
            let num = Math.ceil(markers.length / 5);
            // eslint-disable-next-line no-undef
            let locationIndex = 0,
                distance = AMap.GeometryUtil.distance,
                dis = distance(this.center, [markers[0].lng, markers[0].lat]);
            for (
                let index = 0, len = markers.length;
                index < len;
                index += num
            ) {
                const item = markers[index];
                let disItem = distance(this.center, [item.lng, item.lat]);
                if (dis > disItem) {
                    dis = disItem;
                    locationIndex = index;
                }
            }
            let n1 = locationIndex - num < 0 ? 0 : locationIndex - num;
            let n2 =
                locationIndex + num > markers.length
                    ? markers.length
                    : locationIndex + num;
            if (num > 5) {
                let newMark = [].copyWithin.call(markers, 0, n1, n2);
                newMark.length = n2 - n1;
                return this.disDetails(newMark);
            }
            return [n1, n2];
        }
    }
};
</script>
<style scoped lang="scss">
.amap-box {
    position: relative;
}
.icon {
    width: 30px;
    height: 30px;
}
.icon-tower {
    width: 34px;
    height: 34px;
}
.double-dots {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    border: 2px solid #fff;
    margin: 0 auto;
    overflow: hidden;
}
.double-dots::before {
    content: "";
    width: 4px;
    display: block;
    height: 8px;
    background: #ff503c;
    float: left;
    border-radius: 4px 0 0 4px;
}

.double-dots::after {
    content: "";
    width: 4px;
    display: block;
    height: 8px;
    background: #ffb200;
    float: right;
    border-radius: 0 50% 50% 0;
}
.dots {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    position: relative;
    border: 2px solid #fff;
    margin: 0 auto;
    overflow: hidden;
}
.dots1,
.dots2 {
    width: 4px;
    height: 8px;
}
.dots1 {
    background-color: #ff503c;
}
.dots2 {
    background-color: #ffb200;
}
.twrCode {
    position: relative;
    font-weight: 600;
    color: #333;
    text-align: center;
}
.btn-group {
    width: 60rpx;
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.btn-group-in {
    width: 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 100rpx;
    }
}
</style>

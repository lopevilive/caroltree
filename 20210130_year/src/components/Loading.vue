<template>
    <div class="loading-box">
        <div class="loadEffect">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, inject, Ref } from "vue";

export default defineComponent({
    setup(){
        const status = inject('status') as Ref<number>
        const STATUSMAP = inject('STATUSMAP') as {[index:string]:any}

        let loadImg = (url:string) => {
            return new Promise((resolve) => {
                let img = new Image();
                img.src = url;
                img.onload = () => {
                    console.log(`${url}-load success`);
                    resolve();
                    img.onload = img.onerror = null;
                }
                img.onerror = () => {
                    resolve();
                    img.onload = img.onerror = null;
                    console.log(`${url}-load err`);
                }
            })
        }

        let loadVideo = (url:string) => {
            return new Promise((resolve) => {
                let video = new Audio();
                video.src = url;
                video.oncanplay = () => {
                    console.log(`${url}-load success`);
                    resolve();
                    video.onload = video.onerror = null;
                }
                video.onerror = () => {
                    console.log(`${url}-load err`);
                    resolve();
                    video.onload = video.onerror = null;
                }
            })
        }
        Promise.all([
            loadVideo(`${window.dirPath}assets/hbd.mp3`),
            loadImg(`${window.dirPath}assets/skyline.png`),
            loadImg(`${window.dirPath}img/bulb_blue.873aeb1c.png`),
            loadImg(`${window.dirPath}img/bulb_green.4c48b016.png`),
            loadImg(`${window.dirPath}img/bulb_orange.b3b06fc0.png`),
            loadImg(`${window.dirPath}img/bulb_pink.a120c90b.png`),
            loadImg(`${window.dirPath}img/bulb_red.37e81194.png`),
            loadImg(`${window.dirPath}img/bulb_yellow.299d602e.png`),
            loadImg(`${window.dirPath}img/bulb.df32c7b2.png`),
            loadImg(`${window.dirPath}img/happy_pic.5a8c750a.png`),
            loadImg(`${window.dirPath}img/Balloon-Border.5433c0fa.png`),
        ])
        .then(() => {
            status.value = STATUSMAP.stage1
        })
        
    }
    
})
</script>

<style scoped>
.loading-box{
    background: #000;
    position: relative;
    width: 100%;
    height: 100%;
}

.loadEffect{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top:-50px;
}
.loadEffect span{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: lightgreen;
    position: absolute;
    animation: load 1.04s ease infinite;
}
@keyframes load{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0.2;
    }
}
.loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-8px;
    animation-delay:0.13s;
}
.loadEffect span:nth-child(2){
    left: 14px;
    top: 14px;
    animation-delay:0.26s;
}
.loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -8px;
    animation-delay:0.39s;
}
.loadEffect span:nth-child(4){
    top: 14px;
    right:14px;
    animation-delay:0.52s;
}
.loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-8px;
    animation-delay:0.65s;
}
.loadEffect span:nth-child(6){
    right: 14px;
    bottom:14px;
    animation-delay:0.78s;
}
.loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    animation-delay:0.91s;
}
.loadEffect span:nth-child(8){
    bottom: 14px;
    left: 14px;
    animation-delay:1.04s;
}
</style>



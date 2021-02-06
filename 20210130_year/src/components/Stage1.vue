<template>
    <div id="stage1">
        <div class="bg" :class="{'turn-on-light':status >= STATUSMAP.stage2}">
            <FireWorks v-if="status >= STATUSMAP.stage6"></FireWorks>
        </div>
        <div class="bulb-box">
            <div class="bulb1" :class="{'bulb1-frame':status & STATUSMAP.stage2, 'bulb1-loop':status>=STATUSMAP.stage3}"></div>
            <div class="bulb2" :class="{'bulb2-frame':status & STATUSMAP.stage2, 'bulb2-loop':status>=STATUSMAP.stage3}"></div>
            <div class="bulb3" :class="{'bulb3-frame':status & STATUSMAP.stage2, 'bulb3-loop':status>=STATUSMAP.stage3}"></div>
            <div class="bulb4" :class="{'bulb4-frame':status & STATUSMAP.stage2, 'bulb4-loop':status>=STATUSMAP.stage3}"></div>
            <div class="bulb5" :class="{'bulb5-frame':status & STATUSMAP.stage2, 'bulb5-loop':status>=STATUSMAP.stage3}"></div>
            <div class="bulb6" :class="{'bulb6-frame':status & STATUSMAP.stage2, 'bulb6-loop':status>=STATUSMAP.stage3}"></div>
        </div>
        <div class="happy-pic" :class="{'happy-pic-frame':status >= STATUSMAP.stage4}"></div>
        <div class="ballon-fly" :class="{'ballon-fly-frame': status & STATUSMAP.stage5}"></div>
        <Ballon v-if="status >= STATUSMAP.stage5"></Ballon>
        <transition name="fade">
            <Messages v-if="status & STATUSMAP.stage7"></Messages>
        </transition>
        <audio id="song" controls :src="mp3Url" loop> 
            Your browser isn't invited for super fun audio time.
        </audio>
    </div>
</template>

<script lang="ts">

// eslint-disable-next-line
import {defineComponent, inject, watchEffect, Ref, reactive, toRefs} from 'vue'
import Ballon from '@/components/Ballon.vue'
import FireWorks from '@/components/FireWorks.vue'
import Messages from '@/components/Messages.vue'

export default defineComponent({
    setup(){
        const status = inject('status') as Ref<number>
        const STATUSMAP = inject('STATUSMAP') as {[index:string]:any}

        const state = reactive({
            bgClass:[] as string[]
        })
        watchEffect(() => {

            // 播放音乐
            if(status.value >= STATUSMAP.stage3){
                let $song = document.querySelector('#song') as HTMLVideoElement;
                $song && $song.play();
            }

        });

        let res = {
            ...toRefs(state),
            status,
            STATUSMAP:STATUSMAP,
            mp3Url:`${window.dirPath}assets/hbd.mp3`
        }
        return res;
    },
    components:{Ballon,FireWorks,Messages}
})

</script>

<style scoped>
#stage1{width: 100%;height: 100%;}
.bg{background: #000;width: 100%;height: 100%;position: absolute;left: 0;top:0;}
.turn-on-light{animation: turn-on-light 4s;background: #FFDAB9;z-index: -1;}
@keyframes turn-on-light{
    0%{
        background: #000;
    }
    100%{
        background: #FFDAB9;
    }
}
.bulb-box{
    display: flex;
    justify-content: center;

}
.bulb-box div{
    width: 5rem;
    height:5rem;
    background-size: 100%;
    background-repeat: no-repeat;
}
.bulb1{background:url('../assets/bulb_blue.png');}
.bulb2{background:url('../assets/bulb_green.png');}
.bulb3{background:url('../assets/bulb_orange.png');}
.bulb4{background:url('../assets/bulb_pink.png');}
.bulb5{background:url('../assets/bulb_red.png');}
.bulb6{background:url('../assets/bulb_yellow.png');}

.bulb1-frame{animation: bulb1-frame 4s}
.bulb2-frame{animation: bulb2-frame 4s}
.bulb3-frame{animation: bulb3-frame 4s}
.bulb4-frame{animation: bulb4-frame 4s}
.bulb5-frame{animation: bulb5-frame 4s}
.bulb6-frame{animation: bulb6-frame 4s}
@keyframes bulb1-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_blue.png');
    }
}
@keyframes bulb2-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_green.png');
    }
}
@keyframes bulb3-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_orange.png');
    }
}
@keyframes bulb4-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_pink.png');
    }
}
@keyframes bulb5-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_red.png');
    }
}
@keyframes bulb6-frame{
    0%{
        background-image:url('../assets/bulb.png');
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        background-image:url('../assets/bulb_yellow.png');
    }
}


.bulb1-loop{animation: bulb1-loop linear 1s infinite}
.bulb2-loop{animation: bulb2-loop linear 1.2s infinite}
.bulb3-loop{animation: bulb3-loop linear 1.4s infinite}
.bulb4-loop{animation: bulb4-loop linear 1.6s infinite}
.bulb5-loop{animation: bulb5-loop linear 1.8s infinite}
.bulb6-loop{animation: bulb6-loop linear 2s infinite}
@keyframes bulb1-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_blue.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}
@keyframes bulb2-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_green.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}
@keyframes bulb3-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_orange.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}
@keyframes bulb4-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_pink.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}
@keyframes bulb5-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_red.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}
@keyframes bulb6-loop{
    0%{
        background-image:url('../assets/bulb.png');
    }
    50%{
        background-image:url('../assets/bulb_yellow.png');
    }
    100%{
        background-image:url('../assets/bulb.png');
    }
}


#song{display: none;}
.happy-pic{
    width: 100%;
    height:22rem;
    background-image: url('../assets/happy_pic.png');
    background-size: 100% auto;
    display: none;
    position: absolute;
    top:0;
    left:0;
}

.happy-pic-frame{animation: happy-pic-frame 4s;display: block;}
@keyframes happy-pic-frame{
    0%{
		transform:translate(0px,-1000px);
	}
	33%{
		transform:translate(0px,0px);
		transform:rotate(10deg);
		/*transform:scale(1.5);*/
	}
	66% {
		transform:translate(0px,100px);
		transform:rotate(-10deg);
	}
	100% {
		transform:translate(0px,0px);
	}
}

.ballon-fly{
    width: 100%;
    height:6rem;
    background-image: url('../assets/Balloon-Border.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    display: none;
    position: absolute;
    top:0;
    left:0;
}
.ballon-fly-frame{animation: ballon-fly-frame 2.5s ease-in;display: block;animation-fill-mode: forwards;}
@keyframes ballon-fly-frame {
    0%{
        top:100%;
        left:0;
        transform: scale(1)
    }
    90%{
        opacity: 1;
    }
    100%{
        top:-12rem;
        left:0;
        transform: scale(2);
        opacity: 0;
    }
}



</style>



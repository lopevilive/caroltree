<template>
    <div class="ballon-wrap">
        <div v-for="item in list" class="item" :style="item.style" :key="item">
            <img :src="item.srcUrl" alt="">
        </div>
    </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, reactive, toRefs ,ref, Ref } from 'vue';

function randomNum(minNum:number,maxNum:number):number{
    let res = Math.random()*(maxNum-minNum+1)+minNum;
    res = parseInt(res + '',10)
    return res;
}

// eslint-disable-next-line
class BallonItem{
    private left:number = Math.random()*10;
    private top:number = Math.random()*10;
    private style = ref(this.getStyle());
    private x:1 | -1 = 1;
    private y:1 | -1 = 1;
    private className = ref('');
    private srcUrl = `assets/b${randomNum(1,7)}.png`
    constructor(){
        this.init()
    }
    init(){
        this.loop()
    }
    getStyle(){
        return `
            animation-name: to-right, to-bottom;
            animation-duration: 5s, 0.8s;
        `;
    }

    getRankdom(){
        if(Math.random() <= 0.5){
            return 0.05;
        }else{
            return 0.1;
        }
        // return Math.random() * 0.2;
        // return 0.1
    }

    loop(){

        setTimeout(() => {
            let tmpClass = '';
            if(this.x > 0){
                tmpClass = 'to-right'
                if(this.left >= 22){
                    this.x = - this.x as 1 | -1;
                }
                
            }else{
                tmpClass = 'to-left'
                if(this.left <= 0){
                    this.x = - this.x as 1 | -1;
                }
            }

            if(this.y > 0){
                tmpClass += ' to-bottom'
                if(this.top >= 42){
                    this.y = -this.y as 1| -1;
                }
            }else{
                tmpClass += 'to-top'
                if(this.top <= 0){
                    this.y = -this.y as 1 | -1;
                }
            }
            this.className.value = tmpClass;
            this.loop();
        }, 300);
    }

}

export default defineComponent({
    setup(){
        const state:{[index:string]:any} = reactive({
            list:[]
            // list:new Array(2).fill(0).map(() => {
            //     return new BallonItem();
            // })
        })


        let res = {
            ...toRefs(state)
        }
        return res;
    }
})


</script>
<style scoped>
.ballon-wrap{
    position: fixed;
    width:0px;
    height: 0px;
    top:0px;
    left: 0px;
}
.item{
    width: 10rem;
    height: 15rem;
    display:flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}
.item img{
    height:100%;
    animation: item-shake linear 10s infinite;
}
@keyframes item-shake{
    0% {
		transform: rotate(-20deg);
	}
	50% {
		transform: rotate(20deg);
	}
	100% {
		transform: rotate(-20deg);
	}
}

.to-right{animation:to-right 10s}
.to-left{animation:to-left 10s}
.to-top{animation:to-top 10s}
.to-bottom{animation:to-bottom 10s}


</style>

<style>
@keyframes to-right{
    50%{
        left:11rem;
    }
    100%{
        left:22rem;
    }
}

@keyframes to-left{
    
    50%{
        left:11rem;
    }
    100%{
        left:0rem;
    }
}

@keyframes to-bottom{
    0%{
        top:0;
    }
    50%{
        top:50%;
    }
    100%{
        /* top:calc(100% - 15rem); */
        top:100%;
    }
}
@keyframes to-top{
    50%{
        top:50%;
    }
    100%{
        top:0rem;
    }
}
</style>


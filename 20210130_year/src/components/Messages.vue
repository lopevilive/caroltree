<template>
    <div class="message-box" >
        <div class="box-bg"></div>
        <p v-html="currentMsg" :class="{'is-hide':isHide}"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, ref, inject } from 'vue';

export default defineComponent({
    setup(){
        let status = inject('status') as {[index:string]:any};
        let STATUSMAP = inject('STATUSMAP') as {[index:string]:any};
        let messageList = [
            {txt:'很快啊，就又过年了11', time:100},
            {txt:'希望大小姐健健康康', time:100},
            {txt:'很快啊，就又过年了12', time:100},
            {txt:'很快啊，就又过年了13', time:100},
        ]
        
        let state = reactive({
            isHide:true,
            currentIndex:0,
            isEnd:false
        });
        let currentMsg = ref('');
        watchEffect(() => {
            currentMsg.value = messageList[state.currentIndex].txt;
        })
        let showTxt = () => {
            const last = messageList[state.currentIndex].time;
            state.isHide = false;
            setTimeout(() => {
                state.isHide = true;
                setTimeout(() => {
                    if(messageList[state.currentIndex + 1]){
                        state.currentIndex ++ ;
                        state.isHide = false;
                        showTxt();
                    }else{
                        status.value = STATUSMAP.stage8
                    }
                }, 500);
            }, last);
        }
        showTxt()
        let res = {
            ...toRefs(state),
            currentMsg
        }
        // console.log(res)
        return res;
    }
})
</script>

<style scoped>
.message-box{
    width:28rem;
    height:12rem;
    margin: 0 auto;
    margin-top: 18rem;
    border-radius: 10px;
    position: relative
}
.box-bg{
    position: absolute;
    height: 100%;
    width: 100%;
    left:0;
    top:0;
    background: #000;
    opacity: 0.7;
    border-radius: 10px;
    z-index: -1;
}
p{
    color: #fff;
    font-size: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    line-height: 3rem;
    transition: opacity 1s;
}
.is-hide{
    opacity: 0;
}
</style>



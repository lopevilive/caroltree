<template>
    <div class="message-box">
        <div class="box-bg"></div>
        <p v-html="currentMsg"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    setup(){
        let messageList = [
            '很快啊，就又过年了',
            '希望大小姐健健康康',
            '快快乐乐',
            '咩都翻晒来'
        ];
        let state = reactive({
            currentMsg:messageList[0]
        });
        return {
            ...toRefs(state)
        }
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
}
</style>



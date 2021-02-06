<template>
  <div style="width:100%;height:100%;">
    
    <Stage1 v-if="status ^ STATUSMAP.stage0"></Stage1>
    <div class="button-box" v-if="showButton">
      <div class="botton" @click="goNextRoute">{{btnTxt}}</div>
    </div>
    <Loading v-if="status & STATUSMAP.stage0"></Loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watchEffect ,provide } from "vue";
import Loading from '@/components/Loading.vue'
import Stage1 from '@/components/Stage1.vue'

export default defineComponent({
  setup(){
    const STATUSMAP:{[index:string]:any} = {}
    new Array(20).fill(1).forEach((item, index):void=> {
      STATUSMAP['stage' + index] = 1<<index; 
    })
    const cfg:{[index:string]:any} = {
      [STATUSMAP.stage0] : {btn:''},
      [STATUSMAP.stage1] : {btn:'Turn On Lights', last:3000},
      [STATUSMAP.stage2] : {btn:'Play Music', last:3000},
      [STATUSMAP.stage3] : {btn:'Let\'s Decorate', last:3000},
      [STATUSMAP.stage4] : {btn:'Fly With Balloons', last:3000},
      [STATUSMAP.stage5] : {btn:'Let Off Fireworks', last:3000},
      [STATUSMAP.stage6] : {btn:'a message for u', last:3000},
      [STATUSMAP.stage7] : {btn:''},
    }

    const status = ref(STATUSMAP.stage5);

    const state = reactive({
      showButton:true,
      btnTxt:'',
    })
    
    watchEffect(() => {
      var txt = '';
      try{
        txt = cfg[status.value].btn
        console.log(txt)
      }catch(e){e}
      if(txt){
        state.btnTxt = txt;
        if(status.value & STATUSMAP.stage1){
           state.showButton = true;
        }
      }else{
        state.showButton = false
      }
     
    })

    const goNextRoute = () => {
      state.showButton = false;
      if(cfg[status.value<<1]){
        status.value = status.value<<1;
        const last = cfg[status.value].last;
        if(last){
          setTimeout(() => {
            state.showButton = true;
          }, last);
        }
      }
    }

    provide('status',status);
    provide('STATUSMAP',STATUSMAP);

    return {
      ...toRefs(state),
      status,
      goNextRoute,
      STATUSMAP:{
        ...STATUSMAP
      }
    }
  },
  components:{
    Loading,
    Stage1
  }
})
</script>

<style>
#app{
  width:100%;
  height: 100%;
  overflow: hidden;
}
html{width: 100%;height: 100%;}
body{width: 100%;height: 100%;}
*{
  padding: 0;
  margin: 0;
}
.button-box{
  position: fixed;
  bottom :1.5rem;
  width: 100%;
  height:5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 1s;
}
.botton{
  padding:0.8rem;
  color: #fff;
  background-color: #466baf;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>



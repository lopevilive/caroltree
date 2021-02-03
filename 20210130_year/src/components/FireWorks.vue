<template>
    <div id="fireworks"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import '../assets/util.js'

declare var main:Function;

export default defineComponent({
    setup(){
        onMounted(() => {
            main()
            // console.log(window)
        })
    }
})
</script>

<style scope>
canvas {
    background: #eee;
    display: block;
    margin: 0 auto;
}
</style>



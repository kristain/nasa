<template>

  <div v-if="status" id="modals">
    <div @click="status = !status" class="modals-popup"></div>
    <div class="modals-container">
      <div @click="status = !status" class="closed"><span class="iconfont">&#xe60d;</span></div>
      <img class="show-image" :src="image" alt="">
    </div>
  </div>

</template>
<script>

  export default {
    replace: true,
    props: ['status', 'image'],
    data (){
      return {
        //
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      //
    },
    methods:{
      //
    },
    components: {
      //
    },
    events: {
      //
    }
  }
</script>

<style scoped>
  .modals-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #353535;
    opacity: .6;
  }
  .modals-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: auto;
    z-index: 999;
  }
  .show-image {
    overflow: auto;
    max-width: 100%;
  }
  .closed {
    background:#FFF;
    font-size:16px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }
</style>

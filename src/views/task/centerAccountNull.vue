<template>

  <header class="bar bar-nav">
    <h1 class="title">任务大厅</h1>
  </header>

  <div class="content">

    <div class="m-top-tips">
      <div>1、用错买号做任务将扣除佣金个，并处罚2金币</div>
      <div>2、接受任务后必须在一小时内完成，否则将扣除5金币</div>
    </div>

    <div class="task-tips-null">
      <small>你还未添加买手账号，</small>
      <a v-link="{name:'account-add'}" class="link-a">立即添加</a>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 2
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
      "nvNav":require('../../components/Nav.vue'),
    },
    events: {
      //
    }
  }
</script>

<style scoped>

</style>

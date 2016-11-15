<template>

  <header class="bar bar-nav">
    <h1 class="title">接受邀请</h1>
  </header>

  <div class="content">
    <div class="invite-page">
      <p>接受邀请，成为人气会员</p>
      <p>注册即送 20 金币！</p>
      <a class="button button-big button-fill button-warning" v-link="{path: '/buyer/register?f=' + inviteId}">免费注册领取</a>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        inviteId: Util.getUrlParam('f')
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {

    },
    methods:{
      tips (){
        $.toast('完善中');
      },
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
  .content {
    background: #FFF;
  }

  .invite-page {
    padding: 2rem;
  }

</style>

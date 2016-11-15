<template>

  <nav class="bar bar-tab">
    <a v-link="{name: 'task-index'}" class="tab-item external" id="nav1">
      <span class="icon icon-home"></span>
      <span class="tab-label">主页</span>

    </a>
    <a v-link="{name: 'task-center-account'}" class="tab-item external" id="nav2">
      <span class="icon iconfont">&#xe605;</span>
      <span class="tab-label">任务大厅</span>
    </a>
    <a v-link="{name: 'users-task'}" class="tab-item external" id="nav3">
      <span class="icon iconfont">&#xe604;</span>
      <span class="tab-label">我的任务</span>
    </a>
    <a v-link="{name: 'userinfo'}" class="tab-item external" id="nav4">
      <span class="icon icon-me"></span>
      <span class="tab-label">个人中心</span>
    </a>
  </nav>

</template>

<script>

  export default {
    replace: true,
    props: ['numbers'],
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
      this.changeNavStatus();
    },
    methods:{
      tips (){
        $.toast('完善中...');
      },
      changeNavStatus (){
        var _self = this;
        switch(_self.numbers){
          case 1:
            $('#nav1').addClass('active');
          break;
          case 2:
            $('#nav2').addClass('active');
          break;
          case 3:
            $('#nav3').addClass('active');
          break;
          case 4:
            $('#nav4').addClass('active');
          break;

        }
      }
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

</style>

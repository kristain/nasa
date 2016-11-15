<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">我的任务</h1>
  </header>

  <div class="content">
    <div class="row margin-15-0 text-14">
      <div v-link="{name: 'users-task-list', params: {status: 'taskruning'}}" class="col-33 text-center">
        <div>进行中<span class="text-danger">（{{taskInfo.taskruning}}）</span></div>
      </div>
      <div v-link="{name: 'users-task-list', params: {status: 'waitCheck'}}" class="col-33 text-center">
        <div>待审核<span class="text-danger">（{{taskInfo.waitCheck}}）</span></div>
      </div>
      <div v-link="{name: 'users-task-list', params: {status: 'waitSendMoney'}}" class="col-33 text-center">
        <div>待发佣金<span class="text-danger">（{{taskInfo.waitSendMoney}}）</span></div>
      </div>
    </div>

    <div class="split-line-5"></div>
    <div class="list">
      <div v-link="{name: 'users-task-list', params: {status: 'taskruning'}}" class="list-item border-bottom">
        <span>进行中</span>
        <div class="pull-right">{{taskInfo.taskruning}} 笔 <span class="icon icon-right"></span></div>
      </div>
      <div v-link="{name: 'users-task-list', params: {status: 'waitCheck'}}" class="list-item border-bottom">
        <span>待审核</span>
        <div class="pull-right">{{taskInfo.waitCheck}} 笔 <span class="icon icon-right"></span></div>
      </div>
      <div v-link="{name: 'users-task-list', params: {status: 'waitSendMoney'}}" class="list-item border-bottom">
        <span>待发放佣金</span>
        <div class="pull-right">{{taskInfo.waitSendMoney}} 笔 <span class="icon icon-right"></span></div>
      </div>
      <div v-link="{name: 'users-task-list', params: {status: 'checkPass'}}" class="list-item">
        <span>审核通过</span>
        <div class="pull-right">{{taskInfo.checkPass}} 笔 <span class="icon icon-right"></span></div>
      </div>
    </div>
    <div class="split-line-5"></div>
    <div v-link="{name: 'users-task-list', params: {status: 'checkReject'}}" class="list">
      <div class="list-item border-bottom">
        <span>审核不通过</span>
        <div class="pull-right">{{taskInfo.checkReject}} 笔 <span class="icon icon-right"></span></div>
      </div>
    </div>
    <div v-link="{name: 'users-task-cancel-list'}" class="list">
      <div class="list-item border-bottom">
        <span>已取消</span>
        <div class="pull-right">{{taskInfo.cancelTask}} 笔 <span class="icon icon-right"></span></div>
      </div>
    </div>


  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 3,
        taskInfo: {},
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getMyTask();
    },
    methods:{
      getMyTask() {
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/getMyTasksReview',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              _self.taskInfo = res.data;
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
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
    background-color: #fff;
  }
  .text-center {
    text-align: center;
  }
  .list {
    padding: 0px 10px;
  }
  .list .icon-right {
    font-size: 10px;
    vertical-align: .1rem;
  }
  .list-item {
    font-size: 14px;
    padding: 10px;
    margin: 3px 0px;
  }
  .border-bottom {
    border-bottom: 1px solid #E2E2E2;
  }
</style>

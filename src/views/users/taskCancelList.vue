<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">我的任务</h1>
  </header>

  <div class="content">
    <div class="task-list" v-for="task in taskDatas">
      <div class="task-list-title">
        <span>任务号：{{ task.gmtCreated | formatDate 'yyyMMddhh'}}{{task.id}}</span>
        <span class="pull-right text-gray">{{task.gmtModified | formatDate 'MM-dd hh:mm'}}
          <a class="text-gray">已取消</a></span>
      </div>
      <div class="task-list-body clearfix line-bottom">
        <div class="task-list-body-left">
          <img :src="task.productModel.productImg + '-200'" alt="">
        </div>
        <div class="task-list-body-right">
          <p>任务佣金：{{task.taskMoney}}金币</p>
          <p>任务类型：{{task.taskType}}</p>
          <p>执行买手：{{task.excuteAccount.nick}}</p>
        </div>
      </div>
    </div>

    <div v-show="isMore" class="loading-more" @click="loadingMore">点击加载更多</div>
    <div v-else class="loading-nothing-more">暂无更多信息</div>

  </div>

  <nv-nav id="nav" :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 3,
        pages: 1,
        taskDatas: [],
        isMore: true,
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getCancelTask(this.pages);
    },
    methods:{
      loadingMore (){
        this.pages ++;
        this.getCancelTask(this.pages);
      },
      getCancelTask (pages){
        var _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/buyer/cancleTaskList/'+ pages,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              $.hideIndicator();
              if(res.data.records.length < res.data.page.pageSize){
                _self.isMore = false;
              }
              _self.taskDatas = _self.taskDatas.concat(res.data.records)
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
            $.hideIndicator();
          },
          error: function(err) {
            $.hideIndicator();
            $.alert(JSON.stringify(err));
          }
        });
      }
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvCountDown":require('../../components/CountDown.vue'),
    },
    events: {
      //
    }
  }
</script>

<style scoped>
  .content {
  }


  .infinite-scroll-preloader {
    margin-top: 20px;
  }

  .task-countdown {
    font-size: 13px;
    margin-top: 15px;
  }

</style>

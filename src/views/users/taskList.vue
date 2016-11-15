<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">我的任务</h1>
  </header>

  <div class="content">
    <div class="task-list" v-for="task in taskDatas">
      <div class="task-list-title">
        <span>任务号：{{ task.gmtCreated | formatDate 'yyyMMddhh'}}{{task.id}}</span>
        <span class="pull-right">
          <span class="text-gray">{{task.gmtModified | formatDate 'MM-dd hh:mm'}}</span>
          <a v-if="task.status == 'taskruning'" class="text-success">正在进行中</a>
          <a v-if="task.status == 'checkReject'" class="text-error">审核未通过</a>
          <a v-if="task.status == 'waitCheck'" class="text-warning">待审核</a>
          <a v-if="task.status == 'waitSendMoney'" class="text-warning">待发佣金</a>
          <a v-if="task.status == 'checkPass'" class="text-success">审核通过</a>
        </span>

      </div>

      <div v-if="task.status == 'checkPass' || task.status == 'waitCheck' || task.status == 'checkReject'" class="task-list-body clearfix line-bottom" v-link="{name: 'task-center-show', params: {id: task.id}}">
        <div class="task-list-body-left">
          <img :src="task.productModel.productImg + '-200'" alt="">
        </div>
        <div class="task-list-body-right">
          <p>任务佣金：{{task.sellerMoney}}金币</p>
          <p>任务类型：{{task.taskType}}</p>
          <p>执行买手：{{task.excuteAccount.nick}}</p>
        </div>

      </div>

      <div v-else class="task-list-body clearfix line-bottom" v-link="{name: 'task-center-start', params: {id: task.id}}">
        <div class="task-list-body-left">
          <img :src="task.productModel.productImg + '-200'" alt="">
        </div>
        <div class="task-list-body-right">
          <p>任务佣金：{{task.sellerMoney}}金币</p>
          <p>任务类型：{{task.taskType}}</p>
          <p>执行买手：{{task.excuteAccount.nick}}</p>
        </div>
      </div>
      <div v-if="task.status == 'taskruning'" class="task-list-footer task-countdown clearfix">
        <nv-count-down :times="task.gmtModified + 60 * 60 * 1000"></nv-count-down>
        <a v-if="task.status == 'taskruning'" @click="cancelTask(task.id)" class="button-warning pull-right cancel-btn">取消任务</a>
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
        status: ''
      }
    },
    route:{
      data ({ to: { params: { status }}}){
        this.status = status;
      }
    },
    ready () {
      this.getRuningTask(this.pages);
    },
    methods:{
      loadingMore (){
        this.pages ++;
        this.getRuningTask(this.pages);
      },
      getRuningTask (pages){
        var _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/buyer/getMyTasks/'+ pages +'/'+ _self.status,
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
      },
      cancelTask (taskId){
        var _self = this;
        $.confirm("确认继续？",function(){
          $.ajax({
            url: '/nasa/buyer/cancleTask/'+ taskId,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
              if(res.success){
                $.toast('该任务取消成功');
                setTimeout(() => {
                  _self.$route.router.go({ name: 'task-center-account'});
                }, 1000);
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
    margin-top: 5px;
  }



</style>

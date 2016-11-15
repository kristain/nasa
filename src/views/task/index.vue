<template>

  <header class="bar bar-nav">
    <h1 class="title">
      主页
    </h1>
    <a v-link="{name: 'users-myinvite'}" class="button button-link button-nav pull-right">推广</a>
  </header>

  <div class="content">
    <div class="task-top">
      <span class="money">{{info.totalMoney || "0.00"}}</span> 金币
      <div class="money-title">累计收入</div>
      <div class="content-padded">
        <div class="row">
          <div class="col-33">
            <div class="money-account">{{info.todayMoney || "0.00"}}</div>
            <div class="money-account-title">今日收入</div>
          </div>
          <div class="col-33">
            <div class="money-account">{{info.taskCount || "0"}}</div>
            <div class="money-account-title">任务总数</div>
          </div>
          <div class="col-33">
            <div class="money-account">0</div>
            <div class="money-account-title">推广奖励</div>
          </div>
        </div>
      </div>
    </div>

    <div class="split-line-5"></div>
    <div class="task-box">
      <div class="content-padded">
        <div class="row clearfix" style="overflow: visible">
          <div class="col-33">
            <div class="task-box-card">
              <div class="task-box-card-title" @click="goToTaskList('regular')">
                <a v-link="{path: '/buyer/task/index?type=regular'}">常规任务</a>
                <div v-if="info.totalWaitUseTaskCount" class="task-dot">{{info.regularCount}}</div>
              </div>
              <div class="task-box-card-sub">搜索、收藏</div>
            </div>
          </div>
          <div class="col-33">
            <div class="task-box-card">
              <div class="task-box-card-title" @click="goToTaskList('tuan')">
                <a v-link="{path: '/buyer/task/index?type=tuan'}">活动任务</a>
                <div v-if="info.totalWaitUseTaskCount" class="task-dot">{{info.tuanCount}}</div>
              </div>
              <div class="task-box-card-sub">开团提醒</div>
            </div>
          </div>

          <div class="col-33" @click="checkIN">
            <div class="task-box-card">
              每日签到
              <div class="task-box-card-sub" >立即获得金币</div>
            </div>
          </div>
        </div>
        <div class="m-tips">
          <div class="m-circle"><i class="iconfont">&#xe608;</i></div>
          <div class="swiper-container" >
            <div class="swiper-wrapper">
              <div class="swiper-slide">用户158****1929通过任务赢取2.8金币！</div>
              <div class="swiper-slide">用户187****1299通过任务赢取1.8金币！</div>
              <div class="swiper-slide">用户189****1222通过任务赢取3.8金币！</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="split-line-5"></div>

    <div class="task-content">
      <div class="content-padded">
        <div class="row">
          <div v-link="{name: 'message-list', params: {type: 'system'}}" class="col-50 item line-right">
            <div class="item-left-1">
              <i class="iconfont">&#xe608;</i>
            </div>
            <div class="item-right">系统公告</div>
          </div>
          <div v-link="{name: 'message-list', params:{type: 'new'}}" class="col-50 none-margin item">
            <div class="item-left-2 margin-left-15">
              <i class="iconfont">&#xe606;</i>
            </div>
            <div class="item-right" >新手教程</div>
          </div>
        </div>
        <div class="row">
          <div v-link="{name: 'users-myinvite'}" class="col-50 item line-top line-right">
            <div class="item-left-3">
              <i class="iconfont">&#xe609;</i>
            </div>
            <div class="item-right">好友邀请</div>
          </div>
          <div @click="tips" class="col-50 none-margin item line-top">
            <div class="item-left-4 margin-left-15">
              <i class="iconfont">&#xe607;</i>
            </div>
            <div class="item-right">在线客服</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 1,
        info: []
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getHomepage();
      //
    },
    methods:{
      tips (){
        $.toast('完善中...');
      },

      goToTaskList(type) {
        this.$route.router.go({path: `/buyer/task/center/account?type=${type}`});
      },

      getHomepage () {
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/buyerWelcome',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              _self.info = res.data;
              $(".swiper-container").swiper({
                slidesPerView: 'auto',
                auto: 1000,
                paginationClickable: true,
                spaceBetween: 30
              });

            }else if(res.message == '用户未登录'){
              store.clear();
              $.toast(res.message);
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

      checkIN() {
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/buyerSign',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              $.alert('恭喜，签到成功，领取5金币！');
              _self.info.todayMoney += 5;
              _self.info.totalMoney += 5;
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
      }
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
    margin-bottom: 2.5rem;
  }
</style>

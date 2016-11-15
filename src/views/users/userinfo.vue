<template>

  <header class="bar bar-nav">
    <h1 class="title">个人中心</h1>
  </header>

  <div class="content">
    <div class="userinfo-header-box">
      <div class="header-img">
        <img src="/src/assets/images/logo3.jpg" alt="">
      </div>
      <div class="header-text">
        <div>{{userInfo.nick}}</div>
        <small>等级：普通会员   金币：{{userInfo.totalMoney}}</small>
      </div>
    </div>
    <div class="list">
      <!--
      <div class="list-item border-bottom" v-link="{name: 'users-profiles'}">
        <span>个人资料</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
      -->
      <div class="list-item" v-link="{name: 'account-list'}">
        <span>买手账号</span>
        <div class="pull-right text-warning">{{userInfo.accountNum}}个<span class="icon icon-right"></span></div>
      </div>
    </div>

    <div class="split-line-5"></div>
    <div class="list">
      <div class="list-item border-bottom" v-link="{name: 'users-capital-flow'}">
        <span>资金明细</span>
        <div class="pull-right text-warning">总金币：{{userInfo.totalMoney}}<span class="icon icon-right"></span></div>
      </div>
      <div class="list-item border-bottom" v-link="{name: 'users-cashed-home'}">
        <span>我的钱包</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
      <div class="list-item" v-link="{name: 'users-myinvite-detail'}">
        <span>邀请明细</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
    </div>

    <div class="split-line-5"></div>
    <div class="list">
      <div class="list-item border-bottom" v-link="{name: 'message-list', params: {'type': 'system'}}">
        <span>通知公告</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
      <div class="list-item border-bottom" v-link="{name: 'message-list', params: {'type': 'new'}}">
        <span>帮助中心</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
      <div class="list-item border-bottom">
        <span><span class="icon icon-message"></span>  联系客服</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
    </div>

    <div class="content-block">
      <a class="button button-big button-fill button-warning" @click="logout">退出登录</a>
    </div>


  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
        userInfo: {}
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getUserInfo();
    },
    methods:{
      tips (){
        $.toast('完善中');
      },
      getUserInfo () {
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/buyerInfo',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.user);
            if(res.success){
              _self.userInfo = res.user;
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
            _self.loading = false;
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
      },
      logout () {
        $.ajax({
          url: '/nasa/logout',
          type: 'POST',
          data: JSON.stringify({}),
          contentType: 'application/json',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              store.clear();
              this.$route.router.go({ name: 'login'});
            } else {
              $.alert('退出失败');
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
    background: #FFF;
  }

  .icon-right {
    margin-left: 8px;
  }

  .text-center {
    text-align: center;
  }
  .list {
    padding: 0px 10px;
  }
  .list-item {
    font-size: 14px;
    padding: 10px;
    margin: 3px 0px;
  }
  .border-bottom {
    border-bottom: 1px solid #E2E2E2;
  }
  .userinfo-header-box {
    width: 100%;
    height: 80px;
    background: #f60;
  }
  .userinfo-header-box .header-img {
    width: 60px;
    height: 60px;
    margin: 10px 20px;
    float: left;
  }
  .userinfo-header-box .header-img img {
    width: inherit;
    height: inherit;
    border-radius: 50%;
  }
  .userinfo-header-box .header-text {
    float: left;
    color: #FFF;
    padding-top: 20px;
  }

</style>

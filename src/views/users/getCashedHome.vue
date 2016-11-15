<template>

  <header class="bar bar-nav">
    <h1 class="title">我的钱包</h1>
  </header>

  <div class="content">
    <div class="cashed-container">
      <div class="circle text-warning">
        <div class="cashed-numbers">{{cashedDatas.total}}</div>
        <div class="cashed-text">账户余额 (金币)</div>
      </div>
    </div>

    <div class="row cashed-options">
      <div class="col-50 option-left">
        <div class="cashed-option-text">可提现金币</div>
        <div class="cashed-option-counts text-warning">{{cashedDatas.canCash}}</div>
      </div>
      <div class="col-50 option-right">
        <div class="cashed-option-text">暂时冻结金币</div>
        <div class="cashed-option-counts text-warning">{{cashedDatas.freeze}}</div>
      </div>
    </div>

    <div class="row cashed-button">
      <div class="col-100">
        <a class="button button-big button-fill button-warning" v-link="{name: 'users-cashed'}">立即提现</a>
        <div class="messages">注：可提现金币为1000的整数倍。</div>
      </div>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
        cashedDatas: ''
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getMyMoneny();
    },
    methods:{
      getMyMoneny (){
        var _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/buyer/buyerMoneyDetail',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              console.log(res.data);
              _self.cashedDatas = res.data;
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
            $.hideIndicator();
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
            $.hideIndicator();
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
  .cashed-container {
    width: inherit;
  }
  .cashed-container .circle {
    width: 150px;
    height: 150px;
    margin: 25px auto;
    border: 1px solid #E4E4E4;
    border-radius: 50%;
    text-align: center;
  }
  .cashed-container .cashed-numbers {
    margin-top:40px;
    font-size:32px;
    font-weight:500;
  }
  .cashed-container .cashed-text {
    font-size: 14px;
  }
  .cashed-options {
    border: 1px solid #C7C7C7;
    text-align:center;
  }
  .cashed-options .cashed-option-text {
    font-size:16px;
  }
  .cashed-options .cashed-option-counts {
    font-size:22px;
  }
  .cashed-options .option-left {
    border-right: 1px solid #C7C7C7;
    height:100px;
    padding-top:20px;
  }
  .cashed-options .option-right {
    padding-top:20px;
  }
  .cashed-button {
    margin:20px 15px;
  }
  .cashed-button .col-100 {
    margin:0;
    width:100%;
  }
  .cashed-button .messages {
    margin-top:15px;
    font-size: 14px;
  }
</style>

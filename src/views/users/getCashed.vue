<template>

  <header class="bar bar-nav">
    <h1 class="title">我的钱包</h1>
  </header>

  <div class="content">
    <div class="content-block">
      <p>提现金币</p>
      <div class="row cashed-container">
        <div class="col-20 cashed-symbol">￥</div>
        <div class="col-80 cashed-counts">
          <input type="number" v-model="cashedCounts" min='1000' step='1000'>
        </div>
      </div>

      <div style="margin:15px auto;">可提现金币￥{{cashedDatas.canCash}}，<a class="text-success" @click="getAllCashed">全部提现</a></div>

      <div class="row cashed-button">
        <div class="col-100">
          <a class="button button-big button-fill button-warning" @click="getMyCashed(cashedCounts)">提现</a>
        </div>
      </div>

      <div class="list-block media-list">
        <div>
          <nv-bind-card type="bankcard"></nv-bind-card>
        </div>
        <div>
          <nv-bind-card type="alipay"></nv-bind-card>
        </div>
        <div>
          <nv-bind-card type="wx"></nv-bind-card>
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
        navNumbers: 4,
        cashedDatas: '',
        cashedCounts: 1000
      }
    },
    route:{
      data ({ to: { params: { counts }}}){
        console.log(counts);
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
      },
      getAllCashed (){
        //全部提现
        this.cashedCounts = this.cashedDatas.canCash;
      },
      getMyCashed (counts){
        var _self = this;

        if(counts == 0 || counts%1000 != 0){
          $.toast('请输入正确的金额');
          return false;
        }

        $.confirm("确定立即提现吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/buyer/changeCach/' + counts,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
              console.log(res.data);
              if(res.success){
                $.toast('提现成功，稍后请注意查收');
                _self.$route.router.go({ name: 'users-cashed-home'});
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
        });
      }
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvBindCard":require('../../components/BindCard.vue'),
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
  .list-block {
    margin: 0;
  }
  .cashed-container .cashed-symbol {
    font-size:30px;
  }
  .cashed-container .cashed-counts {
    text-align:center;
    font-size:50px;
  }
  .cashed-container .cashed-counts input {
    width:100%;
    border:none;
    text-align:center;
  }

  .cashed-button .button {
    margin: 15px auto;
  }

</style>

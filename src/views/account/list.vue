<template>

  <header class="bar bar-nav">
    <h1 class="title">买号列表</h1>
  </header>

  <div class="content">
    <div class="list">
      <div v-for="item in accountDatas" class="list-item border-bottom" v-link="{name: 'account-modify', params:{id: item.accountId}}">
        <span>{{item.nick}}</span>
        <div class="pull-right">
          <span v-if="item.checkstatus == 2" class="text-warning">审核中</span>
          <span v-if="item.checkstatus == 1" class="text-success">通过</span>
          <span v-if="item.checkstatus == 0" class="text-danger">拒绝</span>
          <span class="icon icon-right"></span>
         </div>
      </div>
    </div>


    <div class="content-block task-button" >
      <div class="row" v-if="accountDatas.length < 5">
        <div class="col-100">
          <a v-link="{name:'account-add'}" class="button button-big button-fill button-warning">添加新买号</a>
        </div>
      </div>
      <div class="loading-nothing-more text-danger">每个帐号最多添加5个买手帐号</div>
    </div>

  </div>

  <nv-nav id="nav" :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
        accountDatas: [],
        pages: 1,
        isMore: true
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getAccountList(this.pages);
    },
    methods:{
      tips (){
        $.toast('完善中');
      },
      loadingMore (){
        this.pages ++;
        this.getAccountList(this.pages);
      },
      getAccountList (pages){
        var _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/buyer/accounts/'+ pages,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              if(res.data.records.length < res.data.page.pageSize){
                $.hideIndicator();
                _self.isMore = false;
              }
              res.data.records.forEach(function(e){
                _self.accountDatas.push(e);
              });
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

</style>

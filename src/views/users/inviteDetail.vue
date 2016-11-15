<template>

  <header class="bar bar-nav">
    <h1 class="title">邀请明细</h1>
  </header>

  <div class="content">
    <div class="page-invite">
      <div class="row invite-head-wrap">
        <div class="col-50 text-center">
          <div>累计邀请</div>
          <span class="text-warning fz12">{{visitorView.totalVisitor}} 人</span>
        </div>
        <div class="col-50 text-center">
          <div>累计奖励</div>
          <span class="text-warning fz12">{{visitorView.totalMoney}} 金币</span>
        </div>
      </div>
      <div class="list">
        <div class="invite-title">邀请记录</div>
        <div v-for="visitor in visitorList" class="list-item border-bottom">
          <span>{{visitor.nick}}</span>
          <div class="pull-right">
            <span class="text-gray">{{visitor.gmtCreated | formatDate 'yyyy-MM-dd hh:mm'}}</span>
           </div>
        </div>
      </div>

      <div v-show="isMore" class="loading-more" @click="loadingMore">点击加载更多</div>
      <div v-else class="loading-nothing-more">暂无更多信息</div>

    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>


</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
        visitorList: [],
        visitorView: {},
        pages: 1,
        isMore: true,
      }
    },
    route:{
      data (){

      },

    },
    ready () {
      this.getVisitorDetail(this.pages);
    },
    methods:{
      loadingMore (){
        this.pages ++;
        this.getVisitorDetail(this.pages);
      },
      getVisitorDetail(pages) {
        let _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/visitorDetail/' + pages,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.data);
            if(res.success){
              if(res.data.records.length < res.data.page.pageSize){
                $.hideIndicator();
                _self.isMore = false;
              }
              _self.visitorList = _self.visitorList.concat(res.data.records);
              _self.visitorView = res.data.visitorView;

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
    },
    events: {
      //
    }
  }
</script>

<style scoped>

  .page-invite {
  }

  .invite-head-wrap {
    background-color: #fff;
    padding: 0.8rem 0;
  }

  .invite-title {
    text-align: center;
    padding: .5rem;
    margin-top: .5rem;
  }
</style>

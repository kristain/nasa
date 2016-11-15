<template>

  <header class="bar bar-nav">
    <h1 class="title">资金明细</h1>
  </header>

  <div class="content">
    <div class="list-block media-list">
      <ul>
        <li v-for="capitalInfo in capitalFlowInfoList">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><small>{{capitalInfo.comment}}</small></div>
                <div v-if="capitalInfo.money > 0" class="item-after text-warning">{{capitalInfo.money}} 金币</div>
                <div v-else class="item-after text-success">{{capitalInfo.money}} 金币</div>
              </div>
              <div class="item-subtitle pull-right text-gray"><small>{{capitalInfo.gmtModified | formatDate 'yyyy-MM-dd hh:mm'}}</small></div>
            </div>
          </div>
        </li>
      </ul>
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
        navNumbers: 4,
        capitalFlowInfoList: [],
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
      this.getCapitalFlow(this.pages);
    },
    methods:{
      loadingMore (){
        this.pages ++;
        this.getCapitalFlow(this.pages);
      },
      getCapitalFlow(pages) {
        let _self = this;
        $.showIndicator();
        $.ajax({
          url: '/nasa/buyer/checkMoneyFlow/' + pages,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.data);
            if(res.success){
              if(res.data.records.length < res.data.page.pageSize){
                $.hideIndicator();
                _self.isMore = false;
              }
              _self.capitalFlowInfoList = _self.capitalFlowInfoList.concat(res.data.records);

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
  .content {
    background: #FFF;
  }
  .list-block {
    margin: 0;
  }
  .text-warning {
    color: #EDA04C;
  }
  .text-success {
    color: #4EC226;
  }
</style>

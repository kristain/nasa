<template>

  <header class="bar bar-nav">
    <h1 class="title">任务大厅</h1>
  </header>

  <div class="content">

    <div class="m-top-tips">
      <div>1、用错买号做任务将扣除佣金，并处罚2金币</div>
      <div>2、接受任务后必须在一小时内完成，否则将扣除5金币</div>
    </div>

    <div class="filter-type">
      <div class="buttons-row">
        <a @click="gotoLink('regular')" :class="['tab-link button', type == 'regular' ? 'active': '']">常规任务</a>
        <a @click="gotoLink('tuan')" :class="['tab-link button', type == 'tuan' ? 'active': '']">活动任务</a>
      </div>
    </div>

    <div class="task-box-center">
      <div class="task-box-top">
        当前买手号：
        <select name="" id="buyer-change" @change="changeItem($event)" v-if="buyerList.length > 0">
          <option :value="$index" v-for="buyer in buyerList">{{buyer.nick}}</option>
        </select>
        <a v-link="{name:'account-add'}" class="pull-right">添加买手</a>
      </div>

      <div class="list-block media-list task-list" style="margin:0;" v-if="buyerList.length > 0">
        <ul>
          <li v-for="item in items">
            <div class="task-list-title">
              <span>任务号：{{ item.gmtCreated | formatDate 'yyyMMddhh'}}{{item.id}}</span>
              <!--
              <span class="pull-right text-gray">{{item.gmtCreated | formatDate 'yyyy-MM-dd hh:mm'}}</span>-->
            </div>
            <a class="item-link item-content" v-link="{name: 'task-center-receive', params: {id: item.id}}">
              <div class="item-media"><img class="img" :src="item.productImgUrl + '-200'"></div>
              <div class="item-inner">
                <div class="item-subtitle">
                  <div class="item-title-row">
                    <div class="item-title">任务佣金：{{item.sellerMoney}} 金币</div>

                  </div>
                </div>
                <div class="item-text">任务类型：{{item.taskType && item.taskType.split('+').join(' ')}}</div>
              </div>
              <div class="item-after"><span class="button button-fill button-success">查看详情</span></div>
            </a>
          </li>
        </ul>

        <div v-show="isMore" class="loading-more" @click="loadingMore">点击加载更多</div>
        <div v-else class="loading-nothing-more">暂无更多信息</div>

      </div>


    </div>
  </div>

  <nv-nav id="nav" :numbers="navNumbers"></nv-nav>

</template>

<script>
  export default {
    data (){
      return {
        navNumbers: 2,
        items: [],
        isBuyerAccount: false,
        buyerAccounts: '',
        buyerList: [],
        lastId: 1,
        isMore: true,
        selectAccount: {},
        type: Util.getUrlParam('type') || 'regular',
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      this.getBuyerList();
    },
    methods:{
      tips (){
        $.toast('完善中');
      },
      loadingMore (){
        this.getList(this.lastId, store.get('accountId'));
      },
      getList (lastId = '', accountId){
        // 获取任务
        let _self = this;
        $.showIndicator();
        let url = lastId == '' ? '/nasa/buyer/getWaituseTask' : `/nasa/buyer/getWaituseTask?taskId=${lastId}`;
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          data: {accountId: accountId, type: _self.type},
          success: (res) => {
            console.log(res);
            if(res.success){
              $.hideIndicator();
              if(!res.data || res.data.records.length == 0 || _self.lastId == _.last(res.data.records).id ){
                _self.isMore = false;
                return false;
              }

              _self.lastId = _.last(res.data.records).id;
              _self.items = _self.items.concat(_.shuffle(res.data.records));

              store.set('taskImg', {});
              store.set('searchimageurlDate', '');

            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
              setTimeout(function(){
                _self.$route.router.go({ name: 'users-task-list', params: {status: 'taskruning'}});
              },2000);
            }
            $.hideIndicator();
          },
          error: function(err) {
            $.alert("获取任务失败："+JSON.stringify(err));
            $.hideIndicator();
          }
        });
      },
      getBuyerList (){
        // 获取买手列表
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/accounts/1',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              _self.buyerList = res.data.records.filter((record) => {
                if (record.checkstatus == 1) {
                  return record;
                }
              });
              if(res.data.records.length == 0){
                //无账号跳转
                $.toast('您还未添加买手帐号，正在为您跳转到添加页面。');
                setTimeout(() => {
                  _self.$route.router.go({ name: 'account-add'});
                }, 2000)

              } else if (_self.buyerList.length == 0) {
                $.toast('您的买手号还在审核中...');
              } else {
                _self.selectAccount = _self.buyerList[0];
                _self.updateBuyerAccount();
              }
              console.log(_self.buyerList);
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
          },
          error: function(err) {
            $.alert("获取买手列表失败："+JSON.stringify(err));
          }
        });
      },
      changeItem(event) {
        this.isMore = true;
        this.items = [];
        this.lastId = 0;
        this.selectAccount = this.buyerList[event.target.value];
        this.updateBuyerAccount();
      },
      updateBuyerAccount() {
        let _self = this;
        _self.isMore = true;
        store.set('accountId', _self.selectAccount.accountId);
        store.set('accountName', _self.selectAccount.nick);
        _self.getList('', _self.selectAccount.accountId);
      },

      gotoLink(type) {
        let _self = this;
        _self.items = [];
        _self.lastId = 1;
        _self.type = type;
        _self.isMore = true;
        _self.getList('', _self.selectAccount.accountId);
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

  .task-box-top {
    background-color: #fff;
    padding: 10px;
    font-size: 12px;
  }
  .task-box-center .task-list {
    width: 100%;
    margin-bottom: 15px;
  }
  .list-block ul {
    background-color: #f8f8f8;
  }
  .task-box-center .task-list li {
    margin-top: 10px;
    background-color: #fff;
  }

  .filter-type {
    margin: .5rem .8rem;
  }

  .filter-type a {
    background-color: #fff;
    line-height: 1.6rem;
    height: 1.6rem;
    font-size: 13px;
  }

  .task-box-center .task-list .get-task-btn {
    position: absolute;
    right: 10px;
    top: 30px;
  }

  .item-after {
    margin-right: 10px;
  }

  .media-list .item-link .img {
    width: 70px;
    height: 70px;
    border-radius: 5px;
  }
  .media-list .item-link .item-inner {
    background-size: 0;
    padding-right: 10px;
    position: static;
  }
  .media-list .item-link .item-inner .item-subtitle {
    font-size: 12px;
    color: #000;
  }
  .media-list .item-link .item-inner .item-text {
    font-size: 12px;
  }

  #buyer-change {
    font-size: 14px;
  }
</style>

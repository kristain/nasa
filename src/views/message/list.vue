<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">消息中心</h1>
  </header>

  <div class="content page-message">
    <div class="buttons-tab">
      <span v-bind:class="type == 'system' ? 'tab-link button active' : 'tab-link button'" v-link="{name: 'message-list', params:{type: 'system'}}" >系统消息</span>
      <span v-bind:class="type == 'new' ? 'tab-link button active' : 'tab-link button'"  v-link="{name: 'message-list', params:{type: 'new'}}">新手帮助</span>
    </div>

    <div  style="margin-top: 0">
      <div class="list">
        <div v-link="{name: 'message-detail', params: {messageId: message.id}}" class="list-item line-bottom posr" v-for="message in messageList">
          <span class="msg-title">{{message.msgtitle}}</span>
          <div v-if="type !== 'new'" class="pull-right text-gray ms-timer">{{message.gmtCreated | formatDate 'MM-dd hh:mm'}}</div>
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
        navNumbers: 4,
        pages: 1,
        messageList: [],
        isMore: true,
        type: 'system'
      }
    },
    route:{
      data ({ to: { params: { type }}}){
        this.type = type;
      },

      canReuse: false

    },
    ready () {
      let msgtype = '新手指南';
      switch (this.type) {
        case 'system':
          this.msgtype = '系统通知';
          break;
        default:
          this.msgtype = '新手指南';
          break;
      }
      this.getMessageFlow(this.pages, this.msgtype);
    },
    methods:{
      loadingMore (){
        this.pages ++;
        this.getMessageFlow(this.pages, this.msgtype);
      },
      getMessageFlow(pages, msgtype) {
        let _self = this;
        $.showIndicator();
        $.ajax({
          url: `/nasa/common/getMessage/${pages}`,
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({msgtype: msgtype}),
          success: (res) => {
            console.log(res.data);
            if(res.success){
              $.hideIndicator();
              if(res.data.records.length < res.data.page.pageSize){
                _self.isMore = false;
              }
              _self.messageList = _self.messageList.concat(res.data.records);
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

  .page-message .list-item {
    line-height: 42px;
    height: 42px;
    font-size: 15px;
    padding: 0;
    margin: 0;
  }

  .page-message .list-item span.msg-title {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    color: #333;
    text-overflow: ellipsis;
  }

  .time {
    color: #999;
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

  .ms-timer {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>

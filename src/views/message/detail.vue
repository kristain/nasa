<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">消息详情</h1>
  </header>

  <div class="content page-message" v-if="loading == false">

    <div class="content-block" style="margin-top: 0">
      <div class="messageInfo">
        <h3 class="msg-title">{{message.msgtitle}}</h3>
        <p class="msg-time" style="display: none">{{message.gmtCreated | formatDate 'yyyy-MM-dd hh:mm'}}</p>
        <div class="msg-content">{{{message.msgcontent}}}</div>
      </div>

    </div>


  </div>

  <nv-nav id="nav" :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
        message: {msgtitle: ''},
        messageId: '',
        loading: true,
      }
    },
    route:{
      data ({ to: { params: { messageId }}}) {
        this.messageId = parseInt(messageId);
      }
    },
    ready () {
      this.getMessageDetail(this.messageId);
    },
    methods:{
      getMessageDetail(messageId) {
        let _self = this;
        $.showIndicator();
        $.ajax({
          url: `/nasa/common/getMessageDetail/${messageId}`,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.data);
            if(res.success){
              _self.message = res.data;
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
            $.hideIndicator();
            _self.loading = false;
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

<style>
 .page-message .msg-content img {
  max-width: 100%;
}
</style>

<style scoped>
  .content {
    background: #FFF;
  }

   .messageInfo .msg-title {
    text-align: center;
    font-size: 15px;
  }

   .messageInfo .msg-time {
    text-align: center;
    font-size: 12px;
    color: #999;
  }

   .msg-content {
    padding: 5px;
    font-size: 14px;
  }

</style>

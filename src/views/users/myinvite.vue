<template>

  <header class="bar bar-nav">
    <h1 class="title">邀请好友</h1>
  </header>

  <div class="content">
    <div class="page-invite">
      <p class="invite-show">邀请好友</p>
      <p>邀请好友获得任务金币加成</p>
      <p class="sow">好友成功注册后，好友做的任务您也能获得额外的金币收入</p>

      <p class="link">我的专属二维码</p>
      <div id="qrcode" >
          <img :src="imgBase64" alt="">
      </div>
      <a class="button button-big button-fill button-warning" href="javascript:;" id="clicp" data-clipboard-target="#invite-msg">立即邀请</a>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        message: '动动手指，轻松赚钱，我在求人气，已经赚了好多金币啦，快来和我一起玩！ ' + location.origin + '/buyer/invite?f=' + store.get('userid'),
        imgBase64: ''
      }
    },
    route:{
      data (){
      },

    },
    ready () {
        this.imgBase64 = jrQrcode.getQrBase64(location.origin + '/buyer/invite?f=' + store.get('userid'));
    //   new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
    },
    methods:{
      tips (){
        $.toast('完善中');
      },

      clipboard() {
        Util.clipboard = new Clipboard('.button');
        Util.clipboard.on('success', function(e) {
          $.toast('已复制')
        });
        Util.clipboard.on('error', function(e) {
          $.toast('请复制选中的关键词')
        });

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

  .page-invite {
    padding: 1rem;
  }

  .page-invite p {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-size: 17px;
  }

  .page-invite p.sow {
    width: 75%;
  }

  .page-invite p.link {
    color: #888;
    font-size: 14px;
  }

  .invite-msg {
    width: 90%;
    height: 130px;
    border: none;
    background: #fff;
    display: block;
    margin: 10px auto 30px;
    padding: .7rem;
    resize: none;
  }

  .button {
    width: 40%;
    margin: 0 auto;
  }

  .invite-show {
    /* Rectangle 2: */
    background: #F5A623;
    box-shadow: 0px 2px 4px 0px #F5A623;
    color: #fff;
    height: 65px;
    line-height: 65px;
    width: 70%;
    text-align: center;
    font-size: 18px;
    margin: 20px auto;
  }

  #qrcode {
      text-align: center;
  }

</style>

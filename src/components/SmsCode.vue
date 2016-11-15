<template>

  <div v-if="timer == 0" @click="getSmsCode" class="item-title label text-link">获取验证码</div>
  <div v-else class="item-title label text-link">重新获取（{{timer}}）</div>

</template>

<script>

  export default {
    replace: true,
    props: ['mobile'],
    data (){
      return {
        timer: 0,
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
    },
    methods:{
      tips (){
        $.toast('完善中...');
      },
      getSmsCode (){
        //获取验证码
        var _self = this;
        if(!$.trim(_self.mobile)){
          $.toast("请先输入手机号码！");
          return false;
        } else if ($.trim(_self.mobile).length != 11) {
          $.toast("请输入正确的11位手机号码！");
          return false;
        }

        _self.timer = 60;
        _self.countDownTimer();

        $.ajax({
          url: '/nasa/common/smscode',
          type: 'POST',
          data: JSON.stringify({
            mobile: _self.mobile,
          }),
          dataType: 'json',
          contentType: 'application/json',
          success: function(res){
            var messages = JSON.parse(res.message);
            if(res.success){
              $.toast("验证码已发送到手机上，注意查收！");
              _self.timer = 60;
              _self.countDownTimer();
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.alert(messages.detail, messages.msg);
            }
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
      },

      /**
       * 验证码倒计时
       * @return {[type]} [description]
       */
      countDownTimer() {
        let _self = this;
        --_self.timer;
        if (_self.timer <= 0) {
          clearTimeout(_self.t);
          return false;
        }
        _self.t = setTimeout(() => {
          _self.countDownTimer();
        }, 1000);
      },
    },
    components: {
      //
    },
    events: {
      //
    }
  }
</script>

<style scoped>
  .item-inner .text-link {
    color: #ED8126;
    font-size: 14px;
    text-align: right;
  }
</style>

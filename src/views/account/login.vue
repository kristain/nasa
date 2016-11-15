<template>

  <div class="content">
    <div class="header_img">
      <img src="/src/assets/images/logo3.jpg" alt="">
    </div>

    <div class="list-block">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">帐号</div>
              <div class="item-input">
                <input v-model="userDatas.mobile" type="tel" placeholder="注册时的手机号">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">密码</div>
              <div class="item-input">
                <input v-model="userDatas.password" type="password" placeholder="请输入密码">
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="content-block register">
        <div class="row">
          <div class="col-100">
            <a @click="submit(userDatas)" class="button button-big button-fill button-warning">登录账号</a>
          </div>
        </div>
        <div class="foo">
          <span v-link="{name:'register'}">注册账号</span>
          <span v-link="{name:'find-password'}" class="pull-right">忘记密码？</span>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

  export default {
    data (){
      return {
        userDatas: {
          mobile: '',
          password: ''
        }
      }
    },
    ready () {
      if (_.isInteger(store.get('userid'))) {
        this.$route.router.go({ name: 'task-index'});
      }
    },

    methods:{
      autoRedirect() {

      },

      submit (datas){
        var _self = this;
        if(!datas.mobile || !datas.password){
          $.toast('请将信息填写完整');
          return false;
        }
        $.showIndicator();
        $.ajax({
          url: '/nasa/login',
          type: 'POST',
          data: JSON.stringify({
            mobile: datas.mobile,
            password: datas.password,
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: function(res){
            if(res.success){
              $.toast("恭喜您，登录成功！");
              store.set('nick', res.data.nick);
              store.set('mobile', res.data.mobile);
              store.set('qq', res.data.qq);
              store.set('userid', res.data.id);
              _self.$route.router.go({ name: 'task-index'});
            }else {
              $.alert(res.message);
            }
            $.hideIndicator();
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
            $.hideIndicator();
          }
        });
      }
    }
  }
</script>

<style scoped>
  #app .content {
    /*background: #FFF;*/
    margin-bottom: 0;
  }
  .header_img {
    text-align: center;
  }
  .header_img img{
    width: 100px;
    height: 100px;
    background: #FFF;
    border-radius: 50%;
    margin: 35px auto 0;

  }

  .item-inner .text-link {
    color: #ED8126;
    font-size: 14px;
  }

  .foo {
    font-size: 14px;
    margin: 15px 5px;
  }
</style>

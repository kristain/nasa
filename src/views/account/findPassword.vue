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
              <div class="item-title label">手机号</div>
              <div class="item-input">
                <input v-model="userDatas.mobile" type="text" placeholder="请输入您的手机号">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">获取验证码</div>
              <div class="item-input">
                <input v-model="userDatas.validatorCode" type="tel" placeholder="短信验证码">
              </div>
              <nv-sms-code :mobile="userDatas.mobile"></nv-sms-code>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">新密码</div>
              <div class="item-input">
                <input v-model="userDatas.password" type="password" placeholder="输入新密码">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">确认密码</div>
              <div class="item-input">
                <input v-model="userDatas.confirmPassword" type="password" placeholder="确认密码">
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="content-block register">
        <div class="row">
          <div class="col-100">
            <a @click="submit(userDatas)" class="button button-big button-fill button-warning">确认修改</a>
          </div>
        </div>
        <div class="foo">
          <span v-link="{name:'login'}">返回登录</span>
          <span v-link="{name:'register'}" class="pull-right">注册账号</span>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

  export default {
    data (){
      return {
        validatorCode: '',
        userDatas:{
          password: '',
          mobile: '',
          confirmPassword: '',
          validatorCode: ''
        },

      }
    },
    methods:{
      tips (){
        $.toast('完善中...');
      },

      submit (datas){
        //提交注册

        var constraints = {
          password: {
            presence: {
              message: '密码不能为空。',
            },
            length: {
              presence: true,
              minimum: 6,
              message: "密码至少为6位"
            }
          }
        }

        let validateResult = validate(datas, constraints, {fullMessages: false});
        if (validateResult) {
          for (let value in validateResult) {
            $.toast(validateResult[value]);
            break;
          }
          return false;
        }

        var _self = this;

        if(datas.password != datas.confirmPassword){
          $.toast('两次密码输入不一致！');
          return false;
        }

        datas.userName = datas.mobile;

        $.confirm("确定修改密码吗？",function(){
          $.ajax({
            url: '/nasa/forget',
            type: 'POST',
            data: JSON.stringify(datas),
            dataType: 'json',
            contentType: 'application/json',
            success: function(res){
              console.log(res);
              if(res.success){
                $.toast("密码修改成功，请重新登录！");
                _self.$route.router.go({ name: 'login'});
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
              }else {
                $.toast(res.message);
              }
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
            }
          });
        });

      }

    },

    components: {
      "nvSmsCode":require('../../components/SmsCode.vue'),
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
    height: 130px;
  }
  .header_img img{
    width: 100px;
    height: 100px;
    background: #FFF;
    border-radius: 50%;
    margin: 35px auto 10px;

  }



  .foo {
    font-size: 14px;
    margin: 15px 5px;
  }
</style>

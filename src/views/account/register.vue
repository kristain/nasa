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
              <div class="item-title label">昵称</div>
              <div class="item-input">
                <input v-model="userDatas.userName" type="text" placeholder="至少4个英文或者2个中文">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">QQ号码</div>
              <div class="item-input">
                <input v-model="userDatas.qq" type="tel" placeholder="请输入QQ号码">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">手机号</div>
              <div class="item-input">
                <input v-model="userDatas.mobile" type="tel" placeholder="请输入您的手机号">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">验证码</div>
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
              <div class="item-title label">密码</div>
              <div class="item-input">
                <input v-model="userDatas.password" type="password" placeholder="密码">
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
            <a @click="submit(userDatas)" class="button button-big button-fill button-warning">立即注册</a>
          </div>
        </div>
        <div class="foo">
          <span v-link="{name:'login'}">返回登录</span>
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
        validatorCode: '',
        userDatas:{
          userName: '',
          password: '',
          mobile: '',
          confirmPassword: '',
          qq: '',
          validatorCode: ''
        }
      }
    },
    methods:{

      submit (datas){
        //提交注册

        var constraints = {
          userName: {
            presence: {
              message: '昵称不能为空。',
            },
            length: {
              minimum: 2,
              message: "用户名至少为4个英文或者2个中文。"
            }
          },
          qq: {
            presence: {
              message: 'QQ号不能为空',
            },
            numericality: {
              message: 'QQ号必须为数字',
            },
            length: {
              minimum: 4,
              message: "请输入正确的QQ号"
            }
          },
          password: {
            presence: {
              message: '密码不能为空。',
            },
            length: {
              presence: true,
              minimum: 6,
              message: "密码至少为6位"
            }
          },
          confirmPassword: {
            presence: {
              message: '密码不能为空。',
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
        if (Util.getBLen($.trim(datas.userName)) < 4) {
          $.toast('昵称必须为2个汉字或者4个英文字符');
          return false;
        }

        if(datas.password != datas.confirmPassword){
          $.toast('两次密码输入不一致！');
          return false;
        }

        datas.role = 1;

        // 注册时的 f 参数，关联帐号
        let f = Util.getUrlParam('f') | '';
        datas.f = f + '';

        $.confirm("确定信息无误，立即注册吗？",function(){
          $.ajax({
            url: '/nasa/registerUser',
            type: 'POST',
            data: JSON.stringify(datas),
            dataType: 'json',
            contentType: 'application/json',
            success: function(res){
              console.log(res);
              if(res.success){
                $.toast("恭喜您，注册成功！");
                store.set('nick', res.user.nick);
                store.set('mobile', res.user.mobile);
                store.set('qq', res.user.qq);
                store.set('userid', res.user.id);
                _self.$route.router.go({ name: 'task-index'});
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
  }
  .header_img img{
    width: 100px;
    height: 100px;
    background: #FFF;
    border-radius: 50%;
    margin: 35px auto 0;

  }

  .foo {
    font-size: 14px;
    margin: 15px 5px;
  }
</style>

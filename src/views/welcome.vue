<template>
    
  <div class="content">
    <div class="main">
      <div class="header_img">
        <img src="/src/assets/images/logo3.jpg" alt="">
      </div>
      
      <div class="slogan">随时随地，轻松赚钱</div>

      <div class="content-block buttoms">
        <div class="row">
          <div class="col-50"><a v-link="{name:'login'}" class="button button-big button-fill button-success">登录</a></div>
          <div class="col-50"><a v-link="{name:'register'}" class="button button-big button-fill button-dark">注册</a></div>
        </div>
      </div>

      <div class="slogan">注册即送5元现金红包！</div>

    </div>
  </div>

</template>

<script>

  export default {
      ready (){
    }
  }

</script>

<style scoped>
  .content {
    background: -webkit-linear-gradient(#EA8D2F, #FFA530);
    background: -o-linear-gradient(#EA8D2F, #FFA530);
    background: -moz-linear-gradient(#EA8D2F, #FFA530);
    background: linear-gradient(#EA8D2F, #FFA530);
    width: 100%;
    height: 100%;
  }
  .main .header_img {
    margin-top: 25%;
    width: 100%;
    text-align: center;
  }
  .main .header_img img{
    width: 100px;
    height: 100px;
    background: #FFF;
    border-radius: 50%;
  }
  .main .slogan {
    text-align: center;
    color: #FFF;
    margin: 15px auto;
  }
  .main .buttoms {
    padding-top: 50px;
  }
  .button-dark:active {
    background: #7D7D7D;
  }
</style>


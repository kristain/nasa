<template>

  <header class="bar bar-nav">
    <h1 class="title">个人资料</h1>
  </header>

  <div class="content">
    <div class="list">
      <div class="list-item border-bottom header-list-item">
        <span>头像</span>
        <div class="pull-right"><img class="header-little" src="/src/assets/images/logo3.jpg" alt=""><span class="icon icon-right"></span></div>
      </div>
      <!--
      <div class="list-item border-bottom">
        <span>地区</span>
        <div class="pull-right">北京 北京市 东城区<span class="icon icon-right"></span></div>
      </div>
      -->
      <div @click="fixedQQ" class="list-item border-bottom">
        <span>QQ账号</span>
        <div class="pull-right">121234412<span class="icon icon-right"></span></div>
      </div>
      <div class="list-item border-bottom">
        <span>手机号</span>
        <div class="pull-right">13646616261<span class="icon icon-right"></span></div>
      </div>
      <div class="list-item border-bottom" v-link="{name: 'find-password'}">
        <span>登录密码</span>
        <div class="pull-right"><span class="icon icon-right"></span></div>
      </div>
    </div>

    <div id="modals">
      <div class="modals-popup"></div>
      <div class="modals-container">
        <div class="modal-title">修改QQ号</div>
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="iconfont">&#xe602;</i></div>
                <div class="item-inner">
                  <div class="item-input">
                    <input type="number" placeholder="QQ号码">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="content-block modals-button">
            <div class="row">
              <div class="col-100">
                <a @click="tips" class="button button-big button-fill button-warning">提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 4,
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      $("#modals").css('display','none');
    },
    methods:{
      fixedQQ (){
        $("#modals").css('display','');
      },
      tips (){
        $.toast('完善中');
        $("#modals").css('display','none');
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
  .text-center {
    text-align: center;
  }
  .list {
    padding: 0px 10px;
  }
  .list-item {
    font-size: 14px;
    padding: 10px;
    margin: 3px 0px;
  }
  .border-bottom {
    border-bottom: 1px solid #E2E2E2;
  }
  .header-list-item {
    position:  relative;
  }
  .header-little {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    border: 1px solid #666;
    right: 30px;
  }
  .modals-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #353535;
    opacity: .6;
  }
  .modals-container {
    position: fixed;
    top: 5%;
    left: 5%;
    width: 90%;
    z-index: 9999;
    min-height: 200px;
    background: #FFF;
    border-radius: 10px;
    padding: 10px;
  }
  .modals-container .modal-title {
    text-align: center;
    margin: 15px auto;
  }
  .item-content .item-media {
    width: 30px;
  }
  .modals-button .button {
    background: #FF8A26;
    border-radius: 60px;
  }
</style>

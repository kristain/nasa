<template>

  <header class="bar bar-nav">
    <h1 class="title">账号详情</h1>
  </header>

  <div class="content">

    <div class="m-top-tips-big">
      <div v-link="{name: 'message-detail', params: {messageId: 3}}">点击查看绑定买手教程示意图 ></div>
    </div>

    <div class=" m-top-tips-big" v-if="formDatas.checkstatus == 0">
      <p ><span class="icon icon-message"></span>  审核未通过：{{formDatas.comment}}，请修改后重新提交。</p>
    </div>

    <div class="list-block" style="margin-top: .01rem">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">淘宝账号:</div>
              <div class="item-input">
                <input v-model="formDatas.nick" type="text" placeholder="用户名">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">出生日期:</div>
              <div class="item-input">
                <input v-model="formDatas.birthday" type="date">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">性别:</div>
              <div class="item-input">
                <label class="commo-label">
                    <input class="commo-radio" type="radio" value="1" v-model="formDatas.sex">
                    <span class="commo-radioInput"></span>男
                </label>
                <label class="commo-label">
                    <input class="commo-radio" type="radio" value="2" v-model="formDatas.sex">
                    <span class="commo-radioInput"></span>女
                </label>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">信用等级:</div>
              <div class="item-input" @click="changeCredit" >
                <input type="text" :value="creditList[formDatas.credit].text" placeholder="信用">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">购物标签:</div>
              <div class="item-input" style="padding: 8px;">
                <span v-show="formDatas.buytag.length != 0">{{formDatas.buytag.join(',  ') | json}}</span> <a @click="addBuytag" class="add-btn"> +添加</a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner" style="padding-bottom: 1.5rem;">
              <div class="item-title label">账号截图:</div>

              <div class="item-input">
                <div class="upload-img-info"  v-for="value in formDatas.nickimg">
                    <nv-upload-img :file.sync="value" :type="$key"></nv-upload-img>
                    <span style="min-height: 24px">{{$key}}</span>
                </div>
              </div>

              <div class="demo-image">
                <small><a v-link="{name: 'message-detail', params: {messageId: 4}}">查看示例截图</a></small>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="content-block task-button">
      <div class="row">
        <div class="col-100">
          <a @click="submit(formDatas)" class="button button-big button-fill button-warning">确认修改，提交审核</a>
        </div>
        <div class="col-100 margin-15-0">
          <a @click="deleteAccount(accountId)" class="button button-big button-fill button-gray">删除</a>
        </div>
      </div>
    </div>

    <div id="modals-buytag">
      <div @click="closeModal" class="modal-overlay modal-overlay-visible" id="modals-buytag-popup"></div>
      <div class="modal" style="display: block; margin-top: -30%;">
        <div class="modal-inner">
          <div class="modal-text">
            <label class="commo-label" v-for="tag in tags">
                <input class="commo-radio" type="checkbox" :value='tag' v-model="formDatas.buytag">
                <span class="commo-checkbox commo-radioInput"></span>{{tag}}
            </label>
          </div>
        </div>
        <div class="modal-buttons modal-buttons-vertical">
          <span class="modal-button" @click="closeModal">确定</span>
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
        imageShowStatus: false,
        imageShowfilename: '',
        accountId: '',
        formDatas: {
          nickimg: {'截图1': '', '截图2': '', '截图3': ''},
          credit: 1,
          nick: '',
          buytag: [],
          sex: '',
          birthday: '',
          creditName: '一❤',
        },
        tags: ['百货食品', '服装鞋包', '美妆饰品', '文化玩娱', '母婴用品', '手机数码', '运动户外', '游戏话费', '生活服务', '家用电器', '家居建材', '汽摩配件'],
        creditList: [
          {text: '', value: '0'},
          {text: '一❤', value: '1'},
          {text: '二❤', value: '2'},
          {text: '三❤', value: '3'},
          {text: '四❤', value: '4'},
          {text: '五❤', value: '5'},
          {text: '一💎', value: '6'},
          {text: '二💎', value: '7'},
          {text: '三💎', value: '8'},
          {text: '四💎', value: '9'},
          {text: '五💎', value: '10'},
        ]
      }
    },
    route:{
      data ({ to: { params: { id }}}){
        this.accountId = id;
      }
    },
    ready () {
      $("#modals-buytag").css('display','none');
      var _self = this;
      _self.getAccount(_self.accountId);
    },
    methods:{
      tips (){
        $.toast('完善中');
      },
      showImages (file){
        var myPhotoBrowserStandalone = $.photoBrowser({
          photos : file.split(','),
          type: 'popup'
        });
        myPhotoBrowserStandalone.open();
      },
      getAccount (Id){
        var _self = this;
        $.ajax({
          url: '/nasa/buyer/buyerAccountDetail/'+ Id,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              _self.formDatas = res.data;
              _self.formDatas.birthday = _self.formatDate(_self.formDatas.birthday, 'yyyy-MM-dd');
              _self.formDatas.buytag = _self.formDatas.buytag.split(',');
              _self.formDatas.creditName = _self.creditList[_self.formDatas.credit].text;
              _self.formDatas.nickimg = JSON.parse(_self.formDatas.nickimg);
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
      },
      submit (datas){
        var _self = this;
        if(!datas.nick || !datas.birthday || !datas.credit || datas.buytag == '' || !datas.nickimg){
          $.toast('请将信息填写完整！');
          return false;
        }
        $.confirm("确定信息无误，立即修改吗？",function(){

          $.ajax({
            url: '/nasa/buyer/updateAccount',
            type: 'POST',
            data: JSON.stringify({
              id: _self.accountId,
              nick: datas.nick,
              sex: datas.sex,
              birthday: datas.birthday,
              credit: parseInt(datas.credit),
              buytag: datas.buytag.toString(),
              nickimg: JSON.stringify(datas.nickimg)
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function(res){
              console.log(res);
              if(res.success){
                $.toast("修改买手账号成功！");
                _self.$route.router.go({ name: 'account-list'});
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
      },
      formatDate (time, fmt){
        var date = new Date(time);
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        return fmt;
      },
      deleteAccount (Id){
        var _self = this;
        $.confirm("确定要删除该买手账号吗？",function(){
          $.ajax({
            url: '/nasa/buyer/deleteAccount/'+ Id,
            type: 'DELETE',
            dataType: 'json',
            success: (res) => {
              if(res.success){
                $.toast('删除买手账号成功');
                setTimeout(function(){
                  _self.$route.router.go({ name: 'account-list'});
                },2000);
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
      },

      addBuytag (){
        $("#modals-buytag").show();
        $("#modals-buytag").find('.modal').addClass('modal-in');
      },
      changeCredit (){
        let _self = this;
        var buttons1 = [
          { text: '请选择', label: true }
        ];

        _.map(_self.creditList, (credit, key) => {
          buttons1.push({
            text: credit.text, color: 'danger',
            onClick: function() {
              _self.formDatas.credit = credit.value;
              _self.formDatas.creditName = credit.text;
            }
          })
        })
        var buttons2 = [ { text: '取消', bg: 'danger' } ];
        var groups = [buttons1, buttons2];
        $.actions(groups);
      },
      changeBuytag (){
        $("#modals-buytag").css('display','none');
      },
      closeModal (){
        $("#modals-buytag").hide();
        $("#modals-buytag").find('.modal').removeClass('modal-in');
      }
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvUploadImg":require('../../components/UploadImg.vue'),
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




  .img-gray {
    -webkit-filter: grayscale(1);/* Webkit */
    filter:gray;/* IE6-9 */
    filter: grayscale(1);/* W3C */
  }

  #modals-credit-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background: #353535;
    opacity: .6;
  }
  #modals-buytag-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #353535;
    opacity: .6;
  }
  .modals-content {
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
  .show-image {
    width: 70px;
    height: 120px;
    overflow-y: hidden;
    border-radius: 5px;
  }
  .add-btn {
    margin-bottom: .4rem
  }
  .demo-image {
    position: absolute;
    right: 5px;
    top: 3px;
  }
  .upload-img-info {
    text-align: center;
    padding-top: 30px;
    font-size: 12px;
    width: 50%;
    float: left;
    margin-left: -15px;
  }
</style>

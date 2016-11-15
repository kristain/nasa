<template>

  <div v-show="type == 'bankcard'" class="item-content">
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">银行卡</div>
        <div v-if="bindCardInfo.bank.cardnum" class="item-after text-warning"><a @click="clickModifyBank(bindCardInfo.bank.id)">{{bindCardInfo.bank.cardnum}}</a></div>
        <div v-else class="item-after text-warning"><a @click="isShowBank = !isShowBank">点击绑定</a></div>
      </div>
    </div>
  </div>
  <!--
  <div v-show="type == 'alipay'" class="item-content">
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">支付宝</div>
        <div v-if="bindCardInfo.alipay.cardnum" class="item-after text-warning"><a @click="clickModifyAlipay(bindCardInfo.alipay.id)">{{bindCardInfo.alipay.cardnum}}</a></div>
        <div v-else class="item-after text-warning"><a @click="isShowAlipay = !isShowAlipay">点击绑定</a></div>
      </div>
    </div>
  </div>

  <div v-show="type == 'wx'" class="item-content">
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">微信</div>
        <div v-if="bindCardInfo.wx.cardnum" class="item-after text-warning"><a @click="clickModifyWx(bindCardInfo.wx.id)">{{bindCardInfo.wx.cardnum}}</a></div>
        <div v-else class="item-after text-warning"><a @click="isShowWx = !isShowWx">点击绑定</a></div>
      </div>
    </div>
  </div>
-->
  <div id="modals-bank" v-if="isShowBank">
    <div class="modals-popup" @click="isShowBank = !isShowBank"></div>
    <div class="modals-container">
      <div class="modal-title">添加银行卡</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="银行卡号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="姓名">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">开户银行</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.bankname" type="text" placeholder="如：农业银行">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">开户支行</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.bankbranch" type="text" placeholder="开户支行">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitBankCard(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 修改绑定银行账号 -->
  <div id="modals-bank" v-if="isShowModifyBank">
    <div class="modals-popup" @click="isShowModifyBank = !isShowModifyBank"></div>
    <div class="modals-container">
      <div class="modal-title">修改银行卡</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="银行卡号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="姓名">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">开户银行</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.bankname" type="text" placeholder="如：农业银行">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">开户支行</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.bankbranch" type="text" placeholder="开户支行">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitModifyBankCard(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="modals-alipay" v-if="isShowAlipay">
    <div class="modals-popup" @click="isShowAlipay = !isShowAlipay"></div>
    <div class="modals-container">
      <div class="modal-title">支付宝账号</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">支付宝账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="支付宝账号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="请填写真实姓名">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitAlipay(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 修改支付宝 -->
  <div id="modals-alipay" v-if="isShowModifyAlipay">
    <div class="modals-popup" @click="isShowModifyAlipay = !isShowModifyAlipay"></div>
    <div class="modals-container">
      <div class="modal-title">修改支付宝账号</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">支付宝账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="支付宝账号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="请填写真实姓名">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitModifyAlipay(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="modals-wechat" v-if="isShowWx">
    <div class="modals-popup" @click="isShowWx = !isShowWx"></div>
    <div class="modals-container">
      <div class="modal-title">微信账号</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">微信账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="微信账号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="请填写真实姓名">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitWechat(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 修改微信账号 -->
  <div id="modals-wechat" v-if="isShowModifyWx">
    <div class="modals-popup" @click="isShowModifyWx = !isShowModifyWx"></div>
    <div class="modals-container">
      <div class="modal-title">修改微信账号</div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">微信账号</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.cardnum" type="number" placeholder="微信账号">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">姓名</div>
              <div class="item-inner">
                <div class="item-input">
                  <input v-model="bindCardFormDatas.username" type="text" placeholder="请填写真实姓名">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="content-block modals-button">
          <div class="row">
            <div class="col-100">
              <a @click="submitModifyWechat(bindCardFormDatas)" class="button button-big button-fill button-warning">提交</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    replace: true,
    props: ['type', 'info'],
    data (){
      return {
        isShowBank: false,
        isShowAlipay: false,
        isShowWx: false,
        isShowModifyBank: false,
        isShowModifyAlipay: false,
        isShowModifyWx: false,
        cardId: '',
        bindCardFormDatas:{
          userid: store.get('userid'),
          username: '',
          cardnum: '',
          cardtype: '',
          bankname: '',
          bankbranch: ''
        },
        bindCardInfo: {
          bank: {},
          alipay: {},
          wx: {}
        }
      }
    },
    ready (){
      this.getBindInfo();
    },
    methods:{
      handleNumbers (){
        var bankNumber   = this.bindCardInfo.bank.cardnum+'',
            alipayNumber = this.bindCardInfo.alipay.cardnum+'',
            wxNumber     = this.bindCardInfo.wx.cardnum+'';

        this.bindCardInfo.bank.cardnum = bankNumber.substr(0, bankNumber.length-4)+'****';
        this.bindCardInfo.alipay.cardnum = alipayNumber.substr(0, alipayNumber.length-4)+'****';
        this.bindCardInfo.wx.cardnum = wxNumber.substr(0, wxNumber.length-4)+'****';
      },
      submitModifyBankCard (datas){
        var _self = this,
            cardType = 'bankcard';

        if(!datas.username || !datas.cardnum || !datas.bankname || !datas.bankbranch){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即修改绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/updateBindCard/'+ _self.cardId,
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userId),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType,
              bankName: datas.bankname,
              bankBranch: datas.bankbranch
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              if(res.success){
                $.toast('绑定成功');
                _self.getBindInfo();
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              $.hideIndicator();
              setTimeout(function(){
                _self.isShowModifyBank = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowModifyBank = false;
            }
          });
        });
      },
      submitModifyAlipay (datas){
        var _self = this,
            cardType = 'alipay';

        if(!datas.username || !datas.cardnum){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即修改绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/updateBindCard/'+ _self.cardId,
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userId),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              if(res.success){
                $.toast('绑定成功');
                _self.getBindInfo();
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              $.hideIndicator();
              setTimeout(function(){
                _self.isShowModifyAlipay = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowModifyAlipay = false;
            }
          });
        });
      },
      submitModifyWechat (datas){
        var _self = this,
            cardType = 'wx';

        if(!datas.username || !datas.cardnum){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即修改绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/updateBindCard/'+ _self.cardId,
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userId),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              if(res.success){
                $.toast('绑定成功');
                _self.getBindInfo();
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              $.hideIndicator();
              setTimeout(function(){
                _self.isShowModifyWx = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowModifyWx = false;
            }
          });
        });
      },
      clickModifyBank (cardId){
        this.cardId = cardId;
        this.isShowModifyBank = !this.isShowModifyBank;
        this.getBindCardDetail(cardId);
      },
      clickModifyAlipay (cardId){
        this.cardId = cardId;
        this.isShowModifyAlipay = !this.isShowModifyAlipay;
        this.getBindCardDetail(cardId);
      },
      clickModifyWx (cardId){
        this.cardId = cardId;
        this.isShowModifyWx = !this.isShowModifyWx;
        this.getBindCardDetail(cardId);
      },
      submitBankCard (datas){
        var _self = this,
            cardType = 'bankcard';

        if(!datas.username || !datas.cardnum || !datas.bankname || !datas.bankbranch){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/bindCard',
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userid),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType,
              bankName: datas.bankname,
              bankBranch: datas.bankbranch
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              console.log(res);
              if(res.success){
                // _self.bindCardInfo = res.data;
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              _self.getBindInfo();
              $.hideIndicator();
              setTimeout(function(){
                $.toast('绑定成功');
                _self.isShowBank = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowBank = false;
            }
          });
        });
      },
      submitAlipay (datas){
        console.log('支付宝');
        var _self = this,
            cardType = 'alipay';

        if(!datas.username || !datas.cardnum){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/bindCard',
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userid),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              console.log(res);
              if(res.success){
                // _self.bindCardInfo = res.data;
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              _self.getBindInfo();
              $.hideIndicator();
              setTimeout(function(){
                $.toast('绑定成功');
                _self.isShowAlipay = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowAlipay = false;
            }
          });
        });
      },
      submitWechat (datas){
        var _self = this,
            cardType = 'wx';

        if(!datas.username || !datas.cardnum){
          $.toast('请完善绑定信息');
          return false;
        }

        $.confirm("确定信息无误，立即绑定吗？",function(){
          $.showIndicator();
          $.ajax({
            url: '/nasa/common/bindCard',
            type: 'POST',
            data: JSON.stringify({
              userId: parseInt(datas.userid),
              userName: datas.username,
              cardNum: datas.cardnum,
              cardType: cardType
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(res){
              if(res.success){
                // _self.bindCardInfo = res.data;
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
                return false;
              }else {
                $.toast(res.message);
              }
              _self.getBindInfo();
              $.hideIndicator();
              setTimeout(function(){
                $.toast('绑定成功');
                _self.isShowWx = false;
              }, 2000);
            },
            error: function(err) {
              $.alert(JSON.stringify(err));
              $.hideIndicator();
              _self.isShowWx = false;
            }
          });
        });
      },
      getBindCardDetail (cardId){
        var _self = this;
        $.ajax({
          url: '/nasa/common/bindCardDetail/'+ cardId,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.data);
            if(res.success){
              _self.bindCardFormDatas = res.data;
              setTimeout(function(){
                _self.handleNumbers();
              },1000);
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
      getBindInfo (){
        //获取绑定卡信息
        var _self = this;
        $.ajax({
          url: '/nasa/common/getBindCard',
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            if(res.success){
              console.log('获取绑定卡信息', res.data);
              _.map(res.data, function(item){
                switch(item.cardtype){
                  case 'bankcard':
                    _self.bindCardInfo.bank = item;
                    break;
                  case 'alipay':
                    _self.bindCardInfo.alipay = item;
                    break;
                  case 'wx':
                    _self.bindCardInfo.wx = item;
                    break;
                }
              });
              _self.handleNumbers();
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
  .content {
    background: #FFF;
  }
  .list-block {
    margin: 0;
  }
  .cashed-container .cashed-symbol {
    font-size:30px;
  }
  .cashed-container .cashed-counts {
    text-align:center;
    font-size:50px;
  }
  .cashed-container .cashed-counts input {
    width:100%;
    border:none;
    text-align:center;
  }

  .cashed-button .button {
    margin: 15px auto;
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
  .item-content .item-input input {
    text-align: right;
  }
  .modals-button .button {
    background: #FF8A26;
    border-radius: 60px;
  }

</style>

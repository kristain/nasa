<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">任务详情</h1>
    <span v-if="taskDatas.status == 'taskruning'" @click="cancelTask(formDatas.taskId)" class="button button-link button-nav pull-right">取消任务</span>
  </header>

  <div class="content">

    <div class="m-top-tips-big">
      <div v-if="taskDatas.type == 'regular'" v-link="{name: 'message-detail', params: {messageId: 5}}"> 点击查看「{{taskDatas.taskType}}」任务上传教程 <span class="icon icon-right"></span> </div>

      <div v-if="taskDatas.type == 'tuan'" v-link="{name: 'message-detail', params: {messageId: 6}}"> 点击查看「{{taskDatas.taskType}}」任务上传截图教程 <span class="icon icon-right"></span> </div>
    </div>

    <div class="task-box text-14">
      <p>店铺：{{ taskDatas.shopModel.shopname }}</p>
      <div class="task-item-title">
        <b>目标商品</b>
        <div class="pull-right" v-if="taskDatas.excuteUserAccountId">
          <nv-count-down :times="gmtModified + 60 * 60 * 1000" :status.sync="countdownStatus"></nv-count-down>
        </div>
      </div>
      <div class="task-item-body">
        <div class="task-item-body-left">
          <img @click="showImages(taskDatas.productModel.productImg)" :src="taskDatas.productModel.productImg" alt="">
        </div>
        <div class="task-item-body-right">
          <p>商品名称：{{ taskDatas.productModel.productName | hiddenName }}</p>
          <p>商品价格：￥{{ taskDatas.productModel.producePrice }}</p>
        </div>
      </div>

      <div class="task-item-title"><b>任务要点</b></div>
      <div class="task-item-body">

        <div v-if="taskDatas.type =='tuan'">
          <div class="item">类目：<span class="text-danger">{{searchInfo.productCategory}}</span></div>
          <div class="item">
            淘口令：<span class="text-danger"><input id="productTaoCommand" type="text" :value="searchInfo.productTaoCommand"></input></span>
            <button class="button button-fill button-warning btn" id="clicp" data-clipboard-target="#productTaoCommand">复制口令</span></button>
          </div>
        </div>

        <div v-if="taskDatas.type == 'regular'">
          <div class="item">
            搜索关键词：<input id="keywords" type="text" :value="taskDatas.productModel.productSeachKey"></input>
            <button class="button button-fill button-warning btn" id="clicp" data-clipboard-target="#keywords">复制</span></button>
          </div>
          <div class="item">排序方式：<span class="text-danger">{{taskDatas.productModel.productFilterSort}}</span></div>
          <div class="item">价格区间：<span class="text-danger">{{taskDatas.productModel.productPriceLower}}-{{taskDatas.productModel.productPriceHigh}}</span></div>
          <div class="item">发货地：<span class="text-danger">{{taskDatas.productModel.productAddress}}</span></div>
        </div>

        <div class="item">任务类型：<span >{{taskDatas.taskType}}</span></div>
      </div>


      <div class="task-item-title"><b>商家特殊要求</b></div>
      <div class="task-item-body">{{taskDatas.specialDesc}}</div>

      <div class="task-item-title"><b>注意事项</b></div>
      <div class="task-item-body">
        1、对目标商品从上倒下进行<span class="text-warning">至少1分钟</span>浏览；<br>
        2、加购物车至少<span class="text-warning">保留7天</span>，收藏商品、收藏店铺等至少<span class="text-warning">保留30天</span>。<br />
        3、需要在规定时间完成，否则扣除2金币。
      </div>

      <div v-if="!isLoading">

        <div v-if="taskDatas.type =='regular'">
          <div v-if="taskImg['搜索'] !== undefined">
            <div class="task-item-title"><b>搜索截图</b><div @click="tips('完善中')" class="pull-right link-a" v-link="{name: 'message-detail', params: {messageId: 9}}">查看示例截图</div></div>
            <div class="task-item-body">
              <div class="row">
                <!-- 结束的任务不能再上传截图 -->
                <div v-if="!countdownStatus" class="col-33">
                  <center class="text-12">
                    <nv-upload :file.sync="taskImg['搜索']" type="搜索"></nv-upload>
                    搜索截图
                  </center>
                </div>
              </div>
            </div>

            <div class="task-item-title"><b>其他截图</b> <div @click="tips('完善中')" class="pull-right link-a" v-link="{name: 'message-detail', params: {messageId: 5}}">查看示例截图</div></div>
            <div class="task-item-body">
              <div v-if="taskDatas.excuteUserAccountId">
                <div class="warning text-12">
                  1、倒计时结束后，才可以开始其他任务的截图；<br>
                  2、务必保证搜索截图和其他任务截图<span class="text-warning">间隔大于1分钟</span>，小余1分钟的将审核不通过；<br>
                  3、点击查看【截图示例】，请按照示例规范
                </div>

                <div v-if="!isShowViewImg" class="content-block task-button">
                  <center style="font-size: 15px">请先上传搜索截图</center>
                </div>
                <div v-else class="row">
                  <!-- 结束的任务不能再上传截图 -->
                  <div v-if="countOtherInfo.countTime <= 0" class="row" style="padding: 10px 0 0 10px;">
                    <div class="col-33" v-for="value in taskImg">
                      <center class="text-12" v-if="$key != '搜索'" >
                        <nv-upload :file.sync="taskImg[$key]" :type="$key"></nv-upload>
                        {{$key}}
                      </center>
                    </div>
                  </div>

                  <div v-else class="text-warning countd content-block" style="font-size: 14px">倒计时 {{countOtherInfo.minite}} : {{countOtherInfo.second}} 结束后才能上传其他图片</div>

                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-if="taskDatas.type =='tuan'">
          <div class="task-item-title"><b>开团提醒</b><div @click="tips('完善中')" class="pull-right link-a" v-link="{name: 'message-detail', params: {messageId: 7}}">查看示例截图</div></div>
          <div class="task-item-body">
            <div class="row">
              <div class="col-33" v-for="value in taskImg">
                <center class="text-12" v-if="$key != '搜索'" >
                  <nv-upload :file.sync="taskImg[$key]" :type="$key"></nv-upload>
                  {{$key}}
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="content-block task-button-wrap">
      <div class="row">
          <div class="col-50"><a @click="cancelTask(formDatas.taskId)" class="button button-big button-fill button-danger">取消任务</a></div>
          <div class="col-50"><a @click="submit(formDatas)" v-if="taskDatas.status == 'taskruning'" class="button button-big button-fill button-success">提交任务</a></div>
      </div>
    </div>

  </div>


  <nv-nav :numbers="navNumbers"></nv-nav>

</template>

<script>

  export default {
    data (){
      return {
        navNumbers: 2,
        imageShowStatus: false,
        imageShowfilename: '',
        formDatas: {
          accountId: parseInt(store.get('accountId')), //买手账号，暂无
          taskId: '',
          searchimageurl: '',
          viewimageurl: '',
          juanimageurl: '',
          userId: store.get('userid')
        },
        taskDatas: {
          shopModel: {},
          productModel: {},
          buyTaskDto: {}
        },
        searchInfo: {},
        isLoading: true,
        taskImg: store.get('taskImg') || {},
        gmtModified: '',
        countdownStatus: false,
        isShowViewImg: false,
        countOtherInfo: {
          minite: '00',
          second: '00',
          countTime: 10,
        }
      }
    },
    route:{
      data ({ to: { params: { id }}}){
        this.formDatas.taskId = parseInt(id);
      },
    },
    ready () {
      this.getTaskDetail();
      this.countDownLastMin();
      this.clipboard();
    },

    methods:{
      tips (datas) {
        $.toast(datas);
      },
      clipboard() {
        Util.clipboard = new Clipboard('.btn');
        Util.clipboard.on('success', function(e) {
          $.toast('已复制，请打开手机淘宝继续任务')
        });
        Util.clipboard.on('error', function(e) {
          $.toast('请复制选中的关键词后，打开淘宝继续任务')
        });
      },
      showImages (file){
        var myPhotoBrowserStandalone = $.photoBrowser({
          photos : file.split(','),
          type: 'popup'
        });
        myPhotoBrowserStandalone.open();
      },
      getTaskDetail (){
        var _self = this;
        $.ajax({
          url: '/nasa/buyer/detail/' + _self.formDatas.taskId,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
            console.log(res.data);
            if(res.success){
              if (res.data.records.length == 0) {
                $.toast('该任务不存在');
                return false;
              }
              _self.taskDatas = res.data.records[0];
              _self.gmtModified = res.data.records[0].gmtModified;

              if (_self.taskDatas.type == 'tuan') {
                _self.searchInfo = JSON.parse(_self.taskDatas.productModel.productSearchInfo);
              }

              _.map(_self.taskDatas.taskType.split('+'), function(item){
                if (item == '浏览') {
                  _self.taskImg['搜索'] = _self.taskImg['搜索'] || '';
                }
                _self.taskImg[item] = _self.taskImg[item] || '';
              });


              store.set('taskImg', _self.taskImg);

              _self.isLoading = false;
            }
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
      },
      submit (datas){
        var _self = this;

        //v-bind:XXX.sync失败，使用Storage存储
        let taskImg = store.get('taskImg');
        let isUpload = true;
        _.map(taskImg, (value, key) => {
          if (value == '') {
            $.toast('请上传' + key + '截图！');
            isUpload = false;
            return false;
          }
        });
        if (!isUpload) {
          return false;
        }

        $.confirm("确定信息无误，立即提交吗？",function(){
          $.ajax({
            url: '/nasa/buyer/submitTask',
            type: 'POST',
            data: JSON.stringify({
              accountId: datas.accountId,
              taskId: datas.taskId,
              taskImg: JSON.stringify(taskImg),
              userId: datas.userId,
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function(res){
              console.log(res);
              if(res.success){
                $.toast("提交任务成功！");
                store.set('taskImg', {});
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
      },
      getTask (taskId) {
        //领取任务
        let _self = this;
        $.ajax({
          url: '/nasa/buyer/receiveTask',
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            taskId: _self.formDatas.taskId,
            accountId: _self.formDatas.accountId
          }),
          success: (res) => {
            if(res.success){
              $.toast('领取成功');
              store.set('taskImg', {});
              setTimeout(() => {
                location.reload();
              }, 1000);
            }else if(res.message == '用户未登录'){
              _self.$route.router.go({ name: 'login'});
            }else {
              $.toast(res.message);
            }
          },
          error: function(err) {
            $.alert("领取任务失败："+JSON.stringify(err));
          }
        });

      },

      cancelTask (taskId) {
        let _self = this;
        $.confirm("确认继续？",function(){
          $.ajax({
            url: `/nasa/buyer/cancleTask/${taskId}`,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
              if(res.success){
                $.toast('取消成功');
                store.set('taskImg', {});
                setTimeout(() => {
                  _self.$route.router.go({ name: 'task-center-account'});
                }, 1000);
              }else if(res.message == '用户未登录'){
                _self.$route.router.go({ name: 'login'});
              }else {
                $.toast(res.message);
              }
            },
            error: function(err) {
              $.alert("取消失败："+JSON.stringify(err));
            }
          });
        });
      },
      countDownLastMin (){
        var _self = this;
        _self.timer = setInterval(() =>{
          var searchimageurlDate = store.get("searchimageurlDate");
          _self.isShowViewImg = !_.isEmpty(store.get('taskImg')['搜索']);
          if (searchimageurlDate == '') {
            return;
          } else {
            searchimageurlDate = searchimageurlDate + 60;
          }
          let countDate = parseInt(searchimageurlDate - (new Date().getTime() / 1000));
          _self.countOtherInfo.countTime = countDate;
          if (countDate <= 0) {
            clearTimeout(_self.timer);
            return;
          } else {
            _self.countOtherInfo.minite = parseInt(countDate / 60) < 10
                                        ? ('0' + parseInt(countDate / 60))
                                        : parseInt(countDate / 60);
            countDate -= parseInt(countDate / 60) * 60;
            _self.countOtherInfo.second = parseInt(countDate) < 10
                                        ? ('0' + parseInt(countDate))
                                        : parseInt(countDate);
          }
        }, 1000);
      }
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvUpload":require('../../components/Upload.vue'),
      "nvCountDown":require('../../components/CountDown.vue'),
    },
    events: {
      //
    }
  }
</script>

<style scoped>
  .camera-area {
    margin-top: 15px;
  }

  .show-images {
    width: 80px;
    height: 80px;
    margin: 5px;
  }

  .task-button-wrap {
    margin-top: .5rem;
  }

  #keywords {
    border: none;
    background-color: #fff;
  }

  #clicp {
    width: auto;
    float: right;
  }

  #productTaoCommand {
    background-color: #fff;
    border: none;
  }

  .countd {
    text-align: center;
  }

</style>

<template>

  <header class="bar bar-nav">
    <a onclick="window.history.go(-1)" class="button button-link button-nav pull-left left-btn"><span class="icon icon-left"></span></a>
    <h1 class="title">任务详情 - 领取任务</h1>
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
            淘口令：<span class="text-danger">{{searchInfo.productTaoCommand}}</span>
          </div>
        </div>

        <div v-if="taskDatas.type == 'regular'">
          <div class="item">搜索关键词：{{taskDatas.productModel.productSeachKey}}</div>
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
        3、需要在规定时间完成，否则扣除5金币。
      </div>


      <div>
        <div v-if="taskDatas.type =='regular'">
          <div class="task-item-title"><b>搜索截图</b><div v-link="{name: 'message-detail', params: {messageId: 9}}" class="pull-right link-a">查看示例截图</div></div>
          <div class="task-item-body">
            <div class="row">
              <div class="col-100">
                <center style="font-size:15px; padding: 15px;">该任务你还未领取</center>
              </div>
            </div>
          </div>

          <div>
            <div class="task-item-title"><b>其他截图</b><div v-link="{name: 'message-detail', params: {messageId: 5}}" class="pull-right link-a">查看示例截图</div></div>
            <div class="task-item-body">
              <div class="warning text-12">
                1、倒计时结束后，才可以开始其他任务的截图；<br>
                2、务必保证搜索截图和其他任务截图<span class="text-warning">间隔大于1分钟</span>，小余1分钟的将审核不通过；<br>
                3、点击查看【截图示例】，请按照示例规范
              </div>
              <div class="row">
                <div class="col-100">
                  <center style="font-size:15px; padding: 20px 0 10px;">该任务你还未领取</center>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div v-if="taskDatas.type =='tuan'">
          <div class="task-item-title"><b>开团提醒</b><div v-link="{name: 'message-detail', params: {messageId: 7}}" class="pull-right link-a">查看示例截图</div></div>
          <div class="task-item-body">
            <div class="row">
              <div class="col-100">
                <center style="font-size:12px; padding: 10px;">该任务你还未领取</center>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="content-block task-button-wrap">
      <div class="row">
        <div class="col-100">
          <a @click="getTask(formDatas.id)" class="button button-big button-fill button-warning">领取任务</a>
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
        navNumbers: 2,
        imageShowStatus: false,
        imageShowfilename: '',
        formDatas: {
          accountId: parseInt(store.get('accountId')), //买手账号，暂无
          taskId: '',
          userId: store.get('userid')
        },
        taskDatas: {
          shopModel: {},
          productModel: {},
          buyTaskDto: {}
        },
        user: {},
        gmtModified: '',
        countdownStatus: false
      }
    },
    route:{
      data ({ to: { params: { id }}}){
        this.formDatas.taskId = parseInt(id);
      }
    },
    ready () {
      this.getTaskDetail();
    },
    methods:{
      tips (datas) {
        $.toast(datas);
      },
      openTaobao(str){
        var url = 'https://s.m.taobao.com/h5?sst=1&n=20&buying=buyitnow&q=' + str;
        window.open(url);
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
              _self.taskDatas   = res.data.records[0];
              _self.gmtModified = res.data.records[0].gmtModified;

              if (_self.taskDatas.type == 'tuan') {
                _self.searchInfo = JSON.parse(_self.taskDatas.productModel.productSearchInfo);
              }

              _self.user = res.user;
            }
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
      },
      getTask (taskId) {
        //领取任务
        let _self = this;
        if (_self.user.totalMoney < 0) {
          $.alert('您的金币不足，无法领取任务，您可以通过每日签到领取金币。');
          return false;
        }

        let accountName = store.get('accountName');

        $.modal({
          text: `请确认使用 ${accountName} 接任务。<br />接单1小时内必须完成操作，否则任务将自动取消，并扣除5金币
            `,
          buttons: [
            {
              text: '取消',
            },
            {
              text: '确认领取',
              onClick: function() {
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
                      setTimeout(() => {
                        _self.$route.router.go({ name: 'task-center-start', params: {id: _self.formDatas.taskId}});
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
              }
            },
          ]
        });

      }
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvUpload":require('../../components/Upload.vue'),
      "nvCountDown":require('../../components/CountDown.vue'),
      "nvPreviewImg":require('../../components/PreviewImg.vue'),
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

  .task-button-wrap {
    margin-top: .5rem;
  }

  .show-images {
    width: 80px;
    height: 135px;
    margin: 5px;
  }

  /*过渡*/
  .expand-transition {
    transition: all .3s ease;
    height: 30px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }
</style>

<template>

  <header class="bar bar-nav">
    <h1 class="title">任务详情</h1>
  </header>

  <div class="content">

    <div class=" m-top-tips-big" v-if="taskDatas.comment">
      <p >审核未通过：{{'' + taskDatas.comment}}</p>
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
          <div class="item">
            搜索关键词：<input id="keywords" type="text" :value="taskDatas.productModel.productSeachKey"></input>
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

      <div v-if="taskDatas.excuteUserAccountId">
        <div class="task-item-title"><b>任务截图</b></div>
        <div class="task-item-body">
          <div class="row">
            <div v-if="taskImg" class="col-33" v-for="value in taskImg">
              <center class="text-12" >
                <div class="thumb">
                  <img @click="showImages(value)" :src="value" alt="">
                </div>
                {{$key}}
              </center>
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
        navNumbers: 2,
        imageShowStatus: false,
        imageShowfilename: '',
        formDatas: {
          accountId: parseInt(store.get('accountId')), //买手账号，暂无
          taskId: '',
          userId: store.get('userid')
        },

        taskImg: {},
        searchInfo: {},

        taskDatas: {
          shopModel: {},
          productModel: {},
          buyTaskDto: {}
        },
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
              _self.taskDatas = res.data.records[0];
              _self.taskImg = JSON.parse(_self.taskDatas.buyTaskDto.taskImg);
              _self.gmtModified = res.data.records[0].gmtModified;

              if (_self.taskDatas.type == 'tuan') {
                _self.searchInfo = JSON.parse(_self.taskDatas.productModel.productSearchInfo);
              }
            }
          },
          error: function(err) {
            $.alert(JSON.stringify(err));
          }
        });
      },
    },
    components: {
      "nvNav":require('../../components/Nav.vue'),
      "nvUpload":require('../../components/Upload.vue'),
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

  .task-img {
    width: 64px;
    height: 64px;
    border-radius: 6px;
  }

  .show-images {
    width: 60px;
    height: 100px;
    border-radius: 6px;
    margin: 5px;
  }

  #keywords {
    border: none;
    background-color: #fff;
  }


</style>

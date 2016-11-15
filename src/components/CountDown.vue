<template>

  <div v-if="isVisible">
    任务倒计时：<span class="text-danger">{{countdown}}</span>
  </div>

</template>

<script>

  export default {
    replace: true,
    props: ['numbers','times', 'status'],
    data (){
      return {
        countdown: '',
        isVisible: false
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      var _self = this,
          times = _self.times;
      _self.ShowCountDown(times);
      window.setInterval(function(){
        if(!times) times = _self.times;
        _self.ShowCountDown(times);
      }, 1000);
    },
    methods:{
      tips (){
        $.toast('完善中...');
      },
      ShowCountDown (times){
        var _self = this;

        var endTimes = new Date(times);

        var year   = endTimes.getFullYear(),
            month  = endTimes.getMonth() + 1,
            day    = endTimes.getDate(),
            hour   = endTimes.getHours(),
            minute = endTimes.getMinutes(),
            second = endTimes.getSeconds();

        var now         = new Date(),
            endDate     = new Date(year, month - 1, day, hour, minute, second),
            leftTime    = endDate.getTime() - now.getTime(),
            leftsecond  = parseInt(leftTime/1000),
            day1        = Math.floor(leftsecond/(60*60*24)),
            hour        = Math.floor((leftsecond-day1*24*60*60)/3600).toString(),
            minute      = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60).toString(),
            second      = Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60).toString();

        minute = minute.length == 1 ? "0" + minute : minute;
        second = second.length == 1 ? "0" + second : second;
        // console.log(day1+" "+hour+" "+minute+" "+second);
        if(day1<0){
          _self.countdown = "已结束";
          _self.status = true; //任务详情判断上传截图
          _self.isVisible = true;
        }else if((day1>0 && hour>=1) || (day1==0 && hour>1)){
          _self.countdown = "- : - : -";
          _self.status = true;
          _self.isVisible = true;
        }else{
          _self.countdown = "00:"+minute+":"+second;
          _self.isVisible = true;
        }
      }
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

</style>

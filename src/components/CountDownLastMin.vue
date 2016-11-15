<template>

  <span class="text-danger">{{countdownOtherImg}}</span>

</template>

<script>

  export default {
    replace: true,
    props: ['numbers','times', 'status'],
    data (){
      return {
        countdownOtherImg: '',
      }
    },
    ready () {
      var _self = this;
      var Minute = 1,
          Second = 59;
      setInterval(function(){

        var date = new Date(store.get("searchimageurlDate")),
            now = new Date();
        var hour   = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();
        var nowhour   = now.getHours(),
            nowminute = now.getMinutes(),
            nowsecond = now.getSeconds();

        if(nowhour == hour && (nowminute-minute) < 2){
          if(Minute >= 0){
            Second--;
            if(Second <= 0){
              Minute--;
              Second = 59;
            }
          }

          console.log("0"+Minute+":"+Second);

          if(Minute == 0 && Second == 0){
            Minute = 0;
            Second = 0;
            _self.countdownOtherImg = "";
          }else {
            _self.countdownOtherImg = "0"+Minute+":"+Second;
          }
        }
      }, 1000);
    },
    methods:{
      tips (){
        $.toast('完善中...');
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

</style>

<template>
    
  <div class="content">
    <div class="error-message">404</div>
    <div class="error-describe"><small>页面君又迷路啦...</small></div>
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
  .content .error-message {
    width: inherit;
    text-align: center;
    margin-top: 40%;
    color: #FFF;
    font-size: 48px;
    font-weight: 500;
  }
  .content .error-describe{
    color: #B26C26;
    text-align: center;
  }
</style>


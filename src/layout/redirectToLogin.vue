<style scoped>
</style>
<template>
  <div class="flex-flow-row-wrap justify-content-center align-content-center h3">
    <span>尚未登录，</span>
      <self-count-down-time :countDownTimeInfo="countDownTimeInfo"></self-count-down-time>
    <span>秒自动跳转到登录页面，或者<a @click="redirectToLogin">点击此处</a>动跳转</span>
  </div>
</template>
<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfCountDownTime from '../components/subComponents/countDownTime.vue'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../function/misc'


  export default {
    components:{selfCountDownTime},
    methods:{
      redirectToLogin(){
        misc.routeTo({that:this,path:'login'})
      },
    },
    data(){
      return {
        countDownTimeInfo:{
          seconds:6,
          type:'simple',
          forceUnit:'day',
          clock:{},
          simple:{convertedToSecond:true,showUnit:false},
          fontSize:"",
          timeoutFunction:this.redirectToLogin,
        },
        countDownLeftTime:{
          day:0,
          hour:0,
          minute:0,
          second:0,
        },
        formatCountDownLeftTime:{
          day:'',
          hour:'',
          minute:'',
          second:'',
        },
      }
    }
  }
</script>

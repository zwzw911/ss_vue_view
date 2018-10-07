<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 font-fantasy">登录</p>
    </div>
    <div>

            <!--:label-width="80"-->
      <selfLoginFormItem :login-config="loginConfig" ref="loginItemInPage" @readyForLogin="readyForLogin"></selfLoginFormItem>

    </div>


    <Button long size="large" shape="circle" type="primary" @click="sendLoginInfo()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">登录</Button>
    <!--paddingH4: 和form的设置一致，以便对齐-->
    <div class="  flex-flow-row-nowrap justify-content-flex-start marginT4">
      <a class="text-align-left" @click="routeToRegister" >注册</a>
    </div>
  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfLoginFormItem from './formItem/loginFormItem'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'

  export default {
    components:{selfLoginFormItem},
    props:[''], //
    created(){


    },
    mounted(){
      //获得captcha
      // this.$refs.selfCaptcha.getCaptchaImg_async()
    },
    methods: {
      async sendLoginInfo(){
        await this.$refs['loginItemInPage'].sendLoginInfo()
      },
      readyForLogin(result){
        this.submitButtonDisable=!result
      },
      /********************************************/
      /**                   route                **/
      /********************************************/
      routeToRegister(){
        misc.routeTo({that:this,path:'/register'})
      },
    },
    computed:{

    },
    data(){

      return {
        loginConfig:{
          routeToLastOrMainPageAfterLoginSuccessful:true
        },

        submitButtonDisable:true,
        buttonDisableStyle:this.$store.state.style.button.primary.disable,
      }
    }
  }
</script>

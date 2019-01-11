<!--Created by 张伟 on 2018/12/17.-->


<style scoped>
</style>

<template>
  <Modal v-model="modalInfo.configuration['show']" width="360"  :closable="true" >
    <p slot="header" style="text-align:left;height:24px;">
      <Icon v-if="undefined!==modalInfo.configuration['headerIcon']" :type="modalInfo.configuration['headerIcon']" :class="modalInfo.configuration['headerIconClass']"></Icon>
      <span :class="modalInfo.configuration['titleClass']">{{modalInfo.configuration['title']}}</span>
    </p>
    <div style="text-align:left">
      <div>
        <!--:label-width="80"-->
        <selfLoginFormItem v-if="true===modalInfo.configuration['show']" :login-config="loginConfig" ref="loginItemInModal" @readyForLogin="readyForLogin"></selfLoginFormItem>

      </div>

<!--      <div :style="{'padding-left':loginConfig.formItemInfo.labelWidth+'px'}">

      </div>-->


      <!--paddingH4: 和form的设置一致，以便对齐-->
      <div class="  flex-flow-row-nowrap justify-content-flex-start marginT2"
           :style="{'margin-left':loginConfig.formItemInfo.labelWidth+'px'}"
      >
        <a class="text-align-left" @click="routeToRegister" >注册</a>
      </div>

    </div>
    <div slot="footer" class="  flex-flow-row-nowrap justify-content-flex-center">
      <Button  size="large"  type="primary" @click="sendLoginInfo()"
               :class="{primaryButtonDisable:submitButtonDisable}"  :disabled="submitButtonDisable"
      >
        登录
      </Button>
      <Button @click="exitLogin()">
        取消
      </Button>
    </div>
  </Modal>


</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfLoginFormItem from '../../subComponents/formItem/loginFormItem'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../../function/misc'
  /******************************/
  /**     common constant     **/
  /******************************/
  import * as componentInfo from '../../../constant/globalConfiguration/componentInfo'

  export default {
    components:{selfLoginFormItem},
    props:{'modalInfo':{type:Object}}, //
    created(){


    },
    mounted(){
      //获得captcha
      // this.$refs.selfCaptcha.getCaptchaImg_async()
    },
    methods: {
      exitLogin(){
        // alert('login exit')
        this.modalInfo.configuration.show=false
      },
      async sendLoginInfo(){
        await this.$refs['loginItemInModal'].sendLoginInfo()
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
          routeToLastOrMainPageAfterLoginSuccessful:true,
          formItemInfo:componentInfo.loginInfo(),
          createdAlreadyLoginRouteToLastOrMainPage:false,//组件创建时，如果已经登录，是否要重定向
        },

        submitButtonDisable:true,
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,
      }
    }
  }
</script>

<!--
只包含了input相关的元素

onblur/onchange会emit event，带1个结果，是否可以自行login操作（inputValue都OK）
-->
<style scoped>
</style>

<template>
  <div class="">

    <div>

            <!--:label-width="80"-->
      <div class="flex-flow-row-nowrap justify-content-flex-start  marginV2">
        <p style="" class="color-red h5">
          <span>{{globalResultMsg}}</span>
          <span style="visibility:hidden">1</span>
        </p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 "  label-position="left"
            :ref="ref.form.formForLogin" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
            :label-width="formItemInfo.labelWidth"
            @submit.native.prevent
      >
        <self-form-item :ref="ref.formItem.formItemForLogin" :editable=true :form-item-info="formItemInfo" @checkIfAllItemValidatedResultPass="getAllItemValidatedResult" @onFocus="resetGlobalMsg" @onBlur=""></self-form-item>


        <!--不影响是否可以执行-->
        <div class="flex-flow-row-nowrap justify-content-flex-start marginV1">
          <Checkbox v-model="rememberMe" @on-change="">

          </Checkbox>
          <span>记住我</span>

        </div>

        <!--<FormItem class="">-->
          <!--<Button long size="large" shape="circle" type="primary" @click="sendLoginInfo()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">登录</Button>-->
          <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
        <!--</FormItem>-->
      </Form>



    </div>
    <!--<Button @click="test_delete" long size="large" shape="circle" type="primary"></Button>-->
  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfFormItem from '../../basicComponent/formItem'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async} from '../../../function/network'
  // import {showErrorInModal} from '../../function/showResult'
  import {objectDeepCopy,ifUserLogin,routeTo} from '../../../function/misc'
import * as componentInfo from '../../../constant/globalConfiguration/componentInfo'
  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../../constant/enum/nonValueEnum'
  import {urlConfiguration} from '../../../constant/url/url'

  // import {mergeAdditionalField} from '../helperLib/componentsHelperLib'



  export default {
    components:{selfFormItem},
    props:['loginConfig'], //{routeToLastOrMainPageAfterLoginSuccessful:Boolean}
    data(){
      // let loginInfo=componentInfo.loginInfo()


      return {
        /*      formItemInfo      */
        formItemInfo:componentInfo.loginInfo(),
        validateFormItemResult:null, //存储forItem整体验证结果
        ref:{
          formItem:{
            formItemForLogin:'formItemForLogin',
          },
          form:{
            formForLogin:'formForLogin',
          },
        },
        /*        self      */
        globalResultMsg:'',//全局错误信息
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,
        rememberMe:false, //记住用户名
        submitButtonDisable:true,

        // editable:true,
      }
    },
    created(){
      //如果已经登录，直接跳转到首页
      if(true===ifUserLogin({that:this})){
        routeTo({that:this,path:'/'})
      }
      if(true===this.$cookies.isKey('rememberMe') && true===this.$cookies.isKey('account') ){
        this.formItemInfo.inputValue.account=this.$cookies.get('account')
        this.rememberMe=true
        this.formItemInfo.inputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }
      // this.getCaptcha()

    },
    mounted(){
      //获得captcha
      // this.$refs.selfCaptcha.getCaptchaImg_async()
    },
    methods: {
      /********************************************/
      /**                   formItem             **/
      /********************************************/
      //获得整体验证结果，并继续向上emit
      getAllItemValidatedResult(result){
// inf('change result',result)
        this.$emit('readyForLogin',result)
        // this.validateFormItemResult=result
        // this.checkSubmitButtonStatus()
      },



      resetGlobalMsg(){
        // inf('checkSubmitButtonStatus in')
        this.globalResultMsg=''
      },

      /********************************************/
      /**                   axios                **/
      /********************************************/

      async sendLoginInfo(){
        //captcha需要从inputValue中剥离，放入CAPTCHA
        let captcha=this.formItemInfo.inputValue[ValidatePart.CAPTCHA]
        //不能直接删除，否则iview的验证会认为此字段的值不存在
        let tmpInputValue= objectDeepCopy(this.formItemInfo.inputValue)
        delete tmpInputValue[ValidatePart.CAPTCHA]
        let data={
          values: {
            // [ValidatePart.METHOD]: Method.MATCH,
            [ValidatePart.RECORD_INFO]: tmpInputValue,
            [ValidatePart.CAPTCHA]:captcha,
          }
        }
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.login,data:data})
        // =await this.sendLoginInfo()
        if(result.rc>0){
          // inf('result',result)
          // captcha错误显示在input下
          let setCaptchaResult=this.$refs[this.ref.formItem.formItemForLogin].checkIfCaptchaErrAndShow({data:result.msg})
          //否则，显示在最顶上
          if(false===setCaptchaResult){
            let set99999Result=this.$refs[this.ref.formItem.formItemForLogin].checkIf99999ErrAndShow({data:result.msg})
            if(false===set99999Result){
              this.globalResultMsg=result.msg
            }
          }

          if(undefined!==this.formItemInfo.captchaInfo){
            await this.$refs[this.ref.formItem.formItemForLogin].getCaptchaImg_async()
          }
        }else{
          /**   登录成功    **/
          this.globalResultMsg=''
          //存储登录的用户信息到cookie（为了登录后在header上显示用户名，所以无论是否rememberMe，都要将用户名保存在cookie）（存储在global，刷新页面后，数据会重置）
          if(true===this.rememberMe){
            this.$cookies.set('account', this.formItemInfo.inputValue.account,'14d','/')
            this.$cookies.set('rememberMe', 1,'14d','/')
          }else{
            this.$cookies.set('account', this.formItemInfo.inputValue.account,'8h','/')
            this.$cookies.remove('rememberMe')
          }

          this.$cookies.set('loginDone','1','8h','/')
          // this.$store.commit('loginSuccessful',{userName:this.formItemInfo.inputValue.account})
          //返回上页
          if(true===this.loginConfig.routeToLastOrMainPageAfterLoginSuccessful){
            if(this.$router.length>0){
              // inf(this.$router[-1])
              this.$router.go(-1)
            }else{
              routeTo({that:this,path:'/'})
            }
          }


        }
      },


    },
    computed:{

    },

  }
</script>

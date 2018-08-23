<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 font-fantasy">登录</p>
    </div>
    <div>

            <!--:label-width="80"-->
      <div class="flex-flow-row-nowrap justify-content-flex-start paddingH4 marginV2">
        <p style="" class="color-red h5">
          <span>{{globalResultMsg}}</span>
          <span style="visibility:hidden">1</span>
        </p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 "  label-position="left"
            :ref="ref.form.formForLogin" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
            :label-width="formItemInfo.labelWidth"
            @submit.native.prevent
      >
        <self-form-item :ref="ref.formItem.formItemForLogin" :editable="editable" :form-item-info="formItemInfo" @validateAllItemResult="setFormItemResult" @onBlur="checkSubmitButtonStatus" @onFocus="resetGlobalMsg"></self-form-item>


        <!--term of service-->
        <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
          <Checkbox v-model="rememberMe" @on-change="">

          </Checkbox>
          <span>记住我</span>

        </div>

        <!--<FormItem class="">-->
          <Button long size="large" shape="circle" type="primary" @click="sendLoginInfo()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">登录</Button>
          <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
        <!--</FormItem>-->
      </Form>

      <span class="h4">already?<a>link</a></span>
    </div>
    <!--<Button @click="test_delete" long size="large" shape="circle" type="primary"></Button>-->
  </div>
</template>

<script>
  'use strict'
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  // import selfCaptcha from './cpatcha'
  import {objectDeepCopy,objectPartlyDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'

  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'

  import {mergeAdditionalField} from '../helperLib/componentsHelperLib'

  import {inf,wrn,err} from 'awesomeprint'

  import selfFormItem from '../basicComponent/formItem'
  export default {
    components:{selfFormItem},
    props:['loginInfo'], //
    created(){

/*      if(true===this.$cookies.isKey('account')){
        this.userInputValue.account=this.$cookies.get('account')
        this.userInputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }*/
      if(true===this.$cookies.isKey('account')){
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
      /*                    formItem              */
      /********************************************/
      //获得整体验证结果，然后设置button的状态
      setFormItemResult(result){
// inf('change result',result)
        this.validateFormItemResult=result
        this.checkSubmitButtonStatus()
      },

      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus() {

        if(false===this.validateFormItemResult){
          // inf('forminte  box in')
          this.submitButtonDisable = true
          return
        }

        // inf('checkSubmitButtonStatus successful')
        this.submitButtonDisable = false
      },

      resetGlobalMsg(){
        // inf('checkSubmitButtonStatus in')
        this.globalResultMsg=''
      },

/*      genCaptchaSuccess(){

      },*/
      /********************************************/
      /*                    axios                 */
      /********************************************/
/*      async test_delete(){
        let data={
          values: {
            // [ValidatePart.METHOD]: Method.MATCH,
            [ValidatePart.RECORD_ID]: '5b0a12c9f446ca0f9cdc9183',
            // [ValidatePart.CAPTCHA]:captcha,
          }
        }
        let result=await sendRequestGetResult_async({urlOption:{url:'/folder/',method:'delete'},data:data})

      },*/
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
          this.globalResultMsg=''
          // this.showResultFlag=false
          if(true===this.rememberMe){

            this.$cookies.set('account', this.formItemInfo.inputValue.account,'14d','/')
          }else{
            this.$cookies.remove('account')
          }

        }
      },



    },
    computed:{

    },
    data(){
      // let usedFieldName=['account','password']
      // let propName='loginInfo'
      // // let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp,icon_tmp
      // let inputAttribute={},userInputValue={},userInputTempData={},ruleForCreate={},icon={}
      //
      // inputAttribute=objectPartlyDeepCopy({sourceObj:this[propName].inputAttribute,expectedKey:usedFieldName})
      // userInputValue=objectPartlyDeepCopy({sourceObj:this[propName].initInputValue,expectedKey:usedFieldName})
      // userInputTempData=objectPartlyDeepCopy({sourceObj:this[propName].inputTempData,expectedKey:usedFieldName})
      // ruleForCreate=objectPartlyDeepCopy({sourceObj:this[propName].ruleForCreate,expectedKey:usedFieldName})
      // icon=objectPartlyDeepCopy({sourceObj:this[propName].icon,expectedKey:usedFieldName})

      this.loginInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER]=['请输入手机号或邮箱']
      this.loginInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=['请输入手机号或邮箱']
      this.loginInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.UNIQUE]=false //登录时无需检测账号unique

      this.loginInfo.formItemInfo.rule.account[0].message='账号不能为空'
      this.loginInfo.formItemInfo.rule.account[1].message='账号必须是有效的手机号或邮箱'

// inf('this.loginInfo.formItemInfo.rule',this.loginInfo.formItemInfo.rule.captcha[1]['pattern'])
      // this.loginInfo.formItemInfo.rule.account[1].pattern=this.loginInfo.formItemInfo.rule.account[1].pattern
      // this.loginInfo.formItemInfo.rule.password[1].pattern=this.loginInfo.formItemInfo.rule.password[1].pattern

      // mergeAdditionalField({arr_fieldName:['captcha'],inputAttribute:inputAttribute,inputTempData:userInputTempData,inputValue:userInputValue,icon:icon,ruleForCreate:ruleForCreate,ruleForUpdate:undefined})
      // mergeAdditionalField({arr_fieldName:['captcha'],formItemInfo:this.loginInfo.formItemInfo})
      return {
        /*      formItemInfo      */
        formItemInfo:this.loginInfo.formItemInfo,
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
        buttonDisableStyle:this.$store.state.style.button.primary.disable,
        rememberMe:false, //记住用户名
        submitButtonDisable:true,

        editable:true,
        // url:{
        //   login:'',
        //   // unique:'/user/uniqueCheck_async',
        // },



      }
    }
  }
</script>
